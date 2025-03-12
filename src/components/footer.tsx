import Link from "next/link"
import { Facebook, Instagram, Youtube, Brain, Activity } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative mt-40 lg:mt-52">
      <div className="absolute top-0 left-0 w-full transform -translate-y-[99%]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#2563EB"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="bg-blue-600 text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute opacity-10 right-3 top-10 hidden lg:block">
          <Activity size={450} strokeWidth={1} />
        </div>

        <div className="absolute opacity-10 left-20 bottom-16">
          <Brain size={450} strokeWidth={1} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="hidden md:grid md:grid-cols-4 md:gap-8 md:mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Lainnya</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Yogyakarta
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Bandung
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Lampung
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Palembang
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Jakarta Selatan
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Konseling Individu
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Konseling Pasangan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Konseling Keluarga
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Konseling Online
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Hipnoterapi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Konseling Gratis
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Konseling Yogyakarta
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Kenali Kami</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Daftar Psikolog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Karir
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Daftar Volunteer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Article</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30">
                    Pentingnya Kesehatan Mental: Mengapa Kita Harus Peduli?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30">
                    Gangguan Kecemasan: Gejala, Penyebab & Cara Mengatasinya
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30">
                    Cara Mengatasi Stres di Tengah Kesibukan Sehari-hari
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30">
                    Pentingnya Dukungan Sosial dimi Menjaga Kesehatan Mental
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Lainnya</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="hover:underline">
                      Yogyakarta
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Bandung
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Lampung
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Palembang
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Jakarta Selatan
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Layanan</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="hover:underline">
                      Konseling Individu
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Konseling Pasangan
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Konseling Keluarga
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Konseling Online
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Hipnoterapi
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Konseling Gratis
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Konseling Yogyakarta
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Kenali Kami</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="hover:underline">
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Hubungi Kami
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Daftar Psikolog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Karir
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Daftar Volunteer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Article</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30">
                    Pentingnya Kesehatan Mental: Mengapa Kita Harus Peduli?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30">
                    Gangguan Kecemasan: Gejala, Penyebab & Cara Mengatasinya
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30">
                    Cara Mengatasi Stres di Tengah Kesibukan Sehari-hari
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline block border border-blue-400 p-3 rounded-md bg-blue-700/30">
                    Pentingnya Dukungan Sosial dimi Menjaga Kesehatan Mental
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-b border-blue-400 py-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Konsultasi dengan Psikolog di Mindcare</h3>
                <p className="max-w-2xl">
                  Butuh tempat bercerita dan solusi dari ahlinya? Yuk, booking sesi konsultasimu sekarang dan dapatkan
                  dukungan yang kamu butuhkan!
                </p>
              </div>
              <Link
                href="#"
                className="bg-white text-blue-600 px-8 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                Booking
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>Copyright {new Date().getFullYear()} ibunda.id</p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Instagram" className="hover:text-blue-200 transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:text-blue-200 transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" aria-label="YouTube" className="hover:text-blue-200 transition-colors">
                <Youtube size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

