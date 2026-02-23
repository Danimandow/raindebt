import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

export function LoadingSpinner({ message }: { message?: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-[#F5F5F0]">
      <ActivityIndicator size="large" color="#1B4D3E" />
      {message && <Text className="text-sm text-[#6B7280] mt-3">{message}</Text>}
    </View>
  );
}
