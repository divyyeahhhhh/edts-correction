
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  HelpCircle, 
  Edit3, 
  LogOut, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

interface PanRecord {
  srNo: number;
  name: string;
  pan: string;
  date: string;
  amountPaid: number;
  isValid: boolean;
}

const MOCK_DATA: PanRecord[] = [
  { srNo: 1200, name: "ABHISHEK EKNATH MOHITE", pan: "BEUPM2353F", date: "31/03/2024", amountPaid: 88769, isValid: true },
  { srNo: 612, name: "AHUJA VASUDEO", pan: "AELPA2949D", date: "29/02/2024", amountPaid: 331865, isValid: true },
  { srNo: 126, name: "AHUJA VASUDEO", pan: "AELPA2949D", date: "31/01/2024", amountPaid: 389963, isValid: true },
  { srNo: 1453, name: "AHUJA VASUDEO", pan: "AELPA2949D", date: "31/03/2024", amountPaid: 370481, isValid: true },
  { srNo: 101, name: "AAKARSHI PATNI", pan: "CZDPP5722J", date: "15/01/2024", amountPaid: 45000, isValid: true },
  { srNo: 102, name: "AAKASH ARASAL", pan: "BVOPR0911K", date: "20/01/2024", amountPaid: 12000, isValid: false },
  { srNo: 103, name: "AASHISH KAPOOR", pan: "AUXPK9288L", date: "22/01/2024", amountPaid: 75000, isValid: true },
  { srNo: 104, name: "ABHISHEK P DESAI", pan: "AOGPD5522M", date: "25/01/2024", amountPaid: 93000, isValid: true },
  { srNo: 105, name: "ACHARYA NEETA GANESH", pan: "AENPA5111N", date: "28/01/2024", amountPaid: 150000, isValid: true },
];

interface PanUpdateProps {
  title?: string;
}

export const PanUpdate: React.FC<PanUpdateProps> = ({ title = "Deductee" }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPartyName, setSelectedPartyName] = useState("ABHISHEK EKNATH MOHITE");
  const [isModifying, setIsModifying] = useState(false);

  // Grouped data for the left grid (unique names)
  const uniqueParties = useMemo(() => {
    const parties = MOCK_DATA.filter(item => 
      item.name.toLowerCase().includes(searchValue.toLowerCase()) || 
      item.pan.toLowerCase().includes(searchValue.toLowerCase())
    );
    // Return unique combinations of Name and PAN for the left grid
    const seen = new Set();
    return parties.filter(el => {
      const duplicate = seen.has(el.name);
      seen.add(el.name);
      return !duplicate;
    });
  }, [searchValue]);

  // Filtered data for the right detail screen based on selected name
  const detailRecords = useMemo(() => {
    return MOCK_DATA.filter(item => item.name === selectedPartyName);
  }, [selectedPartyName]);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500 bg-slate-50/30">
      {/* Main Content Split Area */}
      <div className="flex flex-grow overflow-hidden p-6 gap-6">
        
        {/* Left Side: PAN Grid */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-900 rounded-lg text-emerald-400">
                <Search size={14} />
              </div>
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{title} PAN Registry</h3>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by Name/PAN..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex-grow bg-white border border-slate-200 shadow-sm overflow-hidden rounded-[2rem]">
            <table className="w-full text-[11px] border-collapse">
              <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-100">
                <tr className="text-left">
                  <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest">Party Name</th>
                  <th className="px-4 py-3 font-black text-slate-400 uppercase tracking-widest text-right">PAN</th>
                </tr>
              </thead>
              <tbody>
                {uniqueParties.map((party, idx) => (
                  <tr 
                    key={idx}
                    onClick={() => setSelectedPartyName(party.name)}
                    className={`cursor-pointer transition-all border-b border-slate-50 ${selectedPartyName === party.name ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-slate-50 text-slate-600'}`}
                  >
                    <td className="px-4 py-2.5 font-bold truncate max-w-[150px]">{party.name}</td>
                    <td className="px-4 py-2.5 font-mono text-right font-bold">{party.pan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cyan Instruction Box */}
          <div className="bg-cyan-50 border border-cyan-100 p-5 rounded-[2rem] shadow-sm">
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-600 mt-0.5" />
              <div className="space-y-3">
                <p className="text-[10px] font-black text-cyan-800 uppercase tracking-widest underline decoration-cyan-200 underline-offset-4">Compliance Rules</p>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-cyan-700 font-medium">1. Valid PANs may be edited only once.</p>
                  <p className="text-[11px] text-cyan-700 font-medium">2. Modification is restricted for 'F' flag entries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Detail Screen */}
        <div className="w-2/3 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-full">
            <div className="bg-slate-900 px-8 py-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">{title} PAN Detail Workspace</h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/20"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valid</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-sm shadow-rose-500/20"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Invalid</span>
                </div>
              </div>
            </div>

            <div className="px-8 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <UserCheck size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Selected Record</p>
                    <p className="text-sm font-black text-slate-800">{selectedPartyName}</p>
                  </div>
               </div>
               <button className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                 Run Verification
               </button>
            </div>

            <div className="flex-grow overflow-auto p-4">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-4 py-3">Sr.No</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Amount Paid</th>
                    <th className="px-4 py-3 text-center">Status / PAN</th>
                    <th className="px-4 py-3">Correction (New PAN)</th>
                  </tr>
                </thead>
                <tbody>
                  {detailRecords.map((record, idx) => (
                    <tr key={idx} className="border-b border-slate-50 group">
                      <td className="px-4 py-3 text-slate-400 font-bold">{record.srNo}</td>
                      <td className="px-4 py-3 text-slate-600 font-medium">{record.date}</td>
                      <td className="px-4 py-3 text-right font-black text-slate-800">₹ {record.amountPaid.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border font-mono ${record.isValid ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                          {record.pan}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          disabled={!isModifying}
                          placeholder="Enter Revised PAN..."
                          className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 text-xs font-mono font-bold outline-none transition-all ${!isModifying ? 'cursor-not-allowed opacity-40' : 'focus:border-emerald-500 focus:bg-white shadow-sm'}`} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Bar */}
            <div className="mt-auto bg-slate-50 border-t border-slate-200 p-6 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-[11px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm">
                <HelpCircle size={16} className="text-slate-400" /> Help
              </button>
              <button 
                onClick={() => setIsModifying(!isModifying)}
                className={`flex items-center gap-2 px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-xl ${isModifying ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'}`}
              >
                {isModifying ? <CheckCircle2 size={16} /> : <Edit3 size={16} />}
                {isModifying ? 'Commit Changes' : 'Modify Record'}
              </button>
              <button className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-full text-[11px] font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 transition-all shadow-sm">
                <LogOut size={16} /> Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
