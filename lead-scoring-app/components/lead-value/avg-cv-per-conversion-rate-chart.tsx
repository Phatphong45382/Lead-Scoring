"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { AvgCVPerConversionRateDataPoint } from "@/lib/mock-data-lead-value"

interface Props {
  data: AvgCVPerConversionRateDataPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
        <p className="font-medium text-slate-800 mb-2">Estimated conversion rate: {label}%</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color }} className="font-semibold">
            {entry.name}: {entry.dataKey === "avgEstimatedCustomerValue" ? `${entry.value} EUR` : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function AvgCVPerConversionRateChart({ data }: Props) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-800">
          Avg estimated CV & lead count per conversion rate
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 w-full">
        <ResponsiveContainer width="100%" height={340}>
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="estimatedConversionRate"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              label={{
                value: "Estimated conversion rate (%)",
                position: "insideBottom",
                offset: -20,
                style: { fill: "#64748b", fontSize: 12, fontWeight: 500 },
              }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              label={{
                value: "Lead count",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle", fill: "#F9A825", fontSize: 12 },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              label={{
                value: "Average estimated custo...",
                angle: 90,
                position: "insideRight",
                offset: 10,
                style: { textAnchor: "middle", fill: "#6B5CA5", fontSize: 12 },
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
            <Bar
              yAxisId="left"
              dataKey="leadCount"
              name="Lead count (L)"
              fill="#FFD699"
              radius={[2, 2, 0, 0]}
              barSize={36}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgEstimatedCustomerValue"
              name="Average estimated customer value (R)"
              stroke="#6B5CA5"
              strokeWidth={2}
              dot={{ r: 3, fill: "#6B5CA5" }}
              activeDot={{ r: 5, fill: "#6B5CA5", stroke: "#fff", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
