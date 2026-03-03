"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ScatterPlotDataPoint } from "@/lib/mock-data-customer-value-evaluation"

interface Props {
  data: ScatterPlotDataPoint[]
}

function getErrorColor(error: number): string {
  if (error < 50) return "#22c55e"   // green – low error
  if (error < 100) return "#eab308"  // yellow
  if (error < 150) return "#f97316"  // orange
  return "#ef4444"                    // red – high error
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload as ScatterPlotDataPoint
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
        <p className="text-slate-600">
          Actual: <span className="font-semibold text-slate-800">{d.actualValue.toFixed(2)}</span>
        </p>
        <p className="text-slate-600">
          Predicted: <span className="font-semibold text-slate-800">{d.predictedValue.toFixed(2)}</span>
        </p>
        <p className="text-slate-600">
          Error: <span className="font-semibold" style={{ color: getErrorColor(d.error) }}>{d.error.toFixed(2)}</span>
        </p>
      </div>
    )
  }
  return null
}

interface CustomDotProps {
  cx?: number
  cy?: number
  payload?: ScatterPlotDataPoint
}

function CustomDot({ cx, cy, payload }: CustomDotProps) {
  if (!payload || cx === undefined || cy === undefined) return null
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill={getErrorColor(payload.error)}
      fillOpacity={0.7}
      stroke={getErrorColor(payload.error)}
      strokeWidth={1}
    />
  )
}

export function ScatterPlotChart({ data }: Props) {
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.actualValue, d.predictedValue))
  )
  const domainMax = Math.ceil(maxVal / 100) * 100 + 100

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Actual values vs Predicted values
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 w-full">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="actualValue"
              type="number"
              name="Actual"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              domain={[0, domainMax]}
              label={{
                value: "Actual values",
                position: "insideBottom",
                offset: -20,
                style: { fill: "#64748b", fontSize: 12, fontWeight: 500 },
              }}
            />
            <YAxis
              dataKey="predictedValue"
              type="number"
              name="Predicted"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
              domain={[0, domainMax]}
              label={{
                value: "Predicted values",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle", fill: "#64748b", fontSize: 12 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Diagonal reference line (perfect prediction) */}
            <ReferenceLine
              segment={[
                { x: 0, y: 0 },
                { x: domainMax, y: domainMax },
              ]}
              stroke="#ef4444"
              strokeWidth={1.5}
              strokeDasharray="6 3"
            />
            <Scatter
              data={data}
              shape={<CustomDot />}
            />
          </ScatterChart>
        </ResponsiveContainer>
        {/* Color legend */}
        <div className="flex items-center justify-center gap-5 mt-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Low error</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Very high</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 border-t-2 border-dashed border-red-500" />
            <span>Perfect prediction</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
