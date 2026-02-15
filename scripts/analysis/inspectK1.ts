import * as fs from 'fs/promises';
import * as path from 'path';
import ExcelJS from 'exceljs';

const HORKRAM_K1_PATH = '/Users/ashisgautam/Library/CloudStorage/GoogleDrive-foodexpert143@gmail.com/.shortcut-targets-by-id/1vbmpfGJ3Q6d9SA4OrDQkwL-xoaSQnRAY/03 Data/Indkøbsdata/Gældende sortering/2025/K1/Data til værktøj/Hørkram/Hørkram K1 2025.xlsx';

async function inspectK1() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(HORKRAM_K1_PATH);
    const worksheet = workbook.worksheets[0];
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

    console.log('--- K1 RAW DATA SCAN ---');
    // Scan first 100 rows for anything resembling a header
    for (let i = 0; i < Math.min(data.length, 100); i++) {
        const row = data[i];
        if (row && row.length > 3) {
            const rowStr = JSON.stringify(row);
            if (rowStr.toLowerCase().includes('vare') || rowStr.toLowerCase().includes('pris') || rowStr.toLowerCase().includes('beskrivelse')) {
                console.log(`Potential Header at Row ${i}:`, row);
            }
        }
    }

    // Also print rows 30-40 just in case
    console.log('--- Rows 30-40 ---');
    console.log(JSON.stringify(data.slice(30, 40), null, 2));
}

inspectK1().catch(console.error);
