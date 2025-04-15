"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/api";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteTopicDialog({ id }: { id: number }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const deleteTopic = async () => {
    setLoading(true);

    try {
      const res = await client.api.topics[":id"].$delete({
        param: {
          id,
        },
      });

      if (res.status !== 204) {
        const json = await res.json();
        toast.error(
          "message" in json ? json.message : "Failed to delete topic",
        );
      } else {
        toast.success("Successfully to delete topic");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete topic", error);
      toast.error("Failed to delete topic");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete this topic? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"destructive"} onClick={deleteTopic}>
              {loading ? "Deleting" : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
