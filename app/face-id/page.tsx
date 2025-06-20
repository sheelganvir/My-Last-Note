"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scan, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FaceIDPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const startFaceScan = () => {
    setIsScanning(true)
    setProgress(0)
  }

  useEffect(() => {
    if (isScanning && !scanComplete) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setScanComplete(true)
            setIsScanning(false)
            // Redirect after showing success
            setTimeout(() => {
              router.push("/dashboard")
            }, 1000)
            return 100
          }
          return prev + 2
        })
      }, 40) // 2s total duration

      return () => clearInterval(interval)
    }
  }, [isScanning, scanComplete, router])

  return (
    <div className="min-h-screen bg-[#F9F5F6] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FDCEDF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#F8E8EE]/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-[#F2BED1] hover:text-gray-700 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Sign In
        </Link>

        <Card className="bg-white/80 backdrop-blur-sm border-[#F2BED1]/20 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                {/* Face ID Icon with scanning animation */}
                <div
                  className={`w-24 h-24 bg-[#FDCEDF] rounded-full flex items-center justify-center transition-all duration-300 ${
                    isScanning ? "animate-pulse scale-110" : ""
                  } ${scanComplete ? "bg-green-100" : ""}`}
                >
                  {scanComplete ? (
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  ) : (
                    <Scan className={`h-12 w-12 text-[#F2BED1] ${isScanning ? "animate-spin" : ""}`} />
                  )}
                </div>

                {/* Scanning circle animation */}
                {isScanning && (
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F2BED1] animate-spin"></div>
                )}

                {/* Progress ring */}
                {isScanning && (
                  <svg className="absolute inset-0 w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#F2BED1"
                      strokeWidth="2"
                      strokeDasharray={`${progress * 2.83} 283`}
                      className="transition-all duration-100 ease-out"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {scanComplete ? "Authentication Successful!" : isScanning ? "Scanning Face..." : "Face ID Login"}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {scanComplete
                  ? "Redirecting to your dashboard..."
                  : isScanning
                    ? "Please look directly at your camera"
                    : "Use your face to securely access your notes"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isScanning && !scanComplete && (
              <>
                <div className="text-center space-y-4">
                  <div className="bg-[#F8E8EE] rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Position your face within the camera frame and click the button below to begin authentication.
                    </p>
                  </div>

                  <Button
                    onClick={startFaceScan}
                    className="w-full bg-[#FDCEDF] hover:bg-[#F2BED1] text-gray-800 font-medium py-3 transition-all duration-200 hover:shadow-lg"
                  >
                    <Scan className="mr-2 h-5 w-5" />
                    Start Face Scan
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-[#F2BED1]/20">
                  <p className="text-xs text-gray-500 mb-3">
                    Your face will only be used for verification and is never stored.
                  </p>

                  <Link href="/signin" className="text-[#F2BED1] hover:text-gray-700 text-sm transition-colors">
                    Use password instead
                  </Link>
                </div>
              </>
            )}

            {isScanning && (
              <div className="text-center space-y-4">
                <div className="bg-[#F8E8EE] rounded-lg p-4">
                  <p className="text-sm text-gray-600">Scanning in progress... {Math.round(progress)}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-[#F2BED1] h-2 rounded-full transition-all duration-100 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {scanComplete && (
              <div className="text-center space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700 font-medium">Face authentication successful! Welcome back.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">🔒 Secured with biometric encryption technology</p>
        </div>
      </div>
    </div>
  )
}
