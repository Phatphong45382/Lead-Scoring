// Mock data for enhanced Model Monitoring tab
// Drift detection, data quality, retrain recommendation, feature PSI

// ── Monitor Health KPIs ──

export interface MonitorHealthKPI {
  label: string
  value: string
  subtitle: string
  status: "healthy" | "warning" | "critical"
  icon: "shield" | "clock" | "alert" | "calendar" | "database" | "activity"
}

export const mockMonitorKPIs: MonitorHealthKPI[] = [
  { label: "Overall Health", value: "Healthy", subtitle: "All models within thresholds", status: "healthy", icon: "shield" },
  { label: "Days Since Drift Alert", value: "3", subtitle: "Last: 23 Mar 2026", status: "healthy", icon: "clock" },
  { label: "Drift Alerts (30d)", value: "4", subtitle: "2 warning, 2 info", status: "warning", icon: "alert" },
  { label: "Next Scheduled Retrain", value: "31 Mar", subtitle: "In 5 days (bi-weekly)", status: "healthy", icon: "calendar" },
  { label: "Data Quality Score", value: "96.2%", subtitle: "Missing: 1.8% | Outliers: 2.0%", status: "healthy", icon: "database" },
  { label: "Prediction Volume (7d)", value: "2,841", subtitle: "+12.3% vs previous week", status: "healthy", icon: "activity" },
]

// ── Feature Drift Heatmap (PSI per feature per week) ──

export interface FeatureDriftRow {
  feature: string
  /** PSI values per time period — low = stable, >0.1 = warning, >0.2 = critical */
  values: { period: string; psi: number }[]
}

export const mockFeatureDriftHeatmap: FeatureDriftRow[] = [
  {
    feature: "income",
    values: [
      { period: "W1 Feb", psi: 0.02 }, { period: "W2 Feb", psi: 0.03 },
      { period: "W3 Feb", psi: 0.04 }, { period: "W4 Feb", psi: 0.03 },
      { period: "W1 Mar", psi: 0.05 }, { period: "W2 Mar", psi: 0.08 },
      { period: "W3 Mar", psi: 0.12 }, { period: "W4 Mar", psi: 0.14 },
    ],
  },
  {
    feature: "age_category",
    values: [
      { period: "W1 Feb", psi: 0.01 }, { period: "W2 Feb", psi: 0.01 },
      { period: "W3 Feb", psi: 0.02 }, { period: "W4 Feb", psi: 0.02 },
      { period: "W1 Mar", psi: 0.03 }, { period: "W2 Mar", psi: 0.03 },
      { period: "W3 Mar", psi: 0.04 }, { period: "W4 Mar", psi: 0.04 },
    ],
  },
  {
    feature: "region",
    values: [
      { period: "W1 Feb", psi: 0.03 }, { period: "W2 Feb", psi: 0.05 },
      { period: "W3 Feb", psi: 0.07 }, { period: "W4 Feb", psi: 0.11 },
      { period: "W1 Mar", psi: 0.15 }, { period: "W2 Mar", psi: 0.18 },
      { period: "W3 Mar", psi: 0.22 }, { period: "W4 Mar", psi: 0.19 },
    ],
  },
  {
    feature: "touchpoint_count",
    values: [
      { period: "W1 Feb", psi: 0.01 }, { period: "W2 Feb", psi: 0.02 },
      { period: "W3 Feb", psi: 0.01 }, { period: "W4 Feb", psi: 0.02 },
      { period: "W1 Mar", psi: 0.03 }, { period: "W2 Mar", psi: 0.02 },
      { period: "W3 Mar", psi: 0.03 }, { period: "W4 Mar", psi: 0.03 },
    ],
  },
  {
    feature: "campaign_response",
    values: [
      { period: "W1 Feb", psi: 0.02 }, { period: "W2 Feb", psi: 0.03 },
      { period: "W3 Feb", psi: 0.05 }, { period: "W4 Feb", psi: 0.06 },
      { period: "W1 Mar", psi: 0.08 }, { period: "W2 Mar", psi: 0.10 },
      { period: "W3 Mar", psi: 0.11 }, { period: "W4 Mar", psi: 0.09 },
    ],
  },
  {
    feature: "gender",
    values: [
      { period: "W1 Feb", psi: 0.00 }, { period: "W2 Feb", psi: 0.01 },
      { period: "W3 Feb", psi: 0.01 }, { period: "W4 Feb", psi: 0.01 },
      { period: "W1 Mar", psi: 0.01 }, { period: "W2 Mar", psi: 0.02 },
      { period: "W3 Mar", psi: 0.02 }, { period: "W4 Mar", psi: 0.01 },
    ],
  },
  {
    feature: "days_since_creation",
    values: [
      { period: "W1 Feb", psi: 0.04 }, { period: "W2 Feb", psi: 0.05 },
      { period: "W3 Feb", psi: 0.06 }, { period: "W4 Feb", psi: 0.08 },
      { period: "W1 Mar", psi: 0.09 }, { period: "W2 Mar", psi: 0.11 },
      { period: "W3 Mar", psi: 0.13 }, { period: "W4 Mar", psi: 0.10 },
    ],
  },
  {
    feature: "channel_diversity",
    values: [
      { period: "W1 Feb", psi: 0.01 }, { period: "W2 Feb", psi: 0.01 },
      { period: "W3 Feb", psi: 0.02 }, { period: "W4 Feb", psi: 0.02 },
      { period: "W1 Mar", psi: 0.03 }, { period: "W2 Mar", psi: 0.03 },
      { period: "W3 Mar", psi: 0.04 }, { period: "W4 Mar", psi: 0.05 },
    ],
  },
]

// ── Overall Drift Score Timeline ──

export interface DriftTimelinePoint {
  date: string
  leadConversion: number
  customerValue: number
}

export const mockDriftTimeline: DriftTimelinePoint[] = [
  { date: "01 Feb", leadConversion: 0.03, customerValue: 0.04 },
  { date: "04 Feb", leadConversion: 0.04, customerValue: 0.05 },
  { date: "07 Feb", leadConversion: 0.03, customerValue: 0.04 },
  { date: "10 Feb", leadConversion: 0.05, customerValue: 0.06 },
  { date: "13 Feb", leadConversion: 0.06, customerValue: 0.07 },
  { date: "16 Feb", leadConversion: 0.05, customerValue: 0.06 },
  { date: "19 Feb", leadConversion: 0.07, customerValue: 0.08 },
  { date: "22 Feb", leadConversion: 0.08, customerValue: 0.09 },
  { date: "25 Feb", leadConversion: 0.06, customerValue: 0.08 },
  { date: "28 Feb", leadConversion: 0.07, customerValue: 0.10 },
  { date: "03 Mar", leadConversion: 0.09, customerValue: 0.11 },
  { date: "06 Mar", leadConversion: 0.08, customerValue: 0.10 },
  { date: "09 Mar", leadConversion: 0.10, customerValue: 0.12 },
  { date: "12 Mar", leadConversion: 0.11, customerValue: 0.14 },
  { date: "15 Mar", leadConversion: 0.09, customerValue: 0.12 },
  { date: "18 Mar", leadConversion: 0.12, customerValue: 0.15 },
  { date: "21 Mar", leadConversion: 0.10, customerValue: 0.13 },
  { date: "24 Mar", leadConversion: 0.11, customerValue: 0.14 },
]

// ── Prediction Distribution Shift ──

export interface DistributionBin {
  range: string
  training: number
  production: number
}

export const mockPredictionDistribution: DistributionBin[] = [
  { range: "0-10", training: 180, production: 210 },
  { range: "10-20", training: 240, production: 280 },
  { range: "20-30", training: 320, production: 290 },
  { range: "30-40", training: 410, production: 380 },
  { range: "40-50", training: 520, production: 460 },
  { range: "50-60", training: 580, production: 620 },
  { range: "60-70", training: 490, production: 540 },
  { range: "70-80", training: 380, production: 420 },
  { range: "80-90", training: 250, production: 310 },
  { range: "90-100", training: 130, production: 190 },
]

// ── Retrain Recommendation ──

export interface RetrainSignal {
  signal: string
  status: "ok" | "warning" | "critical"
  detail: string
  weight: number
}

export interface RetrainRecommendationData {
  recommendation: "not_needed" | "recommended" | "urgent"
  confidence: number
  modelId: string
  modelName: string
  signals: RetrainSignal[]
  estimatedImprovement: string
  lastTrainedDaysAgo: number
}

export const mockRetrainRecommendations: RetrainRecommendationData[] = [
  {
    recommendation: "recommended",
    confidence: 0.78,
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    lastTrainedDaysAgo: 39,
    estimatedImprovement: "+1.5-2.0% AUC",
    signals: [
      { signal: "Feature Drift (PSI)", status: "warning", detail: "2 features above 0.10 threshold (income: 0.14, region: 0.19)", weight: 0.35 },
      { signal: "Performance Decay", status: "warning", detail: "AUC dropped from 0.87 to 0.85 on recent validation set", weight: 0.30 },
      { signal: "Data Volume", status: "ok", detail: "3,200 new labeled samples since last training", weight: 0.15 },
      { signal: "Time Since Training", status: "warning", detail: "39 days (threshold: 30 days)", weight: 0.10 },
      { signal: "Prediction Confidence", status: "ok", detail: "Average confidence: 0.81 (stable)", weight: 0.10 },
    ],
  },
  {
    recommendation: "not_needed",
    confidence: 0.92,
    modelId: "customer_value",
    modelName: "Customer Value",
    lastTrainedDaysAgo: 44,
    estimatedImprovement: "+0.3-0.5% R²",
    signals: [
      { signal: "Feature Drift (PSI)", status: "ok", detail: "All features below 0.10 threshold", weight: 0.35 },
      { signal: "Performance Decay", status: "ok", detail: "R² stable at 0.82 on recent validation set", weight: 0.30 },
      { signal: "Data Volume", status: "ok", detail: "2,100 new labeled samples since last training", weight: 0.15 },
      { signal: "Time Since Training", status: "warning", detail: "44 days (threshold: 30 days)", weight: 0.10 },
      { signal: "Prediction Confidence", status: "ok", detail: "Average confidence: 0.84 (stable)", weight: 0.10 },
    ],
  },
]

// ── Data Quality Over Time ──

export interface DataQualityPoint {
  date: string
  completeness: number
  consistency: number
  outlierRate: number
}

export const mockDataQualityTrend: DataQualityPoint[] = [
  { date: "W1 Feb", completeness: 98.5, consistency: 97.2, outlierRate: 1.8 },
  { date: "W2 Feb", completeness: 98.2, consistency: 97.0, outlierRate: 2.1 },
  { date: "W3 Feb", completeness: 97.8, consistency: 96.5, outlierRate: 2.4 },
  { date: "W4 Feb", completeness: 98.0, consistency: 96.8, outlierRate: 2.2 },
  { date: "W1 Mar", completeness: 98.3, consistency: 97.1, outlierRate: 2.0 },
  { date: "W2 Mar", completeness: 97.9, consistency: 96.6, outlierRate: 2.3 },
  { date: "W3 Mar", completeness: 98.1, consistency: 97.0, outlierRate: 2.0 },
  { date: "W4 Mar", completeness: 98.2, consistency: 97.3, outlierRate: 1.8 },
]
