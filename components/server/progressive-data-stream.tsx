import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Différents niveaux de données qui se chargent progressivement
async function QuickData() {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { count: 42, label: "Quick metrics loaded" }
}

async function MediumData() {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return { count: 128, label: "Medium data loaded" }
}

async function SlowData() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return { count: 256, label: "Heavy computation completed" }
}

async function QuickDataContent() {
  const data = await QuickData()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.count}</div>
        <p className="text-sm text-muted-foreground">{data.label}</p>
      </CardContent>
    </Card>
  )
}

async function MediumDataContent() {
  const data = await MediumData()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medium Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.count}</div>
        <p className="text-sm text-muted-foreground">{data.label}</p>
      </CardContent>
    </Card>
  )
}

async function SlowDataContent() {
  const data = await SlowData()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Heavy Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.count}</div>
        <p className="text-sm text-muted-foreground">{data.label}</p>
      </CardContent>
    </Card>
  )
}

function DataSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
      </CardContent>
    </Card>
  )
}

export function ProgressiveDataStream() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Données rapides - se chargent en premier */}
      <Suspense fallback={<DataSkeleton />}>
        <QuickDataContent />
      </Suspense>

      {/* Données moyennes - se chargent ensuite */}
      <Suspense fallback={<DataSkeleton />}>
        <MediumDataContent />
      </Suspense>

      {/* Données lentes - se chargent en dernier */}
      <Suspense fallback={<DataSkeleton />}>
        <SlowDataContent />
      </Suspense>
    </div>
  )
}
