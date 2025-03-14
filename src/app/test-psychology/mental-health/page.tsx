"use client"

import { TestTemplate, type Question, type TestResult } from "@/components/test-template"

export default function MentalHealthTest() {
  const questions: Question[] = [
    { id: 1, text: "Apakah kamu sering merasa kewalahan dengan tanggung jawab sehari-hari?" },
    { id: 2, text: "Apakah kamu mengalami kesulitan tidur atau perubahan pola tidur?" },
    { id: 3, text: "Apakah kamu merasa sulit untuk berkonsentrasi pada tugas?" },
    { id: 4, text: "Apakah kamu sering merasa cemas tanpa alasan yang jelas?" },
    { id: 5, text: "Apakah kamu kehilangan minat pada aktivitas yang dulu kamu nikmati?" },
    { id: 6, text: "Apakah kamu sering merasa lelah atau tidak memiliki energi?" },
    { id: 7, text: "Apakah kamu memiliki pikiran negatif tentang diri sendiri atau masa depan kamu?" },
    { id: 8, text: "Apakah kamu merasa sulit untuk bersantai meskipun memiliki waktu luang?" },
    { id: 9, text: "Apakah kamu mengalami perubahan nafsu makan atau berat badan baru-baru ini?" },
    { id: 10, text: "Apakah kamu merasa memiliki seseorang untuk diajak bicara saat sedang kesulitan?" },
  ]

  const getResults = (answers: boolean[]): TestResult => {
    const concernScore = answers.slice(0, 9).filter((answer) => answer).length + (answers[9] ? 0 : 1)

    if (concernScore <= 3) {
      return {
        title: "Kesehatan Mental Baik",
        description:
          "Jawaban kamu menunjukkan bahwa kamu saat ini memiliki kesehatan mental yang baik. Teruskan kebiasaan positif dan rutinitas perawatan diri kamu. Ingatlah bahwa kesehatan mental dapat berubah seiring waktu, jadi tetap perhatikan kebutuhan kamu.",
      }
    } else if (concernScore <= 6) {
      return {
        title: "Kekhawatiran Kesehatan Mental Ringan",
        description:
          "Jawaban kamu menunjukkan adanya beberapa kekhawatiran ringan terkait kesehatan mental. Cobalah untuk lebih banyak melakukan perawatan diri, berbicara dengan teman atau keluarga tentang perasaan kamu, dan terus memantau kesehatan mental kamu. Jika gejala berlanjut, pertimbangkan untuk berkonsultasi dengan profesional kesehatan mental.",
      }
    } else {
      return {
        title: "Kekhawatiran Kesehatan Mental Signifikan",
        description:
          "Jawaban kamu menunjukkan bahwa kamu mungkin mengalami tantangan kesehatan mental yang signifikan. Disarankan untuk berbicara dengan profesional kesehatan mental yang dapat memberikan penilaian dan dukungan yang tepat. Ingatlah bahwa mencari bantuan adalah tanda kekuatan, bukan kelemahan.",
      }
    }
  }

  return (
    <TestTemplate
      title="Analisis Kesehatan Mental"
      description="Jawab pertanyaan berikut dengan jujur untuk menilai kesejahteraan mental kamu saat ini."
      questions={questions}
      getResults={getResults}
    />
  )
}
