import React, { useState } from 'react';
import { User, Building2, Mail, Phone, MapPin, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Perfil</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Edit2 className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Nome
              </label>
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {user?.displayName || 'Nome não definido'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Email
              </label>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Mail className="h-4 w-4 text-gray-400" />
                {user?.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Empresa
              </label>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Building2 className="h-4 w-4 text-gray-400" />
                {user?.companyName || 'Empresa não definida'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Telefone
              </label>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Phone className="h-4 w-4 text-gray-400" />
                {user?.phone || 'Telefone não definido'}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Endereço
              </label>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <MapPin className="h-4 w-4 text-gray-400" />
                {user?.address || 'Endereço não definido'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}