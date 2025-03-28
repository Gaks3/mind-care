import Image from "next/image";

export default function About() {
  return (
    <section className="px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-40 items-center">
          <div className="relative">
            <div className="w-full h-96 bg-mental-100 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-blue-500/20"></div>
              <Image
                src="/about-picture.webp"
                alt="Ketenangan Mental"
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary to-blue-400 rounded-2xl -z-10"></div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About MindCare</h2>
            <p className="text-lg text-foreground/70 mb-6">
            MindCare is an innovative platform that combines artificial intelligence with mental health principles, delivering personalized support for every user.
            </p>
            <p className="text-lg text-foreground/70 mb-6">
            We believe everyone deserves access to quality mental health resources—whenever and wherever they need them.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary p-4 rounded-lg">
                <h4 className="font-semibold text-2xl text-blue-50 mb-2">24/7</h4>
                <p className="text-white">Help is here for you—anytime you need it.</p>
              </div>
              <div className="bg-primary p-4 rounded-lg">
                <h4 className="font-semibold text-2xl text-blue-50 mb-2">100%</h4>
                <p className="text-white">Your information stays private and secure - we guarantee it</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
