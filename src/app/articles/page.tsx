"use client";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import ArticleCard from "@/components/ui/article-card";
import { useEffect, useState } from "react";

const menu = ["Latest", "Popular", "Oldest"];

const Articles = () => {

  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/articles");

        const data = await response.json();

        setArticlesData(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getArticles();
  }, []);

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
        <ArticleCard datas={articlesData} />
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
