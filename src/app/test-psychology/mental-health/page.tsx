"use client";

import {
  TestTemplate,
  type Question,
  type TestResult,
} from "@/components/test-template";

export default function MentalHealthTest() {
  const questions: Question[] = [
    {
      id: 1,
      text: "Do you often feel overwhelmed by daily responsibilities?",
    },
    {
      id: 2,
      text: "Are you experiencing difficulty sleeping or changes in sleep patterns?",
    },
    {
      id: 3,
      text: "Do you find it hard to concentrate on tasks?",
    },
    {
      id: 4,
      text: "Do you frequently feel anxious without a clear reason?",
    },
    {
      id: 5,
      text: "Have you lost interest in activities you once enjoyed?",
    },
    {
      id: 6,
      text: "Do you often feel tired or lack energy?",
    },
    {
      id: 7,
      text: "Do you have negative thoughts about yourself or your future?",
    },
    {
      id: 8,
      text: "Do you struggle to relax even when you have free time?",
    },
    {
      id: 9,
      text: "Have you experienced recent changes in appetite or weight?",
    },
    {
      id: 10,
      text: "Do you feel you have someone to talk to when facing difficulties?",
    },
  ];

  const getResults = (answers: boolean[]): TestResult => {
    const concernScore =
      answers.slice(0, 9).filter((answer) => answer).length +
      (answers[9] ? 0 : 1);

    if (concernScore <= 3) {
      return {
        title: "Healthy Mental State",
        description:
          "Great news! Your results show strong mental wellbeing. Continue practicing self-care and those healthy habits. Since mental health can change, we encourage you to check in with yourself regularly.",
      };
    } else if (concernScore <= 6) {
      return {
        title: "Minor Mental Health Worries",
        description:
          "Your results show you’re experiencing mild mental health challenges. Small steps matter—practice self-care, reach out to loved ones, and check in with yourself regularly. Professional support is available if needed.",
      };
    } else {
      return {
        title: "Significant Mental Health Concerns",
        description:
          "Your results indicate you're dealing with important mental health concerns. Connecting with a psychologist or therapist could help you navigate this. Reaching out takes courage—you're already taking the first step by noticing these signs.",
      };
    }
  };

  return (
    <TestTemplate
      title="Mental Health Analysis"
      description="Answer the following questions honestly to assess your current mental wellbeing."
      questions={questions}
      getResults={getResults}
    />
  );
}
