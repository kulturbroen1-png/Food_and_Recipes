import React from 'react';
import { MealDay } from '../services/mealPlanData'; // Husk at rette stien hvis nødvendigt
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Printer } from 'lucide-react';

interface Props {
  data: MealDay[];
  title: string;
}

const MealTable: React.FC<Props> = ({ data, title }) => {
  
  const handlePrint = async () => {
    const element = document.getElementById('print-area');
    if (!element) return;
    
    // Vent lidt for at sikre rendering
    setTimeout(async () => {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4'); // Landskab
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${title}.pdf`);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <button 
        onClick={handlePrint}
        className="mb-6 flex items-center gap-2 bg-green-700 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-green-800 transition-colors"
      >
        <Printer size={20} /> Download PDF
      </button>

      {/* Selve A4 arket der printes */}
      <div id="print-area" className="bg-white p-8 min-w-[297mm] min-h-[210mm] shadow-2xl text-black mx-auto">
        {/* HEADER */}
        <div style={{backgroundColor: '#2e7d32'}} className="text-white p-4 rounded-t-lg text-center mb-2">
          <h1 className="text-3xl font-bold uppercase">{title}</h1>
          <h2 className="text-xl">Breelteparken • Energi- og Proteintæt Kost</h2>
        </div>
        
        <div style={{backgroundColor: '#fff9c4', borderColor: '#fbc02d'}} className="border-2 p-2 text-center font-bold mb-4 rounded text-sm text-black">
          📞 Køkkenet: 21 34 27 31 (Hverdage kl. 12 - 13) • Bestil senest 1 hverdag før
        </div>

        {/* TABEL */}
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-black">
              <th className="border border-gray-400 p-2 w-[110px]">Dato</th>
              <th className="border border-gray-400 p-2">Hovedret & Protein</th>
              <th className="border border-gray-400 p-2 w-[12%]">Sauce</th>
              <th className="border border-gray-400 p-2 w-[12%]">Kulhydrat</th>
              <th className="border border-gray-400 p-2 w-[14%]">Tilbehør</th>
              <th className="border border-gray-400 p-2 w-[20%]">Biret</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={row.isHoliday ? 'bg-yellow-50 font-semibold' : i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-2 whitespace-nowrap bg-gray-100 font-bold text-black">
                    {row.icon} {row.date}
                </td>
                <td className="border border-gray-300 p-2 text-black">
                  <div className="font-bold">{row.dish}</div>
                  <div className="text-xs text-green-800 font-bold">{row.protein}</div>
                </td>
                <td className="border border-gray-300 p-2 text-black">{row.sauce}</td>
                <td className="border border-gray-300 p-2 text-black">{row.carb}</td>
                <td className="border border-gray-300 p-2 text-black">{row.veg}</td>
                <td className="border border-gray-300 p-2 font-medium text-blue-900">{row.biret}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-8 text-center text-xs text-gray-500 border-t pt-2">
          Protein: 22-30g • Energi: 3200-3900 KJ • Fedt: 44-52 E% • Kosthåndbogen (2025)
        </div>
      </div>
    </div>
  );
};

export default MealTable;