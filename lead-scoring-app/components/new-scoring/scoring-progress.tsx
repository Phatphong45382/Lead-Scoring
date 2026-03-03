"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { KPICard } from "@/components/kpi-card"
import { ScoringJobStatus, ScoringResultData } from "@/lib/mock-data-new-scoring"
import Link from "next/link"
import { Play, Loader2, CheckCircle2, Download, Users, DollarSign, TrendingUp, Gem, Activity, ArrowRightLeft, Crown, RotateCcw, Upload } from "lucide-react"
import { useState } from "react"

interface ScoringProgressProps {
  jobStatus: ScoringJobStatus
  results: ScoringResultData | null
  onRunScoring: () => void
  onScoreAgain: () => void
  onPublish: () => void
  isRunning: boolean
  modelId: string
}

export function ScoringProgress({ jobStatus, results, onRunScoring, onScoreAgain, onPublish, isRunning, modelId }: ScoringProgressProps) {
  const isDone = jobStatus.status === "DONE" && results
  const [isPublished, setIsPublished] = useState(false)

  const handlePublish = () => {
    onPublish()
    setIsPublished(true)
  }

  return (
    <div className="space-y-6">
      {/* Run / Progress section */}
      {!isDone && (
        <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
          <CardContent className="p-8">
            {jobStatus.status === "IDLE" && (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-16 h-16 rounded-2xl bg-[#1B7FB5]/10 flex items-center justify-center">
                  <Play className="w-8 h-8 text-[#1B7FB5]" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-slate-700">Ready to score</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Click the button below to start the scoring process
                  </p>
                </div>
                <Button
                  onClick={onRunScoring}
                  className="mt-2 px-8 py-2.5 text-white font-semibold rounded-lg shadow-md"
                  style={{ background: "#1B7FB5" }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run Scoring
                </Button>
              </div>
            )}

            {isRunning && (
              <div className="flex flex-col items-center gap-5 py-6">
                <Loader2 className="w-12 h-12 text-[#1B7FB5] animate-spin" />
                <div className="text-center">
                  <p className="text-base font-semibold text-slate-700">Scoring in progress...</p>
                  <p className="text-sm text-slate-400 mt-1">{jobStatus.message || "Processing your leads"}</p>
                </div>
                {/* Progress bar */}
                <div className="w-full max-w-md">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Progress</span>
                    <span>{jobStatus.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${jobStatus.progress}%`,
                        background: "linear-gradient(90deg, #1B7FB5 0%, #3DB9EB 100%)",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {isDone && results && (
        <>
          {/* Success banner */}
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-700">Scoring completed successfully</p>
              <p className="text-xs text-emerald-600 mt-0.5">
                {results.summary.totalLeadsScored} leads scored at{" "}
                {new Date(results.summary.scoredAt).toLocaleString("en-GB", {
                  year: "numeric", month: "2-digit", day: "2-digit",
                  hour: "2-digit", minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <KPICard
              label="Total Leads Scored"
              value={results.summary.totalLeadsScored}
              format="number"
              icon={<Users className="w-4 h-4" />}
            />
            <KPICard
              label="Avg Conversion Rate"
              value={results.summary.avgConversionRate}
              format="percent"
              icon={<TrendingUp className="w-4 h-4" />}
            />
            <KPICard
              label="Avg Customer Value"
              value={results.summary.avgCustomerValue}
              format="number"
              suffix="EUR"
              icon={<DollarSign className="w-4 h-4" />}
            />
            <KPICard
              label="Avg Lead Value"
              value={results.summary.avgLeadValue}
              format="number"
              suffix="EUR"
              icon={<Gem className="w-4 h-4" />}
            />
          </div>

          {/* Results Table */}
          <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-800">
                  Scored Leads
                </CardTitle>
                <Button variant="outline" size="sm" className="text-xs">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-semibold">lead_id</TableHead>
                      <TableHead className="text-xs font-semibold text-right">estimated_conversion_rate</TableHead>
                      <TableHead className="text-xs font-semibold text-right">estimated_customer_value</TableHead>
                      <TableHead className="text-xs font-semibold text-right">lead_value</TableHead>
                      <TableHead className="text-xs font-semibold text-right">model_score</TableHead>
                      <TableHead className="text-xs font-semibold">region</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.leads.map((row) => (
                      <TableRow key={row.leadId}>
                        <TableCell className="text-xs font-mono text-slate-600 max-w-[180px] truncate">
                          {row.leadId}
                        </TableCell>
                        <TableCell className="text-xs text-right tabular-nums">
                          {row.estimatedConversionRate.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-xs text-right tabular-nums">
                          {row.estimatedCustomerValue.toFixed(2)} EUR
                        </TableCell>
                        <TableCell className="text-xs text-right tabular-nums font-medium">
                          {row.leadValue.toFixed(4)}
                        </TableCell>
                        <TableCell className="text-xs text-right tabular-nums">
                          {row.conversionModelScore.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-xs text-slate-600">
                          {row.region}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* ── Post-scoring Actions ── */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h4 className="text-sm font-bold text-slate-700 mb-3">What's next?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Publish to Dashboard */}
              <button
                onClick={handlePublish}
                disabled={isPublished}
                className={`flex items-center gap-3 bg-white rounded-lg border p-4 transition-all group text-left ${
                  isPublished
                    ? "border-emerald-200 bg-emerald-50/50 cursor-default"
                    : "border-[#1B7FB5]/30 hover:shadow-md hover:border-[#1B7FB5]/50 ring-1 ring-[#1B7FB5]/10"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isPublished ? "bg-emerald-100" : "bg-[#1B7FB5]/10 group-hover:bg-[#1B7FB5]/20"
                }`}>
                  {isPublished
                    ? <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                    : <Upload className="w-4.5 h-4.5 text-[#1B7FB5]" />
                  }
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {isPublished ? "Published" : "Publish to Dashboard"}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {isPublished ? "All dashboards have been updated" : "Update all dashboard pages with new data"}
                  </p>
                </div>
              </button>

              {/* Model Performance */}
              <Link
                href="/model-performance"
                className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-[#1B7FB5]/30 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <Activity className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Model Performance</p>
                  <p className="text-[11px] text-slate-400">Deep dive into model metrics</p>
                </div>
              </Link>

              {/* Score Again */}
              <button
                onClick={onScoreAgain}
                className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-[#1B7FB5]/30 transition-all group text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                  <RotateCcw className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Score Again</p>
                  <p className="text-[11px] text-slate-400">Upload new data & re-score</p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
