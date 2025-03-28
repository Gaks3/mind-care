import React from "react";
import { Article } from "@/types";
import ArticleCard from "./ui/article-card";

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
}
];

const ArticleSection = () => {
  return (
    <section className="container mx-auto py-16 px-6 lg:px-28">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Interesting Articles
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
        Discover valuable mental health information and tips for living a healthier life.
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
