"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to dashboard
    router.push("/notes")
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F2BED1]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FDCEDF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md mx-auto">
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#F2BED1] hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#F2BED1]/20 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-[#F2BED1]" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
              <CardDescription className="text-slate-300 mt-2">
                Sign in to access your private notes and legacy messages
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-600 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-slate-700/50 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-slate-600 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-slate-700/50 text-white placeholder:text-slate-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#F2BED1] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F2BED1] hover:bg-[#FDCEDF] text-slate-900 font-medium py-3 transition-all duration-200 hover:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center">
                <Link href="/forgot-password" className="text-[#F2BED1] hover:text-white text-sm transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-700 text-center">
              <p className="text-slate-300 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#F2BED1] hover:text-white font-medium transition-colors">
                  Create one here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">Your data is protected with multi-factor authentication</p>
        </div>
      </div>
    </div>
  )
}
