
import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Download, 
  ChevronLeft, 
  FileSpreadsheet, 
  Building2, 
  Hash,
  Calendar,
  Layers,
  FileCheck,
  HelpCircle,
  XCircle,
  Clock,
  LayoutDashboard,
  CheckCircle2,
  Users,
  FileDown,
  ArrowRight
} from 'lucide-react';
import { DeductorDetails } from './DeductorDetails';
import { ChallanDetails } from './ChallanDetails';
import { DeducteeDetails } from './DeducteeDetails';

interface CorrectionStatementProps {
  onBack: () => void;
}

type TabType = 'create' | 'deductor' | 'challan' | 'deductee' | 'pan_ded' | 'reasons' | 'pan_sal';

export const CorrectionStatement: React.FC<CorrectionStatementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('create');
  const [fileLoaded, setFileLoaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [filePath, setFilePath] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [metaData, setMetaData] = useState({
    tan: "",
    financialYear: "",
    formNo: "",
    quarter: "",
    companyName: "",
    originalPrn: "",
    previousPrn: "",
    creationDate: "",
    lastModified: ""
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFilePath(`C:\\Users\\Admin\\Documents\\TDS_Files\\${file.name}`);
      setIsScanning(true);
      
      // Simulate data extraction processing delay
      setTimeout(() => {
        setMetaData({
          tan: "MUMP33842E",
          financialYear: "2024 - 2025",
          formNo: "26Q",
          quarter: "Q1",
          companyName: "JAYEMS ENGINEERING CO.PVT.LTD.",
          originalPrn: "770000257261911",
          previousPrn: "770000257261911",
          creationDate: "24 / 10 / 2025",
          lastModified: "Today, 10:45 AM"
        });
        setFileLoaded(true);
        setIsScanning(false);
      }, 1200);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const downloadSampleFile = () => {
    // Generate a simple CSV content representing an Excel-ready data sheet
    const content = "TAN,FinancialYear,FormNo,Quarter,CompanyName,PRN\nMUMP33842E,2024-25,26Q,Q1,JAYEMS ENGINEERING CO.PVT.LTD.,770000257261911";
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'etds_correction_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'deductor':
        return <DeductorDetails />;
      case 'challan':
        return <ChallanDetails />;
      case 'deductee':
        return <DeducteeDetails />;
      case 'create':
        return (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Data Source Selection Area */}
            <div className="p-8 lg:p-10 bg-slate-50/50 border-b border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                 <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Source File Selection</h3>
                 </div>
                 
                 {/* Classy Sample Download Button */}
                 <button 
                  onClick={downloadSampleFile}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 rounded-xl text-emerald-600 text-[11px] font-black uppercase tracking-wider hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm group"
                 >
                   <FileDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                   Download Sample Excel/CSV
                 </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2">
                  <div 
                    onClick={triggerFileSelect}
                    className={`
                      relative border-2 border-dashed rounded-3xl p-8 transition-all cursor-pointer group 
                      ${isScanning ? 'border-emerald-400 bg-emerald-50/20' : ''}
                      ${fileLoaded ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 hover:border-emerald-400 hover:bg-white'}
                    `}
                  >
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-3xl z-10">
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                           <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Parsing Data...</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-5">
                      <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center transition-all
                        ${fileLoaded ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}
                      `}>
                        {fileLoaded ? <FileCheck className="w-8 h-8" /> : <FileSpreadsheet className="w-8 h-8" />}
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <p className="text-base font-bold text-slate-800 truncate">
                          {filePath || "Import latest consolidated Excel/CSV file from TRACES"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Standard Format Version 8.7 • Secure NSDL Data Validation
                        </p>
                      </div>
                      <div className="hidden sm:flex px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-lg transition-all group-hover:scale-105 active:scale-95">
                        Browse Files
                      </div>
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".xlsx,.xls,.csv" />
                </div>
                
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center h-full">
                   <div className="flex items-center gap-2 text-slate-400 mb-3">
                     <HelpCircle className="w-4 h-4 text-emerald-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Process Guide</span>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed font-medium">
                     Use the <span className="text-emerald-600 font-bold">Sample Excel</span> to test features before processing live TRACES records. Ensure all data mappings are correct.
                   </p>
                   {fileLoaded && (
                     <button 
                      onClick={() => setActiveTab('deductor')}
                      className="mt-4 text-[10px] font-black text-emerald-600 flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest"
                     >
                       Review Deductor Details <ArrowRight size={12} />
                     </button>
                   )}
                </div>
              </div>
            </div>

            {/* Form Fields Area */}
            <div className="p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <ModernField icon={<Hash />} label="TAN" value={metaData.tan} />
                    <ModernField icon={<Calendar />} label="Financial Year" value={metaData.financialYear} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <ModernField icon={<Layers />} label="Form No" value={metaData.formNo} />
                    <ModernField icon={<Clock />} label="Quarter" value={metaData.quarter} />
                  </div>
                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-3 ml-1">Company / Deductor Name</label>
                    <div className="w-full min-h-[4rem] bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 flex items-center">
                      <span className={`text-base font-bold tracking-tight ${metaData.companyName ? 'text-slate-800' : 'text-slate-300 italic'}`}>
                        {metaData.companyName || "Awaiting file upload..."}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <ModernField icon={<FileCheck />} label="Original PRN No." value={metaData.originalPrn} />
                  <ModernField icon={<FileCheck />} label="Previous PRN No." value={metaData.previousPrn} />
                  <div className="grid grid-cols-2 gap-6">
                    <ModernField icon={<Calendar />} label="File Creation Date" value={metaData.creationDate} />
                    <ModernField icon={<Clock />} label="Last Modified" value={metaData.lastModified} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-20 text-center flex flex-col items-center gap-4 bg-slate-50/30">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
               <LayoutDashboard className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Module Under Construction</h3>
              <p className="text-sm text-slate-500 italic">This interface is being optimized for compliance.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-2 gap-4">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-2 transition-colors font-medium group">
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Return to Dashboard
          </button>
          <h2 className="text-4xl font-serif text-slate-900 tracking-tight">
            {activeTab === 'deductor' ? 'Deductor ' : activeTab === 'challan' ? 'Challan ' : activeTab === 'deductee' ? 'Deductee ' : 'Create eTDS '}
            <span className="text-emerald-600">
              {activeTab === 'deductor' ? 'Details' : activeTab === 'challan' ? 'Management' : activeTab === 'deductee' ? 'Workspace' : 'File'}
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              NSDL V8.7 Compliant
            </span>
          </div>
          <button onClick={onBack} className="p-2 text-slate-400 hover:text-rose-500 transition-colors bg-white rounded-full border border-slate-200 shadow-sm">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden min-h-[600px] flex flex-col">
        {/* Dynamic Content Area */}
        <div className="flex-grow">
          {renderContent()}
        </div>

        {/* Navigation Bar (Tabs) */}
        <div className="px-8 pb-8 pt-4">
          <div className="bg-slate-900 rounded-[2rem] p-2 flex flex-wrap lg:flex-nowrap gap-1 shadow-xl shadow-slate-900/20">
            <ModernTab label="Create eTDS File" active={activeTab === 'create'} onClick={() => setActiveTab('create')} />
            <ModernTab label="Deductor" active={activeTab === 'deductor'} onClick={() => setActiveTab('deductor')} />
            <ModernTab label="Challan" active={activeTab === 'challan'} onClick={() => setActiveTab('challan')} />
            <ModernTab label="Deductee" active={activeTab === 'deductee'} onClick={() => setActiveTab('deductee')} />
            <ModernTab label="PAN Ded." active={activeTab === 'pan_ded'} onClick={() => setActiveTab('pan_ded')} />
            <ModernTab label="Reasons" active={activeTab === 'reasons'} onClick={() => setActiveTab('reasons')} />
            <ModernTab label="PAN Sal." active={activeTab === 'pan_sal'} onClick={() => setActiveTab('pan_sal')} />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-6">
             <span>Version 4.2.0 Build 2025</span>
             <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
             <span className="text-slate-300">TRACES Integrated</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 text-[10px] font-black rounded-full shadow-sm">NSDL PRO</div>
             <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-5 py-2 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-bold shadow-sm">
               <HelpCircle size={14} /> Assistance
             </button>
             <button onClick={onBack} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-2xl hover:bg-slate-800 transition-all text-xs font-bold shadow-lg shadow-slate-200">
               Exit System
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModernField: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2.5 ml-1">{label}</label>
    <div className={`flex items-center gap-3 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[1.25rem] transition-all duration-500 ${value && value !== "" ? 'border-emerald-200 bg-emerald-50/20 shadow-sm' : 'border-slate-200'}`}>
      <span className={`${value && value !== "" ? 'text-emerald-500' : 'text-slate-300'}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
      </span>
      <div className={`text-sm font-bold tracking-tight h-5 flex items-center ${!value ? 'text-slate-300 italic' : 'text-slate-800 animate-in fade-in duration-700'}`}>
        {value || "Not set"}
      </div>
      {value && value !== "" && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto animate-in zoom-in duration-300" />}
    </div>
  </div>
);

const ModernTab: React.FC<{ label: string, active?: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-grow px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-[1.5rem] ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
  >
    {label}
  </button>
);
