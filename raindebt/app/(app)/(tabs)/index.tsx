import React, { useMemo } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";
import { useProperties } from "@/hooks/useProperties";
import { PropertyCard } from "@/components/dashboard/PropertyCard";
import { AlertBanner } from "@/components/dashboard/AlertBanner";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { theme } from "@/theme";

export default function DashboardScreen() {
  const { user } = useAuth();
  const { t } = useI18n();
  const { properties, loading, refreshing, refresh } = useProperties();

  // Build alerts from properties with critical SPI
  const alerts = useMemo(() => {
    return properties
      .filter((p) => p.current_spi !== null && p.current_spi !== undefined)
      .filter((p) => Math.abs(p.current_spi!) >= 1.5)
      .map((p) => ({
        id: p.id,
        propertyName: p.name,
        eventType: (p.current_spi! < 0 ? "drought" : "excess_rainfall") as "drought" | "excess_rainfall",
        severity: (Math.abs(p.current_spi!) >= 2.0
          ? "critical"
          : Math.abs(p.current_spi!) >= 1.5
          ? "warning"
          : "watch") as "watch" | "warning" | "critical",
        spiValue: p.current_spi!,
      }));
  }, [properties]);

  // Greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return t("dashboard.goodMorning");
    if (hour < 18) return t("dashboard.goodAfternoon");
    return t("dashboard.goodEvening");
  }, [t]);

  if (loading && !refreshing) {
    return <LoadingSpinner message={t("dashboard.loading")} />;
  }

  return (
    <ScrollView
      className="flex-1 bg-[#F5F5F0]"
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={theme.colors.primary}
        />
      }
    >
      {/* Greeting */}
      <View className="mb-4">
        <Text className="text-lg font-semibold text-[#1A1A1A]">
          {greeting} 👋
        </Text>
        <Text className="text-sm text-[#6B7280]">
          {properties.length} {t("dashboard.propertiesMonitored")}
        </Text>
      </View>

      {/* Alert Banner */}
      <AlertBanner
        alerts={alerts}
        onPress={(alert) => router.push(`/(app)/property/${alert.id}`)}
      />

      {/* Properties */}
      {properties.length === 0 ? (
        <EmptyState
          title={t("dashboard.noProperties")}
          subtitle={t("dashboard.addFirstProperty")}
          actionLabel={t("dashboard.addProperty")}
          onAction={() => router.push("/(app)/(tabs)/add-property")}
        />
      ) : (
        <View className="gap-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => router.push(`/(app)/property/${property.id}`)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
