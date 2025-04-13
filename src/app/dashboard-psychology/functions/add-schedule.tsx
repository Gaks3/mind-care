"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarPlus, Loader2, FilePlus, ImagePlus, X } from "lucide-react";
import { format, set } from "date-fns";
import { id } from "date-fns/locale";

const topikTypes = [
  "Depression",
  "Anxiety",
  "Disorder",
  "Toxic",
  "Relationship",
  "Burnout",
  "Trauma",
  "Family Issues",
  "Trust Issues",
  "Insomnia",
];

export function AddScheduleButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);

  const [categories, setCategories] = useState<number[]>([]);
  const [isOpenArticle, setIsOpenArticle] = useState(false);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);

  const inputTitle = useRef(null);
  const fileName = useRef(null);
  const fileImage = useRef(null);

  const timeOptions = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  });

  const handleSubmit = async () => {
    if (!date || !time) return;

    setIsLoading(true);

    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = set(date, { hours, minutes, seconds: 0, milliseconds: 0 });

    try {
      const response = await fetch("/api/bookings/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateTime: dateTime.toISOString(),
          meetingLink: "",
          isBooked: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add schedule");
      }

      setDate(undefined);
      setTime(undefined);
      setIsOpen(false);

      router.refresh();
    } catch (error) {
      console.error("Error adding schedule:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitArticle = async (title, content, image, categories) => {
    if (
      categories.length === 0 ||
      !fileImage.current ||
      !inputTitle.current.value
    )
      return;

    setIsLoadingArticle(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("categories", categories);

      const res = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      return router.push(`/articles/${data.data.id}/edit`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingArticle(false);
    }
  };

  const handleInput = (e) => {
    if (e.target.files.length > 0 && e.target.files) {
      fileName.current.textContent = `Selected: ${e.target.files[0].name}`;
      fileImage.current = e.target.files[0];
    } else {
      fileName.current.textContent = "Insert Image";
    }
  };

  const handleCategories = (i: number) => {
    setCategories((prev) => {
      if (prev.includes(i)) {
        return prev.filter((item) => item !== i);
      }
      return prev.length < 3 ? [...prev, i] : prev;
    });
  };

  const selectedCategories = categories.map((index) => topikTypes[index]);

  const isFormValid = date && time;

  const isArticleValid =
    categories.length === 0 || !fileImage.current || !inputTitle.current.value;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-primary/90"
      >
        <CalendarPlus className="h-4 w-4 mr-2" />
        Add Schedule
      </Button>

      <Button
        onClick={() => setIsOpenArticle(true)}
        className="text-primary bg-white border-primary border-2 ml-4 hover:bg-gray-100"
      >
        <FilePlus className="h-4 w-4 mr-2" />
        Create Article
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Add New Schedule</DialogTitle>
            <DialogDescription>
              Select a date and time for the new consultation schedule.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
                locale={id}
                disabled={(date) => date < new Date()}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((timeOption) => (
                    <SelectItem key={timeOption} value={timeOption}>
                      {timeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {date && time && (
              <div className="text-sm text-muted-foreground">
                Scheduled for:{" "}
                <span className="font-medium text-foreground">
                  {format(
                    set(date, {
                      hours: Number.parseInt(time.split(":")[0]),
                      minutes: Number.parseInt(time.split(":")[1]),
                    }),
                    "EEEE, dd MMMM yyyy - HH:mm",
                    { locale: id },
                  )}
                </span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Schedule"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenArticle} onOpenChange={setIsOpenArticle}>
        <DialogContent className="sm:max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Create New Article</DialogTitle>
            <DialogDescription>
              fill the title, image, and categories
            </DialogDescription>
          </DialogHeader>

          <div className="w-full">
            <p>Title:</p>
            <input
              type="text"
              placeholder="Article's title"
              className="py-1.5 pl-2 border-[1px] border-black/70 w-full rounded-md focus:outline-black/80"
              ref={inputTitle}
            />
          </div>

          <div className="w-full">
            <p>Image:</p>
            <div className="border-[1px] border-black/70 h-28 rounded-md bg-white relative flex flex-col justify-center items-center">
              <ImagePlus className="w-10 h-10 text-black/70" />
              <p ref={fileName} className="text-black/70 font-medium">
                Insert Image
              </p>
              <input
                onChange={handleInput}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="w-full h-full opacity-0 absolute cursor-pointer"
              />
            </div>
          </div>

          <div className="">
            <p>Categories:</p>
            <div className="flex gap-2 flex-wrap">
              {topikTypes.map((topik, i) => (
                <div
                  key={i}
                  onClick={() => handleCategories(i)}
                  className={`
                  text-xs font-medium px-3 py-2 rounded-xl 
                  flex items-center justify-center transition-colors
                  ${
                    categories.includes(i)
                      ? "bg-blue-100 hover:bg-blue-200 cursor-pointer"
                      : categories.length === 3
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-gray-800 hover:bg-blue-200 cursor-pointer"
                  }
                `}
                >
                  {topik}
                  {categories.includes(i) && <X className="w-4 h-4 ml-1" />}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() =>
                handleSubmitArticle(
                  inputTitle.current.value,
                  "Article's Content",
                  fileImage.current,
                  selectedCategories,
                )
              }
              disabled={isArticleValid || isLoadingArticle}
              className="w-full sm:w-auto"
            >
              {isLoadingArticle ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                "Create Article"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
