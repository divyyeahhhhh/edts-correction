
import React, { useState } from 'react';
import { 
  Table, 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  HelpCircle, 
  CheckCircle2, 
  FileText,
  Calculator,
  Info,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface ChallanRecord {
  id: number;
  amtDeposited: number;
  date: string;
}

interface DeducteeRecord {
  srNo: number;
  name: string;
  date: string;
  pan: string;
  amount: number;
  tds: number;
}

const MOCK_CHALLANS: ChallanRecord[] = [
  { id: 1, amtDeposited: 17241693, date: "06/02/2024" },
  { id: 2, amtDeposited: 17168216, date: "06/03/2024" },
  { id: 3, amtDeposited: 20032070, date: "05/04/2024" },
  { id: 4, amtDeposited: 232122, date: "09/05/2024" },
  { id: 5, amtDeposited: 10450, date: "18/07/2024" },
];

const MOCK_DEDUCTEES: DeducteeRecord[] = [
  { srNo: 1, name: "DR. ANIRUDH KOHLI", date: "31/01/2024", pan: "ABPPK5722F", amount: 149576, tds: 20955 },
  { srNo: 2, name: "MEHTA RAVINDRA RAMANLAL", date: "31/01/2024", pan: "AFCPM2100K", amount: 85400, tds: 8540 },
  { srNo: 3, name: "GHEEWALLA GULSHAN B", date: "31/01/2024", pan: "AMPPG2144P", amount: 120000, tds: 12000 },
  { srNo: 4, name: "DCOSTA G J", date: "31/01/2024", pan: "ADDPD9811G", amount: 95000, tds: 9500 },
  { srNo: 5, name: "ARANHA PHILOMENA M", date: "31/01/2024", pan: "ADVPA5233R", amount: 64000, tds: 6400 },
  { srNo: 6, name: "M NALLAIAH", date: "31/01/2024", pan: "AHGPM5200K", amount: 45000, tds: 4500 },
  { srNo: 7, name: "NAZARETH ANNETTE", date: "31/01/2024", pan: "AGWPN0122L", amount: 210000, tds: 21000 },
  { srNo: 8, name: "BARBOZA JANET LUCY", date: "31/01/2024", pan: "AJPPB1222H", amount: 32000, tds: 3200 },
  { srNo: 9, name: "KULKARNI SANGEETA K", date: "31/01/2024", pan: "AJEPK3544M", amount: 56000, tds: 5600 },
  { srNo: 10, name: "WAGLE SUJATA SHARAD", date: "31/01/2024", pan: "AAKPW7655Q", amount: 89000, tds: 8900 },
  { srNo: 11, name: "DSOUZA LEENA HENRY", date: "31/01/2024", pan: "AEYPD8211E", amount: 44000, tds: 4400 },
  { srNo: 12, name: "WALMIKI INDRAPAL L", date: "31/01/2024", pan: "ABPPW8922F", amount: 12500, tds: 1250 },
  { srNo: 13, name: "JEANETTE PIYUSH PAREKH", date: "31/01/2024", pan: "AILPP4899G", amount: 77000, tds: 7700 },
  { srNo: 14, name: "DMELLO EMILDA CATHERINE", date: "31/01/2024", pan: "AHIPD3200R", amount: 33000, tds: 3300 },
  { srNo: 15, name: "PEREIRA SAVIO MARIO", date: "31/01/2024", pan: "AMRPP1122K", amount: 67000, tds: 6700 },
  { srNo: 16, name: "FERNANDES LANCY", date: "31/01/2024", pan: "AGFPN5544L", amount: 92000, tds: 9200 },
  { srNo: 17, name: "ROZARIO MARIA P", date: "31/01/2024", pan: "ADKPR9200N", amount: 149576, tds: 21793 },
  { srNo: 18, name: "SHETTY SUDHAKAR", date: "31/01/2024", pan: "ABAPS5200K", amount: 45000, tds: 4500 },
  { srNo: 19, name: "GONSALVES RITA", date: "31/01/2024", pan: "AMPPG4433P", amount: 88000, tds: 8800 },
  { srNo: 20, name: "PINTO GERARD", date: "31/01/2024", pan: "AAEPP1111H", amount: 150000, tds: 15000 },
];

export const DeducteeDetails: React.FC = () => {
  const [selectedChallanId, setSelectedChallanId] = useState<number>(1);
  const [selectedDeducteeSr, setSelectedDeducteeSr] = useState<number>(17);
  const [isModifying, setIsModifying] = useState(false);

  const selectedChallan = MOCK_CHALLANS.find(c => c.id === selectedChallanId) || MOCK_CHALLANS[0];
  const selectedDeductee = MOCK_DEDUCTEES.find(d => d.srNo === selectedDeducteeSr) || MOCK_DEDUCTEES[0];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 p-8 lg:p-10 space-y-8 h-full overflow-y-auto">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Two Grids & Instructions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col h-[calc(100vh-320px)] min-h-[700px]">
          
          {/* Challan Grid Small */}
          <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden flex-shrink-0">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Challan Grid</h3>
              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Consolidated</span>
            </div>
            <div className="max-h-[160px] overflow-y-auto">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead className="sticky top-0 bg-white z-10 shadow-sm">
                  <tr className="text-slate-400 font-black uppercase tracking-tighter">
                    <th className="px-4 py-2 border-b border-slate-50">Challa...</th>
                    <th className="px-4 py-2 border-b border-slate-50">Amt Deposited</th>
                    <th className="px-4 py-2 border-b border-slate-50">Date</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-slate-600">
                  {MOCK_CHALLANS.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => setSelectedChallanId(c.id)}
                      className={`cursor-pointer transition-colors ${selectedChallanId === c.id ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-4 py-2 border-b border-slate-50">{c.id}</td>
                      <td className="px-4 py-2 border-b border-slate-50">{c.amtDeposited.toLocaleString()}</td>
                      <td className="px-4 py-2 border-b border-slate-50">{c.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deductee Grid Large */}
          <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden flex-grow flex flex-col">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Deductee Grid</h3>
              <span className="text-[9px] font-black text-slate-400">Records: {MOCK_DEDUCTEES.length}</span>
            </div>
            <div className="overflow-auto flex-grow">
              <table className="w-full text-left text-[10px] border-collapse min-w-[500px]">
                <thead className="sticky top-0 bg-slate-100 z-10">
                  <tr className="text-slate-700 font-black uppercase tracking-tighter">
                    <th className="px-2 py-2 border border-slate-300">Sr.No</th>
                    <th className="px-2 py-2 border border-slate-300">Name of party</th>
                    <th className="px-2 py-2 border border-slate-300">Date</th>
                    <th className="px-2 py-2 border border-slate-300">PAN</th>
                    <th className="px-2 py-2 border border-slate-300 text-right">Amount</th>
                    <th className="px-2 py-2 border border-slate-300 text-right">TDS</th>
                  </tr>
                </thead>
                <tbody className="font-bold text-slate-700">
                  {MOCK_DEDUCTEES.map((d) => (
                    <tr 
                      key={d.srNo}
                      onClick={() => setSelectedDeducteeSr(d.srNo)}
                      className={`cursor-pointer transition-colors ${selectedDeducteeSr === d.srNo ? 'bg-emerald-100 text-emerald-900' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-2 py-2 border border-slate-300 text-center">{d.srNo}</td>
                      <td className="px-2 py-2 border border-slate-300 truncate max-w-[150px]">{d.name}</td>
                      <td className="px-2 py-2 border border-slate-300 text-center whitespace-nowrap">{d.date}</td>
                      <td className="px-2 py-2 border border-slate-300 font-mono text-[9px]">{d.pan}</td>
                      <td className="px-2 py-2 border border-slate-300 text-right">{d.amount.toLocaleString()}</td>
                      <td className="px-2 py-2 border border-slate-300 text-right">{d.tds.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* New Accurate Summary Section: For Challan No. X */}
          <div className="bg-slate-50 rounded-[1.5rem] border border-slate-200 p-5 flex-shrink-0">
             <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-3">
               <Calculator className="w-3.5 h-3.5 text-emerald-600" />
               <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">For Challan No. {selectedChallanId}</h4>
             </div>
             
             <div className="flex justify-between items-start gap-4">
                <div className="flex-grow space-y-2">
                  <SummaryRow label="Amount Paid as per Challan" value={selectedChallan.amtDeposited.toLocaleString()} />
                  <SummaryRow label="Allocatable Amt" value={selectedChallan.amtDeposited.toLocaleString()} />
                  <SummaryRow label="Amount paid as Per Deductee" value={selectedChallan.amtDeposited.toLocaleString()} />
                  <SummaryRow label="TIN Deductee annex Amt" value={selectedChallan.amtDeposited.toLocaleString()} />
                  <SummaryRow label="TIN Pending Balance" value="0" />
                </div>
                
                <div className="w-32 flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl shadow-inner">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Balance</span>
                   <span className="text-xl font-black text-emerald-600">0</span>
                </div>
             </div>
          </div>

          {/* Cyan Instruction Box */}
          <div className="bg-cyan-50 border border-cyan-100 rounded-[1.5rem] p-5 shadow-sm flex-shrink-0">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-cyan-600 rounded-lg">
                <Info size={12} className="text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-cyan-800 uppercase tracking-tight">System Constraints</p>
                <ol className="text-[10px] text-cyan-700 font-medium space-y-1">
                  <li>1. You may add, delete or update a deductee record.</li>
                  <li>2. Modification & Deletion is not allowed for 'F' flag entries.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Comparison Workspace */}
        <div className="lg:col-span-7 flex flex-col h-[calc(100vh-320px)] min-h-[700px]">
           <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="bg-slate-900 px-8 py-5 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Deductee Detail Screen</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Record</p>
                    <p className="text-xs font-bold text-emerald-400 truncate max-w-[150px]">{selectedDeductee.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-6">
                 <div className="grid grid-cols-12 gap-4 border-b border-slate-100 pb-2">
                    <div className="col-span-6"></div>
                    <div className="col-span-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted</div>
                    <div className="col-span-3 text-center text-[10px] font-black text-emerald-600 uppercase tracking-widest">Correction</div>
                 </div>

                 <div className="space-y-3 pb-8">
                    <CompareRow label="PAN of Deductee" submitted={selectedDeductee.pan} correction={selectedDeductee.pan} disabled={!isModifying} />
                    <CompareRow label="PAN Ref." submitted="" correction="" disabled={!isModifying} />
                    <CompareRow label="Deductee Code" submitted="01" correction="01" isSelect options={["01 - Company", "02 - Non-Company"]} disabled={!isModifying} />
                    <CompareRow label="Name of the Deductee" submitted={selectedDeductee.name} correction={selectedDeductee.name} disabled={!isModifying} />
                    <CompareRow label="Date of Payment" submitted={selectedDeductee.date} correction={selectedDeductee.date} disabled={!isModifying} />
                    <CompareRow label="Amount Paid / Credited" submitted={selectedDeductee.amount.toLocaleString()} correction={selectedDeductee.amount.toLocaleString()} disabled={!isModifying} />
                    <CompareRow label="Book Entry" submitted="N" correction="N" isSelect options={["Y", "N"]} disabled={!isModifying} />
                    
                    <div className="py-4 mt-2 mb-2 bg-slate-50 rounded-2xl px-4 border border-slate-100">
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Financial Breakdown</h5>
                      <div className="space-y-3">
                        <CompareRow label="T.D.S" submitted={selectedDeductee.tds.toLocaleString()} correction={selectedDeductee.tds.toLocaleString()} disabled={!isModifying} />
                        <CompareRow label="Surcharge" submitted="0" correction="0" disabled={!isModifying} />
                        <CompareRow label="Education Cess" submitted="838" correction="838" disabled={!isModifying} />
                        <CompareRow label="Total Tax Deducted" submitted={(selectedDeductee.tds + 838).toLocaleString()} correction={(selectedDeductee.tds + 838).toLocaleString()} disabled={true} highlighted />
                        <CompareRow label="Total Tax Deposited" submitted={(selectedDeductee.tds + 838).toLocaleString()} correction={(selectedDeductee.tds + 838).toLocaleString()} disabled={true} highlighted />
                      </div>
                    </div>

                    <CompareRow label="Date of Deduction" submitted={selectedDeductee.date} correction={selectedDeductee.date} disabled={!isModifying} />
                    <CompareRow label="Emp. Sr. No" submitted="614" correction="614" disabled={!isModifying} />
                    <CompareRow label="Reason for Non. Ded." submitted="" correction="" isSelect options={["A - Lower/No Deduction", "B - Threshold", "C - Higher Rate"]} disabled={!isModifying} />
                    <CompareRow label="Section Code" submitted="92B" correction="92B" disabled={!isModifying} />
                    <CompareRow label="Certificate No. by AO" submitted="" correction="" disabled={!isModifying} />
                 </div>
              </div>

              {/* Action Bar */}
              <div className="mt-auto bg-slate-50 border-t border-slate-200 p-6 flex flex-wrap gap-3 flex-shrink-0">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                  <HelpCircle size={14} className="text-slate-400" /> Help
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-100 transition-all shadow-sm">
                  <Plus size={14} /> Add
                </button>
                <button 
                  onClick={() => setIsModifying(!isModifying)}
                  className={`flex items-center gap-2 px-8 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-md ${isModifying ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'}`}
                >
                  {isModifying ? <><CheckCircle2 size={14} /> Save</> : <><Edit3 size={14} /> Modify</>}
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm">
                  <Trash2 size={14} /> Delete
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all ml-auto">
                  <LogOut size={14} /> Exit
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SummaryRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter w-48">{label}</span>
    <div className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-black text-slate-800 text-right min-w-[100px] shadow-sm">
      {value}
    </div>
  </div>
);

const MiniField: React.FC<{ label: string, value: string, highlighted?: boolean }> = ({ label, value, highlighted }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
    <div className={`px-2 py-1 rounded-lg border text-[10px] font-black text-center ${highlighted ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'bg-white border-slate-200 text-slate-700'}`}>
      {value}
    </div>
  </div>
);

const CompareRow: React.FC<{ 
  label: string, 
  submitted: string, 
  correction: string, 
  disabled: boolean, 
  highlighted?: boolean,
  isSelect?: boolean,
  options?: string[]
}> = ({ label, submitted, correction, disabled, highlighted, isSelect, options }) => (
  <div className="grid grid-cols-12 gap-4 items-center group">
    <div className="col-span-6">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">{label}</label>
    </div>
    <div className="col-span-3">
      <div className="w-full bg-slate-100/50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-400 text-center truncate">
        {submitted || '—'}
      </div>
    </div>
    <div className="col-span-3">
      {isSelect ? (
        <select 
          disabled={disabled}
          defaultValue={correction}
          className={`w-full border rounded-lg px-2 py-1.5 text-xs font-bold text-center appearance-none outline-none transition-all ${disabled ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white border-emerald-200 text-slate-800 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500'}`}
        >
          {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          disabled={disabled}
          defaultValue={correction}
          className={`w-full border rounded-lg px-2 py-1.5 text-xs font-bold text-center outline-none transition-all ${disabled ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white border-emerald-200 text-slate-800 focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500'} ${highlighted && !disabled ? 'border-emerald-500 text-emerald-600 shadow-sm' : ''}`}
        />
      )}
    </div>
  </div>
);
