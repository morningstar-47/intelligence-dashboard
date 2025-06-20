import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { SuspenseWrapper } from "@/components/common/suspense-wrapper"
import { DashboardSkeleton } from "@/components/ui/loading-fallbacks"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <SuspenseWrapper
      fallback={<DashboardSkeleton />}
      errorFallback={
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-muted-foreground">Failed to load dashboard data</p>
        </div>
      }
      >
      <DashboardOverview />
      </SuspenseWrapper>
    </DashboardLayout>
  )
}
