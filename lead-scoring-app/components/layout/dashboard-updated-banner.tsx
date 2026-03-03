"use client"

import { useState } from "react"
import { useDashboardPublish } from "@/lib/dashboard-publish-context"
import { CheckCircle2, X } from "lucide-react"

export function DashboardUpdatedBanner() {
  const { publishInfo } = useDashboardPublish()
  const [dismissed, setDismissed] = useState(false)

  if (!publishInfo || dismissed) return null

  const formattedDate = new Date(publishInfo.publishedAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-3 px-4">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        <p className="text-xs text-emerald-700">
          <span className="font-semibold">Dashboard updated</span>
          {" from "}
          <span className="font-semibold">{publishInfo.modelName}</span>
          {" scoring "}
          <span className="text-emerald-600">
            &middot; {publishInfo.totalLeadsPublished.toLocaleString()} leads &middot; {formattedDate}
          </span>
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded hover:bg-emerald-100 text-emerald-400 hover:text-emerald-600 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
