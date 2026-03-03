"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfusionMatrixData } from "@/lib/mock-data-lead-conversion"
import { CheckCircle2, AlertTriangle, Clock, ShieldCheck } from "lucide-react"

interface ConfusionMatrixChartProps {
    data: ConfusionMatrixData
}

type ViewMode = 'summary' | 'heatmap';

export function ConfusionMatrixChart({ data }: ConfusionMatrixChartProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('summary');

    // Calculate metrics
    const total = data.grandTotal;
    const tp = data.actualTruePredictedTrue;
    const tn = data.actualFalsePredictedFalse;
    const fp = data.actualFalsePredictedTrue;
    const fn = data.actualTruePredictedFalse;
    // Helper functions for formatting
    const pct = (value: number) => ((value / total) * 100).toFixed(1) + '%';
    const displayValue = (val: number) => val.toLocaleString();

    // Color intensity helpers based on percentage of total for heatmap
    const getGreenIntensity = (val: number) => {
        const p = val / total;
        if (p > 0.5) return 'bg-emerald-100/80 border-emerald-300';
        if (p > 0.2) return 'bg-emerald-50 border-emerald-200';
        return 'bg-emerald-50/50 border-emerald-100';
    }

    const getRedIntensity = (val: number) => {
        const p = val / total;
        if (p > 0.2) return 'bg-rose-100/80 border-rose-300';
        if (p > 0.05) return 'bg-rose-50 border-rose-200';
        return 'bg-rose-50/50 border-rose-100';
    }

    return (
        <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col h-full">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row flex-wrap items-center justify-between gap-4">
                <CardTitle className="text-base font-semibold text-slate-800">
                    Model Impact Analysis
                </CardTitle>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200 uppercase tracking-wider">
                        Cut-off: {data.threshold.toFixed(2)}
                    </span>
                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                        <button
                            onClick={() => setViewMode('summary')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${viewMode === 'summary' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Summary
                        </button>
                        <button
                            onClick={() => setViewMode('heatmap')}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${viewMode === 'heatmap' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Heatmap
                        </button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0 flex-1 flex flex-col">

                {viewMode === 'summary' ? (
                    /* ── Impact Rows (Summary View) ── */
                    <div className="flex-1 flex flex-col p-4 gap-2.5">

                        {/* Row 1: TP */}
                        <div className="flex items-center p-2.5 rounded-lg border border-emerald-100 bg-emerald-50/50 shadow-sm transition-all hover:shadow-md hover:bg-emerald-50">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mr-4">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-sm font-bold text-slate-800 truncate">Correctly Identified Conversions</h4>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded leading-none shrink-0">TP</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">Leads the model correctly predicted would convert</p>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xl font-bold text-emerald-700">{displayValue(tp)}</div>
                                <div className="text-[11px] font-medium text-emerald-600/80 mt-0.5">{pct(tp)}</div>
                            </div>
                        </div>

                        {/* Row 2: FN */}
                        <div className="flex items-center p-2.5 rounded-lg border border-amber-100 bg-amber-50/50 shadow-sm transition-all hover:shadow-md hover:bg-amber-50">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mr-4">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-sm font-bold text-slate-800 truncate">Missed Opportunities</h4>
                                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded leading-none shrink-0">FN</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">Leads that converted but the model missed</p>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xl font-bold text-amber-700">{displayValue(fn)}</div>
                                <div className="text-[11px] font-medium text-amber-600/80 mt-0.5">{pct(fn)}</div>
                            </div>
                        </div>

                        {/* Row 3: FP */}
                        <div className="flex items-center p-2.5 rounded-lg border border-rose-100 bg-rose-50/50 shadow-sm transition-all hover:shadow-md hover:bg-rose-50">
                            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mr-4">
                                <Clock className="w-5 h-5 text-rose-600" />
                            </div>
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-sm font-bold text-slate-800 truncate">Wasted Sales Effort</h4>
                                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded leading-none shrink-0">FP</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">Leads flagged by model but didn't convert</p>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xl font-bold text-rose-700">{displayValue(fp)}</div>
                                <div className="text-[11px] font-medium text-rose-600/80 mt-0.5">{pct(fp)}</div>
                            </div>
                        </div>

                        {/* Row 4: TN */}
                        <div className="flex items-center p-2.5 rounded-lg border border-slate-200 bg-slate-50 shadow-sm transition-all hover:shadow-md hover:bg-slate-100/50">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mr-4">
                                <ShieldCheck className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-sm font-bold text-slate-800 truncate">Correctly Filtered Out</h4>
                                    <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded leading-none shrink-0">TN</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">Non-converting leads correctly ignored</p>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xl font-bold text-slate-700">{displayValue(tn)}</div>
                                <div className="text-[11px] font-medium text-slate-500 mt-0.5">{pct(tn)}</div>
                            </div>
                        </div>

                    </div>
                ) : (
                    /* ── Heatmap Grid (Matrix View) ── */
                    <div className="flex-1 flex flex-col items-center justify-center p-5 pt-3">
                        <div className="relative flex max-w-[340px] w-full">

                            {/* Y-Axis Label */}
                            <div className="w-8 flex items-center justify-center -ml-4 mr-1">
                                <span className="-rotate-90 text-[11px] font-bold text-slate-500 tracking-wider whitespace-nowrap">
                                    ACTUAL
                                </span>
                            </div>

                            <div className="flex-1 flex flex-col pt-1">
                                {/* X-Axis Label */}
                                <div className="h-5 flex items-center justify-center mb-1">
                                    <span className="text-[11px] font-bold text-slate-500 tracking-wider">PREDICTED</span>
                                </div>

                                {/* Core Grid */}
                                <div className="flex-1 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-0">
                                    {/* Top-Left Headers */}
                                    <div className="w-16 sm:w-20"></div>
                                    <div className="grid grid-cols-2 text-center pb-1">
                                        <div className="text-xs font-semibold text-slate-700">Positive</div>
                                        <div className="text-xs font-semibold text-slate-700">Negative</div>
                                    </div>

                                    {/* Row 1: Actual Positive */}
                                    <div className="flex items-center justify-end pr-2 pb-1.5">
                                        <div className="text-xs font-semibold text-slate-700 text-right">Positive</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1.5 pb-1.5">
                                        {/* True Positive */}
                                        <div className={`rounded-lg border ${getGreenIntensity(tp)} p-3 flex flex-col justify-between transition-colors min-h-[90px]`}>
                                            <div className="flex justify-between items-start">
                                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/50 px-1.5 py-0.5 rounded leading-none">TP</span>
                                                <span className="text-[10px] font-medium text-emerald-600 leading-none mt-0.5 hidden sm:inline-block">True Pos</span>
                                            </div>
                                            <div className="text-center mt-2">
                                                <div className="text-xl sm:text-2xl font-bold text-emerald-700 leading-tight">{displayValue(tp)}</div>
                                                <div className="text-[10px] text-emerald-600/80 font-medium mt-0.5">{pct(tp)}</div>
                                            </div>
                                        </div>
                                        {/* False Negative */}
                                        <div className={`rounded-lg border ${getRedIntensity(fn)} p-3 flex flex-col justify-between transition-colors min-h-[90px]`}>
                                            <div className="flex justify-between items-start">
                                                <span className="text-[10px] font-medium text-rose-600 leading-none mt-0.5 hidden sm:inline-block">False Neg</span>
                                                <span className="text-[10px] font-bold text-rose-700 bg-rose-100/50 px-1.5 py-0.5 rounded leading-none">FN</span>
                                            </div>
                                            <div className="text-center mt-2">
                                                <div className="text-xl sm:text-2xl font-bold text-rose-700 leading-tight">{displayValue(fn)}</div>
                                                <div className="text-[10px] text-rose-600/80 font-medium mt-0.5">{pct(fn)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2: Actual Negative */}
                                    <div className="flex items-center justify-end pr-2">
                                        <div className="text-xs font-semibold text-slate-700 text-right">Negative</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {/* False Positive */}
                                        <div className={`rounded-lg border ${getRedIntensity(fp)} p-3 flex flex-col justify-between transition-colors min-h-[90px]`}>
                                            <div className="flex justify-between items-start">
                                                <span className="text-[10px] font-bold text-rose-700 bg-rose-100/50 px-1.5 py-0.5 rounded leading-none">FP</span>
                                                <span className="text-[10px] font-medium text-rose-600 leading-none mt-0.5 hidden sm:inline-block">False Pos</span>
                                            </div>
                                            <div className="text-center mt-2">
                                                <div className="text-xl sm:text-2xl font-bold text-rose-700 leading-tight">{displayValue(fp)}</div>
                                                <div className="text-[10px] text-rose-600/80 font-medium mt-0.5">{pct(fp)}</div>
                                            </div>
                                        </div>
                                        {/* True Negative */}
                                        <div className={`rounded-lg border ${getGreenIntensity(tn)} p-3 flex flex-col justify-between transition-colors min-h-[90px]`}>
                                            <div className="flex justify-between items-start">
                                                <span className="text-[10px] font-medium text-emerald-600 leading-none mt-0.5 hidden sm:inline-block">True Neg</span>
                                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/50 px-1.5 py-0.5 rounded leading-none">TN</span>
                                            </div>
                                            <div className="text-center mt-2">
                                                <div className="text-xl sm:text-2xl font-bold text-emerald-700 leading-tight">{displayValue(tn)}</div>
                                                <div className="text-[10px] text-emerald-600/80 font-medium mt-0.5">{pct(tn)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </CardContent>
        </Card>
    )
}
