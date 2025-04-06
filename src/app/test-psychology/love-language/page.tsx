"use client"

import { TestTemplate, type Question, type TestResult } from "@/components/test-template"

export default function LoveLanguageTest() {
  const questions: Question[] = [
    {
      id: 1,
      text: "Do you feel most loved when someone gives you their undivided attention?",
    },
    {
      id: 2,
      text: "Do you appreciate receiving meaningful gifts, even small ones?",
    },
    {
      id: 3,
      text: "Do you feel truly valued when someone helps you with tasks or chores?",
    },
    {
      id: 4,
      text: "Do you feel most connected through physical touch like hugs or holding hands?",
    },
    {
      id: 5,
      text: "Do you treasure written notes or verbal compliments from loved ones?",
    },
    {
      id: 6,
      text: "Is quality time together more important to you than receiving gifts?",
    },
    {
      id: 7,
      text: "Do you often keep cards, letters, or mementos from people you care about?",
    },
    {
      id: 8,
      text: "Do you feel most appreciated when someone offers help without being asked?",
    },
    {
      id: 9,
      text: "Do you frequently seek physical closeness with people you love?",
    },
    {
      id: 10,
      text: "Do you remember compliments and affirming words long after receiving them?",
    },
  ]

  const getResults = (answers: boolean[]): TestResult => {
    const loveLanguageScores = {
      "Quality Time": 0,
      "Receiving Gifts": 0,
      "Acts Of Service": 0,
      "Physical Touch": 0,
      "Words Of Affirmation": 0,
    }

    const questionMapping = [
      { index: 0, language: "Quality Time" },
      { index: 1, language: "Receiving Gifts" },
      { index: 2, language: "Acts Of Service" },
      { index: 3, language: "Physical Touch" },
      { index: 4, language: "Words Of Affirmation" },
      { index: 5, language: "Quality Time" },
      { index: 6, language: "Receiving Gifts" },
      { index: 7, language: "Acts Of Service" },
      { index: 8, language: "Physical Touch" },
      { index: 9, language: "Words Of Affirmation" },
    ]

    questionMapping.forEach(({ index, language }) => {
      if (answers[index]) {
        loveLanguageScores[language as keyof typeof loveLanguageScores] += 1
      }
    })

    const scores = Object.entries(loveLanguageScores).map(([language, score]) => ({
      language,
      score,
    }))

    scores.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return a.language.localeCompare(b.language)
    })

    const allSameScore = scores.every((item) => item.score === scores[0].score)

    let primaryLanguage = scores[0].language
    let secondaryLanguage = scores[1].language

    if (allSameScore) {
      primaryLanguage = "Mixed (No clear preference)"
      secondaryLanguage = "All languages scored equally"
    } else if (scores[1].score === scores[0].score) {
      secondaryLanguage = `${scores[1].language} (tied with primary)`
    }

    const descriptions = {
      "Quality Time":
        "You value undivided attention and meaningful moments together. Nothing says 'I love you' more powerfully to you than being fully present.",
      "Receiving Gifts":
        "You appreciate gifts as tangible symbols of affection. It's not about monetary value, but the thoughtfulness behind choosing something special for you.",
      "Acts Of Service":
        "You feel loved when others help lighten your load. For you, actions speak louder than words—concrete efforts show care most deeply.",
      "Physical Touch":
        "You connect through physical closeness. Hugs, holding hands, and other loving touches are your primary language for feeling valued.",
      "Words Of Affirmation":
        "You thrive on verbal expressions of love. Hearing 'I love you' or receiving sincere compliments nourishes your heart.",
      "Mixed (No clear preference)":
        "You appear to value all love languages equally. This versatility means you can appreciate love expressed in various ways.",
    }

    let description = ""

    if (allSameScore) {
      description = descriptions[primaryLanguage as keyof typeof descriptions]
    } else {
      description = `${descriptions[primaryLanguage as keyof typeof descriptions]
        } Your secondary love language is ${secondaryLanguage}.`
    }

    description +=
      " Understanding love languages helps you communicate better in relationships and recognize how others express affection toward you."

    return {
      title: `Your Love Language: ${primaryLanguage}`,
      description: description,
    }
  }

  return (
    <TestTemplate
      title="Love Language Analysis"
      description="What's Your Love Language? Find out how you express and experience love best!"
      questions={questions}
      getResults={getResults}
    />
  )
}

