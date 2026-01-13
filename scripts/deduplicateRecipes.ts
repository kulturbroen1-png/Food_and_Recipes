import fs from 'fs/promises';
import path from 'path';

interface IndexedFile {
    id: string;
    name: string;
    filename: string;
    path: string;
    category: string;
    subCategory: string;
    type: string;
    size: number;
    modified: string;
}

const INPUT_FILE = path.join(process.cwd(), 'public/local_recipes.json');
const OUTPUT_FILE = path.join(process.cwd(), 'public/deduplicated_recipes.json');

async function main() {
    console.log('Starting Deduplication Process...');

    const rawData = await fs.readFile(INPUT_FILE, 'utf-8');
    const allFiles: IndexedFile[] = JSON.parse(rawData);

    console.log(`Total files before deduplication: ${allFiles.length}`);

    // Group by normalized name
    const seen = new Map<string, IndexedFile>();

    for (const file of allFiles) {
        const normalizedName = file.name.trim().toLowerCase();

        if (!seen.has(normalizedName)) {
            seen.set(normalizedName, file);
        } else {
            // Keep the most recently modified version
            const existing = seen.get(normalizedName)!;
            const existingDate = new Date(existing.modified).getTime();
            const currentDate = new Date(file.modified).getTime();

            if (currentDate > existingDate) {
                seen.set(normalizedName, file);
            }
        }
    }

    const deduplicated = Array.from(seen.values());

    console.log(`Total files after deduplication: ${deduplicated.length}`);
    console.log(`Removed ${allFiles.length - deduplicated.length} duplicates`);

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(deduplicated, null, 2));
    console.log(`\n🎉 Done! Wrote deduplicated data to ${OUTPUT_FILE}`);
}

main().catch(console.error);
