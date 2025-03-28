import { headers } from "next/headers"
import { client } from "@/lib/api"
import { School } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import BookingForm from "../booking-form"
import { auth } from "@/lib/auth"

export default async function BookingPsikolog({ params }) {
  const { id } = params
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id
  const psychologistDetail = await client.api.users.psychologists[":id"].$get(
    {
      param: {
        id,
      },
    },
    {
      init: {
        headers: await headers(),
      },
    },
  )

  const schedulesResponse = await client.api.bookings.schedules.psychologist[":id"].$get(
    {
      param: {
        id,
      },
    },
    {
      init: {
        headers: await headers(),
      },
    },
  )

  const { data: psychologist } = await psychologistDetail.json()
  const { data: schedules } = await schedulesResponse.json()


  return (
    <div className="container mx-auto py-8 px-4 lg:px-24">
      <h1 className="text-xl lg:text-3xl font-bold mb-6 flex items-center">
        Booking Psychologist
        <Link href={`/bookings/${psychologist.id}`}>
          <span className="text-primary underline ml-2">{psychologist.name}</span>
        </Link>
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="text-sm md:text-base leading-relaxed">{psychologist.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Education</h3>
                <div className="space-y-3">
                  {psychologist.education && psychologist.education.length > 0 ? (
                    psychologist.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded-md border">
                        <div className="flex-shrink-0 mt-1">
                          <School className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{edu.institution}</div>
                          <div className="text-sm text-muted-foreground">{edu.degree}</div>
                          <div className="text-xs text-muted-foreground">{edu.year}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-3 p-2 rounded-md border">
                        <div className="flex-shrink-0 mt-1">
                          <School className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">Universitas Gadjah Mada</div>
                          <div className="text-sm text-muted-foreground">2022 - Sarjana Psikologi</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-md border">
                        <div className="flex-shrink-0 mt-1">
                          <School className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">SMKN 2 Yogyakarta</div>
                          <div className="text-sm text-muted-foreground">2018 - Psikologi</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <BookingForm
            bookingSchedules={schedules}
            psychologistId={psychologist.id}
            psychologistName={psychologist.name}
            userId={userId}
          />
        </div>
      </div>
    </div>
  )
}

