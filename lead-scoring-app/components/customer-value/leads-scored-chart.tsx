"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts"
import { LeadsScoredOverTimeDataPoint } from "@/lib/mock-data-customer-value-forecast"

interface Props {
  data: LeadsScoredOverTimeDataPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
        <p className="font-medium text-slate-800 mb-1">{label}</p>
        <p className="text-orange-600 font-semibold">
          {new Intl.NumberFormat("en-US").format(payload[0].value)} leads
        </p>
      </div>
    )
  }
  return null
}

export function LeadsScoredChart({ data }: Props) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Count of leads to be scored created over time
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              angle={-35}
              textAnchor="end"
              height={60}
              label={{
                value: "First interaction date",
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
                value: "Count of leads",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: "middle", fill: "#64748b", fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#FF9933" radius={[4, 4, 0, 0]} barSize={32}>
              <LabelList
                dataKey="count"
                position="top"
                style={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
