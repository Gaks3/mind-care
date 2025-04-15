"use client";

import { Search } from "lucide-react";
import ArticlesPage from "@/components/articles-page";

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

      <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-12 lg:gap-6 gap-y-10 px-6 lg:px-10">
        <ArticlesPage />
      </div>
    </section>
  );
};

export default Articles;
