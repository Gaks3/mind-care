"use client"

import { TestTemplate, type Question, type TestResult } from "@/components/test-template"

export default function LonelinessTest() {
  const questions: Question[] = [
    {
      id: 1,
      text: "Do you often feel isolated from others?"
    },
    {
      id: 2,
      text: "Do you find it difficult to form deep connections with people?"
    },
    {
      id: 3,
      text: "Do you frequently feel left out of social activities?"
    },
    {
      id: 4,
      text: "Do you wish you had more meaningful relationships in your life?"
    },
    {
      id: 5,
      text: "Do you often feel like nobody truly understands you?"
    },
    {
      id: 6,
      text: "Do you frequently feel alone even when surrounded by people?"
    },
    {
      id: 7,
      text: "Do you struggle to reach out to others when you're feeling down?"
    },
    {
      id: 8,
      text: "Do your relationships often feel less satisfying than you'd like?"
    },
    {
      id: 9,
      text: "Do you spend more time alone than you would prefer?"
    },
    {
      id: 10,
      text: "Do you have people you can reliably turn to for support?"
    }
  ]

  const getResults = (answers: boolean[]): TestResult => {
    const lonelinessScore = answers.slice(0, 9).filter((answer) => answer).length + (answers[9] ? 0 : 1)

    if (lonelinessScore <= 3) {
      return {
        title: "Low Loneliness Level",
        description:
          "Your responses indicate you generally feel connected to others and have satisfying relationships. You likely maintain a strong support network and feel understood by those around you. Keep nurturing these bonds, and remember it's okay to reach out when you need extra support.",
      }
    } else if (lonelinessScore <= 6) {
      return {
        title: "Moderate Loneliness Level",
        description:
          "Your responses indicate you may experience loneliness in certain situations. Try taking small steps to deepen existing relationships and build new connections—like joining interest-based communities, volunteering, or opening up to close friends. Remember, many people experience loneliness, and there's no shame in seeking new meaningful connections.",
      }
    } else {
      return {
        title: "High Loneliness Level",
        description:
          "Your responses indicate you may be experiencing significant loneliness. While this is a common experience, it can feel painful. Consider speaking with a mental health professional who can offer support and coping strategies. Small steps—like joining community groups, volunteering, or reaching out to old friends—can also help. Remember, loneliness doesn't mean there's something wrong with you; it simply signals unmet social needs.",
      }
    }
  }

  return (
    <TestTemplate
      title="Loneliness Analysis"
      description="Understand your feelings of loneliness and discover ways to build more meaningful connections."
      questions={questions}
      getResults={getResults}
    />
  )
}
