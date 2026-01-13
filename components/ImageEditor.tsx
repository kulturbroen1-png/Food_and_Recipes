
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { editImageRequest } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ImageEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!selectedImage || !prompt) return;
    setIsLoading(true);
    setError(null);
    try {
      // Create new instance with correct initialization right before call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent(editImageRequest(selectedImage, mimeType, prompt));
      
      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setEditedImage(`data:image/png;base64,${part.inlineData.data}`);
          foundImage = true;
          break;
        }
      }
      if (!foundImage) throw new Error("AI genererede ikke et nyt billede. Prøv en anden prompt.");
    } catch (err: any) {
      setError(err.message || "Fejl under billedredigering.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 border border-slate-200">
      <div className="mb-8 border-b-2 border-slate-100 pb-6">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">AI Mad-Stylist</h2>
        <p className="text-sm text-slate-500 font-serif italic">Rediger dine retbilleder med tekstprompter via Gemini 2.5 Flash Image</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-pink-500 transition-all cursor-pointer bg-slate-50 relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
            {selectedImage ? (
              <img src={`data:${mimeType};base64,${selectedImage}`} alt="Original" className="max-h-64 mx-auto rounded-lg shadow-md" />
            ) : (
              <div className="py-12">
                <span className="text-4xl block mb-2">📸</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Upload Ret-billede</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Hvad skal ændres?</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Fx: 'Tilføj mere dild på toppen', 'Gør baggrunden mørkere', 'Tilføj et retro filter'..."
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all font-bold text-slate-700 h-32"
            />
          </div>

          <button 
            onClick={handleEdit}
            disabled={isLoading || !selectedImage || !prompt}
            className="w-full py-4 bg-pink-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-pink-700 transition-all shadow-lg disabled:bg-slate-300"
          >
            {isLoading ? 'Redigerer billede...' : 'Udfør AI Redigering'}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-slate-100 rounded-2xl bg-slate-50 min-h-[400px]">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {editedImage && !isLoading && (
            <div className="p-4 text-center">
              <img src={editedImage} alt="Redigeret" className="max-h-[400px] rounded-xl shadow-2xl mb-4" />
              <p className="text-[10px] font-black uppercase text-pink-600 tracking-widest">AI Genereret Resultat</p>
              <a href={editedImage} download="redigeret_ret.png" className="inline-block mt-4 text-xs font-bold text-slate-500 underline">Download billede</a>
            </div>
          )}
          {!editedImage && !isLoading && !error && (
            <div className="text-slate-300 font-black uppercase text-xs tracking-widest">Resultat vises her</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
