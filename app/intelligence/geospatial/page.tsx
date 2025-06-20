"use client"

// import { DashboardLayout } from "@/components/layouts/dashboard-layout"
// // import { GeospatialIntelligence } from "@/components/intelligence/geospatial-intelligence"

// export default function GeospatialPage() {
//   return <DashboardLayout />
// }


// import { DashboardLayout } from "@/components/layouts/dashboard-layout"
// import { GeospatialIntelligence } from "@/components/intelligence/geospatial-intelligence"
// import { MapSkeleton } from "@/components/ui/loading-fallbacks"
// import { SuspenseWrapper } from "@/components/common/suspense-wrapper"

// export default function GeospatialPage() {
//   return (
//     <DashboardLayout>
//       <SuspenseWrapper
//         fallback={<MapSkeleton />}
//         errorFallback={
//           <div className="flex items-center justify-center h-[500px]">
//             <p className="text-muted-foreground">Failed to load geospatial data</p>
//           </div>
//         }
//       >
//         <GeospatialIntelligence />
//       </SuspenseWrapper>
//     </DashboardLayout>
//   )
// }



import { Suspense } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { GeospatialDataServer } from "@/components/server/geospatial-data-server"
import { MapSkeleton } from "@/components/ui/loading-fallbacks"

function GeospatialHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Geospatial Intelligence</h1>
      <p className="text-muted-foreground">Real-time monitoring and analysis of geographical intelligence data</p>
    </div>
  )
}

export default function GeospatialPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header statique */}
        <GeospatialHeader />

        {/* Données géospatiales avec streaming */}
        <GeospatialDataServer />

        {/* Carte interactive - chargement séparé */}
        <Suspense fallback={<MapSkeleton />}>
          <div className="h-[500px] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Interactive map will load here</p>
          </div>
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
