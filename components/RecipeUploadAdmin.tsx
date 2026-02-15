// Recipe Upload & Migration Admin Component
import React, { useState, useRef } from 'react';
import { Upload, Zap, CheckCircle, AlertCircle, Loader2, Database } from 'lucide-react';
import { getCategorizationService, CategorizedRecipe } from '../services/recipeCategorizationService';
import { uploadRecipesBatch, getCategoryStats } from '../services/firestoreService';

interface UploadProgress {
    phase: 'scanning' | 'categorizing' | 'uploading' | 'complete' | 'error';
    total: number;
    processed: number;
    successful: number;
    failed: number;
    currentFile?: string;
    errors: string[];
}

const RecipeUploadAdmin: React.FC = () => {
    const [progress, setProgress] = useState<UploadProgress | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [categoryStats, setCategoryStats] = useState<Record<string, number> | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle manual file upload
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setIsProcessing(true);
        setProgress({
            phase: 'scanning',
            total: files.length,
            processed: 0,
            successful: 0,
            failed: 0,
            errors: []
        });

        const recipes: { name: string; content: string }[] = [];

        // Read all files
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setProgress(prev => prev ? { ...prev, currentFile: file.name } : null);

            try {
                const content = await file.text();
                recipes.push({ name: file.name.replace(/\.(txt|pdf|docx)$/, ''), content });
            } catch (error) {
                setProgress(prev => prev ? {
                    ...prev,
                    failed: prev.failed + 1,
                    errors: [...prev.errors, `Failed to read ${file.name}`]
                } : null);
            }
        }

        // Categorize recipes with AI
        setProgress(prev => prev ? { ...prev, phase: 'categorizing', processed: 0 } : null);

        const service = getCategorizationService();
        const categorized: CategorizedRecipe[] = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            setProgress(prev => prev ? { ...prev, currentFile: recipe.name, processed: i } : null);

            try {
                const category = await service.categorizeRecipe(recipe.name);
                categorized.push({
                    recipeName: recipe.name,
                    category,
                    originalSource: 'manual_upload'
                });
                setProgress(prev => prev ? { ...prev, successful: prev.successful + 1 } : null);
            } catch (error) {
                setProgress(prev => prev ? {
                    ...prev,
                    failed: prev.failed + 1,
                    errors: [...prev.errors, `Failed to categorize ${recipe.name}`]
                } : null);
            }
        }

        // Upload to Firestore
        setProgress(prev => prev ? { ...prev, phase: 'uploading', processed: 0 } : null);

        try {
            const uploadResults = await uploadRecipesBatch(categorized);
            setProgress(prev => prev ? {
                ...prev,
                phase: 'complete',
                successful: uploadResults.successful,
                failed: uploadResults.failed,
                errors: [...(prev?.errors || []), ...uploadResults.errors]
            } : null);

            // Refresh stats
            const stats = await getCategoryStats();
            setCategoryStats(stats);
        } catch (error) {
            setProgress(prev => prev ? {
                ...prev,
                phase: 'error',
                errors: [...(prev?.errors || []), `Upload failed: ${error}`]
            } : null);
        }

        setIsProcessing(false);
    };

    // Sample demo upload
    const uploadDemoRecipes = async () => {
        const demoRecipes = [
            { name: 'Stegt flæsk med persillesovs', ingredients: ['Flæsk', 'Kartofler', 'Persillesovs'] },
            { name: 'Farsbrød med agurkesalat', ingredients: ['Farsbrød', 'Agurk', 'Eddike'] },
            { name: 'Kogt torsk med sennepssovs', ingredients: ['Torsk', 'Sennep', 'Fløde'] },
        ];

        setIsProcessing(true);
        setProgress({
            phase: 'categorizing',
            total: demoRecipes.length,
            processed: 0,
            successful: 0,
            failed: 0,
            errors: []
        });

        const service = getCategorizationService();
        const categorized: CategorizedRecipe[] = [];

        for (let i = 0; i < demoRecipes.length; i++) {
            const recipe = demoRecipes[i];
            setProgress(prev => prev ? { ...prev, currentFile: recipe.name, processed: i } : null);

            try {
                const category = await service.categorizeRecipe(recipe.name, recipe.ingredients);
                categorized.push({
                    recipeName: recipe.name,
                    category,
                    ingredients: recipe.ingredients,
                    originalSource: 'demo'
                });
                setProgress(prev => prev ? { ...prev, successful: prev.successful + 1 } : null);
            } catch (error) {
                setProgress(prev => prev ? {
                    ...prev,
                    failed: prev.failed + 1,
                    errors: [...prev.errors, `Failed: ${recipe.name}`]
                } : null);
            }
        }

        // Upload to cloud
        setProgress(prev => prev ? { ...prev, phase: 'uploading' } : null);

        try {
            const results = await uploadRecipesBatch(categorized);
            setProgress(prev => prev ? { ...prev, phase: 'complete' } : null);

            const stats = await getCategoryStats();
            setCategoryStats(stats);
        } catch (error) {
            setProgress(prev => prev ? {
                ...prev,
                phase: 'error',
                errors: [...(prev?.errors || []), `Upload failed: ${error}`]
            } : null);
        }

        setIsProcessing(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                        <Database size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">Cloud Upload Admin</h1>
                        <p className="text-blue-100">Migrate recipes to global cloud database</p>
                    </div>
                </div>
            </div>

            {/* Upload Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Demo Upload */}
                <button
                    onClick={uploadDemoRecipes}
                    disabled={isProcessing}
                    className="bg-white rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all text-left group disabled:opacity-50"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <Zap size={24} className="text-blue-600" />
                        <h3 className="text-lg font-bold text-slate-900">Quick Demo Upload</h3>
                    </div>
                    <p className="text-sm text-slate-600">Upload 3 demo recipes to test cloud connection</p>
                </button>

                {/* File Upload */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="bg-white rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 transition-all text-left group disabled:opacity-50"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <Upload size={24} className="text-green-600" />
                        <h3 className="text-lg font-bold text-slate-900">Upload Recipe Files</h3>
                    </div>
                    <p className="text-sm text-slate-600">Select .txt, .pdf, or .docx files to categorize & upload</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".txt,.pdf,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </button>
            </div>

            {/* Progress Display */}
            {progress && (
                <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                        {progress.phase === 'complete' ? (
                            <CheckCircle size={24} className="text-green-600" />
                        ) : progress.phase === 'error' ? (
                            <AlertCircle size={24} className="text-red-600" />
                        ) : (
                            <Loader2 size={24} className="text-blue-600 animate-spin" />
                        )}
                        <h3 className="text-xl font-bold text-slate-900">
                            {progress.phase === 'scanning' && 'Scanning Files...'}
                            {progress.phase === 'categorizing' && 'AI Categorizing...'}
                            {progress.phase === 'uploading' && 'Uploading to Cloud...'}
                            {progress.phase === 'complete' && 'Upload Complete!'}
                            {progress.phase === 'error' && 'Upload Failed'}
                        </h3>
                    </div>

                    {progress.currentFile && (
                        <p className="text-sm text-slate-600 mb-3">Current: {progress.currentFile}</p>
                    )}

                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden mb-4">
                        <div
                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-300"
                            style={{ width: `${(progress.processed / progress.total) * 100}%` }}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                            <div className="text-2xl font-bold text-slate-900">{progress.processed}</div>
                            <div className="text-slate-600">Processed</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{progress.successful}</div>
                            <div className="text-slate-600">Successful</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-600">{progress.failed}</div>
                            <div className="text-slate-600">Failed</div>
                        </div>
                    </div>

                    {progress.errors.length > 0 && (
                        <div className="mt-4 p-4 bg-red-50 rounded-lg">
                            <h4 className="font-semibold text-red-900 mb-2">Errors:</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                                {progress.errors.slice(0, 5).map((err, idx) => (
                                    <li key={idx}>• {err}</li>
                                ))}
                                {progress.errors.length > 5 && (
                                    <li>... and {progress.errors.length - 5} more</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Category Statistics */}
            {categoryStats && (
                <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Cloud Database Stats</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(categoryStats).map(([category, count]) => (
                            <div key={category} className="bg-slate-50 rounded-xl p-4 text-center border-2 border-slate-200">
                                <div className="text-3xl font-bold text-orange-600">{count}</div>
                                <div className="text-sm text-slate-600">{category}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeUploadAdmin;
