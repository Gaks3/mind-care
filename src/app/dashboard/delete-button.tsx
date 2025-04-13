"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface DeleteBookingButtonProps {
  sessionId: number;
}

export function DeleteBookingButton({ sessionId }: DeleteBookingButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBooking = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/bookings/sessions/${sessionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this booking. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteBooking}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
