
import React, { useState, useMemo } from 'react';
import { solveQuadratic } from '../services/mathUtils';

const QuadraticView: React.FC = () => {
  const [coeffs, setCoeffs] = useState({ a: 1, b: 0, c: -5 });

  const result = useMemo(() => solveQuadratic(coeffs.a, coeffs.b, coeffs.c), [coeffs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoeffs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const formatEquation = () => {
    const { a, b, c } = coeffs;
    if (a === 0 && b === 0 && c === 0) return "0 = 0";
    const fmt = (n: number) => Number(n.toFixed(2)).toString();
    let equation = "";
    if (a !== 0) {
      if (a === 1) equation += "x²";
      else if (a === -1) equation += "-x²";
      else equation += `${fmt(a)}x²`;
    }
    if (b !== 0) {
      const isFirst = equation === "";
      const sign = b > 0 ? (isFirst ? "" : " + ") : (isFirst ? "-" : " - ");
      const absB = Math.abs(b);
      const bText = absB === 1 ? "x" : `${fmt(absB)}x`;
      equation += `${sign}${bText}`;
    }
    if (c !== 0) {
      const isFirst = equation === "";
      const sign = c > 0 ? (isFirst ? "" : " + ") : (isFirst ? "-" : " - ");
      equation += `${sign}${fmt(Math.abs(c))}`;
    }
    return `${equation} = 0`;
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in slide-in-from-right duration-500">
      <div className="bg-white dark:bg-slate-900 p-5 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1 text-center">İkinci Dereceden Denklem</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 md:mb-8 text-center tracking-tight">Katsayıları girerek denklemi ve köklerini analiz edin</p>

        <div className="grid grid-cols-3 gap-3 md:gap-8 items-end mb-8 max-w-lg mx-auto">
          {['a', 'b', 'c'].map((k) => (
            <div key={k} className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center block">{k}</label>
              <input 
                type="number" 
                name={k} 
                value={(coeffs as any)[k]} 
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-2 py-3 md:px-4 md:py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono text-lg md:text-xl text-center font-bold text-slate-800 dark:text-white shadow-sm"
              />
            </div>
          ))}
        </div>

        {/* Natija taxtasi */}
        <div className="bg-indigo-50/50 dark:bg-black text-slate-900 dark:text-white rounded-[3rem] p-6 md:p-12 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden border border-slate-200/50 dark:border-white/5 transition-colors">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <i className="fa-solid fa-square-root-variable text-[120px] text-slate-900 dark:text-white"></i>
          </div>
          
          <div className="text-indigo-600 dark:text-indigo-300 font-mono mb-2 text-2xl md:text-5xl tracking-tight font-black transition-all duration-300 drop-shadow-sm">
            {formatEquation()}
          </div>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full my-6 md:my-8 opacity-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mb-8">
            <div className="p-5 md:p-7 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 group hover:border-indigo-300 dark:hover:border-indigo-500 transition-all shadow-sm">
              <span className="text-slate-400 text-[10px] font-black uppercase block mb-1 tracking-[0.2em]">Diskriminant (Δ)</span>
              <span className="text-3xl md:text-5xl font-black font-mono text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{result.discriminant}</span>
              <p className="text-[9px] text-slate-500 mt-2 uppercase tracking-widest font-bold">Δ = b² - 4ac</p>
            </div>
            <div className="p-5 md:p-7 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col justify-center shadow-sm">
              <span className="text-slate-400 text-[10px] font-black uppercase block mb-1 tracking-[0.2em]">Çözüm Özeti</span>
              <span className="text-base md:text-xl font-bold text-indigo-700 dark:text-indigo-200 leading-tight italic">{result.message}</span>
            </div>
          </div>

          {result.symbolicRoots.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
              {result.symbolicRoots.map((sRoot, i) => (
                <div key={i} className="bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-900 p-6 md:p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl transform hover:scale-[1.02] transition-all border border-white/20 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform">
                    <i className="fa-solid fa-hashtag text-6xl text-white"></i>
                  </div>
                  <span className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Denklem Kökü x{i+1}</span>
                  <span className="text-3xl md:text-4xl font-black font-serif text-white drop-shadow-md">
                    {sRoot}
                  </span>
                  <div className="mt-4 pt-4 border-t border-white/10 w-full">
                    <span className="text-[11px] text-indigo-100 font-mono font-bold opacity-80">
                      Yaklaşık: {result.roots[i].toFixed(4)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuadraticView;
