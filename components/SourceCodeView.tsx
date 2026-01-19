
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SourceCodeView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as 'quadratic' | 'analysis') || 'quadratic';
  const [copied, setCopied] = useState(false);

  const quadraticCode = `#include <iostream>
#include <cmath>

using namespace std;

int main() {
    double a, b, c;
    double diskriminant, x1, x2;

    cout << "a katsayisini giriniz: ";
    cin >> a;

    cout << "b katsayisini giriniz: ";
    cin >> b;

    cout << "c katsayisini giriniz: ";
    cin >> c;

    diskriminant = b * b - 4 * a * c;

    cout << "\\nDiskriminant = " << diskriminant << endl;

    if (diskriminant < 0) {
        cout << "Bu denklemin gercek kokleri yoktur." << endl;
    } 
    else if (diskriminant == 0) {
        x1 = -b / (2 * a);
        cout << "Bu denklemin bir tane gercek koku vardir." << endl;
        cout << "Kok: x = " << x1 << endl;
    } 
    else {
        x1 = (-b + sqrt(diskriminant)) / (2 * a);
        x2 = (-b - sqrt(diskriminant)) / (2 * a);
        cout << "Bu denklemin iki farkli gercek koku vardir." << endl;
        cout << "1. Kok: x1 = " << x1 << endl;
        cout << "2. Kok: x2 = " << x2 << endl;
    }

    return 0;
}`;

  const analysisCode = `#include <iostream>
#include <cmath>
#include <vector>
#include <algorithm>

using namespace std;

double f(double x) {
    return pow(x + 1, 2) / (1 + x * x);
}

double f_prime(double x) {
    double h = 0.0001;
    return (f(x + h) - f(x - h)) / (2 * h);
}

double f_double_prime(double x) {
    double h = 0.0001;
    return (f_prime(x + h) - f_prime(x - h)) / (2 * h);
}

vector<double> find_critical_points() {
    vector<double> points;
    double step = 0.01;
    for (double x = -10; x <= 10; x += step) {
        if (abs(f_prime(x)) < 0.01) { 
            points.push_back(x);
        }
    }
    vector<double> unique_points;
    double tolerance = 0.1;
    for (int i = 0; i < points.size(); ++i) {
        if (i == 0 || points[i] - points[i - 1] > tolerance) {
            unique_points.push_back(points[i]);
        }
    }
    return unique_points;
}

int main() {
    cout << "f(x) = (x+1)^2 / (1+x^2) fonksiyonu analizi" << endl;
    cout << "===========================================" << endl;
    cout << "\\na) Tanim kumesi: Tum reel sayilar (payda her zaman pozitif)." << endl;

    vector<double> crit_points = find_critical_points();
    cout << "\\nc) Kritik noktalar (yaklasik): ";
    for (int i = 0; i < crit_points.size(); i++) {
        cout << crit_points[i] << " ";
    }
    cout << endl;
    
    return 0;
}`;

  const currentCode = activeTab === 'quadratic' ? quadraticCode : analysisCode;
  const currentFileName = activeTab === 'quadratic' ? 'quadratic_solver.cpp' : 'function_analysis.cpp';

  const setActiveTab = (tab: 'quadratic' | 'analysis') => {
    setSearchParams({ tab });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    return code.split('\n').map((line, i) => {
      let escaped = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Özel belirteçler kullanarak çakışmaları önlüyoruz
      let h = escaped;

      // 1. Strings
      h = h.replace(/(&quot;.*?&quot;|\".*?\")/g, '<span class="cc-str">$1</span>');
      
      // 2. Preprocessor
      h = h.replace(/(#include|#define|#if|#else|#elif|#endif|#pragma)/g, '<span class="cc-pre">$1</span>');
      
      // 3. Keywords
      h = h.replace(/\b(int|double|float|char|void|bool|long|short|unsigned|signed|const|static|extern|auto|register|volatile|struct|class|enum|union|typedef|if|else|switch|case|default|for|do|while|break|continue|goto|return|sizeof|typeid|typename|using|namespace|inline|virtual|friend|explicit|mutable|template|try|catch|throw|new|delete|operator|this|public|protected|private|std|vector|algorithm)\b/g, 
        '<span class="cc-key">$1</span>');

      // 4. Numbers (Harf içermeyen, sadece rakam olanları yakala - HTML tag içindekilere dokunma)
      // Bu regex sadece kelime sınırları içindeki sayıları hedef alır
      h = h.replace(/\b(\d+(\.\d+)?)\b(?![^<]*>)/g, '<span class="cc-num">$1</span>');

      // 5. IO & Functions
      h = h.replace(/\b(cout|cin|endl|Math|pow|abs|sqrt|push_back|size|begin|end|sort|max|min)\b/g, 
        '<span class="cc-func">$1</span>');

      // 6. Comments
      h = h.replace(/(\/\/.*)/g, '<span class="cc-com">$1</span>');

      // 7. Library Names
      h = h.replace(/(&lt;[a-zA-Z0-9_.]+&gt;)/g, '<span class="cc-lib">$1</span>');

      return (
        <div key={i} className="flex group">
          <span className="w-10 text-slate-600 select-none opacity-40 text-right pr-4 text-[10px] md:text-xs font-mono">{i + 1}</span>
          <span className="flex-1 whitespace-pre font-mono text-[11px] md:text-sm" dangerouslySetInnerHTML={{ __html: h || ' ' }} />
        </div>
      );
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <style>{`
        .cc-key { color: #fb7185; font-weight: bold; }
        .cc-pre { color: #fb923c; font-weight: bold; }
        .cc-func { color: #fcd34d; font-weight: bold; }
        .cc-str { color: #34d399; }
        .cc-num { color: #38bdf8; font-weight: bold; }
        .cc-com { color: #64748b; font-style: italic; }
        .cc-lib { color: #fdba74; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0d1117; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #30363d; border-radius: 10px; border: 2px solid #0d1117; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #484f58; }
      `}</style>

      {/* Tab Switcher */}
      <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-2xl w-fit mx-auto border border-slate-300 dark:border-slate-700 shadow-sm">
        <button
          onClick={() => setActiveTab('quadratic')}
          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            activeTab === 'quadratic'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md scale-105'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <i className="fa-solid fa-superscript mr-2"></i>
          Denklem Çözücü
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            activeTab === 'analysis'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md scale-105'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <i className="fa-solid fa-chart-line mr-2"></i>
          Analiz Algoritması
        </button>
      </div>

      <div className="bg-[#0d1117] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 relative">
        <div className="bg-[#161b22] px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-mono">{currentFileName}</span>
            <button 
              onClick={copyToClipboard}
              className="bg-slate-800 hover:bg-slate-700 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              title="Kodu Kopyala"
            >
              <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'} text-xs`}></i>
            </button>
          </div>
        </div>

        <div className="p-6 md:p-10 overflow-x-auto max-h-[600px] custom-scrollbar bg-[#0d1117]">
          <pre className="text-indigo-50 selection:bg-indigo-500/30">
            {highlightCode(currentCode)}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
          <h4 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center">
            <i className="fa-solid fa-microchip mr-2"></i>
            Mantıksal Yapı
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Bu projenin temel matematiksel hesaplamaları <strong>C++</strong> dilinde tasarlanmış algoritmalara dayanmaktadır. 
            Burada gördüğünüz kodlar, denklemlerin köklerini bulmak ve fonksiyonların türevlerini hesaplamak için kullanılan 
            standart <code>std::cmath</code> ve <code>std::vector</code> kütüphanelerini kullanır.
          </p>
        </div>
        <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.01]">
          <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center">
            <i className="fa-solid fa-code-merge mr-2"></i>
            Web Entegrasyonu
          </h4>
          <p className="text-xs text-indigo-100 leading-relaxed font-medium opacity-90">
            C++'da geliştirilen bu mantık, modern web arayüzü için <strong>TypeScript</strong>'e port edilmiştir. 
            Böylece hesaplamalar sunucuya ihtiyaç duymadan doğrudan tarayıcı üzerinde, yüksek performansla 
            ve gerçek zamanlı olarak gerçekleştirilir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SourceCodeView;
