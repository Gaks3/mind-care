"use client";

import Tiptap from "@/components/tiptap";
import Image from "next/image";
import { Calendar, Eye } from "lucide-react";

export default function Article() {
  return (
    <main className="container mx-auto py-8 px-4 lg:px-24 xl:px-60">
      <h1 className="text-4xl font-semibold mb-6">Pentingnya Kesehatan Mental: Mengapa Kita Harus Peduli?</h1>

      <div className="flex items-center gap-20 mb-6">
        <div className="flex items-center">
          <Image src="/profile.webp" width={1000} height={1000} alt="profile" className="w-14 h-14 border-2 border-black/30 rounded-full mr-2"/>
          <p className="text-xl font-semibold">Suppa Nikka</p>
        </div>
        <div className="flex items-center">
          <Calendar className="w-6 h-6 mr-2"/>
          <p className="text-xl font-semibold">12th March 2025</p>
        </div>
        <div className="flex items-center">
          <Eye className="w-6 h-6 mr-2"/>
          <p className="text-xl font-semibold">8.989</p>
        </div>
      </div>

      <Image src="/about-picture.webp" width={1000} height={500} alt="Thumbnail" className="rounded-xl mx-auto mb-6"/>

      <Tiptap/>
    </main>
  );
}
