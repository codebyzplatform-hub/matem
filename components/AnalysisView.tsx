
import React from 'react';
import { findCriticalPoints, findInflectionPoints } from '../services/mathUtils';
import FunctionChart from './FunctionChart';

const AnalysisView: React.FC = () => {
  const criticalPoints = findCriticalPoints();
  const inflectionPoints = findInflectionPoints();

  return (
    <div className="space-y-4 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Başlık ve Görselleştirme */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-1">Matematiksel Fonksiyon Tahlili</h2>
        <p className="text-indigo-600 dark:text-indigo-400 italic text-base md:text-lg mb-4 font-serif font-bold">
          f(x) = (x + 1)² / (1 + x²)
        </p>
        <FunctionChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Temel Parametreler */}
        <section className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center">
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 text-xs">
              <i className="fa-solid fa-circle-info"></i>
            </span>
            Genel Parametreler
          </h3>
          <ul className="space-y-2 md:space-y-4 text-xs md:text-sm">
            {[
              { label: 'Tanım Aralığı', value: 'Tüm Gerçek Sayılar (ℝ)' },
              { label: 'Yatay Asimptot', value: 'y = 1' },
              { label: 'Dikey Asimptot', value: 'Bulunmuyor' },
              { label: 'Y-Kesişimi', value: '(0, 1)' },
              { label: 'X-Kesişimi', value: '(-1, 0)' },
            ].map((item, idx) => (
              <li key={idx} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-medium">{item.label}:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{item.value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ekstremumlar */}
        <section className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center">
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mr-3 text-xs">
              <i className="fa-solid fa-mountain"></i>
            </span>
            Kritik Noktalar
          </h3>
          <div className="space-y-3">
            {criticalPoints.map((pt, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border-l-4 ${
                pt.type === 'max' 
                  ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-500' 
                  : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      pt.type === 'max' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {pt.type === 'max' ? 'Maksimum' : 'Minimum'}
                    </span>
                    <p className="text-slate-800 dark:text-slate-100 font-bold mt-0.5">x ≈ {pt.x.toFixed(2)}</p>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-xs font-bold">y ≈ {pt.value.toFixed(3)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bükülme Noktaları */}
        <section className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 col-span-1 md:col-span-2">
          <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center">
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mr-3 text-xs">
              <i className="fa-solid fa-wave-square"></i>
            </span>
            Bükülme Noktaları (f'' = 0)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {inflectionPoints.map((pt, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mb-1">Nokta {idx + 1}</span>
                <div className="flex flex-col">
                  <span className="text-slate-800 dark:text-slate-200 font-bold text-sm">x ≈ {pt.x.toFixed(2)}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold">y ≈ {pt.value.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalysisView;
