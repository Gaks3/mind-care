import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name at least 2 characters long' })
    .max(50, { message: 'Name cant more than 50 characters long' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(2)
    .max(50),

  password: z
    .string()
    .min(8, { message: 'Password must at least 8 characters long' })
    .max(50, { message: 'Password cant more than 50 character long' }),
});

export const signInSchema = formSchema.pick({
  email: true,
  password: true,
});
