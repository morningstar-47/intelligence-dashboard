import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Radar, Satellite } from "lucide-react"
import { MapSkeleton } from "@/components/ui/loading-fallbacks"

async function getGeospatialData() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    activeZones: 15,
    satelliteFeeds: 8,
    threatLevels: {
      low: 12,
      medium: 2,
      high: 1,
    },
    recentActivity: [
      { id: 1, location: "Zone Alpha", type: "Movement detected", time: "2 min ago" },
      { id: 2, location: "Zone Beta", type: "Satellite update", time: "5 min ago" },
      { id: 3, location: "Zone Gamma", type: "Perimeter breach", time: "12 min ago" },
    ],
  }
}

async function GeospatialContent() {
  const data = await getGeospatialData()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Active Zones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.activeZones}</div>
          <p className="text-sm text-muted-foreground">Zones under surveillance</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Satellite className="h-5 w-5" />
            Satellite Feeds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.satelliteFeeds}</div>
          <p className="text-sm text-muted-foreground">Live feeds active</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{activity.location}</p>
                  <p className="text-sm text-muted-foreground">{activity.type}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function GeospatialDataServer() {
  return (
    <Suspense fallback={<MapSkeleton />}>
      <GeospatialContent />
    </Suspense>
  )
}
