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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { redirect } from "next/navigation"
import { UserRole } from "@/types"
import { client } from "@/lib/api"

export default async function DashboardUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const sessionsResponse = await client.api.bookings.sessions.$get(undefined, {
    init: {
      headers: await headers(),
    },
  })

  const { data: sessionsData } = await sessionsResponse.json()

  const user = session?.user
  const role = session?.user?.role

  if (role === UserRole.ADMIN) {
    return redirect("/admin")
  }

  if (role === UserRole.PSYCHOLOGY) {
    return redirect("/dashboard-psychology")
  }

  const totalSessions = sessionsData.length

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
                      "use server"
                      await auth.api.signOut({
                        headers: await headers(),
                      })
                      redirect("/")
                    }}
                  >
                    <Button type="submit" size="xs" variant="ghost">
                      Sign Out
                    </Button>
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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, {user?.name} 👋</h1>
              <p className="text-primary-foreground/80">email: {user?.email}</p>
            </div>
            <div className="flex gap-4">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">Upcoming Session</p>
                    <p className="text-xl font-bold">
                      {sessionsData.filter((session) => session.status !== "ACCEPTED").length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">All Sessions</p>
                    <p className="text-xl font-bold">{totalSessions}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-6 mt-3">
          <Link href="/bookings">
            <Button>
              Booking Now
            </Button>
          </Link>
        </div>
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Booking Pending
              </CardTitle>
              <CardDescription>Session waiting for confirmation</CardDescription>
            </CardHeader>
            <CardContent>
              {sessionsData.filter((session) => session.status !== "ACCEPTED").length > 0 ? (
                <div className="space-y-4">
                  {sessionsData
                    .filter((session) => session.status !== "ACCEPTED")
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((session) => (
                      <Card key={session.id} className="overflow-hidden border">
                        <CardContent className="p-0">
                          <div className="flex items-start p-4 border-b">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>
                                <Brain className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">Online Consult</h3>
                                <Badge variant={`${session.status === "REJECTED" ? "destructive" : "outline"}`}>
                                  {session.status === "REJECTED" ? "Rejected" : "Waiting"}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <p className="font-medium">Booking ID: {session.bookingId}</p>
                                <p>Status: {session.status}</p>
                                {session.bookingSchedule && (
                                  <div className="mt-2 space-y-1 border-t pt-2">
                                    <p className="font-medium">Session Schedule:</p>
                                    <p>Name: {session.bookingSchedule.psychologist.name}</p>
                                    <p>
                                      Date: {new Date(session.bookingSchedule.dateTime).toLocaleDateString("id-ID")}
                                    </p>
                                    <p>
                                      Time:{" "}
                                      {new Date(session.bookingSchedule.dateTime).toLocaleTimeString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </p>
                                    {session.bookingSchedule.meetingLink && (
                                      <Button asChild variant="default" size="sm" className="mt-1">
                                        <Link href={session.bookingSchedule.meetingLink} target="_blank">
                                          Join Meeting
                                        </Link>
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-muted/30">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                              <p className="text-muted-foreground text-base">Booking was created on :</p>
                              <span className="flex items-center gap-1">
                                <CalendarCheck className="h-4 w-4 text-primary" />
                                {new Date(session.createdAt).toLocaleDateString("id-ID")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-primary" />
                                {new Date(session.createdAt).toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 mt-3">
                              <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                                <Link href={`https://wa.me/${session.bookingSchedule.psychologist.phoneNumber}`} target="_blank">
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
                <p className="text-center py-6 text-muted-foreground">There are no bookings waiting for confirmation.</p>
              )}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Booking Accepted
              </CardTitle>
              <CardDescription>Confirmed session</CardDescription>
            </CardHeader>
            <CardContent>
              {sessionsData.filter((session) => session.status === "ACCEPTED").length > 0 ? (
                <div className="space-y-4">
                  {sessionsData
                    .filter((session) => session.status === "ACCEPTED")
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((session) => (
                      <Card key={session.id} className="overflow-hidden border">
                        <CardContent className="p-0">
                          <div className="flex items-start p-4 border-b">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>
                                <Brain className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">Online Consult</h3>
                                <Badge variant="default" className="bg-primary">
                                  Confirmed
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <p className="font-medium">Booking ID: {session.bookingId}</p>
                                <p>Status: {session.status}</p>
                                {session.bookingSchedule && (
                                  <div className="mt-2 space-y-1 border-t pt-2">
                                    <p className="font-medium">Session Schedule:</p>
                                    <p>Name: {session.bookingSchedule.psychologist.name}</p>
                                    <p>
                                      Date: {new Date(session.bookingSchedule.dateTime).toLocaleDateString("id-ID")}
                                    </p>
                                    <p>
                                      Time:{" "}
                                      {new Date(session.bookingSchedule.dateTime).toLocaleTimeString("id-ID", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </p>
                                    {session.bookingSchedule.meetingLink && (
                                      <Button asChild variant="default" size="sm" className="mt-1">
                                        <Link href={session.bookingSchedule.meetingLink} target="_blank">
                                          Join Meeting
                                        </Link>
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-muted/30">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                              <p className="text-muted-foreground text-base">Booking was created on :</p>
                              <span className="flex items-center gap-1">
                                <CalendarCheck className="h-4 w-4 text-primary" />
                                {new Date(session.createdAt).toLocaleDateString("id-ID")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-primary" />
                                {new Date(session.createdAt).toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 mt-3">
                              <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                                <Link href={`https://wa.me/${session.bookingSchedule.psychologist.phoneNumber}`} target="_blank">
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
                <p className="text-center py-6 text-muted-foreground">There are no confirmed bookings</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:hidden">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending">Booking Pending</TabsTrigger>
              <TabsTrigger value="accepted">Booking Accepted</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-4">
              {sessionsData.filter((session) => session.status !== "ACCEPTED").length > 0 ? (
                <div className="space-y-4">
                  {sessionsData
                    .filter((session) => session.status !== "ACCEPTED")
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((session) => (
                      <Card key={session.id} className="overflow-hidden border">
                        <CardContent className="p-0">
                          <div className="flex items-start p-4 border-b">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>
                                <Brain className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">Online Consult</h3>
                                <Badge variant={`${session.status === "REJECTED" ? "destructive" : "outline"}`}>
                                  {session.status === "REJECTED" ? "Rejected" : "Waiting"}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <p className="font-medium">Booking ID: {session.bookingId}</p>
                                <p>Status: {session.status}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-muted/30">
                            <div className="flex flex-col gap-2 text-sm">
                              <p className="text-muted-foreground text-base">Booking was created on :</p>
                              <span className="flex items-center gap-1">
                                <CalendarCheck className="h-4 w-4 text-primary" />
                                {new Date(session.createdAt).toLocaleDateString("id-ID")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-primary" />
                                {new Date(session.createdAt).toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </span>
                              {session.bookingSchedule && (
                                <div className="mt-2 space-y-1 border-t pt-2">
                                  <p className="font-medium">Session Schedule:</p>
                                  <p>Name: {session.bookingSchedule.psychologist.name}</p>
                                  <p>
                                    Date: {new Date(session.bookingSchedule.dateTime).toLocaleDateString("id-ID")}
                                  </p>
                                  <p>
                                    Time:{" "}
                                    {new Date(session.bookingSchedule.dateTime).toLocaleTimeString("id-ID", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </p>
                                  {session.bookingSchedule.meetingLink && (
                                    <Button asChild variant="default" size="sm" className="mt-1">
                                      <Link href={session.bookingSchedule.meetingLink} target="_blank">
                                        Join Meeting
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 mt-3">
                              <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                                <Link href={`https://wa.me/${session.bookingSchedule.psychologist.phoneNumber}`} target="_blank">
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
                <p className="text-center py-6 text-muted-foreground">There are no bookings waiting for confirmation.</p>
              )}
            </TabsContent>

            <TabsContent value="accepted" className="mt-4">
              {sessionsData.filter((session) => session.status === "ACCEPTED").length > 0 ? (
                <div className="space-y-4">
                  {sessionsData
                    .filter((session) => session.status === "ACCEPTED")
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((session) => (
                      <Card key={session.id} className="overflow-hidden border">
                        <CardContent className="p-0">
                          <div className="flex items-start p-4 border-b">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>
                                <Brain className="w-5 h-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">Online Consult</h3>
                                <Badge variant="default" className="bg-primary">
                                  Confirmed
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <p className="font-medium">Booking ID: {session.bookingId}</p>
                                <p>Status: {session.status}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-muted/30">
                            <div className="flex flex-col gap-2 text-sm">
                              <p className="text-muted-foreground text-base">Booking was created on :</p>
                              <span className="flex items-center gap-1">
                                <CalendarCheck className="h-4 w-4 text-primary" />
                                {new Date(session.createdAt).toLocaleDateString("id-ID")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-primary" />
                                {new Date(session.createdAt).toLocaleTimeString("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </span>
                              {session.bookingSchedule && (
                                <div className="mt-2 space-y-1 border-t pt-2">
                                  <p className="font-medium">Session Schedule:</p>
                                  <p>Name: {session.bookingSchedule.psychologist.name}</p>
                                  <p>
                                    Date: {new Date(session.bookingSchedule.dateTime).toLocaleDateString("id-ID")}
                                  </p>
                                  <p>
                                    Time:{" "}
                                    {new Date(session.bookingSchedule.dateTime).toLocaleTimeString("id-ID", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </p>
                                  {session.bookingSchedule.meetingLink && (
                                    <Button asChild variant="default" size="sm" className="mt-1">
                                      <Link href={session.bookingSchedule.meetingLink} target="_blank">
                                        Join Meeting
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 mt-3">
                              <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
                                <Link href={`https://wa.me/${session.bookingSchedule.psychologist.phoneNumber}`} target="_blank">
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
                <p className="text-center py-6 text-muted-foreground">There are no confirmed bookings</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

