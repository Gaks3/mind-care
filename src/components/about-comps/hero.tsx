import React from 'react'

const HeroAbout = () => {
  return (
    <div className='flex flex-col items-center lg:h-screen pt-16 md:pt-24 lg:pt-52 px-4 sm:px-6 md:px-8 lg:px-12 mb-14 lg:mb-0'>
      <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-center'>Better thoughts better life better you</h1>
      <p className='text-base sm:text-2xl lg:text-3xl text-foreground/70 leading-relaxed text-center lg:max-w-6xl'>Menjadikan kesehatan mental sebagai gaya hidup untuk menciptakan generasi lebih sehat. Dengan pikiran yang lebih baik, hidup menjadi lebih berkualitas, dan diri semakin berkembang.</p>
    </div>
  )
}

export default HeroAbout
