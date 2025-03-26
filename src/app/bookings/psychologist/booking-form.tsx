/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { client } from "@/lib/api"

interface BookingSchedule {
  id: number
  psychologistId: string
  isBooked: boolean
  dateTime: string
  meetingLink: string | null
  createdAt: string
  updatedAt: string
}

interface BookingFormProps {
  bookingSchedules: BookingSchedule[]
  psychologistId: string
  psychologistName: string
  userId: string
}

const formSchema = z.object({
  bookingId: z.number({
    required_error: "Silakan pilih jadwal konsultasi",
  }),
})

type BookingFormValues = z.infer<typeof formSchema>

export default function BookingForm({ bookingSchedules, psychologistId, psychologistName, userId }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<BookingSchedule | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingId: 0,
    },
  })

  const schedulesByDate = bookingSchedules.reduce(
    (acc, schedule) => {
      const dateKey = format(parseISO(schedule.dateTime), "yyyy-MM-dd")
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(schedule)
      return acc
    },
    {} as Record<string, BookingSchedule[]>,
  )

  const getTimeSlotsForDate = (date: Date | null) => {
    if (!date) return []
    const dateKey = format(date, "yyyy-MM-dd")
    return schedulesByDate[dateKey] || []
  }

  const formatTimeSlot = (dateTimeStr: string) => {
    const dateTime = parseISO(dateTimeStr)
    return format(dateTime, "HH:mm")
  }

  const hasAvailableSlots = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    const slots = schedulesByDate[dateKey] || []
    return slots.some((slot) => !slot.isBooked)
  }

  const datesWithSlots = Object.keys(schedulesByDate).map((dateStr) => new Date(dateStr))

  const selectedDateTimeSlots = getTimeSlotsForDate(selectedDate)

  const filteredTimeSlots = selectedDateTimeSlots.filter(
    (slot) => !psychologistId || slot.psychologistId === psychologistId
  )

  const handleSelectTimeSlot = (slot: BookingSchedule) => {
    setSelectedSlot(slot)
    form.setValue("bookingId", slot.id)
  }

  const onSubmit = async (data: BookingFormValues) => {
    try {
      setIsSubmitting(true)

      const response = await client.api.bookings.sessions.$post({
        json: {
          bookingId: data.bookingId
        }
      })

      if (response.ok) {
        await response.json()
        toast.success(`Booking dengan ${psychologistName} berhasil ditambahkan`)
        form.reset({
          bookingId: 0,
        })
        setSelectedDate(null)
        setSelectedSlot(null)
      } else {
        toast.error("Terjadi kesalahan saat booking")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Terjadi kesalahan saat booking")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pilih Jadwal Konsultasi dengan {psychologistName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Tanggal Konsultasi</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                    onClick={() => {
                      if (selectedSlot) {
                        setSelectedSlot(null)
                        form.setValue("bookingId", 0, { shouldValidate: false })
                      }
                    }}
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd MMMM yyyy") : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      if (selectedSlot) {
                        setSelectedSlot(null)
                        form.setValue("bookingId", 0, { shouldValidate: false })
                      }
                    }}
                    modifiers={{
                      available: datesWithSlots,
                    }}
                    modifiersStyles={{
                      available: {
                        fontWeight: "bold",
                        textDecoration: "underline",
                        color: "black",
                      },
                    }}
                    disabled={(date) => !hasAvailableSlots(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Slots */}
            <FormField
              control={form.control}
              name="bookingId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2">
                      {selectedDate && (
                        <>
                          <Label>Waktu Konsultasi</Label>
                          {filteredTimeSlots.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                              {filteredTimeSlots.map((slot) => (
                                <Button
                                  key={slot.id}
                                  type="button"
                                  variant={selectedSlot?.id === slot.id ? "default" : slot.isBooked ? "outline" : "secondary"}
                                  className={cn("justify-center", slot.isBooked && "opacity-50 cursor-not-allowed")}
                                  disabled={slot.isBooked}
                                  onClick={() => handleSelectTimeSlot(slot)}
                                >
                                  {formatTimeSlot(slot.dateTime)}
                                  {slot.isBooked && (
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      Booked
                                    </Badge>
                                  )}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted-foreground py-4">Tidak ada jadwal tersedia untuk tanggal ini</p>
                          )}
                          {form.formState.errors.bookingId && (
                            <p className="text-sm font-medium text-destructive">{form.formState.errors.bookingId.message}</p>
                          )}
                        </>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!selectedSlot || isSubmitting}>
              {isSubmitting ? "Memproses..." : "Booking Sekarang"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}