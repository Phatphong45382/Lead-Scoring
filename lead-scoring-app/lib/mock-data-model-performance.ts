// Mock data for Model Performance page
// Model Comparison Overview with both Lead Conversion & Customer Value models

// ── Model Summary Cards ──

export interface ModelVersion {
  versionId: string
  label: string
  trainedAt: string
  metrics: Record<string, number>
  status: "healthy" | "warning" | "critical"
  totalPredictions: number
}

export interface ModelSummary {
  modelId: string
  modelName: string
  modelType: "classification" | "regression"
  icon: "conversion" | "customer_value"
  color: string
  status: "healthy" | "warning" | "critical"
  lastTrained: string
  lastScored: string
  totalPredictions: number
  metrics: Record<string, number>
  versions: ModelVersion[]
}

export const mockModelSummaries: ModelSummary[] = [
  {
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    modelType: "classification",
    icon: "conversion",
    color: "#1B7FB5",
    status: "healthy",
    lastTrained: "2026-02-15T09:00:00Z",
    lastScored: "2026-02-27T14:22:00Z",
    totalPredictions: 12480,
    metrics: {
      AUC: 0.87,
      Accuracy: 0.84,
      Precision: 0.81,
      Recall: 0.76,
    },
    versions: [
      { versionId: "lc_v3", label: "v3 — Feb 2026 (latest)", trainedAt: "2026-02-15T09:00:00Z", metrics: { AUC: 0.87, Accuracy: 0.84, Precision: 0.81, Recall: 0.76 }, status: "healthy", totalPredictions: 12480 },
      { versionId: "lc_v2", label: "v2 — Jan 2026", trainedAt: "2026-01-20T10:00:00Z", metrics: { AUC: 0.86, Accuracy: 0.83, Precision: 0.79, Recall: 0.80 }, status: "healthy", totalPredictions: 8920 },
      { versionId: "lc_v1", label: "v1 — Dec 2025", trainedAt: "2025-12-15T09:30:00Z", metrics: { AUC: 0.85, Accuracy: 0.82, Precision: 0.78, Recall: 0.74 }, status: "warning", totalPredictions: 5400 },
    ],
  },
  {
    modelId: "customer_value",
    modelName: "Customer Value",
    modelType: "regression",
    icon: "customer_value",
    color: "#6B5CA5",
    status: "healthy",
    lastTrained: "2026-02-10T11:30:00Z",
    lastScored: "2026-02-27T14:22:00Z",
    totalPredictions: 9650,
    metrics: {
      "R²": 0.82,
      MAE: 12.3,
      RMSE: 18.5,
      MAPE: 8.7,
    },
    versions: [
      { versionId: "cv_v3", label: "v3 — Feb 2026 (latest)", trainedAt: "2026-02-10T11:30:00Z", metrics: { "R²": 0.82, MAE: 12.3, RMSE: 18.5, MAPE: 8.7 }, status: "healthy", totalPredictions: 9650 },
      { versionId: "cv_v2", label: "v2 — Jan 2026", trainedAt: "2026-01-05T14:00:00Z", metrics: { "R²": 0.80, MAE: 14.1, RMSE: 20.2, MAPE: 9.5 }, status: "healthy", totalPredictions: 7200 },
      { versionId: "cv_v1", label: "v1 — Dec 2025", trainedAt: "2025-12-01T10:00:00Z", metrics: { "R²": 0.77, MAE: 16.8, RMSE: 23.1, MAPE: 11.2 }, status: "warning", totalPredictions: 4100 },
    ],
  },
]

// ── Per-Model Performance Trend ──

export interface ModelTrendPoint {
  date: string
  value: number
}

export interface ModelPerformanceTrend {
  modelId: string
  metricName: string
  color: string
  data: ModelTrendPoint[]
}

export const mockModelTrends: ModelPerformanceTrend[] = [
  {
    modelId: "lead_conversion",
    metricName: "AUC",
    color: "#1B7FB5",
    data: [
      { date: "2025-09", value: 0.82 },
      { date: "2025-10", value: 0.83 },
      { date: "2025-11", value: 0.84 },
      { date: "2025-12", value: 0.85 },
      { date: "2026-01", value: 0.86 },
      { date: "2026-02", value: 0.87 },
    ],
  },
  {
    modelId: "customer_value",
    metricName: "R²",
    color: "#6B5CA5",
    data: [
      { date: "2025-09", value: 0.76 },
      { date: "2025-10", value: 0.78 },
      { date: "2025-11", value: 0.77 },
      { date: "2025-12", value: 0.80 },
      { date: "2026-01", value: 0.81 },
      { date: "2026-02", value: 0.82 },
    ],
  },
]

// ── Per-Model Feature Importance ──

export interface FeatureImportanceItem {
  feature: string
  importance: number
}

export interface ModelFeatureImportance {
  modelId: string
  color: string
  data: FeatureImportanceItem[]
}

export const mockModelFeatureImportance: ModelFeatureImportance[] = [
  {
    modelId: "lead_conversion",
    color: "#1B7FB5",
    data: [
      { feature: "income", importance: 22.5 },
      { feature: "age_category", importance: 18.3 },
      { feature: "region", importance: 15.1 },
      { feature: "touchpoint_count", importance: 14.8 },
      { feature: "campaign_response", importance: 12.4 },
      { feature: "gender", importance: 8.9 },
      { feature: "days_since_creation", importance: 5.2 },
      { feature: "channel_diversity", importance: 2.8 },
    ],
  },
  {
    modelId: "customer_value",
    color: "#6B5CA5",
    data: [
      { feature: "income", importance: 28.1 },
      { feature: "region", importance: 19.4 },
      { feature: "age_category", importance: 15.7 },
      { feature: "gender", importance: 11.3 },
      { feature: "touchpoint_count", importance: 8.2 },
      { feature: "days_since_creation", importance: 7.8 },
      { feature: "campaign_response", importance: 6.5 },
      { feature: "channel_diversity", importance: 3.0 },
    ],
  },
]

// ── Model Drift Monitor ──

export interface DriftEvent {
  id: string
  date: string
  modelId: string
  modelName: string
  severity: "info" | "warning" | "critical"
  metric: string
  previousValue: number
  currentValue: number
  message: string
}

export const mockDriftEvents: DriftEvent[] = [
  {
    id: "drift_001",
    date: "2026-02-25T08:00:00Z",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    severity: "info",
    metric: "AUC",
    previousValue: 0.86,
    currentValue: 0.87,
    message: "AUC improved after latest retraining",
  },
  {
    id: "drift_002",
    date: "2026-02-18T10:30:00Z",
    modelId: "customer_value",
    modelName: "Customer Value",
    severity: "warning",
    metric: "MAPE",
    previousValue: 7.9,
    currentValue: 8.7,
    message: "MAPE increased slightly — monitor for further drift",
  },
  {
    id: "drift_003",
    date: "2026-02-10T14:00:00Z",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    severity: "info",
    metric: "Precision",
    previousValue: 0.79,
    currentValue: 0.81,
    message: "Precision improved after feature engineering update",
  },
  {
    id: "drift_004",
    date: "2026-01-28T09:15:00Z",
    modelId: "customer_value",
    modelName: "Customer Value",
    severity: "info",
    metric: "R²",
    previousValue: 0.80,
    currentValue: 0.82,
    message: "R² improved after adding new customer segments",
  },
  {
    id: "drift_005",
    date: "2026-01-15T11:00:00Z",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    severity: "warning",
    metric: "Recall",
    previousValue: 0.80,
    currentValue: 0.76,
    message: "Recall dropped — retraining recommended",
  },
]

// ── Retraining History ──

export interface RetrainingRecord {
  id: string
  modelId: string
  modelName: string
  trainedAt: string
  trainingSamples: number
  duration: string
  previousMetric: number
  newMetric: number
  metricName: string
  status: "completed" | "failed"
  triggeredBy: "scheduled" | "manual" | "drift_alert"
}

export const mockRetrainingHistory: RetrainingRecord[] = [
  {
    id: "train_006",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    trainedAt: "2026-02-15T09:00:00Z",
    trainingSamples: 15200,
    duration: "12m 34s",
    previousMetric: 0.86,
    newMetric: 0.87,
    metricName: "AUC",
    status: "completed",
    triggeredBy: "scheduled",
  },
  {
    id: "train_005",
    modelId: "customer_value",
    modelName: "Customer Value",
    trainedAt: "2026-02-10T11:30:00Z",
    trainingSamples: 12800,
    duration: "18m 12s",
    previousMetric: 0.80,
    newMetric: 0.82,
    metricName: "R²",
    status: "completed",
    triggeredBy: "manual",
  },
  {
    id: "train_004",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    trainedAt: "2026-01-20T10:00:00Z",
    trainingSamples: 14500,
    duration: "11m 45s",
    previousMetric: 0.85,
    newMetric: 0.86,
    metricName: "AUC",
    status: "completed",
    triggeredBy: "drift_alert",
  },
  {
    id: "train_003",
    modelId: "customer_value",
    modelName: "Customer Value",
    trainedAt: "2026-01-05T14:00:00Z",
    trainingSamples: 11200,
    duration: "16m 08s",
    previousMetric: 0.78,
    newMetric: 0.80,
    metricName: "R²",
    status: "completed",
    triggeredBy: "scheduled",
  },
  {
    id: "train_002",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    trainedAt: "2025-12-15T09:30:00Z",
    trainingSamples: 13800,
    duration: "13m 22s",
    previousMetric: 0.84,
    newMetric: 0.85,
    metricName: "AUC",
    status: "completed",
    triggeredBy: "scheduled",
  },
  {
    id: "train_001",
    modelId: "customer_value",
    modelName: "Customer Value",
    trainedAt: "2025-12-01T10:00:00Z",
    trainingSamples: 10500,
    duration: "0m 00s",
    previousMetric: 0.77,
    newMetric: 0.77,
    metricName: "R²",
    status: "failed",
    triggeredBy: "manual",
  },
]

// ── Confusion Matrix (Classification) ──

export interface ConfusionMatrixData {
  modelId: string
  color: string
  matrix: {
    truePositive: number
    falsePositive: number
    trueNegative: number
    falseNegative: number
  }
  labels: [string, string] // [negative, positive]
}

export const mockConfusionMatrix: ConfusionMatrixData = {
  modelId: "lead_conversion",
  color: "#1B7FB5",
  matrix: {
    truePositive: 1842,
    falsePositive: 431,
    trueNegative: 3218,
    falseNegative: 589,
  },
  labels: ["Not Converted", "Converted"],
}

// ── Score Distribution (Classification) ──

export interface ScoreDistributionBin {
  range: string
  converted: number
  notConverted: number
}

export interface ScoreDistributionData {
  modelId: string
  color: string
  data: ScoreDistributionBin[]
}

export const mockScoreDistribution: ScoreDistributionData = {
  modelId: "lead_conversion",
  color: "#1B7FB5",
  data: [
    { range: "0–10", converted: 5, notConverted: 820 },
    { range: "10–20", converted: 12, notConverted: 640 },
    { range: "20–30", converted: 28, notConverted: 510 },
    { range: "30–40", converted: 65, notConverted: 390 },
    { range: "40–50", converted: 140, notConverted: 280 },
    { range: "50–60", converted: 260, notConverted: 210 },
    { range: "60–70", converted: 380, notConverted: 145 },
    { range: "70–80", converted: 490, notConverted: 95 },
    { range: "80–90", converted: 350, notConverted: 42 },
    { range: "90–100", converted: 112, notConverted: 8 },
  ],
}

// ── Actual vs Predicted (Regression) ──

export interface ActualPredictedPoint {
  actual: number
  predicted: number
}

export interface ActualVsPredictedData {
  modelId: string
  color: string
  data: ActualPredictedPoint[]
}

function generateScatterData(): ActualPredictedPoint[] {
  const points: ActualPredictedPoint[] = []
  const seed = [
    [15, 18], [22, 20], [35, 32], [48, 45], [55, 58], [62, 60], [70, 74],
    [78, 75], [85, 88], [92, 90], [28, 25], [42, 48], [58, 55], [65, 62],
    [72, 70], [80, 82], [88, 85], [95, 92], [18, 22], [32, 30], [45, 42],
    [52, 55], [60, 65], [68, 66], [75, 78], [82, 80], [90, 88], [98, 95],
    [12, 15], [25, 28], [38, 35], [50, 52], [57, 60], [63, 68], [71, 72],
    [77, 74], [84, 86], [91, 93], [20, 16], [33, 38], [46, 44], [54, 50],
    [61, 64], [67, 70], [73, 76], [79, 81], [86, 84], [93, 96], [10, 14],
    [27, 24], [40, 42], [53, 50], [66, 62], [74, 77], [81, 83], [89, 87],
  ]
  seed.forEach(([a, p]) => points.push({ actual: a, predicted: p }))
  return points
}

export const mockActualVsPredicted: ActualVsPredictedData = {
  modelId: "customer_value",
  color: "#6B5CA5",
  data: generateScatterData(),
}

// ── Error Distribution (Regression) ──

export interface ErrorDistributionBin {
  range: string
  count: number
}

export interface ErrorDistributionData {
  modelId: string
  color: string
  data: ErrorDistributionBin[]
}

export const mockErrorDistribution: ErrorDistributionData = {
  modelId: "customer_value",
  color: "#6B5CA5",
  data: [
    { range: "<-20", count: 15 },
    { range: "-20 to -15", count: 32 },
    { range: "-15 to -10", count: 78 },
    { range: "-10 to -5", count: 185 },
    { range: "-5 to 0", count: 420 },
    { range: "0 to 5", count: 445 },
    { range: "5 to 10", count: 195 },
    { range: "10 to 15", count: 82 },
    { range: "15 to 20", count: 35 },
    { range: ">20", count: 13 },
  ],
}

// ── Aggregated Data ──

export interface ModelPerformanceData {
  summaries: ModelSummary[]
  modelTrends: ModelPerformanceTrend[]
  modelFeatureImportance: ModelFeatureImportance[]
  confusionMatrix: ConfusionMatrixData
  scoreDistribution: ScoreDistributionData
  actualVsPredicted: ActualVsPredictedData
  errorDistribution: ErrorDistributionData
  driftEvents: DriftEvent[]
  retrainingHistory: RetrainingRecord[]
}

export const mockModelPerformanceData: ModelPerformanceData = {
  summaries: mockModelSummaries,
  modelTrends: mockModelTrends,
  modelFeatureImportance: mockModelFeatureImportance,
  confusionMatrix: mockConfusionMatrix,
  scoreDistribution: mockScoreDistribution,
  actualVsPredicted: mockActualVsPredicted,
  errorDistribution: mockErrorDistribution,
  driftEvents: mockDriftEvents,
  retrainingHistory: mockRetrainingHistory,
}
