
"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Protocol } from "@/lib/mock-data"

interface ProtocolTvlChartProps {
  protocols: Protocol[]
}

const chartConfig = {
  tvl: {
    label: "TVL",
  },
} satisfies ChartConfig

// Dynamically generate chart colors based on the number of protocols
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export default function ProtocolTvlChart({ protocols }: ProtocolTvlChartProps) {
  const chartData = protocols.map((p) => ({
    name: p.name,
    tvl: p.tvl,
    fill: `var(--color-${p.name.toLowerCase()})`,
  }));

  // Add dynamic color mapping to chartConfig
  protocols.forEach((p, i) => {
    chartConfig[p.name.toLowerCase() as keyof typeof chartConfig] = {
      label: p.name,
      color: COLORS[i % COLORS.length],
    };
  });

  const totalTvl = protocols.reduce((acc, p) => acc + p.tvl, 0)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline text-2xl">Protocol TVL Distribution</CardTitle>
        <CardDescription>An overview of where value is locked.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tvl"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center justify-center gap-2 font-medium leading-none">
          Total TVL: ${ (totalTvl / 1e9).toFixed(2) }B <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing TVL distribution for {protocols.length} protocols
        </div>
      </CardFooter>
    </Card>
  )
}
