import React from "react";
import { Pressable, Text, ActivityIndicator, type ViewStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const variantStyles = {
  primary: "bg-[#1B4D3E]",
  secondary: "bg-[#4A9B6F]",
  danger: "bg-[#C0392B]",
  outline: "bg-transparent border-2 border-[#1B4D3E]",
};

const textStyles = {
  primary: "text-white",
  secondary: "text-white",
  danger: "text-white",
  outline: "text-[#1B4D3E]",
};

export function Button({ title, onPress, variant = "primary", loading, disabled, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center rounded-xl px-6 py-4 ${variantStyles[variant]} ${disabled ? "opacity-50" : ""}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#1B4D3E" : "#fff"} />
      ) : (
        <Text className={`text-base font-semibold ${textStyles[variant]}`}>{title}</Text>
      )}
    </Pressable>
  );
}
