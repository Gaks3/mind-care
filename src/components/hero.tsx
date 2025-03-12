import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  Brain,
  HeartPulse,
  MessageCircle,
  MessageCircleHeart,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-16 md:pt-24 lg:pt-44 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden mb-14 md: lg:mb-64"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-0 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              Kesehatan Mental
            </span>
            <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              {" "}
              Bersama AI
            </span>
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 mb-8 leading-relaxed max-w-xl">
            Temukan ketenangan dan dukungan melalui asisten AI kami yang
            dirancang untuk membantu Anda menjaga kesehatan mental dan menemukan
            keseimbangan dalam hidup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl text-base group ">
              Mulai Sekarang <ArrowRight className="ml-2 group-hover:ml-3" />
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 rounded-xl text-base"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2 relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute bg-white/90 shadow-xl rounded-2xl p-6 sm:p-8 w-64 sm:w-72 animate-float">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="h-10 sm:h-12 w-10 sm:w-12 bg-gradient-to-br from-primary to-blue-300 rounded-full flex items-center justify-center">
                  <Brain className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg">MindCare</h3>
              </div>
              <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">
                Bagaimana perasaan Anda hari ini? Saya di sini untuk
                mendengarkan.
              </p>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> Chat Sekarang
                </Button>
              </div>
            </div>
            <div
              className="absolute top-1/4 right-4 sm:right-10 md:right-16 bg-white shadow-lg rounded-xl p-2 sm:p-3 animate-float z-10"
              style={{ animationDelay: "1s" }}
            >
              <HeartPulse className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>

            <div
              className="absolute bottom-1/4 left-4 sm:left-10 md:left-16 bg-white shadow-lg rounded-xl p-2 sm:p-3 animate-float z-10"
              style={{ animationDelay: "2s" }}
            >
              <MessageCircleHeart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
            <div
              className="absolute top-1/4 left-5 sm:left-10 md:left-20 bg-white shadow-lg rounded-xl p-2 sm:p-3 animate-float z-10"
              style={{ animationDelay: "3s" }}
            >
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
