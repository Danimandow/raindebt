import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { theme } from "@/theme";

interface PrecipitationChartProps {
  dates: string[];
  values: number[];
  title?: string;
}

export function PrecipitationChart({ dates, values, title }: PrecipitationChartProps) {
  const screenWidth = Dimensions.get("window").width - 48; // account for padding

  // Show last 30 data points max for readability
  const maxPoints = 30;
  const slicedDates = dates.slice(-maxPoints);
  const slicedValues = values.slice(-maxPoints);

  // Show every Nth label to avoid overlap
  const labelInterval = Math.max(1, Math.floor(slicedDates.length / 6));
  const labels = slicedDates.map((d, i) => {
    if (i % labelInterval === 0) {
      const parts = d.split("-");
      return parts.length >= 3 ? `${parts[2]}/${parts[1]}` : d;
    }
    return "";
  });

  if (slicedValues.length === 0) {
    return (
      <View className="items-center justify-center py-8">
        <Text className="text-sm text-[#6B7280]">No precipitation data available</Text>
      </View>
    );
  }

  return (
    <View>
      {title && <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">{title}</Text>}
      <BarChart
        data={{
          labels,
          datasets: [{ data: slicedValues.length > 0 ? slicedValues : [0] }],
        }}
        width={screenWidth}
        height={180}
        yAxisSuffix=" mm"
        yAxisLabel=""
        chartConfig={{
          backgroundColor: theme.colors.background,
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(41, 128, 185, ${opacity})`,
          labelColor: () => theme.colors.textSecondary,
          barPercentage: 0.6,
          propsForBackgroundLines: {
            strokeDasharray: "4 4",
            stroke: "#E8E8E0",
          },
          propsForLabels: {
            fontSize: 9,
            fontFamily: theme.fonts.mono,
          },
        }}
        style={{
          borderRadius: 8,
        }}
        fromZero
        showValuesOnTopOfBars={false}
      />
    </View>
  );
}
