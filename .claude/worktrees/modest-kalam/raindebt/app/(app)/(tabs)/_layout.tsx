import React from "react";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { theme } from "@/theme";
import { useI18n } from "@/hooks/useI18n";

export default function TabsLayout() {
  const { t } = useI18n();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "600" },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E8E8E0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("dashboard.title"),
          headerTitle: "RainDebt",
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="add-property"
        options={{
          title: t("addProperty.title"),
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>➕</Text>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings.title"),
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⚙️</Text>,
        }}
      />
    </Tabs>
  );
}
