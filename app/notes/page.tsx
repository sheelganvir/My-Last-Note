"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, LogOut, FileText, Menu } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </div>
            <nav className="flex items-center gap-8">
              <span className="text-white font-medium">Notes</span>
              <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">Your Account</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white text-xs px-3 py-1 cursor-pointer"
            >
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </Button>
            <Link href="/signin">
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white text-xs px-3 py-1 cursor-pointer"
              >
                <LogOut className="h-3 w-3 mr-1" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </header>

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
  )
}
