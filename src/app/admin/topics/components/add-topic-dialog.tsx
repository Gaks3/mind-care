"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createTopicSchema = z.object({
  name: z.string().trim().min(1, "The field name is required"),
});

type CreateTopicSchema = z.infer<typeof createTopicSchema>;

export default function AddTopicDialog() {
  const router = useRouter();

  const form = useForm<CreateTopicSchema>({
    resolver: zodResolver(createTopicSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: CreateTopicSchema) => {
    try {
      const res = await client.api.topics.$post(
        {
          json: {
            ...values,
          },
        },
        {
          init: {
            credentials: "include",
          },
        },
      );

      if (res.ok) {
        toast.success("Successfully to create new topic");
        router.refresh();
      } else toast.error("Failed to create new topic");
    } catch (error) {
      console.error("Failed to create new topic", error);
      toast.error("Failed to create new topic");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Topic</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Topic</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
