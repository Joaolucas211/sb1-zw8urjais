import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LineChart, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { UserAvatar } from './UserAvatar';

export function Header() {
  const location = useLocation();
  const { signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-emerald-700 dark:bg-emerald-800' : '';
  };

  return (
    <header className="bg-emerald-600 dark:bg-emerald-700 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center p-4">
          <Link to="/" className="flex items-center gap-2">
            <LineChart className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Profit Line</h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-emerald-700 dark:hover:bg-emerald-800 rounded-lg transition-colors"
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <UserAvatar />
            
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 hover:bg-emerald-700 dark:hover:bg-emerald-800 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}