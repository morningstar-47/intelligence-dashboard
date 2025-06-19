"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Users, Database, Shield, Activity, Server, AlertTriangle, CheckCircle } from "lucide-react"
import { SystemConfiguration } from "./system-configuration"
import { UserManagementAdmin } from "./user-management-admin"
import { SecuritySettings } from "./security-settings"
import { DatabaseManagement } from "./database-management"
import { ServiceMonitoring } from "./service-monitoring"
import { AuditLogs } from "./audit-logs"
import { useSystemHealth } from "@/hooks/use-system-health"
import { useAuth } from "@/hooks/use-auth"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { systemHealth, metrics, isOnline } = useSystemHealth()
  const { user } = useAuth()

  // Check if user has admin privileges
  if (user?.role !== "admin") {
    return (
      <div className="p-6 text-center">
        <div className="max-w-md mx-auto">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">Administrator privileges required to access this section.</p>
        </div>
      </div>
    )
  }

  const getSystemStatus = () => {
    const healthyServices = systemHealth.filter((s) => s.status === "healthy").length
    const totalServices = systemHealth.length
    const healthPercentage = totalServices > 0 ? (healthyServices / totalServices) * 100 : 0

    if (healthPercentage >= 90) return { status: "optimal", color: "bg-green-600", icon: CheckCircle }
    if (healthPercentage >= 70) return { status: "degraded", color: "bg-yellow-600", icon: AlertTriangle }
    return { status: "critical", color: "bg-red-600", icon: AlertTriangle }
  }

  const systemStatus = getSystemStatus()
  const StatusIcon = systemStatus.icon

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Administration</h1>
          <p className="text-slate-400 mt-1">Comprehensive system management and configuration</p>
        </div>
        <Badge className={`${systemStatus.color} flex items-center space-x-2`}>
          <StatusIcon className="h-4 w-4" />
          <span>SYSTEM {systemStatus.status.toUpperCase()}</span>
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Database</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center space-x-2">
            <Server className="h-4 w-4" />
            <span>Services</span>
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Config</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">System Uptime</CardTitle>
                <Activity className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">99.8%</div>
                <p className="text-xs text-green-400 mt-1">+0.2% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Active Services</CardTitle>
                <Server className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {systemHealth.filter((s) => s.status === "healthy").length}/{systemHealth.length}
                </div>
                <p className="text-xs text-slate-400 mt-1">Microservices online</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">CPU Usage</CardTitle>
                <Activity className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.cpu}%</div>
                <p className="text-xs text-slate-400 mt-1">Across all nodes</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Memory Usage</CardTitle>
                <Database className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metrics.memory}%</div>
                <p className="text-xs text-slate-400 mt-1">
                  {metrics.memoryUsed}GB / {metrics.memoryTotal}GB
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Service Health Overview</CardTitle>
                <CardDescription className="text-slate-400">Real-time status of all microservices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            service.status === "healthy"
                              ? "bg-green-500"
                              : service.status === "degraded"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{service.name}</p>
                          <p className="text-xs text-slate-400">Port {service.port}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          service.status === "healthy"
                            ? "bg-green-600"
                            : service.status === "degraded"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {service.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-slate-400">Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage User Accounts
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Configuration
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Database Maintenance
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Server className="h-4 w-4 mr-2" />
                  Service Management
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  System Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UserManagementAdmin />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="database">
          <DatabaseManagement />
        </TabsContent>

        <TabsContent value="services">
          <ServiceMonitoring />
        </TabsContent>

        <TabsContent value="config">
          <SystemConfiguration />
        </TabsContent>
      </Tabs>

      <AuditLogs />
    </div>
  )
}
