"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from "recharts"
import { EstimatedConversionRateDataPoint } from "@/lib/mock-data-lead-conversion"
import { Info } from "lucide-react"

interface EstimatedConversionRateChartProps {
    data: EstimatedConversionRateDataPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
                <p className="font-medium text-slate-800 mb-1">{label}</p>
                <p className="text-malibu-600 font-semibold">
                    {payload[0].value.toFixed(2)}%
                </p>
            </div>
        )
    }
    return null
}

const formatYAxis = (tickItem: number) => {
    return `${tickItem}%`
}

export function EstimatedConversionRateChart({ data }: EstimatedConversionRateChartProps) {
    return (
        <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-800">
                    Estimated conversion rate per conversion model score
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 w-full pb-0 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="range"
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            tickLine={false}
                            axisLine={{ stroke: '#cbd5e1' }}
                            angle={-35}
                            textAnchor="end"
                            height={45}
                        />
                        <YAxis
                            tickFormatter={formatYAxis}
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            tickLine={false}
                            axisLine={true}
                            label={{
                                value: 'Estimated conv...',
                                angle: -90,
                                position: 'insideLeft',
                                style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 }
                            }}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(56, 189, 248, 0.05)' }}
                        />
                        <Bar
                            dataKey="rate"
                            radius={[2, 2, 0, 0]}
                            barSize={40}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="#A7D2E8" />
                            ))}
                            <LabelList
                                dataKey="rate"
                                position="top"
                                formatter={(val: any) => `${val}%`}
                                style={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
            <div className="px-6 pb-2 pt-0 text-center text-xs text-slate-500 font-medium">
                Conversion model score deciles
            </div>
        </Card>
    )
}
