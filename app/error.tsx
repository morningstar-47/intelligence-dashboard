"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-white">Something went wrong</CardTitle>
          <CardDescription className="text-slate-400">An unexpected error occurred in the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-700 p-3 rounded-md">
            <p className="text-sm text-red-400 font-mono">{error.message}</p>
            {error.digest && <p className="text-xs text-slate-500 mt-1">Error ID: {error.digest}</p>}
          </div>
          <div className="flex space-x-2">
            <Button onClick={reset} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/dashboard")}
              className="flex-1 border-slate-600 text-slate-300"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
