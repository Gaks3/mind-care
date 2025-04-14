"use client";

import Image from "next/image";
import { Calendar, Eye } from "lucide-react";
import TiptapText from "@/components/tiptap-text";
import TiptapTitle from "@/components/tiptap-title";
import { useState, useEffect } from "react";
import FormatDate from "@/components/ui/format-date";
import TiptapEditor from "@/components/tiptapEditor";

const EditMode = ({ params }) => {
  const { id } = params;

  const [articlesData, setArticlesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [contentText, setContentText] = useState("");
  const [titleText, setTitleText] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/articles/${id}`,
        );

        const data = await response.json();

        setArticlesData(data.data);
        setUserData(data.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getArticles();
  }, [id]);

  useEffect(() => {
    const addNewArticle = async (title, content) => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        await fetch(`http://localhost:3000/api/articles/${id}`, {
          method: "PATCH",
          body: formData,
        });
      } catch (error) {
        console.log(error);
      }
    };

    addNewArticle(titleText, contentText);
  }, [id, titleText, contentText]);

  return (
    <section className="container ml-auto flex">
      <article className="py-8 px-4 lg:px-24 xl:px-60">
      <p className="font-semibold text-primary">{articlesData.categories}</p>
        <TiptapTitle
          onContentChange={setTitleText}
          titleData={articlesData.title}
        />

        <div className="flex items-center justify-between sm:justify-normal sm:gap-10 md:gap-20 mb-6">
          <div className="flex items-center">
            <Image
              src={`/${userData.image}`}
              width={1000}
              height={1000}
              alt="profile"
              className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-black/30 rounded-full mr-2"
            />
            <p className="sm:text-lg md:text-xl font-semibold">
              {userData.name}
            </p>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-lg md:text-xl font-semibold">
              <FormatDate dateString={articlesData.createdAt}/>
            </p>
          </div>
          <div className="flex items-center">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-lg md:text-xl font-semibold">
              {articlesData.view}
            </p>
          </div>
        </div>

        <Image
          src={`/${articlesData.thumbnail}`}
          width={1000}
          height={500}
          alt="Thumbnail"
          className="rounded-xl mx-auto mb-6"
        />

        <TiptapText
          onContentChange={setContentText}
          textData={articlesData.content}
        />
      </article>

      <TiptapEditor/>
    </section>
  );
};

export default EditMode;
