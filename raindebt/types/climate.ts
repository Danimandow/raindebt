export interface NASAPowerResponse {
  type: string;
  geometry: { type: string; coordinates: [number, number, number] };
  properties: {
    parameter: {
      PRECTOTCORR: Record<string, number>;
      T2M: Record<string, number>;
      T2M_MAX: Record<string, number>;
      T2M_MIN: Record<string, number>;
      RH2M?: Record<string, number>;
    };
  };
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  daily: {
    time: string[];
    precipitation_sum: (number | null)[];
    temperature_2m_mean: (number | null)[];
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
    relative_humidity_2m_mean?: (number | null)[];
  };
  daily_units: Record<string, string>;
}

export interface DailyClimateData {
  date: string;
  precipitation_mm: number | null;
  temperature_avg_c: number | null;
  temperature_max_c: number | null;
  temperature_min_c: number | null;
  relative_humidity_pct: number | null;
  source: "nasa_power" | "open_meteo";
}

export interface SPIResult {
  value: number;
  classification: SPIClassification;
  accumulated_precip_mm: number;
  historical_average_mm: number;
  deficit_mm: number;
  period_days: number;
}

export type SPICategory =
  | "extremely_wet"
  | "very_wet"
  | "moderately_wet"
  | "near_normal"
  | "moderately_dry"
  | "severely_dry"
  | "extremely_dry";

export interface SPIClassification {
  category: SPICategory;
  label: string;
  color: string;
  severity: "none" | "low" | "medium" | "high" | "critical";
}

export interface GammaParameters {
  alpha: number;
  beta: number;
}
