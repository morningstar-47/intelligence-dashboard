"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export interface RouteConfig {
  path: string
  requiredRoles?: string[]
  requiredClearance?: string[]
  redirectTo?: string
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    redirectTo: "/dashboard",
  },
  {
    path: "/dashboard",
    requiredRoles: ["admin", "commander", "analyst", "field_agent"],
    requiredClearance: ["confidential", "secret", "top_secret"],
  },
  {
    path: "/intelligence/geospatial",
    requiredRoles: ["admin", "commander", "analyst"],
    requiredClearance: ["secret", "top_secret"],
  },
  {
    path: "/reports",
    requiredRoles: ["admin", "commander", "analyst"],
    requiredClearance: ["confidential", "secret", "top_secret"],
  },
  {
    path: "/users",
    requiredRoles: ["admin", "commander"],
    requiredClearance: ["secret", "top_secret"],
  },
  {
    path: "/admin",
    requiredRoles: ["admin"],
    requiredClearance: ["top_secret"],
  },
  {
    path: "/monitoring",
    requiredRoles: ["admin", "commander"],
    requiredClearance: ["secret", "top_secret"],
  },
]

export class Router {
  static getDefaultRoute(user: any): string {
    if (!user) return "/"

    // Route based on role and clearance
    if (user.role === "admin") {
      return "/admin"
    } else if (user.role === "commander") {
      return "/monitoring"
    } else if (user.role === "analyst") {
      return "/intelligence/geospatial"
    } else if (user.role === "field_agent") {
      return "/reports"
    }

    return "/dashboard"
  }

  static canAccessRoute(path: string, user: any): boolean {
    if (!user) return false

    const route = routes.find((r) => r.path === path)
    if (!route) return true // Allow access to undefined routes

    // Check role requirements
    if (route.requiredRoles && !route.requiredRoles.includes(user.role)) {
      return false
    }

    // Check clearance requirements
    if (route.requiredClearance && !route.requiredClearance.includes(user.clearance)) {
      return false
    }

    return true
  }

  static getAccessibleRoutes(user: any): RouteConfig[] {
    if (!user) return []

    return routes.filter((route) => this.canAccessRoute(route.path, user))
  }
}

export function useRouteGuard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const checkAccess = (path: string) => {
    if (isLoading) return true // Still loading, allow for now

    if (!user) {
      router.push("/")
      return false
    }

    if (!Router.canAccessRoute(path, user)) {
      const defaultRoute = Router.getDefaultRoute(user)
      router.push(defaultRoute)
      return false
    }

    return true
  }

  const navigateToDefault = () => {
    if (user) {
      const defaultRoute = Router.getDefaultRoute(user)
      router.push(defaultRoute)
    } else {
      router.push("/")
    }
  }

  return { checkAccess, navigateToDefault, canAccess: Router.canAccessRoute }
}
