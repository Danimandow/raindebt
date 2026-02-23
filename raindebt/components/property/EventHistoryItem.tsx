import React from "react";
import { View, Text } from "react-native";
import { Badge } from "@/components/ui/Badge";
import { classifySPI } from "@/lib/utils/spi-classification";
import { formatDate } from "@/lib/utils/date";
import type { ClimateEvent } from "@/types/database";

const eventLabels: Record<string, string> = {
  moderate_drought: "Moderate Drought", severe_drought: "Severe Drought",
  extreme_drought: "Extreme Drought", excess_rainfall: "Excess Rainfall",
  dry_spell: "Dry Spell", heavy_rainfall: "Heavy Rainfall",
};

export function EventHistoryItem({ event }: { event: ClimateEvent }) {
  const classification = event.spi_value !== null ? classifySPI(event.spi_value) : null;
  return (
    <View className="flex-row items-center py-3 border-b border-[#E8E8E0]">
      <View className="flex-1">
        <Text className="text-sm font-semibold text-[#1A1A1A]">{eventLabels[event.event_type] ?? event.event_type}</Text>
        <Text className="text-xs text-[#6B7280]">{formatDate(event.start_date)}{event.end_date ? ` — ${formatDate(event.end_date)}` : " (ongoing)"}</Text>
      </View>
      {classification && <Badge label={`SPI ${event.spi_value?.toFixed(2)}`} color={classification.color} />}
    </View>
  );
}
