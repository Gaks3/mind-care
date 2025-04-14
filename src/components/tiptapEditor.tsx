"use client";

import { X } from "lucide-react";
import { useState } from "react";

const topikTypes = [
  "Depression",
  "Anxiety",
  "Disorder",
  "Toxic",
  "Relationship",
  "Burnout",
  "Trauma",
  "Family Issues",
  "Trust Issues",
  "Insomnia",
];

const TiptapEditor = ({ editMode, onClose, title, content, categoriesData }) => {
  const dataCate = categoriesData.split(',')

  const checkData = dataCate.map(item => topikTypes.indexOf(item));

  const [categories, setCategories] = useState<number[]>(checkData || []);


  const handleCategories = (i: number) => {
    setCategories((prev) => {
      if (prev.includes(i)) {
        return prev.filter((item) => item !== i);
      }
      return prev.length < 3 ? [...prev, i] : prev;
    });
  };

  const addNewArticle = async (title, content, image, categories) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("categories", categories);

      await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: "PATCH",
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const MODES = {
    CATEGORIES: 1,
    TITLE: 2,
    IMAGE: 3,
    CONTENT: 4,
  };

  // Render content based on edit mode
  const renderEditContent = () => {
    switch (editMode) {
      case MODES.CATEGORIES:
        return (
          <div className="m-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">Change Categories</p>
              <X onClick={onClose} className="cursor-pointer" />
            </div>

            <div className="flex gap-2 flex-wrap pt-1">
              {topikTypes.map((topik, i) => (
                <div
                  key={i}
                  onClick={() => handleCategories(i)}
                  className={`
                              text-xs font-medium px-3 py-2 rounded-xl 
                              flex items-center justify-center transition-colors
                              ${
                                categories.includes(i)
                                  ? "bg-blue-100 hover:bg-blue-200 cursor-pointer"
                                  : categories.length === 3
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-blue-100 text-gray-800 hover:bg-blue-200 cursor-pointer"
                              }
                            `}
                >
                  {topik}
                  {categories.includes(i) && <X className="w-4 h-4 ml-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case MODES.TITLE:
        return (
          <div className="m-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">Change Title</p>
              <X onClick={onClose} className="cursor-pointer" />
            </div>

            <p className="pt-1">Just type on the title input</p>
          </div>
        );
      case MODES.IMAGE:
        return (
          <div className="m-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">Change Image</p>
              <X onClick={onClose} className="cursor-pointer" />
            </div>

            <p className="pt-1">
              Click the categories, title, image, or content to edit the article
            </p>
          </div>
        );
      case MODES.CONTENT:
        return (
          <div className="m-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">Edit Content</p>
              <X onClick={onClose} className="cursor-pointer" />
            </div>

            <p className="pt-1">
              Click the categories, title, image, or content to edit the article
            </p>
          </div>
        );
      default:
        return (
          <div className="m-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">Edit Article</p>
              <X onClick={onClose} className="cursor-pointer" />
            </div>

            <p className="pt-1">
              Click the categories, title, image, or content to edit the article
            </p>
          </div>
        );
    }
  };

  return (
    <section className="w-80 fixed z-20 right-0 bg-white border-l-[1px] border-black h-screen">
      {renderEditContent()}
      <div onClick={()=>addNewArticle(title, content)} className="bg-primary w-fit px-6 py-2 cursor-pointer hover:bg-blue-700 text-white rounded-md right-0 absolute">
        Save Edit
      </div>
    </section>
  );
};

export default TiptapEditor;
