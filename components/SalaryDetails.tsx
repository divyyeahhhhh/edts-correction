
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  Info, 
  CheckCircle2, 
  ChevronRight,
  Calculator,
  X,
  ShieldCheck,
  Building2,
  User,
  History,
  FileText,
  AlertCircle,
  IndianRupee,
  Layers,
  Briefcase
} from 'lucide-react';

interface SalaryRecord {
  srNo: number;
  pan: string;
  name: string;
  taxableIncome: number;
  tax: number;
  category: string;
  fromDate: string;
  toDate: string;
  taxableAmount338: number;
  reportedTaxable339: number;
  entertainmentAllowance: number;
  pTax: number;
  standardDeduction: number;
  totalExemptionUs10: number;
  incomeHouseProperty352: number;
  incomeOtherSources354: number;
  grossTotalVIA366: number;
  rebate87A: number;
  surcharge: number;
  eduCess: number;
  relief89: number;
  tdsAtSource374: number;
  reportedTdsPrevEmpr375: number;
  higherRatePAN: 'Y' | 'N';
  newTaxRegime: 'Y' | 'N';
}

const MOCK_SALARY_DATA: SalaryRecord[] = [
  { 
    srNo: 1, pan: "BHHPD2710B", name: "PRABHAT DUBEY", taxableIncome: 310603, tax: 530, category: "G", 
    fromDate: "01/04/2023", toDate: "31/03/2024", taxableAmount338: 400000, reportedTaxable339: 0,
    entertainmentAllowance: 0, pTax: 2500, standardDeduction: 50000, totalExemptionUs10: 20000,
    incomeHouseProperty352: 0, incomeOtherSources354: 0, grossTotalVIA366: 150000,
    rebate87A: 12500, surcharge: 0, eduCess: 0, relief89: 0, tdsAtSource374: 530, reportedTdsPrevEmpr375: 0,
    higherRatePAN: 'N', newTaxRegime: 'Y'
  },
  { 
    srNo: 2, pan: "CNVPC6524R", name: "PRANAV CHOUGULE", taxableIncome: 92438, tax: 0, category: "G",
    fromDate: "01/04/2023", toDate: "31/03/2024", taxableAmount338: 142438, reportedTaxable339: 0,
    entertainmentAllowance: 0, pTax: 0, standardDeduction: 50000, totalExemptionUs10: 0,
    incomeHouseProperty352: 0, incomeOtherSources354: 0, grossTotalVIA366: 0,
    rebate87A: 0, surcharge: 0, eduCess: 0, relief89: 0, tdsAtSource374: 5460, reportedTdsPrevEmpr375: 0,
    higherRatePAN: 'N', newTaxRegime: 'Y'
  },
  { 
    srNo: 3, pan: "BQXPD7343H", name: "NICOLE DOUND", taxableIncome: 408915, tax: 5446, category: "W",
    fromDate: "01/04/2023", toDate: "31/03/2024", taxableAmount338: 550000, reportedTaxable339: 50000,
    entertainmentAllowance: 0, pTax: 2500, standardDeduction: 50000, totalExemptionUs10: 35000,
    incomeHouseProperty352: -200000, incomeOtherSources354: 15000, grossTotalVIA366: 150000,
    rebate87A: 0, surcharge: 0, eduCess: 217, relief89: 0, tdsAtSource374: 5446, reportedTdsPrevEmpr375: 0,
    higherRatePAN: 'N', newTaxRegime: 'N'
  }
];

export const SalaryDetails: React.FC = () => {
  const [selectedSrNo, setSelectedSrNo] = useState<number>(2);
  const [isModifying, setIsModifying] = useState(false);
  const [activeModal, setActiveModal] = useState<'taxable' | 'exemptions' | 'chaptervia' | 'additional' | null>(null);
  
  const record = MOCK_SALARY_DATA.find(r => r.srNo === selectedSrNo) || MOCK_SALARY_DATA[0];
  const [formData, setFormData] = useState<SalaryRecord>(record);

  useEffect(() => {
    setFormData(record);
  }, [selectedSrNo]);

  // Derived calculations
  const totalSalary = formData.taxableAmount338 + formData.reportedTaxable339;
  const incCharSal351 = totalSalary - formData.entertainmentAllowance - formData.pTax - formData.standardDeduction - formData.totalExemptionUs10;
  const groTotInc355 = incCharSal351 + formData.incomeHouseProperty352 + formData.incomeOtherSources354;
  const totTaxInc367 = groTotInc355 - formData.grossTotalVIA366;
  const incomeTax368 = Math.max(0, (totTaxInc367 - 250000) * 0.05); 
  const netIncTax373 = incomeTax368 + formData.surcharge + formData.eduCess - (formData.rebate87A + formData.relief89);
  const totalTaxDeducted376 = formData.tdsAtSource374 + formData.reportedTdsPrevEmpr375;
  const shortExc377 = netIncTax373 - totalTaxDeducted376;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500 bg-slate-50/50">
      <div className="flex flex-grow overflow-hidden p-6 gap-6">
        
        {/* Main Panel */}
        <div className="flex-grow flex flex-col gap-6 overflow-hidden">
          
          {/* Section 1: Employee Selector Grid */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-[200px] flex-shrink-0">
            <div className="bg-slate-900 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-black text-white uppercase tracking-widest">Employee Payroll Register</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="relative">
                   <input type="text" placeholder="Search PAN / Name..." className="bg-slate-800 border-none text-[10px] text-white px-3 py-1.5 rounded-full w-48 outline-none focus:ring-1 focus:ring-emerald-500" />
                   <Search className="absolute right-3 top-1.5 w-3 h-3 text-slate-500" />
                 </div>
              </div>
            </div>
            <div className="flex-grow overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-100">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-3">Sr.No</th>
                    <th className="px-6 py-3">PAN</th>
                    <th className="px-6 py-3">Employee Name</th>
                    <th className="px-6 py-3 text-right">Taxable Income</th>
                    <th className="px-6 py-3 text-right">Tax (₹)</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {MOCK_SALARY_DATA.map((r) => (
                    <tr 
                      key={r.srNo} 
                      onClick={() => setSelectedSrNo(r.srNo)}
                      className={`cursor-pointer transition-all border-b border-slate-50 ${selectedSrNo === r.srNo ? 'bg-emerald-50/80 text-emerald-900' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      <td className="px-6 py-2.5 font-bold">{r.srNo}</td>
                      <td className="px-6 py-2.5 font-mono text-xs">{r.pan}</td>
                      <td className="px-6 py-2.5 font-bold uppercase tracking-tight">{r.name}</td>
                      <td className="px-6 py-2.5 text-right font-black">₹ {r.taxableIncome.toLocaleString()}</td>
                      <td className="px-6 py-2.5 text-right font-bold text-emerald-600">₹ {r.tax.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Salary Detail Workspace */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm flex flex-col flex-grow overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                  <Calculator size={18} />
                </div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Computation Workspace</h3>
              </div>
              <div className="flex gap-2">
                <PillTab label="Taxable Amount" onClick={() => setActiveModal('taxable')} />
                <PillTab label="Exemptions" onClick={() => setActiveModal('exemptions')} />
                <PillTab label="Chapter VIA" onClick={() => setActiveModal('chaptervia')} />
                <PillTab label="Additional" onClick={() => setActiveModal('additional')} />
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                
                {/* Income Stream Card */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Income Streams</span>
                  </div>
                  <ModernRow label="Employee PAN (331)" value={formData.pan} type="info" />
                  <ModernRow label="Employee Name (332)" value={formData.name} type="info" />
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <ModernRow label="From" value={formData.fromDate} stacked />
                    <ModernRow label="To" value={formData.toDate} stacked />
                  </div>

                  <div className="pt-2 space-y-3">
                    <ModernRow label="Taxable Amount (338)" value={formData.taxableAmount338.toLocaleString()} type="calc" />
                    <ModernRow label="Reported Taxable (339)" value={formData.reportedTaxable339.toLocaleString()} />
                    <ModernRow label="Total Salary (338+339)" value={totalSalary.toLocaleString()} type="highlight" />
                    <ModernRow label="Standard Deduction" value={formData.standardDeduction.toLocaleString()} type="deduction" />
                    <ModernRow label="Net Chargeable Salary (351)" value={incCharSal351.toLocaleString()} type="calc" />
                  </div>
                </div>

                {/* Tax Computation Card */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax Computations</span>
                  </div>
                  <ModernRow label="Gross Total Inc. (355)" value={groTotInc355.toLocaleString()} type="calc" />
                  <ModernRow label="VIA Deductions (366)" value={formData.grossTotalVIA366.toLocaleString()} type="deduction" />
                  <ModernRow label="Total Taxable Inc. (367)" value={totTaxInc367.toLocaleString()} type="highlight" />
                  
                  <div className="h-[1px] bg-slate-100 my-4" />
                  
                  <div className="space-y-3">
                    <ModernRow label="Income Tax (368)" value={incomeTax368.toLocaleString()} type="calc" />
                    <ModernRow label="Education Cess (371)" value={formData.eduCess.toLocaleString()} />
                    <ModernRow label="Net Income Tax (373)" value={netIncTax373.toLocaleString()} type="highlight" />
                    <ModernRow label="Total TDS (376)" value={totalTaxDeducted376.toLocaleString()} type="calc" />
                    <ModernRow 
                      label="Short / Excess (377)" 
                      value={shortExc377.toLocaleString()} 
                      type={shortExc377 < 0 ? 'error' : 'success'} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="w-[240px] flex flex-col gap-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200 text-white space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active File</span>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <Layers className="w-3 h-3" /> FORM 26Q • Q1
              </p>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-slate-800">
               <SidebarAction label="Add New Entry" icon={<Plus />} color="emerald" />
               <SidebarAction 
                 label={isModifying ? "Save Changes" : "Modify Record"} 
                 icon={isModifying ? <CheckCircle2 /> : <Edit3 />} 
                 onClick={() => setIsModifying(!isModifying)}
                 active={isModifying}
                 color="white"
               />
               <SidebarAction label="Delete Entry" icon={<Trash2 />} color="rose" />
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 space-y-4">
             <div className="flex items-center gap-2 text-emerald-700">
               <Info className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Guide</span>
             </div>
             <div className="space-y-4">
               <p className="text-[11px] font-medium text-emerald-800 leading-relaxed">
                 1. You can freely <span className="font-black">Add</span> or <span className="font-black">Delete</span> payroll records.
               </p>
               <p className="text-[11px] font-medium text-emerald-800 leading-relaxed">
                 2. Direct updates are restricted. To change, <span className="font-black">Delete</span> the existing and <span className="font-black">Add New</span>.
               </p>
               <p className="text-[11px] font-medium text-emerald-800 leading-relaxed">
                 3. Modification is locked for <span className="font-black text-rose-600">'F' flag</span> entries.
               </p>
             </div>
          </div>

          <button className="mt-auto group flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-full text-xs font-black uppercase tracking-widest text-slate-800 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm">
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Exit Module
          </button>
        </div>
      </div>

      {/* Modern Overlay Modals */}
      {activeModal === 'taxable' && (
        <ModernModal title="Taxable Amount Details" onClose={() => setActiveModal(null)}>
          <div className="grid gap-6">
            <ModernInput label="Gross Salary sec.17(1) [335]" value="1,190,000" />
            <ModernInput label="Value of perquisites sec.17(2) [336]" value="0" />
            <ModernInput label="Profits in lieu of salary sec. 17(3) [337]" value="0" />
            <div className="p-6 bg-slate-900 rounded-3xl text-white flex justify-between items-center">
               <span className="text-xs font-black uppercase tracking-widest text-slate-500">Total Taxable</span>
               <span className="text-xl font-black text-emerald-400">₹ 1,190,000</span>
            </div>
          </div>
        </ModernModal>
      )}

      {activeModal === 'exemptions' && (
        <ModernModal title="Exemptions Income Details" onClose={() => setActiveModal(null)} width="max-w-3xl">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <ModernInput label="Travel assistance [sec10(5)]" value="0" />
            <ModernInput label="Gratuity [sec10(10)]" value="0" />
            <ModernInput label="Pension value [sec10(10A)]" value="0" />
            <ModernInput label="Leave encashment [343]" value="0" />
            <ModernInput label="House rent [sec10(13A)]" value="0" />
            <ModernInput label="Other Special Allowances" value="0" />
            <div className="md:col-span-2 p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex justify-between items-center">
               <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Total Exemptions</span>
               <span className="text-xl font-black text-emerald-900">₹ 0</span>
            </div>
          </div>
        </ModernModal>
      )}

      {activeModal === 'chaptervia' && (
        <ModernModal title="Chapter VIA Management" onClose={() => setActiveModal(null)} width="max-w-4xl">
           <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-h-[60vh] overflow-y-auto px-2 custom-scrollbar">
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Gross Investments</h4>
                 <ModernInput label="80C Gross" value="0" />
                 <ModernInput label="80CCC Gross" value="0" />
                 <ModernInput label="80CCD(1) Gross" value="0" />
                 <ModernInput label="80D Medical" value="0" />
                 <ModernInput label="80TTA Gross" value="0" />
              </div>
              <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Deductible Limits</h4>
                 <ModernInput label="80C Deductible" value="0" />
                 <ModernInput label="80CCC Deductible" value="0" />
                 <ModernInput label="80CCD(1) Deductible" value="0" />
                 <ModernInput label="80D Deductible" value="0" />
                 <ModernInput label="80TTA Deductible" value="0" />
              </div>
           </div>
        </ModernModal>
      )}

      {activeModal === 'additional' && (
        <ModernModal title="Additional Compliance Details" onClose={() => setActiveModal(null)} width="max-w-5xl">
          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <section className="space-y-4">
                 <div className="flex items-center gap-2 mb-4">
                   <Building2 className="w-4 h-4 text-emerald-500" />
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Landlord Registry</h5>
                 </div>
                 {[1,2].map(i => (
                    <div key={i} className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <ModernInput label="PAN" value="" stacked />
                      <ModernInput label="Name" value="" stacked />
                    </div>
                 ))}
              </section>

              <section className="space-y-4">
                 <div className="flex items-center gap-2 mb-4">
                   <Briefcase className="w-4 h-4 text-emerald-500" />
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Lender Registry</h5>
                 </div>
                 {[1,2].map(i => (
                    <div key={i} className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <ModernInput label="PAN" value="" stacked />
                      <ModernInput label="Name" value="" stacked />
                    </div>
                 ))}
              </section>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-2xl flex items-center gap-3 text-amber-700">
               <AlertCircle size={16} />
               <p className="text-[10px] font-bold italic tracking-tight uppercase">Landlord & Lender details required for FY 2016-17 onwards.</p>
            </div>
          </div>
        </ModernModal>
      )}
    </div>
  );
};

// --- Modern Sub-Components ---

const ModernRow: React.FC<{ 
  label: string, 
  value: string, 
  type?: 'calc' | 'highlight' | 'info' | 'deduction' | 'error' | 'success',
  stacked?: boolean
}> = ({ label, value, type, stacked }) => (
  <div className={`flex ${stacked ? 'flex-col gap-1' : 'items-center justify-between gap-4'} py-1 group`}>
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{label}</label>
    <div className={`
      px-4 py-2 rounded-2xl text-xs font-black tracking-tight min-w-[140px] text-right transition-all
      ${type === 'info' ? 'bg-slate-50 text-slate-800 border border-slate-100' : ''}
      ${type === 'calc' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : ''}
      ${type === 'highlight' ? 'bg-slate-900 text-emerald-400 shadow-lg shadow-slate-200' : ''}
      ${type === 'deduction' ? 'bg-rose-50 text-rose-600 border border-rose-100' : ''}
      ${type === 'error' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : ''}
      ${type === 'success' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : ''}
      ${!type ? 'bg-white border border-slate-200 text-slate-900 shadow-sm' : ''}
    `}>
      {value}
    </div>
  </div>
);

const PillTab: React.FC<{ label: string, onClick: () => void }> = ({ label, onClick }) => (
  <button 
    onClick={onClick}
    className="px-4 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
  >
    {label}
  </button>
);

const SidebarAction: React.FC<{ 
  label: string, 
  icon: React.ReactNode, 
  onClick?: () => void, 
  active?: boolean,
  color: 'emerald' | 'white' | 'rose'
}> = ({ label, icon, onClick, active, color }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all shadow-lg text-[11px] font-black uppercase tracking-widest
      ${color === 'emerald' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : ''}
      ${color === 'rose' ? 'bg-rose-600 text-white hover:bg-rose-700' : ''}
      ${color === 'white' ? (active ? 'bg-emerald-500 text-white border-none' : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700') : ''}
    `}
  >
    <span>{label}</span>
    {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
  </button>
);

const ModernModal: React.FC<{ 
  title: string, 
  onClose: () => void, 
  children: React.ReactNode, 
  width?: string 
}> = ({ title, onClose, children, width = "max-w-2xl" }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
    <div className={`bg-white rounded-[3rem] shadow-2xl w-full ${width} overflow-hidden flex flex-col animate-in zoom-in-95 duration-300`}>
      <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 rounded-2xl text-emerald-400">
             <Calculator size={20} />
          </div>
          <h3 className="text-xl font-serif text-slate-900 tracking-tight">{title}</h3>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
          <X size={24} />
        </button>
      </div>
      <div className="p-10">
        {children}
      </div>
      <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3">
        <button onClick={onClose} className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">Cancel</button>
        <button onClick={onClose} className="px-12 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all">Save Details</button>
      </div>
    </div>
  </div>
);

const ModernInput: React.FC<{ label: string, value: string, stacked?: boolean }> = ({ label, value, stacked }) => (
  <div className={`flex flex-col gap-1.5 ${stacked ? 'w-full' : ''}`}>
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-800 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
       <input defaultValue={value} className="bg-transparent border-none outline-none w-full" />
    </div>
  </div>
);

const Users: React.FC<{ className?: string, size?: number }> = ({ className, size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
