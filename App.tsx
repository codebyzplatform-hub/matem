
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import AnalysisView from './components/AnalysisView';
import QuadraticView from './components/QuadraticView';
import ProfileView from './components/ProfileView';
import SourceCodeView from './components/SourceCodeView';
import { PROFILE_DATA } from './consts';

const App: React.FC = () => {
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
    { path: '/analiz', label: 'Analiz', icon: 'fa-chart-line' },
    { path: '/denklem', label: 'Denklem', icon: 'fa-superscript' },
    { path: '/kod', label: 'Kod (C++)', icon: 'fa-code' },
    { path: '/profil', label: 'Profil', icon: 'fa-user' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-24 md:pb-12">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <NavLink to="/analiz" className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-calculator text-xl"></i>
              </div>
              <span className="font-black text-slate-800 dark:text-white text-xl tracking-tighter uppercase">MathLab</span>
            </NavLink>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                      ${isActive 
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}
                    `}
                  >
                    <i className={`fa-solid ${item.icon} mr-2`}></i>
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700 hover:rotate-12 transition-all shadow-sm"
              >
                <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 mt-8">
          <Routes>
            <Route path="/analiz" element={<AnalysisView />} />
            <Route path="/denklem" element={<QuadraticView />} />
            <Route path="/kod" element={<SourceCodeView />} />
            <Route path="/profil" element={<ProfileView />} />
            <Route path="/" element={<Navigate to="/analiz" replace />} />
          </Routes>
        </main>

        {/* Mobile Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-4 pb-safe shadow-2xl">
          <div className="flex justify-around items-center h-20">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex flex-col items-center justify-center space-y-1 transition-all 
                  ${isActive ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'text-slate-400'}
                `}
              >
                <i className={`fa-solid ${item.icon} text-xl`}></i>
                <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <footer className="mt-20 text-center text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em] pb-10">
          <div className="flex justify-center space-x-4 mb-4 opacity-30">
            <i className="fa-solid fa-infinity"></i>
            <i className="fa-solid fa-sigma"></i>
            <i className="fa-solid fa-pi"></i>
          </div>
          <p>Matematiksel Analiz Platformu</p>
          <p className="mt-1">© 2026 {PROFILE_DATA.name}</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
