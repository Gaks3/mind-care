import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nama harus diisi dengan minimal 2 karakter" })
    .max(50, { message: "Nama tidak boleh lebih dari 50 karakter" }),
  email: z.string().email({ message: "Silahkan masukkan email yang valid" }).min(2).max(50),

  password: z
    .string()
    .min(8, { message: "Password harus diisi dengan minimal 8 karakter" })
    .max(50, { message: "Password tidak boleh lebih dari 50 karakter" }),
});

export const signInSchema = formSchema.pick({
  email: true,
  password: true,
});
