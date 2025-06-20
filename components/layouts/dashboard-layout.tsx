"use client"

import type React from "react"

import { Suspense, useState, useEffect } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { ConnectionStatus } from "@/components/common/connection-status"
import { SuspenseWrapper } from "@/components/common/suspense-wrapper"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { GeospatialIntelligence } from "@/components/intelligence/geospatial-intelligence"
import { ReportsManagement } from "@/components/reports/reports-management"
import { UserManagement } from "@/components/users/user-management"
import { SystemMonitoring } from "@/components/monitoring/system-monitoring"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { useAuth } from "@/hooks/use-auth"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeView, setActiveView] = useState("dashboard")
  const { user } = useAuth();

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />
      case "map":
        return <GeospatialIntelligence />
      case "reports":
        return <ReportsManagement />
      case "users":
        return user?.role === "admin" ? (
          <UserManagement />
        ) : (
          <div className="p-8 text-center text-slate-400">Accès refusé</div>
        )
      case "monitoring":
        return <SystemMonitoring />
      case "admin":
        return <AdminDashboard />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <SuspenseWrapper
        fallback={
          <div className="w-64 border-r bg-card">
            <div className="p-4 space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-10 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        }
      >
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
      </SuspenseWrapper>

      <div className="flex-1 flex flex-col overflow-hidden">
        <SuspenseWrapper
          fallback={
            <div className="h-16 border-b bg-card">
              <div className="flex items-center justify-between h-full px-6">
                <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                <div className="h-8 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
          }
        >
          <Header />
        </SuspenseWrapper>

        <main className="flex-1 overflow-auto p-6">
          <Suspense
            fallback={
              <div className="space-y-6">
                <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                <div className="h-96 bg-muted rounded animate-pulse" />
              </div>
            }
          >
            {renderActiveView()}
          </Suspense>
        </main>

        <SuspenseWrapper
          fallback={
            <div className="h-8 bg-muted/50">
              <div className="flex items-center justify-center h-full">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              </div>
            </div>
          }
        >
          <ConnectionStatus />
        </SuspenseWrapper>
      </div>
    </div>
  )
}
