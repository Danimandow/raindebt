export type Locale = "pt-BR" | "en-US" | "es-LA";

export type TranslationFunction = (
  key: string,
  params?: Record<string, string | number>
) => string;
