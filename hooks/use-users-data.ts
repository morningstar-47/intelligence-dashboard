"use client"

import { useState, useEffect } from "react"
import { userService, type User } from "@/lib/services/user.service"
import { ErrorHandler } from "@/lib/error-handler"

interface UserData {
  id: string
  username: string
  name: string
  role: "admin" | "commander" | "analyst" | "field_agent"
  clearance: "top_secret" | "secret" | "confidential"
  status: "online" | "offline"
  last_login: string
}

export function useUsersData(searchTerm: string) {
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await userService.getUsers({ limit: 100 })

        // Transform backend data to frontend format
        const transformedData: UserData[] = data.map((user: User) => ({
          id: user.id,
          username: user.username,
          name: user.full_name || user.username,
          role: mapBackendRoleToFrontend(user.role),
          clearance: "secret" as const, // Default, should be added to backend
          status: user.is_active ? "online" : "offline",
          last_login: new Date(user.created_at).toLocaleString(),
        }))

        // Apply search filter
        let filteredUsers = transformedData

        if (searchTerm) {
          filteredUsers = filteredUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.role.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        }

        setUsers(filteredUsers)
      } catch (err) {
        console.error("Error loading users:", err)
        setError("Failed to load users")
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [searchTerm])

  const mapBackendRoleToFrontend = (backendRole: string): "admin" | "commander" | "analyst" | "field_agent" => {
    switch (backendRole.toLowerCase()) {
      case "admin":
        return "admin"
      case "commander":
        return "commander"
      case "analyst":
        return "analyst"
      case "field_agent":
      case "agent":
        return "field_agent"
      default:
        return "analyst"
    }
  }

  const createUser = async (userData: any) => {
    try {
      const newUser = await userService.createUser(userData)
      // Refresh data after creation
      setUsers((prev) => [
        {
          id: newUser.id,
          username: newUser.username,
          name: newUser.full_name || newUser.username,
          role: mapBackendRoleToFrontend(newUser.role),
          clearance: "secret" as const,
          status: newUser.is_active ? "online" : "offline",
          last_login: new Date(newUser.created_at).toLocaleString(),
        },
        ...prev,
      ])
      ErrorHandler.success("User created successfully")
      return newUser
    } catch (err) {
      console.error("Error creating user:", err)
      throw err
    }
  }

  const updateUser = async (userId: string, userData: any) => {
    try {
      const updatedUser = await userService.updateUser(userId, userData)
      // Update local state
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                name: updatedUser.full_name || user.name,
                status: updatedUser.is_active ? "online" : "offline",
              }
            : user,
        ),
      )
      ErrorHandler.success("User updated successfully")
      return updatedUser
    } catch (err) {
      console.error("Error updating user:", err)
      throw err
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      await userService.deleteUser(userId)
      // Remove from local state
      setUsers((prev) => prev.filter((user) => user.id !== userId))
      ErrorHandler.success("User deleted successfully")
    } catch (err) {
      console.error("Error deleting user:", err)
      throw err
    }
  }

  return { users, isLoading, error, createUser, updateUser, deleteUser }
}
