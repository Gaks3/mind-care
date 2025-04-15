"use client"

import ArticleCard from "./ui/article-card";
import { useEffect, useState } from "react";

const ArticleSection = () => {

    const [articlesData, setArticlesData] = useState([]);
  
    useEffect(() => {
      const getArticles = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/articles");
  
          const data = await response.json();
  
          setArticlesData(data.data.slice(0, 3));
        } catch (error) {
          console.log(error);
        }
      };
  
      getArticles();
    }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ArticleCard datas={articlesData}/>
      </div>
    </section>
  );
};

export default ArticleSection;
