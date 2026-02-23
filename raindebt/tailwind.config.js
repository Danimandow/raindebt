/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B4D3E",
          light: "#2A7A5F",
          dark: "#0F2E25",
        },
        secondary: {
          DEFAULT: "#4A9B6F",
          light: "#6BBF8E",
        },
        alert: {
          DEFAULT: "#E8A020",
          light: "#F5C04A",
        },
        danger: {
          DEFAULT: "#C0392B",
          light: "#E74C3C",
        },
        rain: {
          DEFAULT: "#2980B9",
          light: "#3498DB",
        },
        surface: {
          DEFAULT: "#F5F5F0",
          dark: "#E8E8E0",
        },
      },
      fontFamily: {
        inter: ["Inter"],
        "inter-bold": ["Inter-Bold"],
        "inter-semibold": ["Inter-SemiBold"],
        mono: ["JetBrainsMono"],
      },
    },
  },
  plugins: [],
};
