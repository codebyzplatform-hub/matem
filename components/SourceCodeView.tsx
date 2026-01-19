
import React, { useState } from 'react';

const SourceCodeView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const codeString = `/**
 * Matematik Analiz Mantiqiy Qismi (TypeScript)
 * Algoritmlar: Hosila, Kritik nuqtalar va Kvadrat tenglama yechimi
 */

// 1. Funksiya hisoblash: f(x) = (x+1)^2 / (1+x^2)
export const f = (x: number): number => {
  return Math.pow(x + 1, 2) / (1 + x * x);
};

// 2. Birinchi tartibli hosila (Sayısal metod)
export const f_prime = (x: number): number => {
  const h = 0.0001;
  return (f(x + h) - f(x - h)) / (2 * h);
};

// 3. Ikkinchi tartibli hosila
export const f_double_prime = (x: number): number => {
  const h = 0.0001;
  return (f_prime(x + h) - f_prime(x - h)) / (2 * h);
};

// 4. Kvadrat tenglama yechuvchi (ax^2 + bx + c = 0)
export const solveQuadratic = (a: number, b: number, c: number) => {
  const discriminant = b * b - 4 * a * c;
  
  if (discriminant < 0) return { message: "Haqiqiy ildizlar yo'q" };
  
  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  
  return { discriminant, roots: [x1, x2] };
};

// 5. Kritik nuqtalarni topish algoritmi
export const findCriticalPoints = (range = [-10, 10]) => {
  let results = [];
  for (let x = range[0]; x <= range[1]; x += 0.01) {
    if (Math.abs(f_prime(x)) < 0.01) {
      results.push({ x: Number(x.toFixed(2)), y: f(x) });
    }
  }
  return results;
};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
        {/* Terminal Header */}
        <div className="bg-slate-800/50 px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">mathUtils.ts — TypeScript</span>
            <button 
              onClick={copyToClipboard}
              className="text-slate-400 hover:text-white transition-colors"
              title="Nusxa olish"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
            </button>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-6 md:p-8 overflow-x-auto">
          <pre className="font-mono text-xs md:text-sm leading-relaxed text-indigo-100">
            {codeString.split('\n').map((line, i) => (
              <div key={i} className="flex group">
                <span className="w-8 text-slate-600 select-none opacity-50">{i + 1}</span>
                <span className="flex-1 whitespace-pre">
                  {line.startsWith('//') || line.startsWith(' *') ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes('const') || line.includes('export') || line.includes('return') ? (
                    <span dangerouslySetInnerHTML={{ 
                      __html: line
                        .replace(/(const|export|return|let|if|export default)/g, '<span class="text-rose-400 font-bold">$1</span>')
                        .replace(/(number|string|boolean|void)/g, '<span class="text-indigo-400">$1</span>')
                        .replace(/(Math|f|f_prime|f_double_prime|solveQuadratic|findCriticalPoints)/g, '<span class="text-amber-300">$1</span>')
                    }} />
                  ) : line}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-800/50">
        <h4 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center">
          <i className="fa-solid fa-circle-info mr-2"></i>
          Kod Haqida
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          Ushbu ilova to'liq <strong>JavaScript/TypeScript</strong> va <strong>React</strong> yordamida ishlab chiqilgan. 
          Matematik hisob-kitoblar brauzerning o'zida real vaqt rejimida bajariladi. C++ kodi o'rniga yuqoridagi 
          zamonaviy va samarali JS algoritmlari ishlatilgan.
        </p>
      </div>
    </div>
  );
};

export default SourceCodeView;
