import type { DailyClimateData, NASAPowerResponse } from "@/types/climate";
import { NASA_POWER_BASE_URL, NASA_POWER_PARAMS, NASA_POWER_COMMUNITY, NASA_POWER_MISSING_VALUE } from "@/lib/utils/constants";
import { toYYYYMMDD } from "@/lib/utils/date";

export async function fetchNASAPowerDaily(
  latitude: number, longitude: number, startDate: Date, endDate: Date
): Promise<DailyClimateData[]> {
  const url = new URL(NASA_POWER_BASE_URL);
  url.searchParams.set("parameters", NASA_POWER_PARAMS);
  url.searchParams.set("community", NASA_POWER_COMMUNITY);
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("start", toYYYYMMDD(startDate));
  url.searchParams.set("end", toYYYYMMDD(endDate));
  url.searchParams.set("format", "JSON");

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`NASA POWER API error: ${response.status}`);

  const data: NASAPowerResponse = await response.json();
  const params = data.properties.parameter;
  const dates = Object.keys(params.PRECTOTCORR);
  const MV = NASA_POWER_MISSING_VALUE;

  return dates
    .map((dk) => {
      const precip = params.PRECTOTCORR[dk];
      if (precip === MV) return null;
      const fmtDate = `${dk.substring(0, 4)}-${dk.substring(4, 6)}-${dk.substring(6, 8)}`;
      return {
        date: fmtDate,
        precipitation_mm: precip === MV ? null : precip,
        temperature_avg_c: params.T2M[dk] === MV ? null : params.T2M[dk],
        temperature_max_c: params.T2M_MAX[dk] === MV ? null : params.T2M_MAX[dk],
        temperature_min_c: params.T2M_MIN[dk] === MV ? null : params.T2M_MIN[dk],
        relative_humidity_pct: params.RH2M?.[dk] === MV ? null : (params.RH2M?.[dk] ?? null),
        source: "nasa_power" as const,
      };
    })
    .filter((r): r is DailyClimateData => r !== null);
}
