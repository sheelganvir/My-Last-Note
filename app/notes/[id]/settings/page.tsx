"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { FileText, ArrowLeft, Clock, Shield, Trash2, AlertCircle } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import { useParams, useRouter } from "next/navigation"

export default function NoteSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const noteId = params.id as string

  const [settings, setSettings] = useState({
    deliveryTrigger: "automatic",
    priority: "medium",
    isActive: true,
    scheduledDelivery: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { user } = useUser()

  // Load note settings when component mounts
  useEffect(() => {
    const loadSettings = async () => {
      if (!noteId || !user) return

      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/notes/${noteId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.note) {
            setSettings({
              deliveryTrigger: data.note.deliveryTrigger || "automatic",
              priority: data.note.priority || "medium",
              isActive: data.note.status === "saved",
              scheduledDelivery: data.note.scheduledDelivery || "",
            })
          }
        } else {
          throw new Error("Failed to load note")
        }
      } catch (error) {
        console.error("Error loading settings:", error)
        setError("Failed to load settings")
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [noteId, user])

  const saveSettings = async () => {
    if (!user) {
      alert("Please sign in to save settings")
      return
    }

    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          settings: {
            deliveryTrigger: settings.deliveryTrigger,
            priority: settings.priority,
            status: settings.isActive ? "saved" : "draft",
            scheduledDelivery: settings.scheduledDelivery || null,
          },
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccessMessage("Settings saved successfully!")
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        throw new Error(result.error || "Failed to save settings")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      setError(error instanceof Error ? error.message : "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const deleteNote = async () => {
    if (!confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
      return
    }

    if (!user) {
      alert("Please sign in to delete notes")
      return
    }

    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        alert("Note deleted successfully!")
        router.push("/notes")
      } else {
        throw new Error(result.error || "Failed to delete note")
      }
    } catch (error) {
      console.error("Error deleting note:", error)
      setError(error instanceof Error ? error.message : "Failed to delete note")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading settings...</p>
        </div>
      </div>
    )
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
              </div>

              {/* Navigation */}
              <div className="flex items-center space-x-8">
                <Link
                  href="/notes"
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Notes</span>
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Tab Navigation */}
      <div className="pt-24 pb-6">
        <div className="container mx-auto px-6 sm:px-12 xl:max-w-6xl xl:px-0">
          <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 max-w-2xl">
            <Link href="/notes" className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
              All Notes
            </Link>
            <Link href={`/notes/${noteId}`} className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
              Overview
            </Link>
            <Link
              href={`/notes/${noteId}/note`}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Note
            </Link>
            <Link
              href={`/notes/${noteId}/recipients`}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Recipients
            </Link>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-md">Note Settings</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12 sm:px-12 xl:max-w-6xl xl:px-0">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-red-400">Error:</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-green-400">{successMessage}</p>
            </div>
          )}

          {/* Delivery Settings */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Delivery Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Delivery Trigger</label>
                <Select
                  value={settings.deliveryTrigger}
                  onValueChange={(value) => setSettings({ ...settings, deliveryTrigger: value })}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="automatic">Automatic (when you stop checking in)</SelectItem>
                    <SelectItem value="scheduled">Scheduled delivery</SelectItem>
                    <SelectItem value="manual">Manual delivery only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-400">Choose when this note should be delivered to recipients</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Priority Level</label>
                <Select
                  value={settings.priority}
                  onValueChange={(value) => setSettings({ ...settings, priority: value })}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-400">High priority notes are delivered first</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white">Active Status</label>
                  <p className="text-xs text-slate-400">Inactive notes will not be delivered</p>
                </div>
                <Switch
                  checked={settings.isActive}
                  onCheckedChange={(checked) => setSettings({ ...settings, isActive: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security & Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-white font-medium">Encryption Enabled</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Your note content is encrypted using AES-256 encryption and stored securely.
                </p>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-white font-medium">Access Logging</span>
                </div>
                <p className="text-slate-400 text-sm">All access to this note is logged for security purposes.</p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-red-900/20 border-red-800">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center space-x-2">
                <Trash2 className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium mb-1">Delete this note</p>
                  <p className="text-slate-400 text-sm">
                    Once deleted, this note and all its data will be permanently removed.
                  </p>
                </div>
                <Button
                  onClick={deleteNote}
                  disabled={isDeleting}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    <span>Delete Note</span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Section */}
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">Changes are saved when you click the save button.</p>
            <Button
              onClick={saveSettings}
              disabled={isSaving}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <span>Save Settings</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
