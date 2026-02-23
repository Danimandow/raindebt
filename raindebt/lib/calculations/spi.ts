import { fitGammaParameters, gammaCDF } from "./gamma";
import { inverseNormalCDF } from "./statistics";

function accumulatePrecipitation(monthlyPrecip: number[], scale: number): number[] {
  const accumulated: number[] = [];
  for (let i = scale - 1; i < monthlyPrecip.length; i++) {
    let sum = 0;
    for (let j = 0; j < scale; j++) sum += monthlyPrecip[i - j];
    accumulated.push(sum);
  }
  return accumulated;
}

/**
 * Calculate the Standardized Precipitation Index (SPI).
 * @param monthlyPrecip - Monthly precipitation totals (historical + current). Last = current.
 * @param scale - Time scale in months (1, 3, 6, 12). Default: 3.
 * @returns SPI value or null if insufficient data.
 */
export function calculateSPI(monthlyPrecip: number[], scale: number = 3): number | null {
  const accumulated = accumulatePrecipitation(monthlyPrecip, scale);
  if (accumulated.length < 30) return null;

  const currentValue = accumulated[accumulated.length - 1];
  const historicalValues = accumulated.slice(0, -1);
  const zeros = historicalValues.filter((v) => v === 0);
  const nonZero = historicalValues.filter((v) => v > 0);
  const q = zeros.length / historicalValues.length;

  if (nonZero.length < 10) return null;

  const { alpha, beta } = fitGammaParameters(nonZero);
  let H: number;
  if (currentValue <= 0) {
    H = q;
  } else {
    const G = gammaCDF(currentValue, alpha, beta);
    H = q + (1 - q) * G;
  }
  H = Math.max(0.00001, Math.min(0.99999, H));
  return Math.round(inverseNormalCDF(H) * 100) / 100;
}

/**
 * Simplified SPI using z-score — works with shorter records.
 */
export function calculateSimplifiedSPI(precipValues: number[], currentPrecip: number): number | null {
  if (precipValues.length < 10) return null;
  const m = precipValues.reduce((a, b) => a + b, 0) / precipValues.length;
  const v = precipValues.reduce((sum, val) => sum + (val - m) ** 2, 0) / precipValues.length;
  const sd = Math.sqrt(v);
  if (sd === 0) return 0;
  return Math.round(((currentPrecip - m) / sd) * 100) / 100;
}
