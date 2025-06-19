"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, MapPin, FileText, Activity, CheckCircle, AlertTriangle } from "lucide-react"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Button } from "@/components/ui/button"

export function DashboardOverview() {
  const { metrics, activityFeed, systemHealth, isLoading, error, refreshData } = useDashboardData()

  const metricCards = [
    {
      title: "Active Personnel",
      value: metrics.totalUsers,
      icon: Users,
      description: "Currently online",
      trend: "+12% from last week",
    },
    {
      title: "Active Missions",
      value: metrics.activeMissions,
      icon: MapPin,
      description: "In progress",
      trend: "+3 new today",
    },
    {
      title: "Pending Reports",
      value: metrics.pendingReports,
      icon: FileText,
      description: "Awaiting review",
      trend: "-5 from yesterday",
    },
    {
      title: "System Health",
      value: `${metrics.systemHealthPercentage}%`,
      icon: Activity,
      description: "All systems operational",
      trend: "Stable",
    },
  ]

  return (
    <div className="p-6 space-y-6 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Mission Control Dashboard</h2>
        <Badge className="bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          OPERATIONAL
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="bg-slate-800 border-slate-700 relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <p className="text-xs text-slate-400 mt-1">{metric.description}</p>
                <p className="text-xs text-green-400 mt-1">{metric.trend}</p>
              </CardContent>
              {isLoading && (
                <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-slate-300 text-sm">Loading real-time data...</p>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
            <CardDescription className="text-slate-400">Microservices health monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      service.status === "healthy"
                        ? "bg-green-500"
                        : service.status === "degraded"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm text-slate-200">{service.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={service.uptime} className="w-16 h-2" />
                  <span className="text-xs text-slate-400">{service.uptime}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">Latest intelligence operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200">{activity.message}</p>
                    <p className="text-xs text-slate-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {error && (
        <Card className="bg-red-900/20 border-red-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-red-200">{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                className="ml-auto border-red-600 text-red-200 hover:bg-red-800"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
