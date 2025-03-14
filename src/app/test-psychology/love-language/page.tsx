"use client"

import { TestTemplate, type Question, type TestResult } from "@/components/test-template"

export default function LoveLanguageTest() {
  const questions: Question[] = [
    { id: 1, text: "Apakah kamu merasa paling dicintai ketika seseorang memberikan perhatian penuh kepadamu?" },
    { id: 2, text: "Apakah kamu menghargai menerima hadiah yang bermakna, bahkan yang kecil?" },
    { id: 3, text: "Apakah kamu merasa sangat dihargai ketika seseorang membantumu dalam tugas atau pekerjaan rumah?" },
    { id: 4, text: "Apakah kamu merasa paling terhubung dengan orang lain melalui sentuhan fisik seperti pelukan atau genggaman tangan?" },
    { id: 5, text: "Apakah kamu sangat menghargai catatan tertulis atau pujian lisan dari orang yang kamu sayangi?" },
    { id: 6, text: "Apakah menghabiskan waktu berkualitas bersama lebih penting bagimu daripada menerima hadiah?" },
    { id: 7, text: "Apakah kamu sering menyimpan kartu, surat, atau kenang-kenangan dari orang yang kamu pedulikan?" },
    { id: 8, text: "Apakah kamu merasa paling dihargai ketika seseorang menawarkan bantuan tanpa diminta?" },
    { id: 9, text: "Apakah kamu sering mencari kedekatan fisik dengan orang-orang yang kamu cintai?" },
    { id: 10, text: "Apakah kamu mengingat pujian dan kata-kata afirmasi untuk waktu yang lama setelah menerimanya?" },
  ]

  const getResults = (answers: boolean[]): TestResult => {
    const qualityTime = (answers[0] ? 1 : 0) + (answers[5] ? 1 : 0)
    const gifts = (answers[1] ? 1 : 0) + (answers[6] ? 1 : 0)
    const actsOfService = (answers[2] ? 1 : 0) + (answers[7] ? 1 : 0)
    const physicalTouch = (answers[3] ? 1 : 0) + (answers[8] ? 1 : 0)
    const wordsOfAffirmation = (answers[4] ? 1 : 0) + (answers[9] ? 1 : 0)

    const scores = [
      { language: "Quality Time", score: qualityTime },
      { language: "Receiving Gifts", score: gifts },
      { language: "Acts Of Service", score: actsOfService },
      { language: "Physical Touch", score: physicalTouch },
      { language: "Words Of Affirmation", score: wordsOfAffirmation },
    ]

    scores.sort((a, b) => b.score - a.score)

    const primaryLanguage = scores[0].language
    const secondaryLanguage = scores[1].score === scores[0].score ? scores[1].language : scores[1].language

    const descriptions = {
      "Quality Time":
        "Kamu menghargai perhatian penuh dan waktu yang bermakna bersama. Bagimu, tidak ada yang mengatakan 'Aku mencintaimu' lebih kuat daripada perhatian yang tidak terbagi.",
      "Receiving Gifts":
        "Kamu menghargai hadiah sebagai simbol nyata dari kasih sayang. Bukan soal nilai uangnya, tetapi lebih kepada pemikiran bahwa seseorang memilih sesuatu khusus untukmu.",
      "Acts Of Service":
        "Kamu merasa dicintai ketika orang melakukan sesuatu untuk membantumu atau meringankan bebanmu. Bagimu, tindakan lebih berarti daripada kata-kata.",
      "Physical Touch":
        "Kamu merasa terhubung melalui kedekatan fisik. Pelukan, genggaman tangan, dan bentuk sentuhan lainnya menjadi cara utama bagimu untuk merasakan kasih sayang.",
      "Words Of Affirmation":
        "Kamu menghargai ungkapan kasih sayang secara verbal. Mendengar 'Aku mencintaimu' atau menerima pujian sangat berarti bagimu.",
    }

    return {
      title: `Love Language Kamu: ${primaryLanguage}`,
      description: `${descriptions[primaryLanguage as keyof typeof descriptions]} Love language yang kamu sukai kedua adalah ${secondaryLanguage}. Memahami Love Language dapat membantumu dalam berkomunikasi lebih baik dalam hubungan dan mengenali bagaimana orang lain menunjukkan cinta mereka kepadamu.`,
    }
  }

  return (
    <TestTemplate
      title="Analisis Love Language"
      description="Temukan bagaimana kamu lebih suka memberi dan menerima cinta dalam hubungan."
      questions={questions}
      getResults={getResults}
    />
  )
}
