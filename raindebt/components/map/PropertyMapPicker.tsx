import React, { useState, useCallback } from "react";
import { View, Text, Pressable, TextInput, Platform } from "react-native";
import { theme } from "@/theme";

interface PropertyMapPickerProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
  onUseCurrentLocation?: () => void;
}

export function PropertyMapPicker({
  latitude,
  longitude,
  onLocationChange,
  onUseCurrentLocation,
}: PropertyMapPickerProps) {
  const [latInput, setLatInput] = useState(latitude.toString());
  const [lngInput, setLngInput] = useState(longitude.toString());

  const handleApply = useCallback(() => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      onLocationChange(lat, lng);
    }
  }, [latInput, lngInput, onLocationChange]);

  // For web/basic fallback: manual coordinate input
  // In production, this would use react-native-maps with a draggable marker
  return (
    <View className="rounded-xl border border-[#E8E8E0] bg-white p-4">
      <Text className="text-sm font-semibold text-[#1A1A1A] mb-3">
        Property Location
      </Text>

      {/* Map placeholder */}
      <View className="h-48 rounded-lg bg-[#E8E8E0] items-center justify-center mb-3">
        <Text className="text-[#6B7280] text-sm mb-1">📍 Map View</Text>
        <Text className="text-[#6B7280] text-xs">
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </Text>
        {Platform.OS === "web" && (
          <Text className="text-[#9CA3AF] text-xs mt-2">
            Maps require native build or Google Maps API key
          </Text>
        )}
      </View>

      {/* Manual coordinate inputs */}
      <View className="flex-row gap-3 mb-3">
        <View className="flex-1">
          <Text className="text-xs text-[#6B7280] mb-1">Latitude</Text>
          <TextInput
            className="border border-[#E8E8E0] rounded-lg px-3 py-2 text-sm font-mono text-[#1A1A1A]"
            value={latInput}
            onChangeText={setLatInput}
            keyboardType="numeric"
            placeholder="-15.7801"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <View className="flex-1">
          <Text className="text-xs text-[#6B7280] mb-1">Longitude</Text>
          <TextInput
            className="border border-[#E8E8E0] rounded-lg px-3 py-2 text-sm font-mono text-[#1A1A1A]"
            value={lngInput}
            onChangeText={setLngInput}
            keyboardType="numeric"
            placeholder="-47.9292"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View className="flex-row gap-2">
        <Pressable
          onPress={handleApply}
          className="flex-1 bg-[#1B4D3E] rounded-lg py-2.5 items-center"
        >
          <Text className="text-white text-sm font-semibold">Apply Coordinates</Text>
        </Pressable>

        {onUseCurrentLocation && (
          <Pressable
            onPress={onUseCurrentLocation}
            className="flex-1 border border-[#1B4D3E] rounded-lg py-2.5 items-center"
          >
            <Text className="text-[#1B4D3E] text-sm font-semibold">Use My Location</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
