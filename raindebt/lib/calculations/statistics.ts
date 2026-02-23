export function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function variance(arr: number[]): number {
  if (arr.length <= 1) return 0;
  const m = mean(arr);
  return arr.reduce((sum, v) => sum + (v - m) ** 2, 0) / arr.length;
}

export function standardDeviation(arr: number[]): number {
  return Math.sqrt(variance(arr));
}

export function logMean(arr: number[]): number {
  const positives = arr.filter((v) => v > 0);
  if (positives.length === 0) return 0;
  return positives.reduce((sum, v) => sum + Math.log(v), 0) / positives.length;
}

/**
 * Inverse Normal CDF — Abramowitz & Stegun rational approximation.
 * Converts probability p in (0,1) to a z-score.
 */
export function inverseNormalCDF(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const c0 = 2.515517, c1 = 0.802853, c2 = 0.010328;
  const d1 = 1.432788, d2 = 0.189269, d3 = 0.001308;
  const sign = p <= 0.5 ? -1 : 1;
  const pp = p <= 0.5 ? p : 1 - p;
  const t = Math.sqrt(-2 * Math.log(pp));
  const num = c0 + c1 * t + c2 * t * t;
  const den = 1 + d1 * t + d2 * t * t + d3 * t * t * t;
  return sign * (t - num / den);
}
