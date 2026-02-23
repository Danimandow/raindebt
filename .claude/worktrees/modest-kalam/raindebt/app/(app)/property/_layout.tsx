import React from "react";
import { Stack } from "expo-router";
import { theme } from "@/theme";

export default function PropertyLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "600" },
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="[id]" options={{ title: "Property" }} />
    </Stack>
  );
}
