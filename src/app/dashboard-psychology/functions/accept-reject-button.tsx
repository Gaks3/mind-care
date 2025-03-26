"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export function BookingActions({ sessionId }: { sessionId: number }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [actionType, setActionType] = useState<"accept" | "reject" | null>(null)

  const handleAccept = async () => {
    setIsLoading(true)
    setActionType("accept")
    try {
      const response = await fetch(`/api/bookings/sessions/${sessionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "ACCEPTED" }),
      })

      if (!response.ok) {
        throw new Error("Failed to accept booking")
      }

      router.refresh()
    } catch (error) {
      console.error("Error accepting booking:", error)
    } finally {
      setIsLoading(false)
      setActionType(null)
    }
  }

  const handleReject = async () => {
    setIsLoading(true)
    setActionType("reject")
    try {
      const response = await fetch(`/api/bookings/sessions/${sessionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "REJECTED" }),
      })

      if (!response.ok) {
        throw new Error("Failed to reject booking")
      }

      router.refresh()
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
        onClick={handleAccept}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="sm"
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
      <Button onClick={handleReject} disabled={isLoading} variant="destructive" size="sm">
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
    </div>
  )
}

