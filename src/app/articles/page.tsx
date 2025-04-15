"use client";

import { Search } from "lucide-react";
import ArticleCard from "@/components/ui/article-card";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const menu = ["Latest", "Popular", "Oldest"];

const Articles = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/articles");

        const data = await response.json();

        setArticlesData(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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


      {isLoading ? (
        <Loader2 className="h-14 w-14 animate-spin mx-auto text-primary mt-10 mb-2" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-6 lg:px-10 xl:px-28">
          <ArticleCard datas={articlesData} />
        </div>
      )}
    </section>
  );
};

export default Articles;
