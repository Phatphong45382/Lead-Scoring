"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RetrainRecommendationData } from "@/lib/mock-data-monitoring"
import {
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRightLeft,
  Crown,
  Sparkles,
  RotateCcw,
  Clock,
  ChevronRight,
} from "lucide-react"

interface RetrainRecommendationProps {
  recommendations: RetrainRecommendationData[]
}

const recommendationConfig = {
  not_needed: {
    label: "No Retrain Needed",
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    badgeBg: "bg-emerald-100",
    accentColor: "#10b981",
  },
  recommended: {
    label: "Retrain Recommended",
    icon: AlertTriangle,
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    badgeBg: "bg-amber-100",
    accentColor: "#f59e0b",
  },
  urgent: {
    label: "Urgent Retrain Needed",
    icon: XCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badgeBg: "bg-red-100",
    accentColor: "#ef4444",
  },
}

const signalStatusIcon = {
  ok: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
  warning: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
  critical: <XCircle className="w-3.5 h-3.5 text-red-500" />,
}

export function RetrainRecommendation({ recommendations }: RetrainRecommendationProps) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-[#1B7FB5]" />
          <CardTitle className="text-sm font-bold text-slate-800">Retrain Recommendation Engine</CardTitle>
          <span className="text-[10px] text-slate-400">Automated model health assessment</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4">
        {recommendations.map((rec) => {
          const config = recommendationConfig[rec.recommendation]
          const RecIcon = config.icon
          const warningCount = rec.signals.filter((s) => s.status !== "ok").length

          return (
            <div
              key={rec.modelId}
              className={`rounded-xl border ${config.border} ${config.bg} p-4`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  {rec.modelId === "lead_conversion"
                    ? <ArrowRightLeft className="w-4 h-4 text-[#1B7FB5]" />
                    : <Crown className="w-4 h-4 text-[#6B5CA5]" />
                  }
                  <span className="text-sm font-bold text-slate-800">{rec.modelName}</span>
                  <span className="text-[10px] text-slate-400">
                    <Clock className="w-3 h-3 inline mr-0.5" />
                    {rec.lastTrainedDaysAgo}d ago
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.badgeBg}`}>
                  <RecIcon className={`w-3.5 h-3.5 ${config.text}`} />
                  <span className={`text-[11px] font-bold ${config.text}`}>{config.label}</span>
                </div>
              </div>

              {/* Confidence bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-slate-500">Recommendation Confidence</span>
                  <span className="text-[11px] font-bold text-slate-700">{(rec.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${rec.confidence * 100}%`,
                      background: config.accentColor,
                    }}
                  />
                </div>
              </div>

              {/* Signals */}
              <div className="space-y-1.5 mb-3">
                {rec.signals.map((signal) => (
                  <div
                    key={signal.signal}
                    className="flex items-start gap-2.5 bg-white/60 rounded-lg px-3 py-2 border border-white"
                  >
                    {signalStatusIcon[signal.status]}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-700">{signal.signal}</span>
                        <span className="text-[10px] text-slate-400 font-mono">weight: {signal.weight.toFixed(2)}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{signal.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] text-slate-600">
                    Estimated improvement: <strong className="text-slate-800">{rec.estimatedImprovement}</strong>
                  </span>
                </div>
                {rec.recommendation !== "not_needed" && (
                  <Button
                    size="sm"
                    className="h-7 text-[11px] font-semibold text-white gap-1 cursor-pointer"
                    style={{ background: rec.modelId === "lead_conversion" ? "#1B7FB5" : "#6B5CA5" }}
                  >
                    <RotateCcw className="w-3 h-3" />
                    Trigger Retrain
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
