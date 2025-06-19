import { apiService } from "./api"

export interface User {
  id: string
  username: string
  email: string
  full_name: string
  created_by: string
  created_at: string
  is_active: boolean
  role: string
}

export interface CreateUserData {
  username: string
  email: string
  full_name: string
  role?: string
}

export interface UpdateUserData {
  email?: string
  full_name?: string
  is_active?: boolean
}

export interface UserListParams {
  skip?: number
  limit?: number
  is_active?: boolean
}

class UserService {
  async getUsers(params: UserListParams = {}): Promise<User[]> {
    return apiService.get("/api/v1/users", params)
  }

  async createUser(userData: CreateUserData): Promise<User> {
    return apiService.post("/api/v1/users", userData)
  }

  async getUser(userId: string): Promise<User> {
    return apiService.get(`/api/v1/users/${userId}`)
  }

  async updateUser(userId: string, userData: UpdateUserData): Promise<User> {
    return apiService.patch(`/api/v1/users/${userId}`, userData)
  }

  async deleteUser(userId: string): Promise<void> {
    return apiService.delete(`/api/v1/users/${userId}`)
  }
}

export const userService = new UserService()
