import { userService } from "./user.service"
import { mapService } from "./map.service"
import { reportService } from "./report.service"
import { healthService } from "./health.service"
import { aiService } from "./ai.service"

type ChannelData = {
  users: any[]
  maps: any[]
  reports: any[]
  health: any
  ai: any[]
  alerts: any[]
}

class RealTimeService {
  private intervals: Map<string, NodeJS.Timeout> = new Map()
  private subscribers: Map<string, ((data: any) => void)[]> = new Map()
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private readonly CACHE_TTL = 30000 // 30 seconds

  subscribe(channel: string, callback: (data: any) => void): () => void {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, [])
      this.startPolling(channel)
    }

    this.subscribers.get(channel)!.push(callback)

    // Send cached data immediately if available
    const cached = this.cache.get(channel)
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      callback(cached.data)
    }

    return () => {
      const callbacks = this.subscribers.get(channel) || []
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }

      if (callbacks.length === 0) {
        this.stopPolling(channel)
      }
    }
  }

  private startPolling(channel: string): void {
    const pollInterval = this.getPollInterval(channel)

    // Initial fetch
    this.fetchAndNotify(channel)

    const interval = setInterval(() => {
      this.fetchAndNotify(channel)
    }, pollInterval)

    this.intervals.set(channel, interval)
  }

  private stopPolling(channel: string): void {
    const interval = this.intervals.get(channel)
    if (interval) {
      clearInterval(interval)
      this.intervals.delete(channel)
    }
    this.subscribers.delete(channel)
  }

  private async fetchAndNotify(channel: string): Promise<void> {
    try {
      const data = await this.fetchChannelData(channel)

      // Cache the data
      this.cache.set(channel, {
        data,
        timestamp: Date.now(),
      })

      this.notifySubscribers(channel, data)
    } catch (error) {
      console.error(`Error polling ${channel}:`, error)

      // Notify subscribers of error state
      this.notifySubscribers(channel, { error: true, message: "Failed to fetch data" })
    }
  }

  private async fetchChannelData(channel: string): Promise<any> {
    switch (channel) {
      case "users":
        return await userService.getUsers({ limit: 100 })

      case "maps":
        return await mapService.getMaps({ limit: 100 })

      case "reports":
        return await reportService.getReports({ limit: 100 })

      case "health":
        return await healthService.getHealth()

      case "ai":
        return await aiService.getAIResources({ limit: 100 })

      case "dashboard":
        // Fetch multiple data sources for dashboard
        const [users, maps, reports, health] = await Promise.all([
          userService.getUsers({ limit: 10 }),
          mapService.getMaps({ limit: 10 }),
          reportService.getReports({ limit: 10 }),
          healthService.getHealth(),
        ])

        return {
          totalUsers: users.length,
          activeMissions: maps.length,
          pendingReports: reports.length,
          systemHealth: health,
          users,
          maps,
          reports,
        }

      default:
        return null
    }
  }

  private notifySubscribers(channel: string, data: any): void {
    const callbacks = this.subscribers.get(channel) || []
    callbacks.forEach((callback) => {
      try {
        callback(data)
      } catch (error) {
        console.error(`Error in subscriber callback for ${channel}:`, error)
      }
    })
  }

  private getPollInterval(channel: string): number {
    // Different polling intervals based on data type
    const intervals = {
      health: 10000, // 10 seconds for health checks
      dashboard: 15000, // 15 seconds for dashboard
      users: 30000, // 30 seconds for users
      maps: 20000, // 20 seconds for maps
      reports: 25000, // 25 seconds for reports
      ai: 30000, // 30 seconds for AI resources
    }

    return intervals[channel as keyof typeof intervals] || 30000
  }

  // Method to force refresh a channel
  async refresh(channel: string): Promise<void> {
    await this.fetchAndNotify(channel)
  }

  // Method to clear cache
  clearCache(channel?: string): void {
    if (channel) {
      this.cache.delete(channel)
    } else {
      this.cache.clear()
    }
  }

  // Cleanup method
  destroy(): void {
    this.intervals.forEach((interval) => clearInterval(interval))
    this.intervals.clear()
    this.subscribers.clear()
    this.cache.clear()
  }
}

export const realTimeService = new RealTimeService()

// Cleanup on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    realTimeService.destroy()
  })
}
