// Mock data for Score New Leads page
// Structured to match future API response shape for easy swap

// ── Model & Dataset Definitions ──

export interface DatasetDefinition {
  key: string
  label: string
  description: string
  required: boolean
  expectedColumns: string[]
}

export interface ModelDefinition {
  id: string
  name: string
  description: string
  icon: "conversion" | "customer_value"
  color: string
  requiredDatasets: DatasetDefinition[]
}

export const AVAILABLE_MODELS: ModelDefinition[] = [
  {
    id: "lead_conversion",
    name: "Lead Conversion",
    description: "Predict the probability that a lead will convert into a customer",
    icon: "conversion",
    color: "#1B7FB5",
    requiredDatasets: [
      {
        key: "new_leads",
        label: "New Leads",
        description: "Lead data to be scored",
        required: true,
        expectedColumns: ["lead_id", "creation_date", "gender", "age_category_at_creation", "region", "income"],
      },
      {
        key: "touchpoints",
        label: "Touchpoints / Campaigns",
        description: "Touchpoint and campaign interaction data",
        required: true,
        expectedColumns: ["lead_id", "touchpoint_type", "touchpoint_date", "campaign_name", "channel"],
      },
      {
        key: "lead_conversion_history",
        label: "Lead Conversion History",
        description: "Historical conversion outcomes for training reference",
        required: true,
        expectedColumns: ["lead_id", "is_converted", "conversion_date", "conversion_length_days"],
      },
    ],
  },
  {
    id: "customer_value",
    name: "Customer Value",
    description: "Predict the estimated lifetime value of a lead as a customer",
    icon: "customer_value",
    color: "#6B5CA5",
    requiredDatasets: [
      {
        key: "new_leads",
        label: "New Leads",
        description: "Lead data to be scored",
        required: true,
        expectedColumns: ["lead_id", "creation_date", "gender", "age_category_at_creation", "region", "income"],
      },
      {
        key: "customer_value_history",
        label: "Customer Value History",
        description: "Historical customer value records",
        required: true,
        expectedColumns: ["customer_id", "customer_value", "creation_date", "segment"],
      },
    ],
  },
]

// ── Scoring Status & Results ──

export interface ScoringJobStatus {
  scenarioId: string
  runId: string
  status: "IDLE" | "UPLOADING" | "RUNNING" | "DONE" | "FAILED"
  progress: number
  message?: string
}

export interface ScoredLeadRow {
  leadId: string
  estimatedConversionRate: number
  estimatedCustomerValue: number
  leadValue: number
  conversionModelScore: number
  region: string
}

export interface ScoringResultSummary {
  totalLeadsScored: number
  avgConversionRate: number
  avgCustomerValue: number
  avgLeadValue: number
  scoredAt: string
}

export interface ScoringResultData {
  summary: ScoringResultSummary
  leads: ScoredLeadRow[]
}

// ── Mock Preview Data per Dataset ──

export const mockDatasetPreviews: Record<string, { columns: string[]; rows: Record<string, string>[]; rowCount: number }> = {
  new_leads: {
    columns: ["lead_id", "creation_date", "gender", "age_category_at_creation", "region", "income"],
    rowCount: 248,
    rows: [
      { lead_id: "a1b2c3d4e5...", creation_date: "2025-11-03", gender: "M", age_category_at_creation: "36-45", region: "Bangkok", income: "50001-100000" },
      { lead_id: "f6g7h8i9j0...", creation_date: "2025-11-05", gender: "F", age_category_at_creation: "26-35", region: "Central", income: "30001-50000" },
      { lead_id: "k1l2m3n4o5...", creation_date: "2025-11-08", gender: "M", age_category_at_creation: "46-60", region: "North", income: "15001-30000" },
      { lead_id: "p6q7r8s9t0...", creation_date: "2025-11-10", gender: "F", age_category_at_creation: "18-25", region: "Northeast", income: "0-15000" },
      { lead_id: "u1v2w3x4y5...", creation_date: "2025-11-12", gender: "M", age_category_at_creation: "over 60", region: "South", income: "100001+" },
    ],
  },
  customer_value_history: {
    columns: ["customer_id", "customer_value", "creation_date", "segment"],
    rowCount: 1520,
    rows: [
      { customer_id: "C-00142", customer_value: "342.50", creation_date: "2023-06-15", segment: "High" },
      { customer_id: "C-00289", customer_value: "128.75", creation_date: "2023-08-22", segment: "Medium" },
      { customer_id: "C-00451", customer_value: "56.20", creation_date: "2024-01-10", segment: "Low" },
      { customer_id: "C-00523", customer_value: "890.00", creation_date: "2023-03-05", segment: "High" },
      { customer_id: "C-00687", customer_value: "215.30", creation_date: "2024-04-18", segment: "Medium" },
    ],
  },
  lead_conversion_history: {
    columns: ["lead_id", "is_converted", "conversion_date", "conversion_length_days"],
    rowCount: 3842,
    rows: [
      { lead_id: "L-10234", is_converted: "true", conversion_date: "2024-03-15", conversion_length_days: "28" },
      { lead_id: "L-10567", is_converted: "false", conversion_date: "", conversion_length_days: "" },
      { lead_id: "L-10891", is_converted: "true", conversion_date: "2024-05-22", conversion_length_days: "45" },
      { lead_id: "L-11234", is_converted: "false", conversion_date: "", conversion_length_days: "" },
      { lead_id: "L-11567", is_converted: "true", conversion_date: "2024-07-08", conversion_length_days: "32" },
    ],
  },
  touchpoints: {
    columns: ["lead_id", "touchpoint_type", "touchpoint_date", "campaign_name", "channel"],
    rowCount: 8915,
    rows: [
      { lead_id: "L-10234", touchpoint_type: "Email", touchpoint_date: "2024-02-10", campaign_name: "Spring Promo", channel: "Email" },
      { lead_id: "L-10234", touchpoint_type: "Webinar", touchpoint_date: "2024-02-18", campaign_name: "Product Demo Q1", channel: "Online" },
      { lead_id: "L-10567", touchpoint_type: "Paid Ad", touchpoint_date: "2024-03-01", campaign_name: "Retargeting Mar", channel: "Google Ads" },
      { lead_id: "L-10891", touchpoint_type: "Referral", touchpoint_date: "2024-04-05", campaign_name: "Partner Program", channel: "Referral" },
      { lead_id: "L-11234", touchpoint_type: "Email", touchpoint_date: "2024-05-12", campaign_name: "Newsletter May", channel: "Email" },
    ],
  },
}

// ── Scoring History ──

export interface ScoringHistoryRecord {
  runId: string
  modelId: string
  modelName: string
  scoredAt: string
  totalLeadsScored: number
  avgScore: number
  status: "completed" | "failed"
  fileName: string
}

export const mockScoringHistory: ScoringHistoryRecord[] = [
  {
    runId: "run_20260225_001",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    scoredAt: "2026-02-25T10:15:00Z",
    totalLeadsScored: 512,
    avgScore: 7.85,
    status: "completed",
    fileName: "leads_feb_batch2.csv",
  },
  {
    runId: "run_20260220_001",
    modelId: "customer_value",
    modelName: "Customer Value",
    scoredAt: "2026-02-20T14:30:00Z",
    totalLeadsScored: 320,
    avgScore: 42.10,
    status: "completed",
    fileName: "leads_feb_batch1.csv",
  },
  {
    runId: "run_20260215_001",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    scoredAt: "2026-02-15T09:45:00Z",
    totalLeadsScored: 185,
    avgScore: 6.23,
    status: "completed",
    fileName: "leads_jan_final.csv",
  },
  {
    runId: "run_20260210_001",
    modelId: "customer_value",
    modelName: "Customer Value",
    scoredAt: "2026-02-10T16:00:00Z",
    totalLeadsScored: 740,
    avgScore: 38.55,
    status: "completed",
    fileName: "leads_jan_batch3.csv",
  },
  {
    runId: "run_20260205_001",
    modelId: "lead_conversion",
    modelName: "Lead Conversion",
    scoredAt: "2026-02-05T11:20:00Z",
    totalLeadsScored: 0,
    avgScore: 0,
    status: "failed",
    fileName: "leads_corrupted.csv",
  },
]

// ── Mock Scoring Results ──

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

const random = seededRandom(777)

export const mockScoringResults: ScoringResultData = {
  summary: {
    totalLeadsScored: 248,
    avgConversionRate: 6.42,
    avgCustomerValue: 34.18,
    avgLeadValue: 2.19,
    scoredAt: "2026-02-27T14:22:00Z",
  },
  leads: Array.from({ length: 20 }, () => {
    const ecr = 1 + random() * 18
    const ecv = 5 + random() * 85
    const lv = (ecr * ecv) / 100
    return {
      leadId: Array.from({ length: 32 }, () => "0123456789abcdef"[Math.floor(random() * 16)]).join(""),
      estimatedConversionRate: parseFloat(ecr.toFixed(2)),
      estimatedCustomerValue: parseFloat(ecv.toFixed(2)),
      leadValue: parseFloat(lv.toFixed(4)),
      conversionModelScore: parseFloat((50 + random() * 15).toFixed(2)),
      region: ["Bangkok", "Central", "North", "Northeast", "South", "East", "West"][Math.floor(random() * 7)],
    }
  }),
}
