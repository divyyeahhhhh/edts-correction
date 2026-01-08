
import React from 'react';
import { ShieldCheck, FileCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-emerald-600 p-2 rounded-lg">
          <FileCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">eTDS <span className="text-emerald-600">Corrector</span></h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Financial Compliance Suite</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a>
        <a href="#" className="hover:text-emerald-600 transition-colors">Support</a>
        <div className="h-4 w-[1px] bg-slate-200"></div>
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Session</span>
        </div>
      </div>
    </nav>
  );
};
