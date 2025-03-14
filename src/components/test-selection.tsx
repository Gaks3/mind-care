"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Heart, Smile, UserRound } from "lucide-react"
import Link from "next/link"

export function TestSelection() {
  const tests = [
    {
      id: "mental-health",
      title: "Mental Health Test",
      description: "Nilailah kesejahteraan mental kamu saat ini dan identifikasi yang perlu diperbaiki.",
      icon: <Brain className="h-6 w-6" />,
      href: "/test-psychology/mental-health",
    },
    {
      id: "love-language",
      title: "Love Language Test",
      description: "Temukan bagaimana kamu lebih suka memberi dan menerima cinta dalam hubungan.",
      icon: <Heart className="h-6 w-6" />,
      href: "/test-psychology/love-language",
    },
    {
      id: "happiness",
      title: "Happiness Test",
      description: "Evaluasi tingkat kebahagiaan kamu saat ini dan temukan cara untuk meningkatkan kegembiraan.",
      icon: <Smile className="h-6 w-6" />,
      href: "/test-psychology/happiness",
    },
    {
      id: "loneliness",
      title: "Loneliness Test",
      description: "Pahami perasaan kesepian kamu dan temukan cara untuk tidak kesepian.",
      icon: <UserRound className="h-6 w-6" />,
      href: "/test-psychology/loneliness",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {tests.map((test) => (
        <Card key={test.id} className="flex flex-col">
          <CardHeader>
            <div className="mb-2 w-fit rounded-full bg-primary/10 p-2 text-primary">{test.icon}</div>
            <CardTitle>{test.title}</CardTitle>
            <CardDescription className="pt-4">{test.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto pt-2">
            <Button asChild className="w-full">
              <Link href={test.href}>Mulai Tes</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

