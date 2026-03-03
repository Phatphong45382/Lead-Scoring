// Mock data for Customer Value Evaluation tab
// Structured to match future API response shape for easy swap

export interface ScatterPlotDataPoint {
  actualValue: number
  predictedValue: number
  error: number // absolute error for color coding
}

export interface FeatureImportanceDataPoint {
  variable: string
  shapley: number
  gini: number
}

export interface CVWhatIfFeature {
  name: string
  displayName: string
  group: "demographics" | "financial" | "location"
  type: "select"
  value: string
  options: string[]
}

export interface CVWhatIfInfluentialFeature {
  feature: string
  displayName: string
  influence: number // positive = increase, negative = decrease
}

export interface CVPredictionDensityPoint {
  x: number
  density: number
}

export type ValueTier = "high" | "medium" | "low"

export interface CVWhatIfData {
  features: CVWhatIfFeature[]
  predictedValue: number
  valueTier: ValueTier
  predictionDensity: CVPredictionDensityPoint[]
  influentialFeatures: CVWhatIfInfluentialFeature[]
  recommendations: string[]
}

export interface CustomerValueEvaluationData {
  scatterPlot: ScatterPlotDataPoint[]
  featureImportance: FeatureImportanceDataPoint[]
  whatIf: CVWhatIfData
}

// ---------- Mock Data ----------

// Scatter plot: actual vs predicted with some noise
function generateScatterData(): ScatterPlotDataPoint[] {
  const points: ScatterPlotDataPoint[] = []
  const rng = (seed: number) => {
    let s = seed
    return () => {
      s = (s * 16807) % 2147483647
      return s / 2147483647
    }
  }
  const random = rng(42)

  for (let i = 0; i < 120; i++) {
    const actual = 50 + random() * 1000
    const noise = (random() - 0.5) * 200
    const predicted = Math.max(0, actual + noise)
    const error = Math.abs(actual - predicted)
    points.push({
      actualValue: parseFloat(actual.toFixed(2)),
      predictedValue: parseFloat(predicted.toFixed(2)),
      error: parseFloat(error.toFixed(2)),
    })
  }
  return points
}

const scatterPlot = generateScatterData()

const featureImportance: FeatureImportanceDataPoint[] = [
  { variable: "age_category_at_creation", shapley: 44, gini: 38 },
  { variable: "income", shapley: 30, gini: 34 },
  { variable: "region", shapley: 21, gini: 18 },
  { variable: "gender", shapley: 4, gini: 8 },
]

// Prediction density – bell-shaped curve centered around predicted value
function gaussian(x: number, mean: number, std: number, scale: number) {
  return scale * Math.exp(-0.5 * ((x - mean) / std) ** 2)
}

const predictionDensity: CVPredictionDensityPoint[] = Array.from({ length: 80 }, (_, i) => {
  const x = 100 + (i / 79) * 900 // range 100 to 1000
  return {
    x: parseFloat(x.toFixed(0)),
    density: parseFloat(gaussian(x, 480, 120, 0.8).toFixed(4)),
  }
})

const whatIf: CVWhatIfData = {
  features: [
    {
      name: "region",
      displayName: "Region",
      group: "location",
      type: "select",
      value: "Bangkok",
      options: ["Bangkok", "Central", "North", "Northeast", "South", "East", "West"],
    },
    {
      name: "income",
      displayName: "Income Range",
      group: "financial",
      type: "select",
      value: "50001-100000",
      options: ["0-15000", "15001-30000", "30001-50000", "50001-100000", "100001+"],
    },
    {
      name: "age_category_at_creation",
      displayName: "Age Group",
      group: "demographics",
      type: "select",
      value: "36-45",
      options: ["18-25", "26-35", "36-45", "46-60", "over 60"],
    },
    {
      name: "gender",
      displayName: "Gender",
      group: "demographics",
      type: "select",
      value: "M",
      options: ["M", "F"],
    },
  ],
  predictedValue: 480.25,
  valueTier: "medium",
  predictionDensity,
  influentialFeatures: [
    { feature: "age_category_at_creation", displayName: "Age Group", influence: 35 },
    { feature: "income", displayName: "Income Range", influence: 28 },
    { feature: "region", displayName: "Region", influence: -15 },
    { feature: "gender", displayName: "Gender", influence: -5 },
  ],
  recommendations: [
    "Target higher income segments to increase predicted value",
    "Focus on Bangkok and Central regions for higher returns",
    "Prioritize 36-45 age group for maximum customer value",
  ],
}

export const mockCustomerValueEvaluationData: CustomerValueEvaluationData = {
  scatterPlot,
  featureImportance,
  whatIf,
}
