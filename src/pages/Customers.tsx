import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, Download } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { EditModal } from '../components/EditModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Ativo' | 'Inativo';
  type: 'Pessoa Física' | 'Pessoa Jurídica';
  document: string;
  lastPurchase?: string;
}

export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fields = [
    { name: 'name', label: 'Nome', type: 'text' },
    { name: 'type', label: 'Tipo', type: 'select', options: [
      { id: 'Pessoa Física', label: 'Pessoa Física' },
      { id: 'Pessoa Jurídica', label: 'Pessoa Jurídica' },
    ]},
    { name: 'document', label: 'Documento', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Telefone', type: 'tel' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { id: 'Ativo', label: 'Ativo' },
      { id: 'Inativo', label: 'Inativo' },
    ]},
  ];

  const handleAdd = (data: Omit<Customer, 'id'>) => {
    addCustomer({
      ...data,
      id: Date.now(),
      lastPurchase: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(false);
  };

  const handleEdit = (data: Partial<Customer>) => {
    if (selectedCustomer) {
      updateCustomer(selectedCustomer.id, data);
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedCustomer) {
      deleteCustomer(selectedCustomer.id);
      setIsDeleteModalOpen(false);
    }
  };

  const handleExport = () => {
    if (!customers?.length) return;

    const data = customers.map(customer => ({
      Nome: customer.name,
      Tipo: customer.type,
      Documento: customer.document,
      Email: customer.email,
      Telefone: customer.phone,
      Status: customer.status,
      'Última Compra': customer.lastPurchase ? new Date(customer.lastPurchase).toLocaleDateString('pt-BR') : 'N/A',
    }));

    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(data[0]).join(";") + "\n" +
      data.map(row => Object.values(row).join(";")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clientes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCustomers = customers?.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.document.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-emerald-600" />
          Clientes
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button
            onClick={handleExport}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Download className="h-5 w-5" /> Exportar
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5" /> Novo Cliente
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50 dark:bg-emerald-900/20">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Tipo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Documento</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Telefone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Última Compra</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{customer.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{customer.document}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'Ativo'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {customer.lastPurchase && new Date(customer.lastPurchase).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
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
          type: 'Pessoa Física',
          document: '',
          email: '',
          phone: '',
          status: 'Ativo',
        }}
        fields={fields}
        title="Novo Cliente"
      />

      {selectedCustomer && (
        <>
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEdit}
            data={selectedCustomer}
            fields={fields}
            title="Editar Cliente"
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            itemName={selectedCustomer.name}
          />
        </>
      )}
    </div>
  );
}