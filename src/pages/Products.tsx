import React, { useState } from 'react';
import { Package, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Products() {
  const [products] = useState([
    { id: 1, name: 'Produto A', quantity: 150, minStock: 50, price: 'R$ 29,90', status: 'Em estoque', category: 'Eletrônicos' },
    { id: 2, name: 'Produto B', quantity: 75, minStock: 30, price: 'R$ 49,90', status: 'Em estoque', category: 'Acessórios' },
    { id: 3, name: 'Produto C', quantity: 25, minStock: 40, price: 'R$ 99,90', status: 'Estoque baixo', category: 'Vestuário' },
    { id: 4, name: 'Produto D', quantity: 200, minStock: 100, price: 'R$ 19,90', status: 'Em estoque', category: 'Papelaria' },
    { id: 5, name: 'Produto E', quantity: 15, minStock: 25, price: 'R$ 159,90', status: 'Estoque baixo', category: 'Eletrônicos' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="h-6 w-6 text-emerald-600" />
          Produtos
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produto..."
              className="pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <Link
            to="/products/new"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5" /> Novo Produto
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Produto</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Categoria</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantidade</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Estoque Mínimo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Preço</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.minStock}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Em estoque' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-emerald-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600">
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
    </div>
  );
}