import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { EditModal } from '../components/EditModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

export default function Employees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fields = [
    { name: 'name', label: 'Nome Completo', type: 'text' },
    { name: 'position', label: 'Cargo', type: 'text' },
    { name: 'department', label: 'Departamento', type: 'select', options: [
      { id: 'administrative', label: 'Administrativo' },
      { id: 'financial', label: 'Financeiro' },
      { id: 'commercial', label: 'Comercial' },
      { id: 'operations', label: 'Operacional' },
      { id: 'hr', label: 'Recursos Humanos' },
    ]},
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Telefone', type: 'tel' },
    { name: 'startDate', label: 'Data de Admissão', type: 'date' },
    { name: 'salary', label: 'Salário', type: 'number' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { id: 'active', label: 'Ativo' },
      { id: 'vacation', label: 'Em Férias' },
      { id: 'leave', label: 'Licença' },
      { id: 'inactive', label: 'Inativo' },
    ]},
  ];

  const handleAdd = (data: any) => {
    addEmployee(data);
    setIsModalOpen(false);
  };

  const handleEdit = (data: any) => {
    if (selectedEmployee) {
      updateEmployee(selectedEmployee.id, data);
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee.id);
      setIsDeleteModalOpen(false);
    }
  };

  const filteredEmployees = employees?.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'vacation':
        return 'bg-blue-100 text-blue-800';
      case 'leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'vacation':
        return 'Em Férias';
      case 'leave':
        return 'Licença';
      case 'inactive':
        return 'Inativo';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-emerald-600" />
          Funcionários
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar funcionário..."
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
            <Plus className="h-5 w-5" /> Novo Funcionário
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50 dark:bg-emerald-900/20">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Cargo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Departamento</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Admissão</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{employee.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{employee.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{employee.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{employee.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {new Date(employee.startDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {getStatusLabel(employee.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-red-600"
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
          name: '',
          position: '',
          department: '',
          email: '',
          phone: '',
          startDate: '',
          salary: '',
          status: 'active',
        }}
        fields={fields}
        title="Novo Funcionário"
      />

      {selectedEmployee && (
        <>
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEdit}
            data={selectedEmployee}
            fields={fields}
            title="Editar Funcionário"
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            itemName={selectedEmployee.name}
          />
        </>
      )}
    </div>
  );
}