"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/data-context";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Legend, Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

export default function AnalyticsPage() {
  const { students, classes } = useData();

  const classAnalytics = classes.map(c => {
    const classStudents = students.filter(s => s.classId === c.id);
    const totalStudents = classStudents.length;
    if (totalStudents === 0) {
      return { name: c.name, avgScore: 0, avgAttendance: 0 };
    }
    const totalScore = classStudents.reduce((acc, s) => acc + s.averageScore, 0);
    const totalAttendance = classStudents.reduce((acc, s) => acc + s.attendancePercentage, 0);
    return {
      name: c.name,
      avgScore: parseFloat((totalScore / totalStudents).toFixed(1)),
      avgAttendance: parseFloat((totalAttendance / totalStudents).toFixed(1)),
    };
  });

  const analyticsChartConfig = {
    avgScore: {
      label: "Avg. Score",
      color: "hsl(var(--chart-1))",
    },
     avgAttendance: {
      label: "Avg. Attendance",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const performanceDistribution = students.reduce((acc, student) => {
    if (student.averageScore >= 90) acc.excellent++;
    else if (student.averageScore >= 80) acc.good++;
    else if (student.averageScore >= 70) acc.satisfactory++;
    else acc.needsImprovement++;
    return acc;
  }, { excellent: 0, good: 0, satisfactory: 0, needsImprovement: 0 });

  const performanceData = [
    { name: 'Excellent (90+)', value: performanceDistribution.excellent, fill: "hsl(var(--chart-1))" },
    { name: 'Good (80-89)', value: performanceDistribution.good, fill: "hsl(var(--chart-2))"  },
    { name: 'Satisfactory (70-79)', value: performanceDistribution.satisfactory, fill: "hsl(var(--chart-4))"  },
    { name: 'Needs Improvement (<70)', value: performanceDistribution.needsImprovement, fill: "hsl(var(--chart-3))"  },
  ];

   const performanceChartConfig = {
    value: {
      label: "Students",
    },
    'Excellent (90+)': {
      label: "Excellent (90+)",
      color: "hsl(var(--chart-1))",
    },
    'Good (80-89)': {
      label: "Good (80-89)",
      color: "hsl(var(--chart-2))",
    },
    'Satisfactory (70-79)': {
      label: "Satisfactory (70-79)",
      color: "hsl(var(--chart-4))",
    },
    'Needs Improvement (<70)': {
      label: "Needs Improvement (<70)",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">School Analytics</h1>
        <p className="text-muted-foreground">
          Aggregated data for school-wide performance analysis.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Average Score by Class</CardTitle>
            <CardDescription>Comparing academic performance across classes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsChartConfig} className="min-h-[300px] w-full">
              <BarChart data={classAnalytics} accessibilityLayer margin={{ bottom: 20 }}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} angle={-45} textAnchor="end" height={50}/>
                <YAxis unit="%" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="avgScore" fill="var(--color-avgScore)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Attendance by Class</CardTitle>
            <CardDescription>Tracking student presence across classes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsChartConfig} className="min-h-[300px] w-full">
              <BarChart data={classAnalytics} accessibilityLayer margin={{ bottom: 20 }}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} angle={-45} textAnchor="end" height={50} />
                <YAxis unit="%" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="avgAttendance" fill="var(--color-avgAttendance)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Overall Student Performance Distribution</CardTitle>
            <CardDescription>A look at the distribution of student scores across the school.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
            <ChartContainer
                config={performanceChartConfig}
                className="mx-auto aspect-square max-h-[350px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel nameKey="name" />}
                    />
                    <Pie
                        data={performanceData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                         {performanceData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
