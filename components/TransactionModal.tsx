import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Tag, FileText, Calendar, DollarSign } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/finance';

interface TransactionModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTransaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const CATEGORIES = [
  'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 
  'Educação', 'Compras', 'Viagem', 'Serviços', 'Receita', 'Outros'
];

export function TransactionModal({ transaction, isOpen, onClose, onSave, onDelete }: TransactionModalProps) {
  const [editedTrans, setEditedTrans] = useState<Transaction | null>(null);

  useEffect(() => {
    setEditedTrans(transaction);
  }, [transaction]);

  if (!isOpen || !editedTrans) return null;

  const handleSave = () => {
    if (editedTrans) {
      onSave(editedTrans);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className={`p-6 ${editedTrans.type === 'income' ? 'bg-green-50' : 'bg-red-50'} flex justify-between items-start`}>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Detalhes da Transação</h2>
            <p className="text-sm text-slate-500">ID: {editedTrans.id.slice(0, 8)}...</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/50 hover:bg-white rounded-full transition">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Amount & Desc */}
          <div className="text-center">
            <div className={`text-3xl font-bold mb-1 ${editedTrans.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
              {editedTrans.type === 'expense' ? '- ' : '+ '}{formatCurrency(Math.abs(editedTrans.amount))}
            </div>
            <input 
              type="text" 
              value={editedTrans.description}
              onChange={e => setEditedTrans({...editedTrans, description: e.target.value})}
              className="text-center w-full text-slate-600 font-medium border-b border-transparent hover:border-slate-300 focus:border-purple-500 outline-none bg-transparent transition"
            />
          </div>

          {/* Fields */}
          <div className="space-y-4">
            
            {/* Date */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Calendar className="w-5 h-5 text-slate-400" />
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-400 uppercase">Data</label>
                <input 
                  type="date" 
                  value={editedTrans.date}
                  onChange={e => setEditedTrans({...editedTrans, date: e.target.value})}
                  className="w-full bg-transparent outline-none text-slate-700 font-medium"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Tag className="w-5 h-5 text-slate-400" />
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-400 uppercase">Categoria</label>
                <select 
                  value={editedTrans.category}
                  onChange={e => setEditedTrans({...editedTrans, category: e.target.value})}
                  className="w-full bg-transparent outline-none text-slate-700 font-medium appearance-none cursor-pointer"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <FileText className="w-5 h-5 text-slate-400 mt-1" />
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Anotações</label>
                <textarea 
                  value={editedTrans.notes || ''}
                  onChange={e => setEditedTrans({...editedTrans, notes: e.target.value})}
                  placeholder="Adicione uma nota..."
                  className="w-full bg-transparent outline-none text-slate-700 text-sm min-h-[60px] resize-none"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex gap-3">
          <button 
            onClick={() => { onDelete(editedTrans.id); onClose(); }}
            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
            title="Excluir"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-200 transition flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" /> Salvar Alterações
          </button>
        </div>

      </div>
    </div>
  );
}
