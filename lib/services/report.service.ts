import { apiService } from "./api"

export interface Report {
  id: string
  name: string
  description: string
  created_by: string
  created_at: string
  updated_at: string
  status?: string
  classification?: string
}

export interface CreateReportData {
  name: string
  description: string
  status?: string
  classification?: string
}

export interface UpdateReportData {
  name?: string
  description?: string
  status?: string
  classification?: string
}

export interface ReportListParams {
  skip?: number
  limit?: number
  status?: string
  classification?: string
}

class ReportService {
  async getReports(params: ReportListParams = {}): Promise<Report[]> {
    return apiService.get("/api/v1/reports", params)
  }

  async createReport(reportData: CreateReportData): Promise<Report> {
    return apiService.post("/api/v1/reports", reportData)
  }

  async getReport(reportId: string): Promise<Report> {
    return apiService.get(`/api/v1/reports/${reportId}`)
  }

  async updateReport(reportId: string, reportData: UpdateReportData): Promise<Report> {
    return apiService.patch(`/api/v1/reports/${reportId}`, reportData)
  }

  async deleteReport(reportId: string): Promise<void> {
    return apiService.delete(`/api/v1/reports/${reportId}`)
  }
}

export const reportService = new ReportService()
