"use client";

import Image from "next/image";
import { Calendar, Eye, User } from "lucide-react";
import TiptapText from "@/components/tiptap-text";
import TiptapTitle from "@/components/tiptap-title";
import { useState, useEffect } from "react";
import FormatDate from "@/components/ui/format-date";
import TiptapEditor from "@/components/tiptapEditor";
import { FileEdit } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const EditMode = ({ params }) => {
  const { id } = params;

  const [articlesData, setArticlesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [contentText, setContentText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [currentEditMode, setCurrentEditMode] = useState(null);
  const [closeEditor, setCloseEditor] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/articles/${id}`,
        );

        const data = await response.json();

        setArticlesData(data.data);
        setUserData(data.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [id]);

  const handleTitle = () => {
    if (titleText) {
      return titleText;
    }
    return articlesData.title;
  };
  const handleContent = () => {
    if (contentText) {
      return contentText;
    }
    return articlesData.content;
  };

  return (
    <section className="container flex relative">
      {isLoading ? (
        <Loader2 className="h-14 w-14 animate-spin mx-auto text-primary mt-10 mb-2" />
      ) : (
        <>
          <article className="py-8 px-4 lg:px-24 xl:px-60">
            <p
              onClick={() => setCurrentEditMode(1)}
              className="font-semibold text-primary"
            >
              {articlesData.categories}
            </p>
            <div className="" onClick={() => setCurrentEditMode(2)}>
              <TiptapTitle
                onContentChange={setTitleText}
                titleData={articlesData.title}
              />
            </div>

            <div className="flex items-center justify-between sm:justify-normal sm:gap-10 md:gap-20 mb-6">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={userData?.image || ""}
                    alt={userData?.name || "User"}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User />
                  </AvatarFallback>
                </Avatar>
                <p className="sm:text-lg md:text-xl font-semibold">
                  {userData.name}
                </p>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <p className="sm:text-lg md:text-xl font-semibold">
                  <FormatDate dateString={articlesData.createdAt} />
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
              onClick={() => setCurrentEditMode(3)}
            />

            <div className="" onClick={() => setCurrentEditMode(4)}>
              <TiptapText
                onContentChange={setContentText}
                textData={articlesData.content}
              />
            </div>
          </article>
          {closeEditor ? (
            <TiptapEditor
              editMode={currentEditMode}
              onClose={() => setCloseEditor(false)}
              title={handleTitle()}
              content={handleContent()}
              categoriesData={articlesData.categories}
              id={id}
            />
          ) : (
            <>
              <div
                onClick={() => setCloseEditor(true)}
                className="flex cursor-pointer border-[1px] border-primary h-fit px-2 py-1 rounded-lg items-center absolute right-2 top-2"
              >
                <p className="text-primary font-medium text-lg">Editor</p>
                <FileEdit className="text-primary" />
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default EditMode;
