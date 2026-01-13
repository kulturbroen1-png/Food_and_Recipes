
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Volume2, History, X, Sparkles, Wand2, ShieldCheck, Save, FolderOpen, Trash2 } from 'lucide-react';
import { MASTER_CHECKLIST } from '../services/instructionManifest';

// Helper functions for manual encoding and decoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const KitchenAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcriptionHistory, setTranscriptionHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [currentTranscription, setCurrentTranscription] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [savedConversations, setSavedConversations] = useState<{ id: string, title: string, history: { role: 'user' | 'ai', text: string }[], timestamp: Date }[]>([]);
  const [showSavedConversations, setShowSavedConversations] = useState(false);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  // Load saved conversations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kitchen-assistant-conversations');
    if (saved) {
      try {
        const conversations = JSON.parse(saved).map((conv: any) => ({
          ...conv,
          timestamp: new Date(conv.timestamp)
        }));
        setSavedConversations(conversations);
      } catch (err) {
        console.error('Failed to load saved conversations:', err);
      }
    }
  }, []);

  // Save conversations to localStorage when they change
  useEffect(() => {
    localStorage.setItem('kitchen-assistant-conversations', JSON.stringify(savedConversations));
  }, [savedConversations]);

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsActive(false);
    setAudioLevel(0);
  };

  const startSession = async () => {
    try {
      setIsActive(true);
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const inputContext = new AudioContext({ sampleRate: 16000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `Du er Ashis Gautam, Executive HeadChef for Breelteparken.
          VIGTIGT: Din førsteprioritet er at levere specifikke, handlingsorienterede instruktioner og visuelle markører for succes jf. MDS Master Kontrakten.

          KRAV TIL DINE SVAR:
          1. ACTIONABLE COMMANDS: Brug korte, præcise ordrer (fx "Montér med koldt smør nu", "Sigt bouillonen gennem et fint saucenet"). Ingen "snak" – kun handling.
          2. VISUAL CUES: Beskriv præcis hvordan resultatet skal se ud (fx "Saucen skal drapere bagsiden af en ske", "Mosen skal have en blank overflade og stå i toppe").
          3. TEKSTUR-DIKTAT: Du skal håndhæve reglen: "${MASTER_CHECKLIST.UGERYTME_KONTRAKT.TEKSTUR_REGEL}". Intet må forlade køkkenet uden at være blødt og let at tygge.
          4. PLATING & ÆSTETIK: Giv altid tips til anretning der vækker appetitten hos småtspisende (fx "Anret i små, høje komponenter", "Placer proteinet som centrum i saucen").
          5. MDS VALIDERING: Alt hvad du siger skal matche Master Checklist: ${JSON.stringify(MASTER_CHECKLIST)}.

          NYHED: Brug altid egne fonde (ID 10001/10002) og Broken Gel (ID 210599).

          Hvis opskriften mangler, sig: "Denne komponent mangler i MDS – kontakt Chef Ashis Gautam".
          Brug fagudtryk: 'blæstkøler', 'stik', 'GN-kantiner', 'emulgering', 'legering'. Vær autoritær, professionel og fokuseret på kvalitet.`,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            const source = inputContext.createMediaStreamSource(stream);
            const scriptProcessor = inputContext.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
              setAudioLevel(Math.sqrt(sum / inputData.length) * 100);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmData = new Uint8Array(int16.buffer);
              const base64 = encode(pcmData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputContext.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.outputTranscription) {
              const text = msg.serverContent.outputTranscription.text;
              setCurrentTranscription(prev => prev + text);
            }
            if (msg.serverContent?.turnComplete) {
              setTranscriptionHistory(prev => [...prev, { role: 'ai', text: msg.serverContent?.outputTranscription?.text || '' }]);
              setCurrentTranscription('');
            }
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const ctx = audioContextRef.current;
              const bytes = decode(base64Audio);
              const buffer = await decodeAudioData(bytes, ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
          },
          onerror: (e) => console.error('Live Error:', e),
          onclose: () => setIsActive(false),
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsActive(false);
    }
  };

  const saveConversation = () => {
    if (transcriptionHistory.length === 0) return;

    const title = transcriptionHistory[0]?.text.slice(0, 50) + (transcriptionHistory[0]?.text.length > 50 ? '...' : '') || 'Untitled Conversation';
    const id = Date.now().toString();
    const newConversation = {
      id,
      title,
      history: [...transcriptionHistory],
      timestamp: new Date()
    };

    setSavedConversations(prev => [newConversation, ...prev]);
  };

  const loadConversation = (conversation: { id: string, title: string, history: { role: 'user' | 'ai', text: string }[], timestamp: Date }) => {
    setTranscriptionHistory(conversation.history);
    setShowSavedConversations(false);
  };

  const deleteConversation = (id: string) => {
    setSavedConversations(prev => prev.filter(conv => conv.id !== id));
  };

  return (
    <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-[12px] border-orange-500 min-h-[600px] flex flex-col">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <ShieldCheck size={240} />
      </div>

      <div className="relative z-10 flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-orange-500 animate-ping' : 'bg-slate-600'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Breelteparken Command Center</span>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Chef Gautam Assistent</h2>
          <p className="text-slate-400 font-serif italic mt-2 text-lg">"Handlingsorienteret produktionstøtte & Tekstur-kontrol."</p>
        </div>
        <button
          onClick={isActive ? stopSession : startSession}
          className={`p-8 rounded-[2.5rem] transition-all shadow-2xl ${isActive ? 'bg-red-600 scale-110' : 'bg-orange-600 hover:bg-orange-50'}`}
        >
          {isActive ? <MicOff size={40} /> : <Mic size={40} />}
        </button>
      </div>

      <div className="flex-1 bg-black/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 flex flex-col gap-6 overflow-hidden">
        {!isActive && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Sparkles className="text-orange-500" size={48} />
            <p className="font-black uppercase text-xs tracking-widest">Klar til instrukser baseret på den komplette database</p>
            <p className="text-[10px] font-bold text-slate-500 max-w-xs uppercase">Spørg om specifikke trin, visuelle cues og anretning.</p>
          </div>
        )}

        {isActive && (
          <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar space-y-4 pr-4">
            {transcriptionHistory.map((t, i) => (
              <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-bold ${t.role === 'user' ? 'bg-slate-800 text-slate-300' : 'bg-orange-600/20 text-orange-400 border border-orange-500/20'}`}>
                  <span className="block text-[8px] opacity-50 mb-1">{t.role === 'user' ? 'KOK' : 'CHEF GAUTAM AI'}</span>
                  {t.text}
                </div>
              </div>
            ))}
            {currentTranscription && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-4 rounded-2xl text-xs font-bold bg-orange-600/20 text-orange-400 border border-orange-500/20 italic">
                  {currentTranscription}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Saved Conversations Modal */}
      {showSavedConversations && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-orange-500/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Gemte Samtaler</h3>
              <button onClick={() => setShowSavedConversations(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            {savedConversations.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Ingen gemte samtaler endnu</p>
            ) : (
              <div className="space-y-4">
                {savedConversations.map((conv) => (
                  <div key={conv.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-sm">{conv.title}</h4>
                        <p className="text-slate-400 text-xs">{conv.timestamp.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadConversation(conv)}
                          className="bg-blue-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
                        >
                          Indlæs
                        </button>
                        <button
                          onClick={() => deleteConversation(conv.id)}
                          className="bg-red-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-4 no-print">
        <div className="flex-1 bg-slate-800/50 p-4 rounded-2xl flex items-center gap-4 border border-slate-700">
          <Volume2 className="text-orange-500" size={16} />
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Live Audio Stream: 24kHz / 16-bit PCM</span>
        </div>
        <button
          onClick={saveConversation}
          disabled={transcriptionHistory.length === 0}
          className="bg-green-600 p-4 rounded-2xl text-white hover:bg-green-700 transition-colors disabled:bg-slate-700 disabled:text-slate-500"
          title="Gem samtale"
        >
          <Save size={20} />
        </button>
        <button
          onClick={() => setShowSavedConversations(true)}
          className="bg-blue-600 p-4 rounded-2xl text-white hover:bg-blue-700 transition-colors"
          title="Indlæs gemte samtaler"
        >
          <FolderOpen size={20} />
        </button>
        <button onClick={() => setTranscriptionHistory([])} className="bg-slate-800 p-4 rounded-2xl text-slate-400 hover:text-white transition-colors" title="Ryd samtale">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default KitchenAssistant;
