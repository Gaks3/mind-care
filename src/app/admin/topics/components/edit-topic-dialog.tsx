"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const updateTopicSchema = z.object({
  name: z.string().trim().min(1, "The name field is required"),
});
type UpdateTopicSchema = z.infer<typeof updateTopicSchema>;

export default function EditTopicDialog({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<UpdateTopicSchema>({
    resolver: zodResolver(updateTopicSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (values: UpdateTopicSchema) => {
    try {
      const res = await client.api.topics[":id"].$patch(
        {
          param: {
            id,
          },
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

      const json = await res.json();

      if (!res.ok && "message" in json) toast.error(json.message);
      if (res.ok) {
        toast.success("Successfully to update topic");
        closeButtonRef.current?.click();
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update topic", error);
      toast.error("Failed to update topic");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Topic</DialogTitle>
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
            {form.formState.isSubmitting ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
