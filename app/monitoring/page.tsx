import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { SystemMonitoring } from "@/components/monitoring/system-monitoring"

export default function MonitoringPage() {
  return (
    <DashboardLayout>
      <SystemMonitoring />
    </DashboardLayout>
  )
}
