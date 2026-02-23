export const colors = {
  primary: { DEFAULT: "#1B4D3E", light: "#2A7A5F", dark: "#0F2E25" },
  secondary: { DEFAULT: "#4A9B6F", light: "#6BBF8E" },
  alert: { DEFAULT: "#E8A020", light: "#F5C04A" },
  danger: { DEFAULT: "#C0392B", light: "#E74C3C" },
  rain: { DEFAULT: "#2980B9", light: "#3498DB" },
  surface: { DEFAULT: "#F5F5F0", dark: "#E8E8E0" },
  text: { DEFAULT: "#1A1A1A", light: "#6B7280", muted: "#9CA3AF" },
  white: "#FFFFFF",
  border: "#E8E8E0",
} as const;

export const fonts = {
  inter: "Inter",
  interBold: "Inter-Bold",
  interSemiBold: "Inter-SemiBold",
  mono: "JetBrainsMono",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
