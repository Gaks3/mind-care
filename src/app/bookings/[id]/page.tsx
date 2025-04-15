import { client } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarHeart, School, PhoneCall } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function getInitials(name: string): string {
  return name
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .map((letter) => letter.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export default async function PsychologistDetail({ params }) {
  const { id } = params;
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
  );

  const { data: psychologist } = await psychologistDetail.json();

  if (!psychologist) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-muted-foreground">Psikolog not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-fit flex flex-col">
            <CardHeader className="text-center pb-2">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {getInitials(psychologist.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-wrap justify-center gap-2 mb-3 w-full">
                  {psychologist.psychologyTopic.map((item) => (
                    <Badge key={item.topic.id} className="text-xs">
                      {item.topic.name}
                    </Badge>
                  ))}
                </div>

                <CardTitle className="text-xl font-bold">
                  <h1>{psychologist.name}</h1>
                  <div className="flex items-center justify-center mt-2">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    <p className="text-base text-muted-foreground">
                      {psychologist.phoneNumber}
                    </p>
                  </div>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Link href={`/bookings/psychologist/${psychologist.id}`}>
                <Button className="w-full mt-3" size="sm">
                  <CalendarHeart className="mr-2 w-5 h-5" /> Booking
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="text-sm md:text-base leading-relaxed">
                  {psychologist.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Education</h3>
                <div className="space-y-3">
                  {psychologist.education &&
                  psychologist.education.length > 0 ? (
                    psychologist.education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-2 rounded-md border"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <School className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{edu.institution}</div>
                          <div className="text-sm text-muted-foreground">
                            {edu.degree}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {edu.year}
                          </div>
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
                          <div className="font-medium">
                            Universitas Gadjah Mada
                          </div>
                          <div className="text-sm text-muted-foreground">
                            2022 - Sarjana Psikologi
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-md border">
                        <div className="flex-shrink-0 mt-1">
                          <School className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">SMKN 2 Yogyakarta</div>
                          <div className="text-sm text-muted-foreground">
                            2018 - Psikologi
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
