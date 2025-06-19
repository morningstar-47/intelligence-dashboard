"use client"

import { useState, useEffect } from "react"
import { realTimeService } from "@/lib/services/realtime.service"

interface SystemMetrics {
  cpu: number
  memory: number
  memoryUsed: number
  memoryTotal: number
  network: number
  networkUsage: number
  connections: number
}

interface ServiceHealth {
  name: string
  port: number
  status: "healthy" | "degraded" | "down"
  uptime: number
  responseTime: number
  errorRate: number
}

export function useSystemHealth() {
  const [isOnline, setIsOnline] = useState(true)
  const [alerts, setAlerts] = useState(0)
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    memoryUsed: 0,
    memoryTotal: 0,
    network: 0,
    networkUsage: 0,
    connections: 0,
  })
  const [systemHealth, setSystemHealth] = useState<ServiceHealth[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = realTimeService.subscribe("health", (data) => {
      if (data.error) {
        setError(data.message)
        setIsOnline(false)
        setIsLoading(false)
        return
      }

      try {
        // Process health data from backend
        const services = Object.entries(data).map(([key, value]: [string, any]) => {
          const serviceName = value.service || key.replace("_service", "").replace("_", " ")
          const port = getServicePort(key)
          const status = value.status === "healthy" ? "healthy" : value.database === "connected" ? "degraded" : "down"

          return {
            name: serviceName.charAt(0).toUpperCase() + serviceName.slice(1),
            port,
            status,
            uptime: status === "healthy" ? 99.9 : status === "degraded" ? 95.0 : 0,
            responseTime: Math.floor(Math.random() * 100) + 20, // Simulated
            errorRate: status === "healthy" ? 0.1 : status === "degraded" ? 2.5 : 10.0,
          }
        })

        setSystemHealth(services)

        // Calculate alerts
        const unhealthyServices = services.filter((s) => s.status !== "healthy")
        setAlerts(unhealthyServices.length)

        // Set online status
        const allServicesDown = services.every((s) => s.status === "down")
        setIsOnline(!allServicesDown)

        // Simulate system metrics (these would come from actual monitoring in production)
        setMetrics({
          cpu: Math.floor(Math.random() * 30) + 15,
          memory: Math.floor(Math.random() * 40) + 50,
          memoryUsed: 13.4,
          memoryTotal: 20,
          network: Math.floor(Math.random() * 50) + 30,
          networkUsage: Math.floor(Math.random() * 50) + 25,
          connections: Math.floor(Math.random() * 500) + 1000,
        })

        setError(null)
        setIsLoading(false)
      } catch (err) {
        console.error("Error processing health data:", err)
        setError("Failed to process health data")
        setIsLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const getServicePort = (serviceName: string): number => {
    const portMap: { [key: string]: number } = {
      auth_service: 8001,
      user_service: 8002,
      map_service: 8003,
      ai_service: 8004,
      report_service: 8005,
    }
    return portMap[serviceName] || 8080
  }

  const refreshHealth = async () => {
    setIsLoading(true)
    await realTimeService.refresh("health")
  }

  return {
    isOnline,
    alerts,
    metrics,
    systemHealth,
    isLoading,
    error,
    refreshHealth,
  }
}
