import { $Enums } from "@prisma/client";
import { z } from "zod";

export const selectScheduleSchema = z.object({
  id: z.number(),
  psychologistId: z.string(),
  isBooked: z.boolean(),
  dateTime: z.string().datetime(),
  meetingLink: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const bookingStatusSchema = z.enum([
  $Enums.BookingStatus.ACCEPTED,
  $Enums.BookingStatus.CANCELLED,
  $Enums.BookingStatus.PENDING,
  $Enums.BookingStatus.REJECTED,
]);

export const selectSessionSchema = z.object({
  id: z.number(),
  status: bookingStatusSchema,
  userId: z.string(),
  bookingId: z.number(),
  reason: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const insertScheduleSchema = z.object({
  dateTime: z.string().datetime(),
  meetingLink: z.string().optional(),
  isBooked: z.boolean().optional().default(false),
});

export const insertSessionSchema = z.object({
  bookingId: selectSessionSchema.shape.bookingId,
});

export const updateScheduleSchema = z.object({
  dateTime: insertScheduleSchema.shape.dateTime.optional(),
  meetingLink: insertScheduleSchema.shape.meetingLink.optional(),
  isBooked: insertScheduleSchema.shape.isBooked.optional(),
});

export const updateSessionSchema = z
  .object({
    status: bookingStatusSchema,
    reason: z.string().optional(),
    meetingLink: z.string().url().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.status === "ACCEPTED" && !input.meetingLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Meeting link required",
        fatal: true,
      });

      return z.NEVER;
    }
  });
