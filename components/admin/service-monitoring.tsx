"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Activity, AlertTriangle, CheckCircle, RefreshCw, Play, Square, Settings } from "lucide-react"
import { useSystemHealth } from "@/hooks/use-system-health"

export function ServiceMonitoring() {
  const { systemHealth, metrics, refreshHealth } = useSystemHealth()
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const serviceDetails = {
    "API Gateway": {
      port: 8080,
      version: "v1.2.3",
      instances: 3,
      database: "",
      loadBalancer: "Round Robin",
      endpoints: ["/health", "/auth/*", "/api/v1/*"],
      dependencies: ["Auth Service", "User Service", "Map Service", "AI Service", "Report Service"],
    },
    "Auth Service": {
      port: 8001,
      version: "v2.1.0",
      instances: 2,
      database: "PostgreSQL",
      endpoints: ["/auth/login", "/auth/register", "/auth/verify"],
      dependencies: ["PostgreSQL Database"],
    },
    "User Service": {
      port: 8002,
      version: "v1.8.5",
      instances: 2,
      database: "MongoDB",
      endpoints: ["/api/v1/users/*"],
      dependencies: ["MongoDB Database", "Auth Service"],
    },
    "Map Service": {
      port: 8003,
      version: "v1.5.2",
      instances: 3,
      database: "MongoDB",
      endpoints: ["/api/v1/maps/*"],
      dependencies: ["MongoDB Database", "Auth Service"],
    },
    "AI Service": {
      port: 8004,
      version: "v0.9.1",
      instances: 1,
      database: "MongoDB",
      endpoints: ["/api/v1/ai/*"],
      dependencies: ["MongoDB Database", "Auth Service"],
    },
    "Report Service": {
      port: 8005,
      version: "v1.3.7",
      instances: 2,
      database: "MongoDB",
      endpoints: ["/api/v1/reports/*"],
      dependencies: ["MongoDB Database", "Auth Service"],
    },
  }

  const handleServiceAction = (serviceName: string, action: string) => {
    console.log(`${action} ${serviceName}`)
    // In a real app, this would call the service management API
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-600"
      case "degraded":
        return "bg-yellow-600"
      case "down":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4" />
      case "down":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Service Monitoring</h2>
          <p className="text-slate-400">Monitor and manage microservices infrastructure</p>
        </div>
        <Button onClick={refreshHealth} className="bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Service Details</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="scaling">Scaling</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Total Services</CardTitle>
                <Server className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{systemHealth.length}</div>
                <p className="text-xs text-slate-400 mt-1">Microservices running</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Healthy Services</CardTitle>
                <CheckCircle className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {systemHealth.filter((s) => s.status === "healthy").length}
                </div>
                <p className="text-xs text-green-400 mt-1">Operating normally</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Avg Response Time</CardTitle>
                <Activity className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {Math.round(systemHealth.reduce((acc, s) => acc + s.responseTime, 0) / systemHealth.length)}ms
                </div>
                <p className="text-xs text-slate-400 mt-1">Across all services</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(systemHealth.reduce((acc, s) => acc + s.errorRate, 0) / systemHealth.length).toFixed(2)}%
                </div>
                <p className="text-xs text-slate-400 mt-1">24-hour average</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Service Status Overview</CardTitle>
              <CardDescription className="text-slate-400">Real-time status of all microservices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(service.status)}
                        <div>
                          <h4 className="text-sm font-medium text-white">{service.name}</h4>
                          <p className="text-xs text-slate-400">Port {service.port}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-slate-300">
                        <div>
                          <p className="text-xs text-slate-400">Uptime</p>
                          <p>{service.uptime}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Response</p>
                          <p>{service.responseTime}ms</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Errors</p>
                          <p>{service.errorRate}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(service.status)}>{service.status.toUpperCase()}</Badge>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedService(service.name)}
                          className="border-slate-600 text-slate-300"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleServiceAction(service.name, "restart")}
                          className="border-slate-600 text-slate-300"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Services</CardTitle>
                <CardDescription className="text-slate-400">Select a service to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {systemHealth.map((service, index) => (
                    <Button
                      key={index}
                      variant={selectedService === service.name ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedService(service.name)}
                    >
                      {getStatusIcon(service.status)}
                      <span className="ml-2">{service.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              {selectedService && serviceDetails[selectedService as keyof typeof serviceDetails] ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{selectedService} Details</CardTitle>
                    <CardDescription className="text-slate-400">Service configuration and status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-400">Port</label>
                        <p className="text-white">
                          {serviceDetails[selectedService as keyof typeof serviceDetails].port}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">Version</label>
                        <p className="text-white">
                          {serviceDetails[selectedService as keyof typeof serviceDetails].version}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">Instances</label>
                        <p className="text-white">
                          {serviceDetails[selectedService as keyof typeof serviceDetails].instances}
                        </p>
                      </div>
                      {serviceDetails[selectedService as keyof typeof serviceDetails].database && (
                        <div>
                          <label className="text-sm text-slate-400">Database</label>
                          <p className="text-white">
                            {serviceDetails[selectedService as keyof typeof serviceDetails].database}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-slate-400">Endpoints</label>
                      <div className="mt-2 space-y-1">
                        {serviceDetails[selectedService as keyof typeof serviceDetails].endpoints.map(
                          (endpoint, index) => (
                            <Badge key={index} variant="outline" className="mr-2 border-slate-600 text-slate-300">
                              {endpoint}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-slate-400">Dependencies</label>
                      <div className="mt-2 space-y-1">
                        {serviceDetails[selectedService as keyof typeof serviceDetails].dependencies.map(
                          (dep, index) => (
                            <Badge key={index} variant="outline" className="mr-2 border-slate-600 text-slate-300">
                              {dep}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button
                        onClick={() => handleServiceAction(selectedService, "restart")}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                      <Button onClick={() => handleServiceAction(selectedService, "stop")} variant="destructive">
                        <Square className="h-4 w-4 mr-2" />
                        Stop
                      </Button>
                      <Button
                        onClick={() => handleServiceAction(selectedService, "start")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="flex items-center justify-center h-64">
                    <p className="text-slate-400">Select a service to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Service Logs</CardTitle>
              <CardDescription className="text-slate-400">Real-time logs from all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
                <div className="space-y-1">
                  <div className="text-green-400">
                    [2024-01-20 16:45:23] [AUTH] INFO: User authentication successful for admin_001
                  </div>
                  <div className="text-blue-400">
                    [2024-01-20 16:45:22] [API-GW] INFO: Request routed to user-service
                  </div>
                  <div className="text-yellow-400">
                    [2024-01-20 16:45:21] [MAP] WARN: High memory usage detected (85%)
                  </div>
                  <div className="text-green-400">
                    [2024-01-20 16:45:20] [USER] INFO: User profile updated successfully
                  </div>
                  <div className="text-blue-400">[2024-01-20 16:45:19] [REPORT] INFO: Report generation completed</div>
                  <div className="text-red-400">[2024-01-20 16:45:18] [AI] ERROR: Model inference timeout</div>
                  <div className="text-green-400">[2024-01-20 16:45:17] [AUTH] INFO: JWT token validated</div>
                  <div className="text-blue-400">[2024-01-20 16:45:16] [API-GW] INFO: Health check completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scaling" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Auto Scaling Configuration</CardTitle>
              <CardDescription className="text-slate-400">Configure automatic scaling policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {systemHealth.map((service, index) => (
                  <div key={index} className="p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-white">{service.name}</h4>
                      <Badge className={getStatusColor(service.status)}>{service.status.toUpperCase()}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-slate-400">Min Instances</label>
                        <input
                          type="number"
                          defaultValue="1"
                          className="w-full mt-1 p-2 bg-slate-600 border border-slate-500 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">Max Instances</label>
                        <input
                          type="number"
                          defaultValue="5"
                          className="w-full mt-1 p-2 bg-slate-600 border border-slate-500 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-400">CPU Threshold (%)</label>
                        <input
                          type="number"
                          defaultValue="80"
                          className="w-full mt-1 p-2 bg-slate-600 border border-slate-500 rounded text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <label className="text-sm text-slate-200">Enable Auto Scaling</label>
                        <p className="text-xs text-slate-400">Automatically scale based on load</p>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
