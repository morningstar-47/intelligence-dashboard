// import { DashboardLayout } from "@/components/layouts/dashboard-layout"
// import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
// import { SuspenseWrapper } from "@/components/common/suspense-wrapper"
// import { DashboardSkeleton } from "@/components/ui/loading-fallbacks"

// export default function DashboardPage() {
//   return (
//     <DashboardLayout>
//       <SuspenseWrapper
//       fallback={<DashboardSkeleton />}
//       errorFallback={
//         <div className="flex items-center justify-center h-[400px]">
//           <p className="text-muted-foreground">Failed to load dashboard data</p>
//         </div>
//       }
//       >
//       <DashboardOverview />
//       </SuspenseWrapper>
//     </DashboardLayout>
//   )
// }

import { Suspense } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { DashboardMetricsServer } from "@/components/server/dashboard-metrics-server"
import { ReportsDataServer } from "@/components/server/reports-data-server"
import { DashboardSkeleton } from "@/components/ui/loading-fallbacks"

// Composant de contenu statique qui se charge immédiatement
function DashboardHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Intelligence Dashboard</h1>
      <p className="text-muted-foreground">Real-time overview of intelligence operations and system status</p>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Contenu statique - se charge immédiatement */}
        <DashboardHeader />

        {/* Métriques - streaming avec Suspense */}
        <DashboardMetricsServer />

        {/* Rapports récents - streaming séparé */}
        <div className="grid gap-6 md:grid-cols-2">
          <ReportsDataServer />

          {/* Autre contenu qui peut se charger en parallèle */}
          <Suspense fallback={<DashboardSkeleton />}>
            <div className="space-y-4">{/* Contenu additionnel */}</div>
          </Suspense>
        </div>
      </div>
    </DashboardLayout>
  )
}
