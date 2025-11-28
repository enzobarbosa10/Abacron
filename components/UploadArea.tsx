import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertTriangle, Loader2 } from 'lucide-react';
import { parseCSV } from '../utils/finance';
import { Transaction } from '../types';

interface UploadAreaProps {
  onUploadSuccess: (transactions: Transaction[]) => void;
  onCancel: () => void;
}

export function UploadArea({ onUploadSuccess, onCancel }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    // Validação básica
    if (file.size > 10 * 1024 * 1024) { // 10MB
      setError("O arquivo é muito grande (Máx 10MB).");
      setIsProcessing(false);
      return;
    }

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
       setError("Por favor, envie um arquivo .CSV ou .TXT válido.");
       setIsProcessing(false);
       return;
    }

    try {
      const data = await parseCSV(file);
      if (data.length === 0) {
        setError("Não encontramos transações válidas neste arquivo.");
      } else {
        // Simular delay de "Inteligência Artificial"
        setTimeout(() => {
          onUploadSuccess(data);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao processar o arquivo. Verifique se o formato está correto.");
    } finally {
      if (error) setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl relative">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">Fechar</button>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Importar Transações</h2>
        <p className="text-slate-600 mb-8">Faça upload do seu extrato bancário (Nubank, Inter, Itaú) em formato CSV.</p>

        <div 
          className={`border-3 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center transition-all ${
            isDragging ? 'border-purple-500 bg-purple-50 scale-[1.02]' : 'border-slate-300 hover:border-purple-400 hover:bg-slate-50'
          } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {isProcessing ? (
             <div className="text-center">
               <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
               <p className="font-bold text-purple-900">Processando com IA...</p>
               <p className="text-sm text-purple-600 mt-1">Categorizando transações</p>
             </div>
          ) : (
             <>
               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                 <Upload className="w-8 h-8" />
               </div>
               <p className="text-lg font-bold text-slate-700">Arraste seu arquivo aqui</p>
               <p className="text-slate-400 text-sm mb-6">ou clique para selecionar</p>
               
               <label className="px-6 py-2 bg-white border border-slate-300 rounded-full font-medium text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer transition">
                 Selecionar Arquivo
                 <input type="file" className="hidden" accept=".csv,.txt" onChange={handleFileSelect} />
               </label>
             </>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-between items-center text-xs text-slate-400">
           <span>Formatos: .CSV, .TXT (Max 10MB)</span>
           <span>Processamento Seguro & Local 🔒</span>
        </div>
      </div>
    </div>
  );
}