// import { DashboardLayout } from "@/components/layouts/dashboard-layout"
// import { ReportsManagement } from "@/components/reports/reports-management"

// export default function ReportsPage() {
//   return (
//     <DashboardLayout>
//       <ReportsManagement />
//     </DashboardLayout>
//   )
// }


import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { ReportsManagement } from "@/components/reports/reports-management"
import { TableSkeleton } from "@/components/ui/loading-fallbacks"
import { SuspenseWrapper } from "@/components/common/suspense-wrapper"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <SuspenseWrapper
        fallback={<TableSkeleton rows={8} columns={5} />}
        errorFallback={
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground">Failed to load reports</p>
          </div>
        }
      >
        <ReportsManagement />
      </SuspenseWrapper>
    </DashboardLayout>
  )
}
