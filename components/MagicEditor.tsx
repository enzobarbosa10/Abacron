import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, Wand2, Image as ImageIcon, Download, X, Loader2 } from 'lucide-react';
import { BRAND } from '../constants';

export function MagicEditor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mimeType, setMimeType] = useState<string>('image/png');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setMimeType(file.type);
        setGeneratedImage(null); // Reset generated image on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!originalImage || !prompt) return;

    setIsLoading(true);
    try {
      // Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Extract base64 data (remove "data:image/png;base64," prefix)
      const base64Data = originalImage.split(',')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      // Find the image part in the response
      let foundImage = false;
      const candidates = response.candidates;
      if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Response = part.inlineData.data;
            const newImageUrl = `data:image/png;base64,${base64Response}`;
            setGeneratedImage(newImageUrl);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        console.warn("No image found in response parts", response);
        // Fallback: check text if image wasn't generated
        alert("A IA processou o texto, mas não retornou uma imagem editada. Tente um prompt diferente.");
      }

    } catch (error) {
      console.error("Error generating image:", error);
      alert("Ocorreu um erro ao processar a imagem. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-100 rounded-full px-3 py-1 mb-4">
            <Wand2 className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">Beta Feature</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Editor Mágico de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Recibos & Documentos</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Use nossa IA para limpar comprovantes escuros, realçar textos ou destacar informações importantes apenas digitando.
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Input */}
            <div className="space-y-6">
              {/* Upload Area */}
              <div 
                className={`relative border-3 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center transition-all overflow-hidden bg-white ${
                  !originalImage ? 'border-slate-300 hover:border-purple-400 hover:bg-purple-50/30 cursor-pointer' : 'border-purple-200'
                }`}
                onClick={() => !originalImage && fileInputRef.current?.click()}
              >
                {originalImage ? (
                  <>
                    <img src={originalImage} alt="Original" className="h-full w-full object-contain p-2" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOriginalImage(null);
                        setGeneratedImage(null);
                      }}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm text-slate-500 hover:text-red-500 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-slate-900 font-bold">Clique para enviar imagem</p>
                    <p className="text-slate-500 text-sm mt-1">JPG ou PNG</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
              </div>

              {/* Prompt Input */}
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Aumente o contraste e deixe preto e branco..."
                  className="flex-1 px-4 py-3 outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleGenerate}
                  disabled={!originalImage || !prompt || isLoading}
                  className={`px-6 py-3 rounded-xl font-bold text-white shadow-md flex items-center gap-2 transition-all ${
                    !originalImage || !prompt || isLoading 
                      ? 'bg-slate-300 cursor-not-allowed' 
                      : 'hover:scale-105 active:scale-95'
                  }`}
                  style={!originalImage || !prompt || isLoading ? {} : { background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                  {isLoading ? 'Processando...' : 'Editar'}
                </button>
              </div>
            </div>

            {/* Right Column: Output */}
            <div className="h-full min-h-[320px] bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-700 shadow-inner">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              
              {generatedImage ? (
                <div className="relative w-full h-full flex flex-col">
                  <div className="flex-1 p-4 flex items-center justify-center">
                    <img src={generatedImage} alt="Gerada por IA" className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" />
                  </div>
                  <div className="bg-slate-800/80 backdrop-blur p-4 flex justify-between items-center border-t border-slate-700">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-purple-400" /> Editado por Gemini 2.5
                    </span>
                    <a 
                      href={generatedImage} 
                      download="abacron-edited.png"
                      className="text-white hover:text-purple-300 transition p-2"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 relative z-10 opacity-50">
                  <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 font-mono text-sm">O resultado da edição aparecerá aqui.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}