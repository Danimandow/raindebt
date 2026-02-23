import type { SPIClassification } from "@/types/climate";
import { SPI_THRESHOLDS } from "./constants";

const classifications: { min: number; max: number; classification: SPIClassification }[] = [
  { min: SPI_THRESHOLDS.EXTREMELY_WET, max: Infinity, classification: { category: "extremely_wet", label: "Extremely Wet", color: "#2980B9", severity: "high" } },
  { min: SPI_THRESHOLDS.VERY_WET, max: SPI_THRESHOLDS.EXTREMELY_WET, classification: { category: "very_wet", label: "Very Wet", color: "#3498DB", severity: "medium" } },
  { min: SPI_THRESHOLDS.MODERATELY_WET, max: SPI_THRESHOLDS.VERY_WET, classification: { category: "moderately_wet", label: "Moderately Wet", color: "#5DADE2", severity: "low" } },
  { min: SPI_THRESHOLDS.NEAR_NORMAL_LOWER, max: SPI_THRESHOLDS.NEAR_NORMAL_UPPER, classification: { category: "near_normal", label: "Near Normal", color: "#4A9B6F", severity: "none" } },
  { min: SPI_THRESHOLDS.SEVERELY_DRY, max: SPI_THRESHOLDS.MODERATELY_DRY, classification: { category: "moderately_dry", label: "Moderately Dry", color: "#E8A020", severity: "medium" } },
  { min: SPI_THRESHOLDS.EXTREMELY_DRY, max: SPI_THRESHOLDS.SEVERELY_DRY, classification: { category: "severely_dry", label: "Severely Dry", color: "#E67E22", severity: "high" } },
  { min: -Infinity, max: SPI_THRESHOLDS.EXTREMELY_DRY, classification: { category: "extremely_dry", label: "Extremely Dry", color: "#C0392B", severity: "critical" } },
];

export function classifySPI(spiValue: number): SPIClassification {
  for (const { min, max, classification } of classifications) {
    if (spiValue >= min && spiValue < max) return classification;
  }
  return classifications[3].classification;
}

export function getSPIColor(spiValue: number): string {
  return classifySPI(spiValue).color;
}

export function getSPILabel(spiValue: number): string {
  return classifySPI(spiValue).label;
}
