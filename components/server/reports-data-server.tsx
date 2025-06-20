import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TableSkeleton } from "@/components/ui/loading-fallbacks"

// Simulation d'un appel API pour les rapports
async function getReportsData() {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return [
    {
      id: "RPT-001",
      title: "Operation Thunder",
      status: "classified",
      priority: "high",
      createdAt: "2024-01-15",
      author: "Agent Smith",
    },
    {
      id: "RPT-002",
      title: "Surveillance Report Alpha",
      status: "pending",
      priority: "medium",
      createdAt: "2024-01-14",
      author: "Agent Johnson",
    },
    {
      id: "RPT-003",
      title: "Intelligence Briefing",
      status: "approved",
      priority: "high",
      createdAt: "2024-01-13",
      author: "Commander Davis",
    },
  ]
}

async function ReportsTableContent() {
  const reports = await getReportsData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">{report.title}</p>
                <p className="text-sm text-muted-foreground">
                  {report.id} • {report.author} • {report.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={report.priority === "high" ? "destructive" : "secondary"}>{report.priority}</Badge>
                <Badge variant={report.status === "approved" ? "default" : "outline"}>{report.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ReportsDataServer() {
  return (
    <Suspense fallback={<TableSkeleton rows={3} columns={1} />}>
      <ReportsTableContent />
    </Suspense>
  )
}
