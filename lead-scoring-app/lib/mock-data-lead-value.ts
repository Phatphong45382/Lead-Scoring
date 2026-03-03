// Mock data for Lead Value page
// Structured to match future API response shape for easy swap

export interface LeadValueKPIs {
  numberOfLeadScored: number
  avgLeadValue: number
  minLeadValue: number
  maxLeadValue: number
  lastUpdated: string
}

export interface LeadValueDistributionDataPoint {
  value: number
  count: number
}

export interface AvgCVPerConversionRateDataPoint {
  estimatedConversionRate: string
  leadCount: number
  avgEstimatedCustomerValue: number
}

export interface CountByCategoryDataPoint {
  category: string
  leadCount: number
  avgLeadValue: number
}

export interface CountByCategoryFilterOption {
  key: string
  label: string
}

export interface CountByCategoryData {
  filterOptions: CountByCategoryFilterOption[]
  selectedFilter: string
  data: Record<string, CountByCategoryDataPoint[]>
}

export interface LeadValueTableRow {
  leadId: string
  estimatedCustomerValue: number
  conversionModelScore: number
  estimatedConversionRate: number
  leadValue: number
}

export interface LeadValueData {
  kpis: LeadValueKPIs
  leadValueDistribution: LeadValueDistributionDataPoint[]
  avgCVPerConversionRate: AvgCVPerConversionRateDataPoint[]
  countByCategory: CountByCategoryData
  leadValueTable: LeadValueTableRow[]
}

// ---------- Mock Data ----------

const kpis: LeadValueKPIs = {
  numberOfLeadScored: 2326,
  avgLeadValue: 5.83,
  minLeadValue: 0.0,
  maxLeadValue: 82.28,
  lastUpdated: "2026-02-18T16:34:00Z",
}

// Right-skewed distribution peaking around 3-5
const leadValueDistribution: LeadValueDistributionDataPoint[] = [
  { value: 0, count: 50 },
  { value: 1, count: 280 },
  { value: 2, count: 520 },
  { value: 3, count: 680 },
  { value: 4, count: 720 },
  { value: 5, count: 650 },
  { value: 6, count: 480 },
  { value: 7, count: 370 },
  { value: 8, count: 280 },
  { value: 9, count: 200 },
  { value: 10, count: 150 },
  { value: 12, count: 100 },
  { value: 14, count: 80 },
  { value: 16, count: 60 },
  { value: 18, count: 40 },
  { value: 20, count: 30 },
  { value: 22, count: 25 },
  { value: 25, count: 20 },
  { value: 30, count: 10 },
  { value: 40, count: 5 },
  { value: 50, count: 2 },
  { value: 60, count: 1 },
  { value: 70, count: 1 },
  { value: 80, count: 0 },
]

const avgCVPerConversionRate: AvgCVPerConversionRateDataPoint[] = [
  { estimatedConversionRate: "1", leadCount: 260, avgEstimatedCustomerValue: 30 },
  { estimatedConversionRate: "2", leadCount: 10, avgEstimatedCustomerValue: 15 },
  { estimatedConversionRate: "4", leadCount: 660, avgEstimatedCustomerValue: 65 },
  { estimatedConversionRate: "5", leadCount: 670, avgEstimatedCustomerValue: 78 },
  { estimatedConversionRate: "6", leadCount: 480, avgEstimatedCustomerValue: 82 },
  { estimatedConversionRate: "7", leadCount: 0, avgEstimatedCustomerValue: 75 },
  { estimatedConversionRate: "8", leadCount: 260, avgEstimatedCustomerValue: 55 },
  { estimatedConversionRate: "9", leadCount: 0, avgEstimatedCustomerValue: 78 },
  { estimatedConversionRate: "10", leadCount: 240, avgEstimatedCustomerValue: 60 },
  { estimatedConversionRate: "11", leadCount: 240, avgEstimatedCustomerValue: 65 },
  { estimatedConversionRate: "12", leadCount: 0, avgEstimatedCustomerValue: 55 },
  { estimatedConversionRate: "13", leadCount: 220, avgEstimatedCustomerValue: 50 },
  { estimatedConversionRate: "14", leadCount: 0, avgEstimatedCustomerValue: 42 },
  { estimatedConversionRate: "16", leadCount: 0, avgEstimatedCustomerValue: 35 },
  { estimatedConversionRate: "17", leadCount: 0, avgEstimatedCustomerValue: 55 },
  { estimatedConversionRate: "18", leadCount: 210, avgEstimatedCustomerValue: 58 },
]

const countByCategory: CountByCategoryData = {
  filterOptions: [
    { key: "region", label: "region" },
    { key: "income", label: "income" },
    { key: "age_category_at_creation", label: "age_category_at_creation" },
    { key: "gender", label: "gender" },
  ],
  selectedFilter: "region",
  data: {
    region: [
      { category: "Alsace", leadCount: 45, avgLeadValue: 5.2 },
      { category: "Aquitaine", leadCount: 120, avgLeadValue: 8.5 },
      { category: "Auvergne", leadCount: 110, avgLeadValue: 9.2 },
      { category: "Basse-Normandie", leadCount: 105, avgLeadValue: 7.0 },
      { category: "Bourgogne", leadCount: 95, avgLeadValue: 3.5 },
      { category: "Bretagne", leadCount: 260, avgLeadValue: 6.8 },
      { category: "Centre", leadCount: 100, avgLeadValue: 5.5 },
      { category: "Champagne-Ardenne", leadCount: 150, avgLeadValue: 4.8 },
      { category: "Corse", leadCount: 80, avgLeadValue: 3.2 },
      { category: "Franche-Comté", leadCount: 100, avgLeadValue: 3.8 },
      { category: "Haute-Normandie", leadCount: 100, avgLeadValue: 4.0 },
      { category: "Languedoc-Roussillon", leadCount: 100, avgLeadValue: 3.0 },
      { category: "Limousin", leadCount: 100, avgLeadValue: 3.5 },
      { category: "Lorraine", leadCount: 200, avgLeadValue: 7.2 },
      { category: "Midi-Pyrénées", leadCount: 90, avgLeadValue: 4.2 },
      { category: "Nord-Pas-de-Calais", leadCount: 120, avgLeadValue: 8.8 },
      { category: "Pays de la Loire", leadCount: 100, avgLeadValue: 4.0 },
      { category: "Picardie", leadCount: 60, avgLeadValue: 3.5 },
      { category: "Poitou-Charentes", leadCount: 80, avgLeadValue: 3.0 },
      { category: "Provence-Côte d'Azur", leadCount: 100, avgLeadValue: 10.0 },
      { category: "Rhône-Alpes", leadCount: 110, avgLeadValue: 10.5 },
      { category: "Others", leadCount: 210, avgLeadValue: 12.5 },
    ],
    income: [
      { category: "0-15000", leadCount: 380, avgLeadValue: 2.1 },
      { category: "15001-30000", leadCount: 620, avgLeadValue: 4.5 },
      { category: "30001-50000", leadCount: 550, avgLeadValue: 6.8 },
      { category: "50001-100000", leadCount: 480, avgLeadValue: 8.2 },
      { category: "100001+", leadCount: 296, avgLeadValue: 12.4 },
    ],
    age_category_at_creation: [
      { category: "18-25", leadCount: 310, avgLeadValue: 3.2 },
      { category: "26-35", leadCount: 580, avgLeadValue: 5.8 },
      { category: "36-45", leadCount: 620, avgLeadValue: 7.4 },
      { category: "46-60", leadCount: 510, avgLeadValue: 6.1 },
      { category: "over 60", leadCount: 306, avgLeadValue: 4.5 },
    ],
    gender: [
      { category: "M", leadCount: 1250, avgLeadValue: 6.2 },
      { category: "F", leadCount: 1076, avgLeadValue: 5.4 },
    ],
  },
}

// Simple RNG for consistent mock data
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

const random = seededRandom(123)

const leadValueTable: LeadValueTableRow[] = Array.from({ length: 12 }, () => {
  const ecv = 10 + random() * 80
  const cms = 50 + random() * 15
  const ecr = 1 + random() * 18
  const lv = (ecv * ecr) / 100
  return {
    leadId: Array.from({ length: 32 }, () => "0123456789abcdef"[Math.floor(random() * 16)]).join(""),
    estimatedCustomerValue: parseFloat(ecv.toFixed(12)),
    conversionModelScore: parseFloat(cms.toFixed(12)),
    estimatedConversionRate: parseFloat(ecr.toFixed(2)),
    leadValue: parseFloat(lv.toFixed(16)),
  }
})

export const mockLeadValueData: LeadValueData = {
  kpis,
  leadValueDistribution,
  avgCVPerConversionRate,
  countByCategory,
  leadValueTable,
}
