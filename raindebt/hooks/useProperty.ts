import { useState, useEffect, useCallback } from "react";
import { getProperty } from "@/lib/services/property.service";
import { getLatestPrecipitation } from "@/lib/services/climate.service";
import { getEvents } from "@/lib/services/event.service";
import type { Property, ClimateRecord, ClimateEvent } from "@/types/database";

export function useProperty(propertyId: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [climateRecords, setCR] = useState<ClimateRecord[]>([]);
  const [events, setEvents] = useState<ClimateEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const [p, cr, ev] = await Promise.all([
        getProperty(propertyId),
        getLatestPrecipitation(propertyId, 90),
        getEvents(propertyId),
      ]);
      setProperty(p); setCR(cr); setEvents(ev);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch property");
    } finally { setLoading(false); }
  }, [propertyId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { property, climateRecords, events, loading, error, refresh: fetchAll };
}
