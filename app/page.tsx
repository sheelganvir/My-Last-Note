import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Lock, Calendar, Users, Shield, Clock, Camera } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9F5F6]">
      {/* Header */}
      <header className="border-b border-[#F2BED1]/20 bg-[#F8E8EE]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-[#F2BED1]" />
            <h1 className="text-2xl font-bold text-gray-800">My Last Note</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-[#F2BED1] transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-[#F2BED1] transition-colors">
              How It Works
            </Link>
            <Link href="#security" className="text-gray-600 hover:text-[#F2BED1] transition-colors">
              Security
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-white border-[#F2BED1] text-[#F2BED1] hover:bg-[#F2BED1] hover:text-white"
            >
              Sign In
            </Button>
            <Button className="bg-[#FDCEDF] hover:bg-[#F2BED1] text-gray-800">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-[#FDCEDF] text-gray-700 hover:bg-[#F2BED1]">Secure Digital Legacy Platform</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Your Words,
            <span className="text-[#F2BED1]"> Forever</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Write personal notes that stay private during your lifetime, then become a meaningful legacy for your loved
            ones. A secure digital diary and message vault for what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#FDCEDF] hover:bg-[#F2BED1] text-gray-800 px-8 py-3">
              <Camera className="mr-2 h-5 w-5" />
              Start with Face ID
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white border-[#F2BED1] text-[#F2BED1] hover:bg-[#F2BED1] hover:text-white px-8 py-3"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-[#F8E8EE]/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Thoughtfully Designed Features</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature is crafted with care, security, and emotional sensitivity in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-[#F2BED1]/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="h-12 w-12 text-[#F2BED1] mb-4" />
                <CardTitle className="text-gray-800">Face Authentication</CardTitle>
                <CardDescription>
                  Secure login with facial recognition, backed by 2FA for ultimate protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-[#F2BED1]/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="h-12 w-12 text-[#F2BED1] mb-4" />
                <CardTitle className="text-gray-800">Private by Default</CardTitle>
                <CardDescription>
                  All notes start private with end-to-end encryption. You control when they become visible.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-[#F2BED1]/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-[#F2BED1] mb-4" />
                <CardTitle className="text-gray-800">Smart Scheduling</CardTitle>
                <CardDescription>
                  Schedule notes for future dates, post-mortem release, or time capsule unlocking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-[#F2BED1]/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-[#F2BED1] mb-4" />
                <CardTitle className="text-gray-800">Recipient System</CardTitle>
                <CardDescription>
                  Assign specific notes to family members who get notified when messages are released.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-[#F2BED1]/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-[#F2BED1] mb-4" />
                <CardTitle className="text-gray-800">Death Verification</CardTitle>
                <CardDescription>
                  Trusted person uploads death certificate for secure, verified note release process.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-[#F2BED1]/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-[#F2BED1] mb-4" />
                <CardTitle className="text-gray-800">Time Capsules</CardTitle>
                <CardDescription>
                  Lock notes for years into the future, creating meaningful time capsules for yourself or others.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple, secure process designed with your privacy and legacy in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDCEDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-800">1</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Secure Login</h4>
              <p className="text-gray-600">Log in with face authentication and write your personal notes.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDCEDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-800">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Set Recipients</h4>
              <p className="text-gray-600">Choose who receives each note and when they should be delivered.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDCEDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-800">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Verification</h4>
              <p className="text-gray-600">Trusted person uploads death certificate for secure verification.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FDCEDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-800">4</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Legacy Delivered</h4>
              <p className="text-gray-600">Notes are automatically released to recipients based on your wishes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-4 bg-[#F8E8EE]/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 text-[#F2BED1] mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-gray-800 mb-6">Bank-Level Security</h3>
            <p className="text-xl text-gray-600 mb-8">
              Your most personal thoughts deserve the highest level of protection. We use AES-256 encryption, secure
              face authentication, and zero-knowledge architecture to keep your notes completely private.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border border-[#F2BED1]/20">
                <h4 className="font-semibold text-gray-800 mb-2">End-to-End Encryption</h4>
                <p className="text-gray-600 text-sm">All notes encrypted with AES-256 before storage</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#F2BED1]/20">
                <h4 className="font-semibold text-gray-800 mb-2">Zero-Knowledge</h4>
                <p className="text-gray-600 text-sm">We cannot read your notes, even if we wanted to</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#F2BED1]/20">
                <h4 className="font-semibold text-gray-800 mb-2">Biometric Security</h4>
                <p className="text-gray-600 text-sm">Face ID with 2FA backup for secure access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">Start Your Digital Legacy Today</h3>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands who trust My Last Note to preserve their most meaningful messages for the people they love.
          </p>
          <Button size="lg" className="bg-[#FDCEDF] hover:bg-[#F2BED1] text-gray-800 px-12 py-4 text-lg">
            <Heart className="mr-2 h-5 w-5" />
            Create Your First Note
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8E8EE] py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-[#F2BED1]" />
              <span className="text-lg font-semibold text-gray-800">My Last Note</span>
            </div>
            <div className="flex gap-6 text-gray-600">
              <Link href="#" className="hover:text-[#F2BED1] transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-[#F2BED1] transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-[#F2BED1] transition-colors">
                Support
              </Link>
              <Link href="#" className="hover:text-[#F2BED1] transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-[#F2BED1]/20 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2025 My Last Note by Sheel</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
