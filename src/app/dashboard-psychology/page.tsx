import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck, Clock, User, LogOut, ChevronDown, BarChart3, Calendar, Brain, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { redirect } from "next/navigation"
import { UserRole } from "@/types"
import { client } from "@/lib/api"
import { BookingActions } from "./functions/accept-reject-button"
import { AddScheduleButton } from "./functions/add-schedule"

export default async function DashboardPsychologist() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const getBookingSession = await client.api.bookings.sessions.psychologist.$get(undefined, {
    init: {
      headers: await headers(),
    },
  })

  const user = session?.user
  const role = session?.user?.role
  const { data: allSessions } = await getBookingSession.json()

  if (role === UserRole.ADMIN) {
    return redirect("/admin")
  }

  if (role === UserRole.USER) {
    return redirect("/dashboard")
  }

  const pendingSessions = allSessions.filter(
    (session) => session.status !== "ACCEPTED" && session.status !== "REJECTED",
  )
  const acceptedSessions = allSessions.filter((session) => session.status === "ACCEPTED")

  const sortedPendingSessions = [...pendingSessions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const sortedAcceptedSessions = [...acceptedSessions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const totalSessions = allSessions.length

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
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
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
                    <p className="text-sm font-medium text-primary-foreground/80">Upcoming session</p>
                    <p className="text-xl font-bold">{pendingSessions.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-foreground/80">All sessions</p>
                    <p className="text-xl font-bold">{totalSessions}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mt-7 mb-10">
          <AddScheduleButton />
        </div>
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                Booking Pending
              </CardTitle>
              <CardDescription>Waiting for your confirmation</CardDescription>
            </CardHeader>
            <CardContent>
              {sortedPendingSessions.length > 0 ? (
                <div className="space-y-4">
                  {sortedPendingSessions.map((session) => (
                    <Card key={session.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Session #{session.id}</h3>
                              <Badge variant="outline">Waiting</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p>Booking ID: {session.bookingId}</p>
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
                          <p className="text-muted-foreground text-base">By : {session.user.name}</p>
                          <p className="text-muted-foreground text-base">Time : {new Date(session.bookingSchedule.dateTime).toLocaleString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}</p>
                          <div className="flex flex-col sm:flex-row gap-2 mt-3">
                            <BookingActions sessionId={session.id} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">No pending sessions</p>
              )}
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Booking Accepted
              </CardTitle>
              <CardDescription>Confirmed session</CardDescription>
            </CardHeader>
            <CardContent>
              {sortedAcceptedSessions.length > 0 ? (
                <div className="space-y-4">
                  {sortedAcceptedSessions.map((session) => (
                    <Card key={session.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Sesi #{session.id}</h3>
                              <Badge variant="default" className="bg-primary">
                                Confirmed
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p>Booking ID: {session.bookingId}</p>
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
                          <p className="text-muted-foreground text-base">By : {session.user.name}</p>
                          <p className="text-muted-foreground text-base">Time : {new Date(session.bookingSchedule.dateTime).toLocaleString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}</p>
                          {session.bookingSchedule.meetingLink && (
                            <Button asChild variant="default" size="sm" className="mt-1">
                              <Link href={session.bookingSchedule.meetingLink} target="_blank">
                                Join Meeting
                              </Link>
                            </Button>
                          )}
                          <div className="flex flex-col sm:flex-row gap-2 mt-3">
                            <p className="text-sm text-muted-foreground">
                              Updated at: {new Date(session.updatedAt).toLocaleDateString("id-ID")}{" "}
                              {new Date(session.updatedAt).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">No confirmed booking</p>
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
              {sortedPendingSessions.length > 0 ? (
                <div className="space-y-4">
                  {sortedPendingSessions.map((session) => (
                    <Card key={session.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Session #{session.id}</h3>
                              <Badge variant="outline">Waiting</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p>Booking ID: {session.bookingId}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-muted/30">
                          <div className="flex flex-col gap-2 text-sm mb-3">
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
                          <p className="text-muted-foreground text-base">By : {session.user.name}</p>
                          <p className="text-muted-foreground text-base">Time : {new Date(session.bookingSchedule.dateTime).toLocaleString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}</p>
                          <div className="flex flex-col sm:flex-row gap-2 mt-3">
                            <BookingActions sessionId={session.id} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">No pending sessions</p>
              )}
            </TabsContent>

            <TabsContent value="accepted" className="mt-4">
              {sortedAcceptedSessions.length > 0 ? (
                <div className="space-y-4">
                  {sortedAcceptedSessions.map((session) => (
                    <Card key={session.id} className="overflow-hidden border">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4 border-b">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Session #{session.id}</h3>
                              <Badge variant="default" className="bg-primary">
                                Confirmed
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <p>Booking ID: {session.bookingId}</p>
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
                          </div>
                          <p className="text-muted-foreground text-base">By : {session.user.name}</p>
                          <p className="text-muted-foreground text-base">Time : {new Date(session.bookingSchedule.dateTime).toLocaleString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}</p>
                          {session.bookingSchedule.meetingLink && (
                            <Button asChild variant="default" size="sm" className="mt-1">
                              <Link href={session.bookingSchedule.meetingLink} target="_blank">
                                Join Meeting
                              </Link>
                            </Button>
                          )}
                          <div className="flex flex-col gap-2 mt-3">
                            <p className="text-sm text-muted-foreground">
                              Updated at: {new Date(session.updatedAt).toLocaleDateString("id-ID")}{" "}
                              {new Date(session.updatedAt).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">No confirmed booking</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

