import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/components/ui/Card";

interface ClimateDataCardProps {
  label: string;
  value: string;
  unit?: string;
  color?: string;
}

export function ClimateDataCard({ label, value, unit, color }: ClimateDataCardProps) {
  return (
    <Card className="flex-1 min-w-[140px] mr-3 mb-3">
      <Text className="text-xs text-[#6B7280] mb-1">{label}</Text>
      <View className="flex-row items-baseline">
        <Text className="text-xl font-bold" style={{ color: color ?? "#1A1A1A" }}>{value}</Text>
        {unit && <Text className="text-xs text-[#6B7280] ml-1">{unit}</Text>}
      </View>
    </Card>
  );
}
