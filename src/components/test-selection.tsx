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
      description: "Assess your current mental wellbeing and identify areas for improvement.",
      icon: <Brain className="h-6 w-6" />,
      href: "/test-psychology/mental-health",
    },
    {
      id: "love-language",
      title: "Love Language Test",
      description: "Discover how you prefer to give and receive love in relationships.",
      icon: <Heart className="h-6 w-6" />,
      href: "/test-psychology/love-language",
    },
    {
      id: "happiness",
      title: "Happiness Test",
      description: "Evaluate your current happiness level and explore ways to cultivate more joy.",
      icon: <Smile className="h-6 w-6" />,
      href: "/test-psychology/happiness",
    },
    {
      id: "loneliness",
      title: "Loneliness Test",
      description: "Understand your feelings of loneliness and find strategies to feel more connected.",
      icon: <UserRound className="h-6 w-6" />,
      href: "/test-psychology/loneliness",
    }
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
              <Link href={test.href}>Start Test</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

