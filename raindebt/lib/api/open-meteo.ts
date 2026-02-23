import type { DailyClimateData, OpenMeteoResponse } from "@/types/climate";
import { OPEN_METEO_BASE_URL } from "@/lib/utils/constants";
import { toISODate } from "@/lib/utils/date";

export async function fetchOpenMeteoHistorical(
  latitude: number, longitude: number, startDate: Date, endDate: Date
): Promise<DailyClimateData[]> {
  const url = new URL(OPEN_METEO_BASE_URL);
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set("start_date", toISODate(startDate));
  url.searchParams.set("end_date", toISODate(endDate));
  url.searchParams.set("daily", "precipitation_sum,temperature_2m_mean,temperature_2m_max,temperature_2m_min");
  url.searchParams.set("timezone", "America/Sao_Paulo");

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`Open-Meteo API error: ${response.status}`);

  const data: OpenMeteoResponse = await response.json();
  const { daily } = data;

  return daily.time.map((date, i) => ({
    date,
    precipitation_mm: daily.precipitation_sum[i],
    temperature_avg_c: daily.temperature_2m_mean[i],
    temperature_max_c: daily.temperature_2m_max[i],
    temperature_min_c: daily.temperature_2m_min[i],
    relative_humidity_pct: null,
    source: "open_meteo" as const,
  }));
}
