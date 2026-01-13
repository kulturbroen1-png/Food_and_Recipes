import React, { useRef } from 'react';
import { yearlyPlan2026 } from '../services/mealPlanData';
import { MASTER_CHECKLIST } from '../services/instructionManifest';
import { Printer } from 'lucide-react';
import './MenuPrintStyles.css';

const YearlyMenuCard: React.FC = () => {
  const contact = MASTER_CHECKLIST.DESIGN_LAYOUT.KONTAKT;
  const year = "2026";

  const handlePrint = () => window.print();

  const getDayClass = (day: any) => {
    if (day.date.includes('(Søn)')) return 'row-sun';
    if (day.dish.toLowerCase().includes('fest') || day.dish.toLowerCase().includes('jul')) return 'row-fest';
    return '';
  };

  const getWeekNumber = (dateString: string) => {
    const day = parseInt(dateString.split('.')[0]);
    const monthMap: Record<string, number> = {
      'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'maj': 4, 'jun': 5,
      'jul': 6, 'aug': 7, 'sep': 8, 'okt': 9, 'nov': 10, 'dec': 11
    };
    const monthStr = dateString.split(' ')[1];
    const month = monthMap[monthStr] !== undefined ? monthMap[monthStr] : 0;

    const date = new Date(parseInt(year), month, day);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  const renderMonth = (monthKey: string, monthData: any) => {
    const weeks = [];
    let currentWeek: any[] = [];

    monthData.data.forEach((day: any, i: number) => {
      currentWeek.push(day);
      if (day.date.includes('(Søn)') || i === monthData.data.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    const page1Weeks = weeks.slice(0, 3);
    const page2Weeks = weeks.slice(3);

    return (
      <React.Fragment key={monthKey}>
        {/* MONTH HEADER */}
        <div className="a4-page-landscape month-header-page">
          <div className="header-box" style={{ background: 'linear-gradient(to right, #1b5e20, #2e7d32)' }}>
            <h1>{monthData.label.toUpperCase()} {year} - HELÅRS MENUPLAN</h1>
            <h2>Breelteparken • Energi- og proteinrig kost til småtspisende</h2>
          </div>

          <div className="info-bar" style={{ background: '#e8f5e9', border: '2px solid #2e7d32' }}>
            <span className="contact-highlight" style={{ color: '#2e7d32' }}>📞 Køkkenet: {contact}</span> | Telefontid: Hverdage 12:00 - 13:00<br />
            <strong>Bestil senest 1 hverdag før levering • 2 dage før weekend/helligdag</strong>
          </div>

          <div className="yearly-summary" style={{ padding: '20px', background: '#f8fff8', border: '2px solid #2e7d32', margin: '20px', borderRadius: '10px' }}>
            <h3 style={{ color: '#2e7d32', marginBottom: '15px', fontSize: '18px' }}>📅 {monthData.label} {year} - Oversigt</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div><strong>Antal dage:</strong> {monthData.data.length}</div>
              <div><strong>Hovedretter:</strong> {monthData.data.filter((d: any) => d.type !== 'Grøn').length}</div>
              <div><strong>Vegetariske:</strong> {monthData.data.filter((d: any) => d.type === 'Grøn').length}</div>
              <div><strong>Helligdage:</strong> {monthData.data.filter((d: any) => d.isHoliday).length}</div>
            </div>
          </div>
        </div>

        {/* PAGE 1: MENU PART 1 */}
        <div className="a4-page-landscape">
          <div className="header-box">
            <h1>{monthData.label.toUpperCase()}MENUPLAN {year}</h1>
            <h2>Breelteparken • Energi- og proteinrig kost til småtspisende</h2>
          </div>

          <div className="info-bar">
            <span className="contact-highlight">📞 Køkkenet: {contact}</span> | Telefontid: Hverdage 12:00 - 13:00<br />
            <strong>Bestil senest 1 hverdag før levering • 2 dage før weekend/helligdag</strong>
          </div>

          <table className="menu-table">
            <thead>
              <tr>
                <th className="col-dato">Dato / Dag</th>
                <th className="col-icon">Art</th>
                <th className="col-nr">Nr.</th>
                <th className="col-ret">Hovedret (90-110g)</th>
                <th className="col-sauce">Sauce (1dl)</th>
                <th className="col-kul">Kulhydrat (100g)</th>
                <th className="col-til">Tilbehør (30-50g)</th>
                <th className="col-nr">Nr.</th>
                <th className="col-des">Biret (150g/90g/80g)</th>
              </tr>
            </thead>
            <tbody>
              {page1Weeks.map((week: any[], idx: number) => {
                const firstDate = week[0].date.split(' (')[0];
                const lastDate = week[week.length - 1].date.split(' (')[0];
                const weekNum = getWeekNumber(week[0].date);

                return (
                  <React.Fragment key={idx}>
                    <tr className="week-header"><th colSpan={9}>UGE {weekNum}: {firstDate} - {lastDate}</th></tr>
                    {week.map((day: any, dIdx: number) => (
                      <tr key={dIdx} className={getDayClass(day)}>
                        <td className="col-dato">{day.date}</td>
                        <td className="col-icon">{day.icon}</td>
                        <td className="col-nr"></td>
                        <td className="col-ret" dangerouslySetInnerHTML={{ __html: day.dish }}></td>
                        <td className="col-sauce">{day.sauce}</td>
                        <td className="col-kul">{day.carb}</td>
                        <td className="col-til">{day.veg}</td>
                        <td className="col-nr"></td>
                        <td className="col-des" dangerouslySetInnerHTML={{ __html: day.biret }}></td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>

          <div className="footer-nutri">
            Protein: 22-30g | Energi: 3200-3900 KJ | Fedt: 44-52 E% | Baseret på Anbefalinger for den danske institutionskost 2025
          </div>
        </div>

        {/* PAGE 2: MENU PART 2 */}
        {page2Weeks.length > 0 && (
          <div className="a4-page-landscape">
            <div className="header-box">
              <h1>{monthData.label.toUpperCase()} {year} - SIDE 2</h1>
              <h2>Breelteparken • Fortsat</h2>
            </div>

            <table className="menu-table">
              <thead>
                <tr>
                  <th className="col-dato">Dato / Dag</th>
                  <th className="col-icon">Art</th>
                  <th className="col-nr">Nr.</th>
                  <th className="col-ret">Hovedret (90-110g)</th>
                  <th className="col-sauce">Sauce (100g)</th>
                  <th className="col-kul">Kulhydrat (100g)</th>
                  <th className="col-til">Tilbehør (30-50g)</th>
                  <th className="col-nr">Nr.</th>
                  <th className="col-des">Biret (150g/90g/80g)</th>
                </tr>
              </thead>
              <tbody>
                {page2Weeks.map((week: any[], idx: number) => {
                  const firstDate = week[0].date.split(' (')[0];
                  const lastDate = week[week.length - 1].date.split(' (')[0];
                  const weekNum = getWeekNumber(week[0].date);

                  return (
                    <React.Fragment key={idx}>
                      <tr className="week-header"><th colSpan={9}>UGE {weekNum}: {firstDate} - {lastDate}</th></tr>
                      {week.map((day: any, dIdx: number) => (
                        <tr key={dIdx} className={getDayClass(day)}>
                          <td className="col-dato">{day.date}</td>
                          <td className="col-icon">{day.icon}</td>
                          <td className="col-nr"></td>
                          <td className="col-ret" dangerouslySetInnerHTML={{ __html: day.dish }}></td>
                          <td className="col-sauce">{day.sauce}</td>
                          <td className="col-kul">{day.carb}</td>
                          <td className="col-til">{day.veg}</td>
                          <td className="col-nr"></td>
                          <td className="col-des" dangerouslySetInnerHTML={{ __html: day.biret }}></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            <div className="personal-info-box">
              <h3>Personlige Oplysninger</h3>
              <div className="info-row">
                <div className="info-field"><label>Navn:</label><div className="input-line"></div></div>
                <div className="info-field"><label>Adresse:</label><div className="input-line"></div></div>
              </div>
              <div className="urgent-note">⚠️ À la Carte afleveres senest d. 20. {monthData.label.toLowerCase()} kl. 16:00</div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-col items-center gap-10 bg-slate-200 p-10 print-bg-reset">

      {/* CONTROL PANEL */}
      <div className="no-print bg-white p-6 rounded-xl shadow-xl flex items-center justify-between w-full max-w-4xl fixed top-6 z-50 border border-slate-300">
        <h2 className="text-xl font-bold text-slate-700">Print Preview: Helårs Menuplan {year} (Udkast 111)</h2>
        <button onClick={handlePrint} className="bg-[#1b5e20] text-white px-6 py-2 rounded font-bold shadow hover:bg-[#2e7d32] flex items-center gap-2">
          <Printer size={18} /> Print Helårs PDF
        </button>
      </div>
      <div className="h-20 no-print"></div>

      {/* RENDER ALL MONTHS */}
      {Object.entries(yearlyPlan2026).map(([monthKey, monthData]) => renderMonth(monthKey, monthData))}

      {/* FINAL SUMMARY PAGE */}
      <div className="a4-page-landscape">
        <div className="contact-hero" style={{ background: 'linear-gradient(to right, #1b5e20, #2e7d32)' }}>
          <div className="contact-title">📅 HELÅRS MENUPLAN {year} - AFSLUTNING</div>
          <div className="contact-subtitle">Breelteparkens Køkken • Komplet årsoversigt</div>
        </div>

        <div className="info-container">
          <div className="info-col">
            <div className="info-card card-green">
              <span className="card-header" style={{ color: '#2e7d32' }}>📊 ÅRSSTATISTIK</span>
              <ul>
                <li><strong>12 måneder:</strong> Komplet menuplan</li>
                <li><strong>365 dage:</strong> Hverdage, weekender og helligdage</li>
                <li><strong>4 sæsoner:</strong> Vinter, forår, sommer, efterår</li>
                <li><strong>100% dækning:</strong> Alle måltider planlagt</li>
              </ul>
            </div>
            <div className="info-card card-blue">
              <span className="card-header" style={{ color: '#1565c0' }}>🍽️ KOSTPRINCIPPER</span>
              <ul>
                <li><strong>Energi-rig:</strong> 3200-3900 KJ pr. måltid</li>
                <li><strong>Protein-tæt:</strong> 22-30g pr. portion</li>
                <li><strong>Sæsonbestemt:</strong> Lokale råvarer</li>
                <li><strong>Allergivenlig:</strong> Mærket og dokumenteret</li>
              </ul>
            </div>
          </div>

          <div className="info-col">
            <div className="info-card card-purple">
              <span className="card-header" style={{ color: '#7b1fa2' }}>📋 BRUGSANVISNING</span>
              <ul>
                <li><strong>Opbevaring:</strong> Køligt og tørt</li>
                <li><strong>Gyldighed:</strong> Januar-december {year}</li>
                <li><strong>Ændringer:</strong> Kontakt køkkenet ved behov</li>
                <li><strong>Support:</strong> {contact} - alle hverdage</li>
              </ul>
            </div>
            <div className="info-card card-grey">
              <span className="card-header">🎄 SÆSONHILSNER</span>
              <p><strong>Vi ønsker dig et godt {year}!</strong></p>
              <p>Fra hele Breelteparkens køkkenteam</p>
              <p>Med fokus på kvalitet, ernæring og glæde ved måltiderne.</p>
            </div>
          </div>
        </div>

        <div className="footer-greeting">
          <h2>🌟 Tak for samarbejdet i {year}!</h2>
          <div>Breelteparkens Køkken - Din ernæringsprofessionelle partner</div>
        </div>
      </div>

    </div>
  );
};

export default YearlyMenuCard;