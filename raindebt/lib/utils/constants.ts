export const NASA_POWER_BASE_URL = "https://power.larc.nasa.gov/api/temporal/daily/point";
export const OPEN_METEO_BASE_URL = "https://archive-api.open-meteo.com/v1/archive";

export const NASA_POWER_PARAMS = "PRECTOTCORR,T2M,T2M_MAX,T2M_MIN,RH2M";
export const NASA_POWER_COMMUNITY = "AG";
export const NASA_POWER_MISSING_VALUE = -999;

export const DEFAULT_SPI_SCALE = 3;
export const PRECIPITATION_CHART_DAYS = 90;
export const MIN_RECORDS_FOR_SPI = 30;
export const REFRESH_INTERVAL_MS = 30 * 60 * 1000;

export const SPI_THRESHOLDS = {
  EXTREMELY_WET: 2.0,
  VERY_WET: 1.5,
  MODERATELY_WET: 1.0,
  NEAR_NORMAL_UPPER: 1.0,
  NEAR_NORMAL_LOWER: -1.0,
  MODERATELY_DRY: -1.0,
  SEVERELY_DRY: -1.5,
  EXTREMELY_DRY: -2.0,
} as const;

export const BRAZIL_DEFAULT_COORDS = {
  latitude: -15.7801,
  longitude: -47.9292,
  latitudeDelta: 20,
  longitudeDelta: 20,
};
