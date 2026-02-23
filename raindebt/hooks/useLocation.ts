import { useState, useCallback } from "react";
import * as Location from "expo-location";

interface LocationResult {
  latitude: number;
  longitude: number;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") { setError("Location permission denied"); return; }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const result = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      setLocation(result);
      return result;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Location error");
    } finally { setLoading(false); }
  }, []);

  return { location, loading, error, requestLocation };
}
