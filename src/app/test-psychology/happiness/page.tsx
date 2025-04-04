"use client"

import { TestTemplate, type Question, type TestResult } from "@/components/test-template"

export default function HappinessTest() {
  const questions: Question[] = [
    {
      id: 1,
      text: "Do you generally feel satisfied with your life as a whole?"
    },
    {
      id: 2,
      text: "Do you frequently experience positive emotions like joy, contentment, or gratitude?"
    },
    {
      id: 3,
      text: "Do you have meaningful relationships with people around you?"
    },
    {
      id: 4,
      text: "Are you engaged in activities that give you a sense of accomplishment?"
    },
    {
      id: 5,
      text: "Do you typically feel optimistic about your future?"
    },
    {
      id: 6,
      text: "Do you feel your life has purpose and meaning?"
    },
    {
      id: 7,
      text: "Are you able to bounce back reasonably well after setbacks?"
    },
    {
      id: 8,
      text: "Do you make time to appreciate the good things in your life?"
    },
    {
      id: 9,
      text: "Do you feel you have adequate control and autonomy over your life?"
    },
    {
      id: 10,
      text: "Do you regularly engage in activities purely for enjoyment?"
    }
  ]

  const getResults = (answers: boolean[]): TestResult => {
    const yesCount = answers.filter((answer) => answer).length

    if (yesCount <= 3) {
      return {
        title: "Opportunity for Greater Happiness",
        description:
          "Your responses suggest you may be experiencing lower happiness levels currently. Consider exploring joy-boosting activities, strengthening social connections, practicing gratitude, and focusing on personal strengths. If persistent unhappiness continues, speaking with a mental health professional could be beneficial.",
      }
    } else if (yesCount <= 6) {
      return {
        title: "Moderate Happiness",
        description:
          "Your results show you're at a moderate happiness level—experiencing both positive emotions and life's normal challenges. To cultivate greater joy, try incorporating small but powerful habits like engaging in activities you love, practicing mindfulness, expressing daily gratitude, and nurturing your relationships. Remember that consistent, everyday efforts often create the most meaningful improvements in overall wellbeing.",
      }
    } else {
      return {
        title: "High Happiness",
        description:
          "Your responses indicate you’re currently experiencing strong happiness levels. You likely have effective strategies for maintaining positive emotions and navigating challenges. To sustain this wellbeing, continue nurturing your relationships, engaging in meaningful activities, practicing gratitude, and prioritizing your physical and mental health—these daily habits will help preserve your joyful state",
      }
    }
  }

  return (
    <TestTemplate
      title="Happiness Analysis"
      description="Evaluate your current happiness level and explore ways to cultivate more joy."
      questions={questions}
      getResults={getResults}
    />
  )
}
