"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { AvgValueByDateDataPoint } from "@/lib/mock-data-customer-value"

interface AvgValueByDateChartProps {
  data: AvgValueByDateDataPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
        <p className="font-medium text-slate-800 mb-1">{label}</p>
        <p className="text-indigo-600 font-semibold">
          {payload[0].value.toFixed(1)} EUR
        </p>
      </div>
    )
  }
  return null
}

export function AvgValueByDateChart({ data }: AvgValueByDateChartProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Average customer value by creation date
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 w-full">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              angle={-35}
              textAnchor="end"
              height={60}
              interval={2}
              label={{
                value: "Creation date",
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
                value: "Average customer value",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle", fill: "#64748b", fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="avgValue"
              stroke="#6B5CA5"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, fill: "#6B5CA5", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
