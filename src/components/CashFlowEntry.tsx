import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export function CashFlowEntry() {
  const [isOpen, setIsOpen] = useState(false);
  const [entry, setEntry] = useState({ type: 'income', description: '', value: '', date: '' });

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
      >
        <Plus className="h-5 w-5" /> Novo Lançamento
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative animate-fadeIn">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Novo Lançamento</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={entry.type}
                  onChange={(e) => setEntry({ ...entry, type: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input
                  type="text"
                  value={entry.description}
                  onChange={(e) => setEntry({ ...entry, description: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                <input
                  type="number"
                  value={entry.value}
                  onChange={(e) => setEntry({ ...entry, value: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => setEntry({ ...entry, date: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}