"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, AlertTriangle } from "lucide-react"
import { apiService } from "@/lib/services/api"

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(true)
  const [lastCheck, setLastCheck] = useState<Date>(new Date())

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await apiService.checkHealth()
        setIsConnected(true)
      } catch (error) {
        setIsConnected(false)
      }
      setLastCheck(new Date())
    }

    // Initial check
    checkConnection()

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center space-x-1">
        {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
        <span>{isConnected ? "CONNECTED" : "DISCONNECTED"}</span>
      </Badge>

      {!isConnected && (
        <Badge variant="outline" className="flex items-center space-x-1 border-yellow-600 text-yellow-400">
          <AlertTriangle className="h-3 w-3" />
          <span>Backend Offline</span>
        </Badge>
      )}

      <span className="text-xs text-slate-400">Last check: {lastCheck.toLocaleTimeString()}</span>
    </div>
  )
}
