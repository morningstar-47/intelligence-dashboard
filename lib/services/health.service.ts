import { apiService } from "./api"

export interface ServiceHealth {
  status: string
  service: string
  timestamp: string
  database: string
}

export interface HealthResponse {
  auth_service: ServiceHealth
  user_service: ServiceHealth
  map_service: ServiceHealth
  ai_service: ServiceHealth
  report_service: ServiceHealth
}

class HealthService {
  async getHealth(): Promise<HealthResponse> {
    return apiService.get("/health")
  }

  async getMetrics(): Promise<string> {
    return apiService.getMetrics()
  }
}

export const healthService = new HealthService()
