import React from "react";
import { Calendar } from "lucide-react";

const datas = [
  {
    name: "LY",
    service: "e-counseling",
    review: "Exceptional service! My psychologist provided unwavering support and listened with genuine empathy.",
    date: "12th March 2025"
},
{
    name: "LY",
    service: "e-counseling",
    review: "Though initially nervous, I found my psychologist to be warm, attentive, and completely non-judgmental.",
    date: "12th March 2025"
},
{
    name: "LY",
    service: "e-counseling",
    review: "Breakthrough session! My psychologist helped me uncover core issues and offered practical solutions.",
    date: "12th March 2025"
},
{
    name: "LY",
    service: "e-counseling",
    review: "Outstanding care! I felt truly heard and supported throughout my counseling journey.",
    date: "12th March 2025"
},
{
    name: "LY",
    service: "e-counseling",
    review: "From skepticism to trust - my psychologist's patience and expertise made all the difference.",
    date: "12th March 2025"
},
{
    name: "LY",
    service: "e-counseling",
    review: "Transformative experience! The guidance I received helped me navigate my challenges effectively.",
    date: "12th March 2025"
}
];

export default function Testimonials() {
  return (
    <section className="w-full py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Their Journey with MindCare
          </h1>
          <p className="text-gray-600 max-w-2xl sm:text-center mb-10">
          Meet our #MentalHealthWarriors—real people transformed by MindCare. Your story matters, and we’re here to walk with you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 group ">
            {datas.map(({ name, service, review, date }, i) => (
              <div
                key={i}
                className={`w-full flex flex-col justify-between h-full xl:w-96 xl:h-64 border-2 border-primary rounded-xl p-6 hover:bg-gradient-to-br hover:from-primary hover:to-blue-400 hover:text-white transition-colors duration-150 ${i == 1 &&
                  "bg-gradient-to-br from-primary to-blue-400 hover:from-white text-white hover:bg-white hover:text-black group-hover:bg-white group-hover:text-black group-hover:from-white"
                  }`}
              >
                <div className="">
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p className="text-sm">{service}</p>
                <p className="text-xl py-4">{review}</p>
                </div>
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

