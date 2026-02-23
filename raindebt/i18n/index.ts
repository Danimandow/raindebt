import { Platform, NativeModules } from "react-native";
import type { Locale, TranslationFunction } from "@/types/i18n";
import enUS from "./en-US";
import ptBR from "./pt-BR";
import esLA from "./es-LA";

const translations: Record<Locale, typeof enUS> = { "en-US": enUS, "pt-BR": ptBR, "es-LA": esLA };

export function getDeviceLocale(): Locale {
  let deviceLocale = "en-US";
  try {
    if (Platform.OS === "ios") {
      deviceLocale = NativeModules.SettingsManager?.settings?.AppleLocale || NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] || "en-US";
    } else if (Platform.OS === "android") {
      deviceLocale = NativeModules.I18nManager?.localeIdentifier || "en-US";
    } else {
      deviceLocale = typeof navigator !== "undefined" ? navigator.language : "en-US";
    }
  } catch { deviceLocale = "en-US"; }
  if (deviceLocale.startsWith("pt")) return "pt-BR";
  if (deviceLocale.startsWith("es")) return "es-LA";
  return "en-US";
}

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

export function createTranslationFunction(locale: Locale): TranslationFunction {
  const dict = translations[locale] || translations["en-US"];
  return (key: string, params?: Record<string, string | number>): string => {
    let value = getNestedValue(dict as unknown as Record<string, unknown>, key);
    if (!value) value = getNestedValue(enUS as unknown as Record<string, unknown>, key);
    if (!value) return key;
    if (params) return value.replace(/\{\{(\w+)\}\}/g, (_, k) => params[k]?.toString() ?? `{{${k}}}`);
    return value;
  };
}

export { translations };
