"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, HardDrive, RefreshCw, Download, Upload, AlertTriangle, CheckCircle, Activity } from "lucide-react"

export function DatabaseManagement() {
  const [databases] = useState([
    {
      name: "auth_db",
      type: "PostgreSQL",
      status: "healthy",
      size: "2.3 GB",
      connections: 45,
      maxConnections: 100,
      uptime: "99.9%",
      lastBackup: "2024-01-20 02:00:00",
    },
    {
      name: "user_db",
      type: "MongoDB",
      status: "healthy",
      size: "1.8 GB",
      connections: 32,
      maxConnections: 80,
      uptime: "99.8%",
      lastBackup: "2024-01-20 02:15:00",
    },
    {
      name: "map_db",
      type: "MongoDB",
      status: "degraded",
      size: "5.2 GB",
      connections: 67,
      maxConnections: 80,
      uptime: "97.2%",
      lastBackup: "2024-01-19 02:00:00",
    },
    {
      name: "ai_db",
      type: "MongoDB",
      status: "healthy",
      size: "3.1 GB",
      connections: 28,
      maxConnections: 60,
      uptime: "99.5%",
      lastBackup: "2024-01-20 02:30:00",
    },
    {
      name: "report_db",
      type: "MongoDB",
      status: "healthy",
      size: "4.7 GB",
      connections: 41,
      maxConnections: 80,
      uptime: "99.6%",
      lastBackup: "2024-01-20 02:45:00",
    },
  ])

  const [backupHistory] = useState([
    {
      id: "1",
      database: "auth_db",
      timestamp: "2024-01-20 02:00:00",
      size: "2.3 GB",
      status: "completed",
      duration: "45s",
    },
    {
      id: "2",
      database: "user_db",
      timestamp: "2024-01-20 02:15:00",
      size: "1.8 GB",
      status: "completed",
      duration: "32s",
    },
    {
      id: "3",
      database: "map_db",
      timestamp: "2024-01-19 02:00:00",
      size: "5.2 GB",
      status: "failed",
      duration: "2m 15s",
    },
    {
      id: "4",
      database: "ai_db",
      timestamp: "2024-01-20 02:30:00",
      size: "3.1 GB",
      status: "completed",
      duration: "1m 8s",
    },
    {
      id: "5",
      database: "report_db",
      timestamp: "2024-01-20 02:45:00",
      size: "4.7 GB",
      status: "completed",
      duration: "1m 32s",
    },
  ])

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

  const handleBackup = (dbName: string) => {
    console.log(`Starting backup for ${dbName}`)
    // In a real app, this would trigger a backup API call
  }

  const handleRestore = (backupId: string) => {
    console.log(`Restoring backup ${backupId}`)
    // In a real app, this would trigger a restore API call
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Database Management</h2>
        <p className="text-slate-400">Monitor and manage database systems across all microservices</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Total Storage</CardTitle>
                <HardDrive className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">17.1 GB</div>
                <p className="text-xs text-slate-400 mt-1">Across all databases</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Active Connections</CardTitle>
                <Activity className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">213</div>
                <p className="text-xs text-slate-400 mt-1">Total active connections</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">Avg Uptime</CardTitle>
                <CheckCircle className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">99.2%</div>
                <p className="text-xs text-green-400 mt-1">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Database Status
              </CardTitle>
              <CardDescription className="text-slate-400">Real-time status of all database instances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {databases.map((db, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(db.status)}
                        <div>
                          <h4 className="text-sm font-medium text-white">{db.name}</h4>
                          <p className="text-xs text-slate-400">{db.type}</p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-300">
                        <p>Size: {db.size}</p>
                        <p>Uptime: {db.uptime}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-200">
                          {db.connections}/{db.maxConnections} connections
                        </p>
                        <Progress value={(db.connections / db.maxConnections) * 100} className="w-24 h-2 mt-1" />
                      </div>
                      <Badge className={getStatusColor(db.status)}>{db.status.toUpperCase()}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBackup(db.name)}
                        className="border-slate-600 text-slate-300"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Backup
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Query Performance</CardTitle>
                <CardDescription className="text-slate-400">Average query response times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {databases.map((db, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-200">{db.name}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={Math.random() * 100} className="w-20 h-2" />
                        <span className="text-xs text-slate-400 w-12 text-right">
                          {Math.floor(Math.random() * 50 + 10)}ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Connection Pool Usage</CardTitle>
                <CardDescription className="text-slate-400">Current connection utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {databases.map((db, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-200">{db.name}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={(db.connections / db.maxConnections) * 100} className="w-20 h-2" />
                        <span className="text-xs text-slate-400 w-16 text-right">
                          {Math.round((db.connections / db.maxConnections) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Database Metrics</CardTitle>
              <CardDescription className="text-slate-400">Real-time performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2.3ms</div>
                  <p className="text-sm text-slate-400">Avg Query Time</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1,247</div>
                  <p className="text-sm text-slate-400">Queries/sec</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">0.02%</div>
                  <p className="text-sm text-slate-400">Error Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Backup Management</h3>
              <p className="text-slate-400">Schedule and manage database backups</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Create Full Backup
            </Button>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Backup History</CardTitle>
              <CardDescription className="text-slate-400">Recent backup operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backupHistory.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="text-sm font-medium text-white">{backup.database}</h4>
                        <p className="text-xs text-slate-400">{backup.timestamp}</p>
                      </div>
                      <div className="text-sm text-slate-300">
                        <p>Size: {backup.size}</p>
                        <p>Duration: {backup.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={backup.status === "completed" ? "bg-green-600" : "bg-red-600"}>
                        {backup.status.toUpperCase()}
                      </Badge>
                      {backup.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRestore(backup.id)}
                          className="border-slate-600 text-slate-300"
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Backup Schedule</CardTitle>
              <CardDescription className="text-slate-400">Automated backup configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-200">Backup Frequency</label>
                    <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white">
                      <option>Daily at 2:00 AM</option>
                      <option>Every 6 hours</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-200">Retention Period</label>
                    <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-slate-200">Enable Automatic Backups</label>
                    <p className="text-xs text-slate-400">Automatically backup all databases</p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Database Maintenance</CardTitle>
              <CardDescription className="text-slate-400">Optimize and maintain database performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <RefreshCw className="h-6 w-6 mb-2" />
                  <span>Reindex Tables</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Database className="h-6 w-6 mb-2" />
                  <span>Analyze Statistics</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <HardDrive className="h-6 w-6 mb-2" />
                  <span>Vacuum Database</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Activity className="h-6 w-6 mb-2" />
                  <span>Check Integrity</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Maintenance Schedule</CardTitle>
              <CardDescription className="text-slate-400">Scheduled maintenance windows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Weekly Maintenance</h4>
                      <p className="text-xs text-slate-400">Every Sunday at 3:00 AM UTC</p>
                    </div>
                    <Badge className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <p className="text-sm text-slate-300 mt-2">Reindex tables, update statistics, and vacuum databases</p>
                </div>

                <div className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">Monthly Deep Clean</h4>
                      <p className="text-xs text-slate-400">First Sunday of each month at 2:00 AM UTC</p>
                    </div>
                    <Badge className="bg-blue-600">SCHEDULED</Badge>
                  </div>
                  <p className="text-sm text-slate-300 mt-2">Full database optimization and integrity checks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
