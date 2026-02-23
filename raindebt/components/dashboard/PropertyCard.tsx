import React from "react";
import { Pressable, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { classifySPI } from "@/lib/utils/spi-classification";
import { formatCoordinates } from "@/lib/utils/location";
import type { Property } from "@/types/database";

export function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();
  const spi = property.current_spi;
  const classification = spi !== null ? classifySPI(spi) : null;

  return (
    <Pressable onPress={() => router.push(`/(app)/property/${property.id}`)}>
      <Card className="mb-3">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base font-bold text-[#1A1A1A] flex-1" numberOfLines={1}>{property.name}</Text>
          {classification && <Badge label={classification.label} color={classification.color} />}
          {!classification && <Badge label="Aguardando" color="#9CA3AF" />}
        </View>
        <Text className="text-xs text-[#6B7280] mb-1">
          {formatCoordinates(property.latitude, property.longitude)}
        </Text>
        {property.area_hectares && (
          <Text className="text-xs text-[#6B7280] mb-2">{property.area_hectares} ha</Text>
        )}
        <View className="flex-row items-center justify-between">
          {spi !== null && (
            <Text className="text-sm font-mono" style={{ color: classification?.color ?? "#6B7280" }}>
              SPI: {spi.toFixed(2)}
            </Text>
          )}
          {property.current_spi_category && (
            <Text className="text-xs text-[#6B7280]">{property.current_spi_category}</Text>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
