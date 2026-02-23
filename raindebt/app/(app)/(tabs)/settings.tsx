import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { theme } from "@/theme";
import type { Locale } from "@/types/i18n";

const LOCALES: { value: Locale; label: string; flag: string }[] = [
  { value: "pt-BR", label: "Português (BR)", flag: "🇧🇷" },
  { value: "en-US", label: "English (US)", flag: "🇺🇸" },
  { value: "es-LA", label: "Español (LA)", flag: "🇪🇸" },
];

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { t, locale, setLocale } = useI18n();

  return (
    <ScrollView
      className="flex-1 bg-[#F5F5F0]"
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      {/* Profile Section */}
      <Card>
        <View className="items-center py-4">
          <View className="w-16 h-16 rounded-full bg-[#1B4D3E] items-center justify-center mb-3">
            <Text className="text-2xl text-white font-bold">
              {user?.email?.charAt(0).toUpperCase() || "?"}
            </Text>
          </View>
          <Text className="text-base font-semibold text-[#1A1A1A]">
            {user?.user_metadata?.full_name || t("settings.user")}
          </Text>
          <Text className="text-sm text-[#6B7280]">{user?.email}</Text>
        </View>
      </Card>

      {/* Language Section */}
      <Text className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mt-6 mb-2 px-1">
        {t("settings.language")}
      </Text>
      <Card>
        <View className="gap-1">
          {LOCALES.map((loc) => (
            <Pressable
              key={loc.value}
              onPress={() => setLocale(loc.value)}
              className={`flex-row items-center px-3 py-3 rounded-lg ${
                locale === loc.value ? "bg-[#1B4D3E]/10" : ""
              }`}
            >
              <Text className="text-lg mr-3">{loc.flag}</Text>
              <Text
                className={`flex-1 text-sm ${
                  locale === loc.value
                    ? "font-semibold text-[#1B4D3E]"
                    : "text-[#1A1A1A]"
                }`}
              >
                {loc.label}
              </Text>
              {locale === loc.value && (
                <Text className="text-[#1B4D3E] text-sm">✓</Text>
              )}
            </Pressable>
          ))}
        </View>
      </Card>

      {/* About Section */}
      <Text className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mt-6 mb-2 px-1">
        {t("settings.about")}
      </Text>
      <Card>
        <View className="gap-2 py-1">
          <View className="flex-row justify-between">
            <Text className="text-sm text-[#6B7280]">{t("settings.version")}</Text>
            <Text className="text-sm font-mono text-[#1A1A1A]">1.0.0-mvp</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-[#6B7280]">{t("settings.dataSources")}</Text>
            <Text className="text-sm text-[#1A1A1A]">NASA POWER, Open-Meteo</Text>
          </View>
        </View>
      </Card>

      {/* Sign Out */}
      <View className="mt-8">
        <Button title={t("settings.signOut")} variant="danger" onPress={signOut} />
      </View>
    </ScrollView>
  );
}
