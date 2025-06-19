"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Globe, Bell, Palette, Save } from "lucide-react"

export function SystemConfiguration() {
  const [config, setConfig] = useState({
    // General Settings
    systemName: "Intelligence Service Dashboard",
    systemVersion: "v2.4.1",
    timezone: "UTC",
    language: "en",

    // API Configuration
    apiTimeout: "10000",
    maxRetries: "3",
    rateLimitEnabled: true,
    rateLimitRequests: "100",
    rateLimitWindow: "60",

    // UI Settings
    theme: "dark",
    primaryColor: "#3b82f6",
    enableAnimations: true,
    compactMode: false,

    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    alertThreshold: "80",

    // Performance
    cacheEnabled: true,
    cacheTTL: "300",
    compressionEnabled: true,

    // Logging
    logLevel: "info",
    logRetention: "30",
    auditEnabled: true,
  })

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveConfig = () => {
    console.log("Saving system configuration:", config)
    // In a real app, this would call the backend API
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">System Configuration</h2>
        <p className="text-slate-400">Configure global system settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="ui">Interface</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                General Settings
              </CardTitle>
              <CardDescription className="text-slate-400">Basic system configuration and metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">System Name</Label>
                  <Input
                    value={config.systemName}
                    onChange={(e) => handleConfigChange("systemName", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">System Version</Label>
                  <Input
                    value={config.systemVersion}
                    onChange={(e) => handleConfigChange("systemVersion", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Timezone</Label>
                  <Select value={config.timezone} onValueChange={(value) => handleConfigChange("timezone", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="UTC" className="text-white">
                        UTC
                      </SelectItem>
                      <SelectItem value="EST" className="text-white">
                        Eastern Time
                      </SelectItem>
                      <SelectItem value="PST" className="text-white">
                        Pacific Time
                      </SelectItem>
                      <SelectItem value="GMT" className="text-white">
                        Greenwich Mean Time
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Language</Label>
                  <Select value={config.language} onValueChange={(value) => handleConfigChange("language", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="en" className="text-white">
                        English
                      </SelectItem>
                      <SelectItem value="fr" className="text-white">
                        French
                      </SelectItem>
                      <SelectItem value="es" className="text-white">
                        Spanish
                      </SelectItem>
                      <SelectItem value="de" className="text-white">
                        German
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">System Information</CardTitle>
              <CardDescription className="text-slate-400">Current system status and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400">Deployment Environment</Label>
                  <p className="text-white">Production</p>
                </div>
                <div>
                  <Label className="text-slate-400">Last Updated</Label>
                  <p className="text-white">2024-01-20 16:45:00 UTC</p>
                </div>
                <div>
                  <Label className="text-slate-400">Build Number</Label>
                  <p className="text-white">2024.01.20.1645</p>
                </div>
                <div>
                  <Label className="text-slate-400">Node.js Version</Label>
                  <p className="text-white">v18.17.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                API Configuration
              </CardTitle>
              <CardDescription className="text-slate-400">Configure API behavior and limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Request Timeout (ms)</Label>
                  <Input
                    value={config.apiTimeout}
                    onChange={(e) => handleConfigChange("apiTimeout", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Max Retries</Label>
                  <Input
                    value={config.maxRetries}
                    onChange={(e) => handleConfigChange("maxRetries", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-200">Enable Rate Limiting</Label>
                  <p className="text-xs text-slate-400">Limit API requests per client</p>
                </div>
                <Switch
                  checked={config.rateLimitEnabled}
                  onCheckedChange={(checked) => handleConfigChange("rateLimitEnabled", checked)}
                />
              </div>

              {config.rateLimitEnabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-200">Requests per Window</Label>
                    <Input
                      value={config.rateLimitRequests}
                      onChange={(e) => handleConfigChange("rateLimitRequests", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-200">Window Size (seconds)</Label>
                    <Input
                      value={config.rateLimitWindow}
                      onChange={(e) => handleConfigChange("rateLimitWindow", e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ui" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                User Interface Settings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Customize the appearance and behavior of the interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Theme</Label>
                  <Select value={config.theme} onValueChange={(value) => handleConfigChange("theme", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="dark" className="text-white">
                        Dark
                      </SelectItem>
                      <SelectItem value="light" className="text-white">
                        Light
                      </SelectItem>
                      <SelectItem value="auto" className="text-white">
                        Auto
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Primary Color</Label>
                  <Input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => handleConfigChange("primaryColor", e.target.value)}
                    className="bg-slate-700 border-slate-600 h-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Enable Animations</Label>
                    <p className="text-xs text-slate-400">Show smooth transitions and animations</p>
                  </div>
                  <Switch
                    checked={config.enableAnimations}
                    onCheckedChange={(checked) => handleConfigChange("enableAnimations", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Compact Mode</Label>
                    <p className="text-xs text-slate-400">Reduce spacing and padding for more content</p>
                  </div>
                  <Switch
                    checked={config.compactMode}
                    onCheckedChange={(checked) => handleConfigChange("compactMode", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-slate-400">Configure system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Email Notifications</Label>
                    <p className="text-xs text-slate-400">Send alerts via email</p>
                  </div>
                  <Switch
                    checked={config.emailNotifications}
                    onCheckedChange={(checked) => handleConfigChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Push Notifications</Label>
                    <p className="text-xs text-slate-400">Send browser push notifications</p>
                  </div>
                  <Switch
                    checked={config.pushNotifications}
                    onCheckedChange={(checked) => handleConfigChange("pushNotifications", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Alert Threshold (%)</Label>
                <Input
                  value={config.alertThreshold}
                  onChange={(e) => handleConfigChange("alertThreshold", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="80"
                />
                <p className="text-xs text-slate-400">Trigger alerts when metrics exceed this threshold</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Settings</CardTitle>
              <CardDescription className="text-slate-400">
                Optimize system performance and resource usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Enable Caching</Label>
                    <p className="text-xs text-slate-400">Cache API responses for better performance</p>
                  </div>
                  <Switch
                    checked={config.cacheEnabled}
                    onCheckedChange={(checked) => handleConfigChange("cacheEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-200">Enable Compression</Label>
                    <p className="text-xs text-slate-400">Compress API responses to reduce bandwidth</p>
                  </div>
                  <Switch
                    checked={config.compressionEnabled}
                    onCheckedChange={(checked) => handleConfigChange("compressionEnabled", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-200">Cache TTL (seconds)</Label>
                <Input
                  value={config.cacheTTL}
                  onChange={(e) => handleConfigChange("cacheTTL", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  disabled={!config.cacheEnabled}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Log Level</Label>
                  <Select value={config.logLevel} onValueChange={(value) => handleConfigChange("logLevel", value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="error" className="text-white">
                        Error
                      </SelectItem>
                      <SelectItem value="warn" className="text-white">
                        Warning
                      </SelectItem>
                      <SelectItem value="info" className="text-white">
                        Info
                      </SelectItem>
                      <SelectItem value="debug" className="text-white">
                        Debug
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Log Retention (days)</Label>
                  <Input
                    value={config.logRetention}
                    onChange={(e) => handleConfigChange("logRetention", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveConfig} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  )
}
