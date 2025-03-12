import About from "@/components/about";
import Hero from "@/components/hero";
import Topik from "@/components/topik";
import Popularity from "@/components/popularity";
import ArticleSection from "@/components/articles";
import Ulasan from "@/components/ulasan";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Hero />
      <About />
      <Topik />
      <Popularity />
      <ArticleSection />
      <Ulasan />
    </main>
  );
}
