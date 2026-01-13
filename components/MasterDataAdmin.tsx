
import React from 'react';

const MasterDataAdmin: React.FC = () => {
  const groups = [
    { id: 100, name: 'Kød & Fjerkræ', items: 245, color: 'bg-red-100 text-red-800' },
    { id: 200, name: 'Fisk & Skaldyr', items: 82, color: 'bg-blue-100 text-blue-800' },
    { id: 300, name: 'Frugt & Grønt', items: 156, color: 'bg-green-100 text-green-800' },
    { id: 400, name: 'Mejeri & Ost', items: 94, color: 'bg-orange-100 text-orange-800' },
    { id: 500, name: 'Kolonial', items: 512, color: 'bg-slate-100 text-slate-800' },
    { id: 800, name: 'Delopskrifter', items: 45, color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden">
      <div className="bg-slate-800 p-6 text-white">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Stamdata & MCS Opsætning</h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Håndtering af råvaregrupper og database-kobling</p>
      </div>
      
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <div key={group.id} className="border-2 border-slate-100 rounded-2xl p-6 hover:border-blue-500 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl font-black text-slate-300 group-hover:text-blue-500 transition-colors">#{group.id}</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${group.color}`}>{group.items} Varer</span>
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">{group.name}</h3>
            <p className="text-xs text-slate-500 mb-6">Placeret i rigtig MCS gruppe jf. hovedlageret.</p>
            <button className="w-full py-2 bg-slate-50 text-slate-800 border border-slate-200 rounded-lg text-xs font-bold uppercase hover:bg-slate-100 transition-colors">Åben Gruppe</button>
          </div>
        ))}
        
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer">
           <span className="text-4xl mb-2">+</span>
           <span className="text-xs font-black uppercase tracking-widest">Opret ny gruppe</span>
        </div>
      </div>

      <div className="p-8 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-4">
            <h4 className="font-black uppercase text-sm border-b border-slate-300 pb-2">Systemadgang</h4>
            <div className="flex gap-4">
               <button className="flex-1 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold uppercase shadow-sm">Opret Ny Bruger</button>
               <button className="flex-1 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold uppercase shadow-sm">Skift Adgangskode</button>
            </div>
         </div>
         <div className="space-y-4">
            <h4 className="font-black uppercase text-sm border-b border-slate-300 pb-2">Vejledning & Oplæring</h4>
            <div className="bg-blue-600 text-white p-4 rounded-xl flex items-center justify-between group cursor-pointer">
               <span className="text-xs font-bold uppercase">MCS Intro Kursus (Online)</span>
               <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MasterDataAdmin;
