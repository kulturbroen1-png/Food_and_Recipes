import * as fs from 'fs/promises';
import * as path from 'path';
import ExcelJS from 'exceljs';

// Paths to the found Hørkram 2025 files
const HORKRAM_K1_PATH = '/Users/ashisgautam/Library/CloudStorage/GoogleDrive-foodexpert143@gmail.com/.shortcut-targets-by-id/1vbmpfGJ3Q6d9SA4OrDQkwL-xoaSQnRAY/03 Data/Indkøbsdata/Gældende sortering/2025/K1/Data til værktøj/Hørkram/Hørkram K1 2025.xlsx';
const HORKRAM_K2_PATH = '/Users/ashisgautam/Library/CloudStorage/GoogleDrive-foodexpert143@gmail.com/.shortcut-targets-by-id/1vbmpfGJ3Q6d9SA4OrDQkwL-xoaSQnRAY/03 Data/Indkøbsdata/Gældende sortering/2025/K2/Sorteret data/Hørkram 2025 k2 sorteret.xlsx';

const OUTPUT_FILE = path.join(process.cwd(), 'public', 'horkram_2025_prices.json');

interface PriceEntry {
    varenummer: string;
    navn: string;
    pris: number;
    enhed: string;
    kategori: string;
    source: 'K1_2025' | 'K2_2025';
}

async function extractPrices() {
    console.log('Starting extraction of Hørkram 2025 prices...');
    const prices: PriceEntry[] = [];

    // --- K2 EXTRACTION (Primary Source: 3000+ rows) ---
    try {
        console.log(`Reading K2 file: ${HORKRAM_K2_PATH}`);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(HORKRAM_K2_PATH);
        const worksheet = workbook.worksheets[0];
        const rawData = worksheet.getSheetValues();

        // Convert to array format and then to objects
        const dataK2: any[] = [];
        for (let i = 1; i < rawData.length; i++) { // Skip header row
            const row = rawData[i];
            if (Array.isArray(row)) {
                dataK2.push({
                    'Varebeskrivelse': row[0] || '',
                    'Kilopris': row[1] || '',
                    'Pris pr enhed': row[2] || '',
                    'Kg': row[3] || '',
                    'Råvarekategori': row[4] || '',
                    'Varenummer': row[5] || ''
                });
            }
        }

        console.log(`Found ${dataK2.length} rows in K2.`);

        // Headers identified from scan: Varebeskrivelse, Kilopris, Pris pr enhed, Råvare, Råvarekategori
        for (const row of dataK2) {
            // K2 Layout:
            // Varebeskrivelse: "Svinekam u/ben u/svær..."
            // Kilopris: "45,50" -> Price per KG
            // Pris pr enhed: "875,25" -> derived? 
            // Kg: "2,5" -> Unit size?

            const navn = row['Varebeskrivelse'] || row['Navn'];

            // Priority: Kilopris (canonical price for calculations)
            // If Kilopris is missing/0, fallback to Pris pr enhed if logical? 
            // Usually we want price per kg for recipes.

            let pris = 0;
            if (row['Kilopris'] != null) {
                pris = parseFloat(String(row['Kilopris']).replace(',', '.'));
            }

            const enhed = 'kg'; // Defaulting to kg as we use Kilopris, but row['Kg'] might imply unit size
            const kategori = row['Råvarekategori'] || row['Hovedkategori'] || 'Diverse';

            // Varenummer might be missing in K2 scan?
            // Scan showed: År, Kvartal, Køkken, Leverandør, Hovedkategori...
            // No explicit 'Varenummer' or 'Varenr' in the log I saw earlier! 
            // Ah, but `analyzeMenuCards` does fuzzy matching by name often.
            // We can generate a pseudo ID if needed or use Name as key.

            // Wait, I need an ID for robust matching.
            // If no ID, I'll use a sanitized name hash or just the name. 
            // Most lookups are by name in my code: `findPrice(day.dish, prices)` uses fuzzy name match.
            const varenr = row['Varenummer'] || row['Varenr'] || String(Math.random()).slice(2, 8); // Fallback

            if (navn && pris > 0) {
                prices.push({
                    varenummer: String(varenr),
                    navn: String(navn).trim(),
                    pris: pris,
                    enhed: enhed,
                    kategori: String(kategori),
                    source: 'K2_2025'
                });
            }
        }
    } catch (error) {
        console.error('Error processing K2:', error);
    }

    // Deduplicate
    const priceMap = new Map<string, PriceEntry>();
    for (const p of prices) {
        // Use name as key if varenr is random, to avoid dups of same item
        const key = p.navn.toLowerCase();
        if (!priceMap.has(key)) {
            priceMap.set(key, p);
        }
    }

    const finalPrices = Array.from(priceMap.values());
    console.log(`Total unique items extracted: ${finalPrices.length}`);

    // Save
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(finalPrices, null, 2));
    console.log(`Saved to ${OUTPUT_FILE}`);
}

extractPrices().catch(console.error);
