"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, CheckCircle, XCircle, RefreshCw } from "lucide-react"

interface DatabaseInfo {
  success: boolean
  message?: string
  database?: {
    name: string
    collections: number
    dataSize: number
    storageSize: number
  }
  server?: {
    version: string
    uptime: number
    host: string
  }
  timestamp?: string
  error?: string
  details?: string
}

export default function DatabaseStatus() {
  const [dbInfo, setDbInfo] = useState<DatabaseInfo | null>(null)
  const [loading, setLoading] = useState(false)

  const testDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()
      setDbInfo(data)
    } catch (error) {
      setDbInfo({
        success: false,
        error: "Failed to fetch database status",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testDatabase()
  }, [])

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-slate-400" />
            <h3 className="text-lg font-medium text-white">Database Status</h3>
          </div>
          <Button
            onClick={testDatabase}
            disabled={loading}
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer bg-transparent"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Test Connection
          </Button>
        </div>

        {dbInfo && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {dbInfo.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={`font-medium ${dbInfo.success ? "text-green-400" : "text-red-400"}`}>
                {dbInfo.message || (dbInfo.success ? "Connected" : "Connection Failed")}
              </span>
            </div>

            {dbInfo.success && dbInfo.database && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Database</p>
                  <p className="text-white font-medium">{dbInfo.database.name}</p>
                </div>
                <div>
                  <p className="text-slate-400">Collections</p>
                  <p className="text-white font-medium">{dbInfo.database.collections}</p>
                </div>
                <div>
                  <p className="text-slate-400">Data Size</p>
                  <p className="text-white font-medium">{formatBytes(dbInfo.database.dataSize)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Storage Size</p>
                  <p className="text-white font-medium">{formatBytes(dbInfo.database.storageSize)}</p>
                </div>
              </div>
            )}

            {dbInfo.success && dbInfo.server && (
              <div className="border-t border-slate-700 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">MongoDB Version</p>
                    <p className="text-white font-medium">{dbInfo.server.version}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Server Uptime</p>
                    <p className="text-white font-medium">{formatUptime(dbInfo.server.uptime)}</p>
                  </div>
                </div>
              </div>
            )}

            {!dbInfo.success && (dbInfo.error || dbInfo.details) && (
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                <p className="text-red-400 text-sm">
                  {dbInfo.error}
                  {dbInfo.details && (
                    <>
                      <br />
                      <span className="text-red-300 text-xs">{dbInfo.details}</span>
                    </>
                  )}
                </p>
              </div>
            )}

            {dbInfo.timestamp && (
              <p className="text-xs text-slate-500">Last checked: {new Date(dbInfo.timestamp).toLocaleString()}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
