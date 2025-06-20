// import { DashboardLayout } from "@/components/layouts/dashboard-layout"
// import { UserManagement } from "@/components/users/user-management"

// export default function UsersPage() {
//   return (
//     <DashboardLayout>
//       <UserManagement />
//     </DashboardLayout>
//   )
// }

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { UserManagement } from "@/components/users/user-management"
import { TableSkeleton } from "@/components/ui/loading-fallbacks"
import { SuspenseWrapper } from "@/components/common/suspense-wrapper"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <SuspenseWrapper
        fallback={<TableSkeleton rows={6} columns={4} />}
        errorFallback={
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground">Failed to load users</p>
          </div>
        }
      >
        <UserManagement />
      </SuspenseWrapper>
    </DashboardLayout>
  )
}
