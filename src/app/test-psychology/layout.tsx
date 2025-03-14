import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}