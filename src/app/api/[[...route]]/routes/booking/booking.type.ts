import { StatusBooking } from "@/types";
import { z } from "zod";

export const createScheduleSchema = z.object({
  dateTime: z.string().datetime(),
  meetingLink: z.string().optional(),
  isBooked: z.boolean().optional(),
});

export const createSessionSchema = z.object({
  bookingId: z.number(),
});

export const updateScheduleSchema = z.object({
  dateTime: createScheduleSchema.shape.dateTime.optional(),
  meetingLink: createScheduleSchema.shape.meetingLink.optional(),
  isBooked: createScheduleSchema.shape.isBooked.optional(),
});

export const updateSessionSchema = z.object({
  status: z.enum([
    StatusBooking.ACCEPTED,
    StatusBooking.CANCELLED,
    StatusBooking.PENDING,
    StatusBooking.REJECTED,
  ]),
});
