"use client"

import { useState } from "react"
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
import { ValueByCategoryData } from "@/lib/mock-data-customer-value"

interface ValueByCategoryChartProps {
  data: ValueByCategoryData
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
        <p className="font-medium text-slate-800 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color }} className="font-semibold">
            {entry.name}: {entry.dataKey === "avgCustomerValue" ? `${entry.value} EUR` : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function ValueByCategoryChart({ data }: ValueByCategoryChartProps) {
  const [selectedFilter, setSelectedFilter] = useState(data.selectedFilter)
  const chartData = data.data[selectedFilter] ?? []

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Customer count and average customer value by category
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 flex-1">
        <div className="flex flex-col lg:flex-row gap-5 h-full">
          {/* Filter panel */}
          <div className="lg:w-[200px] shrink-0">
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Filters</h4>
              <p className="text-xs text-slate-500 mb-2">optional_column_na...</p>
              <div className="space-y-2">
                {data.filterOptions.map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="categoryFilter"
                      value={opt.key}
                      checked={selectedFilter === opt.key}
                      onChange={() => setSelectedFilter(opt.key)}
                      className="w-3.5 h-3.5 text-blue-600 accent-blue-600"
                    />
                    <span className={`text-sm ${selectedFilter === opt.key ? "text-slate-900 font-medium" : "text-slate-600"} group-hover:text-slate-900`}>
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                  label={{
                    value: "Customers count",
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
                    value: "Average customer value",
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
                  dataKey="customersCount"
                  name="Customers count (L)"
                  fill="#FFD699"
                  radius={[2, 2, 0, 0]}
                  barSize={60}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgCustomerValue"
                  name="Average customer value (R)"
                  stroke="#6B5CA5"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#6B5CA5" }}
                  activeDot={{ r: 5, fill: "#6B5CA5", stroke: "#fff", strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
