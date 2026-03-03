/**
 * Prediction Service
 *
 * Mock prediction engine for Lead Simulator & Value Simulator.
 * When API is ready, swap USE_MOCK to false and update the fetch calls.
 *
 * Architecture:
 *   predictLeadConversion(features) → LeadPredictionResult
 *   predictCustomerValue(features)  → CustomerValuePredictionResult
 *
 * Each function accepts a Record<string, string | number> of feature values
 * and returns a prediction result. The mock implementation uses simple
 * weighted scoring; the real implementation will POST to the ML API.
 */

const USE_MOCK = true
const API_BASE = "/api/v1/predict"

// ── Types ──

export interface LeadInfluence {
  feature: string
  displayName: string
  influence: number
}

export interface LeadPredictionResult {
  prediction: "true" | "false"
  probabilityTrue: number
  threshold: number
  influentialFeatures: LeadInfluence[]
  recommendations: string[]
}

export interface CustomerValueInfluence {
  feature: string
  displayName: string
  influence: number
}

export type ValueTier = "high" | "medium" | "low"

export interface CustomerValuePredictionResult {
  predictedValue: number
  valueTier: ValueTier
  influentialFeatures: CustomerValueInfluence[]
  recommendations: string[]
}

// ── Lead Conversion: Mock Scoring ──

const LEAD_FEATURE_WEIGHTS: Record<string, { weight: number; displayName: string; baselineValue: number | string }> = {
  creation_date: { weight: -0.08, displayName: "Registration Date", baselineValue: "2022-08-07" },
  gender: { weight: 0.02, displayName: "Gender", baselineValue: "M" },
  age_category_at_creation: { weight: 0.05, displayName: "Age Group", baselineValue: "over 60" },
  touchpoint_count: { weight: 0.06, displayName: "Total Touchpoints", baselineValue: 1 },
  touchpoint_period_days: { weight: 0.003, displayName: "Engagement Period", baselineValue: 0 },
  online_form_count: { weight: 0.04, displayName: "Online Form Submissions", baselineValue: 0 },
  paid_advertising_count: { weight: 0.03, displayName: "Paid Ad Interactions", baselineValue: 0 },
  email_count: { weight: 0.05, displayName: "Email Touchpoints", baselineValue: 0 },
}

const AGE_SCORE: Record<string, number> = {
  "18-25": 0.7,
  "26-35": 0.85,
  "36-45": 0.9,
  "46-60": 0.6,
  "over 60": 0.4,
}

const GENDER_SCORE: Record<string, number> = {
  M: 0.5,
  F: 0.55,
}

function mockLeadPrediction(features: Record<string, string | number>): LeadPredictionResult {
  const threshold = 60.0

  // Base probability
  let score = 25.0

  // Age contribution
  const age = String(features.age_category_at_creation ?? "over 60")
  score += (AGE_SCORE[age] ?? 0.5) * 15

  // Gender
  const gender = String(features.gender ?? "M")
  score += (GENDER_SCORE[gender] ?? 0.5) * 3

  // Engagement features (higher = more likely to convert)
  const touchpoints = Number(features.touchpoint_count ?? 0)
  score += Math.min(touchpoints * 3.5, 25)

  const emailCount = Number(features.email_count ?? 0)
  score += Math.min(emailCount * 2.5, 18)

  const onlineForms = Number(features.online_form_count ?? 0)
  score += Math.min(onlineForms * 2.0, 12)

  const paidAds = Number(features.paid_advertising_count ?? 0)
  score += Math.min(paidAds * 1.5, 8)

  // Engagement period
  const period = Number(features.touchpoint_period_days ?? 0)
  score += Math.min(period * 0.02, 6)

  // Clamp to 0-100
  const probability = Math.max(2, Math.min(98, score))

  // Calculate per-feature influence (difference from baseline)
  const influences: LeadInfluence[] = []

  // Touchpoints influence
  const tpDelta = (touchpoints - 1) * 3.5
  if (Math.abs(tpDelta) > 0.5) {
    influences.push({ feature: "touchpoint_count", displayName: "Total Touchpoints", influence: Math.round(tpDelta) })
  }

  // Email
  const emDelta = emailCount * 2.5
  if (Math.abs(emDelta) > 0.5) {
    influences.push({ feature: "email_count", displayName: "Email Touchpoints", influence: Math.round(emDelta) })
  }

  // Age
  const ageDelta = ((AGE_SCORE[age] ?? 0.5) - 0.4) * 15
  influences.push({ feature: "age_category_at_creation", displayName: "Age Group", influence: Math.round(ageDelta) })

  // Online forms
  const ofDelta = onlineForms * 2.0
  if (Math.abs(ofDelta) > 0.5) {
    influences.push({ feature: "online_form_count", displayName: "Online Form Submissions", influence: Math.round(ofDelta) })
  }

  // Paid ads
  const paDelta = paidAds * 1.5
  if (Math.abs(paDelta) > 0.5) {
    influences.push({ feature: "paid_advertising_count", displayName: "Paid Ad Interactions", influence: Math.round(paDelta) })
  }

  // Period
  const pdDelta = period * 0.02 - 3
  influences.push({ feature: "touchpoint_period_days", displayName: "Engagement Period", influence: Math.round(pdDelta) })

  // Gender
  const gDelta = ((GENDER_SCORE[gender] ?? 0.5) - 0.5) * 3
  if (Math.abs(gDelta) > 0.3) {
    influences.push({ feature: "gender", displayName: "Gender", influence: Math.round(gDelta) })
  }

  // Sort by absolute influence descending
  influences.sort((a, b) => Math.abs(b.influence) - Math.abs(a.influence))

  // Generate recommendations from negative influences
  const recommendations: string[] = []
  const negatives = influences.filter((i) => i.influence < 0)
  const positives = influences.filter((i) => i.influence > 0)

  if (touchpoints < 5) recommendations.push("Increase total touchpoints — leads with 5+ touchpoints convert 2x more")
  if (emailCount < 3) recommendations.push("Add email touchpoints to strengthen engagement signals")
  if (period < 60) recommendations.push("Extend the engagement period with nurturing campaigns")
  if (onlineForms === 0) recommendations.push("Encourage online form submissions to capture intent")

  if (recommendations.length === 0 && probability >= threshold) {
    recommendations.push("This lead shows strong conversion signals — prioritize for follow-up")
  }

  return {
    prediction: probability >= threshold ? "true" : "false",
    probabilityTrue: parseFloat(probability.toFixed(1)),
    threshold,
    influentialFeatures: influences.slice(0, 6),
    recommendations: recommendations.slice(0, 3),
  }
}

// ── Customer Value: Mock Scoring ──

const REGION_VALUE: Record<string, number> = {
  Bangkok: 520,
  Central: 450,
  East: 420,
  South: 380,
  North: 350,
  West: 340,
  Northeast: 300,
}

const INCOME_VALUE: Record<string, number> = {
  "100001+": 280,
  "50001-100000": 180,
  "30001-50000": 100,
  "15001-30000": 50,
  "0-15000": 20,
}

const AGE_VALUE: Record<string, number> = {
  "36-45": 120,
  "46-60": 100,
  "26-35": 80,
  "over 60": 60,
  "18-25": 40,
}

const GENDER_VALUE: Record<string, number> = {
  M: 10,
  F: 15,
}

function mockCustomerValuePrediction(features: Record<string, string | number>): CustomerValuePredictionResult {
  const region = String(features.region ?? "Bangkok")
  const income = String(features.income ?? "50001-100000")
  const age = String(features.age_category_at_creation ?? "36-45")
  const gender = String(features.gender ?? "M")

  // Sum up value components
  const regionVal = REGION_VALUE[region] ?? 350
  const incomeVal = INCOME_VALUE[income] ?? 100
  const ageVal = AGE_VALUE[age] ?? 80
  const genderVal = GENDER_VALUE[gender] ?? 10

  // Add some "base" + variation
  const baseValue = 50
  const predictedValue = baseValue + regionVal * 0.4 + incomeVal * 0.5 + ageVal * 0.3 + genderVal * 0.2

  // Determine tier
  let valueTier: ValueTier = "medium"
  if (predictedValue >= 400) valueTier = "high"
  else if (predictedValue < 250) valueTier = "low"

  // Influences — relative to baseline (Bangkok, 50001-100000, 36-45, M)
  const baseRegion = REGION_VALUE["Bangkok"] ?? 520
  const baseIncome = INCOME_VALUE["50001-100000"] ?? 180
  const baseAge = AGE_VALUE["36-45"] ?? 120
  const baseGender = GENDER_VALUE["M"] ?? 10

  const influences: CustomerValueInfluence[] = [
    { feature: "age_category_at_creation", displayName: "Age Group", influence: Math.round((ageVal - baseAge) * 0.3) },
    { feature: "income", displayName: "Income Range", influence: Math.round((incomeVal - baseIncome) * 0.5) },
    { feature: "region", displayName: "Region", influence: Math.round((regionVal - baseRegion) * 0.4) },
    { feature: "gender", displayName: "Gender", influence: Math.round((genderVal - baseGender) * 0.2) },
  ].sort((a, b) => Math.abs(b.influence) - Math.abs(a.influence))

  // Scale influences to make them look like percentages
  const totalAbs = influences.reduce((s, i) => s + Math.abs(i.influence), 0) || 1
  const scaledInfluences = influences.map((i) => ({
    ...i,
    influence: totalAbs > 0 ? Math.round((i.influence / totalAbs) * 100) : 0,
  }))

  // Recommendations
  const recommendations: string[] = []
  if (income !== "100001+" && income !== "50001-100000") {
    recommendations.push("Target higher income segments to increase predicted value")
  }
  if (region !== "Bangkok" && region !== "Central") {
    recommendations.push("Focus on Bangkok and Central regions for higher returns")
  }
  if (age !== "36-45" && age !== "46-60") {
    recommendations.push("Prioritize 36-45 age group for maximum customer value")
  }
  if (recommendations.length === 0) {
    recommendations.push("This customer profile shows strong value potential — prioritize retention")
  }

  return {
    predictedValue: parseFloat(predictedValue.toFixed(2)),
    valueTier,
    influentialFeatures: scaledInfluences,
    recommendations: recommendations.slice(0, 3),
  }
}

// ── Public API ──

export async function predictLeadConversion(
  features: Record<string, string | number>
): Promise<LeadPredictionResult> {
  if (USE_MOCK) {
    // Simulate network latency (50-150ms)
    await new Promise((r) => setTimeout(r, 50 + Math.random() * 100))
    return mockLeadPrediction(features)
  }

  // Real API call
  const res = await fetch(`${API_BASE}/lead-conversion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  })
  if (!res.ok) throw new Error(`Prediction API error: ${res.status}`)
  return res.json()
}

export async function predictCustomerValue(
  features: Record<string, string | number>
): Promise<CustomerValuePredictionResult> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 50 + Math.random() * 100))
    return mockCustomerValuePrediction(features)
  }

  const res = await fetch(`${API_BASE}/customer-value`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  })
  if (!res.ok) throw new Error(`Prediction API error: ${res.status}`)
  return res.json()
}
