import ExcelJS from 'exceljs';
import fs from 'fs/promises';
import path from 'path';

interface PriceEntry {
    name: string;
    unit: string;
    price: number;
    supplier: string;
    productNumber?: string;
    category?: string;
}

// Primary source files for price extraction - cleaned quarterly Hørkram data
const PRICE_SOURCES = [
    '/Users/ashisgautam/Library/CloudStorage/GoogleDrive-foodexpert143@gmail.com/.shortcut-targets-by-id/1vbmpfGJ3Q6d9SA4OrDQkwL-xoaSQnRAY/03 Data/Indkøbsdata/Kladder og andre værktøjer/Sorteringsværktøj/Opdatering sorteringsværktøj 2024/Hørkram test renset K1.xlsx',
    '/Users/ashisgautam/Library/CloudStorage/GoogleDrive-foodexpert143@gmail.com/.shortcut-targets-by-id/1vbmpfGJ3Q6d9SA4OrDQkwL-xoaSQnRAY/03 Data/Indkøbsdata/Kladder og andre værktøjer/Sorteringsværktøj/Opdatering sorteringsværktøj 2024/Hørkram test renset K2.xlsx',
    '/Users/ashisgautam/Library/CloudStorage/GoogleDrive-foodexpert143@gmail.com/.shortcut-targets-by-id/1vbmpfGJ3Q6d9SA4OrDQkwL-xoaSQnRAY/03 Data/Indkøbsdata/Kladder og andre værktøjer/Sorteringsværktøj/Opdatering sorteringsværktøj 2024/Hørkram test renset K3.xlsx'
];

const OUTPUT_FILE = path.join(process.cwd(), 'public/horkram_prices.json');

async function extractPricesFromExcel(filePath: string): Promise<PriceEntry[]> {
    const prices: PriceEntry[] = [];

    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        console.log(`Processing: ${path.basename(filePath)}`);
        console.log(`  Sheets: ${workbook.worksheets.map(ws => ws.name).join(', ')}`);

        for (const worksheet of workbook.worksheets) {
            const sheetName = worksheet.name;
            const rawData = worksheet.getSheetValues();

            // Convert to array format similar to XLSX
            const data: any[][] = [];
            for (let i = 0; i < rawData.length; i++) {
                const row = rawData[i];
                if (Array.isArray(row)) {
                    data.push(row.map(cell => cell || ''));
                } else {
                    data.push([]);
                }
            }

            if (data.length < 2) continue;

            // Try to find header row with price-related columns
            let headerRow = -1;
            for (let i = 0; i < Math.min(10, data.length); i++) {
                const row = data[i];
                if (!row) continue;
                const rowStr = row.join(' ').toLowerCase();
                if (rowStr.includes('pris') || rowStr.includes('varenr') || rowStr.includes('produkt') || rowStr.includes('enhed')) {
                    headerRow = i;
                    break;
                }
            }

            if (headerRow === -1) {
                console.log(`  Sheet "${sheetName}": No price headers found, skipping`);
                continue;
            }

            const headers = data[headerRow].map(h => String(h || '').toLowerCase());
            console.log(`  Headers: ${headers.slice(0, 10).join(', ')}`);

            // Known column structure for Hørkram quarterly data:
            // 0: År, 1: Kvartal, 2: Hospital, 3: Råvarekategori, 4: Leverandør
            // 5: Råvare (name), 6: konv/øko, 7: Varianter/opr (product details)
            // 8: Pris pr enhed, 9: Pris i alt, 10: Kg, 11: Kilopris

            // Find column indices - use specific matches
            let nameIdx = headers.findIndex(h => h === 'råvare' || h === 'varenavn' || h === 'produkt');
            let priceIdx = headers.findIndex(h => h.includes('kilopris') || h === 'pris pr kg');
            let unitPriceIdx = headers.findIndex(h => h === 'pris pr enhed');
            let categoryIdx = headers.findIndex(h => h === 'råvarekategori' || h.includes('kategori'));
            let variantIdx = headers.findIndex(h => h.includes('variant') || h.includes('opr'));

            // Fallback: use known positions
            if (nameIdx === -1) nameIdx = 5;  // Råvare
            if (priceIdx === -1) priceIdx = 11; // Kilopris
            if (unitPriceIdx === -1) unitPriceIdx = 8; // Pris pr enhed
            if (categoryIdx === -1) categoryIdx = 3; // Råvarekategori
            if (variantIdx === -1) variantIdx = 7; // Varianter / opr

            console.log(`  Using columns: name=${nameIdx}, kilopris=${priceIdx}, unitprice=${unitPriceIdx}, category=${categoryIdx}`);

            // Extract data rows
            for (let i = headerRow + 1; i < data.length; i++) {
                const row = data[i];
                if (!row || !row[nameIdx]) continue;

                const name = String(row[nameIdx]).trim();
                const priceVal = row[priceIdx]; // Kilopris
                const category = categoryIdx >= 0 && row[categoryIdx] ? String(row[categoryIdx]).trim() : '';
                const variant = variantIdx >= 0 && row[variantIdx] ? String(row[variantIdx]).trim() : '';

                if (!name || name.length < 2) continue;

                const price = typeof priceVal === 'number' ? priceVal : parseFloat(String(priceVal).replace(',', '.'));
                if (isNaN(price) || price <= 0) continue;

                prices.push({
                    name,
                    unit: 'kg',
                    price,
                    supplier: 'Hørkram',
                    productNumber: variant || undefined,
                    category: category || sheetName
                });
            }

            console.log(`  Sheet "${sheetName}": Extracted ${prices.length} price entries`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }

    return prices;
}

async function main() {
    console.log('Extracting Hørkram prices from Excel files...\n');

    const allPrices: PriceEntry[] = [];

    for (const source of PRICE_SOURCES) {
        try {
            await fs.access(source);
            const prices = await extractPricesFromExcel(source);
            allPrices.push(...prices);
        } catch {
            console.warn(`File not accessible: ${path.basename(source)}`);
        }
    }

    // Deduplicate by name (keep first occurrence)
    const seen = new Set<string>();
    const deduplicated = allPrices.filter(p => {
        const key = p.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    console.log(`\nTotal unique price entries: ${deduplicated.length}`);

    // Create price lookup object
    const priceLookup: Record<string, PriceEntry> = {};
    for (const entry of deduplicated) {
        priceLookup[entry.name] = entry;
    }

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(priceLookup, null, 2));
    console.log(`\n✅ Wrote price database to ${OUTPUT_FILE}`);

    // Print sample
    console.log('\nSample entries:');
    const sample = deduplicated.slice(0, 5);
    for (const s of sample) {
        console.log(`  ${s.name}: ${s.price} kr/${s.unit}`);
    }
}

main().catch(console.error);
