// "use client"

// import type React from "react"

// import { createContext, useContext, useEffect, useState } from "react"
// import { useRouter, usePathname } from "next/navigation"
// import { authService } from "@/lib/services/auth.service"

// interface User {
//   id: string
//   username: string
//   role: string
//   clearance: string
//   full_name?: string
// }

// interface AuthContextType {
//   user: User | null
//   isLoading: boolean
//   login: (credentials: any) => Promise<void>
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()
//   const pathname = usePathname()

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const token = localStorage.getItem("intelligence_token")
//         const userData = localStorage.getItem("intelligence_user")

//         if (token && userData) {
//           const parsedUser = JSON.parse(userData)
//           setUser(parsedUser)

//           // Set cookies for middleware
//           document.cookie = `intelligence_token=${token}; path=/; max-age=86400`
//           document.cookie = `intelligence_user=${userData}; path=/; max-age=86400`
//         }
//       } catch (error) {
//         console.error("Auth initialization error:", error)
//         localStorage.removeItem("intelligence_token")
//         localStorage.removeItem("intelligence_user")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     initAuth()
//   }, [])

//   const login = async (credentials: any) => {
//     try {
//       const response = await authService.login(credentials)
      

//       localStorage.setItem("intelligence_token", response.access_token)
//       document.cookie = `intelligence_token=${response.access_token}; path=/; max-age=86400`

//       const getCurrentUser = await authService.getCurrentUser()
//       const userData = {
//         id: getCurrentUser.user.id,
//         username: getCurrentUser.user.username,
//         role: getCurrentUser.user.role,
//         clearance: getCurrentUser.user.clearance || "secret",
//         full_name: getCurrentUser.user.full_name,
//       }


//       localStorage.setItem("intelligence_token", response.access_token)
//       localStorage.setItem("intelligence_user", JSON.stringify(userData))
      
//       // Set cookies for middleware
//       document.cookie = `intelligence_token=${response.access_token}; path=/; max-age=86400`
//       document.cookie = `intelligence_user=${JSON.stringify(userData)}; path=/; max-age=86400`

//       // setUser(userData)

//       // Redirect to appropriate dashboard
//       const defaultRoute = getDefaultRoute(userData)
//       router.push(defaultRoute)
//     } catch (error) {
//       throw error
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem("intelligence_token")
//     localStorage.removeItem("intelligence_user")

//     // Clear cookies
//     document.cookie = "intelligence_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
//     document.cookie = "intelligence_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

//     setUser(null)
//     router.push("/")
//   } 

//   const getDefaultRoute = (user: User): string => {
//     switch (user.role) {
//       case "admin":
//         return "/admin"
//       case "commander":
//         return "/monitoring"
//       case "analyst":
//         return "/intelligence/geospatial"
//       case "field_agent":
//         return "/reports"
//       default:
//         return "/dashboard"
//     }
//   }

//   return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }


"use client"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService } from "@/lib/services/auth.service"

interface User {
  id: string
  username: string
  role: string
  clearance: string
  full_name?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (credentials: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("intelligence_token")
        const userData = localStorage.getItem("intelligence_user")


        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          
          // Set cookies for middleware
          document.cookie = `intelligence_token=${token}; path=/; max-age=86400; secure; samesite=strict`
          document.cookie = `intelligence_user=${encodeURIComponent(userData)}; path=/; max-age=86400; secure; samesite=strict`
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        localStorage.removeItem("intelligence_token")
        localStorage.removeItem("intelligence_user")
        // Clear potentially corrupted cookies
        document.cookie = "intelligence_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        document.cookie = "intelligence_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: any) => {
    try {
      setIsLoading(true)
      
      const response = await authService.login(credentials)

      localStorage.setItem("intelligence_token", response.access_token)
      document.cookie = `intelligence_token=${response.access_token}; path=/; max-age=86400; secure; samesite=strict`

      const getCurrentUser = await authService.getCurrentUser()
      
      const userData = {
        id: getCurrentUser.user.id,
        username: getCurrentUser.user.username,
        role: getCurrentUser.user.role,
        clearance: getCurrentUser.user.clearance || "secret",
        full_name: getCurrentUser.user.full_name,
      }

      // Store in localStorage
      localStorage.setItem("intelligence_token", response.access_token)
      localStorage.setItem("intelligence_user", JSON.stringify(userData))
      
      // Set cookies for middleware with proper encoding
      document.cookie = `intelligence_token=${response.access_token}; path=/; max-age=86400; secure; samesite=strict`
      document.cookie = `intelligence_user=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400; secure; samesite=strict`
      
      // Update state
      setUser(userData)
      
      // Redirect to appropriate dashboard
      const defaultRoute = getDefaultRoute(userData)
      router.push(defaultRoute)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("intelligence_token")
    localStorage.removeItem("intelligence_user")
    
    // Clear cookies
    document.cookie = "intelligence_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "intelligence_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    
    // Update state
    setUser(null)
    
    // Redirect to login/home
    router.push("/")
  }

  const getDefaultRoute = (user: User): string => {
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

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}