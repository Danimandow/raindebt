import React from "react";
import { View, Text, Platform } from "react-native";

interface PropertyMapViewProps {
  latitude: number;
  longitude: number;
  name?: string;
}

export function PropertyMapView({ latitude, longitude, name }: PropertyMapViewProps) {
  // In production with native builds, this would use MapView from react-native-maps
  // For web/MVP, we show a static map placeholder with coordinates
  return (
    <View className="rounded-xl border border-[#E8E8E0] bg-white overflow-hidden">
      <View className="h-40 bg-[#E8E8E0] items-center justify-center">
        <Text className="text-2xl mb-1">🗺️</Text>
        {name && (
          <Text className="text-sm font-semibold text-[#1A1A1A] mb-0.5">{name}</Text>
        )}
        <Text className="text-xs text-[#6B7280] font-mono">
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </Text>
        {Platform.OS === "web" && (
          <Text className="text-xs text-[#9CA3AF] mt-1">
            Interactive map available on native builds
          </Text>
        )}
      </View>
    </View>
  );
}
