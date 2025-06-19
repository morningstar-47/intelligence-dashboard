"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Key, Lock, CheckCircle } from "lucide-react"

export function SecuritySettings() {
  const [securityConfig, setSecurityConfig] = useState({
    jwtExpiration: "1800",
    passwordMinLength: "8",
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxLoginAttempts: "5",
    lockoutDuration: "900",
    twoFactorAuth: false,
    sessionTimeout: "3600",
    ipWhitelist: "",
    auditLogging: true,
    encryptionLevel: "AES-256",
  })

  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Frontend App",
      key: "sk_live_***************",
      created: "2024-01-15",
      lastUsed: "2024-01-20",
      status: "active",
    },
    {
      id: "2",
      name: "Mobile App",
      key: "sk_live_***************",
      created: "2024-01-10",
      lastUsed: "2024-01-19",
      status: "active",
    },
    {
      id: "3",
      name: "Analytics Service",
      key: "sk_live_***************",
      created: "2024-01-05",
      lastUsed: "Never",
      status: "inactive",
    },
  ])

  const [showNewApiKey, setShowNewApiKey] = useState(false)
  const [newApiKeyName, setNewApiKeyName] = useState("")

  const handleConfigChange = (key: string, value: any) => {
    setSecurityConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveConfig = () => {
    // In a real app, this would call the backend API
    console.log("Saving security configuration:", securityConfig)
  }

  const generateApiKey = () => {
    if (!newApiKeyName) return

    const newKey = {
      id: Date.now().toString(),
      name: newApiKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      status: "active",
    }

    setApiKeys((prev) => [newKey, ...prev])
    setNewApiKeyName("")
    setShowNewApiKey(false)
  }

  const revokeApiKey = (keyId: string) => {
    setApiKeys((prev) => prev.map((key) => (key.id === keyId ? { ...key, status: "revoked" } : key)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Security Configuration</h2>
        <p className="text-slate-400">Manage authentication, authorization, and security policies</p>
      </div>

      <Tabs defaultValue="auth" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="api">API Security</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="audit">Audit & Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Key className="h-5 w-5 mr-2" />
                JWT Configuration
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configure JSON Web Token settings for authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Token Expiration (seconds)</Label>
                  <Input
                    value={securityConfig.jwtExpiration}
                    onChange={(e) => handleConfigChange("jwtExpiration", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Session Timeout (seconds)</Label>
                  <Input
                    value={securityConfig.sessionTimeout}
                    onChange={(e) => handleConfigChange("sessionTimeout", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Password Policy
              </CardTitle>
              <CardDescription className="text-slate-400">Set password requirements and security rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Minimum Length</Label>
                  <Input
                    type="number"
                    value={securityConfig.passwordMinLength}
                    onChange={(e) => handleConfigChange("passwordMinLength", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Max Login Attempts</Label>
                  <Input
                    type="number"
                    value={securityConfig.maxLoginAttempts}
                    onChange={(e) => handleConfigChange("maxLoginAttempts", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Require Uppercase Letters</Label>
                    <p className="text-xs text-slate-400">Password must contain at least one uppercase letter</p>
                  </div>
                  <Switch
                    checked={securityConfig.requireUppercase}
                    onCheckedChange={(checked) => handleConfigChange("requireUppercase", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Require Numbers</Label>
                    <p className="text-xs text-slate-400">Password must contain at least one number</p>
                  </div>
                  <Switch
                    checked={securityConfig.requireNumbers}
                    onCheckedChange={(checked) => handleConfigChange("requireNumbers", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Require Special Characters</Label>
                    <p className="text-xs text-slate-400">Password must contain at least one special character</p>
                  </div>
                  <Switch
                    checked={securityConfig.requireSpecialChars}
                    onCheckedChange={(checked) => handleConfigChange("requireSpecialChars", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Two-Factor Authentication</Label>
                    <p className="text-xs text-slate-400">Require 2FA for all user accounts</p>
                  </div>
                  <Switch
                    checked={securityConfig.twoFactorAuth}
                    onCheckedChange={(checked) => handleConfigChange("twoFactorAuth", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Keys Management
                </div>
                <Button onClick={() => setShowNewApiKey(true)} className="bg-blue-600 hover:bg-blue-700">
                  Generate New Key
                </Button>
              </CardTitle>
              <CardDescription className="text-slate-400">Manage API keys for external integrations</CardDescription>
            </CardHeader>
            <CardContent>
              {showNewApiKey && (
                <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-200">API Key Name</Label>
                      <Input
                        value={newApiKeyName}
                        onChange={(e) => setNewApiKeyName(e.target.value)}
                        placeholder="Enter a descriptive name"
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={generateApiKey} className="bg-green-600 hover:bg-green-700">
                        Generate
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewApiKey(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-white">{apiKey.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">{apiKey.key}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-slate-400">Created: {apiKey.created}</span>
                        <span className="text-xs text-slate-400">Last used: {apiKey.lastUsed}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          apiKey.status === "active"
                            ? "bg-green-600"
                            : apiKey.status === "inactive"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {apiKey.status.toUpperCase()}
                      </Badge>
                      {apiKey.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => revokeApiKey(apiKey.id)}
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Rate Limiting & Security</CardTitle>
              <CardDescription className="text-slate-400">
                Configure API rate limits and security measures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Requests per minute</Label>
                  <Input type="number" defaultValue="100" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Burst limit</Label>
                  <Input type="number" defaultValue="200" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">IP Whitelist (comma-separated)</Label>
                <Input
                  value={securityConfig.ipWhitelist}
                  onChange={(e) => handleConfigChange("ipWhitelist", e.target.value)}
                  placeholder="192.168.1.1, 10.0.0.1"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Role-Based Access Control
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configure permissions for different user roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { role: "admin", permissions: ["all"] },
                  { role: "commander", permissions: ["users:read", "maps:all", "reports:all", "monitoring:read"] },
                  { role: "analyst", permissions: ["maps:read", "reports:all", "ai:all"] },
                  { role: "field_agent", permissions: ["maps:read", "reports:create"] },
                ].map((roleConfig) => (
                  <div key={roleConfig.role} className="p-4 bg-slate-700 rounded-lg">
                    <h4 className="text-lg font-medium text-white mb-3 capitalize">
                      {roleConfig.role.replace("_", " ")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {roleConfig.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="border-slate-500 text-slate-300">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Clearance Levels</CardTitle>
              <CardDescription className="text-slate-400">Manage security clearance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { level: "top_secret", color: "bg-red-600", description: "Highest classification level" },
                  { level: "secret", color: "bg-orange-600", description: "Sensitive information" },
                  { level: "confidential", color: "bg-yellow-600", description: "Restricted access" },
                ].map((clearance) => (
                  <div key={clearance.level} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge className={clearance.color}>{clearance.level.replace("_", " ").toUpperCase()}</Badge>
                      <span className="text-slate-200">{clearance.description}</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Audit Configuration</CardTitle>
              <CardDescription className="text-slate-400">
                Configure audit logging and monitoring settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-200">Enable Audit Logging</Label>
                  <p className="text-xs text-slate-400">Log all user actions and system events</p>
                </div>
                <Switch
                  checked={securityConfig.auditLogging}
                  onCheckedChange={(checked) => handleConfigChange("auditLogging", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Log Retention Period (days)</Label>
                <Input type="number" defaultValue="90" className="bg-slate-700 border-slate-600 text-white" />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Encryption Level</Label>
                <Select
                  value={securityConfig.encryptionLevel}
                  onValueChange={(value) => handleConfigChange("encryptionLevel", value)}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="AES-128" className="text-white">
                      AES-128
                    </SelectItem>
                    <SelectItem value="AES-256" className="text-white">
                      AES-256
                    </SelectItem>
                    <SelectItem value="RSA-2048" className="text-white">
                      RSA-2048
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveConfig} className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Security Configuration
        </Button>
      </div>
    </div>
  )
}
