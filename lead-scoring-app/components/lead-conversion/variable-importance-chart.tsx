"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from "recharts"
import { VariableImportanceDataPoint } from "@/lib/mock-data-lead-conversion"

interface VariableImportanceChartProps {
    data: VariableImportanceDataPoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-enterprise-md text-sm">
                <p className="font-medium text-slate-800 mb-1">{label}</p>
                <p className="text-malibu-600 font-semibold">
                    {payload[0].value}%
                </p>
            </div>
        )
    }
    return null
}

const formatXAxis = (tickItem: number) => {
    return `${tickItem}%`
}

export function VariableImportanceChart({ data }: VariableImportanceChartProps) {
    // Sort data descending by importance automatically just in case, though mock is sorted
    const sortedData = [...data].sort((a, b) => b.importance - a.importance)

    return (
        <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-800">
                    Variable importance
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={sortedData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis
                            type="number"
                            tickFormatter={formatXAxis}
                            tick={{ fontSize: 11, fill: '#64748b' }}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 'dataMax + 5']}
                        />
                        <YAxis
                            dataKey="variable"
                            type="category"
                            tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
                            tickLine={false}
                            axisLine={{ stroke: '#cbd5e1' }}
                            width={120}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(56, 189, 248, 0.05)' }}
                        />
                        <Bar
                            dataKey="importance"
                            radius={[0, 2, 2, 0]}
                            barSize={20}
                        >
                            {sortedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="#6699CC" />
                            ))}
                            <LabelList
                                dataKey="importance"
                                position="right"
                                formatter={(val: any) => `${val}%`}
                                style={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
