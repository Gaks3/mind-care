import { z } from "zod";
import { GenderUser, StatusUser, UserRole } from "@/types";
import { imageSchema } from "../../type/image.type";

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

export const createUserSchema = z.object({
  email: z.string().email("Not a valid email"),
  name: z.string().min(1, "Name required"),
  password: passwordSchema,
  role: z
    .enum([UserRole.USER, UserRole.PSYCHOLOGY, UserRole.ADMIN])
    .default(UserRole.USER),
  description: z.string().optional(),
  education: z
    .array(
      z.object({
        institution: z.string().trim(),
        degree: z.string().trim(),
        year: z.string().trim(),
      }),
    )
    .optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  image: imageSchema.optional(),
  role: z.enum([UserRole.USER, UserRole.PSYCHOLOGY, UserRole.ADMIN]).optional(),
  gender: z.enum([GenderUser.FEMALE, GenderUser.MALE]).optional(),
  description: z.string().max(500).optional(),
  birthDate: z.date().optional(),
  phoneNumber: z.string().optional(),
  status: z.enum([StatusUser.STUDENT, StatusUser.WORKER]).optional(),
  educations: z
    .array(
      z.object({
        institution: z.string().trim().min(1),
        degree: z.string().trim().min(1),
        year: z.string().trim().min(1),
      }),
    )
    .optional(),
});
