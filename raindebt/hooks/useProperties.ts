import { useState, useEffect, useCallback } from "react";
import { getProperties } from "@/lib/services/property.service";
import { useAuth } from "./useAuth";
import type { Property } from "@/types/database";

export function useProperties() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProps = useCallback(async () => {
    if (!user) { setProperties([]); setLoading(false); return; }
    try {
      setLoading(true); setError(null);
      const data = await getProperties(user.id);
      setProperties(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch properties");
    } finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchProps(); }, [fetchProps]);

  return { properties, loading, error, refresh: fetchProps };
}
