import React from 'react';

const HeroAbout = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center lg:items-start lg:justify-between lg:h-screen pt-16 md:pt-24 lg:pt-52 px-4 sm:px-6 md:px-8 lg:px-12 mb-12 lg:mb-28 overflow-x-hidden max-w-screen-xl mx-auto'>
      
      <div className='w-full lg:w-1/2 text-left'>
        <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4'>
          Better thoughts better life better you
        </h1>
        <p className='text-base sm:text-xl lg:text-xl text-foreground/70 leading-relaxed lg:max-w-xl'>
          Making mental health a lifestyle to cultivate a healthier generation. With a stronger mind comes a more fulfilling life and greater personal growth.
        </p>
      </div>

      <div className='w-full lg:w-1/2 flex justify-center lg:justify-end'>
        <img
          src='/phone.png'
          alt='mindcare phone'
          className='w-72 max-w-md h-auto object-cover lg:-mt-32 lg:translate-x-[-56px]'
        />
      </div>

    </div>
  );
};

export default HeroAbout;
