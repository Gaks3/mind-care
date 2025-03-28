"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarPlus, Loader2 } from "lucide-react"
import { format, set } from "date-fns"
import { id } from "date-fns/locale"

export function AddScheduleButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)

  const timeOptions = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8
    const minute = (i % 2) * 30
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  })

  const handleSubmit = async () => {
    if (!date || !time) return

    setIsLoading(true)

    const [hours, minutes] = time.split(":").map(Number)
    const dateTime = set(date, { hours, minutes, seconds: 0, milliseconds: 0 })

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
      })

      if (!response.ok) {
        throw new Error("Failed to add schedule")
      }

      setDate(undefined)
      setTime(undefined)
      setIsOpen(false)

      router.refresh()
    } catch (error) {
      console.error("Error adding schedule:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = date && time

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-primary hover:bg-primary/90">
        <CalendarPlus className="h-4 w-4 mr-2" />
        Add Schedule
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Add New Schedule</DialogTitle>
            <DialogDescription>Select a date and time for the new consultation schedule.</DialogDescription>
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
            <Button onClick={handleSubmit} disabled={!isFormValid || isLoading} className="w-full sm:w-auto">
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
    </>
  )
}
