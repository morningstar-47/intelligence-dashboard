"use client"

import { useState, useEffect } from "react"
import { reportService, type Report } from "@/lib/services/report.service"
import { ErrorHandler } from "@/lib/error-handler"

interface IntelligenceReport {
  id: string
  name: string
  description: string
  classification: "top_secret" | "secret" | "confidential"
  created_by: string
  created_at: string
  updated_at: string
  status: "draft" | "pending" | "approved" | "classified"
}

export function useReportsData(filters: any) {
  const [reports, setReports] = useState<IntelligenceReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await reportService.getReports({ limit: 100 })

        // Transform backend data to frontend format
        const transformedData: IntelligenceReport[] = data.map((report: Report) => ({
          id: report.id,
          name: report.name,
          description: report.description,
          classification: "secret" as const, // Default, should be added to backend
          created_by: report.created_by,
          created_at: new Date(report.created_at).toLocaleString(),
          updated_at: new Date(report.updated_at).toLocaleString(),
          status: "pending" as const, // Default, should be added to backend
        }))

        // Apply filters
        let filteredReports = transformedData

        if (filters.status) {
          filteredReports = filteredReports.filter((report) => report.status === filters.status)
        }

        if (filters.classification) {
          filteredReports = filteredReports.filter((report) => report.classification === filters.classification)
        }

        if (filters.search) {
          filteredReports = filteredReports.filter(
            (report) =>
              report.name.toLowerCase().includes(filters.search.toLowerCase()) ||
              report.description.toLowerCase().includes(filters.search.toLowerCase()),
          )
        }

        setReports(filteredReports)
      } catch (err) {
        console.error("Error loading reports:", err)
        setError("Failed to load reports")
      } finally {
        setIsLoading(false)
      }
    }

    loadReports()
  }, [filters])

  const createReport = async (reportData: any) => {
    try {
      const newReport = await reportService.createReport(reportData)
      // Refresh data after creation
      setReports((prev) => [
        {
          id: newReport.id,
          name: newReport.name,
          description: newReport.description,
          classification: reportData.classification || ("secret" as const),
          created_by: newReport.created_by,
          created_at: new Date(newReport.created_at).toLocaleString(),
          updated_at: new Date(newReport.updated_at).toLocaleString(),
          status: reportData.status || ("draft" as const),
        },
        ...prev,
      ])
      ErrorHandler.success("Report created successfully")
      return newReport
    } catch (err) {
      console.error("Error creating report:", err)
      throw err
    }
  }

  const updateReport = async (reportId: string, reportData: any) => {
    try {
      // In a real app, this would call the backend API
      const updatedReport = await reportService.updateReport(reportId, reportData)

      // Update local state
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? {
                ...report,
                ...reportData,
                updated_at: new Date().toLocaleString(),
              }
            : report,
        ),
      )
      ErrorHandler.success("Report updated successfully")
      return updatedReport
    } catch (err) {
      console.error("Error updating report:", err)
      throw err
    }
  }

  const deleteReport = async (reportId: string) => {
    try {
      // In a real app, this would call the backend API
      await reportService.deleteReport(reportId)

      // Remove from local state
      setReports((prev) => prev.filter((report) => report.id !== reportId))
      ErrorHandler.success("Report deleted successfully")
    } catch (err) {
      console.error("Error deleting report:", err)
      throw err
    }
  }

  return { reports, isLoading, error, createReport, updateReport, deleteReport }
}
