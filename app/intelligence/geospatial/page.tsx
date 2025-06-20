"use client"

// import { DashboardLayout } from "@/components/layouts/dashboard-layout"
// // import { GeospatialIntelligence } from "@/components/intelligence/geospatial-intelligence"

// export default function GeospatialPage() {
//   return <DashboardLayout />
// }


import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { GeospatialIntelligence } from "@/components/intelligence/geospatial-intelligence"
import { MapSkeleton } from "@/components/ui/loading-fallbacks"
import { SuspenseWrapper } from "@/components/common/suspense-wrapper"

export default function GeospatialPage() {
  return (
    <DashboardLayout>
      <SuspenseWrapper
        fallback={<MapSkeleton />}
        errorFallback={
          <div className="flex items-center justify-center h-[500px]">
            <p className="text-muted-foreground">Failed to load geospatial data</p>
          </div>
        }
      >
        <GeospatialIntelligence />
      </SuspenseWrapper>
    </DashboardLayout>
  )
}
