// export default function DashboardLoading() {
//   return (
//     <div className="min-h-screen bg-slate-900 p-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="animate-pulse">
//           <div className="h-8 bg-slate-700 rounded w-1/4 mb-6"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-slate-800 p-6 rounded-lg">
//                 <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
//                 <div className="h-8 bg-slate-700 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-slate-800 p-6 rounded-lg h-96"></div>
//             <div className="bg-slate-800 p-6 rounded-lg h-96"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { DashboardSkeleton, MetricsSkeleton } from "@/components/ui/loading-fallbacks"

export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="h-4 w-96 bg-muted animate-pulse rounded" />
      </div>

      {/* Metrics skeleton */}
      <MetricsSkeleton />

      {/* Content skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardSkeleton />
        <DashboardSkeleton />
      </div>
    </div>
  )
}
