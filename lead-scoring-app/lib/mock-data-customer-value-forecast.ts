// Mock data for Customer Value Forecast tab

export interface CustomerValueForecastKPI {
  numberOfLeadScored: number;
  avgEstimatedCustomerValue: number;
  minEstimatedCustomerValue: number;
  maxEstimatedCustomerValue: number;
  lastUpdated: string;
}

export interface LeadsScoredOverTimeDataPoint {
  date: string;
  count: number;
}

export interface ValuePredictionDistributionDataPoint {
  value: number;
  count: number;
}

export interface EstimatedCustomerValueRow {
  leadId: string;
  estimatedCustomerValue: number;
  estimatedConversionRate: number;
  creationDate: string;
  touchpointCount: number;
  region: string;
}

export interface CustomerValueForecastData {
  kpis: CustomerValueForecastKPI;
  leadsScoredOverTime: LeadsScoredOverTimeDataPoint[];
  valuePredictionDistribution: ValuePredictionDistributionDataPoint[];
  estimatedValueTable: EstimatedCustomerValueRow[];
}

// ---------- Mock Data ----------

const forecastKPIs: CustomerValueForecastKPI = {
  numberOfLeadScored: 2326,
  avgEstimatedCustomerValue: 79.88,
  minEstimatedCustomerValue: 0.0,
  maxEstimatedCustomerValue: 1378.24,
  lastUpdated: "2026-02-18T16:34:00",
};

const leadsScoredOverTime: LeadsScoredOverTimeDataPoint[] = [
  { date: "2023-07-16", count: 180 },
  { date: "2023-07-23", count: 305 },
  { date: "2023-07-30", count: 320 },
  { date: "2023-08-06", count: 245 },
  { date: "2023-08-13", count: 185 },
  { date: "2023-08-20", count: 205 },
  { date: "2023-08-27", count: 135 },
  { date: "2023-09-03", count: 150 },
  { date: "2023-09-10", count: 155 },
  { date: "2023-09-17", count: 225 },
  { date: "2023-09-24", count: 215 },
];

// Right-skewed distribution for customer value prediction
const valuePredictionDistribution: ValuePredictionDistributionDataPoint[] = [
  { value: 0, count: 800 },
  { value: 10, count: 2100 },
  { value: 20, count: 1950 },
  { value: 30, count: 1600 },
  { value: 40, count: 1250 },
  { value: 50, count: 1000 },
  { value: 60, count: 820 },
  { value: 80, count: 600 },
  { value: 100, count: 450 },
  { value: 120, count: 350 },
  { value: 150, count: 250 },
  { value: 200, count: 180 },
  { value: 250, count: 130 },
  { value: 300, count: 90 },
  { value: 400, count: 60 },
  { value: 500, count: 40 },
  { value: 600, count: 25 },
  { value: 800, count: 15 },
  { value: 1000, count: 8 },
  { value: 1200, count: 4 },
  { value: 1400, count: 2 },
];

const estimatedValueTable: EstimatedCustomerValueRow[] = [
  { leadId: "99f31ae8c973fc11281643a7f75806df0cd56ac4a290", estimatedCustomerValue: 41.2579, estimatedConversionRate: 0.08, creationDate: "2023-09-05", touchpointCount: 2, region: "Provence" },
  { leadId: "58b11dc0382032c52340aaf5d0d339686c3eec0b1e", estimatedCustomerValue: 28.6290, estimatedConversionRate: 0.08, creationDate: "2023-09-05", touchpointCount: 2, region: "Provence" },
  { leadId: "bbfe5f344dfb5618b13e60041fc21fdd82f5b7928532", estimatedCustomerValue: 93.4600, estimatedConversionRate: 5.97, creationDate: "2023-08-25", touchpointCount: 1, region: "Poitou" },
  { leadId: "43f917dc10ec640bdf8e2dcf59ab806dc5b8436c260", estimatedCustomerValue: 14.6367, estimatedConversionRate: 0.08, creationDate: "2023-08-15", touchpointCount: 2, region: "Nord-P" },
  { leadId: "d485fbf9b993e88ffd2cf0ec09367d91b281c95f33c0", estimatedCustomerValue: 45.5359, estimatedConversionRate: 0.08, creationDate: "2023-09-13", touchpointCount: 3, region: "Basse-" },
  { leadId: "aa449a1d4e88b94a843029b11334c8177f26085697", estimatedCustomerValue: 35.7087, estimatedConversionRate: 9.11, creationDate: "2023-08-10", touchpointCount: 1, region: "Proven" },
  { leadId: "744675be2d77e0fbbd8785a65775de402b7c7c8077", estimatedCustomerValue: 54.8368, estimatedConversionRate: 5.97, creationDate: "2023-07-14", touchpointCount: 1, region: "Proven" },
  { leadId: "5c7c7697b463b3a48c132d2e508c128dafafe2eb0cff", estimatedCustomerValue: 84.5849, estimatedConversionRate: 9.11, creationDate: "2023-07-16", touchpointCount: 1, region: "Aquita" },
  { leadId: "cbd4616e5b31548413c59ebb5b5bd0f9f3844b335a", estimatedCustomerValue: 22.3932, estimatedConversionRate: 4.89, creationDate: "2023-07-18", touchpointCount: 1, region: "Midi-P" },
  { leadId: "e2a8f1c9d4b67035a8c1e2d9f5b34a17cc91d2e8b4f0", estimatedCustomerValue: 156.4210, estimatedConversionRate: 12.34, creationDate: "2023-07-22", touchpointCount: 5, region: "Île-de" },
];

export const mockCustomerValueForecastData: CustomerValueForecastData = {
  kpis: forecastKPIs,
  leadsScoredOverTime,
  valuePredictionDistribution,
  estimatedValueTable,
};
