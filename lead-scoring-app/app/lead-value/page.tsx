"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { KPICard } from "@/components/kpi-card"
import { LeadValueDistributionChart } from "@/components/lead-value/lead-value-distribution-chart"
import { AvgCVPerConversionRateChart } from "@/components/lead-value/avg-cv-per-conversion-rate-chart"
import { CountByCategoryChart } from "@/components/lead-value/count-by-category-chart"
import { LeadValueTable } from "@/components/lead-value/lead-value-table"
import { useLeadValueData } from "@/lib/use-lead-value"
import { DashboardUpdatedBanner } from "@/components/layout/dashboard-updated-banner"
import { Users, DollarSign, ArrowDownNarrowWide, ArrowUpNarrowWide, Info } from "lucide-react"

export default function LeadValuePage() {
  const { data, isLoading } = useLeadValueData()

  return (
    <MainLayout title="Lead Value" description="Lead score distribution and ranking">
      <div className="max-w-7xl mx-auto space-y-6">


        <DashboardUpdatedBanner />

        {isLoading || !data ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-[110px] bg-white rounded-xl animate-pulse border border-slate-100" />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-6 h-[420px] bg-white rounded-xl animate-pulse border border-slate-100" />
              <div className="col-span-12 lg:col-span-6 h-[420px] bg-white rounded-xl animate-pulse border border-slate-100" />
            </div>
            <div className="w-full h-[460px] bg-white rounded-xl animate-pulse border border-slate-100" />
            <div className="w-full h-[300px] bg-white rounded-xl animate-pulse border border-slate-100" />
          </div>
        ) : (
          <>
            {/* KPI Cards + Slide Focus */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <KPICard
                label="Number of Lead Scored"
                value={data.kpis.numberOfLeadScored}
                format="number"
                icon={<Users className="w-4 h-4" />}
                lastUpdated={data.kpis.lastUpdated}
              />
              <KPICard
                label="Average Lead Value"
                value={data.kpis.avgLeadValue}
                format="number"
                suffix="EUR"
                icon={<DollarSign className="w-4 h-4" />}
                lastUpdated={data.kpis.lastUpdated}
              />
              <KPICard
                label="Min Lead Value"
                value={data.kpis.minLeadValue}
                format="number"
                suffix="EUR"
                icon={<ArrowDownNarrowWide className="w-4 h-4" />}
                lastUpdated={data.kpis.lastUpdated}
              />
              <KPICard
                label="Max Lead Value"
                value={data.kpis.maxLeadValue}
                format="number"
                suffix="EUR"
                icon={<ArrowUpNarrowWide className="w-4 h-4" />}
                lastUpdated={data.kpis.lastUpdated}
              />
              {/* Slide Focus info card */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-enterprise-sm p-5 flex flex-col justify-center">
                <div className="flex items-start gap-2 mb-2">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Slide focus</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This slide displays the <span className="font-bold text-slate-800">final value</span> assigned to each lead.
                </p>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Lead Value = Estimated Conversion Rate * Estimated Customer Value
                </p>
              </div>
            </div>

            {/* Lead Value Distribution + Avg Estimated CV per Conversion Rate */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 lg:col-span-6">
                <LeadValueDistributionChart data={data.leadValueDistribution} />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <AvgCVPerConversionRateChart data={data.avgCVPerConversionRate} />
              </div>
            </div>

            {/* Count by Category with Filter */}
            <CountByCategoryChart data={data.countByCategory} />

            {/* Lead Value Table */}
            <LeadValueTable data={data.leadValueTable} />
          </>
        )}

      </div>
    </MainLayout>
  )
}
