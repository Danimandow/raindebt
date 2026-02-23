import { supabase } from "@/lib/supabase";
import type { Property } from "@/types/database";

export async function getProperties(userId: string): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties").select("*")
    .eq("user_id", userId).eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Property[];
}

export async function getProperty(id: string): Promise<Property> {
  const { data, error } = await supabase
    .from("properties").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Property;
}

export async function createProperty(
  property: Omit<Property, "id" | "created_at" | "updated_at" | "current_spi" | "current_spi_category" | "last_data_fetch">
): Promise<Property> {
  const { data, error } = await supabase
    .from("properties").insert(property).select().single();
  if (error) throw error;
  return data as Property;
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
  const { data, error } = await supabase
    .from("properties").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data as Property;
}

export async function deleteProperty(id: string): Promise<void> {
  const { error } = await supabase.from("properties").update({ is_active: false }).eq("id", id);
  if (error) throw error;
}
