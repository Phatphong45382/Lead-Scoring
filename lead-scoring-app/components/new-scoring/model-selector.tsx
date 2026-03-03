"use client"

import { ModelDefinition } from "@/lib/mock-data-new-scoring"
import { ArrowRightLeft, Crown, CheckCircle2 } from "lucide-react"

interface ModelSelectorProps {
  models: ModelDefinition[]
  selectedModelId: string | null
  onSelect: (modelId: string) => void
}

function ModelIcon({ icon, color }: { icon: string; color: string }) {
  const iconClass = "w-6 h-6"
  if (icon === "conversion") return <ArrowRightLeft className={iconClass} style={{ color }} />
  if (icon === "customer_value") return <Crown className={iconClass} style={{ color }} />
  return null
}

export function ModelSelector({ models, selectedModelId, onSelect }: ModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {models.map((model) => {
        const isSelected = selectedModelId === model.id
        return (
          <button
            key={model.id}
            onClick={() => onSelect(model.id)}
            className={`relative text-left rounded-xl border-2 p-5 transition-all duration-200 ${
              isSelected
                ? "border-[color:var(--accent)] bg-white shadow-lg ring-2 ring-[color:var(--accent)]/15"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
            }`}
            style={{ "--accent": model.color } as React.CSSProperties}
          >
            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute top-3 right-3">
                <CheckCircle2 className="w-5 h-5" style={{ color: model.color }} />
              </div>
            )}

            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${model.color}15` }}
              >
                <ModelIcon icon={model.icon} color={model.color} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-800">{model.name}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{model.description}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="text-[11px] font-medium text-slate-400">
                    {model.requiredDatasets.length} required dataset{model.requiredDatasets.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
