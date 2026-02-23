import React from "react";
import { View, type ViewProps } from "react-native";

export function Card({ children, className: cn, ...props }: ViewProps & { children: React.ReactNode }) {
  return (
    <View className={`bg-white rounded-2xl p-4 border border-[#E8E8E0] shadow-sm ${cn ?? ""}`} {...props}>
      {children}
    </View>
  );
}
