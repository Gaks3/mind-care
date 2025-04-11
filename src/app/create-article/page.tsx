"use client";

import Image from "next/image";
import { Calendar, Eye, ImagePlus } from "lucide-react";
import TiptapText from "@/components/tiptap-text";
import TiptapTitle from "@/components/tiptap-title";
import { useState, useRef } from "react";

const CreateArticle = () => {
  const [input, setInput] = useState(false);
  const fileName = useRef(null);

  const handleInput = (e) => {
    if (e.target.files.length > 0 && e.target.files ) {
      fileName.current.textContent = `Selected: ${e.target.files[0].name}`;
      setInput(true);
    } else {
      fileName.current.textContent = "Add Image";
      setInput(false);
    }
  };

  return (
    <section className="container mx-auto">
      <article className="py-8 px-4 lg:px-24 xl:px-60">
        <TiptapTitle />

        <div className="flex items-center justify-between sm:justify-normal sm:gap-10 md:gap-20 mb-6">
          <div className="flex items-center">
            <Image
              src="/profile.jpg"
              width={1000}
              height={1000}
              alt="profile"
              className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-black/30 rounded-full mr-2"
            />
            <p className="sm:text-lg md:text-xl font-semibold">Your Name</p>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-lg md:text-xl font-semibold">
              1st January 2000
            </p>
          </div>
          <div className="flex items-center">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-lg md:text-xl font-semibold">1000</p>
          </div>
        </div>

        {/* <Image
          src="/about-picture.webp"
          width={1000}
          height={500}
          alt="Thumbnail"
          className="rounded-xl mx-auto mb-6"
        /> */}

        <div className="w-full gap-2 flex flex-col justify-center items-center rounded-lg bg-gray-300  h-96 relative">
          <input
            onChange={handleInput}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
          <ImagePlus className={`w-20 h-20 ${input && "hidden"}`} />
          <p ref={fileName} className="text-3xl font-semibold">Add Image</p>

          <div className="absolute right-3 bottom-2 flex gap-2 text-xl">
            <p className="bg-primary text-white px-4 py-1 rounded-lg font-medium">Save</p>
            <p className="px-4 py-1 border-primary border-2 rounded-lg font-medium bg-white text-red-600">Cancel</p>
          </div>
        </div>

        <TiptapText />
      </article>
    </section>
  );
};

export default CreateArticle;
