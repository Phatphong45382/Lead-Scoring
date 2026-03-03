"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScoreDistributionData } from "@/lib/mock-data-model-performance"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { BarChart2 } from "lucide-react"

interface ScoreDistributionProps {
  data: ScoreDistributionData
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1.5">Score: {label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-bold text-slate-800 tabular-nums">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export function ScoreDistribution({ data }: ScoreDistributionProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4" style={{ color: data.color }} />
          <CardTitle className="text-sm font-bold text-slate-800">Score Distribution</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.data} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 10 }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="converted"
              name="Converted"
              stackId="score"
              fill={data.color}
              fillOpacity={0.85}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="notConverted"
              name="Not Converted"
              stackId="score"
              fill="#cbd5e1"
              fillOpacity={0.7}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
