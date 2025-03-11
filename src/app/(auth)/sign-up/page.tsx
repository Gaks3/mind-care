/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AtSign,
  KeyRound,
  UserPlus,
  Brain,
  Eye,
  EyeOff,
  User,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    shouldFocusError: false,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    const { data, error } = await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: () => {
          toast("Please wait...");
          setIsSubmitting(true);
        },
        onSuccess: () => {
          form.reset();
          toast("Sign up success");
          router.push("/sign-in");
        },
        onError: ({ error }) => {
          let errorMessage = error.message;

          if (
            errorMessage.includes("already exists") ||
            errorMessage.includes("duplicate")
          ) {
            errorMessage =
              "Email ini sudah terdaftar. Silahkan gunakan email lain.";
          }

          toast("Sign up failed", {
            description: errorMessage,
          });

          form.setError("email", {
            type: "manual",
            message: errorMessage,
          });
          setIsSubmitting(false);
        },
      }
    );
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl border shadow-md rounded-xl overflow-hidden">
        <div className="flex flex-col items-center pt-8 pb-2">
          <div className="h-16 w-16 bg-gradient-to-br from-primary to-blue-300 rounded-full flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>

        <CardHeader className="space-y-1 pb-2 pt-4">
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Daftar Akun di MindCare, Yuk!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-4 px-8 md:px-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Nama
                    </FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Nama"
                          className="pl-10 py-2 bg-transparent border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Email
                    </FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AtSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Email"
                          className="pl-10 py-2 bg-transparent border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Password
                    </FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyRound className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Masukkan Kata Sandi"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 py-2 bg-transparent border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {!showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-2.5 md:py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">Signing Up...</div>
                ) : (
                  <>
                    Sign Up <UserPlus className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center px-8 py-6">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
