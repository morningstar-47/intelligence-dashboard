import dynamic from "next/dynamic"
import { DashboardSkeleton, MapSkeleton, TableSkeleton, ChartSkeleton } from "@/components/ui/loading-fallbacks"

// Lazy load des composants lourds avec Suspense
export const LazyDashboardOverview = dynamic(
  () => import("@/components/dashboard/dashboard-overview").then((mod) => ({ default: mod.DashboardOverview })),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  },
)

export const LazyGeospatialIntelligence = dynamic(
  () =>
    import("@/components/intelligence/geospatial-intelligence").then((mod) => ({
      default: mod.GeospatialIntelligence,
    })),
  {
    loading: () => <MapSkeleton />,
    ssr: false,
  },
)

export const LazyReportsManagement = dynamic(
  () => import("@/components/reports/reports-management").then((mod) => ({ default: mod.ReportsManagement })),
  {
    loading: () => <TableSkeleton rows={8} columns={5} />,
    ssr: false,
  },
)

export const LazyUserManagement = dynamic(
  () => import("@/components/users/user-management").then((mod) => ({ default: mod.UserManagement })),
  {
    loading: () => <TableSkeleton rows={6} columns={4} />,
    ssr: false,
  },
)

export const LazySystemMonitoring = dynamic(
  () => import("@/components/monitoring/system-monitoring").then((mod) => ({ default: mod.SystemMonitoring })),
  {
    loading: () => <ChartSkeleton />,
    ssr: false,
  },
)

export const LazyAdminDashboard = dynamic(
  () => import("@/components/admin/admin-dashboard").then((mod) => ({ default: mod.AdminDashboard })),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false,
  },
)
