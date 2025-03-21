"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CalendarCheck,
  Clock,
  History,
  User,
  LogOut,
  Video,
  Phone,
  ChevronDown,
  Calendar,
  Brain,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Sample data - in a real app, this would come from an API
const pendingBookings = [
  {
    id: 1,
    title: "Konsultasi Kesehatan Mental",
    date: "2025-03-20",
    time: "13:00 - 14:00",
    status: "pending",
    client: {
      name: "Budi Santoso",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "budi@example.com",
      phone: "+6281234567890",
    },
  },
  {
    id: 2,
    title: "Sesi Terapi Kecemasan",
    date: "2025-03-21",
    time: "10:00 - 11:00",
    status: "pending",
    client: {
      name: "Siti Rahayu",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "siti@example.com",
      phone: "+6287654321098",
    },
  },
]

const upcomingBookings = [
  {
    id: 3,
    title: "Konsultasi Lanjutan",
    date: "2025-03-18",
    time: "09:00 - 10:00",
    status: "confirmed",
    zoomLink: "https://zoom.us/j/123456789",
    whatsappNumber: "+6281234567890",
    client: {
      name: "Dewi Anggraini",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "dewi@example.com",
      phone: "+6289876543210",
    },
  },
]

const sessionHistory = [
  {
    id: 101,
    title: "Konsultasi Awal",
    date: "2025-03-10",
    time: "10:00 - 11:00",
    notes:
      "Klien menunjukkan tanda-tanda kecemasan ringan. Direkomendasikan untuk melakukan latihan pernapasan dan mindfulness.",
    client: {
      name: "Ahmad Rizki",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "ahmad@example.com",
      phone: "+6282345678901",
    },
  },
  {
    id: 102,
    title: "Sesi Terapi Depresi",
    date: "2025-03-05",
    time: "14:00 - 15:00",
    notes: "Klien menunjukkan kemajuan positif. Melanjutkan terapi kognitif perilaku.",
    client: {
      name: "Maya Putri",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "maya@example.com",
      phone: "+6283456789012",
    },
  },
]

export default function PsychologistDashboard() {
  const [bookings, setBookings] = useState({
    pending: [...pendingBookings],
    upcoming: [...upcomingBookings],
    history: [...sessionHistory],
  })

  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  const totalClients = new Set([
    ...bookings.pending.map((b) => b.client.email),
    ...bookings.upcoming.map((b) => b.client.email),
    ...bookings.history.map((b) => b.client.email),
  ]).size

  const handleAccept = (booking) => {
    setSelectedBooking(booking)
    setDialogType("accept")
    setIsDialogOpen(true)
  }

  const handleReject = (booking) => {
    setSelectedBooking(booking)
    setDialogType("reject")
    setRejectionReason("")
    setIsDialogOpen(true)
  }

  const confirmAction = () => {
    if (dialogType === "accept") {
      // Move from pending to upcoming
      const updatedPending = bookings.pending.filter((b) => b.id !== selectedBooking.id)
      const acceptedBooking = {
        ...selectedBooking,
        status: "confirmed",
        zoomLink: "https://zoom.us/j/123456789", // In a real app, generate this
      }

      setBookings({
        ...bookings,
        pending: updatedPending,
        upcoming: [...bookings.upcoming, acceptedBooking],
      })
    } else if (dialogType === "reject") {
      // Remove from pending
      const updatedPending = bookings.pending.filter((b) => b.id !== selectedBooking.id)

      setBookings({
        ...bookings,
        pending: updatedPending,
      })

      // In a real app, you would store the rejection reason and notify the user
    }

    setIsDialogOpen(false)
    setSelectedBooking(null)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-gray-900">MindCare</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Anita Wijaya" />
                    <AvatarFallback className="bg-primary text-primary-foreground">AW</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">Dr. Anita Wijaya</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Selamat Datang, Dr. Anita 👋</h1>
              <p className="text-primary-foreground/80">Psikolog Klinis</p>
            </div>
            <div className="flex gap-4">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Permintaan Baru</p>
                    <p className="text-xl font-bold">{bookings.pending.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Sesi Mendatang</p>
                    <p className="text-xl font-bold">{bookings.upcoming.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="hidden md:block bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Total Klien</p>
                    <p className="text-xl font-bold">{totalClients}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto p-4 md:p-6">
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Permintaan Sesi Baru
              </CardTitle>
              <CardDescription>Menunggu konfirmasi Anda</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.pending.length > 0 ? (
                <div className="space-y-4">
                  {bookings.pending.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={booking.client.avatar} alt={booking.client.name} />
                            <AvatarFallback>{booking.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{booking.title}</h3>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Menunggu
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{booking.client.name}</p>
                              <p>{booking.client.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <CalendarCheck className="h-4 w-4 text-primary" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-primary" />
                              {booking.time}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleAccept(booking)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Terima</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleReject(booking)}
                            >
                              <XCircle className="h-4 w-4" />
                              <span>Tolak</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">Tidak ada permintaan sesi baru</p>
              )}
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Jadwal Sesi
              </CardTitle>
              <CardDescription>Sesi yang akan datang</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.upcoming.length > 0 ? (
                <div className="space-y-4">
                  {bookings.upcoming.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={booking.client.avatar} alt={booking.client.name} />
                            <AvatarFallback>{booking.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{booking.title}</h3>
                              <Badge className="bg-primary">Terkonfirmasi</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{booking.client.name}</p>
                              <p>{booking.client.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <CalendarCheck className="h-4 w-4 text-primary" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-primary" />
                              {booking.time}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 mt-3">
                            <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                              <Link href={booking.zoomLink} target="_blank">
                                <Video className="h-4 w-4 text-blue-600" />
                                <span>Host Zoom</span>
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                              <Link href={`https://wa.me/${booking.client.phone.replace("+", "")}`} target="_blank">
                                <Phone className="h-4 w-4 text-green-600" />
                                <span>WhatsApp</span>
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">Tidak ada jadwal sesi yang akan datang</p>
              )}
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Riwayat Sesi
              </CardTitle>
              <CardDescription>Sesi yang telah selesai</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.history.length > 0 ? (
                <div className="space-y-4">
                  {bookings.history.map((session) => (
                    <Card key={session.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={session.client.avatar} alt={session.client.name} />
                            <AvatarFallback>{session.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{session.client.name}</p>
                              <p>{session.client.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <CalendarCheck className="h-4 w-4 text-primary" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-primary" />
                              {session.time}
                            </span>
                          </div>
                          <div className="mt-3 p-3 bg-background rounded-md border text-sm">
                            <p className="font-medium mb-1">Catatan:</p>
                            <p className="text-muted-foreground">{session.notes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">Belum ada riwayat sesi</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:hidden">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Permintaan</TabsTrigger>
              <TabsTrigger value="upcoming">Jadwal</TabsTrigger>
              <TabsTrigger value="history">Riwayat</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-4">
              {bookings.pending.length > 0 ? (
                <div className="space-y-4">
                  {bookings.pending.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={booking.client.avatar} alt={booking.client.name} />
                            <AvatarFallback>{booking.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{booking.title}</h3>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Menunggu
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{booking.client.name}</p>
                              <p>{booking.client.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30">
                          <div className="flex flex-col gap-2 text-sm">
                            <span className="flex items-center gap-1">
                              <CalendarCheck className="h-4 w-4 text-primary" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-primary" />
                              {booking.time}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleAccept(booking)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Terima</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleReject(booking)}
                            >
                              <XCircle className="h-4 w-4" />
                              <span>Tolak</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">Tidak ada permintaan sesi baru</p>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="mt-4">
              {bookings.upcoming.length > 0 ? (
                <div className="space-y-4">
                  {bookings.upcoming.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={booking.client.avatar} alt={booking.client.name} />
                            <AvatarFallback>{booking.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{booking.title}</h3>
                              <Badge className="bg-primary">Terkonfirmasi</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{booking.client.name}</p>
                              <p>{booking.client.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30">
                          <div className="flex flex-col gap-2 text-sm">
                            <span className="flex items-center gap-1">
                              <CalendarCheck className="h-4 w-4 text-primary" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-primary" />
                              {booking.time}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 mt-3">
                            <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                              <Link href={booking.zoomLink} target="_blank">
                                <Video className="h-4 w-4 text-blue-600" />
                                <span>Host Zoom</span>
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                              <Link href={`https://wa.me/${booking.client.phone.replace("+", "")}`} target="_blank">
                                <Phone className="h-4 w-4 text-green-600" />
                                <span>WhatsApp</span>
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">Tidak ada jadwal sesi yang akan datang</p>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              {bookings.history.length > 0 ? (
                <div className="space-y-4">
                  {bookings.history.map((session) => (
                    <Card key={session.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={session.client.avatar} alt={session.client.name} />
                            <AvatarFallback>{session.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{session.client.name}</p>
                              <p>{session.client.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30">
                          <div className="flex flex-col gap-2 text-sm">
                            <span className="flex items-center gap-1">
                              <CalendarCheck className="h-4 w-4 text-primary" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-primary" />
                              {session.time}
                            </span>
                          </div>
                          <div className="mt-3 p-3 bg-background rounded-md border text-sm">
                            <p className="font-medium mb-1">Catatan:</p>
                            <p className="text-muted-foreground">{session.notes}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">Belum ada riwayat sesi</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Accept/Reject Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogType === "accept" ? "Terima Permintaan Sesi" : "Tolak Permintaan Sesi"}</DialogTitle>
            <DialogDescription>
              {dialogType === "accept"
                ? "Anda akan menerima permintaan sesi ini. Klien akan diberitahu bahwa sesi telah dikonfirmasi."
                : "Anda akan menolak permintaan sesi ini. Harap berikan alasan penolakan untuk klien."}
            </DialogDescription>
          </DialogHeader>

          {dialogType === "reject" && (
            <div className="grid gap-4 py-4">
              <Textarea
                placeholder="Alasan penolakan (opsional)"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={confirmAction}
              className={dialogType === "accept" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {dialogType === "accept" ? "Konfirmasi Terima" : "Konfirmasi Tolak"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

