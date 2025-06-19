import axios, { type AxiosInstance, type AxiosResponse } from "axios"
import { ErrorHandler } from "@/lib/error-handler"


class ApiService {
  private api: AxiosInstance
  // private baseURL = "http://localhost:8080"
  private baseURL = "http://192.168.1.19:8080"

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {

        const token = localStorage.getItem("intelligence_token")
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        ErrorHandler.handle(error, "Request interceptor")
        return Promise.reject(error)
      },
    )

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Essayer de rafraîchir le token
          const originalRequest = error.config
          if (!originalRequest._retry) {
            originalRequest._retry = true
            const newToken = await this.refreshToken()
            if (newToken) {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`
              return this.api(originalRequest)
            }
          }
          localStorage.removeItem("intelligence_token")
          localStorage.removeItem("intelligence_user")
          localStorage.removeItem("intelligence_refresh_token")
          window.location.href = "/"
          return Promise.reject(error)
        }

        if (error.response?.status === 503) {
          ErrorHandler.warning("Service temporarily unavailable. Please try again later.", "Service Unavailable")
        }

        if (!error.response) {
          error.code = "NETWORK_ERROR"
        }

        return Promise.reject(error)
      },
    )
  }

  // Generic API methods with error handling
  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(url, { params })
      return response.data
    } catch (error) {
      ErrorHandler.handle(error, `GET ${url}`)
      throw error
    }
  }

  async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(url, data)
      return response.data
    } catch (error) {
      ErrorHandler.handle(error, `POST ${url}`)
      throw error
    }
  }

  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(url, data)
      return response.data
    } catch (error) {
      ErrorHandler.handle(error, `PUT ${url}`)
      throw error
    }
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.patch(url, data)
      return response.data
    } catch (error) {
      ErrorHandler.handle(error, `PATCH ${url}`)
      throw error
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(url)
      return response.data
    } catch (error) {
      ErrorHandler.handle(error, `DELETE ${url}`)
      throw error
    }
  }

  // Health check
  async checkHealth(): Promise<any> {
    try {
      return await this.get("/health")
    } catch (error) {
      // Don't show error toast for health checks
      throw error
    }
  }

  // Metrics
  async getMetrics(): Promise<string> {
    try {
      const response = await this.api.get("/metrics", {
        headers: { Accept: "text/plain" },
      })
      return response.data
    } catch (error) {
      ErrorHandler.handle(error, "GET /metrics")
      throw error
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem("intelligence_refresh_token")
      if (!refreshToken) return null
      const response = await this.api.post("/auth/refresh", { refreshToken })
      const { token, refreshToken: newRefreshToken } = response.data
      if (token) localStorage.setItem("intelligence_token", token)
      if (newRefreshToken) localStorage.setItem("intelligence_refresh_token", newRefreshToken)
      return token
    } catch (error) {
      ErrorHandler.handle(error, "REFRESH TOKEN")
      return null
    }
  }
}

export const apiService = new ApiService()
