
import React, { useEffect } from 'react';

declare global {
  interface Window {
    Prism: any;
  }
}

const SourceCodeView: React.FC = () => {
  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  const quadraticCpp = `#include <iostream>
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

  const analysisCpp = `#include <iostream>
#include <cmath>
#include <vector>
#include <algorithm>

using namespace std;

// Verilen fonksiyon degeri
double f(double x) {
    return pow(x + 1, 2) / (1 + x * x);
}

// Birinci türev (sayisal yaklasik)
double f_prime(double x) {
    double h = 0.0001;
    return (f(x + h) - f(x - h)) / (2 * h);
}

// Kritik noktalar ve analiz islemleri...
int main() {
    cout << "f(x) = (x+1)^2 / (1+x^2) analizi" << endl;
    // ...
    return 0;
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-slate-800 dark:bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-code text-lg"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">C++ Kaynak Kodları</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Orijinal algoritma uygulamaları</p>
          </div>
        </div>

        <div className="space-y-8 md:space-y-12">
          {/* İkinci Dereceden Denklem Kodu */}
          <section className="relative">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-black ring-1 ring-slate-200 dark:ring-slate-700 uppercase">01</span>
                <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Quadratic Solver</h3>
              </div>
              <button 
                onClick={() => copyToClipboard(quadraticCpp)}
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 text-slate-500 dark:text-slate-400 hover:text-white transition-all text-[9px] font-black border border-slate-200 dark:border-slate-700"
              >
                <i className="fa-regular fa-copy"></i>
                <span>KOPYALA</span>
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-[#2d2d2d] dark:bg-black">
              <div className="bg-[#212121] dark:bg-slate-900 px-4 py-2 flex items-center space-x-1.5 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <pre className="p-4 md:p-6 overflow-x-auto text-[11px] md:text-[13px] leading-relaxed scrollbar-hide">
                <code className="language-cpp">{quadraticCpp}</code>
              </pre>
            </div>
          </section>

          {/* Fonksiyon Analizi Kodu */}
          <section className="relative">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-black ring-1 ring-slate-200 dark:ring-slate-700 uppercase">02</span>
                <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Function Analysis</h3>
              </div>
              <button 
                onClick={() => copyToClipboard(analysisCpp)}
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 text-slate-500 dark:text-slate-400 hover:text-white transition-all text-[9px] font-black border border-slate-200 dark:border-slate-700"
              >
                <i className="fa-regular fa-copy"></i>
                <span>KOPYALA</span>
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-[#2d2d2d] dark:bg-black">
              <div className="bg-[#212121] dark:bg-slate-900 px-4 py-2 flex items-center space-x-1.5 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <pre className="p-4 md:p-6 overflow-x-auto text-[11px] md:text-[13px] leading-relaxed scrollbar-hide">
                <code className="language-cpp">{analysisCpp}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SourceCodeView;
