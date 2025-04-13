'use client'

import CountUp from 'react-countup'

const records = [
  { data: 57000, suffix: "+", desc: "Stories shared with MindCare since 2021" },
  { data: 27500, suffix: "+", desc: "Active users accessing services" },
  { data: 315, suffix: "+", desc: "Qualified therapists available for consultation" },
  { data: 18800, suffix: "+", desc: "Clients reporting positive progress (80% success rate)" }
];

const RecordAbout = () => {
  return (
    <div className="flex flex-col items-center gap-10 px-4 pt-16 lg:h-screen">
      <h1 className="text-3xl lg:text-4xl max-w-xl font-bold text-center">
        <span className='text-primary'>Thank you </span>for placing your trust in us all <span className='text-primary'>this time.</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map(({ data, suffix, desc }, i) => (
          <div key={i} className="border-[1px] border-foreground/20 shadow-lg p-6 rounded-lg text-center">
            <h2 className="text-primary text-5xl font-bold">
              <CountUp end={data} enableScrollSpy={true} scrollSpyOnce={true} duration={2} separator="," />{suffix}
            </h2>
            <p className="text-gray-600 mt-2">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordAbout;
