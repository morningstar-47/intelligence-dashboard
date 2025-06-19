"use client"

import { useState, useEffect } from "react"
import { realTimeService } from "@/lib/services/realtime.service"

interface DashboardMetrics {
  totalUsers: number
  activeMissions: number
  pendingReports: number
  systemHealthPercentage: number
}

interface Activity {
  message: string
  timestamp: string
  type: "success" | "warning" | "info"
}

interface ServiceHealth {
  name: string
  status: "healthy" | "degraded" | "down"
  uptime: number
}

export function useDashboardData() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalUsers: 0,
    activeMissions: 0,
    pendingReports: 0,
    systemHealthPercentage: 0,
  })

  const [activityFeed, setActivityFeed] = useState<Activity[]>([])
  const [systemHealth, setSystemHealth] = useState<ServiceHealth[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = realTimeService.subscribe("dashboard", (data) => {
      if (data.error) {
        setError(data.message)
        setIsLoading(false)
        return
      }

      try {
        // Update metrics
        setMetrics({
          totalUsers: data.totalUsers || 0,
          activeMissions: data.activeMissions || 0,
          pendingReports: data.pendingReports || 0,
          systemHealthPercentage: calculateSystemHealth(data.systemHealth),
        })

        // Convert health data to expected format
        const healthArray = Object.entries(data.systemHealth || {}).map(([key, value]: [string, any]) => ({
          name: value.service || key.replace("_service", "").replace("_", " ").toUpperCase(),
          status: value.status === "healthy" ? "healthy" : value.status === "degraded" ? "degraded" : "down",
          uptime: value.status === "healthy" ? 99.9 : value.status === "degraded" ? 95.0 : 0,
        }))

        setSystemHealth(healthArray)

        // Generate activity feed from recent data
        const activities: Activity[] = []

        if (data.users?.length > 0) {
          activities.push({
            message: `${data.users.length} active personnel in system`,
            timestamp: new Date().toLocaleString(),
            type: "info",
          })
        }

        if (data.maps?.length > 0) {
          const latestMap = data.maps[0]
          activities.push({
            message: `Map "${latestMap.name}" updated by ${latestMap.created_by}`,
            timestamp: new Date(latestMap.updated_at).toLocaleString(),
            type: "success",
          })
        }

        if (data.reports?.length > 0) {
          const latestReport = data.reports[0]
          activities.push({
            message: `Report "${latestReport.name}" created by ${latestReport.created_by}`,
            timestamp: new Date(latestReport.created_at).toLocaleString(),
            type: "info",
          })
        }

        // Add system health activities
        const unhealthyServices = healthArray.filter((service) => service.status !== "healthy")
        if (unhealthyServices.length > 0) {
          activities.push({
            message: `${unhealthyServices.length} service(s) require attention`,
            timestamp: new Date().toLocaleString(),
            type: "warning",
          })
        }

        setActivityFeed(activities.slice(0, 5)) // Keep only latest 5 activities
        setError(null)
        setIsLoading(false)
      } catch (err) {
        console.error("Error processing dashboard data:", err)
        setError("Failed to process dashboard data")
        setIsLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const calculateSystemHealth = (healthData: any): number => {
    if (!healthData) return 0

    const services = Object.values(healthData)
    const healthyServices = services.filter((service: any) => service.status === "healthy")

    return Math.round((healthyServices.length / services.length) * 100)
  }

  const refreshData = async () => {
    setIsLoading(true)
    await realTimeService.refresh("dashboard")
  }

  return {
    metrics,
    activityFeed,
    systemHealth,
    isLoading,
    error,
    refreshData,
  }
}
