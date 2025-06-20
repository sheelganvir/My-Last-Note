"use client"

import { Button } from "@/components/ui/button"
import { Heart, ArrowRight, Shield, Lock, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GetStartedPage() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/signup")
  }

  return (
    <div className="min-h-screen bg-[#F8E8EE] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FDCEDF]/30 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#F2BED1]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#FDCEDF]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-[#F2BED1]/15 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-[#F2BED1]/20">
            <Heart className="h-12 w-12 text-[#F2BED1]" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Welcome to
            <span className="block text-[#F2BED1] mt-2">My Last Note</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl mx-auto">
            Create your private notes that will live beyond your lifetime.
          </p>

          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            A secure digital sanctuary for your most meaningful thoughts, memories, and messages to loved ones.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12 max-w-3xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#F2BED1]/20">
            <Shield className="h-8 w-8 text-[#F2BED1] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">End-to-end encrypted with face authentication</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#F2BED1]/20">
            <Lock className="h-8 w-8 text-[#F2BED1] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Time Capsules</h3>
            <p className="text-sm text-gray-600">Schedule notes for future delivery</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-[#F2BED1]/20">
            <Users className="h-8 w-8 text-[#F2BED1] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Legacy Messages</h3>
            <p className="text-sm text-gray-600">Share meaningful messages with loved ones</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-[#FDCEDF] hover:bg-[#F2BED1] text-gray-800 font-medium px-12 py-4 text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
          >
            Create Your First Note
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#F2BED1] hover:text-gray-700 font-medium transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-8 left-8">
          <Link href="/" className="text-[#F2BED1] hover:text-gray-700 transition-colors flex items-center gap-2 group">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">My Last Note</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
