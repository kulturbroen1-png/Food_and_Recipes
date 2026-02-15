
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');

const filePath = '/Users/ashisgautam/Documents/Food_and_Recipes/Opskrifter_Komplet_Samling/Booklets_Split/Samlet A Og B/Biksemad (oksekød).pdf';
const dataBuffer = fs.readFileSync(filePath);

console.log('pdfModule.PDFParse:', pdfModule.PDFParse);

// Try to use it
try {
    // Attempt 1: As a function (legacy way)
    // checking if the module itself is a function (it wasn't in previous run)

    // Attempt 2: Instantiate PDFParse
    if (pdfModule.PDFParse) {
        const parser = new pdfModule.PDFParse();
        console.log('Parser instance created.');
        // How to parse? parser.parse(buffer)?
        console.log('Parser keys:', Object.keys(parser));
        console.log('Parser proto keys:', Object.getOwnPropertyNames(Object.getPrototypeOf(parser)));
    }

    // Attempt 3: Check if there is a 'default' we missed
    console.log('pdfModule.default:', pdfModule.default);

} catch (e) {
    console.error(e);
}
