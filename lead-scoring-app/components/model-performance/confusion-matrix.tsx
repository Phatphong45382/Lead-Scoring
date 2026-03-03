"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfusionMatrixData } from "@/lib/mock-data-model-performance"
import { Grid3X3 } from "lucide-react"

interface ConfusionMatrixProps {
  data: ConfusionMatrixData
}

export function ConfusionMatrix({ data }: ConfusionMatrixProps) {
  const { truePositive, falsePositive, trueNegative, falseNegative } = data.matrix
  const total = truePositive + falsePositive + trueNegative + falseNegative
  const [negLabel, posLabel] = data.labels

  const cells = [
    { value: trueNegative, label: "TN", row: negLabel, col: negLabel, correct: true },
    { value: falsePositive, label: "FP", row: negLabel, col: posLabel, correct: false },
    { value: falseNegative, label: "FN", row: posLabel, col: negLabel, correct: false },
    { value: truePositive, label: "TP", row: posLabel, col: posLabel, correct: true },
  ]

  const maxVal = Math.max(truePositive, falsePositive, trueNegative, falseNegative)

  function getCellBg(value: number, correct: boolean) {
    const intensity = value / maxVal
    if (correct) {
      return `rgba(27, 127, 181, ${0.1 + intensity * 0.35})`
    }
    return `rgba(239, 68, 68, ${0.05 + intensity * 0.25})`
  }

  return (
    <Card className="rounded-xl border-slate-200 shadow-enterprise-sm flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Grid3X3 className="w-4 h-4" style={{ color: data.color }} />
          <CardTitle className="text-sm font-bold text-slate-800">Confusion Matrix</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* Predicted label */}
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Predicted</p>

          <div className="flex items-stretch">
            {/* Actual label */}
            <div className="flex items-center mr-2">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">
                Actual
              </p>
            </div>

            <div className="flex flex-col">
              {/* Column headers */}
              <div className="grid grid-cols-[80px_1fr_1fr] gap-1 mb-1">
                <div />
                <div className="text-center text-[10px] font-medium text-slate-500 px-2">{negLabel}</div>
                <div className="text-center text-[10px] font-medium text-slate-500 px-2">{posLabel}</div>
              </div>

              {/* Row: Not Converted (actual) */}
              <div className="grid grid-cols-[80px_1fr_1fr] gap-1 mb-1">
                <div className="flex items-center justify-end pr-2">
                  <span className="text-[10px] font-medium text-slate-500">{negLabel}</span>
                </div>
                <div
                  className="rounded-lg p-3 text-center min-w-[90px] min-h-[72px] flex flex-col items-center justify-center"
                  style={{ background: getCellBg(cells[0].value, cells[0].correct) }}
                >
                  <span className="text-lg font-bold text-slate-800 tabular-nums">{cells[0].value.toLocaleString()}</span>
                  <span className="text-[9px] font-semibold text-slate-500 mt-0.5">TN ({((cells[0].value / total) * 100).toFixed(1)}%)</span>
                </div>
                <div
                  className="rounded-lg p-3 text-center min-w-[90px] min-h-[72px] flex flex-col items-center justify-center"
                  style={{ background: getCellBg(cells[1].value, cells[1].correct) }}
                >
                  <span className="text-lg font-bold text-slate-800 tabular-nums">{cells[1].value.toLocaleString()}</span>
                  <span className="text-[9px] font-semibold text-slate-500 mt-0.5">FP ({((cells[1].value / total) * 100).toFixed(1)}%)</span>
                </div>
              </div>

              {/* Row: Converted (actual) */}
              <div className="grid grid-cols-[80px_1fr_1fr] gap-1">
                <div className="flex items-center justify-end pr-2">
                  <span className="text-[10px] font-medium text-slate-500">{posLabel}</span>
                </div>
                <div
                  className="rounded-lg p-3 text-center min-w-[90px] min-h-[72px] flex flex-col items-center justify-center"
                  style={{ background: getCellBg(cells[2].value, cells[2].correct) }}
                >
                  <span className="text-lg font-bold text-slate-800 tabular-nums">{cells[2].value.toLocaleString()}</span>
                  <span className="text-[9px] font-semibold text-slate-500 mt-0.5">FN ({((cells[2].value / total) * 100).toFixed(1)}%)</span>
                </div>
                <div
                  className="rounded-lg p-3 text-center min-w-[90px] min-h-[72px] flex flex-col items-center justify-center"
                  style={{ background: getCellBg(cells[3].value, cells[3].correct) }}
                >
                  <span className="text-lg font-bold text-slate-800 tabular-nums">{cells[3].value.toLocaleString()}</span>
                  <span className="text-[9px] font-semibold text-slate-500 mt-0.5">TP ({((cells[3].value / total) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary stats */}
          <div className="flex gap-4 mt-3 text-[10px] text-slate-500">
            <span>Accuracy: <strong className="text-slate-700">{(((truePositive + trueNegative) / total) * 100).toFixed(1)}%</strong></span>
            <span>Precision: <strong className="text-slate-700">{((truePositive / (truePositive + falsePositive)) * 100).toFixed(1)}%</strong></span>
            <span>Recall: <strong className="text-slate-700">{((truePositive / (truePositive + falseNegative)) * 100).toFixed(1)}%</strong></span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
