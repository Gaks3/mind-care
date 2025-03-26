import React from "react";

const VisiMisiAbout = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 xl:px-16 2xl:px-52 mb-14 lg:h-screen lg:gap-0">
      <div className="md:w-[644px] w-full border-2 h-fit lg:h-60 rounded-lg p-6 bg-gradient-to-br from-primary to-blue-400 lg:mb-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-2">Visi</h2>
        <p className="text-white text-xl lg:text-2xl">
          Menjadi perusahaan yang berperan aktif dalam meningkatkan kesadaran
          akan kesehatan mental dan membantu menciptakan generasi yang lebih
          sehat dan produktif.
        </p>
      </div>
      <div className="md:w-[644px] w-full border-2 h-fit lg:h-60 lg:-mt-14 lg:ml-auto rounded-lg p-6 bg-white border-black/40">
        <h2 className="text-2xl lg:text-3xl font-semibold text-primary mb-2">Misi</h2>
        <p className="text-xl lg:text-2xl text-foreground/70">
          Menjadi perusahaan yang berperan aktif dalam meningkatkan kesadaran
          akan kesehatan mental dan membantu menciptakan generasi yang lebih
          sehat dan produktif.
        </p>
      </div>
    </div>
  );
};

export default VisiMisiAbout;
