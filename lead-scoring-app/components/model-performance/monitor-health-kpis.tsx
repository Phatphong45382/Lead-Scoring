"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MonitorHealthKPI } from "@/lib/mock-data-monitoring"
import { ShieldCheck, Clock, AlertTriangle, CalendarClock, Database, Activity } from "lucide-react"

interface MonitorHealthKPIsProps {
  kpis: MonitorHealthKPI[]
}

const iconMap = {
  shield: ShieldCheck,
  clock: Clock,
  alert: AlertTriangle,
  calendar: CalendarClock,
  database: Database,
  activity: Activity,
}

const statusColors = {
  healthy: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: "text-emerald-500", dot: "bg-emerald-500" },
  warning: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: "text-amber-500", dot: "bg-amber-500" },
  critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", icon: "text-red-500", dot: "bg-red-500" },
}

export function MonitorHealthKPIs({ kpis }: MonitorHealthKPIsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.icon]
        const colors = statusColors[kpi.status]
        return (
          <Card key={kpi.label} className={`rounded-xl border ${colors.border} ${colors.bg} shadow-none`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${colors.icon}`} />
                <div className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse`} />
              </div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{kpi.label}</p>
              <p className={`text-lg font-bold ${colors.text} leading-tight`}>{kpi.value}</p>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">{kpi.subtitle}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
