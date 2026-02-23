import React from "react";
import { View, Text, SectionList } from "react-native";
import { EventHistoryItem } from "./EventHistoryItem";
import type { ClimateEvent } from "@/types/database";

interface EventHistoryListProps {
  events: ClimateEvent[];
  emptyMessage?: string;
}

interface Section {
  title: string;
  data: ClimateEvent[];
}

export function EventHistoryList({ events, emptyMessage = "No events recorded" }: EventHistoryListProps) {
  if (events.length === 0) {
    return (
      <View className="items-center justify-center py-8">
        <Text className="text-sm text-[#6B7280]">{emptyMessage}</Text>
      </View>
    );
  }

  // Group events by status: active first, then resolved
  const active = events.filter((e) => e.status === "active" || e.status === "monitoring");
  const resolved = events.filter((e) => e.status === "resolved");

  const sections: Section[] = [];
  if (active.length > 0) sections.push({ title: "Active Events", data: active });
  if (resolved.length > 0) sections.push({ title: "Past Events", data: resolved });

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EventHistoryItem event={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View className="bg-[#F5F5F0] py-2 px-1">
          <Text className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            {title}
          </Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View className="h-2" />}
      SectionSeparatorComponent={() => <View className="h-3" />}
      scrollEnabled={false}
    />
  );
}
