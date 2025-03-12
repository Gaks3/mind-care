import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, CalendarPlus } from "lucide-react";
import Image from "next/image";
import { Article } from "@/types";

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
        {articles.map((article) => (
          <Card
            key={article.id}
            className="overflow-hidden border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader className="pb-0 pt-5">
              <p className="text-base text-gray-600 mt-2 flex items-center gap-2">
                <CalendarPlus className="w-4 h-4 inline" />
                {article.createdAt}
              </p>
              <h3 className="font-bold text-lg leading-tight text-gray-900">
                {article.title}
              </h3>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex items-center text-gray-500 text-sm">
                <Image
                  src="/dokter1.webp"
                  alt={article.createdBy}
                  className="w-6 h-6 rounded-full mr-2 border border-gray-200"
                  width={400}
                  height={400}
                />
                <span className="font-medium">{article.createdBy}</span>
              </div>
            </CardContent>
            <CardFooter className="mt-auto pt-2">
              <a
                href="#"
                className="text-blue-600 text-sm font-semibold flex items-center group hover:text-blue-800 transition-colors"
              >
                Baca Selengkapnya
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
