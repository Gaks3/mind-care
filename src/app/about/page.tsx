import HeroAbout from "@/components/about-comps/hero";
import VisiMisi from "@/components/about-comps/visi-misi";
import RecordAbout from "@/components/about-comps/record";
import OurTeamAbout from "@/components/about-comps/ourteam";

export default function AboutPage() {
  return (
    <main className="container mx-auto">
      <HeroAbout />
      <VisiMisi/>
      <RecordAbout/>
      <OurTeamAbout />
    </main>
  );
}
