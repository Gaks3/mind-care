import Tiptap from "@/components/tiptap";
import Image from "next/image";
import { Calendar, Eye } from "lucide-react";
import { Article } from "@/types";
import ArticleCard from "@/components/ui/article-card";

const articles: Article[] = [
  {
    id: 1,
    title: "The Importance of Mental Health: Why We Should Care?",
    createdBy: "Bidan Ning Tyas",
    thumbnail: "/about-picture.webp",
    createdAt: "11th March 2025",
  },
  {
    id: 2,
    title: "Anxiety Disorder : Symptoms, Causes & How to Overcome It",
    createdBy: "Dokter Ayu Purniah",
    thumbnail: "/about-picture.webp",
    createdAt: "11th March 2025",
  },
  {
    id: 3,
    title: "How to Deal with Stress in the Midst of Everyday Busyness",
    createdBy: "Dr. Hartati",
    thumbnail: "/about-picture.webp",
    createdAt: "11th March 2025",
  },
  {
    id: 4,
    title: "The Importance of Social Supports for Mental Health",
    createdBy: "Psikolog Lestari",
    thumbnail: "/about-picture.webp",
    createdAt: "11th March 2025",
  },
];

export default function Article() {
  return (
    <section className="container mx-auto">
      <article className="py-8 px-4 lg:px-24 xl:px-60">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Pentingnya Kesehatan Mental: Mengapa Kita Harus Peduli?
        </h1>

        <div className="flex items-center justify-between sm:justify-normal sm:gap-10 md:gap-20 mb-6">
          <div className="flex items-center">
            <Image
              src="/profile.webp"
              width={1000}
              height={1000}
              alt="profile"
              className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-black/30 rounded-full mr-2"
            />
            <p className="sm:text-lg md:text-xl font-semibold">Suppa Nikka</p>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-lg md:text-xl font-semibold">12th March 2025</p>
          </div>
          <div className="flex items-center">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-lg md:text-xl font-semibold">8.989</p>
          </div>
        </div>

        <Image
          src="/about-picture.webp"
          width={1000}
          height={500}
          alt="Thumbnail"
          className="rounded-xl mx-auto mb-6"
        />

        <Tiptap />
      </article>

      <div className="w-full">
        <div className="mb-12 text-center mt-14 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 max-w-lg">
            Want to Keep Reading? Check Out This Article!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover valuable mental health information and tips for living a
            healthier life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-28">
          {articles.map((article, index) => (
            <ArticleCard
              id={article.id}
              key={index}
              title={article.title}
              createdBy={article.createdBy}
              thumbnail={article.thumbnail}
              createdAt={article.createdAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
