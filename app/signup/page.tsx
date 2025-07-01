"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Eye, EyeOff, ArrowLeft, User, Mail, Lock, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!agreeToTerms) newErrors.terms = "You must agree to the Terms of Service"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to dashboard
    router.push("/notes")
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F2BED1]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FDCEDF]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F2BED1]/5 rounded-full blur-3xl"></div>
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
          <CardHeader className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#F2BED1]/20 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-[#F2BED1]" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Create Your Account</CardTitle>
              <CardDescription className="text-slate-300 mt-2">
                Start your digital legacy journey with a secure account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300 font-medium">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`pl-10 border-slate-600 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-slate-700/50 text-white placeholder:text-slate-400 ${
                        errors.firstName ? "border-red-400 focus:border-red-400" : ""
                      }`}
                    />
                  </div>
                  {errors.firstName && <p className="text-xs text-red-400">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300 font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`border-slate-600 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-slate-700/50 text-white placeholder:text-slate-400 ${
                      errors.lastName ? "border-red-400 focus:border-red-400" : ""
                    }`}
                  />
                  {errors.lastName && <p className="text-xs text-red-400">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 border-slate-600 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-slate-700/50 text-white placeholder:text-slate-400 ${
                      errors.email ? "border-red-400 focus:border-red-400" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 border-slate-600 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-slate-700/50 text-white placeholder:text-slate-400 ${
                      errors.password ? "border-red-400 focus:border-red-400" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#F2BED1] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 border-slate-600 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-slate-700/50 text-white placeholder:text-slate-400 ${
                      errors.confirmPassword ? "border-red-400 focus:border-red-400" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#F2BED1] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword}</p>}
              </div>

              {/* Terms and Privacy Checkboxes */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => {
                      setAgreeToTerms(checked as boolean)
                      if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }))
                    }}
                    className="mt-1 border-slate-600 data-[state=checked]:bg-[#F2BED1] data-[state=checked]:border-[#F2BED1]"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="terms" className="text-sm text-slate-300 leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#F2BED1] hover:text-white underline">
                        Terms of Service
                      </Link>
                    </Label>
                    {errors.terms && <p className="text-xs text-red-400">{errors.terms}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F2BED1] hover:bg-[#FDCEDF] text-slate-900 font-medium py-3 transition-all duration-200 hover:shadow-lg disabled:opacity-50 mt-4 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 pt-6 border-t border-slate-700 text-center">
              <p className="text-slate-300 text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="text-[#F2BED1] hover:text-white font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="mt-4 bg-slate-800/60 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-[#F2BED1]" />
            <h3 className="font-medium text-white">Your Security Matters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>AES-256 Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Multi-Factor Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Zero-Knowledge Storage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
