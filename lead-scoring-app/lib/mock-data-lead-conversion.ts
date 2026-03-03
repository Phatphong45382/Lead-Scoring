// Mock data for Lead Conversion page
// Structured to match future API response shape for easy swap

export interface NewLeadsDataPoint {
  month: string;
  historical: number;
  scoring: number;
}

export interface ConversionRateDataPoint {
  month: string;
  converted: number;
  notConverted: number;
  rate: number;
}

export interface ConversionLengthDataPoint {
  month: string;
  days: number;
}

export interface TouchpointsBySourceDataPoint {
  source: string;
  "2022": number;
  "2023": number;
  "2024": number;
  "2025": number;
}

export interface CampaignTreemapDataPoint {
  name: string;
  value: number;
  fill: string;
}

export interface LeadsByTouchpointDataPoint {
  touchpoints: string;
  leadCount: number;
  avgConversionRate: number;
}

export interface LeadsByDayDataPoint {
  day: number;
  dayLabel: string;
  leadCount: number;
  avgConversionRate: number;
}

export interface LeadConversionKPIs {
  avgConversionRate: number;
  convLengthRange: string;
  convLengthQ1: number;
  convLengthMedian: number;
  convLengthQ3: number;
}

export interface EstimatedConversionRateDataPoint {
  range: string;
  rate: number;
}

export interface ConfusionMatrixData {
  threshold: number;
  actualTruePredictedTrue: number;
  actualTruePredictedFalse: number;
  actualFalsePredictedTrue: number;
  actualFalsePredictedFalse: number;
  totalActualTrue: number;
  totalActualFalse: number;
  totalPredictedTrue: number;
  totalPredictedFalse: number;
  grandTotal: number;
}

export interface VariableImportanceDataPoint {
  variable: string;
  importance: number;
}

export interface DensityDataPoint {
  x: number;
  classFalse: number;
  classTrue: number;
}

export interface DensityChartData {
  points: DensityDataPoint[];
  threshold: number;
}

export interface WhatIfFeature {
  name: string;
  displayName: string;
  group: "demographics" | "engagement" | "timing";
  type: "date" | "select" | "number";
  value: string | number;
  options?: string[];
  min?: number;
  max?: number;
}

export interface WhatIfInfluentialFeature {
  feature: string;
  displayName: string;
  influence: number; // positive = toward true, negative = toward false
}

export interface WhatIfData {
  features: WhatIfFeature[];
  prediction: "true" | "false";
  probabilityTrue: number;
  threshold: number;
  influentialFeatures: WhatIfInfluentialFeature[];
  recommendations: string[];
}

export interface LeadConversionData {
  newLeadsOverTime: NewLeadsDataPoint[];
  conversionRateOverTime: ConversionRateDataPoint[];
  avgConversionLength: ConversionLengthDataPoint[];
  touchpointsBySource: TouchpointsBySourceDataPoint[];
  campaignTreemap: CampaignTreemapDataPoint[];
  leadsByTouchpoint: LeadsByTouchpointDataPoint[];
  leadsByDay: LeadsByDayDataPoint[];
  kpis: LeadConversionKPIs;
  estimatedConversionRates: EstimatedConversionRateDataPoint[];
  confusionMatrix: ConfusionMatrixData;
  variableImportance: VariableImportanceDataPoint[];
  densityChart: DensityChartData;
  whatIf: WhatIfData;
}

// ---------- Mock Data ----------

const newLeadsOverTime: NewLeadsDataPoint[] = [
  { month: "Jan 2024", historical: 120, scoring: 45 },
  { month: "Feb 2024", historical: 135, scoring: 52 },
  { month: "Mar 2024", historical: 148, scoring: 61 },
  { month: "Apr 2024", historical: 142, scoring: 58 },
  { month: "May 2024", historical: 165, scoring: 72 },
  { month: "Jun 2024", historical: 158, scoring: 68 },
  { month: "Jul 2024", historical: 175, scoring: 80 },
  { month: "Aug 2024", historical: 182, scoring: 85 },
  { month: "Sep 2024", historical: 170, scoring: 78 },
  { month: "Oct 2024", historical: 190, scoring: 92 },
  { month: "Nov 2024", historical: 198, scoring: 95 },
  { month: "Dec 2024", historical: 185, scoring: 88 },
];

const conversionRateOverTime: ConversionRateDataPoint[] = [
  { month: "Jan 2024", converted: 38, notConverted: 127, rate: 23.03 },
  { month: "Feb 2024", converted: 45, notConverted: 142, rate: 24.06 },
  { month: "Mar 2024", converted: 52, notConverted: 157, rate: 24.88 },
  { month: "Apr 2024", converted: 48, notConverted: 152, rate: 24.0 },
  { month: "May 2024", converted: 62, notConverted: 175, rate: 26.16 },
  { month: "Jun 2024", converted: 58, notConverted: 168, rate: 25.66 },
  { month: "Jul 2024", converted: 70, notConverted: 185, rate: 27.45 },
  { month: "Aug 2024", converted: 75, notConverted: 192, rate: 28.09 },
  { month: "Sep 2024", converted: 68, notConverted: 180, rate: 27.42 },
  { month: "Oct 2024", converted: 82, notConverted: 200, rate: 29.08 },
  { month: "Nov 2024", converted: 88, notConverted: 205, rate: 30.03 },
  { month: "Dec 2024", converted: 80, notConverted: 193, rate: 29.3 },
];

const avgConversionLength: ConversionLengthDataPoint[] = [
  { month: "Jan 2024", days: 45 },
  { month: "Feb 2024", days: 42 },
  { month: "Mar 2024", days: 38 },
  { month: "Apr 2024", days: 40 },
  { month: "May 2024", days: 36 },
  { month: "Jun 2024", days: 35 },
  { month: "Jul 2024", days: 33 },
  { month: "Aug 2024", days: 31 },
  { month: "Sep 2024", days: 32 },
  { month: "Oct 2024", days: 29 },
  { month: "Nov 2024", days: 28 },
  { month: "Dec 2024", days: 30 },
];

const touchpointsBySource: TouchpointsBySourceDataPoint[] = [
  { source: "Email", "2022": 320, "2023": 450, "2024": 580, "2025": 210 },
  { source: "Online Form", "2022": 280, "2023": 390, "2024": 510, "2025": 185 },
  { source: "Referral", "2022": 150, "2023": 220, "2024": 310, "2025": 120 },
  { source: "Paid Advertising", "2022": 200, "2023": 310, "2024": 420, "2025": 155 },
];

const TREEMAP_COLORS = ["#3DB9EB", "#B8E4F8", "#8B7EC8", "#6B5CA5", "#FFC223", "#FFD699"];

const campaignTreemap: CampaignTreemapDataPoint[] = [
  { name: "Email Drip", value: 1420, fill: TREEMAP_COLORS[0] },
  { name: "Webinar Invite", value: 980, fill: TREEMAP_COLORS[1] },
  { name: "Product Demo", value: 850, fill: TREEMAP_COLORS[2] },
  { name: "Newsletter", value: 720, fill: TREEMAP_COLORS[3] },
  { name: "Retargeting", value: 650, fill: TREEMAP_COLORS[4] },
  { name: "Social Media", value: 540, fill: TREEMAP_COLORS[5] },
  { name: "Cold Outreach", value: 480, fill: TREEMAP_COLORS[0] },
  { name: "Event Follow-up", value: 390, fill: TREEMAP_COLORS[1] },
  { name: "Content Offer", value: 350, fill: TREEMAP_COLORS[2] },
  { name: "Partner Referral", value: 280, fill: TREEMAP_COLORS[3] },
];

const leadsByTouchpoint: LeadsByTouchpointDataPoint[] = [
  { touchpoints: "1", leadCount: 420, avgConversionRate: 8.5 },
  { touchpoints: "2", leadCount: 680, avgConversionRate: 15.2 },
  { touchpoints: "3", leadCount: 850, avgConversionRate: 22.8 },
  { touchpoints: "4", leadCount: 720, avgConversionRate: 28.4 },
  { touchpoints: "5", leadCount: 540, avgConversionRate: 35.1 },
  { touchpoints: "6", leadCount: 380, avgConversionRate: 40.6 },
  { touchpoints: "7", leadCount: 250, avgConversionRate: 44.2 },
  { touchpoints: "8+", leadCount: 160, avgConversionRate: 48.8 },
];

const leadsByDay: LeadsByDayDataPoint[] = [
  { day: 1, dayLabel: "Mon", leadCount: 580, avgConversionRate: 26.3 },
  { day: 2, dayLabel: "Tue", leadCount: 620, avgConversionRate: 28.1 },
  { day: 3, dayLabel: "Wed", leadCount: 650, avgConversionRate: 29.5 },
  { day: 4, dayLabel: "Thu", leadCount: 610, avgConversionRate: 27.8 },
  { day: 5, dayLabel: "Fri", leadCount: 540, avgConversionRate: 25.4 },
  { day: 6, dayLabel: "Sat", leadCount: 280, avgConversionRate: 18.2 },
  { day: 7, dayLabel: "Sun", leadCount: 220, avgConversionRate: 15.6 },
];

const kpis: LeadConversionKPIs = {
  avgConversionRate: 26.59,
  convLengthRange: "7 – 120",
  convLengthQ1: 21,
  convLengthMedian: 34,
  convLengthQ3: 52,
};

const estimatedConversionRates: EstimatedConversionRateDataPoint[] = [
  { range: "0% - 17.5%", rate: 0.08 },
  { range: "17.5% - 54.0%", rate: 4.31 },
  { range: "54.0% - 55.5%", rate: 4.89 },
  { range: "55.5% - 56.2%", rate: 5.88 },
  { range: "56.2% - 56.9%", rate: 4.64 },
  { range: "56.9% - 57.5%", rate: 5.97 },
  { range: "57.5% - 58.3%", rate: 9.11 },
  { range: "58.3% - 59.2%", rate: 10.02 },
  { range: "59.2% - 60.4%", rate: 12.51 },
  { range: "60.4% - 100%", rate: 19.39 },
];

const confusionMatrix: ConfusionMatrixData = {
  threshold: 0,
  actualTruePredictedTrue: 269,
  actualTruePredictedFalse: 659,
  totalActualTrue: 928,
  actualFalsePredictedTrue: 1088,
  actualFalsePredictedFalse: 10055,
  totalActualFalse: 11143,
  totalPredictedTrue: 1357,
  totalPredictedFalse: 10714,
  grandTotal: 12071,
};

const variableImportance: VariableImportanceDataPoint[] = [
  { variable: "creation_date", importance: 37 },
  { variable: "touchpoint_count", importance: 25 },
  { variable: "hybrid_count", importance: 9 },
  { variable: "email_count", importance: 7 },
  { variable: "region", importance: 4 },
  { variable: "online_form_count", importance: 4 },
  { variable: "yearly_count", importance: 3 },
  { variable: "monthly_count", importance: 2 },
  { variable: "temporary_count", importance: 2 },
  { variable: "age_category_at_creation", importance: 2 },
];

// Density chart mock data – two overlapping bell-ish curves
function gaussian(x: number, mean: number, std: number, scale: number) {
  return scale * Math.exp(-0.5 * ((x - mean) / std) ** 2);
}

const densityPoints: DensityDataPoint[] = Array.from({ length: 100 }, (_, i) => {
  const x = i / 100;
  return {
    x: parseFloat(x.toFixed(2)),
    classFalse: parseFloat(gaussian(x, 0.52, 0.08, 10.5).toFixed(2)),
    classTrue: parseFloat(gaussian(x, 0.58, 0.06, 13.08).toFixed(2)),
  };
});

const densityChart: DensityChartData = {
  points: densityPoints,
  threshold: 0.56,
};

const whatIf: WhatIfData = {
  features: [
    { name: "creation_date", displayName: "Registration Date", group: "timing", type: "date", value: "2022-08-07" },
    { name: "gender", displayName: "Gender", group: "demographics", type: "select", value: "M", options: ["M", "F"] },
    { name: "age_category_at_creation", displayName: "Age Group", group: "demographics", type: "select", value: "over 60", options: ["18-25", "26-35", "36-45", "46-60", "over 60"] },
    { name: "touchpoint_count", displayName: "Total Touchpoints", group: "engagement", type: "number", value: 1, min: 1, max: 12 },
    { name: "touchpoint_period_days", displayName: "Engagement Period (days)", group: "timing", type: "number", value: 0, min: 0, max: 416 },
    { name: "online_form_count", displayName: "Online Form Submissions", group: "engagement", type: "number", value: 0, min: 0, max: 9 },
    { name: "paid_advertising_count", displayName: "Paid Ad Interactions", group: "engagement", type: "number", value: 0, min: 0, max: 7 },
    { name: "email_count", displayName: "Email Touchpoints", group: "engagement", type: "number", value: 0, min: 0, max: 10 },
  ],
  prediction: "false",
  probabilityTrue: 43.50,
  threshold: 60.0,
  influentialFeatures: [
    { feature: "creation_date", displayName: "Registration Date", influence: -18 },
    { feature: "hybrid_count", displayName: "Hybrid Interactions", influence: 15 },
    { feature: "email_count", displayName: "Email Touchpoints", influence: 14 },
    { feature: "touchpoint_period_days", displayName: "Engagement Period", influence: -10 },
    { feature: "touchpoint_count", displayName: "Total Touchpoints", influence: -8 },
    { feature: "age_category_at_creation", displayName: "Age Group", influence: 5 },
  ],
  recommendations: [
    "Increase email touchpoints to boost engagement signals",
    "Extend the engagement period with follow-up campaigns",
    "Re-engage leads with more recent registration dates",
  ],
};

export const mockLeadConversionData: LeadConversionData = {
  newLeadsOverTime,
  conversionRateOverTime,
  avgConversionLength,
  touchpointsBySource,
  campaignTreemap,
  leadsByTouchpoint,
  leadsByDay,
  kpis,
  estimatedConversionRates,
  confusionMatrix,
  variableImportance,
  densityChart,
  whatIf,
};
