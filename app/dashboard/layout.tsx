import type React from "react"
import { Suspense } from "react"
import { DashboardSkeleton } from "@/components/ui/loading-fallbacks"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
    </div>
  )
}
