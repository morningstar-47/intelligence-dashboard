import { apiService } from "./api"

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    username: string
    role: string
    full_name?: string
    clearance?: string
    is_active: boolean
    created_at: string
  }
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>("/auth/login", credentials)
      return response
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
      // Don't throw error for logout, just log it
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>("/auth/refresh")
      return response
    } catch (error) {
      console.error("Token refresh error:", error)
      throw error
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      const response = await apiService.get("/auth/verify")
      return response
    } catch (error) {
      console.error("Get current user error:", error)
      throw error
    }
  }
}

export const authService = new AuthService()
