import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">School Analytics</h1>
        <p className="text-muted-foreground">
          Aggregated data for school-wide performance analysis.
        </p>
      </div>
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            This section will contain aggregated analytics and visualizations for administrators.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <BarChart3 className="w-16 h-16 mb-4" />
          <p className="text-lg font-semibold">Coming Soon</p>
          <p>Detailed charts and data summaries will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
