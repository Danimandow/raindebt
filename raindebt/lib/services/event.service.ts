import { supabase } from "@/lib/supabase";
import { SPI_THRESHOLDS } from "@/lib/utils/constants";
import type { ClimateEvent } from "@/types/database";

export async function getEvents(propertyId: string): Promise<ClimateEvent[]> {
  const { data, error } = await supabase
    .from("climate_events").select("*")
    .eq("property_id", propertyId)
    .order("start_date", { ascending: false }).limit(20);
  if (error) throw error;
  return (data ?? []) as ClimateEvent[];
}

export async function getActiveEvents(propertyId: string): Promise<ClimateEvent[]> {
  const { data, error } = await supabase
    .from("climate_events").select("*")
    .eq("property_id", propertyId).eq("is_active", true)
    .order("start_date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ClimateEvent[];
}

export async function acknowledgeEvent(eventId: string): Promise<void> {
  const { error } = await supabase.from("climate_events").update({ acknowledged: true }).eq("id", eventId);
  if (error) throw error;
}

export function detectEventFromSPI(spiValue: number) {
  if (spiValue <= SPI_THRESHOLDS.EXTREMELY_DRY) return { eventType: "extreme_drought", severity: "critical" };
  if (spiValue <= SPI_THRESHOLDS.SEVERELY_DRY) return { eventType: "severe_drought", severity: "high" };
  if (spiValue <= SPI_THRESHOLDS.MODERATELY_DRY) return { eventType: "moderate_drought", severity: "medium" };
  if (spiValue >= SPI_THRESHOLDS.EXTREMELY_WET) return { eventType: "excess_rainfall", severity: "high" };
  return null;
}
