"use client"

import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { client } from "@/lib/api"
import { UserRole } from "@/types"
import { createUserSchema } from "@/app/api/[[...route]]/routes/user/user.type"


type FormValues = z.infer<typeof createUserSchema>

export default function AddUserPage() {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.USER,
    },
  })

  const addUserMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return client.api.users.$post({ json: data })
    },
    onSuccess: () => {
      toast.success("User created successfully")
      form.reset()
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred")
    },
  })

  return (
    <div className="container mx-auto py-6 max-w-2xl" >
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.push("/admin")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Create a new user account in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => addUserMutation.mutate(data))} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Password must be at least 8 characters long.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER">USER</SelectItem>
                        <SelectItem value="PSYCHOLOGY">PSYCHOLOGY</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>This determines what permissions the user will have.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={addUserMutation.isPending}>
                {addUserMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {addUserMutation.isPending ? "Creating User..." : "Create User"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div >
  )
}