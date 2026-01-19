
import React, { useState, useEffect } from 'react';
import AnalysisView from './components/AnalysisView';
import QuadraticView from './components/QuadraticView';
import SourceCodeView from './components/SourceCodeView';
import ProfileView from './components/ProfileView';
import { PROFILE_DATA } from './consts';

enum View {
  FUNCTION = 'FUNCTION',
  QUADRATIC = 'QUADRATIC',
  CODE = 'CODE',
  PROFILE = 'PROFILE'
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.FUNCTION);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navItems = [
    { id: View.FUNCTION, label: 'Analiz', icon: 'fa-chart-line' },
    { id: View.QUADRATIC, label: 'Denklem', icon: 'fa-superscript' },
    { id: View.CODE, label: 'Kod', icon: 'fa-code' },
    { id: View.PROFILE, label: 'Profil', icon: 'fa-user' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-24 md:pb-12">
      {/* Yuqori Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <i className="fa-solid fa-square-root-variable text-lg md:text-xl"></i>
            </div>
            <span className="font-extrabold text-slate-800 dark:text-white text-lg md:text-xl tracking-tighter uppercase">Matematik</span>
          </div>

          {/* Desktop Navigatsiya va Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeView === item.id
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md ring-1 ring-slate-200 dark:ring-slate-600'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} mr-2`}></i>
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all"
              aria-label="Toggle Dark Mode"
            >
              <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Asosiy Kontent */}
      <main className="max-w-6xl mx-auto px-4 mt-6 md:mt-8">
        <div className="transition-all duration-500">
          {activeView === View.FUNCTION && <AnalysisView />}
          {activeView === View.QUADRATIC && <QuadraticView />}
          {activeView === View.CODE && <SourceCodeView />}
          {activeView === View.PROFILE && <ProfileView />}
        </div>
      </main>

      {/* Mobil Pastki Navigatsiya */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors relative ${
                activeView === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg mb-1`}></i>
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
              {activeView === item.id && (
                <div className="absolute bottom-0 w-8 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Alt Bilgi */}
      <footer className="mt-16 text-center text-slate-400 dark:text-slate-500 text-xs border-t border-slate-200 dark:border-slate-800 pt-8 max-w-4xl mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-4 text-slate-300 dark:text-slate-700">
          <i className="fa-solid fa-infinity text-lg"></i>
          <i className="fa-solid fa-sigma text-lg"></i>
          <i className="fa-solid fa-pi text-lg"></i>
        </div>
        <p className="font-bold tracking-widest uppercase mb-1">Matematik Analiz ve Çözüm Merkezi</p>
        <p>&copy; 2024 Profesyonel Akademik Araçlar Paketi</p>
        <p className="mt-2 italic opacity-60">{PROFILE_DATA.name} - {PROFILE_DATA.university} {PROFILE_DATA.department}</p>
      </footer>
    </div>
  );
};

export default App;
