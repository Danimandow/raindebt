import { supabase } from "@/lib/supabase";
import { fetchClimateData } from "@/lib/api/climate-data";
import { calculateSimplifiedSPI } from "@/lib/calculations/spi";
import { classifySPI } from "@/lib/utils/spi-classification";
import { getDateNDaysAgo, toISODate } from "@/lib/utils/date";
import type { ClimateRecord, Property } from "@/types/database";
import type { DailyClimateData } from "@/types/climate";

export async function getClimateRecords(
  propertyId: string, startDate: string, endDate: string
): Promise<ClimateRecord[]> {
  const { data, error } = await supabase
    .from("climate_records").select("*")
    .eq("property_id", propertyId)
    .gte("record_date", startDate).lte("record_date", endDate)
    .order("record_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ClimateRecord[];
}

export async function storeClimateRecords(propertyId: string, records: DailyClimateData[]): Promise<void> {
  const rows = records.map((r) => ({
    property_id: propertyId, record_date: r.date,
    precipitation_mm: r.precipitation_mm, temperature_avg_c: r.temperature_avg_c,
    temperature_max_c: r.temperature_max_c, temperature_min_c: r.temperature_min_c,
    relative_humidity_pct: r.relative_humidity_pct, data_source: r.source,
  }));
  const { error } = await supabase
    .from("climate_records").upsert(rows, { onConflict: "property_id,record_date" });
  if (error) throw error;
}

export async function fetchAndStoreClimateData(property: Property): Promise<void> {
  const endDate = getDateNDaysAgo(1);
  const startDate = getDateNDaysAgo(90);
  const records = await fetchClimateData(property.latitude, property.longitude, startDate, endDate);
  if (records.length > 0) await storeClimateRecords(property.id, records);

  const precipValues = records.filter((r) => r.precipitation_mm !== null).map((r) => r.precipitation_mm!);
  if (precipValues.length >= 30) {
    const recentPrecip = precipValues.slice(-30).reduce((a, b) => a + b, 0);
    const historicalPrecip = precipValues.slice(0, -30);
    const spi = calculateSimplifiedSPI(historicalPrecip, recentPrecip);
    if (spi !== null) {
      const classification = classifySPI(spi);
      await supabase.from("properties").update({
        current_spi: spi, current_spi_category: classification.label,
        last_data_fetch: new Date().toISOString(),
      }).eq("id", property.id);
    }
  }
}

export async function getLatestPrecipitation(propertyId: string, days: number = 90): Promise<ClimateRecord[]> {
  return getClimateRecords(propertyId, toISODate(getDateNDaysAgo(days)), toISODate(new Date()));
}
