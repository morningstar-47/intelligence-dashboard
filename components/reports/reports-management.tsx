"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Download, Search, Filter, Edit, Trash2, Save } from "lucide-react"
import { useReportsData } from "@/hooks/use-reports-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

export function ReportsManagement() {
  const { user } = useAuth()
  const [filters, setFilters] = useState({
    status: "",
    classification: "",
    search: "",
  })
  const { reports, isLoading, error, createReport, updateReport, deleteReport } = useReportsData(filters)

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<any>(null)
  const [newReport, setNewReport] = useState({
    name: "",
    description: "",
    classification: "confidential",
    status: "draft",
  })

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-600",
      pending: "bg-yellow-600",
      approved: "bg-green-600",
      classified: "bg-red-600",
    }
    return colors[status as keyof typeof colors] || "bg-gray-600"
  }

  const getClassificationColor = (classification: string) => {
    const colors = {
      top_secret: "bg-red-600",
      secret: "bg-orange-600",
      confidential: "bg-yellow-600",
    }
    return colors[classification as keyof typeof colors] || "bg-gray-600"
  }

  const handleCreateReport = async () => {
    try {
      await createReport(newReport)
      setIsCreateDialogOpen(false)
      setNewReport({
        name: "",
        description: "",
        classification: "confidential",
        status: "draft",
      })
    } catch (error) {
      console.error("Failed to create report:", error)
    }
  }

  const handleUpdateReport = async () => {
    if (!editingReport) return

    try {
      await updateReport(editingReport.id, {
        name: editingReport.name,
        description: editingReport.description,
        classification: editingReport.classification,
        status: editingReport.status,
      })
      setEditingReport(null)
    } catch (error) {
      console.error("Failed to update report:", error)
    }
  }

  const handleDeleteReport = async (reportId: string) => {
    try {
      await deleteReport(reportId)
    } catch (error) {
      console.error("Failed to delete report:", error)
    }
  }

  const clearFilters = () => {
    setFilters({
      status: "",
      classification: "",
      search: "",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Intelligence Reports</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Report</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add a new intelligence report to the system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="report-name" className="text-slate-200">
                  Report Name
                </Label>
                <Input
                  id="report-name"
                  value={newReport.name}
                  onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter report name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-description" className="text-slate-200">
                  Description
                </Label>
                <Textarea
                  id="report-description"
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  placeholder="Enter report description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Classification</Label>
                  <Select
                    value={newReport.classification}
                    onValueChange={(value) => setNewReport({ ...newReport, classification: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="top_secret" className="text-white">
                        Top Secret
                      </SelectItem>
                      <SelectItem value="secret" className="text-white">
                        Secret
                      </SelectItem>
                      <SelectItem value="confidential" className="text-white">
                        Confidential
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Status</Label>
                  <Select
                    value={newReport.status}
                    onValueChange={(value) => setNewReport({ ...newReport, status: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="draft" className="text-white">
                        Draft
                      </SelectItem>
                      <SelectItem value="pending" className="text-white">
                        Pending
                      </SelectItem>
                      <SelectItem value="approved" className="text-white">
                        Approved
                      </SelectItem>
                      <SelectItem value="classified" className="text-white">
                        Classified
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateReport} className="bg-blue-600 hover:bg-blue-700">
                Create Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search reports..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">
                  All statuses
                </SelectItem>
                <SelectItem value="draft" className="text-white">
                  Draft
                </SelectItem>
                <SelectItem value="pending" className="text-white">
                  Pending
                </SelectItem>
                <SelectItem value="approved" className="text-white">
                  Approved
                </SelectItem>
                <SelectItem value="classified" className="text-white">
                  Classified
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.classification}
              onValueChange={(value) => setFilters({ ...filters, classification: value })}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="All classifications" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">
                  All classifications
                </SelectItem>
                <SelectItem value="top_secret" className="text-white">
                  Top Secret
                </SelectItem>
                <SelectItem value="secret" className="text-white">
                  Secret
                </SelectItem>
                <SelectItem value="confidential" className="text-white">
                  Confidential
                </SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters} className="border-slate-600 text-slate-300">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Reports Database</CardTitle>
          <CardDescription className="text-slate-400">{reports.length} reports found</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-slate-400 mt-2">Loading reports...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <h4 className="text-sm font-medium text-white">{report.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{report.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-slate-400">By {report.created_by}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">{report.created_at}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(report.status)}>{report.status.toUpperCase()}</Badge>
                    <Badge className={getClassificationColor(report.classification)}>
                      {report.classification.replace("_", " ").toUpperCase()}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-300 hover:text-white"
                        onClick={() => setEditingReport(report)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-800 border-slate-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Delete Report</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400">
                              Are you sure you want to delete this report? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteReport(report.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Report Dialog */}
      <Dialog open={!!editingReport} onOpenChange={(open) => !open && setEditingReport(null)}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Report</DialogTitle>
            <DialogDescription className="text-slate-400">Update report information</DialogDescription>
          </DialogHeader>
          {editingReport && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-report-name" className="text-slate-200">
                  Report Name
                </Label>
                <Input
                  id="edit-report-name"
                  value={editingReport.name}
                  onChange={(e) => setEditingReport({ ...editingReport, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-report-description" className="text-slate-200">
                  Description
                </Label>
                <Textarea
                  id="edit-report-description"
                  value={editingReport.description}
                  onChange={(e) => setEditingReport({ ...editingReport, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Classification</Label>
                  <Select
                    value={editingReport.classification}
                    onValueChange={(value) => setEditingReport({ ...editingReport, classification: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="top_secret" className="text-white">
                        Top Secret
                      </SelectItem>
                      <SelectItem value="secret" className="text-white">
                        Secret
                      </SelectItem>
                      <SelectItem value="confidential" className="text-white">
                        Confidential
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Status</Label>
                  <Select
                    value={editingReport.status}
                    onValueChange={(value) => setEditingReport({ ...editingReport, status: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="draft" className="text-white">
                        Draft
                      </SelectItem>
                      <SelectItem value="pending" className="text-white">
                        Pending
                      </SelectItem>
                      <SelectItem value="approved" className="text-white">
                        Approved
                      </SelectItem>
                      <SelectItem value="classified" className="text-white">
                        Classified
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingReport(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateReport} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
