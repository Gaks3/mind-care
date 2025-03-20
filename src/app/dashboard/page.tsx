import { auth } from "@/lib/auth"
import { headers } from "next/headers"
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
  BarChart3,
  Calendar,
  Brain,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect } from "next/navigation"

const upcomingBookings = [
  {
    id: 1,
    title: "Konsultasi Kesehatan Mental",
    date: "2025-03-18",
    time: "09:00 - 10:00",
    status: "confirmed",
    zoomLink: "https://zoom.us/j/123456789",
    whatsappNumber: "+6281234567890",
    psychologist: {
      name: "Dr. Anita Wijaya",
      specialty: "Psikolog Klinis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

const sessionHistory = [
  {
    id: 101,
    title: "Konsultasi Awal",
    date: "2025-03-10",
    time: "10:00 - 11:00",
    notes: "Sesi pertama berjalan lancar",
    psychologist: {
      name: "Dr. Anita Wijaya",
      specialty: "Psikolog Klinis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

export default async function ResponsiveDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user
  const totalSessions = upcomingBookings.length + sessionHistory.length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" /><span className="font-bold text-xl text-gray-900">MindCare</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <form
                    action={async () => {
                      "use server";
                      await auth.api.signOut({
                        headers: await headers(),
                      });
                      redirect("/");
                    }}
                  >
                    <Button type="submit" size="xs" variant="ghost">Sign Out</Button>
                  </form>
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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Selamat Datang, {user?.name} 👋</h1>
              <p className="text-primary-foreground/80">email: {user?.email}</p>
            </div>
            <div className="flex gap-4">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Sesi Mendatang</p>
                    <p className="text-xl font-bold">{upcomingBookings.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Total Sesi</p>
                    <p className="text-xl font-bold">{totalSessions}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto p-4 md:p-6">
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Jadwal Booking
              </CardTitle>
              <CardDescription>Sesi yang akan datang</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={booking.psychologist.avatar} alt={booking.psychologist.name} />
                            <AvatarFallback>{booking.psychologist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{booking.title}</h3>
                              <Badge
                                variant={booking.status === "confirmed" ? "default" : "outline"}
                                className={booking.status === "confirmed" ? "bg-primary" : ""}
                              >
                                {booking.status === "confirmed" ? "Terkonfirmasi" : "Menunggu"}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{booking.psychologist.name}</p>
                              <p>{booking.psychologist.specialty}</p>
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
                                <span>Join Zoom</span>
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                              <Link href={`https://wa.me/${booking.whatsappNumber.replace("+", "")}`} target="_blank">
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
                <p className="text-center py-6 text-muted-foreground">Tidak ada jadwal booking yang akan datang</p>
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
              {sessionHistory.length > 0 ? (
                <div className="space-y-4">
                  {sessionHistory.map((session) => (
                    <Card key={session.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={session.psychologist.avatar} alt={session.psychologist.name} />
                            <AvatarFallback>{session.psychologist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{session.psychologist.name}</p>
                              <p>{session.psychologist.specialty}</p>
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
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Jadwal Booking</TabsTrigger>
              <TabsTrigger value="history">Riwayat Sesi</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-4">
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={booking.psychologist.avatar} alt={booking.psychologist.name} />
                            <AvatarFallback>{booking.psychologist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{booking.title}</h3>
                              <Badge
                                variant={booking.status === "confirmed" ? "default" : "outline"}
                                className={booking.status === "confirmed" ? "bg-primary" : ""}
                              >
                                {booking.status === "confirmed" ? "Terkonfirmasi" : "Menunggu"}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{booking.psychologist.name}</p>
                              <p>{booking.psychologist.specialty}</p>
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
                                <span>Join Zoom</span>
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                              <Link href={`https://wa.me/${booking.whatsappNumber.replace("+", "")}`} target="_blank">
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
                <p className="text-center py-6 text-muted-foreground">Tidak ada jadwal booking yang akan datang</p>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              {sessionHistory.length > 0 ? (
                <div className="space-y-4">
                  {sessionHistory.map((session) => (
                    <Card key={session.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={session.psychologist.avatar} alt={session.psychologist.name} />
                            <AvatarFallback>{session.psychologist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p className="font-medium">{session.psychologist.name}</p>
                              <p>{session.psychologist.specialty}</p>
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
    </div>
  )
}

