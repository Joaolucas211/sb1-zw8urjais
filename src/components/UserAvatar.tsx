import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function UserAvatar() {
  const { user } = useAuth();

  return (
    <div className="relative group">
      <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'Profile'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
            <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        )}
      </button>
      
      <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user?.displayName || 'Usuário'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {user?.email}
          </p>
        </div>
        <a
          href="/settings"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Configurações
        </a>
      </div>
    </div>
  );
}