// Mock data for Customer Value page
// Structured to match future API response shape for easy swap

export interface CustomerValueKPIs {
  numberOfCustomers: number;
  avgCustomerValue: number;
  minCustomerValue: number;
  maxCustomerValue: number;
  lastUpdated: string; // ISO date-time
}

export interface AvgValueByDateDataPoint {
  date: string;
  avgValue: number;
}

export interface CategoryFilterOption {
  key: string;
  label: string;
}

export interface ValueByCategoryDataPoint {
  category: string;
  customersCount: number;
  avgCustomerValue: number;
}

export interface ValueByCategoryData {
  filterOptions: CategoryFilterOption[];
  selectedFilter: string;
  data: Record<string, ValueByCategoryDataPoint[]>;
}

export interface CustomerValueData {
  kpis: CustomerValueKPIs;
  avgValueByDate: AvgValueByDateDataPoint[];
  valueByCategory: ValueByCategoryData;
}

// ---------- Mock Data ----------

const kpis: CustomerValueKPIs = {
  numberOfCustomers: 6647,
  avgCustomerValue: 38.0,
  minCustomerValue: 0.0,
  maxCustomerValue: 2187.57,
  lastUpdated: "2026-02-18T16:34:00",
};

// Average customer value by creation date (monthly from 2020-01 to 2023-07)
const avgValueByDate: AvgValueByDateDataPoint[] = [
  { date: "2020-01-01", avgValue: 95 },
  { date: "2020-02-01", avgValue: 112 },
  { date: "2020-03-01", avgValue: 155 },
  { date: "2020-04-01", avgValue: 220 },
  { date: "2020-05-01", avgValue: 160 },
  { date: "2020-06-01", avgValue: 130 },
  { date: "2020-07-01", avgValue: 100 },
  { date: "2020-08-01", avgValue: 85 },
  { date: "2020-09-01", avgValue: 90 },
  { date: "2020-10-01", avgValue: 55 },
  { date: "2020-11-01", avgValue: 70 },
  { date: "2020-12-01", avgValue: 45 },
  { date: "2021-01-01", avgValue: 140 },
  { date: "2021-02-01", avgValue: 135 },
  { date: "2021-03-01", avgValue: 100 },
  { date: "2021-04-01", avgValue: 210 },
  { date: "2021-05-01", avgValue: 80 },
  { date: "2021-06-01", avgValue: 60 },
  { date: "2021-07-01", avgValue: 55 },
  { date: "2021-08-01", avgValue: 50 },
  { date: "2021-09-01", avgValue: 45 },
  { date: "2021-10-01", avgValue: 60 },
  { date: "2021-11-01", avgValue: 55 },
  { date: "2021-12-01", avgValue: 40 },
  { date: "2022-01-01", avgValue: 70 },
  { date: "2022-02-01", avgValue: 55 },
  { date: "2022-03-01", avgValue: 50 },
  { date: "2022-04-01", avgValue: 65 },
  { date: "2022-05-01", avgValue: 45 },
  { date: "2022-06-01", avgValue: 50 },
  { date: "2022-07-01", avgValue: 80 },
  { date: "2022-08-01", avgValue: 55 },
  { date: "2022-09-01", avgValue: 105 },
  { date: "2022-10-01", avgValue: 60 },
  { date: "2022-11-01", avgValue: 45 },
  { date: "2022-12-01", avgValue: 35 },
  { date: "2023-01-01", avgValue: 50 },
  { date: "2023-02-01", avgValue: 40 },
  { date: "2023-03-01", avgValue: 55 },
  { date: "2023-04-01", avgValue: 70 },
  { date: "2023-05-01", avgValue: 45 },
  { date: "2023-06-01", avgValue: 110 },
  { date: "2023-07-01", avgValue: 100 },
];

// Customer count and average customer value by category
const valueByCategoryData: ValueByCategoryData = {
  filterOptions: [
    { key: "age_category_at_creation", label: "age_category_at_creation" },
    { key: "region", label: "region" },
    { key: "income", label: "income" },
    { key: "gender", label: "gender" },
  ],
  selectedFilter: "age_category_at_creation",
  data: {
    age_category_at_creation: [
      { category: "20 to 30 yo", customersCount: 4050, avgCustomerValue: 28 },
      { category: "30 to 40 yo", customersCount: 1300, avgCustomerValue: 42 },
      { category: "40 to 50 yo", customersCount: 700, avgCustomerValue: 52 },
      { category: "50 to 60 yo", customersCount: 320, avgCustomerValue: 65 },
      { category: "over 60", customersCount: 180, avgCustomerValue: 78 },
    ],
    region: [
      { category: "North", customersCount: 1800, avgCustomerValue: 42 },
      { category: "South", customersCount: 2100, avgCustomerValue: 35 },
      { category: "East", customersCount: 1500, avgCustomerValue: 38 },
      { category: "West", customersCount: 1247, avgCustomerValue: 40 },
    ],
    income: [
      { category: "Low", customersCount: 2800, avgCustomerValue: 18 },
      { category: "Medium", customersCount: 2500, avgCustomerValue: 38 },
      { category: "High", customersCount: 1100, avgCustomerValue: 72 },
      { category: "Very High", customersCount: 247, avgCustomerValue: 125 },
    ],
    gender: [
      { category: "M", customersCount: 3400, avgCustomerValue: 40 },
      { category: "F", customersCount: 3247, avgCustomerValue: 36 },
    ],
  },
};

export const mockCustomerValueData: CustomerValueData = {
  kpis,
  avgValueByDate,
  valueByCategory: valueByCategoryData,
};
