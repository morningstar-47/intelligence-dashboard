"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Map, FileText, Users, Activity, Shield, LogOut, Settings } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { user, logout } = useAuth()

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "commander", "analyst", "field_agent"],
    },
    { id: "map", label: "Geospatial Intel", icon: Map, roles: ["admin", "commander", "analyst", "field_agent"] },
    { id: "reports", label: "Reports", icon: FileText, roles: ["admin", "commander", "analyst"] },
    { id: "users", label: "User Management", icon: Users, roles: ["admin"] },
    { id: "monitoring", label: "System Monitor", icon: Activity, roles: ["admin", "commander"] },
    { id: "admin", label: "Administration", icon: Settings, roles: ["admin"] },
  ]

  const getClearanceBadge = (clearance: string) => {
    const colors = {
      top_secret: "bg-red-600",
      secret: "bg-orange-600",
      confidential: "bg-yellow-600",
    }
    return colors[clearance as keyof typeof colors] || "bg-gray-600"
  }

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-500" />
          <div>
            <h2 className="text-lg font-bold text-white">Intel-Sys</h2>
            <p className="text-xs text-slate-400">v2.4.1</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-slate-700">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">{user?.username}</span>
            <Badge className={`text-xs ${getClearanceBadge(user?.clearance || "")}`}>
              {user?.clearance?.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 capitalize">{user?.role?.replace("_", " ")}</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const hasAccess = item.roles.includes(user?.role || "")

          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start text-left ${
                hasAccess
                  ? activeView === item.id
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                  : "text-slate-500 cursor-not-allowed"
              }`}
              onClick={() => hasAccess && onViewChange(item.id)}
              disabled={!hasAccess}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
