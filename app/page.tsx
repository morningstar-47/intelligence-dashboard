"use client"
import { LoginForm } from "@/components/auth/login-form"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Initializing Intelligence System...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <DashboardLayout />
}
