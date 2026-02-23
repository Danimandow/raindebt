import React from "react";
import { View, Text, TextInput, type TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-[#1A1A1A] mb-1.5">{label}</Text>
      <TextInput
        className={`border rounded-xl px-4 py-3.5 text-base text-[#1A1A1A] bg-white ${error ? "border-[#C0392B]" : "border-[#E8E8E0]"}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-xs text-[#C0392B] mt-1">{error}</Text>}
    </View>
  );
}
