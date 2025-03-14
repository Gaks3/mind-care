"use client"

import { TestTemplate, type Question, type TestResult } from "@/components/test-template"

export default function LonelinessTest() {
  const questions: Question[] = [
    { id: 1, text: "Apakah kamu sering merasa terisolasi dari orang lain?" },
    { id: 2, text: "Apakah kamu merasa sulit untuk terhubung dengan orang lain secara mendalam?" },
    { id: 3, text: "Apakah kamu sering merasa ditinggalkan dari aktivitas sosial?" },
    { id: 4, text: "Apakah kamu berharap memiliki lebih banyak hubungan yang bermakna dalam hidupmu?" },
    { id: 5, text: "Apakah kamu sering merasa bahwa tidak ada yang benar-benar memahami dirimu?" },
    { id: 6, text: "Apakah kamu sering merasa sendirian bahkan saat berada di antara orang lain?" },
    { id: 7, text: "Apakah kamu merasa sulit untuk menghubungi orang lain saat sedang merasa sedih?" },
    { id: 8, text: "Apakah kamu sering merasa bahwa hubunganmu tidak sepuas yang kamu harapkan?" },
    { id: 9, text: "Apakah kamu menghabiskan lebih banyak waktu sendirian daripada yang kamu inginkan?" },
    { id: 10, text: "Apakah kamu memiliki orang yang bisa kamu andalkan saat membutuhkan dukungan?" },
  ]

  const getResults = (answers: boolean[]): TestResult => {
    const lonelinessScore = answers.slice(0, 9).filter((answer) => answer).length + (answers[9] ? 0 : 1)

    if (lonelinessScore <= 3) {
      return {
        title: "Tingkat Kesepian Rendah",
        description:
          "Jawaban kamu menunjukkan bahwa kamu umumnya merasa terhubung dengan orang lain dan memiliki hubungan yang memuaskan. Kamu mungkin memiliki jaringan dukungan yang baik dan merasa dipahami oleh orang-orang di sekitarmu. Terus jaga hubungan ini dan jangan ragu untuk menjangkau orang lain saat dibutuhkan.",
      }
    } else if (lonelinessScore <= 6) {
      return {
        title: "Tingkat Kesepian Sedang",
        description:
          "Jawaban kamu menunjukkan bahwa kamu mungkin mengalami perasaan kesepian dalam beberapa situasi. Coba lakukan langkah kecil untuk memperdalam hubungan yang sudah ada dan membangun koneksi baru. Ini bisa termasuk bergabung dengan komunitas berdasarkan minat, menjadi sukarelawan, atau lebih terbuka kepada teman-teman terdekat. Ingat, banyak orang juga mengalami kesepian, dan tidak ada salahnya mencari koneksi baru.",
      }
    } else {
      return {
        title: "Tingkat Kesepian Tinggi",
        description:
          "Jawaban kamu menunjukkan bahwa kamu mungkin mengalami perasaan kesepian yang cukup signifikan. Ini adalah pengalaman yang umum, tetapi bisa terasa menyakitkan. Pertimbangkan untuk berbicara dengan profesional kesehatan mental yang dapat memberikan dukungan dan strategi. Langkah kecil seperti bergabung dengan kelompok komunitas, menjadi sukarelawan, atau menghubungi teman lama juga bisa membantu. Ingat, kesepian bukan berarti ada yang salah denganmu—ini hanya tanda bahwa kebutuhan sosialmu belum sepenuhnya terpenuhi.",
      }
    }
  }

  return (
    <TestTemplate
      title="Analisis Kesepian"
      description="Pahami perasaan kesepianmu dan temukan cara untuk membangun koneksi yang lebih bermakna."
      questions={questions}
      getResults={getResults}
    />
  )
}
