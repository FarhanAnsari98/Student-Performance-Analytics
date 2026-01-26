"use client"

import * as React from 'react';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Student } from "@/lib/types"

interface StudentRiskChartProps {
  students: Student[];
}

const chartConfig = {
  count: {
    label: "Students",
  },
  low: {
    label: "Low Risk",
    color: "hsl(var(--chart-1))",
  },
  medium: {
    label: "Medium Risk",
    color: "hsl(var(--chart-2))",
  },
  high: {
    label: "High Risk",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function StudentRiskChart({ students }: StudentRiskChartProps) {
  const riskCounts = students.reduce((acc, student) => {
    if (student.riskLevel === 'LOW') acc.low++;
    if (student.riskLevel === 'MEDIUM') acc.medium++;
    if (student.riskLevel === 'HIGH') acc.high++;
    return acc;
  }, { low: 0, medium: 0, high: 0 });

  const chartData = [
    { risk: "Low", count: riskCounts.low, fill: "var(--color-low)" },
    { risk: "Medium", count: riskCounts.medium, fill: "var(--color-medium)" },
    { risk: "High", count: riskCounts.high, fill: "var(--color-high)" },
  ]

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} accessibilityLayer>
          <XAxis
            dataKey="risk"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <YAxis
             allowDecimals={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="count" radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
