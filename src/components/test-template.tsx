"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"

export interface Question {
  id: number
  text: string
}

export interface TestResult {
  title: string
  description: string
}

interface TestTemplateProps {
  title: string
  description: string
  questions: Question[]
  getResults: (answers: boolean[]) => TestResult
}

export function TestTemplate({ title, description, questions, getResults }: TestTemplateProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)

  const progress = (currentQuestion / questions.length) * 100

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const testResult = getResults(newAnswers)
      setResult(testResult)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setResult(null)
  }

  const handleBack = () => {
    router.push("/test-psychology")
  }

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <Button variant="outline" onClick={handleBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke tes
      </Button>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>
          {!showResults ? (
            <>
              <Progress value={progress} className="mb-6" />
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">
                  Pertanyaan {currentQuestion + 1} dari {questions.length}
                </h3>
                <p className="text-xl">{questions[currentQuestion].text}</p>
              </div>
            </>
          ) : (
            <div className="py-6">
              <h3 className="text-xl font-bold mb-4">Hasil kamu:</h3>
              <div className="bg-primary/10 p-6 rounded-lg mb-4">
                <h4 className="text-lg font-semibold mb-2">{result?.title}</h4>
                <p>{result?.description}</p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4">
          {!showResults ? (
            <>
              <Button onClick={() => handleAnswer(true)} className="flex-1 bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" /> Ya
              </Button>
              <Button onClick={() => handleAnswer(false)} className="flex-1 bg-red-600 hover:bg-red-700">
                <X className="mr-2 h-4 w-4" /> Tidak
              </Button>
              {currentQuestion > 0 && (
                <Button variant="outline" onClick={handlePrevious} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                </Button>
              )}
            </>
          ) : (
            <>
              <Button onClick={handleRestart} className="flex-1">
                Ambil Tes lagi
              </Button>
              <Button onClick={handleBack} variant="outline" className="flex-1">
                Coba Tes lain
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

