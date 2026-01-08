
import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  UserCircle2, 
  AlertTriangle, 
  Edit3, 
  Save, 
  X, 
  ChevronRight,
  ShieldCheck,
  Globe,
  Settings2
} from 'lucide-react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
  "Ladakh", "Lakshadweep", "Puducherry"
];

const ORG_STATUSES = [
  "Central Government", "State Government", "Statutory Body - Central Gov", 
  "Statutory Body - State Gov", "Autonomous Body - Central Gov", 
  "Autonomous Body - State Gov", "Local Authority - State Gov", 
  "Local Authority - Central Gov", "Company", "Branch/Division of Company", 
  "Association of Person (AOP)", "Artificial of Judicial Person", 
  "Body of Individuals", "Individual HUV", "Firm"
];

const MINISTRIES = ["Home Affairs", "Finance", "Defence", "Education", "Health & Family Welfare", "Railways", "External Affairs", "Agriculture"];

export const DeductorDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showGovModal, setShowGovModal] = useState(false);
  const [showAltModal, setShowAltModal] = useState(false);
  
  // Data State
  const [data, setData] = useState({
    name: "JAYEMS ENGINEERING CO.PVT.LTD.",
    address1: "130-132",
    address2: "GREAT WESTERN BUILDING",
    address3: "S B S ROAD",
    address4: "FORT, MUMBAI",
    state: "MAHARASHTRA",
    pin: "400023",
    phone: "22",
    phoneNo: "22845118",
    email: "jagdish@ensembleindia.com",
    branch: "Jayems Engg Co Pvt Ltd",
    pan: "AAACJ0059P",
    gstin: "",
    status: "Central Government",
    
    // Responsible Person
    respName: "JAGDISH SHETTY",
    respAddr1: "130-132",
    respAddr2: "GREAT WESTERN BUILDING",
    respAddr3: "FORT, MUMBAI",
    respState: "MAHARASHTRA",
    respPin: "400023",
    respPhone: "22",
    respPhoneNo: "40564825",
    respEmail: "jagdish@ensembleindia.co",
    respMobile: "9820290161",
    respDesignation: "FINANCE MANAGER",
    respPan: "ABAPS5200K"
  });

  const isGovStatus = data.status.toLowerCase().includes('government') || 
                    data.status.toLowerCase().includes('statutory') || 
                    data.status.toLowerCase().includes('autonomous');

  const handleSave = () => {
    setIsEditing(false);
    // Logic to persist changes would go here
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 relative">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-10 pb-24">
        
        {/* Section: Details of Company */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Details of Company</h3>
            </div>
            {isEditing && (
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
                Editing Mode
              </span>
            )}
          </div>

          <div className="space-y-4">
            <ModernInput label="Name of Company" disabled={!isEditing} value={data.name} onChange={(v) => setData({...data, name: v})} />
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Address Details</label>
              <div className="grid gap-2">
                <input disabled={!isEditing} value={data.address1} onChange={(e) => setData({...data, address1: e.target.value})} className={`w-full bg-slate-50 border ${isEditing ? 'border-emerald-200' : 'border-slate-100'} rounded-xl px-4 py-2 text-sm font-semibold focus:border-emerald-500 outline-none transition-all disabled:opacity-70`} />
                <input disabled={!isEditing} value={data.address2} onChange={(e) => setData({...data, address2: e.target.value})} className={`w-full bg-slate-50 border ${isEditing ? 'border-emerald-200' : 'border-slate-100'} rounded-xl px-4 py-2 text-sm font-semibold focus:border-emerald-500 outline-none transition-all disabled:opacity-70`} />
                <input disabled={!isEditing} value={data.address3} onChange={(e) => setData({...data, address3: e.target.value})} className={`w-full bg-slate-50 border ${isEditing ? 'border-emerald-200' : 'border-slate-100'} rounded-xl px-4 py-2 text-sm font-semibold focus:border-emerald-500 outline-none transition-all disabled:opacity-70`} />
                <input disabled={!isEditing} value={data.address4} onChange={(e) => setData({...data, address4: e.target.value})} className={`w-full bg-slate-50 border ${isEditing ? 'border-emerald-200' : 'border-slate-100'} rounded-xl px-4 py-2 text-sm font-semibold focus:border-emerald-500 outline-none transition-all disabled:opacity-70`} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ModernSelect label="State" options={INDIAN_STATES} disabled={!isEditing} value={data.state} onChange={(v) => setData({...data, state: v})} />
              <ModernInput label="PIN Code" disabled={!isEditing} value={data.pin} onChange={(v) => setData({...data, pin: v})} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <ModernInput label="STD Code" disabled={!isEditing} value={data.phone} onChange={(v) => setData({...data, phone: v})} />
              <div className="col-span-2">
                <ModernInput label="Phone Number" disabled={!isEditing} value={data.phoneNo} onChange={(v) => setData({...data, phoneNo: v})} />
              </div>
            </div>

            <ModernInput label="Email" disabled={!isEditing} value={data.email} onChange={(v) => setData({...data, email: v})} />

            <div className="grid grid-cols-2 gap-4">
              <ModernInput label="Branch" disabled={!isEditing} value={data.branch} onChange={(v) => setData({...data, branch: v})} />
              <ModernInput label="PAN" disabled={!isEditing} value={data.pan} onChange={(v) => setData({...data, pan: v})} />
            </div>

            <ModernInput label="GSTIN" disabled={!isEditing} value={data.gstin} onChange={(v) => setData({...data, gstin: v})} />
            
            <div className="pt-2">
              <ModernSelect label="Deductor Status" options={ORG_STATUSES} disabled={!isEditing} value={data.status} onChange={(v) => setData({...data, status: v})} />
              <div className="mt-3 flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-[10px] font-bold text-amber-800 leading-tight uppercase tracking-tight">
                  Important: Please ensure that you have selected the correct status.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Responsible Person */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <UserCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Responsible Person</h3>
          </div>

          <div className="space-y-4">
            <ModernInput label="Person Name" disabled={!isEditing} value={data.respName} onChange={(v) => setData({...data, respName: v})} />
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Address Details</label>
              <div className="grid gap-2">
                <input disabled={!isEditing} value={data.respAddr1} onChange={(e) => setData({...data, respAddr1: e.target.value})} className={`w-full bg-slate-50 border ${isEditing ? 'border-emerald-200' : 'border-slate-100'} rounded-xl px-4 py-2 text-sm font-semibold focus:border-emerald-500 outline-none transition-all disabled:opacity-70`} />
                <input disabled={!isEditing} value={data.respAddr2} onChange={(e) => setData({...data, respAddr2: e.target.value})} className={`w-full bg-slate-50 border ${isEditing ? 'border-emerald-200' : 'border-slate-100'} rounded-xl px-4 py-2 text-sm font-semibold focus:border-emerald-500 outline-none transition-all disabled:opacity-70`} />
                <input disabled={!isEditing} value={data.respAddr3} onChange={(e) => setData({...data, respAddr3: e.target.value})} className={`w-full bg-slate-50 border ${isEditing ? 'border-emerald-200' : 'border-slate-100'} rounded-xl px-4 py-2 text-sm font-semibold focus:border-emerald-500 outline-none transition-all disabled:opacity-70`} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ModernSelect label="State" options={INDIAN_STATES} disabled={!isEditing} value={data.respState} onChange={(v) => setData({...data, respState: v})} />
              <ModernInput label="PIN Code" disabled={!isEditing} value={data.respPin} onChange={(v) => setData({...data, respPin: v})} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <ModernInput label="STD Code" disabled={!isEditing} value={data.respPhone} onChange={(v) => setData({...data, respPhone: v})} />
              <div className="col-span-2">
                <ModernInput label="Phone Number" disabled={!isEditing} value={data.respPhoneNo} onChange={(v) => setData({...data, respPhoneNo: v})} />
              </div>
            </div>

            <ModernInput label="Email ID" disabled={!isEditing} value={data.respEmail} onChange={(v) => setData({...data, respEmail: v})} />
            
            <div className="grid grid-cols-2 gap-4">
              <ModernInput label="Mobile Number" disabled={!isEditing} value={data.respMobile} onChange={(v) => setData({...data, respMobile: v})} />
              <ModernInput label="Designation" disabled={!isEditing} value={data.respDesignation} onChange={(v) => setData({...data, respDesignation: v})} />
            </div>

            {/* Sub-buttons for specific details */}
            <div className="flex flex-col gap-3 pt-6">
              <button 
                disabled={!isGovStatus}
                onClick={() => setShowGovModal(true)}
                className={`
                  flex items-center justify-between px-6 py-4 rounded-2xl text-xs font-bold transition-all shadow-sm border
                  ${isGovStatus 
                    ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700 hover:shadow-emerald-100' 
                    : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'}
                `}
              >
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  Additional Government Details
                </div>
                <ChevronRight size={14} />
              </button>
              
              <button 
                onClick={() => setShowAltModal(true)}
                className="flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <Settings2 size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  Alternate Information
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Save / Modify Bar */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-2xl px-8 z-20">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-slate-700 flex justify-between items-center">
          <div className="pl-4">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Profile Actions</p>
            <p className="text-white text-xs font-medium">Manage Deductor Information</p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-2xl text-sm font-black shadow-lg hover:bg-emerald-50 hover:text-emerald-700 transition-all"
              >
                <Edit3 size={16} />
                Modify Records
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 text-slate-400 text-sm font-bold hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-10 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Additional Government Details Modal */}
      {showGovModal && (
        <OverlayModal title="Additional Government Details" onClose={() => setShowGovModal(false)}>
          <div className="grid md:grid-cols-2 gap-6 p-2">
            <ModernSelect label="State Name" options={INDIAN_STATES} />
            <ModernInput label="DDO Code" placeholder="Max - 20 Char" />
            <ModernInput label="PAO Code" placeholder="Max - 20 Char" />
            <ModernInput label="DDO Registration Number" placeholder="Max - 10 Char" />
            <ModernInput label="PAO Registration Number" placeholder="Max - 7 digits" />
            <ModernSelect label="Ministry Name" options={MINISTRIES} />
            <div className="md:col-span-2">
              <ModernInput label="Account Office Identification Number (AIN)" placeholder="Enter AIN of PAO/ TO/ CDDO" />
            </div>
          </div>
        </OverlayModal>
      )}

      {/* Alternate Information Modal */}
      {showAltModal && (
        <OverlayModal title="Alternate Contact Information" onClose={() => setShowAltModal(false)}>
          <div className="grid md:grid-cols-2 gap-8 p-2">
             <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Deductor Alternate</h4>
               <ModernInput label="STD Code (Alternate)" defaultValue="22" />
               <ModernInput label="Tel-Phone No. (Alternate)" defaultValue="40564820" />
               <ModernInput label="Email ID (Alternate)" defaultValue="accts@ensembleindia.com" />
             </div>
             <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Responsible Person Alternate</h4>
               <ModernInput label="STD Code (Alternate)" defaultValue="22" />
               <ModernInput label="Tel-Phone No. (Alternate)" defaultValue="40564825" />
               <ModernInput label="Email ID (Alternate)" defaultValue="jagdish@ensembleindia.com" />
               <ModernInput label="Responsible Person PAN" defaultValue="ABAPS5200K" />
             </div>
          </div>
        </OverlayModal>
      )}
    </div>
  );
};

const OverlayModal: React.FC<{ title: string, onClose: () => void, children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-xl">
             <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-serif text-slate-900">{title}</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <X size={20} className="text-slate-400" />
        </button>
      </div>
      <div className="p-10">
        {children}
        <div className="mt-10 flex justify-end">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ModernInput: React.FC<{ label: string, placeholder?: string, defaultValue?: string, value?: string, disabled?: boolean, onChange?: (v: string) => void }> = ({ label, placeholder, defaultValue, value, disabled, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`
        w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-300 outline-none transition-all
        ${disabled ? 'border-slate-100 cursor-not-allowed opacity-70' : 'border-emerald-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm'}
      `}
    />
  </div>
);

const ModernSelect: React.FC<{ label: string, options: string[], defaultValue?: string, value?: string, disabled?: boolean, onChange?: (v: string) => void }> = ({ label, options, defaultValue, value, disabled, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <select 
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`
        w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all appearance-none cursor-pointer
        ${disabled ? 'border-slate-100 cursor-not-allowed opacity-70' : 'border-emerald-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm'}
      `}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);
