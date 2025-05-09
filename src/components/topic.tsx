import Image from "next/image";

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

const images = [
  "/dokter1.webp",
  "/dokter2.webp",
  "/dokter3.webp",
  "/dokter4.webp",
];

export default function Topic() {
  return (
    <section className="w-full px-6 md:px-12 py-16 md:py-24 lg:py-40">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16">
        <div className="flex flex-col gap-4 justify-center lg:w-[62.5%]">
          <h1 className="text-3xl md:text-4xl leading-tight font-bold text-primary">
            Don&apos;t hesitate to open up - <br className="hidden sm:inline" />
            Our MindCare psychologists are here to hear you out!
          </h1>
          <p className="text-base lg:w-[80%] mb-3 text-gray-700">
            You&apos;re free to choose a licensed psychologist who matches your
            preferences, experience, and expertise—tailored to your needs.
          </p>
          <div className="flex gap-2 sm:gap-3.5 flex-wrap lg:w-[80%]">
            {topikTypes.map((topik, i) => (
              <div
                key={i}
                className="text-xs font-medium bg-blue-200 text-gray-700 px-5 py-2 rounded-2xl flex items-center justify-center"
              >
                {topik}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 lg:mt-0 flex justify-center lg:justify-start items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {images.map((image, i) => (
              <Image
                key={i}
                src={image || "/placeholder.svg"}
                width={400}
                height={400}
                alt={`foto docter ${i + 1}`}
                loading="lazy"
                className="block hover:ring-2 ring-offset-4 hover:ring-primary object-cover w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-[195px] lg:h-[195px] rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
