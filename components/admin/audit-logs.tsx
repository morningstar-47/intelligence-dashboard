"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Download, Eye } from "lucide-react"

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("")
  const [userFilter, setUserFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const [auditLogs] = useState([
    {
      id: "1",
      timestamp: "2024-01-20 16:45:23",
      user: "admin_001",
      action: "USER_CREATED",
      resource: "user:analyst_delta",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
      status: "success",
      details: "Created new analyst user account",
    },
    {
      id: "2",
      timestamp: "2024-01-20 16:44:15",
      user: "commander_alpha",
      action: "MAP_UPDATED",
      resource: "map:operation_blackbird",
      ip: "192.168.1.101",
      userAgent: "Mozilla/5.0...",
      status: "success",
      details: "Updated map coordinates and tags",
    },
    {
      id: "3",
      timestamp: "2024-01-20 16:43:07",
      user: "analyst_beta",
      action: "REPORT_CREATED",
      resource: "report:intel_analysis_q1",
      ip: "192.168.1.102",
      userAgent: "Mozilla/5.0...",
      status: "success",
      details: "Generated quarterly intelligence analysis report",
    },
    {
      id: "4",
      timestamp: "2024-01-20 16:42:33",
      user: "agent_gamma",
      action: "LOGIN_FAILED",
      resource: "auth:login",
      ip: "192.168.1.103",
      userAgent: "Mozilla/5.0...",
      status: "failed",
      details: "Invalid password attempt",
    },
    {
      id: "5",
      timestamp: "2024-01-20 16:41:55",
      user: "admin_001",
      action: "CONFIG_UPDATED",
      resource: "system:security_settings",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
      status: "success",
      details: "Updated JWT expiration settings",
    },
    {
      id: "6",
      timestamp: "2024-01-20 16:40:12",
      user: "commander_alpha",
      action: "USER_DELETED",
      resource: "user:temp_agent_001",
      ip: "192.168.1.101",
      userAgent: "Mozilla/5.0...",
      status: "success",
      details: "Removed temporary agent account",
    },
  ])

  const filteredLogs = auditLogs.filter((log) => {
    if (
      searchTerm &&
      !log.details.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !log.resource.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    if (actionFilter && log.action !== actionFilter) return false
    if (userFilter && log.user !== userFilter) return false
    return true
  })

  const getActionColor = (action: string) => {
    const colors = {
      USER_CREATED: "bg-green-600",
      USER_UPDATED: "bg-blue-600",
      USER_DELETED: "bg-red-600",
      MAP_CREATED: "bg-green-600",
      MAP_UPDATED: "bg-blue-600",
      MAP_DELETED: "bg-red-600",
      REPORT_CREATED: "bg-green-600",
      REPORT_UPDATED: "bg-blue-600",
      LOGIN_SUCCESS: "bg-green-600",
      LOGIN_FAILED: "bg-red-600",
      CONFIG_UPDATED: "bg-yellow-600",
    }
    return colors[action as keyof typeof colors] || "bg-gray-600"
  }

  const getStatusColor = (status: string) => {
    return status === "success" ? "bg-green-600" : "bg-red-600"
  }

  const exportLogs = () => {
    console.log("Exporting audit logs...")
    // In a real app, this would generate and download a CSV/PDF file
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Audit Logs
          </div>
          <Button onClick={exportLogs} variant="outline" className="border-slate-600 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardTitle>
        <CardDescription className="text-slate-400">
          Complete audit trail of all system activities and user actions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All actions" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all" className="text-white">
                All actions
              </SelectItem>
              <SelectItem value="USER_CREATED" className="text-white">
                User Created
              </SelectItem>
              <SelectItem value="USER_UPDATED" className="text-white">
                User Updated
              </SelectItem>
              <SelectItem value="USER_DELETED" className="text-white">
                User Deleted
              </SelectItem>
              <SelectItem value="MAP_CREATED" className="text-white">
                Map Created
              </SelectItem>
              <SelectItem value="MAP_UPDATED" className="text-white">
                Map Updated
              </SelectItem>
              <SelectItem value="REPORT_CREATED" className="text-white">
                Report Created
              </SelectItem>
              <SelectItem value="LOGIN_FAILED" className="text-white">
                Login Failed
              </SelectItem>
              <SelectItem value="CONFIG_UPDATED" className="text-white">
                Config Updated
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All users" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all" className="text-white">
                All users
              </SelectItem>
              <SelectItem value="admin_001" className="text-white">
                admin_001
              </SelectItem>
              <SelectItem value="commander_alpha" className="text-white">
                commander_alpha
              </SelectItem>
              <SelectItem value="analyst_beta" className="text-white">
                analyst_beta
              </SelectItem>
              <SelectItem value="agent_gamma" className="text-white">
                agent_gamma
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setActionFilter("")
              setUserFilter("")
              setDateFilter("")
            }}
            className="border-slate-600 text-slate-300"
          >
            Clear Filters
          </Button>
        </div>

        <div className="space-y-2">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-xs text-slate-400 w-32">{log.timestamp}</div>
                <div className="flex items-center space-x-2">
                  <Badge className={getActionColor(log.action)}>{log.action.replace("_", " ")}</Badge>
                  <Badge className={getStatusColor(log.status)}>{log.status.toUpperCase()}</Badge>
                </div>
                <div>
                  <p className="text-sm text-white">{log.details}</p>
                  <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1">
                    <span>User: {log.user}</span>
                    <span>Resource: {log.resource}</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">No audit logs found matching the current filters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
