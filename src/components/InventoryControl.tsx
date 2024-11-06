import React, { useState } from 'react';
import { Package, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { EditModal } from './EditModal';

interface Product {
  id: number;
  name: string;
  quantity: number;
  minStock: number;
  price: number;
  status: string;
}

export function InventoryControl() {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = (data: Omit<Product, 'id'>) => {
    addProduct(data);
    setIsAddModalOpen(false);
  };

  const handleEdit = (data: Product) => {
    updateProduct(data.id, data);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setIsDeleteModalOpen(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Nome do Produto', type: 'text' },
    { name: 'quantity', label: 'Quantidade', type: 'number' },
    { name: 'minStock', label: 'Estoque Mínimo', type: 'number' },
    { name: 'price', label: 'Preço', type: 'number' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { id: 'Em estoque', label: 'Em estoque' },
        { id: 'Estoque baixo', label: 'Estoque baixo' },
      ],
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="h-5 w-5 text-emerald-600" />
          Controle de Estoque
        </h2>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5" /> Novo Produto
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Produto</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantidade</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Estoque Mínimo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Preço</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.minStock}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.price)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'Em estoque'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditModalOpen(true);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-emerald-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
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

      <EditModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        data={{
          name: '',
          quantity: 0,
          minStock: 0,
          price: 0,
          status: 'Em estoque',
        }}
        fields={fields}
        title="Novo Produto"
      />

      {selectedProduct && (
        <>
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEdit}
            data={selectedProduct}
            fields={fields}
            title="Editar Produto"
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            itemName={selectedProduct.name}
          />
        </>
      )}
    </div>
  );
}