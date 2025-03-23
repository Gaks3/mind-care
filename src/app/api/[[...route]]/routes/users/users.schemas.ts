import { $Enums } from "@prisma/client";
import { z } from "zod";
import { imageSchema } from "../../type/image.type";

export const roleSchema = z.enum([
  $Enums.UserRole.ADMIN,
  $Enums.UserRole.PSYCHOLOGY,
  $Enums.UserRole.USER,
]);

export const genderSchema = z.enum([$Enums.Gender.MALE, $Enums.Gender.FEMALE]);

export const statusSchema = z.enum([
  $Enums.StatusUser.STUDENT,
  $Enums.StatusUser.WORKER,
]);

export const educationSchema = z.object({
  institution: z.string().trim().min(1),
  degree: z.string().trim().min(1),
  year: z.string().min(1, "Year required"),
});

export const selectUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: roleSchema,
  description: z.string().nullable(),
  birthDate: z.string().datetime().nullable(),
  gender: z.enum([$Enums.Gender.FEMALE, $Enums.Gender.MALE]).nullable(),
  phoneNumber: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const selectPsyhologySchema = selectUserSchema.and(
  z.object({
    bookingSchedule: z.array(
      z.object({
        id: z.number(),
        createdAt: z.string().date(),
        updatedAt: z.string().date(),
        psychologistId: z.string(),
        isBooked: z.boolean(),
        dateTime: z.string().datetime(),
        meetingLink: z.string().nullable(),
      }),
    ),
    psychologyTopic: z.array(
      z.object({
        userId: z.string(),
        topicId: z.number(),
      }),
    ),
    education: z.array(educationSchema),
    reviewPsychologistId: z.array(
      z.object({
        id: z.number(),
        createdAt: z.string().datetime(),
        userId: z.string(),
        psychologistId: z.string(),
        rate: z.number(),
        reviewText: z.string(),
        user: selectUserSchema,
      }),
    ),
    rate: z.number().nullable(),
  }),
);

export const containsUppercase = (str: string) => /[A-Z]/.test(str);

export const containsNumber = (str: string) => /\d/.test(str);

export const containsSpecialChars = (str: string) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return specialChars.test(str);
};

export const passwordSchema = z.string().superRefine((value, ctx) => {
  if (value.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Must be 8 or more characters long",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsUppercase(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one uppercase letter",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsNumber(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one number",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsSpecialChars(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one special characters (@, #, $, etc.)",
      fatal: true,
    });

    return z.NEVER;
  }
});

export const insertUserSchema = z.object({
  email: z.string().email("Not a valid email"),
  name: z.string().min(1, "Name required"),
  password: passwordSchema,
  role: roleSchema.default($Enums.UserRole.USER),
  description: z.string().optional(),
  educations: z.array(educationSchema).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  image: imageSchema.optional(),
  role: roleSchema.optional(),
  gender: genderSchema.optional(),
  description: z.string().optional(),
  birthDate: z.date().optional(),
  phoneNumber: z.string().optional(),
  status: statusSchema.optional(),
  educations: z.array(educationSchema).optional(),
});
