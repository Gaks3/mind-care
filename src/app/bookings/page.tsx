import { client } from "@/lib/api"
import { headers } from "next/headers"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarHeart, PhoneCall } from "lucide-react"
import Link from "next/link"

function getInitials(name: string): string {
  return name
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .map((letter) => letter.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 3)
}


export default async function PsychologistsList() {
  const psychologistsList = await client.api.users.psychologists.$get(undefined, {
    init: {
      headers: await headers(),
    },
  })

  const { data: psychologists } = await psychologistsList.json()

  return (
    <div className="container mx-auto py-8 px-4 lg:px-24">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">Psyhologist Lists</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {psychologists.map((psychologist) => (
          <Card key={psychologist.id} className="h-fit">
            <CardHeader className="pb-2">
              <div className="flex mb-2 gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(psychologist.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{psychologist.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="mt-1 mb-3">
                      {psychologist.role}
                    </Badge>
                    <div className="flex items-center gap-2 mb-5">
                      <PhoneCall className="w-4 h-4 mb-[2px]" /><p className="text-muted-foreground">{psychologist.phoneNumber}</p>
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-ellipsis">{psychologist.description
                ? (psychologist.description.split(' ').length > 5
                  ? psychologist.description.split(' ').slice(0, 10).join(' ') + '...'
                  : psychologist.description)
                : "No description found"}</p>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <Link href={`/bookings/${psychologist.id}`}>
                <Button size="sm" variant="outline">Detail</Button>
              </Link>
              <Link href={`/bookings/psychologist/${psychologist.id}`}>
                <Button size="sm">Booking <CalendarHeart className="ml-2 w-4 h-4" /></Button>
              </Link>
            </CardFooter>
          </Card>

        ))}
      </div>

      {psychologists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No psychologists found</p>
        </div>
      )}
    </div>
  )
}

