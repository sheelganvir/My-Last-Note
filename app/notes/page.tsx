"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Menu, X } from "lucide-react"

export default function NotesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header>
        <nav className="fixed inset-x-0 z-20 w-full border-b border-slate-700/30 bg-slate-900/80 backdrop-blur">
          <div className="mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0">
            <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 lg:py-4 mx-0">
              {/* Logo */}
              <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center mx-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <b className="text-lg text-white mx-2">My Last Note</b>
                </Link>

                {/* Mobile hamburger */}
                <button onClick={toggleMobileMenu} className="relative -mr-6 p-6 lg:hidden" aria-label="hamburger">
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-white" />
                  ) : (
                    <>
                      <div className="m-auto h-0.5 w-5 rounded bg-white transition duration-300"></div>
                      <div className="m-auto mt-2 h-0.5 w-5 rounded bg-white transition duration-300"></div>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile overlay */}
              <div
                className={`fixed inset-0 z-10 h-screen w-screen origin-bottom bg-slate-900/70 backdrop-blur-2xl transition duration-500 lg:hidden ${
                  isMobileMenuOpen ? "scale-y-100" : "scale-y-0"
                }`}
                onClick={toggleMobileMenu}
              />

              {/* Navigation */}
              <div
                className={`absolute top-full left-0 z-20 w-full origin-top-right flex-col flex-wrap justify-end gap-6 rounded-3xl border border-slate-700 bg-slate-800 p-8 shadow-2xl transition-all duration-300 lg:visible lg:relative lg:flex lg:w-auto lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${
                  isMobileMenuOpen
                    ? "visible translate-y-1 scale-100 opacity-100"
                    : "invisible translate-y-1 scale-90 opacity-0"
                }`}
              >
                <div className="text-slate-300 lg:pr-4">
                  <ul className="space-y-6 text-base font-medium tracking-wide lg:flex lg:space-y-0 lg:text-sm">
                    <li>
                      <span className="block text-white font-medium md:px-4">Notes</span>
                    </li>
                    <li>
                      <Link
                        href="/account"
                        className="block transition hover:text-teal-400 md:px-4 cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Your Account</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="block transition hover:text-teal-400 md:px-4 cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Settings</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="mt-12 -ml-1 flex w-full flex-col space-y-2 sm:flex-row md:w-max lg:mt-0 lg:mr-6 lg:space-y-0 lg:space-x-2">
                  <Link href="/signin">
                    <Button
                      className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-6 py-2 rounded-md cursor-pointer w-full sm:w-auto"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Out
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Add top padding to account for fixed header */}
      <div className="pt-32">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-medium text-white">Your notes</h1>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md cursor-pointer">
                📄 New Note
              </Button>
            </div>

            {/* Empty State Card */}
            <Card className="bg-slate-800/50 border-slate-700 min-h-[300px]">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="mb-6">
                  <Menu className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-300 text-lg">You do not have any notes yet.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
