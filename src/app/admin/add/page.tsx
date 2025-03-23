"use client"

import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react"
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
import { useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"


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
      description: "",
    },
  })

  const selectedRole = form.watch("role")

  useEffect(() => {
    if (selectedRole !== "PSYCHOLOGY") {
      form.setValue("description", "")
      form.setValue("education", [{
        institution: "",
        degree: "",
        year: "",
      }])
    }
  }, [selectedRole, form])

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

  const addEducation = () => {
    const currentEducations = form.getValues("education") || []
    form.setValue("education", [
      ...currentEducations,
      { institution: "", degree: "", year: "" },
    ])
  }

  const removeEducation = (index: number) => {
    const currentEducations = form.getValues("education") || []
    if (currentEducations.length > 1) {
      form.setValue("education", currentEducations.filter((_, i) => i !== index))
    }
  }

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
            <form onSubmit={form.handleSubmit((data) => {
              addUserMutation.mutate(data)
            })} className="space-y-6">
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
                      <Input type="password" {...field} />
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

              {selectedRole === "PSYCHOLOGY" && (
                <>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Psychology Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter psychology professional description, qualifications, specialties, etc."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details about this psychology professionals background and expertise.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Education</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addEducation}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add Education
                      </Button>
                    </div>

                    {form.watch("education")?.map((_, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Education #{index + 1}</h4>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(index)}
                              className="h-8 w-8 p-0 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name={`education.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institution</FormLabel>
                              <FormControl>
                                <Input placeholder="Harvard University" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`education.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                <Input placeholder="Ph.D. in Psychology" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`education.${index}.year`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year</FormLabel>
                              <FormControl>
                                <Input placeholder="2021" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

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