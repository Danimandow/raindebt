import React from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <Text className="text-xl font-bold text-[#1A1A1A] mb-2 text-center">{title}</Text>
      <Text className="text-sm text-[#6B7280] text-center mb-6">{subtitle}</Text>
      {actionLabel && onAction && <Button title={actionLabel} onPress={onAction} />}
    </View>
  );
}
