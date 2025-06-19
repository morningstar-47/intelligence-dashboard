"use client"

import { useAuth } from "@/hooks/use-auth"
import { Router } from "@/lib/router"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { Home, Map, FileText, Users, Activity, Shield } from "lucide-react"

const navigationItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: Home,
    requiredRoles: ["admin", "commander", "analyst", "field_agent"],
  },
  {
    path: "/intelligence/geospatial",
    label: "Geospatial Intel",
    icon: Map,
    requiredRoles: ["admin", "commander", "analyst"],
  },
  {
    path: "/reports",
    label: "Reports",
    icon: FileText,
    requiredRoles: ["admin", "commander", "analyst"],
  },
  {
    path: "/users",
    label: "Users",
    icon: Users,
    requiredRoles: ["admin", "commander"],
  },
  {
    path: "/monitoring",
    label: "Monitoring",
    icon: Activity,
    requiredRoles: ["admin", "commander"],
  },
  {
    path: "/admin",
    label: "Admin",
    icon: Shield,
    requiredRoles: ["admin"],
  },
]

export function SmartNavigation() {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  if (!user) return null

  const accessibleItems = navigationItems.filter((item) => Router.canAccessRoute(item.path, user))

  return (
    <nav className="space-y-2">
      {accessibleItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.path

        return (
          <Button
            key={item.path}
            variant={isActive ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              isActive
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-slate-300 hover:text-white hover:bg-slate-700"
            }`}
            onClick={() => router.push(item.path)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {item.label}
          </Button>
        )
      })}
    </nav>
  )
}
