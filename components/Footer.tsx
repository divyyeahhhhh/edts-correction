
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-8 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-400 text-sm">
          &copy; {currentYear} eTDS Corrector Pro. All rights reserved.
        </div>
        <div className="flex gap-8 text-sm text-slate-500 font-medium">
          <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Compliance Hub</a>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2 py-1 border border-slate-100 rounded">v4.2.0-stable</span>
        </div>
      </div>
    </footer>
  );
};
