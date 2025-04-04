"use client";

import {
  TestTemplate,
  type Question,
  type TestResult,
} from "@/components/test-template";

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
  ];

  const getResults = (answers: boolean[]): TestResult => {
    const qualityTime = (answers[0] ? 1 : 0) + (answers[5] ? 1 : 0);
    const gifts = (answers[1] ? 1 : 0) + (answers[6] ? 1 : 0);
    const actsOfService = (answers[2] ? 1 : 0) + (answers[7] ? 1 : 0);
    const physicalTouch = (answers[3] ? 1 : 0) + (answers[8] ? 1 : 0);
    const wordsOfAffirmation = (answers[4] ? 1 : 0) + (answers[9] ? 1 : 0);

    const scores = [
      { language: "Quality Time", score: qualityTime },
      { language: "Receiving Gifts", score: gifts },
      { language: "Acts Of Service", score: actsOfService },
      { language: "Physical Touch", score: physicalTouch },
      { language: "Words Of Affirmation", score: wordsOfAffirmation },
    ];

    scores.sort((a, b) => b.score - a.score);

    const primaryLanguage = scores[0].language;
    const secondaryLanguage =
      scores[1].score === scores[0].score
        ? scores[1].language
        : scores[1].language;

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
        "You thrive on verbal expressions of love. Hearing 'I love you' or receiving sincere compliments nourishes your heart."
    }

    return {
      title: `Your Love Language: ${primaryLanguage}`,
      description: `${
        descriptions[primaryLanguage as keyof typeof descriptions]
      } Your secondary love language is ${secondaryLanguage}. Understanding love languages helps you communicate better in relationships and recognize how others express affection toward you.`,
    };
  };

  return (
    <TestTemplate
      title="Love Language Analysis "
      description="What's Your Love Language? Find out how you express and experience love best!"
      questions={questions}
      getResults={getResults}
    />
  );
}
