"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { KPICard } from "@/components/kpi-card"
import { AvgValueByDateChart } from "@/components/customer-value/avg-value-by-date-chart"
import { ValueByCategoryChart } from "@/components/customer-value/value-by-category-chart"
import { LeadsScoredChart } from "@/components/customer-value/leads-scored-chart"
import { ValuePredictionDistributionChart } from "@/components/customer-value/value-prediction-distribution-chart"
import { EstimatedValueTable } from "@/components/customer-value/estimated-value-table"
import { useCustomerValueData } from "@/lib/use-customer-value"
import { useCustomerValueForecastData } from "@/lib/use-customer-value-forecast"
import { useCustomerValueEvaluationData } from "@/lib/use-customer-value-evaluation"
import { ScatterPlotChart } from "@/components/customer-value/scatter-plot-chart"
import { CVFeatureImportanceChart } from "@/components/customer-value/cv-feature-importance-chart"
import { CVWhatIfPrediction } from "@/components/customer-value/cv-what-if-prediction"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DashboardUpdatedBanner } from "@/components/layout/dashboard-updated-banner"
import { History, TrendingUp, FlaskConical, UsersRound, DollarSign, ArrowDownNarrowWide, ArrowUpNarrowWide, Users } from "lucide-react"

export default function CustomerValuePage() {
  const { data, isLoading } = useCustomerValueData()
  const { data: forecastData, isLoading: forecastLoading } = useCustomerValueForecastData()
  const { data: evalData, isLoading: evalLoading } = useCustomerValueEvaluationData()

  return (
    <MainLayout title="Customer Value" description="Customer lifetime value analysis">
      <div className="max-w-7xl mx-auto space-y-6">


        <DashboardUpdatedBanner />

        <Tabs defaultValue="history">
          <TabsList variant="line">
            <TabsTrigger value="history" className="gap-1.5">
              <History className="w-4 h-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="forecast" className="gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Forecast
            </TabsTrigger>
            <TabsTrigger value="evaluation" className="gap-1.5">
              <FlaskConical className="w-4 h-4" />
              Evaluation
            </TabsTrigger>
          </TabsList>

          {/* ── History Tab ── */}
          <TabsContent value="history" className="space-y-6 mt-4">
            {isLoading || !data ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-[110px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  ))}
                </div>
                <div className="w-full h-[420px] bg-white rounded-xl animate-pulse border border-slate-100" />
                <div className="w-full h-[460px] bg-white rounded-xl animate-pulse border border-slate-100" />
              </div>
            ) : (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <KPICard
                    label="Number of Customers"
                    value={data.kpis.numberOfCustomers}
                    format="number"
                    icon={<UsersRound className="w-4 h-4" />}
                    lastUpdated={data.kpis.lastUpdated}
                  />
                  <KPICard
                    label="Average Customer Value"
                    value={data.kpis.avgCustomerValue}
                    format="number"
                    suffix="EUR"
                    icon={<DollarSign className="w-4 h-4" />}
                    lastUpdated={data.kpis.lastUpdated}
                  />
                  <KPICard
                    label="Min Customer Value"
                    value={data.kpis.minCustomerValue}
                    format="number"
                    suffix="EUR"
                    icon={<ArrowDownNarrowWide className="w-4 h-4" />}
                    lastUpdated={data.kpis.lastUpdated}
                  />
                  <KPICard
                    label="Max Customer Value"
                    value={data.kpis.maxCustomerValue}
                    format="number"
                    suffix="EUR"
                    icon={<ArrowUpNarrowWide className="w-4 h-4" />}
                    lastUpdated={data.kpis.lastUpdated}
                  />
                </div>

                {/* Average Customer Value by Creation Date */}
                <AvgValueByDateChart data={data.avgValueByDate} />

                {/* Customer Count & Avg Value by Category */}
                <ValueByCategoryChart data={data.valueByCategory} />
              </>
            )}
          </TabsContent>

          {/* ── Forecast Tab ── */}
          <TabsContent value="forecast" className="space-y-6 mt-4">
            {forecastLoading || !forecastData ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-[110px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  ))}
                </div>
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 lg:col-span-7 h-[380px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  <div className="col-span-12 lg:col-span-5 h-[380px] bg-white rounded-xl animate-pulse border border-slate-100" />
                </div>
                <div className="w-full h-[300px] bg-white rounded-xl animate-pulse border border-slate-100" />
              </div>
            ) : (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <KPICard
                    label="Number of Lead Scored"
                    value={forecastData.kpis.numberOfLeadScored}
                    format="number"
                    icon={<Users className="w-4 h-4" />}
                    lastUpdated={forecastData.kpis.lastUpdated}
                  />
                  <KPICard
                    label="Average Estimated Customer Value"
                    value={forecastData.kpis.avgEstimatedCustomerValue}
                    format="number"
                    suffix="EUR"
                    icon={<DollarSign className="w-4 h-4" />}
                    lastUpdated={forecastData.kpis.lastUpdated}
                  />
                  <KPICard
                    label="Min Estimated Customer Value"
                    value={forecastData.kpis.minEstimatedCustomerValue}
                    format="number"
                    suffix="EUR"
                    icon={<ArrowDownNarrowWide className="w-4 h-4" />}
                    lastUpdated={forecastData.kpis.lastUpdated}
                  />
                  <KPICard
                    label="Max Estimated Customer Value"
                    value={forecastData.kpis.maxEstimatedCustomerValue}
                    format="number"
                    suffix="EUR"
                    icon={<ArrowUpNarrowWide className="w-4 h-4" />}
                    lastUpdated={forecastData.kpis.lastUpdated}
                  />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 lg:col-span-7">
                    <LeadsScoredChart data={forecastData.leadsScoredOverTime} />
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <ValuePredictionDistributionChart data={forecastData.valuePredictionDistribution} />
                  </div>
                </div>

                {/* Estimated Value Table */}
                <EstimatedValueTable data={forecastData.estimatedValueTable} />
              </>
            )}
          </TabsContent>

          {/* ── Evaluation Tab ── */}
          <TabsContent value="evaluation" className="space-y-8 mt-4">
            {evalLoading || !evalData ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-7 h-[430px] bg-white rounded-xl animate-pulse border border-slate-100" />
                    <div className="col-span-12 lg:col-span-5 h-[430px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-5 w-52 bg-slate-200 rounded animate-pulse" />
                  <div className="w-full h-[500px] bg-white rounded-xl animate-pulse border border-slate-100" />
                </div>
              </div>
            ) : (
              <>
                {/* ── Section 1: Model Performance ── */}
                <section>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Model Performance</h3>
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-7">
                      <ScatterPlotChart data={evalData.scatterPlot} />
                    </div>
                    <div className="col-span-12 lg:col-span-5">
                      <CVFeatureImportanceChart data={evalData.featureImportance} />
                    </div>
                  </div>
                </section>

                {/* ── Section 2: Individual Prediction ── */}
                {evalData.whatIf && (
                  <section className="pb-10">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Individual Prediction</h3>
                    <CVWhatIfPrediction data={evalData.whatIf} />
                  </section>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

      </div>
    </MainLayout>
  )
}
