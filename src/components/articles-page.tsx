"use client";

import ArticleCard from "./ui/article-card";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const ArticlesPage = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/articles");

        const data = await response.json();

        setArticlesData(data.data.slice(0, 3));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

  return (
    <>
      {!isLoading ? (
        <ArticleCard datas={articlesData} />
      ) : (
        <div className="w-full col-span-3 grid justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      )}
    </>
  );
};

export default ArticlesPage;
