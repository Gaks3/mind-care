import React from "react";
import { Article } from "@/types";
import ArticleCard from "./ui/article-card";

const articles: Article[] = [
  {
    id: 1,
    title: "Pentingnya Kesehatan Mental: Mengapa Kita Harus Peduli?",
    createdBy: "Bidan Ning Tyas",
    thumbnail: "/about-picture.webp",
    createdAt: "11 Maret 2025",
  },
  {
    id: 2,
    title: "Gangguan Kecemasan: Gejala, Penyebab & Cara Mengatasinya",
    createdBy: "Dokter Ayu Purniah",
    thumbnail: "/about-picture.webp",
    createdAt: "11 Maret 2025",
  },
  {
    id: 3,
    title: "Cara Mengatasi Stres di Tengah Kesibukan Sehari-hari",
    createdBy: "Dr. Hartati",
    thumbnail: "/about-picture.webp",
    createdAt: "11 Maret 2025",
  },
  {
    id: 4,
    title: "Pentingnya Dukungan Sosial dalam Menjaga Kesehatan Mental",
    createdBy: "Psikolog Lestari",
    thumbnail: "/about-picture.webp",
    createdAt: "11 Maret 2025",
  },
];

const ArticleSection = () => {
  return (
    <section className="container mx-auto py-16 px-6 lg:px-28">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Artikel Menarik
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Temukan informasi bermanfaat mengenai kesehatan mental dan tips untuk
          menjalani kehidupan yang lebih sehat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {articles.map((article, index) => (
          <ArticleCard
            id={article.id}
            key={index}
            title={article.title}
            createdBy={article.createdBy}
            thumbnail={article.thumbnail}
            createdAt={article.createdAt} />
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
