// Mock data for Forecast tab (Estimated Conversion Rate)

export interface LeadsScoredOverTimeDataPoint {
  date: string;
  count: number;
}

export interface LeadsByEstimatedRateDataPoint {
  rate: number;
  rateLabel: string;
  count: number;
}

export interface ConversionScoreRow {
  leadId: string;
  conversionModelScore: number;
  estimatedConversionRate: number;
  creationDate: string;
  touchpointCount: number;
}

export interface ForecastKPI {
  numberOfLeadScored: number;
  minEstimatedConversionRate: number;
  maxEstimatedConversionRate: number;
  lastUpdated: string; // ISO date-time
}

export interface ForecastData {
  kpis: ForecastKPI;
  leadsScoredOverTime: LeadsScoredOverTimeDataPoint[];
  leadsByEstimatedRate: LeadsByEstimatedRateDataPoint[];
  scoreTable: ConversionScoreRow[];
}

// ---------- Mock Data ----------

const leadsScoredOverTime: LeadsScoredOverTimeDataPoint[] = [
  { date: "2023-07-16", count: 180 },
  { date: "2023-07-23", count: 305 },
  { date: "2023-07-30", count: 320 },
  { date: "2023-08-06", count: 245 },
  { date: "2023-08-13", count: 210 },
  { date: "2023-08-20", count: 185 },
  { date: "2023-08-27", count: 205 },
  { date: "2023-09-03", count: 135 },
  { date: "2023-09-10", count: 150 },
  { date: "2023-09-17", count: 225 },
  { date: "2023-09-24", count: 215 },
];

const leadsByEstimatedRate: LeadsByEstimatedRateDataPoint[] = [
  { rate: 2, rateLabel: "2", count: 260 },
  { rate: 4, rateLabel: "4", count: 686 },
  { rate: 6, rateLabel: "6", count: 489 },
  { rate: 8, rateLabel: "8", count: 258 },
  { rate: 10, rateLabel: "10", count: 239 },
  { rate: 12, rateLabel: "12", count: 220 },
  { rate: 14, rateLabel: "14", count: 0 },
  { rate: 16, rateLabel: "16", count: 0 },
  { rate: 18, rateLabel: "18", count: 206 },
];

const scoreTable: ConversionScoreRow[] = [
  { leadId: "99f31ae8c973fc11281643a7f75806df0cd56ac4a290", conversionModelScore: 13.2987, estimatedConversionRate: 0.08, creationDate: "2023-09-05", touchpointCount: 3 },
  { leadId: "58b11dc0382032c52340aaf5d0d339686c3eec0b1e", conversionModelScore: 13.2987, estimatedConversionRate: 0.08, creationDate: "2023-09-05", touchpointCount: 2 },
  { leadId: "bbfe5f344dfb5618b13e60041fc21fdd82f5b7928532", conversionModelScore: 56.9721, estimatedConversionRate: 5.97, creationDate: "2023-08-25", touchpointCount: 7 },
  { leadId: "43f917dc10ec640bdf8e2dcf59ab806dc5b8436c260", conversionModelScore: 10.8881, estimatedConversionRate: 0.08, creationDate: "2023-08-15", touchpointCount: 1 },
  { leadId: "d485fbf9b993e88ffd2cf0ec09367d91b281c95f33c0", conversionModelScore: 10.6471, estimatedConversionRate: 0.08, creationDate: "2023-09-13", touchpointCount: 4 },
  { leadId: "aa449a1d4e88b94a843029b11334c8177f26085697", conversionModelScore: 58.2665, estimatedConversionRate: 9.11, creationDate: "2023-08-10", touchpointCount: 8 },
  { leadId: "744675be2d77e0fbbd8785a65775de402b7c7c8077", conversionModelScore: 57.3626, estimatedConversionRate: 5.97, creationDate: "2023-07-14", touchpointCount: 6 },
  { leadId: "a2e81f5c4930b7d12ef8a6c3d9014e57bb82cf1a90d2", conversionModelScore: 42.1538, estimatedConversionRate: 3.45, creationDate: "2023-08-02", touchpointCount: 5 },
  { leadId: "c7f29d8e1b5643a80e9d2f67c4b8a01253de7f9b4c10", conversionModelScore: 71.4892, estimatedConversionRate: 12.34, creationDate: "2023-07-28", touchpointCount: 11 },
  { leadId: "e5d41c0a9f2b87364c1e0d58a7f93b6240ce1d8b5a73", conversionModelScore: 33.7214, estimatedConversionRate: 2.15, creationDate: "2023-09-01", touchpointCount: 3 },
];

const forecastKPIs: ForecastKPI = {
  numberOfLeadScored: 2369,
  minEstimatedConversionRate: 0.08,
  maxEstimatedConversionRate: 19.39,
  lastUpdated: "2026-02-18T16:34:00",
};

export const mockForecastData: ForecastData = {
  kpis: forecastKPIs,
  leadsScoredOverTime,
  leadsByEstimatedRate,
  scoreTable,
};
