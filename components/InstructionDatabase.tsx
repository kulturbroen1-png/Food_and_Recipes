
import React from 'react';
import { MASTER_CHECKLIST } from '../services/instructionManifest';
import { ShieldCheck, Lock, AlertTriangle, Calendar, Layout, Utensils, Zap, FileText } from 'lucide-react';

const InstructionDatabase: React.FC = () => {
  const copyManifest = () => {
    navigator.clipboard.writeText(JSON.stringify(MASTER_CHECKLIST, null, 2));
    alert("System-Kontrakt kopieret til udklipsholder!");
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-40 animate-in fade-in duration-700">
      {/* SECURITY OVERLAY HEADER */}
      <div className="bg-slate-950 text-white p-16 rounded-b-[5rem] shadow-2xl relative overflow-hidden border-b-8 border-red-600">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <ShieldCheck size={300} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-900/50"><Lock size={24} /></div>
            <span className="text-sm font-black uppercase tracking-[0.5em] text-red-500 animate-pulse">System Contract Locked</span>
          </div>
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 leading-none">Master Security Database</h1>
          <p className="text-slate-400 text-2xl font-serif italic max-w-3xl">
            "Denne database fungerer som loven for systemet. Ingen generering kan ske uden at overholde disse 6 fundamentale punkter."
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto -mt-16 px-6 space-y-12">
        
        {/* ACTION BUTTON */}
        <button 
          onClick={copyManifest}
          className="w-full py-8 bg-white border-4 border-slate-950 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-6 group"
        >
          <Zap className="text-orange-500 group-hover:scale-150 transition-transform" />
          Synkroniser Kontrakt med AI Hukommelse
        </button>

        {/* 6 PUNKTS LOVEN - GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. LOVGRUNDLAG */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-200 hover:scale-105 transition-transform">
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
              <FileText />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">1. Lovgrundlag</h3>
            <div className="space-y-3 text-xs">
              <p className="font-bold text-slate-500 uppercase leading-relaxed">Grundlag: {MASTER_CHECKLIST.LOVGRUNDLAG.KOST}</p>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <span className="block font-black text-blue-700 uppercase mb-1">Ernæringsmål:</span>
                <p className="font-bold">{MASTER_CHECKLIST.LOVGRUNDLAG.ERNÆRINGSMÅL}</p>
              </div>
            </div>
          </div>

          {/* 2. FORBUDT */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-red-500 hover:scale-105 transition-transform">
            <div className="bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-red-200">
              <AlertTriangle />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-red-600">2. Strengt Forbudt</h3>
            <ul className="space-y-2">
              {MASTER_CHECKLIST.PRODUKTIONS_KRAV.STRENGT_FORBUDT.map((item, i) => (
                <li key={i} className="text-[11px] font-black text-slate-700 flex items-start gap-2 uppercase">
                  <span className="text-red-600">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. MÆNGDER */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-200 hover:scale-105 transition-transform">
            <div className="bg-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6">
               <Utensils />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">3. Strikse Mængder</h3>
            <div className="space-y-2">
              {Object.entries(MASTER_CHECKLIST.SIKKERHEDS_MÆNGDER).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key}</span>
                  <span className="text-sm font-black text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. UGERYTME */}
          <div className="bg-slate-950 text-white p-8 rounded-[3rem] shadow-xl hover:scale-105 transition-transform col-span-1 lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <Calendar className="text-orange-500" />
              <h3 className="text-2xl font-black uppercase tracking-tighter">4. Uge- & Dagsrytme</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {Object.entries(MASTER_CHECKLIST.UGERYTME_KONTRAKT.FORDELING).map(([dag, type]) => (
                 <div key={dag} className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <span className="block text-[10px] font-black text-slate-500 uppercase mb-1">{dag}</span>
                    <span className="text-xs font-black text-orange-400">{type}</span>
                 </div>
               ))}
            </div>
            <div className="mt-6 p-4 bg-slate-900 rounded-2xl border-2 border-orange-500/20 text-xs font-bold italic text-slate-400">
               "{MASTER_CHECKLIST.UGERYTME_KONTRAKT.TEKSTUR_REGEL}"
            </div>
          </div>

          {/* 6. MÆRKEDAGE */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-200 hover:scale-105 transition-transform">
            <div className="bg-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6">
              <Calendar />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">6. Mærkedage 2026</h3>
            <div className="space-y-3">
               {Object.entries(MASTER_CHECKLIST.MÆRKEDAGE_2026).map(([key, val]) => (
                 <div key={key} className="text-[10px]">
                    <span className="font-black text-slate-400 uppercase block">{key}</span>
                    <span className="font-bold text-slate-800">{val}</span>
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* 5. DESIGN LAYOUT FULL WIDTH */}
        <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-slate-200">
           <div className="flex items-center gap-4 mb-8">
              <Layout className="text-blue-600" />
              <h3 className="text-3xl font-black uppercase tracking-tighter">5. Design & Layout Regler</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                 <h4 className="font-black text-xs uppercase text-slate-400 tracking-widest border-b pb-2">Ark 1 & 2</h4>
                 <p className="text-sm font-bold text-slate-700">Dato/Dag på én linje. Emojis obligatoriske. Gram i parentes. Tlf 21 34 27 31 SKAL stå øverst.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="font-black text-xs uppercase text-slate-400 tracking-widest border-b pb-2">Ark 3 (À la Carte)</h4>
                 <p className="text-sm font-bold text-slate-700">Nr. 22: Dagens frugtgrød m. fløde. Nr. 25: Chokolademousse m. flødeskum. Ingen gule highlights.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="font-black text-xs uppercase text-slate-400 tracking-widest border-b pb-2">Ark 4 (Info)</h4>
                 <p className="text-sm font-bold text-slate-700">Bestillingsfrist d. 20. Kun ændringer returneres. Cook-Chill opvarmnings-info obligatorisk.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default InstructionDatabase;
