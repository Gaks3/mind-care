import HeroAbout from "@/components/about-comps/hero";
import VisiMisi from "@/components/about-comps/visi-misi";
import RecordAbout from "@/components/about-comps/record";

export default function AboutPage() {
  return (
    <main className="container mx-auto">
      <HeroAbout />
      <VisiMisi/>
      <RecordAbout/>
    </main>
  );
}
