"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useSystemHealth } from "@/hooks/use-system-health"
import { ConnectionStatus } from "@/components/common/connection-status"

export function Header() {
  const { user } = useAuth()
  const { isOnline, alerts } = useSystemHealth()

  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">Intelligence Dashboard</h1>
        <ConnectionStatus />
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white">
          <Bell className="h-4 w-4" />
          {alerts > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-600 text-xs">
              {alerts}
            </Badge>
          )}
        </Button>

        <div className="text-right">
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-slate-400">
            {new Date().toLocaleString("en-US", {
              timeZone: "UTC",
              hour12: false,
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            UTC
          </p>
        </div>
      </div>
    </header>
  )
}
