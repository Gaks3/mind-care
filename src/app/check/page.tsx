"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  age: z.coerce.string().min(1, "This field is required"),
  sleep_hours: z.coerce.string().min(1, "This field is required"),
  work_hours: z.coerce.string().min(1, "This field is required"),
  feels_anxious: z
    .enum(["Yes", "No"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select an answer",
    }),
  has_support: z
    .enum(["Yes", "No"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select an answer",
    }),
  eats_well: z
    .enum(["Yes", "No"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select an answer",
    }),
  physical_activity: z
    .enum(["Yes", "No"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select an answer",
    }),
  uses_social_media_hours: z.coerce.string().min(1, "This field is required"),
  has_sleep_disorder: z
    .enum(["Yes", "No"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select an answer",
    }),
  satisfaction_level: z.coerce.string().min(1, "This field is required"),
});

type FormInput = z.infer<typeof formSchema>;

export default function MentalCheckForm() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [predictionResult, setPredictionResult] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormInput) => {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Processing failed");
      return res.json();
    },
    onSuccess: (data) => {
      setPredictionResult(data.prediction);
      setOpenModal(true);
      router.refresh();
      reset();
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });

  const onSubmit = (data: FormInput) => {
    mutate(data);
  };

  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      router.refresh();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }, 100);
  };

  const getResultDescription = (result: string) => {
    if (!result) return "";

    switch (result.toLowerCase()) {
      case "healthy":
        return "Great job! Your responses indicate a healthy mental state. Continue maintaining your positive habits and self-care routines.";
      case "chronic stress":
        return "Your responses indicate you may be experiencing Chronic Stress. Consider practicing mindfulness, taking short breaks throughout the day, and ensuring you get enough rest. Talking to a friend or professional can also help manage stress levels. MindCare can help you";
      case "mild stress":
        return "Your responses indicate you may be experiencing Mild Stress. Consider practicing mindfulness, taking short breaks throughout the day, and ensuring you get enough rest. Talking to a friend or professional can also help manage stress levels. MindCare can help you";
      case "depression":
        return "Your responses suggest signs of Depression. It's important to reach out to a mental health professional for proper assessment and support. Remember that seeking help is a sign of strength, not weakness. Consider activities that bring you joy and maintain social connections. MindCare can help you";
      case "anxiety disorder":
        return "Your responses suggest signs of Anxiety Disorder. It's important to reach out to a mental health professional for proper assessment and support. Remember that seeking help is a sign of strength, not weakness. Consider activities that bring you joy and maintain social connections. MindCare can help you";
      default:
        return "Thank you for completing the assessment. Remember that mental health is an important part of overall wellbeing.";
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow space-y-4">
      <h1 className="text-base md:text-xl font-bold">
        Mental Health Check with model AI
      </h1>
      <p className="text-md text-muted-foreground">
        Please answer these questions
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input placeholder="Example: 18" type="text" {...register("age")} />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="sleep_hours">Sleep Hours</Label>
          <Input
            placeholder="Example: 7.5"
            type="text"
            {...register("sleep_hours")}
          />
          {errors.sleep_hours && (
            <p className="text-red-500 text-sm">{errors.sleep_hours.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="work_hours">Work/Study Hours</Label>
          <Input
            placeholder="Example: 8"
            type="text"
            {...register("work_hours")}
          />
          {errors.work_hours && (
            <p className="text-red-500 text-sm">{errors.work_hours.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="feels_anxious">Feel Anxious Often?</Label>
          <Select
            onValueChange={(value) => {
              setValue("feels_anxious", value as "Yes" | "No");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.feels_anxious && (
            <p className="text-red-500 text-sm">
              {errors.feels_anxious.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="has_support">Have Social Support?</Label>
          <Select
            onValueChange={(value) => {
              setValue("has_support", value as "Yes" | "No");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.has_support && (
            <p className="text-red-500 text-sm">{errors.has_support.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="eats_well">Eat Healthy?</Label>
          <Select
            onValueChange={(value) => {
              setValue("eats_well", value as "Yes" | "No");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.eats_well && (
            <p className="text-red-500 text-sm">{errors.eats_well.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="physical_activity">Regular Physical Activity?</Label>
          <Select
            onValueChange={(value) => {
              setValue("physical_activity", value as "Yes" | "No");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.physical_activity && (
            <p className="text-red-500 text-sm">
              {errors.physical_activity.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="uses_social_media_hours">
            Social Media Hours (daily)
          </Label>
          <Input
            placeholder="Example: 2.5"
            type="text"
            {...register("uses_social_media_hours")}
          />
          {errors.uses_social_media_hours && (
            <p className="text-red-500 text-sm">
              {errors.uses_social_media_hours.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="has_sleep_disorder">Have Sleep Disorder?</Label>
          <Select
            onValueChange={(value) => {
              setValue("has_sleep_disorder", value as "Yes" | "No");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          {errors.has_sleep_disorder && (
            <p className="text-red-500 text-sm">
              {errors.has_sleep_disorder.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="satisfaction_level">
            Your life satisfaction level (1-10)
          </Label>
          <Input
            placeholder="Example: 3"
            type="text"
            {...register("satisfaction_level")}
          />
          {errors.satisfaction_level && (
            <p className="text-red-500 text-sm">
              {errors.satisfaction_level.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Processing..." : "Submit & Predict"}
        </Button>
      </form>

      <Dialog
        open={openModal}
        onOpenChange={(open) => {
          if (!open) closeModal();
          else setOpenModal(true);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prediction Result</DialogTitle>
            <DialogDescription>
              Based on your inputs, we have the following prediction:
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <h1 className="text-center text-xl font-semibold">
              {predictionResult}
            </h1>
            <p className="text-center text-sm">
              {getResultDescription(predictionResult)}
            </p>
          </div>
          <DialogFooter className="flex flex-col md:flex-row items-center gap-4">
            {predictionResult.toLowerCase() !== "healthy" && (
              <Link href="/bookings">
                <Button>
                  <Calendar className="h-5 w-5" />
                  Booking Now
                </Button>
              </Link>
            )}
            <Button onClick={closeModal} variant="outline">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
