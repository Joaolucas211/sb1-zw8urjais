import React, { useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';

interface FixedExpense {
  id: number;
  description: string;
  amount: number;
  dueDay: number;
  category: string;
  status: 'active' | 'inactive';
}

const FIXED_EXPENSE_CATEGORIES = [
  { id: 'rent', label: 'Aluguel' },
  { id: 'utilities', label: 'Utilidades' },
  { id: 'salary', label: 'Salários' },
  { id: 'insurance', label: 'Seguros' },
  { id: 'subscription', label: 'Assinaturas' },
  { id: 'other', label: 'Outros' },
];

export function FixedExpenses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fixedExpenses] = useState<FixedExpense[]>([
    {
      id: 1,
      description: 'Aluguel do Escritório',
      amount: 2500,
      dueDay: 5,
      category: 'rent',
      status: 'active',
    },
    {
      id: 2,
      description: 'Internet',
      amount: 199.90,
      dueDay: 10,
      category: 'utilities',
      status: 'active',
    },
  ]);

  const getCategoryLabel = (categoryId: string) => {
    return FIXED_EXPENSE_CATEGORIES.find(cat => cat.id === categoryId)?.label || categoryId;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-600" />
          Despesas Fixas
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-5 w-5" /> Nova Despesa Fixa
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Descrição</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Categoria</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Valor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Dia Vencimento</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fixedExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {getCategoryLabel(expense.category)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(expense.amount)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">Dia {expense.dueDay}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    expense.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {expense.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Nova Despesa Fixa</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                  {FIXED_EXPENSE_CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dia do Vencimento</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500">
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}