import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get token from cookies
  const token = request.cookies.get("intelligence_token")?.value
  const userCookie = request.cookies.get("intelligence_user")?.value

  let user = null 
  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch (e) {
      console.error("Error parsing user cookie:", e)
    }
  }

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // If no token and trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If has token but on login page, redirect to appropriate dashboard
  if (token && user && pathname === "/") {
    const defaultRoute = getDefaultRoute(user)
    return NextResponse.redirect(new URL(defaultRoute, request.url))
  }

  // Check route permissions
  if (token && user && !isPublicRoute) {
    if (!canAccessRoute(pathname, user)) {
      const defaultRoute = getDefaultRoute(user)
      return NextResponse.redirect(new URL(defaultRoute, request.url))
    }
  }

  return NextResponse.next()
}

function getDefaultRoute(user: any): string {
  if (!user) return "/"

  switch (user.role) {
    case "admin":
      return "/admin"
    case "commander":
      return "/monitoring"
    case "analyst":
      return "/intelligence/geospatial"
    case "field_agent":
      return "/reports"
    default:
      return "/dashboard"
  }
}

function canAccessRoute(path: string, user: any): boolean {
  if (!user) return false

  const routePermissions: Record<string, { roles?: string[]; clearance?: string[] }> = {
    "/dashboard": {
      roles: ["admin", "commander", "analyst", "field_agent"],
      clearance: ["confidential", "secret", "top_secret"],
    },
    "/intelligence/geospatial": {
      roles: ["admin", "commander", "analyst"],
      clearance: ["secret", "top_secret"],
    },
    "/reports": {
      roles: ["admin", "commander", "analyst"],
      clearance: ["confidential", "secret", "top_secret"],
    },
    "/users": {
      roles: ["admin", "commander"],
      clearance: ["secret", "top_secret"],
    },
    "/admin": {
      roles: ["admin"],
      clearance: ["top_secret"],
    },
    "/monitoring": {
      roles: ["admin", "commander"],
      clearance: ["secret", "top_secret"],
    },
  }

  const route = routePermissions[path]
  if (!route) return true // Allow access to undefined routes

  // Check role requirements
  if (route.roles && !route.roles.includes(user.role)) {
    return false
  }

  // Check clearance requirements
  if (route.clearance && !route.clearance.includes(user.clearance || "secret")) {
    return false
  }

  return true
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
