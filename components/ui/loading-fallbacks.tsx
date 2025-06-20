// import { Skeleton } from "@/components/ui/skeleton"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"

// export function DashboardSkeleton() {
//   return (
//     <div className="space-y-6">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {Array.from({ length: 4 }).map((_, i) => (
//           <Card key={i}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <Skeleton className="h-4 w-[100px]" />
//               <Skeleton className="h-4 w-4" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-8 w-[60px] mb-2" />
//               <Skeleton className="h-3 w-[120px]" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <Skeleton className="h-6 w-[200px]" />
//           </CardHeader>
//           <CardContent>
//             <Skeleton className="h-[300px] w-full" />
//           </CardContent>
//         </Card>

//         <Card className="col-span-3">
//           <CardHeader>
//             <Skeleton className="h-6 w-[150px]" />
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <div key={i} className="flex items-center space-x-4">
//                   <Skeleton className="h-2 w-2 rounded-full" />
//                   <div className="space-y-2 flex-1">
//                     <Skeleton className="h-4 w-full" />
//                     <Skeleton className="h-3 w-[60px]" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <Skeleton className="h-8 w-[200px]" />
//         <Skeleton className="h-10 w-[100px]" />
//       </div>

//       <div className="rounded-md border">
//         <div className="border-b p-4">
//           <div className="flex space-x-4">
//             {Array.from({ length: columns }).map((_, i) => (
//               <Skeleton key={i} className="h-4 w-[100px]" />
//             ))}
//           </div>
//         </div>

//         {Array.from({ length: rows }).map((_, i) => (
//           <div key={i} className="border-b p-4 last:border-b-0">
//             <div className="flex space-x-4">
//               {Array.from({ length: columns }).map((_, j) => (
//                 <Skeleton key={j} className="h-4 w-[100px]" />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export function MapSkeleton() {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <Skeleton className="h-8 w-[200px]" />
//         <div className="flex space-x-2">
//           <Skeleton className="h-10 w-[80px]" />
//           <Skeleton className="h-10 w-[80px]" />
//           <Skeleton className="h-10 w-[100px]" />
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         <Card className="md:col-span-2">
//           <CardContent className="p-0">
//             <Skeleton className="h-[500px] w-full rounded-lg" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <Skeleton className="h-6 w-[150px]" />
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="flex items-center justify-between">
//                   <div className="space-y-2">
//                     <Skeleton className="h-4 w-[120px]" />
//                     <Skeleton className="h-3 w-[80px]" />
//                   </div>
//                   <Skeleton className="h-6 w-[60px]" />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export function FormSkeleton() {
//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[100px]" />
//         <Skeleton className="h-10 w-full" />
//       </div>

//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[120px]" />
//         <Skeleton className="h-24 w-full" />
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-[80px]" />
//           <Skeleton className="h-10 w-full" />
//         </div>
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-[90px]" />
//           <Skeleton className="h-10 w-full" />
//         </div>
//       </div>

//       <div className="flex justify-end space-x-2">
//         <Skeleton className="h-10 w-[80px]" />
//         <Skeleton className="h-10 w-[100px]" />
//       </div>
//     </div>
//   )
// }

// export function ChartSkeleton() {
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <Skeleton className="h-6 w-[150px]" />
//         <Skeleton className="h-8 w-[100px]" />
//       </div>
//       <Skeleton className="h-[300px] w-full" />
//       <div className="flex justify-center space-x-4">
//         {Array.from({ length: 3 }).map((_, i) => (
//           <div key={i} className="flex items-center space-x-2">
//             <Skeleton className="h-3 w-3 rounded-full" />
//             <Skeleton className="h-3 w-[60px]" />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function MetricsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-2" />
            <Skeleton className="h-3 w-[120px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function ActivityFeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-2 w-2 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-[60px]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function RecentReportsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
          <Skeleton className="h-6 w-[80px]" />
        </div>
      ))}
    </div>
  )
}

export function SystemStatusSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
            <Skeleton className="h-4 w-[40px]" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function GeospatialSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                  <Skeleton className="h-6 w-[60px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <MetricsSkeleton />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
          </CardHeader>
          <CardContent>
            <ActivityFeedSkeleton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      <div className="rounded-md border">
        <div className="border-b p-4">
          <div className="flex space-x-4">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-[100px]" />
            ))}
          </div>
        </div>

        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="border-b p-4 last:border-b-0">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-[100px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MapSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                  <Skeleton className="h-6 w-[60px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-24 w-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[90px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Skeleton className="h-10 w-[80px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <Skeleton className="h-[300px] w-full" />
      <div className="flex justify-center space-x-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-[60px]" />
          </div>
        ))}
      </div>
    </div>
  )
}
