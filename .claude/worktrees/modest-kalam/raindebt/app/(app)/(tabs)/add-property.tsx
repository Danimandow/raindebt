import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";
import { useLocation } from "@/hooks/useLocation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PropertyMapPicker } from "@/components/map/PropertyMapPicker";
import { createProperty } from "@/lib/services/property.service";
import { BRAZIL_CENTER } from "@/lib/utils/location";

export default function AddPropertyScreen() {
  const { user } = useAuth();
  const { t } = useI18n();
  const { getCurrentLocation } = useLocation();

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(BRAZIL_CENTER.latitude);
  const [longitude, setLongitude] = useState(BRAZIL_CENTER.longitude);
  const [areaHectares, setAreaHectares] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationChange = useCallback((lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  }, []);

  const handleUseCurrentLocation = useCallback(async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    } catch (e: any) {
      setError(e.message || "Failed to get location");
    }
  }, [getCurrentLocation]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError(t("addProperty.nameRequired"));
      return;
    }
    if (!user) {
      setError("Not authenticated");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createProperty({
        user_id: user.id,
        name: name.trim(),
        latitude,
        longitude,
        area_hectares: areaHectares ? parseFloat(areaHectares) : null,
        city: city.trim() || null,
        state: state.trim() || null,
        is_active: true,
        current_spi: null,
        last_data_sync: null,
      });

      if (Platform.OS === "web") {
        router.replace("/(app)/(tabs)");
      } else {
        Alert.alert(t("addProperty.success"), t("addProperty.propertyAdded"), [
          { text: "OK", onPress: () => router.replace("/(app)/(tabs)") },
        ]);
      }
    } catch (e: any) {
      setError(e.message || "Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 bg-[#F5F5F0]"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-lg font-semibold text-[#1A1A1A] mb-4">
          {t("addProperty.subtitle")}
        </Text>

        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <Text className="text-red-700 text-sm">{error}</Text>
          </View>
        )}

        <View className="gap-4">
          <Input
            label={t("addProperty.propertyName")}
            placeholder={t("addProperty.namePlaceholder")}
            value={name}
            onChangeText={setName}
          />

          {/* Map Picker */}
          <PropertyMapPicker
            latitude={latitude}
            longitude={longitude}
            onLocationChange={handleLocationChange}
            onUseCurrentLocation={handleUseCurrentLocation}
          />

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Input
                label={t("addProperty.city")}
                placeholder="Brasília"
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View className="flex-1">
              <Input
                label={t("addProperty.state")}
                placeholder="DF"
                value={state}
                onChangeText={setState}
                maxLength={2}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <Input
            label={t("addProperty.area")}
            placeholder="100"
            value={areaHectares}
            onChangeText={setAreaHectares}
            keyboardType="numeric"
          />

          <Button
            title={t("addProperty.save")}
            onPress={handleSubmit}
            loading={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
