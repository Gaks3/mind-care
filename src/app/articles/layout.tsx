import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}