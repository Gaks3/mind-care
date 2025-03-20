import Link from "next/link"
import { FileQuestion, Home, } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="my-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />
        <div className="relative z-0">
          <svg
            className="w-full max-w-lg mx-auto text-primary/10"
            viewBox="0 0 400 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M39.7,-68.2C52.9,-62.3,66.2,-54.5,73.1,-42.3C80,-30.1,80.5,-13.5,78.8,2.1C77.1,17.7,73.1,32.3,65.2,44.8C57.3,57.3,45.4,67.7,31.6,73.5C17.8,79.3,2.1,80.5,-13.2,77.8C-28.5,75.1,-43.5,68.5,-56.3,58.1C-69.1,47.7,-79.8,33.5,-83.9,17.3C-88,1.1,-85.5,-17.1,-78.2,-32.2C-70.9,-47.3,-58.7,-59.3,-44.8,-65.1C-30.9,-70.9,-15.5,-70.5,-0.6,-69.5C14.3,-68.5,26.5,-74.1,39.7,-68.2Z"
              transform="translate(200 100)"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[120px] font-bold text-primary/20">
            404
          </div>
        </div>
      </div>
      <div className="rounded-full bg-blue-100 p-6 mb-6">
        <FileQuestion className="h-16 w-16 text-primary" />
      </div>

      <h1 className="text-4xl font-bold text-primary mb-2 text-center">Halaman Tidak Ditemukan</h1>

      <p className="text-gray-500 text-center max-w-md mb-8">
        Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan atau dihapus.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-primary hover:bg-blue-700">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>


    </div>
  )
}

