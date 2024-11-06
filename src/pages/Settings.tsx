import React from 'react';
import { Settings as SettingsIcon, Moon, Sun, HelpCircle, Bell, Shield, User, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { UserProfile } from '../components/UserProfile';

export default function Settings() {
  const { signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <SettingsIcon className="h-6 w-6 text-emerald-600" />
        Configurações
      </h1>

      <UserProfile />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-600" />
            Preferências
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Moon className="h-5 w-5 text-emerald-600" />
                ) : (
                  <Sun className="h-5 w-5 text-emerald-600" />
                )}
                <span className="text-gray-700 dark:text-gray-200">Modo Escuro</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 dark:text-gray-200">Notificações</span>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600"
              >
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            Segurança
          </h2>
          
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-200">Alterar Senha</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-200">Autenticação em Dois Fatores</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button 
              onClick={() => signOut()}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-between text-red-600"
            >
              <span>Sair da Conta</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-emerald-600" />
            Suporte
          </h2>
          
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-200">Central de Ajuda</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-200">Contatar Suporte</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-200">Reportar Problema</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Sobre</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>Profit Line v1.0.0</p>
            <p>© 2024 Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
}