"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { CVWhatIfData, CVWhatIfFeature } from "@/lib/mock-data-customer-value-evaluation"
import { predictCustomerValue, CustomerValuePredictionResult, ValueTier } from "@/lib/prediction-service"
import { Sliders, RotateCcw, Users, MapPin, Wallet, TrendingUp, TrendingDown, Lightbulb, Crown, Star, CircleDot, Loader2 } from "lucide-react"

interface Props {
  data: CVWhatIfData
}

const groupConfig = {
  demographics: { label: "Demographics", icon: Users, order: 0 },
  financial: { label: "Financial", icon: Wallet, order: 1 },
  location: { label: "Location", icon: MapPin, order: 2 },
} as const

const tierConfig: Record<ValueTier, { label: string; color: string; bg: string; border: string; icon: typeof Crown }> = {
  high: { label: "High Value", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: Crown },
  medium: { label: "Medium Value", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", icon: Star },
  low: { label: "Low Value", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200", icon: CircleDot },
}

function FeatureInput({ feature, value, onChange }: {
  feature: CVWhatIfFeature
  value: string
  onChange: (name: string, val: string) => void
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-600">{feature.displayName}</label>
      <Select value={value} onValueChange={(v) => onChange(feature.name, v)}>
        <SelectTrigger className="w-full h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {feature.options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function InfluenceBar({ displayName, influence, maxAbs }: { displayName: string; influence: number; maxAbs: number }) {
  const pct = maxAbs > 0 ? (Math.abs(influence) / maxAbs) * 100 : 0
  const isPositive = influence > 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-600 w-[120px] shrink-0 truncate" title={displayName}>{displayName}</span>
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

function DensityTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-lg text-xs">
      <p className="font-semibold text-slate-700 mb-1">Value: ฿{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#6B5CA5]" />
        <span className="text-slate-500">Density:</span>
        <span className="font-bold text-slate-800 tabular-nums">{payload[0].value.toFixed(4)}</span>
      </div>
    </div>
  )
}

export function CVWhatIfPrediction({ data }: Props) {
  const [featureValues, setFeatureValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    data.features.forEach((f) => { init[f.name] = f.value })
    return init
  })

  // Prediction result state
  const [result, setResult] = useState<CustomerValuePredictionResult>({
    predictedValue: data.predictedValue,
    valueTier: data.valueTier,
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
      const res = await predictCustomerValue(features)
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
    }, 200)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [featureValues, runPrediction])

  if (!data?.features) return null

  const handleChange = (name: string, val: string) => {
    setFeatureValues((prev) => ({ ...prev, [name]: val }))
  }

  const handleReset = () => {
    const init: Record<string, string> = {}
    data.features.forEach((f) => { init[f.name] = f.value })
    setFeatureValues(init)
  }

  const maxAbsInfluence = Math.max(...result.influentialFeatures.map((f) => Math.abs(f.influence)), 1)
  const tier = tierConfig[result.valueTier]
  const TierIcon = tier.icon

  // Group features
  const grouped = useMemo(() => {
    const groups: Record<string, CVWhatIfFeature[]> = {}
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
            <div className="w-8 h-8 rounded-lg bg-[#6B5CA5]/10 flex items-center justify-center">
              <Sliders className="w-4 h-4 text-[#6B5CA5]" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-800">
                Value Simulator
              </CardTitle>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Adjust customer attributes to see how predicted value changes
              </p>
            </div>
          </div>
          {isPredicting && (
            <Loader2 className="w-4 h-4 text-[#6B5CA5] animate-spin" />
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <div className="flex flex-col lg:flex-row">
          {/* ── Left: Customer Profile ── */}
          <div className="lg:w-[280px] shrink-0 p-5 space-y-5 overflow-y-auto max-h-[600px] bg-white border-r border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Profile</h4>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#6B5CA5] transition-colors"
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
            {/* Hero: Predicted Value + Tier */}
            <div className="text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Predicted Customer Value</p>
              <p className="text-4xl font-bold text-[#6B5CA5] tabular-nums transition-all duration-300">
                ฿{result.predictedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              {/* Tier badge */}
              <div className={`inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full border transition-colors duration-300 ${tier.bg} ${tier.border}`}>
                <TierIcon className={`w-3.5 h-3.5 ${tier.color}`} />
                <span className={`text-sm font-semibold ${tier.color}`}>{tier.label}</span>
              </div>
            </div>

            {/* Density Chart */}
            <div>
              <p className="text-sm font-bold text-slate-700 mb-2">Value Distribution</p>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart
                  data={data.predictionDensity}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="gradCVDensityNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B5CA5" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6B5CA5" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="x"
                    tick={{ fontSize: 9, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickFormatter={(v: number) => `฿${v}`}
                  />
                  <Tooltip content={<DensityTooltip />} />
                  <ReferenceLine
                    x={Math.round(result.predictedValue)}
                    stroke="#6B5CA5"
                    strokeWidth={2}
                    strokeDasharray="4 3"
                  />
                  <Area
                    type="monotone"
                    dataKey="density"
                    stroke="#6B5CA5"
                    strokeWidth={2}
                    fill="url(#gradCVDensityNew)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-slate-400 text-center">Dashed line = this customer&apos;s predicted value</p>
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
              <div className="rounded-lg bg-purple-50/70 border border-purple-100 p-4 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-purple-500" />
                  <h4 className="text-sm font-bold text-purple-800">Tips to Increase Value</h4>
                </div>
                <ul className="space-y-1.5">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="text-xs text-purple-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0" />
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
