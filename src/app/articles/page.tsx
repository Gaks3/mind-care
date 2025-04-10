import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import ArticleCard from "@/components/ui/article-card";
import { Article } from "@/types";

const articles: Article[] = [
  {
    id: 101,
    title: "The Importance of Mental Health: Why We Should Care?",
    createdBy: "Bidan Ning Tyas",
    thumbnail: "/about-picture.webp",
    createdAt: "15th January 2024",
  },
  {
    id: 102,
    title: "Anxiety Disorder: Symptoms, Causes & How to Overcome It",
    createdBy: "Dokter Ayu Purniah",
    thumbnail: "/about-picture.webp",
    createdAt: "22nd February 2023",
  },
  {
    id: 103,
    title: "How to Deal with Stress in the Midst of Everyday Busyness",
    createdBy: "Dr. Hartati",
    thumbnail: "/about-picture.webp",
    createdAt: "5th April 2025",
  },
  {
    id: 104,
    title: "The Importance of Social Supports for Mental Health",
    createdBy: "Psikolog Lestari",
    thumbnail: "/about-picture.webp",
    createdAt: "30th November 2022",
  },
  {
    id: 105,
    title: "Understanding Depression: Signs and Treatment Options",
    createdBy: "Dr. Wahyu Setiawan",
    thumbnail: "/about-picture.webp",
    createdAt: "8th August 2023",
  },
  {
    id: 106,
    title: "Mindfulness Techniques for Better Mental Wellbeing",
    createdBy: "Psikolog Dian Sastro",
    thumbnail: "/about-picture.webp",
    createdAt: "17th December 2024",
  },
  {
    id: 107,
    title: "The Connection Between Physical and Mental Health",
    createdBy: "Dr. Andi Pratama",
    thumbnail: "/about-picture.webp",
    createdAt: "3rd June 2025",
  },
  {
    id: 108,
    title: "Breaking the Stigma: Talking Openly About Mental Health",
    createdBy: "Bidan Rina Marlina",
    thumbnail: "/about-picture.webp",
    createdAt: "19th September 2021",
  },
  {
    id: 109,
    title: "Coping Mechanisms for Anxiety in the Digital Age",
    createdBy: "Psikolog Agus Salim",
    thumbnail: "/about-picture.webp",
    createdAt: "25th July 2024",
  },
  {
    id: 110,
    title: "Work-Life Balance Strategies for Mental Health",
    createdBy: "Dr. Siti Nurhaliza",
    thumbnail: "/about-picture.webp",
    createdAt: "10th October 2023",
  },
  {
    id: 111,
    title: "The Role of Nutrition in Mental Health Management",
    createdBy: "Dokter Fitriani",
    thumbnail: "/about-picture.webp",
    createdAt: "14th May 2022",
  },
  {
    id: 112,
    title: "Building Resilience: Techniques for Mental Toughness",
    createdBy: "Psikolog Bambang Sutrisno",
    thumbnail: "/about-picture.webp",
    createdAt: "28th February 2026",
  },
];

const menu = ["Latest", "Popular", "Oldest"];

const Articles = () => {
  return (
    <section className="container mx-auto">
      <div className="flex justify-center md:pt-10 pt-4 md:pb-8 pb-4 px-6 md:px-0">
        <div className="flex border-2 border-primary rounded-lg w-full md:w-fit">
          <input
            type="text"
            placeholder="Search Articles or Psychologist"
            className="rounded-l-lg focus:outline-none font-medium w-full md:w-[600px] px-2 text-lg md:text-xl py-1 md:py-2"
          />
          <div className="w-14 bg-primary rounded-r-md flex justify-center items-center cursor-pointer">
            <Search className="text-white md:h-7 md:w-7 h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 sm:gap-6 pb-6 md:pb-8">
        {menu.map((e, i) => (
          <p
            key={i}
            className={`md:px-4 md:py-1.5 px-3 py-1 border-primary font-semibold border-2 rounded-lg cursor-pointer ${
              i == 0 && "bg-primary text-white"
            }`}
          >
            {e}
          </p>
        ))}
      </div>

      <div className="flex justify-center mb-6 items-center">
        <ChevronLeft className="w-7 h-7" />
        <ul className="flex gap-1 lg:gap-2 text-xl lg:text-2xl px-2 lg:px-4">
          <li className="bg-primary text-white py-1 px-4 lg:px-5 rounded-lg">
            1
          </li>
          <li className="py-1 px-4 lg:px-5 rounded-lg">2</li>
          <li className="py-1 px-4 lg:px-5 rounded-lg">3</li>
        </ul>
        <ChevronRight className="lg:w-9 lg:h-9 w-7 h-7" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-10 xl:px-28">
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

      <div className="flex justify-center mt-14 items-center">
        <ChevronLeft className="w-7 h-7" />
        <ul className="flex gap-1 lg:gap-2 text-xl lg:text-2xl px-2 lg:px-4">
          <li className="bg-primary text-white py-1 px-4 lg:px-5 rounded-lg">
            1
          </li>
          <li className="py-1 px-4 lg:px-5 rounded-lg">2</li>
          <li className="py-1 px-4 lg:px-5 rounded-lg">3</li>
        </ul>
        <ChevronRight className="lg:w-9 lg:h-9 w-7 h-7" />
      </div>
    </section>
  );
};

export default Articles;
