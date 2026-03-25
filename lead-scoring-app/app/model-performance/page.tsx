"use client"

import { useState, useCallback, useMemo } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { DashboardUpdatedBanner } from "@/components/layout/dashboard-updated-banner"
import { ModelSummaryCards } from "@/components/model-performance/model-summary-cards"
import { PerformanceTrendChart } from "@/components/model-performance/performance-trend-chart"
import { FeatureImportanceChart } from "@/components/model-performance/feature-importance-comparison"
import { ConfusionMatrix } from "@/components/model-performance/confusion-matrix"
import { ScoreDistribution } from "@/components/model-performance/score-distribution"
import { ActualVsPredicted } from "@/components/model-performance/actual-vs-predicted"
import { ErrorDistribution } from "@/components/model-performance/error-distribution"
import { DriftMonitor } from "@/components/model-performance/drift-monitor"
import { RetrainingHistory } from "@/components/model-performance/retraining-history"
import { MonitorHealthKPIs } from "@/components/model-performance/monitor-health-kpis"
import { FeatureDriftHeatmap } from "@/components/model-performance/feature-drift-heatmap"
import { DriftTimelineChart } from "@/components/model-performance/drift-timeline-chart"
import { PredictionDistributionShift } from "@/components/model-performance/prediction-distribution-shift"
import { RetrainRecommendation } from "@/components/model-performance/retrain-recommendation"
import { DataQualityChart } from "@/components/model-performance/data-quality-chart"
import { mockModelPerformanceData } from "@/lib/mock-data-model-performance"
import {
  mockMonitorKPIs,
  mockFeatureDriftHeatmap,
  mockDriftTimeline,
  mockPredictionDistribution,
  mockRetrainRecommendations,
  mockDataQualityTrend,
} from "@/lib/mock-data-monitoring"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Activity, Radar } from "lucide-react"

export default function ModelPerformancePage() {
  const { summaries, modelTrends, modelFeatureImportance, confusionMatrix, scoreDistribution, actualVsPredicted, errorDistribution, driftEvents, retrainingHistory } = mockModelPerformanceData

  const [selectedVersions, setSelectedVersions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    summaries.forEach((m) => {
      if (m.versions.length > 0) initial[m.modelId] = m.versions[0].versionId
    })
    return initial
  })

  const handleVersionChange = useCallback((modelId: string, versionId: string) => {
    setSelectedVersions((prev) => ({ ...prev, [modelId]: versionId }))
  }, [])

  const lcTrend = useMemo(() => modelTrends.find((t) => t.modelId === "lead_conversion"), [modelTrends])
  const cvTrend = useMemo(() => modelTrends.find((t) => t.modelId === "customer_value"), [modelTrends])
  const lcFeatures = useMemo(() => modelFeatureImportance.find((f) => f.modelId === "lead_conversion"), [modelFeatureImportance])
  const cvFeatures = useMemo(() => modelFeatureImportance.find((f) => f.modelId === "customer_value"), [modelFeatureImportance])

  return (
    <MainLayout title="Model Performance" description="ML model accuracy and monitoring">
      <div className="max-w-7xl mx-auto space-y-6">


        <DashboardUpdatedBanner />

        <Tabs defaultValue="monitor">
          <TabsList variant="line">
            <TabsTrigger value="monitor" className="gap-1.5">
              <Radar className="w-4 h-4" />
              Monitor & Drift
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-1.5">
              <Activity className="w-4 h-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* ── Monitor Tab (now the hero tab) ── */}
          <TabsContent value="monitor" className="space-y-6 mt-6">
            {/* Row 0: Health KPIs */}
            <MonitorHealthKPIs kpis={mockMonitorKPIs} />

            {/* Row 1: Retrain Recommendation (full width — the star) */}
            <RetrainRecommendation recommendations={mockRetrainRecommendations} />

            {/* Row 2: Drift Timeline + Data Quality */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <DriftTimelineChart data={mockDriftTimeline} />
              <DataQualityChart data={mockDataQualityTrend} />
            </div>

            {/* Row 3: Feature Drift Heatmap (full width — visual wow) */}
            <FeatureDriftHeatmap data={mockFeatureDriftHeatmap} />

            {/* Row 4: Prediction Distribution Shift + Drift Event Log */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <PredictionDistributionShift data={mockPredictionDistribution} />
              <DriftMonitor events={driftEvents} />
            </div>

            {/* Row 5: Retraining History (full width) */}
            <RetrainingHistory records={retrainingHistory} />
          </TabsContent>

          {/* ── Performance Tab ── */}
          <TabsContent value="performance" className="space-y-6 mt-6">
            {/* Model Summary Cards */}
            <ModelSummaryCards
              summaries={summaries}
              selectedVersions={selectedVersions}
              onVersionChange={handleVersionChange}
            />

            {/* Deep Dive: 2 columns — Lead Conversion | Customer Value */}
            {/* Column Headers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <h3 className="text-xs font-bold text-[#1B7FB5] uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#1B7FB5]" />
                Lead Conversion
              </h3>
              <h3 className="text-xs font-bold text-[#6B5CA5] uppercase tracking-wider flex items-center gap-2 max-lg:hidden">
                <div className="w-2 h-2 rounded-full bg-[#6B5CA5]" />
                Customer Value
              </h3>
            </div>

            {/* Row 1: Performance Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {lcTrend && <PerformanceTrendChart trend={lcTrend} />}
              {cvTrend && <PerformanceTrendChart trend={cvTrend} />}
            </div>

            {/* Row 2: Feature Importance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {lcFeatures && <FeatureImportanceChart featureImportance={lcFeatures} />}
              {cvFeatures && <FeatureImportanceChart featureImportance={cvFeatures} />}
            </div>

            {/* Row 3: Confusion Matrix | Actual vs Predicted */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
              <ConfusionMatrix data={confusionMatrix} />
              <ActualVsPredicted data={actualVsPredicted} />
            </div>

            {/* Row 4: Score Distribution | Error Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
              <ScoreDistribution data={scoreDistribution} />
              <ErrorDistribution data={errorDistribution} />
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </MainLayout>
  )
}
