
import React from 'react';
import { PROFILE_DATA } from '../consts';

const ProfileView: React.FC = () => {
  const tableData = [
    { label: "Tam Adı", value: PROFILE_DATA.name, isBold: true },
    { label: "Ders / Sınıf", value: PROFILE_DATA.course, isBold: true },
    { label: "Ödev Başlığı", value: PROFILE_DATA.assignmentTitle },
    { label: "Öğrenci Numarası", value: PROFILE_DATA.studentId, isCode: true },
    { label: "Üniversite", value: PROFILE_DATA.university, isBold: true },
    { label: "Bölüm", value: PROFILE_DATA.department },
    { label: "E-Posta", value: PROFILE_DATA.email, isLink: true, linkPrefix: "mailto:" },
    { label: "GitHub", value: `@${PROFILE_DATA.github}`, isLink: true, linkUrl: PROFILE_DATA.githubUrl },
    { label: "Repo", value: "matem-odev-1", isLink: true, linkUrl: PROFILE_DATA.repoUrl },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-900 dark:to-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <i className="fa-solid fa-id-card text-[200px] -mr-10 -mt-10"></i>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
          <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-5xl shadow-inner">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{PROFILE_DATA.name}</h1>
            <p className="text-indigo-100 text-lg font-bold opacity-80 uppercase tracking-widest">{PROFILE_DATA.university}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-tighter border border-emerald-500/30">Aktif Öğrenci</span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-tighter border border-indigo-500/30">Mühendislik Fakültesi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Bilgi Verileri</h3>
          <i className="fa-solid fa-database text-slate-300 dark:text-slate-700 text-xl"></i>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                <th className="px-8 py-4 w-1/3">🏷️ Alan</th>
                <th className="px-8 py-4">📘 Bilgi Verisi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {tableData.map((row, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-5 text-xs font-bold text-slate-500 dark:text-slate-400">
                    {row.label}
                  </td>
                  <td className="px-8 py-5">
                    {row.isLink ? (
                      <a 
                        href={row.linkUrl || `${row.linkPrefix}${row.value}`}
                        target={row.linkUrl ? "_blank" : undefined}
                        rel={row.linkUrl ? "noopener noreferrer" : undefined}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center group/link"
                      >
                        {row.value}
                        <i className="fa-solid fa-external-link text-[10px] ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity"></i>
                      </a>
                    ) : row.isCode ? (
                      <code className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                        {row.value}
                      </code>
                    ) : (
                      <span className={`text-slate-800 dark:text-slate-200 ${row.isBold ? 'font-black' : 'font-semibold'}`}>
                        {row.value}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-sm">
            <i className="fa-solid fa-envelope-open-text"></i>
          </div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">İletişim</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Her türlü soru için e-posta yoluyla ulaşabilirsiniz.</p>
        </div>
        
        <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-[2rem] border border-slate-800 flex flex-col items-center text-center group transition-all hover:scale-[1.02]">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm border border-white/10 group-hover:rotate-12 transition-transform">
            <i className="fa-brands fa-github text-2xl"></i>
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">GitHub Profili</p>
          <p className="text-xs font-bold text-slate-400">Açık kaynak projelerimi takip edin.</p>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/30 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-sm">
            <i className="fa-solid fa-code-commit"></i>
          </div>
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Versiyon</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400">v1.0.0 Stable Build</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
