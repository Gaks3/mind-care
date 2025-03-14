import React from "react";
import { Calendar } from "lucide-react";

const datas = [
  {
    name: "LY",
    service: "e-conseling",
    review:
      "Pelayanan luar biasa! Psikolognya sangat mendukung dan benar-benar mendengarkan dengan empati.",
    date: "Rabu, 12 Maret 2025",
  },
  {
    name: "LY",
    service: "e-conseling",
    review:
      "Awalnya ragu dan cemas, tapi ternyata psikolognya sangat ramah, mendengarkan dengan baik, dan tidak menghakimi.",
    date: "Rabu, 12 Maret 2025",
  },
  {
    name: "LY",
    service: "e-conseling",
    review:
      "Sesi yang sangat membantu! Psikolognya membimbing saya menemukan akar masalah dan memberikan solusi yang tepat.",
    date: "Rabu, 12 Maret 2025",
  },
  {
    name: "LY",
    service: "e-conseling",
    review:
      "Pelayanan luar biasa! Psikolognya sangat mendukung dan benar-benar mendengarkan dengan empati.",
    date: "Rabu, 12 Maret 2025",
  },
  {
    name: "LY",
    service: "e-conseling",
    review:
      "Awalnya ragu dan cemas, tapi ternyata psikolognya sangat ramah, mendengarkan dengan baik, dan tidak menghakimi.",
    date: "Rabu, 12 Maret 2025",
  },
  {
    name: "LY",
    service: "e-conseling",
    review:
      "Sesi yang sangat membantu! Psikolognya membimbing saya menemukan akar masalah dan memberikan solusi yang tepat.",
    date: "Rabu, 12 Maret 2025",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Perjalanan Mereka Bersama MindCare
          </h1>
          <p className="text-gray-600 max-w-2xl sm:text-center mb-10">
            Cerita #PejuangKesehatanMental yang telah merasakan manfaat layanan
            Mindcare. Kamu juga berhak didengar dan didukung dalam perjalananmu!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 group ">
            {datas.map(({ name, service, review, date }, i) => (
              <div
                key={i}
                className={`w-full h-full xl:w-96 xl:h-64 border-2 border-primary rounded-xl p-6 hover:bg-gradient-to-br hover:from-primary hover:to-blue-400 hover:text-white transition-colors duration-150 ${i == 1 &&
                  "bg-gradient-to-br from-primary to-blue-400 hover:from-white text-white hover:bg-white hover:text-black group-hover:bg-white group-hover:text-black group-hover:from-white"
                  }`}
              >
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p className="text-sm">{service}</p>
                <p className="text-xl py-4">{review}</p>
                <div className="flex w-full justify-end items-center">
                  <Calendar className="w-4 h-4 mr-1 mb-[2px]" />
                  <p className="text-sm">{date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

