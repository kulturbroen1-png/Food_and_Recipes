
import React, { useMemo } from 'react';
import { horkramDatabase, getHorkramPrice } from '../services/pricingService';
import { ShoppingBag, TrendingDown, Clock, CheckCircle2, AlertCircle, Calculator, Tag, Download } from 'lucide-react';

interface PurchaseItem {
  id: string;
  mdsNr: string;
  name: string;
  grossQty: number;
  netQty: number;
  unit: string;
  category: string;
  daysToDelivery: number;
  urgent?: boolean;
}

const PurchasingList: React.FC = () => {
  // Simuleret aktuelle behov baseret på menuplanen (450 kuverter)
  const items: PurchaseItem[] = [
    { id: '1', mdsNr: horkramDatabase.okse_hakket.id, name: horkramDatabase.okse_hakket.name, grossQty: 105, netQty: 78, unit: 'kg', category: '100 - Kød & Fjerkræ', daysToDelivery: 2, urgent: true },
    { id: '2', mdsNr: horkramDatabase.gris_kam.id, name: horkramDatabase.gris_kam.name, grossQty: 95, netQty: 72, unit: 'kg', category: '100 - Kød & Fjerkræ', daysToDelivery: 4 },
    { id: '3', mdsNr: horkramDatabase.fisk_orred.id, name: horkramDatabase.fisk_orred.name, grossQty: 88, netQty: 54, unit: 'kg', category: '200 - Fisk & Skaldyr', daysToDelivery: 3 },
    { id: '4', mdsNr: horkramDatabase.piskefloede_38.id, name: horkramDatabase.piskefloede_38.name, grossQty: 180, netQty: 180, unit: 'l', category: '400 - Mejeri & Ost', daysToDelivery: 1 },
    { id: '6', mdsNr: horkramDatabase.bønner_hvid_puré.id, name: horkramDatabase.bønner_hvid_puré.name, grossQty: 48, netQty: 48, unit: 'kg', category: '500 - Kolonial', daysToDelivery: 5 },
  ];

  // Fix: Corrected typo in formatDKK where a function was passed to format() instead of a number
  const formatDKK = (v: number) => new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(v);
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(val);

  const stats = useMemo(() => {
    let totalValue = 0;
    let totalGrossKg = 0;
    let totalNetKg = 0;

    items.forEach(item => {
      // Slå prisen op direkte i Hørkram-databasen via MDS-nummer
      const dbItem = Object.values(horkramDatabase).find(d => d.id === item.mdsNr);
      if (dbItem) {
        totalValue += item.grossQty * dbItem.pricePerUnit;
      }
      
      if (item.unit === 'kg') {
        totalGrossKg += item.grossQty;
        totalNetKg += item.netQty;
      }
    });

    const wastePercent = totalGrossKg > 0 ? Math.round(((totalGrossKg - totalNetKg) / totalGrossKg) * 100) : 0;

    return { totalValue, wastePercent };
  }, [items]);

  const handleExportCSV = () => {
    const headers = ["MDS Varenummer", "Raavare", "Maengde (Brutto)", "Enhed", "Kategori", "Linjevaerdi (DKK)"];
    
    const csvRows = items.map(item => {
      const dbItem = Object.values(horkramDatabase).find(d => d.id === item.mdsNr);
      const lineValue = (dbItem?.pricePerUnit || 0) * item.grossQty;
      
      return [
        `"${item.mdsNr}"`,
        `"${item.name}"`,
        item.grossQty,
        `"${item.unit}"`,
        `"${item.category}"`,
        lineValue.toFixed(2)
      ].join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `indkoebsliste_breelteparken_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = Array.from(new Set(items.map(i => i.category))).sort();

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* DASHBOARD HEADER */}
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl flex flex-col xl:flex-row justify-between items-center gap-8 border-b-8 border-green-600">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
             <div className="bg-green-600 p-2 rounded-lg"><ShoppingBag size={20}/></div>
             <span className="text-xs font-black uppercase tracking-[0.4em] text-green-400">Logistik & Indkøb</span>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter italic">Hørkram Live-Ordre</h2>
          <p className="text-slate-400 font-serif italic text-xl">Ordre baseret på 450 kuverter jf. MDS standard.</p>
        </div>

        <div className="flex flex-col gap-4 items-end">
           <div className="grid grid-cols-2 gap-4 min-w-[400px]">
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-right">
                 <span className="block text-[8px] font-black uppercase text-slate-500 mb-1">Total Ordreværdi (Øko)</span>
                 <div className="text-3xl font-black text-green-500">{formatCurrency(stats.totalValue)}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-right">
                 <span className="block text-[8px] font-black uppercase text-slate-500 mb-1">Beregnet Svind (Total)</span>
                 <div className="text-3xl font-black text-orange-500">{stats.wastePercent}%</div>
              </div>
           </div>
           <button 
             onClick={handleExportCSV}
             className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-black uppercase text-xs flex items-center gap-3 hover:bg-slate-100 transition-all shadow-lg"
           >
             <Download size={18} /> Eksporter CSV (m/ MDS-nr)
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* STATUS CARDS */}
         <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center gap-6">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl"><Clock size={32}/></div>
            <div>
               <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Næste Deadline</span>
               <span className="text-2xl font-black uppercase italic">I dag kl. 14:00</span>
            </div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center gap-6">
            <div className="bg-green-100 text-green-600 p-4 rounded-2xl"><CheckCircle2 size={32}/></div>
            <div>
               <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Leverings-status</span>
               <span className="text-2xl font-black uppercase italic text-green-700">Bekræftet</span>
            </div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center gap-6">
            <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl"><Tag size={32}/></div>
            <div>
               <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Øko-andel (Batch)</span>
               <span className="text-2xl font-black uppercase italic text-orange-600">97,5% Guld</span>
            </div>
         </div>
      </div>

      {/* CATEGORY TABLES */}
      <div className="space-y-12 pb-20">
        {categories.map(cat => (
          <div key={cat} className="animate-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-xl font-black uppercase text-slate-900 mb-6 flex items-center gap-3">
               <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-black">#</span>
               {cat}
            </h4>
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-slate-100">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b-4 border-slate-100">
                    <tr>
                        <th className="p-6">MDS Varenummer</th>
                        <th className="p-6">Råvare (100% Økologisk)</th>
                        <th className="p-6 text-right">Mængde (Brutto)</th>
                        <th className="p-6 text-right">Enhedspris (Hørkram)</th>
                        <th className="p-6 text-right">Linjeværdi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {items.filter(i => i.category === cat).map((item) => {
                      const dbItem = Object.values(horkramDatabase).find(d => d.id === item.mdsNr);
                      const lineValue = (dbItem?.pricePerUnit || 0) * item.grossQty;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="p-6">
                             <div className="flex flex-col">
                                <span className="font-mono text-sm font-black text-slate-900">{item.mdsNr}</span>
                                <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest mt-1">Hørkram Master Link</span>
                             </div>
                          </td>
                          <td className="p-6 font-black text-slate-800 uppercase tracking-tight flex items-center flex-wrap gap-2">
                             <span>{item.name}</span>
                             <span className="text-[7px] font-black bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-widest whitespace-nowrap">{item.category}</span>
                             {item.urgent && <span className="bg-red-600 text-white text-[8px] px-2 py-0.5 rounded-full animate-pulse whitespace-nowrap">KRITISK</span>}
                          </td>
                          <td className="p-6 text-right">
                             <span className="text-xl font-black text-slate-900 leading-none block">{item.grossQty} {item.unit}</span>
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Netto: {item.netQty} {item.unit}</span>
                          </td>
                          <td className="p-6 text-right font-mono font-bold text-slate-500">
                             {formatCurrency(dbItem?.pricePerUnit || 0)}
                          </td>
                          <td className="p-6 text-right">
                             <span className="text-xl font-black text-green-700 leading-none">{formatCurrency(lineValue)}</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* STRATEGIC CALCULATION TOOLTIP */}
      <div className="bg-blue-900 text-white p-10 rounded-[3rem] flex flex-col lg:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10"><Calculator size={100} /></div>
         <div className="bg-blue-600 p-6 rounded-3xl shadow-lg shadow-blue-950">
            <TrendingDown size={40} />
         </div>
         <div className="relative z-10">
            <h4 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">Dynamisk Svind-Optimering</h4>
            <p className="text-blue-100 font-serif italic text-lg leading-relaxed max-w-4xl">
               Systemet overvåger løbende differencen mellem <strong>GrossQuantity</strong> (indkøb) og <strong>NetQuantity</strong> (produktion). 
               Ved at bruge Cook-Chill optimerede udskæringer af Naturkvæg, sigter vi mod at holde det gennemsnitlige svind under 22% på tværs af hele produktionsapparatet.
            </p>
         </div>
      </div>
    </div>
  );
};

export default PurchasingList;
