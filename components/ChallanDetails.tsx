
import React, { useState } from 'react';
import { 
  Table, 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Calculator,
  Info
} from 'lucide-react';

interface ChallanRecord {
  id: number;
  tds: number;
  amtDeposited: number;
  date: string;
  bsrCode: string;
  serialNo: string;
  sectionCode: string;
  status: 'Matched' | 'Unmatched' | 'Provisionally Booked';
}

const MOCK_CHALLANS: ChallanRecord[] = [
  { id: 1, tds: 6982, amtDeposited: 6982, date: "06/05/2024", bsrCode: "0230001", serialNo: "07870", sectionCode: "94C", status: "Matched" },
  { id: 2, tds: 1743, amtDeposited: 1743, date: "07/06/2024", bsrCode: "0230001", serialNo: "07871", sectionCode: "94J", status: "Matched" },
  { id: 3, tds: 1, amtDeposited: 1, date: "06/07/2024", bsrCode: "0230001", serialNo: "07872", sectionCode: "92B", status: "Matched" },
];

export const ChallanDetails: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(3);
  const [isModifying, setIsModifying] = useState(false);
  const selectedChallan = MOCK_CHALLANS.find(c => c.id === selectedId) || MOCK_CHALLANS[0];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 p-8 lg:p-10 space-y-8">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Grid & Allocation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Challan Grid</h3>
              <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">Total: {MOCK_CHALLANS.length}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 font-black uppercase tracking-tighter">
                    <th className="px-4 py-3 border-b border-slate-100">Challan No.</th>
                    <th className="px-4 py-3 border-b border-slate-100">TDS</th>
                    <th className="px-4 py-3 border-b border-slate-100">Amt Deposited</th>
                    <th className="px-4 py-3 border-b border-slate-100">Date</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-slate-700">
                  {MOCK_CHALLANS.map((challan) => (
                    <tr 
                      key={challan.id}
                      onClick={() => setSelectedId(challan.id)}
                      className={`cursor-pointer transition-colors ${selectedId === challan.id ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-4 py-3 border-b border-slate-50">{challan.id}</td>
                      <td className="px-4 py-3 border-b border-slate-50">{challan.tds.toLocaleString()}</td>
                      <td className="px-4 py-3 border-b border-slate-50">{challan.amtDeposited.toLocaleString()}</td>
                      <td className="px-4 py-3 border-b border-slate-50">{challan.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Allocation Summary Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">For Challan No. {selectedId}</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <SummaryField label="Allocatable Amt" value={selectedChallan.amtDeposited.toString()} />
              <SummaryField label="Amt allocated as per deductee" value={selectedChallan.amtDeposited.toString()} />
              <SummaryField label="TIN Deductee annex Amt" value={selectedChallan.amtDeposited.toString()} />
              <SummaryField label="TIN Pending Balance" value="0" highlighted />
            </div>
            <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
              <p className="text-[11px] font-bold text-rose-600 leading-tight">
                Challan Matched. Only Interest allocated / other Amt allocated can be modified.
              </p>
            </div>
          </div>

          {/* Cyan Instruction Box */}
          <div className="bg-cyan-50 border border-cyan-100 rounded-[2rem] p-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Info size={40} className="text-cyan-600" />
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 bg-cyan-600 rounded-lg">
                <Info size={14} className="text-white" />
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-cyan-800 leading-relaxed uppercase tracking-tight underline decoration-cyan-200 underline-offset-4">Instructions</p>
                <ol className="text-[11px] text-cyan-700 font-medium space-y-2 list-decimal ml-4">
                  <li>You may add a new challan. Deletion of challan is allowed.</li>
                  <li>Update of the challan is allowed:
                    <ul className="list-disc ml-4 mt-1 space-y-1 text-cyan-600">
                      <li>For all the fields if challan status is "Unmatched"</li>
                      <li>For only section code/ Interest allocated / other Amt allocated if challan status is "Matched" or "Provisionally Booked"</li>
                    </ul>
                  </li>
                </ol>
                <button className="text-[10px] font-black text-cyan-600 hover:text-cyan-800 uppercase tracking-widest border-b border-cyan-200">Click here to verify</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detail Screen */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="bg-slate-900 px-8 py-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Challan Detail Screen</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Selected Serial</p>
                  <p className="text-xs font-bold text-emerald-400">#{selectedChallan.serialNo}</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Table Header for Comparison */}
              <div className="grid grid-cols-12 gap-4 border-b border-slate-100 pb-2">
                <div className="col-span-6"></div>
                <div className="col-span-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted</div>
                <div className="col-span-3 text-center text-[10px] font-black text-emerald-600 uppercase tracking-widest">Correction</div>
              </div>

              <div className="space-y-3">
                <DetailRow label="Book Entry" submitted="N" correction="N" disabled={!isModifying} />
                <DetailRow label="Challan Serial No." submitted={selectedChallan.serialNo} correction={selectedChallan.serialNo} disabled={!isModifying} />
                <DetailRow label="Transfer Voucher No." submitted="" correction="" disabled={!isModifying} />
                <DetailRow label="BSR Code" submitted={selectedChallan.bsrCode} correction={selectedChallan.bsrCode} disabled={!isModifying} />
                <DetailRow label="Date of Deposit" submitted={selectedChallan.date} correction={selectedChallan.date} disabled={!isModifying} />
                <DetailRow label="Section Code" submitted={selectedChallan.sectionCode} correction={selectedChallan.sectionCode} isSelect options={["92B", "94C", "94J", "94I"]} disabled={!isModifying} />
                <DetailRow label="TDS" submitted={selectedChallan.tds.toString()} correction={selectedChallan.tds.toString()} disabled={!isModifying} />
                <DetailRow label="Surcharge" submitted="0" correction="0" disabled={!isModifying} />
                <DetailRow label="Education Cess" submitted="0" correction="0" disabled={!isModifying} />
                <DetailRow label="Interest" submitted="0" correction="0" disabled={!isModifying} />
                <DetailRow label="Fee" submitted="0" correction="0" disabled={!isModifying} />
                <DetailRow label="Others" submitted="0" correction="0" disabled={!isModifying} />
                <DetailRow label="Total" submitted={selectedChallan.tds.toString()} correction={selectedChallan.tds.toString()} disabled={!isModifying} highlighted />
                <DetailRow label="Cheque No / DD No." submitted="0" correction="0" disabled={!isModifying} />
                <DetailRow label="Minor Head (200/400)" submitted="200" correction="200" disabled={!isModifying} />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                   <span className="text-[11px] font-black text-rose-600 uppercase tracking-widest">Challan Matched</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Balance Amount</p>
                  <p className="text-lg font-black text-slate-900">₹ 0.00</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-auto bg-slate-50 border-t border-slate-200 p-6 flex flex-wrap gap-3">
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

const SummaryField: React.FC<{ label: string, value: string, highlighted?: boolean }> = ({ label, value, highlighted }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
    <div className={`px-3 py-1.5 rounded-xl border text-sm font-black ${highlighted ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-800'}`}>
      {value}
    </div>
  </div>
);

const DetailRow: React.FC<{ 
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
      <div className="w-full bg-slate-100/50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-400 text-center">
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
