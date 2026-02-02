"use client"

import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { SubjectScore } from "@/lib/types"

interface SubjectPerformanceChartProps {
  scores: SubjectScore[];
}

const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function SubjectPerformanceChart({ scores }: SubjectPerformanceChartProps) {
    if (!scores || scores.length === 0) {
        return (
            <div className="flex items-center justify-center mx-auto aspect-square max-h-[350px] text-muted-foreground">
                No score data available.
            </div>
        );
    }

    const chartData = scores.map(s => ({
        subject: s.subject.split(" ").slice(0,2).join(" "),
        score: s.score,
        fullMark: 100,
    }));
    
    return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <PolarAngleAxis dataKey="subject" />
            <PolarGrid />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
    )
}
