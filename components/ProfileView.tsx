
import React from 'react';
import { PROFILE_DATA } from '../consts';

const ProfileView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-4 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Ödev Başlığı Kartı */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-700 dark:to-indigo-950 rounded-[2.5rem] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <i className="fa-solid fa-graduation-cap text-[120px] md:text-[200px] -mr-6 md:-mr-10 -mt-6 md:-mt-10"></i>
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-2.5 py-1 bg-white/20 rounded-lg text-[9px] font-black tracking-widest uppercase backdrop-blur-sm">Akademik Ödev</span>
            <span className="px-2.5 py-1 bg-indigo-400/50 rounded-lg text-[9px] font-black tracking-widest uppercase backdrop-blur-sm">{PROFILE_DATA.year}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">{PROFILE_DATA.assignmentTitle}</h1>
          <p className="text-indigo-100 text-base md:text-xl font-bold opacity-90">{PROFILE_DATA.university}</p>
          <p className="text-white/60 text-[10px] md:text-sm font-bold tracking-wider uppercase mt-1">{PROFILE_DATA.department}</p>
        </div>
      </div>

      {/* Öğrenci Bilgileri */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-10">
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4">Öğrenci Profili</h3>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 shadow-sm shrink-0">
              <i className="fa-solid fa-user-graduate text-xl"></i>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">Ad Soyad</p>
              <p className="text-lg md:text-xl font-black text-slate-800 dark:text-white">{PROFILE_DATA.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
              <i className="fa-solid fa-id-card-clip text-xl"></i>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">Numara</p>
              <p className="text-lg md:text-xl font-black text-slate-800 dark:text-white tracking-tight">{PROFILE_DATA.studentId}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
              <i className="fa-solid fa-paper-plane text-xl"></i>
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">E-posta</p>
              <a href={`mailto:${PROFILE_DATA.email}`} className="text-sm md:text-base font-bold text-indigo-600 dark:text-indigo-400 truncate block hover:underline">
                {PROFILE_DATA.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-8 md:pt-0 md:pl-10 space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4">Linkler & Kaynaklar</h3>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-lg shrink-0 border border-white/5">
              <i className="fa-brands fa-github text-2xl"></i>
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">GitHub</p>
              <a 
                href={PROFILE_DATA.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base md:text-lg font-black text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center"
              >
                {PROFILE_DATA.github}
                <i className="fa-solid fa-arrow-right-long ml-2 text-xs opacity-50"></i>
              </a>
            </div>
          </div>

          <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
            <p className="text-[9px] font-black text-indigo-400 dark:text-indigo-500 uppercase mb-2">Ödev Deposu</p>
            <a 
              href={PROFILE_DATA.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-700 dark:text-indigo-400 break-all hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              {PROFILE_DATA.repoUrl.split('/').pop()}
              <i className="fa-solid fa-link ml-1 text-[10px]"></i>
            </a>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center space-x-2">
            <i className="fa-solid fa-circle-check text-emerald-500 dark:text-emerald-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
