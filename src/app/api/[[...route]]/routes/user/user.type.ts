import { z } from "zod";
import {
  containsNumber,
  containsSpecialChars,
  containsUppercase,
} from "../../lib/utils";
import { GenderUser, StatusUser, UserRole } from "@/types";

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
});

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 3 * 1024 * 1024;

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  image: z
    .instanceof(File)
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: `File must be one of the following types: ${ALLOWED_IMAGE_TYPES.join(
        ", "
      )}`,
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than 3MB.`,
    })
    .optional(),
  role: z.enum([UserRole.USER, UserRole.PSYCHOLOGY, UserRole.ADMIN]).optional(),
  gender: z.enum([GenderUser.FEMALE, GenderUser.MALE]).optional(),
  description: z.string().max(500).optional(),
  birthDate: z.date().optional(),
  phoneNumber: z.string().optional(),
  status: z.enum([StatusUser.STUDENT, StatusUser.WORKER]).optional(),
});
