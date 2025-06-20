import { MapSkeleton } from "@/components/ui/loading-fallbacks"

export default function GeospatialLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-72 bg-muted animate-pulse rounded" />
        <div className="h-4 w-[500px] bg-muted animate-pulse rounded" />
      </div>

      {/* Map skeleton */}
      <MapSkeleton />
    </div>
  )
}
