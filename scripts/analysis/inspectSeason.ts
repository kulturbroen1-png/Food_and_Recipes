import * as fs from 'fs/promises';
import * as path from 'path';
import * as XLSX from 'xlsx';

const FILE_PATH = '/Users/ashisgautam/Library/CloudStorage/GoogleDrive-foodexpert143@gmail.com/.shortcut-targets-by-id/10PfgRkIllJoldCu6ZacHNH5Dq9VVqJmF/Kulinarisk konsulent/Christian/Menuplaner Værktøjskasse/201113_Sæsongrønt til udbud.xlsx';

async function inspectSeason() {
    console.log('Reading Sæsongrønt file...');
    const buffer = await fs.readFile(FILE_PATH);
    const wb = XLSX.read(buffer, { type: 'buffer' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json<any>(sheet, { header: 1 });

    console.log('--- RAW DATA TOP 10 ---');
    console.log(JSON.stringify(data.slice(0, 10), null, 2));
}

inspectSeason().catch(console.error);
