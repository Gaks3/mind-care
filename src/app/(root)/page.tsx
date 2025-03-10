import About from "@/components/about";
import Hero from "@/components/hero";
import Topik from "@/components/topik";
import Popularity from "@/components/popularity";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Hero />
      <About />
      <Topik />
      <Popularity/>
    </main>
  );
}
