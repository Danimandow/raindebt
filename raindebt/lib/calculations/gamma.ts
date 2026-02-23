import { mean, logMean } from "./statistics";

/** Lanczos approximation of the Gamma function */
export function gammaFunction(z: number): number {
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gammaFunction(1 - z));
  z -= 1;
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

/** Lower incomplete gamma function — series expansion */
export function lowerIncompleteGamma(a: number, x: number): number {
  if (x <= 0) return 0;
  let sum = 0, term = 1 / a;
  sum = term;
  for (let n = 1; n < 200; n++) {
    term *= x / (a + n);
    sum += term;
    if (Math.abs(term) < 1e-10 * Math.abs(sum)) break;
  }
  return Math.pow(x, a) * Math.exp(-x) * sum;
}

/** Regularized lower incomplete gamma: P(a,x) = gamma(a,x) / Gamma(a) */
export function regularizedGamma(a: number, x: number): number {
  if (x <= 0) return 0;
  return lowerIncompleteGamma(a, x) / gammaFunction(a);
}

/** Gamma CDF: P(X <= x) where X ~ Gamma(alpha, beta) */
export function gammaCDF(x: number, alpha: number, beta: number): number {
  if (x <= 0) return 0;
  return regularizedGamma(alpha, x / beta);
}

/** MLE for Gamma distribution parameters (Thom's approximation) */
export function fitGammaParameters(data: number[]): { alpha: number; beta: number } {
  const positives = data.filter((v) => v > 0);
  if (positives.length < 2) return { alpha: 1, beta: 1 };
  const m = mean(positives);
  const lm = logMean(positives);
  const A = Math.log(m) - lm;
  if (A <= 0) return { alpha: 1, beta: m };
  const alpha = (1 / (4 * A)) * (1 + Math.sqrt(1 + (4 * A) / 3));
  const beta = m / alpha;
  return { alpha, beta };
}
