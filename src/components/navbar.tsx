"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Brain, CalendarHeart, BrainCircuit, HeartPulse, UserRoundSearch, Hospital, ScanHeart, Laugh, PersonStanding, HandHeart } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex justify-between lg:justify-around items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Brain className="h-6 w-6 text-primary mr-2" />
              <span className="text-gray-700 font-bold text-xl">MindCare</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="#" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium flex items-center gap-2">
              <HeartPulse className="ml-2 h-4 w-4" />Konseling
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium focus:outline-none">
                <BrainCircuit className="ml-2 h-4 w-4" /><span className="ml-2">Tes Psikologi</span> <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link href="#" className="cursor-pointer flex items-center gap-2">
                    <ScanHeart className="ml-2 h-4 w-4" />Mental Health Test
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#" className="cursor-pointer flex items-center gap-2">
                    <Laugh className="ml-2 h-4 w-4" />Happiness Test
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#" className="cursor-pointer flex items-center gap-2">
                    <PersonStanding className="ml-2 h-4 w-4" />Loneliness Test
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#" className="cursor-pointer flex items-center gap-2">
                    <HandHeart className="ml-2 h-4 w-4" />Love Language Test
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="#" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium flex items-center gap-2">
              <Hospital className="ml-2 h-4 w-4" />
              Tentang Kami
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium flex items-center gap-2">
              <UserRoundSearch className="ml-2 h-4 w-4" />
              List Psikolog
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              className="text-primary border-primary rounded-xl"
              onClick={() => push("/sign-in")}
            >
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90 rounded-xl" onClick={() => push("/booking")}>
              Booking
              <CalendarHeart className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-primary p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute w-full z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              <Link href="#" className="block px-3 py-2 text-gray-600 hover:text-primary font-medium">
                Home
              </Link>
              <Link href="#" className="block px-3 py-2 text-gray-600 hover:text-primary font-medium">
                Konseling
              </Link>

              <div className="block px-3 py-2">
                <button
                  className="inline-flex items-center w-full text-left text-gray-600 hover:text-primary font-medium bg-transparent border-none p-0"
                  onClick={(e) => {
                    const target = e.currentTarget.nextElementSibling
                    if (target) {
                      target.classList.toggle("hidden")
                    }
                  }}
                >
                  <span>Tes Psikologi</span> <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="hidden pl-4 mt-2 space-y-1">
                  <Link href="#" className="block py-2 text-gray-600 hover:text-primary">
                    Mental Health Test
                  </Link>
                  <Link href="#" className="block py-2 text-gray-600 hover:text-primary">
                    Happiness Test
                  </Link>
                  <Link href="#" className="block py-2 text-gray-600 hover:text-primary">
                    Loneliness Test
                  </Link>
                  <Link href="#" className="block py-2 text-gray-600 hover:text-primary">
                    Love Language Test
                  </Link>
                </div>
              </div>

              <Link href="#" className="block px-3 py-2 text-gray-600 hover:text-primary font-medium">
                Tentang Kami
              </Link>
              <Link href="#" className="block px-3 py-2 text-gray-600 hover:text-primary font-medium">
                List Psikolog
              </Link>

              <div className="pt-4 pb-3 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="w-full mb-2 text-primary border-primary rounded-lg"
                  onClick={() => push("/sign-in")}
                >
                  Sign In
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90 rounded-lg" onClick={() => push("/booking")}>
                  Booking
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}