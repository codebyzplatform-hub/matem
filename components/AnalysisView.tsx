
import React from 'react';
import { findCriticalPoints, findInflectionPoints } from '../services/mathUtils';
import FunctionChart from './FunctionChart';

const AnalysisView: React.FC = () => {
  const criticalPoints = findCriticalPoints();
  const inflectionPoints = findInflectionPoints();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <i className="fa-solid fa-chart-area text-[150px]"></i>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-2">Funksiya Tahlili</h2>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 inline-block px-4 py-2 rounded-xl mb-8">
            <span className="text-indigo-600 dark:text-indigo-400 font-serif text-xl md:text-2xl font-black italic">
              f(x) = (x + 1)² / (1 + x²)
            </span>
          </div>
          
          <FunctionChart />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Parametrlar */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
            <i className="fa-solid fa-list-check mr-3 text-indigo-500"></i>
            Asosiy Parametrlar
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Aniqlanish sohasi', value: '(-∞, +∞)' },
              { label: 'Juft/Toqligi', value: 'Hech biri' },
              { label: 'Y-kesishishi', value: '(0, 1)' },
              { label: 'X-kesishishi', value: '(-1, 0)' },
              { label: 'Gorizontal asimptota', value: 'y = 1' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <span className="text-xs font-bold text-slate-500">{item.label}</span>
                <span className="text-xs font-black text-slate-800 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ekstremumlar */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
            <i className="fa-solid fa-arrow-up-right-dots mr-3 text-rose-500"></i>
            Kritik Nuqtalar
          </h3>
          <div className="space-y-4">
            {criticalPoints.map((pt, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${
                pt.type === 'max' 
                  ? 'bg-rose-50/50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/30' 
                  : 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                    pt.type === 'max' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {pt.type === 'max' ? 'Maksimum' : 'Minimum'}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">f({pt.x.toFixed(0)})</span>
                </div>
                <div className="mt-2 flex justify-between items-baseline">
                  <span className="text-xl font-black">x = {pt.x.toFixed(0)}</span>
                  <span className="text-sm font-bold opacity-60">y = {pt.value.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bukilish Nuqtalari */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
            <i className="fa-solid fa-wave-square mr-3 text-amber-500"></i>
            Egilish Nuqtalari
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {inflectionPoints.map((pt, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-wider">Nuqta {idx + 1}</p>
                  <p className="font-black text-lg">x ≈ {pt.x.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-wider">f(x)</p>
                  <p className="font-mono text-xs font-bold text-indigo-500">{pt.value.toFixed(2)}</p>
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
