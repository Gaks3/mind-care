import React from "react";

const VisiMisiAbout = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 xl:px-16 2xl:px-52 mb-14 lg:h-screen lg:gap-0">
      <div className="md:w-[644px] shadow-2xl w-full border-2 h-fit lg:h-52 rounded-lg p-6 bg-gradient-to-br from-primary to-blue-400 lg:mb-0 mb-4">
        <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-2">Vision</h2>
        <p className="text-white text-xl lg:text-2xl">
        To be a company that actively promotes mental health awareness and helps build a healthier, more productive generation.
        </p>
      </div>
      <div className="md:w-[644px] shadow-2xl w-full border-2 h-fit lg:h-52 lg:-mt-12 lg:ml-auto rounded-lg p-6 bg-white border-black/10">
        <h2 className="text-2xl lg:text-3xl font-semibold text-primary mb-2">Mission</h2>
        <p className="text-xl lg:text-2xl text-foreground/70">
        We actively raise mental health awareness and implement solutions to foster a healthier, more productive generation.
        </p>
      </div>
    </div>
  );
};

export default VisiMisiAbout;
