"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { SemicircleGauge } from "@/components/ui/semicircle-gauge"
import { WhatIfData, WhatIfFeature } from "@/lib/mock-data-lead-conversion"
import { predictLeadConversion, LeadPredictionResult } from "@/lib/prediction-service"
import { Sliders, RotateCcw, Users, MousePointerClick, CalendarDays, TrendingUp, TrendingDown, Lightbulb, CheckCircle, XCircle, Loader2 } from "lucide-react"

interface WhatIfPredictionProps {
  data: WhatIfData
}

const groupConfig = {
  demographics: { label: "Demographics", icon: Users, order: 0 },
  engagement: { label: "Engagement", icon: MousePointerClick, order: 1 },
  timing: { label: "Timing", icon: CalendarDays, order: 2 },
} as const

function FeatureInput({ feature, value, onChange }: {
  feature: WhatIfFeature
  value: string | number
  onChange: (name: string, val: string | number) => void
}) {
  if (feature.type === "date") {
    return (
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600">{feature.displayName}</label>
        <input
          type="text"
          readOnly
          value={String(value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-slate-50 text-slate-700 cursor-default"
        />
      </div>
    )
  }

  if (feature.type === "select") {
    return (
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600">{feature.displayName}</label>
        <Select value={String(value)} onValueChange={(v) => onChange(feature.name, v)}>
          <SelectTrigger className="w-full h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {feature.options?.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  // number with slider
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-600">{feature.displayName}</label>
        <span className="text-xs font-bold text-[#1B7FB5] tabular-nums">{value}</span>
      </div>
      <Slider
        value={[Number(value)]}
        onValueChange={([v]) => onChange(feature.name, v)}
        min={feature.min ?? 0}
        max={feature.max ?? 100}
        step={1}
        className="flex-1"
      />
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{feature.min ?? 0}</span>
        <span>{feature.max ?? 100}</span>
      </div>
    </div>
  )
}

function InfluenceBar({ displayName, influence, maxAbs }: { displayName: string; influence: number; maxAbs: number }) {
  const pct = maxAbs > 0 ? (Math.abs(influence) / maxAbs) * 100 : 0
  const isPositive = influence > 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-600 w-[140px] shrink-0 truncate" title={displayName}>{displayName}</span>
      <div className="flex-1 h-5 bg-slate-50 rounded-full relative overflow-hidden">
        <div
          className={`absolute top-0 h-full rounded-full transition-all duration-500 ${
            isPositive ? "bg-emerald-400/80" : "bg-rose-400/80"
          }`}
          style={{ width: `${Math.max(pct, 4)}%` }}
        />
      </div>
      <div className="flex items-center gap-1 w-[50px] shrink-0 justify-end">
        {isPositive ? (
          <TrendingUp className="w-3 h-3 text-emerald-500" />
        ) : (
          <TrendingDown className="w-3 h-3 text-rose-500" />
        )}
        <span className={`text-[11px] font-semibold tabular-nums ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
          {Math.abs(influence)}%
        </span>
      </div>
    </div>
  )
}

export function WhatIfPrediction({ data }: WhatIfPredictionProps) {
  // Track feature values
  const [featureValues, setFeatureValues] = useState<Record<string, string | number>>(() => {
    const init: Record<string, string | number> = {}
    data.features.forEach((f) => { init[f.name] = f.value })
    return init
  })

  // Prediction result state
  const [result, setResult] = useState<LeadPredictionResult>({
    prediction: data.prediction,
    probabilityTrue: data.probabilityTrue,
    threshold: data.threshold,
    influentialFeatures: data.influentialFeatures,
    recommendations: data.recommendations,
  })
  const [isPredicting, setIsPredicting] = useState(false)

  // Debounce timer ref
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Trigger prediction when features change
  const runPrediction = useCallback(async (features: Record<string, string | number>) => {
    setIsPredicting(true)
    try {
      const res = await predictLeadConversion(features)
      setResult(res)
    } catch {
      // Keep previous result on error
    } finally {
      setIsPredicting(false)
    }
  }, [])

  // Debounced prediction on feature change
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      runPrediction(featureValues)
    }, 200) // 200ms debounce
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [featureValues, runPrediction])

  if (!data?.features) return null

  const handleChange = (name: string, val: string | number) => {
    setFeatureValues((prev) => ({ ...prev, [name]: val }))
  }

  const handleReset = () => {
    const init: Record<string, string | number> = {}
    data.features.forEach((f) => { init[f.name] = f.value })
    setFeatureValues(init)
  }

  const maxAbsInfluence = Math.max(...result.influentialFeatures.map((f) => Math.abs(f.influence)), 1)
  const isLikely = result.probabilityTrue >= result.threshold

  // Group features
  const grouped = useMemo(() => {
    const groups: Record<string, WhatIfFeature[]> = {}
    data.features.forEach((f) => {
      if (!groups[f.group]) groups[f.group] = []
      groups[f.group].push(f)
    })
    return Object.entries(groups).sort(
      ([a], [b]) => (groupConfig[a as keyof typeof groupConfig]?.order ?? 99) - (groupConfig[b as keyof typeof groupConfig]?.order ?? 99)
    )
  }, [data.features])

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col overflow-hidden">
      <CardHeader className="pb-3 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1B7FB5]/10 flex items-center justify-center">
              <Sliders className="w-4 h-4 text-[#1B7FB5]" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-800">
                Lead Simulator
              </CardTitle>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Adjust lead attributes to see how conversion probability changes
              </p>
            </div>
          </div>
          {isPredicting && (
            <Loader2 className="w-4 h-4 text-[#1B7FB5] animate-spin" />
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <div className="flex flex-col lg:flex-row">
          {/* ── Left: Lead Profile ── */}
          <div className="lg:w-[300px] shrink-0 p-5 space-y-5 overflow-y-auto max-h-[600px] bg-white border-r border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lead Profile</h4>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#1B7FB5] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {grouped.map(([groupKey, features]) => {
              const config = groupConfig[groupKey as keyof typeof groupConfig] ?? { label: groupKey, icon: Sliders, order: 99 }
              const Icon = config.icon
              return (
                <div key={groupKey} className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {config.label}
                    </span>
                  </div>
                  {features.map((f) => (
                    <FeatureInput
                      key={f.name}
                      feature={f}
                      value={featureValues[f.name]}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              )
            })}
          </div>

          {/* ── Right: Prediction Results ── */}
          <div className="flex-1 p-6 space-y-6">
            {/* Hero: Gauge + Verdict */}
            <div className="flex flex-col items-center">
              <SemicircleGauge
                value={result.probabilityTrue}
                threshold={result.threshold}
                size={240}
                label="Conversion Probability"
              />

              {/* Verdict Badge */}
              <div className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 ${
                isLikely
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-rose-50 border border-rose-200"
              }`}>
                {isLikely ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span className={`text-sm font-semibold ${
                  isLikely ? "text-emerald-700" : "text-rose-700"
                }`}>
                  {isLikely ? "Likely to Convert" : "Unlikely to Convert"}
                </span>
              </div>
            </div>

            {/* Key Drivers */}
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-3">
                What&apos;s Driving This Prediction?
              </h4>
              <div className="space-y-2">
                {result.influentialFeatures.map((f) => (
                  <InfluenceBar
                    key={f.feature}
                    displayName={f.displayName}
                    influence={f.influence}
                    maxAbs={maxAbsInfluence}
                  />
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div className="rounded-lg bg-blue-50/70 border border-blue-100 p-4 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-500" />
                  <h4 className="text-sm font-bold text-blue-800">Tips to Improve Conversion</h4>
                </div>
                <ul className="space-y-1.5">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="text-xs text-blue-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
