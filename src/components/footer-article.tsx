"use client"

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const FooterArticles = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true)

      try {
        const response = await fetch("http://localhost:3000/api/articles");

        const data = await response.json();

        setArticlesData(data.data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false)
      }
    };

    getArticles();
  }, []);
  return (
    <>
    {
      !isLoading ? (
        <ul className="space-y-3">
            {
        articlesData.map((e, i)=>(
            <li key={i}>
                  <Link
                    href={`/articles/${e.id}`}
                    className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30"
                  >
                    {e.title}
                  </Link>
                </li>
        ))
            }
        </ul>
      ) : (
        <div className="w-full justify-center">
          <Loader2 className="h-10 w-10 text-white animate-spin" />
        </div>
      )
    }
    </>
  )
}

export default FooterArticles