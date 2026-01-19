
export interface AnalysisPoint {
  x: number;
  y: number;
  f_prime: number;
  f_double_prime: number;
}

export interface CriticalPoint {
  x: number;
  type: 'max' | 'min' | 'inflection' | 'neutral';
  value: number;
}

export interface QuadraticResult {
  a: number;
  b: number;
  c: number;
  discriminant: number;
  roots: number[];
  symbolicRoots: string[];
  message: string;
}
