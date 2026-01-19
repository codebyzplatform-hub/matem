
import { AnalysisPoint, CriticalPoint, QuadraticResult } from '../types';

/**
 * Verilen fonksiyon: f(x) = (x+1)^2 / (1+x^2)
 */
export const f = (x: number): number => {
  return Math.pow(x + 1, 2) / (1 + x * x);
};

/**
 * Birinci türev (Sayısal yaklaşım)
 */
export const f_prime = (x: number): number => {
  const h = 0.0001;
  return (f(x + h) - f(x - h)) / (2 * h);
};

/**
 * İkinci türev (Sayısal yaklaşım)
 */
export const f_double_prime = (x: number): number => {
  const h = 0.0001;
  return (f_prime(x + h) - f_prime(x - h)) / (2 * h);
};

/**
 * Kritik noktaları bulma algoritması (f'(x) ≈ 0)
 */
export const findCriticalPoints = (range: [number, number] = [-10, 10], step: number = 0.01): CriticalPoint[] => {
  const points: number[] = [];
  for (let x = range[0]; x <= range[1]; x += step) {
    if (Math.abs(f_prime(x)) < 0.01) {
      points.push(Number(x.toFixed(4)));
    }
  }

  const uniquePoints: number[] = [];
  const tolerance = 0.2;
  for (let i = 0; i < points.length; i++) {
    if (i === 0 || points[i] - points[i - 1] > tolerance) {
      uniquePoints.push(points[i]);
    }
  }

  return uniquePoints.map(x => {
    const secondDeriv = f_double_prime(x);
    let type: 'max' | 'min' | 'neutral' = 'neutral';
    if (secondDeriv > 0.01) type = 'min';
    else if (secondDeriv < -0.01) type = 'max';

    return { x, type, value: f(x) };
  });
};

/**
 * Bükülme (dönüm) noktalarını bulma (f''(x) ≈ 0)
 */
export const findInflectionPoints = (range: [number, number] = [-10, 10], step: number = 0.01): CriticalPoint[] => {
  const points: number[] = [];
  for (let x = range[0]; x <= range[1]; x += step) {
    if (Math.abs(f_double_prime(x)) < 0.01) {
      points.push(Number(x.toFixed(4)));
    }
  }

  const uniquePoints: number[] = [];
  const tolerance = 0.3;
  for (let i = 0; i < points.length; i++) {
    if (i === 0 || points[i] - points[i - 1] > tolerance) {
      uniquePoints.push(points[i]);
    }
  }

  return uniquePoints.map(x => ({ x, type: 'inflection', value: f(x) }));
};

/**
 * Eng katta umumiy bo'luvchi (GCD)
 */
const getGCD = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    a %= b;
    [a, b] = [b, a];
  }
  return a;
};

/**
 * Ildizni soddalashtirish: sqrt(n) -> k*sqrt(m)
 */
const simplifyRadical = (n: number): [number, number] => {
  let outside = 1;
  let inside = n;
  let d = 2;
  while (d * d <= inside) {
    if (inside % (d * d) === 0) {
      outside *= d;
      inside /= (d * d);
    } else {
      d++;
    }
  }
  return [outside, inside];
};

/**
 * İkinci dereceden denklem çözücü: ax^2 + bx + c = 0
 */
export const solveQuadratic = (a: number, b: number, c: number): QuadraticResult => {
  const discriminant = b * b - 4 * a * c;
  let roots: number[] = [];
  let symbolicRoots: string[] = [];
  let message = "";

  if (a === 0) {
    if (b !== 0) {
      const root = -c / b;
      roots = [root];
      if (Number.isInteger(root)) {
        symbolicRoots = [root.toString()];
      } else {
        const common = getGCD(c, b);
        const num = -c / common;
        const den = b / common;
        symbolicRoots = [den === 1 ? num.toString() : (den < 0 ? `${-num}/${-den}` : `${num}/${den}`)];
      }
      message = "Bu bir doğrusal denklemdir.";
    } else {
      message = c === 0 ? "Sonsuz sayıda çözüm vardır." : "Çözüm kümesi boştur.";
    }
  } else {
    if (discriminant < 0) {
      message = "Gerçek sayılarda kök yoktur (Δ < 0).";
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      roots = [root];
      const common = getGCD(b, 2 * a);
      const num = -b / common;
      const den = (2 * a) / common;
      symbolicRoots = [den === 1 ? num.toString() : (den < 0 ? `${-num}/${-den}` : `${num}/${den}`)];
      message = "Çakışık bir tane gerçek kök vardır.";
    } else {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      roots = [x1, x2];

      const [k, m] = simplifyRadical(discriminant);
      
      if (m === 1) { // Tam kare durumunda
        symbolicRoots = roots.map(r => Number.isInteger(r) ? r.toString() : Number(r.toFixed(3)).toString());
      } else {
        // Formül: (-b ± k√m) / 2a
        const den = 2 * a;
        // En büyük ortak bölen: b, k ve payda arasında
        const common = getGCD(b, getGCD(k, den));
        
        let b_red = -b / common;
        let k_red = k / common;
        let den_red = den / common;
        
        // Paydayı pozitif yapalım
        if (den_red < 0) {
          b_red = -b_red;
          k_red = -k_red;
          den_red = -den_red;
        }

        const kStr = Math.abs(k_red) === 1 ? "" : Math.abs(k_red).toString();
        const radicalPart = `${kStr}√${m}`;
        
        let res1, res2;
        
        // b_red 0 ise (0 + √m) -> √m formatı
        if (b_red === 0) {
          if (den_red === 1) {
            res1 = radicalPart;
            res2 = `-${radicalPart}`;
          } else {
            res1 = `${radicalPart} / ${den_red}`;
            res2 = `-${radicalPart} / ${den_red}`;
          }
        } else {
          // b_red 0 değilse normal format
          if (den_red === 1) {
            res1 = `${b_red} + ${radicalPart}`;
            res2 = `${b_red} - ${radicalPart}`;
          } else {
            res1 = `(${b_red} + ${radicalPart}) / ${den_red}`;
            res2 = `(${b_red} - ${radicalPart}) / ${den_red}`;
          }
        }
        
        symbolicRoots = [res1, res2];
      }
      message = "İki farklı gerçek kök bulunmaktadır.";
    }
  }

  return { a, b, c, discriminant, roots, symbolicRoots, message };
};
