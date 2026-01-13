
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SCAN_ROOTS = [
    { dir: path.join(__dirname, '../public/recipes_data'), webPath: '/recipes_data' },
    { dir: path.join(__dirname, '../public/google_drive_data'), webPath: '/google_drive_data' }
];
const OUTPUT_FILE = path.join(__dirname, '../public/local_recipes.json');
// Supported Extensions
const EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt', '.md', '.jpg', '.png'];

// Updated Recursive function
function walkDir(dir, webRoot, fileList = [], rootDir = dir) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        try {
            const stat = fs.statSync(filePath);
            if (stat && stat.isDirectory()) {
                if (!file.startsWith('.') && file !== '_Trash' && file !== 'node_modules') {
                    walkDir(filePath, webRoot, fileList, rootDir);
                }
            } else {
                // Privacy Filter
                const sensitiveKeywords = ['løn', 'budget', 'private', 'cpr', 'password', 'bank', 'skat'];
                if (sensitiveKeywords.some(keyword => file.toLowerCase().includes(keyword))) {
                    return;
                }

                const ext = path.extname(file).toLowerCase();
                if (EXTENSIONS.includes(ext)) {
                    const relativePath = path.relative(rootDir, filePath);
                    const pathParts = relativePath.split(path.sep);
                    const cat = pathParts.length > 1 ? pathParts[0] : 'Uncategorized'; // Category
                    const sub = pathParts.length > 2 ? pathParts[1] : ''; // SubCategory

                    fileList.push({
                        id: Buffer.from(relativePath + webRoot).toString('base64'),
                        name: path.basename(file, ext),
                        filename: file,
                        path: `${webRoot}/${relativePath}`, // Correct Web Path
                        category: cat.replace(/_/g, ' '),
                        subCategory: sub.replace(/_/g, ' '),
                        type: ext.substring(1),
                        size: stat.size,
                        modified: stat.mtime
                    });
                }
            }
        } catch (e) { /* Ignore access errors */ }
    });
    return fileList;
}

console.log(`Scanning multiple roots...`);

const allRecipes = [];
SCAN_ROOTS.forEach(root => {
    if (fs.existsSync(root.dir)) {
        console.log(`Scanning: ${root.dir}`);
        walkDir(root.dir, root.webPath, allRecipes);
    } else {
        console.warn(`Warning: Skipped missing root: ${root.dir}`);
    }
});

console.log(`Found ${allRecipes.length} recipes.`);

// Chunking Logic
const CHUNK_SIZE = 5000;
const totalChunks = Math.ceil(allRecipes.length / CHUNK_SIZE);
const manifest = {
    totalFiles: allRecipes.length,
    chunks: []
};

for (let i = 0; i < totalChunks; i++) {
    const chunkData = allRecipes.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    const chunkFileName = `local_recipes_part_${i}.json`;
    const chunkPath = path.join(__dirname, `../public/${chunkFileName}`);

    fs.writeFileSync(chunkPath, JSON.stringify(chunkData));
    console.log(`Saved chunk ${i + 1}/${totalChunks}: ${chunkFileName} (${chunkData.length} items)`);

    manifest.chunks.push(`/${chunkFileName}`);
}

// Save Manifest (Client will read this first)
const manifestPath = path.join(__dirname, '../public/recipe_manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Manifest saved to: ${manifestPath}`);

// Also keep the main file for backward compatibility (optional, or remove if too big)
// fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allRecipes, null, 2));
