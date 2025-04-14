import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  Brain,
  HeartPulse,
  MessageCircle,
  MessageCircleHeart,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-14 pb-14 lg:pt-12 lg:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-0 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              Mental Health
            </span>
            <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              {" "}
              With AI
            </span>
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 mb-8 leading-relaxed max-w-xl">
            Find peace and support with our AI assistant, designed to help you
            maintain mental well-being and discover balance in life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/check">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl text-base group w-full">
                Get Started <ArrowRight className="ml-2 group-hover:ml-3" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 rounded-xl text-base"
            >
              <Link href="/about">Learn More</Link>
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
                Answer some questions to predict your mental health with AI
              </p>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Link href="/check" className="flex items-center gap-3">
                    <MessageCircle className="h-4 w-4 mr-2" /> Check
                  </Link>
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
