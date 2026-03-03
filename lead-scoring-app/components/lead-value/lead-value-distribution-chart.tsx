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
} from "recharts"
import { LeadValueDistributionDataPoint } from "@/lib/mock-data-lead-value"

interface Props {
  data: LeadValueDistributionDataPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
        <p className="font-medium text-slate-800 mb-1">Lead value: {label}</p>
        <p className="text-emerald-600 font-semibold">
          {new Intl.NumberFormat("en-US").format(payload[0].value)} leads
        </p>
      </div>
    )
  }
  return null
}

export function LeadValueDistributionChart({ data }: Props) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Lead value distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 w-full">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="gradLeadValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#86efac" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#86efac" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="value"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              label={{
                value: "Lead value",
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
                value: "Count of lead",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle", fill: "#64748b", fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#4ade80"
              strokeWidth={2}
              fill="url(#gradLeadValue)"
              dot={false}
              activeDot={{ r: 4, fill: "#22c55e" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
