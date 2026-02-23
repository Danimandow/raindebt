import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { theme } from "@/theme";

interface Alert {
  id: string;
  propertyName: string;
  eventType: "drought" | "excess_rainfall";
  severity: "watch" | "warning" | "critical";
  spiValue: number;
}

interface AlertBannerProps {
  alerts: Alert[];
  onPress?: (alert: Alert) => void;
}

const severityConfig = {
  watch: { bg: "#FEF3C7", border: "#F59E0B", text: "#92400E", icon: "⚠️" },
  warning: { bg: "#FED7AA", border: "#EA580C", text: "#9A3412", icon: "🔶" },
  critical: { bg: "#FECACA", border: "#DC2626", text: "#991B1B", icon: "🔴" },
};

export function AlertBanner({ alerts, onPress }: AlertBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 4, gap: 8 }}
    >
      {alerts.map((alert) => {
        const config = severityConfig[alert.severity];
        return (
          <Pressable
            key={alert.id}
            onPress={() => onPress?.(alert)}
            style={{ backgroundColor: config.bg, borderColor: config.border, borderWidth: 1 }}
            className="rounded-lg px-3 py-2 min-w-[200px]"
          >
            <View className="flex-row items-center gap-1.5 mb-0.5">
              <Text className="text-xs">{config.icon}</Text>
              <Text
                className="text-xs font-semibold"
                style={{ color: config.text }}
                numberOfLines={1}
              >
                {alert.propertyName}
              </Text>
            </View>
            <Text className="text-xs" style={{ color: config.text }}>
              {alert.eventType === "drought" ? "Drought" : "Excess Rainfall"} · SPI{" "}
              {alert.spiValue.toFixed(2)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
