"use client"

import { TestTemplate, type Question, type TestResult } from "@/components/test-template"

export default function HappinessTest() {
  const questions: Question[] = [
    { id: 1, text: "Apakah kamu sering merasa puas dengan hidupmu secara keseluruhan?" },
    { id: 2, text: "Apakah kamu sering merasakan emosi positif seperti kebahagiaan, kepuasan, atau rasa syukur?" },
    { id: 3, text: "Apakah kamu memiliki hubungan yang bermakna dengan orang-orang di sekitarmu?" },
    { id: 4, text: "Apakah kamu terlibat dalam aktivitas yang memberikan rasa pencapaian?" },
    { id: 5, text: "Apakah kamu umumnya merasa optimis tentang masa depanmu?" },
    { id: 6, text: "Apakah kamu merasa bahwa hidupmu memiliki tujuan dan makna?" },
    { id: 7, text: "Apakah kamu dapat bangkit kembali dengan cukup cepat setelah mengalami kemunduran?" },
    { id: 8, text: "Apakah kamu meluangkan waktu untuk menghargai hal-hal baik dalam hidupmu?" },
    { id: 9, text: "Apakah kamu merasa memiliki cukup kendali dan otonomi atas hidupmu?" },
    { id: 10, text: "Apakah kamu sering melakukan aktivitas hanya karena kamu menikmatinya?" },
  ]

  const getResults = (answers: boolean[]): TestResult => {
    const yesCount = answers.filter((answer) => answer).length

    if (yesCount <= 3) {
      return {
        title: "Peluang untuk Kebahagiaan Lebih Besar",
        description:
          "Jawaban kamu menunjukkan bahwa kamu mungkin mengalami tingkat kebahagiaan yang lebih rendah saat ini. Cobalah mengeksplorasi aktivitas yang membawa kebahagiaan, memperkuat hubungan sosial, melatih rasa syukur, dan berfokus pada kekuatan pribadi. Jika kamu merasa tidak bahagia secara terus-menerus, berbicara dengan profesional kesehatan mental bisa menjadi langkah yang bermanfaat.",
      }
    } else if (yesCount <= 6) {
      return {
        title: "Kebahagiaan Sedang",
        description:
          "Jawaban kamu menunjukkan tingkat kebahagiaan yang sedang. Kamu mungkin mengalami emosi positif dan tantangan dalam hidup. Untuk meningkatkan kebahagiaanmu, pertimbangkan untuk lebih sering melakukan aktivitas yang membawa kegembiraan, berlatih mindfulness, mengekspresikan rasa syukur secara rutin, dan merawat hubunganmu dengan orang lain. Kebiasaan kecil sehari-hari bisa berdampak besar pada kesejahteraanmu secara keseluruhan.",
      }
    } else {
      return {
        title: "Kebahagiaan Tinggi",
        description:
          "Jawaban kamu menunjukkan bahwa kamu sedang mengalami tingkat kebahagiaan yang baik. Kamu kemungkinan memiliki strategi yang efektif dalam mempertahankan emosi positif dan mengatasi tantangan. Terus jaga hubungan baik dengan orang-orang di sekitarmu, terlibat dalam aktivitas yang bermakna, melatih rasa syukur, serta menjaga kesehatan fisik dan mentalmu untuk mempertahankan kebahagiaan ini.",
      }
    }
  }

  return (
    <TestTemplate
      title="Analisis Kebahagiaan"
      description="Evaluasi tingkat kebahagiaanmu saat ini dan temukan area yang bisa ditingkatkan."
      questions={questions}
      getResults={getResults}
    />
  )
}
