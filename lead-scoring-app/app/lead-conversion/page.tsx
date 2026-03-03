"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useLeadConversionData } from "@/lib/use-lead-conversion"
import { KPICard } from "@/components/kpi-card"
import { NewLeadsChart } from "@/components/lead-conversion/new-leads-chart"
import { ConversionRateChart } from "@/components/lead-conversion/conversion-rate-chart"
import { ConversionLengthChart } from "@/components/lead-conversion/conversion-length-chart"
import { TouchpointsBySourceChart } from "@/components/lead-conversion/touchpoints-by-source-chart"
import { CampaignTreemap } from "@/components/lead-conversion/campaign-treemap"
import { LeadsByTouchpointChart } from "@/components/lead-conversion/leads-by-touchpoint-chart"
import { LeadsByDayChart } from "@/components/lead-conversion/leads-by-day-chart"
import { LeadsScoredOverTimeChart } from "@/components/lead-conversion/leads-scored-over-time-chart"
import { LeadsByEstimatedRateChart } from "@/components/lead-conversion/leads-by-estimated-rate-chart"
import { ConversionScoreTable } from "@/components/lead-conversion/conversion-score-table"
import { EstimatedConversionRateChart } from "@/components/lead-conversion/estimated-conversion-rate-chart"
import { ConfusionMatrixChart } from "@/components/lead-conversion/confusion-matrix-chart"
import { WhatIfPrediction } from "@/components/lead-conversion/what-if-prediction"
import { useForecastData } from "@/lib/use-forecast"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DashboardUpdatedBanner } from "@/components/layout/dashboard-updated-banner"
import { Percent, Clock, ArrowDown, Minus, ArrowUp, History, TrendingUp, Users, ChevronsDown, ChevronsUp, FlaskConical, Target, Crosshair, RefreshCcw, Activity } from "lucide-react"

const ModelPerformanceMetricsRow = ({ matrix }: { matrix: any }) => {
  const tp = matrix.actualTruePredictedTrue;
  const tn = matrix.actualFalsePredictedFalse;
  const fp = matrix.actualFalsePredictedTrue;
  const fn = matrix.actualTruePredictedFalse;
  const total = matrix.grandTotal;

  const accuracy = (tp + tn) / total;
  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  const f1Score = (2 * precision * recall) / (precision + recall) || 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <KPICard
        label="Accuracy"
        value={accuracy * 100}
        format="percent"
        icon={<Target className="w-4 h-4" />}
        subtitle="Overall correct predictions"
      />
      <KPICard
        label="Precision"
        value={precision * 100}
        format="percent"
        icon={<Crosshair className="w-4 h-4" />}
        subtitle="Correctly predicted conversions"
      />
      <KPICard
        label="Recall"
        value={recall * 100}
        format="percent"
        icon={<RefreshCcw className="w-4 h-4" />}
        subtitle="Actual conversions found"
      />
      <KPICard
        label="F1 Score"
        value={f1Score * 100}
        format="percent"
        icon={<Activity className="w-4 h-4" />}
        subtitle="Balance of precision & recall"
      />
    </div>
  )
}

export default function LeadConversionPage() {
  const { data, isLoading } = useLeadConversionData()
  const { data: forecastData, isLoading: forecastLoading } = useForecastData()

  return (
    <MainLayout title="Lead Conversion" description="Conversion funnel and rate analytics">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-[100px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  ))}
                </div>
                <div className="grid grid-cols-12 gap-5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="col-span-12 md:col-span-6 h-[350px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <KPICard
                    label="Avg Conversion Rate"
                    value={data.kpis.avgConversionRate}
                    format="percent"
                    icon={<Percent className="w-4 h-4" />}
                  />
                  <KPICard
                    label="Conv. Length Range"
                    value={data.kpis.convLengthRange}
                    format="range"
                    suffix="days"
                    icon={<Clock className="w-4 h-4" />}
                  />
                  <KPICard
                    label="Conv. Length Q1"
                    value={data.kpis.convLengthQ1}
                    format="days"
                    icon={<ArrowDown className="w-4 h-4" />}
                  />
                  <KPICard
                    label="Conv. Length Median"
                    value={data.kpis.convLengthMedian}
                    format="days"
                    icon={<Minus className="w-4 h-4" />}
                  />
                  <KPICard
                    label="Conv. Length Q3"
                    value={data.kpis.convLengthQ3}
                    format="days"
                    icon={<ArrowUp className="w-4 h-4" />}
                  />
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 lg:col-span-7">
                    <NewLeadsChart data={data.newLeadsOverTime} />
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <ConversionRateChart data={data.conversionRateOverTime} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 lg:col-span-7">
                    <ConversionLengthChart data={data.avgConversionLength} />
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <TouchpointsBySourceChart data={data.touchpointsBySource} />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 lg:col-span-5">
                    <CampaignTreemap data={data.campaignTreemap} />
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <LeadsByTouchpointChart data={data.leadsByTouchpoint} />
                  </div>
                </div>

                {/* Row 4 */}
                <LeadsByDayChart data={data.leadsByDay} />

              </>
            )}
          </TabsContent>

          {/* ── Forecast Tab ── */}
          <TabsContent value="forecast" className="space-y-6 mt-4">
            {forecastLoading || !forecastData ? (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[100px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  ))}
                </div>
                <div className="grid grid-cols-12 gap-5">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="col-span-12 md:col-span-6 h-[350px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  ))}
                  <div className="col-span-12 h-[300px] bg-white rounded-xl animate-pulse border border-slate-100" />
                </div>
              </div>
            ) : (
              <>
                {/* Forecast KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <KPICard
                    label="Number of Lead Scored"
                    value={forecastData.kpis.numberOfLeadScored}
                    format="number"
                    icon={<Users className="w-4 h-4" />}
                    lastUpdated={forecastData.kpis.lastUpdated}
                  />
                  <KPICard
                    label="Min Estimated Conversion Rate"
                    value={forecastData.kpis.minEstimatedConversionRate}
                    format="percent"
                    icon={<ChevronsDown className="w-4 h-4" />}
                    lastUpdated={forecastData.kpis.lastUpdated}
                  />
                  <KPICard
                    label="Max Estimated Conversion Rate"
                    value={forecastData.kpis.maxEstimatedConversionRate}
                    format="percent"
                    icon={<ChevronsUp className="w-4 h-4" />}
                    lastUpdated={forecastData.kpis.lastUpdated}
                  />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 lg:col-span-6">
                    <LeadsScoredOverTimeChart data={forecastData.leadsScoredOverTime} />
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <LeadsByEstimatedRateChart data={forecastData.leadsByEstimatedRate} />
                  </div>
                </div>

                {/* Score Table + Info */}
                <div className="mt-5">
                  <ConversionScoreTable data={forecastData.scoreTable} />
                </div>

              </>
            )}
          </TabsContent>

          {/* ── Evaluation Tab ── */}
          <TabsContent value="evaluation" className="space-y-8 mt-4">
            {isLoading || !data ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-8 h-[430px] bg-white rounded-xl animate-pulse border border-slate-100" />
                    <div className="col-span-12 lg:col-span-4 h-[430px] bg-white rounded-xl animate-pulse border border-slate-100" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-5 h-[430px] bg-white rounded-xl animate-pulse border border-slate-100" />
                    <div className="col-span-12 lg:col-span-7 h-[430px] bg-white rounded-xl animate-pulse border border-slate-100" />
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

                  <ModelPerformanceMetricsRow matrix={data.confusionMatrix} />

                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-8">
                      <EstimatedConversionRateChart data={data.estimatedConversionRates} />
                    </div>
                    <div className="col-span-12 xl:col-span-4">
                      <ConfusionMatrixChart data={data.confusionMatrix} />
                    </div>
                  </div>
                </section>


                {/* ── Section 3: Individual Prediction ── */}
                {data.whatIf && (
                  <section className="pb-10">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Individual Prediction</h3>
                    <WhatIfPrediction data={data.whatIf} />
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
