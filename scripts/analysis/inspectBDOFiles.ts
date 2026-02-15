import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

const FILES = [
    'public/bdo_fordeling.xlsx',
    'public/bdo_oekologi.xlsx'
];

for (const fileRel of FILES) {
    const FILE = path.join(process.cwd(), fileRel);
    console.log(`\n=== INSPECTING ${fileRel} ===`);
    try {
        const buf = fs.readFileSync(FILE);
        const wb = XLSX.read(buf, { type: 'buffer' });
        console.log('Sheets:', wb.SheetNames);
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log('Headers:', data[0]);
        console.log('First 3 Rows:', JSON.stringify(data.slice(1, 4), null, 2));
    } catch (e) {
        console.error('Failed:', e);
    }
}
