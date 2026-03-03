"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts"
import { DensityChartData } from "@/lib/mock-data-lead-conversion"

interface DensityChartProps {
  data: DensityChartData
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
        <p className="font-medium text-slate-800 mb-1">
          Predicted probability: {label}
        </p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color }} className="font-semibold">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DensityChart({ data }: DensityChartProps) {
  if (!data?.points) return null

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Density chart
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-1 w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.points}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="gradFalse" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradTrue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="x"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              label={{
                value: "Predicted probability",
                position: "insideBottom",
                offset: -20,
                style: { fill: "#64748b", fontSize: 12, fontWeight: 500 },
              }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              label={{
                value: "Probability density",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle", fill: "#64748b", fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value: string) => (
                <span className="text-sm text-slate-700 font-medium">{value}</span>
              )}
            />
            <ReferenceLine
              x={data.threshold}
              stroke="#1e293b"
              strokeDasharray="6 4"
              strokeWidth={1.5}
              label={{
                value: `Threshold`,
                position: "top",
                style: { fill: "#1e293b", fontSize: 11, fontWeight: 600 },
              }}
            />
            <Area
              type="monotone"
              dataKey="classFalse"
              name="For class false"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#gradFalse)"
              dot={false}
              activeDot={{ r: 4, fill: "#3B82F6" }}
            />
            <Area
              type="monotone"
              dataKey="classTrue"
              name="For class true"
              stroke="#F97316"
              strokeWidth={2}
              fill="url(#gradTrue)"
              dot={false}
              activeDot={{ r: 4, fill: "#F97316" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
