import React from "react";
import { View, Text } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { classifySPI } from "@/lib/utils/spi-classification";

interface SPIGaugeProps {
  spiValue: number | null;
}

export function SPIGauge({ spiValue }: SPIGaugeProps) {
  const classification = spiValue !== null ? classifySPI(spiValue) : null;
  // Map SPI [-3, 3] to angle [180, 0] (left to right arc)
  const clamped = spiValue !== null ? Math.max(-3, Math.min(3, spiValue)) : 0;
  const angle = 180 - ((clamped + 3) / 6) * 180;
  const rad = (angle * Math.PI) / 180;
  const cx = 100, cy = 100, r = 80;
  const needleX = cx + r * Math.cos(rad);
  const needleY = cy - r * Math.sin(rad);

  return (
    <View className="items-center">
      <Svg width={200} height={120} viewBox="0 0 200 120">
        {/* Background arc */}
        <Path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#E8E8E0" strokeWidth={12} strokeLinecap="round" />
        {/* Colored arc segments: red -> orange -> yellow -> green -> blue */}
        <Path d="M 20 100 A 80 80 0 0 1 46 46" fill="none" stroke="#C0392B" strokeWidth={12} strokeLinecap="round" />
        <Path d="M 46 46 A 80 80 0 0 1 80 24" fill="none" stroke="#E8A020" strokeWidth={12} />
        <Path d="M 80 24 A 80 80 0 0 1 120 24" fill="none" stroke="#4A9B6F" strokeWidth={12} />
        <Path d="M 120 24 A 80 80 0 0 1 154 46" fill="none" stroke="#3498DB" strokeWidth={12} />
        <Path d="M 154 46 A 80 80 0 0 1 180 100" fill="none" stroke="#2980B9" strokeWidth={12} strokeLinecap="round" />
        {/* Needle */}
        {spiValue !== null && (
          <>
            <Circle cx={cx} cy={cy} r={6} fill={classification?.color ?? "#1A1A1A"} />
            <Path d={`M ${cx} ${cy} L ${needleX} ${needleY}`} stroke={classification?.color ?? "#1A1A1A"} strokeWidth={3} strokeLinecap="round" />
          </>
        )}
      </Svg>
      <Text className="text-2xl font-bold mt-1" style={{ color: classification?.color ?? "#6B7280" }}>
        {spiValue !== null ? spiValue.toFixed(2) : "—"}
      </Text>
      <Text className="text-sm mt-0.5" style={{ color: classification?.color ?? "#6B7280" }}>
        {classification?.label ?? "No Data"}
      </Text>
    </View>
  );
}
