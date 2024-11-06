import React, { useState } from 'react';
import { TrendingUp, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { EditModal } from '../components/EditModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

export default function Income() {
  const { incomes, addIncome, updateIncome, deleteIncome } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fields = [
    { name: 'description', label: 'Descrição', type: 'text' },
    { name: 'amount', label: 'Valor', type: 'number' },
    { name: 'date', label: 'Data', type: 'date' },
    {
      name: 'category',
      label: 'Categoria',
      type: 'select',
      options: [
        { id: 'Vendas', label: 'Vendas' },
        { id: 'Serviços', label: 'Serviços' },
        { id: 'Investimentos', label: 'Investimentos' },
        { id: 'Outros', label: 'Outros' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { id: 'received', label: 'Recebido' },
        { id: 'pending', label: 'Pendente' },
        { id: 'overdue', label: 'Atrasado' },
      ],
    },
  ];

  const handleAdd = (data: any) => {
    addIncome(data);
    setIsModalOpen(false);
  };

  const handleEdit = (data: any) => {
    if (selectedIncome) {
      updateIncome(selectedIncome.id, data);
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedIncome) {
      deleteIncome(selectedIncome.id);
      setIsDeleteModalOpen(false);
    }
  };

  const filteredIncomes = incomes.filter(income =>
    income.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'received':
        return 'Recebido';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Atrasado';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          Receitas
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar receita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5" /> Nova Receita
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Descrição</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Valor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Categoria</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIncomes.map((income) => (
                <tr key={income.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{income.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(income.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(income.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{income.category}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(income.status)}`}>
                      {getStatusLabel(income.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedIncome(income);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-emerald-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedIncome(income);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAdd}
        data={{
          description: '',
          amount: '',
          date: '',
          category: 'Outros',
          status: 'pending',
        }}
        fields={fields}
        title="Nova Receita"
      />

      {selectedIncome && (
        <>
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEdit}
            data={selectedIncome}
            fields={fields}
            title="Editar Receita"
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            itemName={selectedIncome.description}
          />
        </>
      )}
    </div>
  );
}