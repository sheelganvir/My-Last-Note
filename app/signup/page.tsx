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
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false)
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
    if (!agreeToPrivacy) newErrors.privacy = "You must agree to the Privacy Policy"

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
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#F9F5F6] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FDCEDF]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F8E8EE]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F2BED1]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Back to home link */}
        <Link
          href="/get-started"
          className="inline-flex items-center gap-2 text-[#F2BED1] hover:text-gray-700 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <Card className="bg-white/80 backdrop-blur-sm border-[#F2BED1]/20 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#FDCEDF] rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-[#F2BED1]" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">Create Your Account</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Start your digital legacy journey with a secure account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`pl-10 border-[#F2BED1]/30 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-white/50 ${
                        errors.firstName ? "border-red-300 focus:border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`border-[#F2BED1]/30 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-white/50 ${
                      errors.lastName ? "border-red-300 focus:border-red-500" : ""
                    }`}
                  />
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 border-[#F2BED1]/30 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-white/50 ${
                      errors.email ? "border-red-300 focus:border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 border-[#F2BED1]/30 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-white/50 ${
                      errors.password ? "border-red-300 focus:border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F2BED1] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 border-[#F2BED1]/30 focus:border-[#F2BED1] focus:ring-[#F2BED1]/20 bg-white/50 ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F2BED1] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
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
                    className="mt-1 border-[#F2BED1] data-[state=checked]:bg-[#F2BED1] data-[state=checked]:border-[#F2BED1]"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#F2BED1] hover:text-gray-700 underline">
                        Terms of Service
                      </Link>
                    </Label>
                    {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={agreeToPrivacy}
                    onCheckedChange={(checked) => {
                      setAgreeToPrivacy(checked as boolean)
                      if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: "" }))
                    }}
                    className="mt-1 border-[#F2BED1] data-[state=checked]:bg-[#F2BED1] data-[state=checked]:border-[#F2BED1]"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/privacy" className="text-[#F2BED1] hover:text-gray-700 underline">
                        Privacy Policy
                      </Link>{" "}
                      and understand my data will be encrypted
                    </Label>
                    {errors.privacy && <p className="text-xs text-red-500">{errors.privacy}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FDCEDF] hover:bg-[#F2BED1] text-gray-800 font-medium py-3 transition-all duration-200 hover:shadow-lg disabled:opacity-50 mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 pt-6 border-t border-[#F2BED1]/20 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="text-[#F2BED1] hover:text-gray-700 font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#F2BED1]/20">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-[#F2BED1]" />
            <h3 className="font-medium text-gray-800">Your Security Matters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
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
