export function isValidLatitude(lat: number): boolean {
  return lat >= -90 && lat <= 90;
}

export function isValidLongitude(lng: number): boolean {
  return lng >= -180 && lng <= 180;
}

export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}\u00B0 ${latDir}, ${Math.abs(lng).toFixed(4)}\u00B0 ${lngDir}`;
}

export const BRAZIL_CENTER = { latitude: -14.235, longitude: -51.9253 };
