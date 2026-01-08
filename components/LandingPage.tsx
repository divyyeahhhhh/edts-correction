
import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Info, ArrowRight, ShieldAlert, Mail } from 'lucide-react';

interface LandingPageProps {
  onProceed: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onProceed }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">
          Reliable TDS Corrections, <br /> 
          <span className="text-emerald-600 italic">Redefined.</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Streamline your NSDL and TRACES compliance with our enterprise-grade correction suite. 
          Validated, secure, and built for precision.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Prerequisites Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Before you begin</h3>
          </div>
          
          <div className="space-y-4 flex-grow">
            <div className="flex gap-3 text-slate-600 leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
              <p>
                This software requires the <strong>original / consolidated file</strong> submitted earlier 
                (files with <code className="bg-slate-100 px-1 rounded text-emerald-700">.xlsx</code> or 
                <code className="bg-slate-100 px-1 rounded text-emerald-700">.csv</code> extensions).
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-sm text-amber-800 leading-relaxed">
                <span className="font-bold flex items-center gap-1 mb-1">
                  <ShieldAlert className="w-4 h-4" /> Compatibility Note:
                </span>
                eTDS Corrector will work only if you have a licensed version of <strong>eTdsWizard, TdsPac, SalTds,</strong> or <strong>PayPac</strong> registered to your account.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              Need help? <a href="mailto:etds@thomsonreuters.com" className="text-emerald-600 hover:underline font-medium">etds@thomsonreuters.com</a>
            </p>
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-white shadow-2xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-800 rounded-lg text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Important Disclaimer</h3>
          </div>
          
          <div className="space-y-4 flex-grow">
            <p className="text-slate-300 text-sm leading-relaxed">
              Every effort has been made to incorporate all changes in eTDS Corrector necessitated by the latest 
              file formats issued by <strong>NSDL / TRACES</strong>.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              We shall not be held responsible for any data loss occurring due to new file format updates. 
              Corrections made in previously downloaded consolidated data may need to be reset and re-entered 
              in the newly downloaded version for full compatibility.
            </p>
          </div>

          <div className="mt-8">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-1">
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-700 bg-slate-800 checked:bg-emerald-500 checked:border-emerald-500 transition-all"
                />
                <CheckCircle2 className="absolute w-5 h-5 text-white scale-0 peer-checked:scale-100 transition-transform duration-200" />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                I have read the disclaimer and understand that I am responsible for maintaining backups of my original data.
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onProceed}
          disabled={!agreed}
          className={`
            group relative flex items-center gap-2 px-12 py-4 rounded-full text-lg font-bold transition-all duration-300
            ${agreed 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}
          `}
        >
          <span>Proceed to Corrector</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};