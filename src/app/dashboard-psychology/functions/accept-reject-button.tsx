"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function BookingActions({ sessionId }: { sessionId: number }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [actionType, setActionType] = useState<"accept" | "reject" | null>(null)
  const [meetingLink, setMeetingLink] = useState("")
  const [rejectReason, setRejectReason] = useState("")
  const [acceptOpen, setAcceptOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)

  const handleAcceptSubmit = async () => {
    if (!meetingLink.trim()) return

    setIsLoading(true)
    setActionType("accept")
    try {
      const response = await fetch(`/api/bookings/sessions/${sessionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "ACCEPTED",
          reason: "",
          meetingLink: meetingLink,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to accept booking")
      }

      router.refresh()
      setAcceptOpen(false)
    } catch (error) {
      console.error("Error accepting booking:", error)
    } finally {
      setIsLoading(false)
      setActionType(null)
    }
  }

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) return

    setIsLoading(true)
    setActionType("reject")
    try {
      const response = await fetch(`/api/bookings/sessions/${sessionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "REJECTED",
          reason: rejectReason,
          meetingLink: undefined,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to reject booking")
      }

      router.refresh()
      setRejectOpen(false)
    } catch (error) {
      console.error("Error rejecting booking:", error)
    } finally {
      setIsLoading(false)
      setActionType(null)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-3">
      <Button
        onClick={() => setAcceptOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="sm"
        disabled={isLoading}
      >
        {isLoading && actionType === "accept" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Terima</span>
          </>
        )}
      </Button>

      <Button onClick={() => setRejectOpen(true)} variant="destructive" size="sm" disabled={isLoading}>
        {isLoading && actionType === "reject" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 mr-2" />
            <span>Tolak</span>
          </>
        )}
      </Button>

      <Dialog open={acceptOpen} onOpenChange={setAcceptOpen}>
        <DialogContent className="sm:max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Terima Booking</DialogTitle>
            <DialogDescription>Masukkan link meeting untuk sesi konsultasi</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="meetingLink">Link Meeting</Label>
              <Input
                id="meetingLink"
                placeholder="https://meet.google.com/..."
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAcceptSubmit}
              disabled={isLoading || !meetingLink.trim()}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            >
              {isLoading && actionType === "accept" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Konfirmasi"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent className="sm:max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Tolak Booking</DialogTitle>
            <DialogDescription>Berikan alasan penolakan booking</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rejectReason">Alasan</Label>
              <Textarea
                id="rejectReason"
                placeholder="Berikan alasan penolakan..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleRejectSubmit}
              disabled={isLoading || !rejectReason.trim()}
              variant="destructive"
              className="w-full sm:w-auto"
            >
              {isLoading && actionType === "reject" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Konfirmasi"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

