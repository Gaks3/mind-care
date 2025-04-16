"use client";

import { X, ImagePlus } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {toast} from "sonner"

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

const TiptapEditor = ({
  editMode,
  onClose,
  title,
  content,
  categoriesData,
  id,
}) => {
  const router = useRouter();
  const dataCate = categoriesData.split(",");

  const checkData = dataCate.map((item) => topikTypes.indexOf(item));

  const [categories, setCategories] = useState<number[]>(checkData || []);
  const [isLoading, setIsLoading] = useState(false);
  const fileName = useRef(null);
  const fileImage = useRef(null);

  const handleCategories = (i: number) => {
    setCategories((prev) => {
      if (prev.includes(i)) {
        return prev.filter((item) => item !== i);
      }
      return prev.length < 3 ? [...prev, i] : prev;
    });
  };

  const addNewArticle = async (titles, contents, category) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", titles);
      formData.append("content", contents);
      formData.append("categories", category);

      const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      toast.success("Successfully to edit article")
      return await response.json();
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit article")
    } finally {
      setIsLoading(false);
      router.refresh()
    }
  };

  const handleImage = async (image) => {
    if (!fileImage.current) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      return await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.refresh()
    }
  };

  const handleInput = (e) => {
    if (e.target.files.length > 0 && e.target.files) {
      fileName.current.textContent = `Selected: ${e.target.files[0].name}`;
      fileImage.current = e.target.files[0];
    } else {
      fileName.current.textContent = "Insert Image";
    }
  };

  const selectedCategories = categories.map((index) => topikTypes[index]);

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

            {!isLoading ? (
              <div
                onClick={() =>
                  addNewArticle(title, content, selectedCategories)
                }
                className="bg-primary w-fit px-6 py-2 cursor-pointer hover:bg-blue-700 text-white rounded-md right-0 absolute"
              >
                Save Edit
              </div>
            ) : (
              <div className="bg-blue-400 w-fit px-6 py-2 cursor-not-allowed text-white rounded-md right-0 absolute">
                Loading...
              </div>
            )}
          </div>
        );
      case MODES.TITLE:
        return (
          <div className="m-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">Change Title</p>
              <X onClick={onClose} className="cursor-pointer" />
            </div>

            <p className="pt-1">Just type on the title field</p>

            {!isLoading ? (
              <div
                onClick={() =>
                  addNewArticle(title, content, selectedCategories)
                }
                className="bg-primary w-fit px-6 py-2 cursor-pointer hover:bg-blue-700 text-white rounded-md right-0 absolute"
              >
                Save Edit
              </div>
            ) : (
              <div className="bg-blue-400 w-fit px-6 py-2 cursor-not-allowed text-white rounded-md right-0 absolute">
                Loading...
              </div>
            )}
          </div>
        );
      case MODES.IMAGE:
        return (
          <div className="m-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">Change Image</p>
              <X onClick={onClose} className="cursor-pointer" />
            </div>

            <div className="border-[1px] border-black/70 h-32 rounded-md bg-white relative flex flex-col justify-center items-center">
              <ImagePlus className="w-10 h-10 text-black/70" />
              <p ref={fileName} className="text-black/70 font-medium">
                Enter new image
              </p>
              <input
                onChange={handleInput}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="w-full h-full opacity-0 absolute cursor-pointer"
              />
            </div>

            {!isLoading ? (
              <div
                onClick={() => handleImage(fileImage.current)}
                className="bg-primary w-fit px-6 py-2 cursor-pointer hover:bg-blue-700 text-white rounded-md right-0 absolute mt-2"
              >
                Save Edit
              </div>
            ) : (
              <div className="bg-blue-400 w-fit px-6 py-2 cursor-not-allowed text-white rounded-md right-0 absolute mt-2">
                Loading...
              </div>
            )}
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
            Just type on the content field
            </p>

            {!isLoading ? (
              <div
                onClick={() =>
                  addNewArticle(title, content, selectedCategories)
                }
                className="bg-primary w-fit px-6 py-2 cursor-pointer hover:bg-blue-700 text-white rounded-md right-0 absolute"
              >
                Save Edit
              </div>
            ) : (
              <div className="bg-blue-400 w-fit px-6 py-2 cursor-not-allowed text-white rounded-md right-0 absolute">
                Loading...
              </div>
            )}
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

            {!isLoading ? (
              <div
                onClick={() =>
                  addNewArticle(title, content, selectedCategories)
                }
                className="bg-primary w-fit px-6 py-2 cursor-pointer hover:bg-blue-700 text-white rounded-md right-0 absolute"
              >
                Save Edit
              </div>
            ) : (
              <div className="bg-blue-400 w-fit px-6 py-2 cursor-not-allowed text-white rounded-md right-0 absolute">
                Loading...
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <section className="w-80 fixed z-20 right-0 bg-white border-l-[1px] border-black h-screen">
      {renderEditContent()}
    </section>
  );
};

export default TiptapEditor;
