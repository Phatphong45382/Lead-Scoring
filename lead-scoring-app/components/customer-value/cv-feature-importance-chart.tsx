"use client"

import { useState } from "react"
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
  Cell,
} from "recharts"
import { FeatureImportanceDataPoint } from "@/lib/mock-data-customer-value-evaluation"

interface Props {
  data: FeatureImportanceDataPoint[]
}

type Mode = "shapley" | "gini"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
        <p className="font-medium text-slate-800 mb-1">{label}</p>
        <p className="text-blue-600 font-semibold">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

export function CVFeatureImportanceChart({ data }: Props) {
  const [mode, setMode] = useState<Mode>("shapley")

  const chartData = [...data]
    .map((d) => ({
      variable: d.variable,
      importance: mode === "shapley" ? d.shapley : d.gini,
    }))
    .sort((a, b) => b.importance - a.importance)

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-800">
            Feature importance
          </CardTitle>
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => setMode("shapley")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === "shapley"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              SHAPLEY
            </button>
            <button
              onClick={() => setMode("gini")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                mode === "gini"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              GINI
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 w-full h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 40, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis
              type="number"
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              domain={[0, "dataMax + 5"]}
            />
            <YAxis
              dataKey="variable"
              type="category"
              tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              width={160}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(56, 189, 248, 0.05)" }}
            />
            <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={24}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill="#6699CC" />
              ))}
              <LabelList
                dataKey="importance"
                position="right"
                formatter={(val: any) => `${val}%`}
                style={{ fill: "#475569", fontSize: 11, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
