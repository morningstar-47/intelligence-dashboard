"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { GeospatialIntelligence } from "@/components/intelligence/geospatial-intelligence"
import { ReportsManagement } from "@/components/reports/reports-management"
import { UserManagement } from "@/components/users/user-management"
import { SystemMonitoring } from "@/components/monitoring/system-monitoring"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { useAuth } from "@/hooks/use-auth"

export function DashboardLayout() {
  const [activeView, setActiveView] = useState("dashboard")
  const { user } = useAuth()

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
          <div className="p-8 text-center text-slate-400">Access Denied</div>
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
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">{renderActiveView()}</main>
      </div>
    </div>
  )
}
