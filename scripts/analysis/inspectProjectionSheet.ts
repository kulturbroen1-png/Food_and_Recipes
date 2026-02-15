import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

const FILE = path.join(process.cwd(), 'public', 'projection_template.xlsx');

try {
    const buf = fs.readFileSync(FILE);
    const wb = XLSX.read(buf, { type: 'buffer' });
    console.log('Sheets:', wb.SheetNames);

    const sheet = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log('Headers (Row 0):', data[0]);
    console.log('Rows 1-10:', JSON.stringify(data.slice(1, 11), null, 2));
} catch (e) {
    console.error('Failed to read:', e);
}
