"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Brain, CalendarHeart, BrainCircuit, UserRoundSearch, Hospital, Newspaper } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { UserRole } from "@/types"

export default function Navbar() {
  const { data: session } = authClient.useSession()
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50" ref={navRef}>
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
              <Newspaper className="ml-2 h-4 w-4" />Artikel
            </Link>

            <Link href="/test-psychology" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium flex items-center gap-2">
              <BrainCircuit className="ml-2 h-4 w-4" /><span className="ml-2">Tes Psikologi</span>
            </Link>

            <Link href="/about" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium flex items-center gap-2">
              <Hospital className="ml-2 h-4 w-4" />
              Tentang Kami
            </Link>
            <Link href="/bookings" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium flex items-center gap-2">
              <UserRoundSearch className="ml-2 h-4 w-4" />
              List Psikolog
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              session.user.role === UserRole.ADMIN ? (
                <Link href="/admin">
                  <Button variant="outline" className="w-full text-primary border-primary rounded-lg">
                    Admin
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full text-primary border-primary rounded-lg">
                    Dashboard
                  </Button>
                </Link>
              )
            ) : (
              <div>
                <Link href="/sign-in">
                  <Button variant="outline" className="w-full text-primary border-primary rounded-lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}

            <Link href="/bookings">
              <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                Booking <CalendarHeart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="lg:hidden">
            <button type="button" className="text-gray-600 hover:text-primary p-2" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="lg:hidden absolute w-full z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              <Link href="#" className="block px-3 py-2 text-gray-600 hover:text-primary font-medium">Artikel</Link>
              <Link href="/test-psychology" className="block px-3 py-2 text-gray-600 hover:text-primary font-medium">Tes Psikologi</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-primary font-medium">Tentang Kami</Link>
              <Link href="/bookings" className="block px-3 py-2 text-gray-600 hover:text-primary font-medium">List Psikolog</Link>

              <div className="pt-4 pb-3 border-t border-gray-200">
                {session ? (
                  session?.user?.role === UserRole.ADMIN ? (
                    <Link href="/admin">
                      <Button variant="outline" className="w-full mb-2 text-primary border-primary rounded-lg">Admin</Button>
                    </Link>
                  ) : (
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full mb-2 text-primary border-primary rounded-lg">Dashboard</Button>
                    </Link>
                  )
                ) : (
                  <Link href="/sign-in">
                    <Button variant="outline" className="w-full mb-2 text-primary border-primary rounded-lg">Sign In</Button>
                  </Link>
                )}
                <Link href="/bookings">
                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-lg">Booking</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )
        }
      </AnimatePresence >
    </header >
  )
}