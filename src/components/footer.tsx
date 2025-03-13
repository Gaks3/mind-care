import Link from "next/link"
import { Instagram, Brain, Activity, CalendarHeart } from "lucide-react"

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
                <h3 className="text-xl font-bold mb-2">Konsultasi dengan Psikolog di MindCare</h3>
                <p className="max-w-2xl">
                  Butuh tempat bercerita dan solusi dari ahlinya? Yuk, booking sesi konsultasimu sekarang dan dapatkan
                  dukungan yang kamu butuhkan!
                </p>
              </div>
              <Link
                href="#"
                className="bg-white text-blue-600 px-8 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Booking <CalendarHeart className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>Copyright {new Date().getFullYear()} MindCare.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" aria-label="YouTube">
                <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.1999 11.64C31.8331 10.0791 31.0797 8.0748 31.0799 6H24.8999V30.8C24.8533 32.1424 24.287 33.4142 23.3206 34.347C22.3541 35.2798 21.0631 35.8008 19.7199 35.8C16.8799 35.8 14.5199 33.48 14.5199 30.6C14.5199 27.16 17.8399 24.58 21.2599 25.64V19.32C14.3599 18.4 8.31995 23.76 8.31995 30.6C8.31995 37.26 13.8399 42 19.6999 42C25.9799 42 31.0799 36.9 31.0799 30.6V18.02C33.5859 19.8197 36.5947 20.7853 39.6799 20.78V14.6C39.6799 14.6 35.9199 14.78 33.1999 11.64Z" fill="white" />
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

