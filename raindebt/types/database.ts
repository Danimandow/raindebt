export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  document_number: string | null;
  preferred_language: "pt-BR" | "en-US" | "es-LA";
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  user_id: string;
  name: string;
  latitude: number;
  longitude: number;
  area_hectares: number | null;
  municipality: string | null;
  state: string | null;
  country: string;
  current_spi: number | null;
  current_spi_category: string | null;
  last_data_fetch: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ClimateEventType =
  | "moderate_drought"
  | "severe_drought"
  | "extreme_drought"
  | "excess_rainfall"
  | "dry_spell"
  | "heavy_rainfall";

export type EventSeverity = "low" | "medium" | "high" | "critical";

export interface ClimateRecord {
  id: string;
  property_id: string;
  record_date: string;
  precipitation_mm: number | null;
  temperature_avg_c: number | null;
  temperature_max_c: number | null;
  temperature_min_c: number | null;
  relative_humidity_pct: number | null;
  spi_value: number | null;
  data_source: "nasa_power" | "open_meteo" | "manual";
  created_at: string;
}

export interface ClimateEvent {
  id: string;
  property_id: string;
  event_type: ClimateEventType;
  severity: EventSeverity;
  start_date: string;
  end_date: string | null;
  spi_value: number | null;
  description: string | null;
  is_active: boolean;
  acknowledged: boolean;
  created_at: string;
  updated_at: string;
}

export type ReportStatus = "pending" | "generating" | "completed" | "failed";

export interface TechnicalReport {
  id: string;
  property_id: string;
  user_id: string;
  title: string;
  report_period_start: string;
  report_period_end: string;
  status: ReportStatus;
  file_url: string | null;
  file_size_bytes: number | null;
  spi_summary: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
  generated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: { Row: User; Insert: Omit<User, "created_at" | "updated_at">; Update: Partial<User> };
      properties: { Row: Property; Insert: Omit<Property, "id" | "created_at" | "updated_at">; Update: Partial<Property> };
      climate_records: { Row: ClimateRecord; Insert: Omit<ClimateRecord, "id" | "created_at">; Update: Partial<ClimateRecord> };
      climate_events: { Row: ClimateEvent; Insert: Omit<ClimateEvent, "id" | "created_at" | "updated_at">; Update: Partial<ClimateEvent> };
      technical_reports: { Row: TechnicalReport; Insert: Omit<TechnicalReport, "id" | "created_at" | "updated_at">; Update: Partial<TechnicalReport> };
    };
  };
}
