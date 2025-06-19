import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { UserManagement } from "@/components/users/user-management"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  )
}
