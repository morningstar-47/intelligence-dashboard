"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useRouteGuard } from "@/lib/router"
import { useAuth } from "@/hooks/use-auth"
import { ErrorHandler } from "@/lib/error-handler"

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const { checkAccess } = useRouteGuard()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!user && pathname !== "/") {
      // Not logged in and not on login page
      window.location.href = "/"
      return
    }

    if (user && pathname === "/") {
      // Logged in but on login page, redirect to default route
      const defaultRoute = getDefaultRoute(user)
      window.location.href = defaultRoute
      return
    }

    if (user) {
      const hasAccess = checkAccess(pathname)
      if (!hasAccess) {
        ErrorHandler.warning("You don't have permission to access this page", "Access Denied")
        return
      }
    }

    setIsAuthorized(true)
  }, [pathname, user, isLoading, checkAccess])

  const getDefaultRoute = (user: any): string => {
    if (user.role === "admin") return "/admin"
    if (user.role === "commander") return "/monitoring"
    if (user.role === "analyst") return "/intelligence/geospatial"
    if (user.role === "field_agent") return "/reports"
    return "/dashboard"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-slate-400 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-slate-400 mt-2">Checking permissions...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
