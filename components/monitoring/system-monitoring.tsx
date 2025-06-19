"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Server, Database, Wifi, AlertTriangle, CheckCircle } from "lucide-react"
import { useSystemHealth } from "@/hooks/use-system-health"

export function SystemMonitoring() {
  const { systemHealth, metrics } = useSystemHealth()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "down":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      healthy: "bg-green-600",
      degraded: "bg-yellow-600",
      down: "bg-red-600",
    }
    return colors[status as keyof typeof colors] || "bg-gray-600"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">System Monitoring</h2>
        <Badge className="bg-green-600">
          <Activity className="h-3 w-3 mr-1" />
          ALL SYSTEMS OPERATIONAL
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">CPU Usage</CardTitle>
            <Server className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.cpu}%</div>
            <Progress value={metrics.cpu} className="mt-2" />
            <p className="text-xs text-slate-400 mt-1">Average across all nodes</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Memory Usage</CardTitle>
            <Database className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.memory}%</div>
            <Progress value={metrics.memory} className="mt-2" />
            <p className="text-xs text-slate-400 mt-1">
              {metrics.memoryUsed}GB / {metrics.memoryTotal}GB
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Network I/O</CardTitle>
            <Wifi className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.network} MB/s</div>
            <Progress value={metrics.networkUsage} className="mt-2" />
            <p className="text-xs text-slate-400 mt-1">Throughput</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Active Connections</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.connections}</div>
            <p className="text-xs text-slate-400 mt-1">Real-time connections</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Microservices Status</CardTitle>
          <CardDescription className="text-slate-400">Real-time health monitoring of all services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemHealth.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <h4 className="text-sm font-medium text-white">{service.name}</h4>
                    <p className="text-xs text-slate-400">Port {service.port}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Uptime</p>
                    <p className="text-sm text-white">{service.uptime}%</p>
                  </div>
                  <Badge className={getStatusColor(service.status)}>{service.status.toUpperCase()}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Response Times</CardTitle>
            <CardDescription className="text-slate-400">Average API response times (ms)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-200">{service.name}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={Math.min(service.responseTime / 10, 100)} className="w-20 h-2" />
                    <span className="text-xs text-slate-400 w-12 text-right">{service.responseTime}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Error Rates</CardTitle>
            <CardDescription className="text-slate-400">24-hour error rate percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-200">{service.name}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={service.errorRate} className="w-20 h-2" />
                    <span
                      className={`text-xs w-12 text-right ${
                        service.errorRate < 1
                          ? "text-green-400"
                          : service.errorRate < 5
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {service.errorRate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
