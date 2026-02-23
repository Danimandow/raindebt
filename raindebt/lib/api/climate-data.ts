import type { DailyClimateData } from "@/types/climate";
import { fetchNASAPowerDaily } from "./nasa-power";
import { fetchOpenMeteoHistorical } from "./open-meteo";

/** Fetch climate data — NASA POWER first, Open-Meteo fallback */
export async function fetchClimateData(
  latitude: number, longitude: number, startDate: Date, endDate: Date
): Promise<DailyClimateData[]> {
  try {
    const data = await fetchNASAPowerDaily(latitude, longitude, startDate, endDate);
    if (data.length > 0) return data;
  } catch (error) {
    console.warn("NASA POWER failed, falling back to Open-Meteo:", error);
  }
  return fetchOpenMeteoHistorical(latitude, longitude, startDate, endDate);
}
