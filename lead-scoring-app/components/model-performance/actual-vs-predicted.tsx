"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActualVsPredictedData } from "@/lib/mock-data-model-performance"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Target } from "lucide-react"

interface ActualVsPredictedProps {
  data: ActualVsPredictedData
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string }> }) {
  if (!active || !payload?.length) return null
  const actual = payload.find((p) => p.name === "actual")
  const predicted = payload.find((p) => p.name === "predicted")
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-slate-500">Actual:</span>
        <span className="font-bold text-slate-800 tabular-nums">{actual?.value}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-slate-500">Predicted:</span>
        <span className="font-bold text-slate-800 tabular-nums">{predicted?.value}</span>
      </div>
    </div>
  )
}

export function ActualVsPredicted({ data }: ActualVsPredictedProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" style={{ color: data.color }} />
          <CardTitle className="text-sm font-bold text-slate-800">Actual vs Predicted</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <ResponsiveContainer width="100%" height={260}>
          <ScatterChart margin={{ top: 5, right: 10, bottom: 5, left: -5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              type="number"
              dataKey="actual"
              name="actual"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              label={{ value: "Actual", position: "insideBottom", offset: -2, fontSize: 10, fill: "#94a3b8" }}
            />
            <YAxis
              type="number"
              dataKey="predicted"
              name="predicted"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              label={{ value: "Predicted", angle: -90, position: "insideLeft", offset: 15, fontSize: 10, fill: "#94a3b8" }}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Perfect prediction line */}
            <ReferenceLine
              segment={[{ x: 0, y: 0 }, { x: 100, y: 100 }]}
              stroke="#94a3b8"
              strokeDasharray="5 5"
              strokeWidth={1.5}
            />
            <Scatter
              data={data.data}
              fill={data.color}
              fillOpacity={0.6}
              r={4}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-slate-400 text-center mt-1">Dashed line = perfect prediction</p>
      </CardContent>
    </Card>
  )
}
