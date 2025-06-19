"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const demoAccounts = [
  {
    username: "admin_001",
    password: "IntelAdmin2024!",
    role: "admin",
    clearance: "top_secret",
    name: "Administrator",
  },
  {
    username: "commander_alpha",
    password: "CmdAlpha2024!",
    role: "commander",
    clearance: "top_secret",
    name: "Commander Alpha",
  },
  {
    username: "analyst_beta",
    password: "AnalBeta2024!",
    role: "analyst",
    clearance: "secret",
    name: "Analyst Beta",
  },
  {
    username: "agent_gamma",
    password: "AgentGamma2024!",
    role: "field_agent",
    clearance: "confidential",
    name: "Agent Gamma",
  },
]

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleDemoSelect = (value: string) => {
    const account = demoAccounts.find((acc) => acc.username === value)
    if (account) {
      setUsername(account.username)
      setPassword(account.password)
      setSelectedDemo(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login({ username, password })
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>

      <Card className="w-full max-w-md relative z-10 bg-slate-800/90 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Intelligence Service</CardTitle>
          <CardDescription className="text-slate-300">Secure Access Portal</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-slate-200">Demo Accounts</Label>
            <Select value={selectedDemo} onValueChange={handleDemoSelect}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select a demo account" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {demoAccounts.map((account) => (
                  <SelectItem key={account.username} value={account.username} className="text-white hover:bg-slate-600">
                    <div className="flex items-center justify-between w-full">
                      <span>{account.name}</span>
                      <span className="text-xs text-slate-400 ml-2">
                        {account.role} • {account.clearance.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-200">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                  placeholder="Enter password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Access System"}
            </Button>
          </form>

          <div className="text-center text-xs text-slate-400">
            <p>Classified System • Authorized Personnel Only</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
