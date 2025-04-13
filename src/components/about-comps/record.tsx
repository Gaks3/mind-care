import React from "react";

const records = [
  {
    data: "57,000+",
    desc: "Stories shared with MindCare since 2021"
  },
  {
    data: "27,500+", 
    desc: "Active users accessing services"
  },
  {
    data: "315+",
    desc: "Qualified therapists available for consultation"
  },
  {
    data: "18,800+",
    desc: "Clients reporting positive progress (80% success rate)"
  }
];

const RecordAbout = () => {
  return (
    <div className="flex flex-col items-center lg:h-screen pt-16 md:pt-0 px-4 sm:px-6 md:px-8 lg:px-12 mb-4 lg:mb-0 gap-10">
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 max-w-4xl text-center">
      Thank you for placing your trust in us all this time.
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {records.map(({ data, desc }, i) => (
          <div
            key={i}
            className="border-[1px] border-foreground/70 xl:p-12 lg:p-10 sm:p-8 p-4 border-lg rounded-lg flex flex-col items-center justify-center"
          >
            <h2 className="text-primary text-4xl sm:text-5xl xl:text-6xl font-bold">
              {data}
            </h2>
            <p className="text-foreground/70 text-base lg:text-lg text-center">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordAbout;
