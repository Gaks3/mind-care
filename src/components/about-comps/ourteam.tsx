import React from "react";

const  team = [ 
    {
        "image" : "/arkhanardana.jpeg",
        "name" : "Arkhan Ardana",
        "posisi" : "Developer",
        "link" : "https://arkhanardana.my.id/"
    },
    {
        "image" : "/adebagas.jpeg",
        "name" : "Ade Bagas",
        "posisi" : "Developer",
        "link" : "https://adebagas.my.id/"
    },
    {
        "image" : "/fathurahman.jpeg",
        "name" : "Siddiq Fathurahman",
        "posisi" : "Developer",
        "link" : "https://www.siddiqfathurahman.my.id/"
    },
    {
        "image" : "/ariframadhani.jpeg",
        "name" : "Arif Ramadhani",
        "posisi" : "Developer",
        "link" : "https://www.linkedin.com/in/arif-ramadhani-194282293/"
    }
]


const OurTeamAbout = () => {    
  return (
    <div>
        <section className="w-full text-center py-24 px-4 md:px-12"> 
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary mb-3">Our Team</h1>
            <div>
                <p className="text-gray-600 max-w-xl mx-auto text-center sm:text-center mb-10">
                Meet our dedicated team behind MindCare—passionate individuals committed to building a better future for mental health. Together, we’re creating tools that empower, support, and inspire.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 group ">
                {team.map(({ image, name, posisi, link }) => (
                        <div className="items-center">
                            <img src={image} alt={name} className="rounded-full mx-auto object-cover w-[150px] h-[150px] mb-4 ring-2 ring-primary ring-offset-4" />
                            <a className="font-semibold md:text-xl text-sm hover:text-primary hover:underline" href={link}>{name}</a>
                            <p className="text-sm">{posisi}</p>
                        </div>
                ))}
            </div>
        </section>
    </div>
  );
}

export default OurTeamAbout;