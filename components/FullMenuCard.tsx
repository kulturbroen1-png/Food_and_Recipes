
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { MealDay, aLaCarteMenu } from '../services/mealPlanData';
import { MASTER_CHECKLIST } from '../services/instructionManifest';
import { Printer } from 'lucide-react';
import './MenuPrintStyles.css';

// --- CONFIG ---
const ROWS_PER_PAGE_1 = 15; // Approximate, depends on weeks. Logic below splits by dates.

interface FullMenuCardProps {
  monthData: MealDay[];
  monthName: string;
}

const FullMenuCard: React.FC<FullMenuCardProps> = ({ monthData, monthName }) => {
  const contact = MASTER_CHECKLIST.DESIGN_LAYOUT.KONTAKT;
  const year = "2026";

  // Month calculation for Ala Carte return date (20th of previous month)
  // Logic: The note says "À la Carte afleveres senest d. 20. [måned] kl. 16:00". 
  // It usually means the 20th of the current month PRIOR to proper execution? 
  // Text in PDF: "À la carte skal returneres skriftligt til køkkenet senest d. 20." (implied same month active) 
  // or "HUSK: Returneres senest d. 20. i måneden før!". 
  // PDF Text says: "⚠️ À la Carte afleveres senest d. 20. februar kl. 16:00" for February menu. 
  // So it corresponds to the month name.

  const handlePrint = () => window.print();

  // Split logic: Page 1 holds roughly half. 
  // Reference PDF has Weeks 5, 6, 7 on Page 1.
  // Weeks 8, 9 on Page 2.
  // We will split by index to be safe. 
  // Let's count weeks.

  const weeks = useMemo(() => {
    const weekList: MealDay[][] = [];
    let currentWeek: MealDay[] = [];

    monthData.forEach((day, i) => {
      currentWeek.push(day);
      if (day.date.includes('(Søn)') || i === monthData.length - 1) {
        weekList.push(currentWeek);
        currentWeek = [];
      }
    });
    return weekList;
  }, [monthData]);

  // Split weeks between Page 1 and Page 2.
  // 3 weeks on P1 seems standard for standard month.
  const page1Weeks = weeks.slice(0, 3);
  const page2Weeks = weeks.slice(3);

  const getDayClass = (day: MealDay) => {
    if (day.date.includes('(Søn)')) return 'row-sun';
    // Check local holidays or special styling
    // In PDF "Fastelavn" (Søn) has .row-fest but also .row-sun acts similar.
    // Let's trust isHoliday prop strictly?
    if (day.dish.toLowerCase().includes('fest') || day.dish.toLowerCase().includes('jul')) return 'row-fest';
    return '';
  };

  // Helper to calculate ISO week number
  const getWeekNumber = (dateString: string) => {
    // Parse date format "1. feb (Søn)" or ensure we have year.
    // Assuming 2026.
    const day = parseInt(dateString.split('.')[0]);
    // Mapping Danish months again for safety
    const monthMap: Record<string, number> = {
      'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'maj': 4, 'jun': 5,
      'jul': 6, 'aug': 7, 'sep': 8, 'okt': 9, 'nov': 10, 'dec': 11
    };
    // Extract month short name "feb"
    const monthStr = dateString.split(' ')[1]; // "feb"
    const month = monthMap[monthStr] !== undefined ? monthMap[monthStr] : 0;

    const date = new Date(parseInt(year), month, day);
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  return (
    <div className="flex flex-col items-center gap-10 bg-slate-200 p-10 print-bg-reset">

      {/* CONTROL PANEL */}
      <div className="no-print bg-white p-6 rounded-xl shadow-xl flex items-center justify-between w-full max-w-4xl fixed top-6 z-50 border border-slate-300">
        <h2 className="text-xl font-bold text-slate-700">Print Preview: {monthName} {year} (Udkast 111)</h2>
        <button onClick={handlePrint} className="bg-[#1b5e20] text-white px-6 py-2 rounded font-bold shadow hover:bg-[#2e7d32] flex items-center gap-2">
          <Printer size={18} /> Print PDF
        </button>
      </div>
      <div className="h-20 no-print"></div>

      {/* PAGE 1: MENU PART 1 */}
      <div className="a4-page-landscape">
        <div className="header-box">
          <h1>{monthName.toUpperCase()}MENUPLAN {year}</h1>
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
            {page1Weeks.map((week, idx) => {
              const firstDate = week[0].date.split(' (')[0];
              const lastDate = week[week.length - 1].date.split(' (')[0];
              const weekNum = getWeekNumber(week[0].date);

              return (
                <React.Fragment key={idx}>
                  <tr className="week-header"><th colSpan={9}>UGE {weekNum}: {firstDate} - {lastDate}</th></tr>
                  {week.map((day, dIdx) => {
                    // Generate recipe numbers based on global index
                    const globalIdx = page1Weeks.slice(0, idx).reduce((acc, w) => acc + w.length, 0) + dIdx + 1;
                    const hovedretNr = `HO-${String(globalIdx).padStart(3, '0')}`;
                    const biretNr = day.biret ? `BR-${String(globalIdx).padStart(3, '0')}` : '';

                    return (
                      <tr key={dIdx} className={getDayClass(day)}>
                        <td className="col-dato">{day.date}</td>
                        <td className="col-icon">{day.icon}</td>
                        <td className="col-nr">{hovedretNr}</td>
                        <td className="col-ret" dangerouslySetInnerHTML={{ __html: day.dish }}></td>
                        <td className="col-sauce">{day.sauce}</td>
                        <td className="col-kul">{day.carb}</td>
                        <td className="col-til">{day.veg}</td>
                        <td className="col-nr">{biretNr}</td>
                        <td className="col-des" dangerouslySetInnerHTML={{ __html: day.biret }}></td>
                      </tr>
                    );
                  })}
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
      <div className="a4-page-landscape">
        <div className="header-box">
          <h1>{monthName.toUpperCase()} {year} - SIDE 2</h1>
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
            {page2Weeks.map((week, idx) => {
              const firstDate = week[0].date.split(' (')[0];
              const lastDate = week[week.length - 1].date.split(' (')[0];
              const weekNum = getWeekNumber(week[0].date);

              return (
                <React.Fragment key={idx}>
                  <tr className="week-header"><th colSpan={9}>UGE {weekNum}: {firstDate} - {lastDate}</th></tr>
                  {week.map((day, dIdx) => {
                    // Generate recipe numbers based on global index (continue from page 1)
                    const page1Total = page1Weeks.reduce((acc, w) => acc + w.length, 0);
                    const globalIdx = page1Total + page2Weeks.slice(0, idx).reduce((acc, w) => acc + w.length, 0) + dIdx + 1;
                    const hovedretNr = `HO-${String(globalIdx).padStart(3, '0')}`;
                    const biretNr = day.biret ? `BR-${String(globalIdx).padStart(3, '0')}` : '';

                    return (
                      <tr key={dIdx} className={getDayClass(day)}>
                        <td className="col-dato">{day.date}</td>
                        <td className="col-icon">{day.icon}</td>
                        <td className="col-nr">{hovedretNr}</td>
                        <td className="col-ret" dangerouslySetInnerHTML={{ __html: day.dish }}></td>
                        <td className="col-sauce">{day.sauce}</td>
                        <td className="col-kul">{day.carb}</td>
                        <td className="col-til">{day.veg}</td>
                        <td className="col-nr">{biretNr}</td>
                        <td className="col-des" dangerouslySetInnerHTML={{ __html: day.biret }}></td>
                      </tr>
                    );
                  })}
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
          <div className="urgent-note">⚠️ À la Carte afleveres senest d. 20. {monthName.toLowerCase()} kl. 16:00</div>
        </div>
      </div>

      {/* PAGE 3: ALA CARTE */}
      <div className="a4-page-landscape">
        <div className="header-box" style={{ background: 'linear-gradient(to right, #1b5e20, #2e7d32)' }}>
          <h1>🍽️ À LA CARTE {monthName.toUpperCase()} {year}</h1>
          <h2>Breelteparkens Køkken - Premium Valg</h2>
        </div>

        <div className="info-bar">
          <strong>À la carte retter leveres efter bestilling • Kølemad til opvarmning • Energi- og proteinrig kost</strong>
        </div>

        <div className="alc-grid">
          <div className="alc-col">
            <div className="alc-header" style={{ background: '#2c5f2d' }}>🍽️ HOVEDRETTER</div>
            {aLaCarteMenu.filter(m => m.category === 'Hovedret').map(item => (
              <div key={item.id} className="alc-card">
                <h3>Nr. {item.id}: {item.name}</h3>
                <p>{item.description}</p>
                <div style={{ fontSize: '7pt', color: '#666', marginTop: '4px', borderTop: '1px solid #eee', paddingTop: '2px' }}>
                  Protein: 25-30g | Energi: 800-950 KJ | Fedt: 35-45 E%
                </div>
              </div>
            ))}
          </div>
          <div className="alc-col">
            <div className="alc-header" style={{ background: '#0277bd' }}>🥣 SUPPER & PUDDING</div>
            {aLaCarteMenu.filter(m => m.category === 'Suppe').map(item => (
              <div key={item.id} className="alc-card" style={{ borderLeftColor: '#0277bd' }}>
                <h3>Nr. {item.id}: {item.name}</h3>
                <p>{item.description}</p>
                <div style={{ fontSize: '7pt', color: '#666', marginTop: '4px', borderTop: '1px solid #eee', paddingTop: '2px' }}>
                  Protein: 15-20g | Energi: 600-750 KJ | Fedt: 25-35 E%
                </div>
              </div>
            ))}
          </div>
          <div className="alc-col">
            <div className="alc-header" style={{ background: '#ef6c00' }}>🍰 DESSERTER</div>
            {aLaCarteMenu.filter(m => m.category === 'Dessert').map(item => (
              <div key={item.id} className="alc-card" style={{ borderLeftColor: '#ef6c00' }}>
                <h3>Nr. {item.id}: {item.name}</h3>
                <p>{item.description}</p>
                <div style={{ fontSize: '7pt', color: '#666', marginTop: '4px', borderTop: '1px solid #eee', paddingTop: '2px' }}>
                  Protein: 8-12g | Energi: 400-550 KJ | Fedt: 40-50 E%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-nutri" style={{ marginTop: '15px', padding: '8px' }}>
          <strong>À la carte retter:</strong> Leveres kølet og skal opvarmes før servering • Alle retter er tilpasset småtspisende
        </div>
      </div>

      {/* PAGE 4: INFO & CONTACT */}
      <div className="a4-page-landscape">
        <div className="contact-hero">
          <div className="contact-title">📞 BREELTEPARKENS KØKKEN: {contact}</div>
          <div className="contact-subtitle">Telefontid: Hverdage kl. 12:00 - 13:00</div>
        </div>

        <div className="info-container">
          <div className="info-col">
            <div className="info-card card-yellow">
              <span className="card-header" style={{ color: '#f57f17' }}>✓ BESTILLINGSINFORMATION</span>
              <ul>
                <li><strong>À la carte skal returneres skriftligt</strong> til køkkenet senest d. 20.</li>
                <li>Skriv nummeret på ønsket ret på menuplanen.</li>
                <li>Returner udfyldt eksemplar til chaufføren.</li>
                <li>Kun ved ændringer returneres eksemplar!</li>
                <li>Bestilling ændres ikke efter deadline.</li>
              </ul>
            </div>
            <div className="info-card card-blue">
              <span className="card-header" style={{ color: '#1565c0' }}>🔥 OPVARMNING OG BEHANDLING</span>
              <ul>
                <li><strong>Varm mad:</strong> Spises straks ved modtagelse.</li>
                <li><strong>Kølt levering:</strong> Opbevares på køl (max 5°C).</li>
                <li><strong>Almindelig ovn:</strong> Ca. 30 min. ved 120°C.</li>
                <li><strong>Mikroovn:</strong> Ca. 3-5 minutter.</li>
                <li><strong>Opvarmningstider</strong> kan variere efter portion.</li>
              </ul>
            </div>
            <div className="info-card card-green" style={{ background: '#e8f5e9', borderLeftColor: '#2e7d32' }}>
              <span className="card-header" style={{ color: '#2e7d32' }}>🌱 KVALITET & FERSKHED</span>
              <ul>
                <li><strong>Fersk tilberedning:</strong> Alle retter tilberedes dagligt.</li>
                <li><strong>Sæsonråvarer:</strong> Lokale og sæsonbetonede produkter.</li>
                <li><strong>Kvalitetskontrol:</strong> HACCP-certificeret produktion.</li>
                <li><strong>Særlige behov:</strong> Mulighed for individuelle diæter.</li>
              </ul>
            </div>
          </div>

          <div className="info-col">
            <div className="info-card card-red">
              <span className="card-header" style={{ color: '#c62828' }}>⚠️ VIGTIG INFORMATION</span>
              <p><strong>Weekend & Helligdage:</strong> Køkkenet lukket. Hørsholm Beredskab leverer.</p>
              <p><strong>Fejl ved levering:</strong> Ring 45 80 33 55 omgående.</p>
              <p><strong>Pakkefejl:</strong> Kan ikke rettes på dagen. Anbefales at have nødret i fryseren.</p>
              <p><strong>Ændringer:</strong> Meddel køkkenet straks ved behov for tilpasninger.</p>
            </div>
            <div className="info-card card-grey">
              <span className="card-header">📋 VIGTIGE NOTER</span>
              <ul>
                <li>Du modtager <strong>2 eksemplarer</strong> af menuplanen.</li>
                <li><strong>Behold det ene selv</strong> som referenceeksemplar.</li>
                <li>Returner kun det andet eksemplar <strong>hvis du laver ændringer</strong>.</li>
                <li><strong>Fødevaresikkerhed:</strong> Følg opbevaringsanvisninger.</li>
                <li><strong>Tilfredshed:</strong> Feedback er velkommen!</li>
              </ul>
            </div>
            <div className="info-card card-purple" style={{ background: '#f3e5f5', borderLeftColor: '#7b1fa2' }}>
              <span className="card-header" style={{ color: '#7b1fa2' }}>📊 NÆRINGSSTOFOVERSIGT</span>
              <p><strong>Dagligt måltid:</strong> Protein 22-30g, Energi 3200-3900 KJ</p>
              <p><strong>À la carte:</strong> Tilpasset samme ernæringsstandarder</p>
              <p><strong>Særlig kost:</strong> Kontakt køkkenet for individuelle behov</p>
            </div>
          </div>
        </div>

        <div className="footer-greeting">
          <h2>☃️ Vi ønsker dig en glædelig {monthName.toLowerCase()}!</h2>
          <div>Med venlig hilsen Breelteparkens Køkken</div>
        </div>
      </div>

    </div>
  );
};

export default FullMenuCard;
