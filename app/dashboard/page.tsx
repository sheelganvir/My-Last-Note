"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Plus, Calendar, Users, Lock, Settings, LogOut } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F9F5F6]">
      {/* Header */}
      <header className="border-b border-[#F2BED1]/20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-[#F2BED1]" />
            <h1 className="text-2xl font-bold text-gray-800">My Last Note</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-white border-[#F2BED1] text-[#F2BED1] hover:bg-[#F2BED1] hover:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="bg-white border-gray-300 text-gray-600 hover:bg-gray-100">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Your secure digital legacy awaits.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-[#F2BED1]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                  <p className="text-sm text-gray-600">Total Notes</p>
                </div>
                <Heart className="h-8 w-8 text-[#F2BED1]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#F2BED1]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                  <p className="text-sm text-gray-600">Scheduled</p>
                </div>
                <Calendar className="h-8 w-8 text-[#F2BED1]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#F2BED1]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                  <p className="text-sm text-gray-600">Recipients</p>
                </div>
                <Users className="h-8 w-8 text-[#F2BED1]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#F2BED1]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                  <p className="text-sm text-gray-600">Private</p>
                </div>
                <Lock className="h-8 w-8 text-[#F2BED1]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Note Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-[#F2BED1]/20 h-full">
              <CardHeader>
                <CardTitle className="text-gray-800">Create Your First Note</CardTitle>
                <CardDescription>Start your digital legacy with a meaningful message</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-24 h-24 bg-[#FDCEDF] rounded-full flex items-center justify-center mb-6">
                  <Plus className="h-12 w-12 text-[#F2BED1]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No notes yet</h3>
                <p className="text-gray-600 text-center mb-6 max-w-md">
                  Create your first note to begin building your digital legacy. Your thoughts and memories, preserved
                  forever.
                </p>
                <Button className="bg-[#FDCEDF] hover:bg-[#F2BED1] text-gray-800 px-8">
                  <Plus className="mr-2 h-5 w-5" />
                  Create First Note
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white border-[#F2BED1]/20">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white border-[#F2BED1]/30 text-gray-700 hover:bg-[#F8E8EE]"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Note
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white border-[#F2BED1]/30 text-gray-700 hover:bg-[#F8E8EE]"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Add Recipients
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white border-[#F2BED1]/30 text-gray-700 hover:bg-[#F8E8EE]"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Time Capsule
                </Button>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="bg-white border-[#F2BED1]/20">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Face ID</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Encryption</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">AES-256</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">2FA Backup</span>
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Setup</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
