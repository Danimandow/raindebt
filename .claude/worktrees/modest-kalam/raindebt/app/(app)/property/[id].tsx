import React, { useMemo } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useProperty } from "@/hooks/useProperty";
import { useI18n } from "@/hooks/useI18n";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Card } from "@/components/ui/Card";
import { SPIGauge } from "@/components/property/SPIGauge";
import { ClimateDataCard } from "@/components/property/ClimateDataCard";
import { PrecipitationChart } from "@/components/property/PrecipitationChart";
import { EventHistoryList } from "@/components/property/EventHistoryList";
import { PropertyMapView } from "@/components/map/PropertyMapView";
import { classifySPI } from "@/lib/utils/spi-classification";
import { theme } from "@/theme";

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { property, climateRecords, events, loading, refresh, refreshing } =
    useProperty(id);
  const { t } = useI18n();

  // Derive chart data from climate records
  const chartData = useMemo(() => {
    if (!climateRecords?.length) return { dates: [], values: [] };
    const sorted = [...climateRecords].sort(
      (a, b) => new Date(a.record_date).getTime() - new Date(b.record_date).getTime()
    );
    return {
      dates: sorted.map((r) => r.record_date),
      values: sorted.map((r) => r.precipitation_mm ?? 0),
    };
  }, [climateRecords]);

  // Latest climate record for summary cards
  const latest = useMemo(() => {
    if (!climateRecords?.length) return null;
    return [...climateRecords].sort(
      (a, b) => new Date(b.record_date).getTime() - new Date(a.record_date).getTime()
    )[0];
  }, [climateRecords]);

  // SPI classification
  const spiClass = useMemo(() => {
    return classifySPI(property?.current_spi ?? null);
  }, [property?.current_spi]);

  if (loading) {
    return <LoadingSpinner message={t("property.loading")} />;
  }

  if (!property) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F5F5F0]">
        <Text className="text-base text-[#6B7280]">{t("property.notFound")}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: property.name }} />
      <ScrollView
        className="flex-1 bg-[#F5F5F0]"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Map */}
        <View className="mb-4">
          <PropertyMapView
            latitude={property.latitude}
            longitude={property.longitude}
            name={property.name}
          />
        </View>

        {/* SPI Gauge */}
        <Card>
          <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">
            {t("property.currentSPI")}
          </Text>
          <SPIGauge value={property.current_spi ?? 0} />
          <View className="items-center mt-2">
            <Text className="text-sm font-semibold" style={{ color: spiClass.color }}>
              {spiClass.label}
            </Text>
            {property.current_spi !== null && (
              <Text className="text-xs text-[#6B7280] font-mono mt-0.5">
                SPI: {property.current_spi.toFixed(2)}
              </Text>
            )}
          </View>
        </Card>

        {/* Climate Data Summary */}
        {latest && (
          <View className="flex-row gap-3 mt-4">
            <View className="flex-1">
              <ClimateDataCard
                label={t("property.precipitation")}
                value={latest.precipitation_mm?.toFixed(1) ?? "--"}
                unit="mm"
              />
            </View>
            <View className="flex-1">
              <ClimateDataCard
                label={t("property.tempMax")}
                value={latest.temperature_max_c?.toFixed(1) ?? "--"}
                unit="°C"
              />
            </View>
            <View className="flex-1">
              <ClimateDataCard
                label={t("property.tempMin")}
                value={latest.temperature_min_c?.toFixed(1) ?? "--"}
                unit="°C"
              />
            </View>
          </View>
        )}

        {/* Precipitation Chart */}
        {chartData.values.length > 0 && (
          <View className="mt-4">
            <Card>
              <PrecipitationChart
                dates={chartData.dates}
                values={chartData.values}
                title={t("property.precipitationHistory")}
              />
            </Card>
          </View>
        )}

        {/* Property Info */}
        <View className="mt-4">
          <Card>
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">
              {t("property.details")}
            </Text>
            <View className="gap-1.5">
              <View className="flex-row justify-between">
                <Text className="text-sm text-[#6B7280]">{t("property.coordinates")}</Text>
                <Text className="text-sm font-mono text-[#1A1A1A]">
                  {property.latitude.toFixed(6)}, {property.longitude.toFixed(6)}
                </Text>
              </View>
              {property.area_hectares && (
                <View className="flex-row justify-between">
                  <Text className="text-sm text-[#6B7280]">{t("property.area")}</Text>
                  <Text className="text-sm text-[#1A1A1A]">
                    {property.area_hectares} ha
                  </Text>
                </View>
              )}
              {property.city && (
                <View className="flex-row justify-between">
                  <Text className="text-sm text-[#6B7280]">{t("property.location")}</Text>
                  <Text className="text-sm text-[#1A1A1A]">
                    {property.city}{property.state ? `, ${property.state}` : ""}
                  </Text>
                </View>
              )}
              {property.last_data_sync && (
                <View className="flex-row justify-between">
                  <Text className="text-sm text-[#6B7280]">{t("property.lastSync")}</Text>
                  <Text className="text-sm text-[#1A1A1A]">
                    {new Date(property.last_data_sync).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </Card>
        </View>

        {/* Event History */}
        <View className="mt-4">
          <Card>
            <Text className="text-sm font-semibold text-[#1A1A1A] mb-2">
              {t("property.eventHistory")}
            </Text>
            <EventHistoryList
              events={events || []}
              emptyMessage={t("property.noEvents")}
            />
          </Card>
        </View>
      </ScrollView>
    </>
  );
}
