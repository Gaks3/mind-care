import React from "react";
import Image from "next/image";

const topikTypes = [
  "Depresi",
  "Anxiety",
  "Disorder",
  "Toxic",
  "Relationship",
  "Burn Out",
  "Trauma",
  "Masalah",
  "Keluarga",
  "Trust Issue",
  "Insomnia",
];
const images = [
  "/dokter1.webp",
  "/dokter2.webp",
  "/dokter3.webp",
  "/dokter4.webp",
];

const Topik = () => {
  return (
    <section className="w-full flex px-12 justify-center py-40">
      <div className=" flex flex-col gap-2 justify-center w-[55%]">
        <h1 className="text-4xl leading-[50px]">
          Tak perlu ragu bercerita, <br />
          Psikolog MindCare siap mendengarkanmu!
        </h1>
        <p className="text-xl w-[80%] mb-3">
          Kamu bisa bebas memilih psikolog berlisensi sesuai preferensi,
          pengalaman, serta topik keahlian yang sesuai dengan kebutuhamu.
        </p>
        <div className="flex gap-3.5 flex-wrap w-[80%]">
          {topikTypes.map((e, i) => (
            <div
              key={i}
              className="text-xs font-medium bg-[#D9D9D9] w-[91px] h-[34px] rounded-xl flex items-center justify-center"
            >
              {e}
            </div>
          ))}
        </div>
      </div>
      <div className="items-center flex">
        <div className="grid grid-cols-2 gap-5 w-fit">
          {images.map((e, i) => (
            <Image
              key={i}
              src={e}
              width={1000}
              height={1000}
              alt={`foto docter ${i + 1}`}
              loading="lazy"
              className="block object-cover w-[195px] h-[195px] rounded-xl border-2 border-black"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topik;
