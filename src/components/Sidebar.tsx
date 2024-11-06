import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  Package,
  Calendar,
  ChevronRight,
  Menu,
  DollarSign,
  TrendingUp,
  LineChart,
  UserSquare2,
  X,
} from 'lucide-react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Clientes', path: '/customers' },
    { icon: Package, label: 'Produtos', path: '/products' },
    { icon: DollarSign, label: 'Despesas', path: '/expenses' },
    { icon: TrendingUp, label: 'Receitas', path: '/income' },
    { icon: UserSquare2, label: 'Funcionários', path: '/employees' },
    { icon: Calendar, label: 'Agenda', path: '/calendar' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ];

  const MobileMenu = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
      isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LineChart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 text-transparent bg-clip-text">
              Profit Line
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-300
                  hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400
                  ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium' : ''}
                  transition-colors duration-200
                `}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <MobileMenu />

      <div className={`hidden md:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <LineChart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 text-transparent bg-clip-text">
                Profit Line
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-300
                  hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400
                  ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium' : ''}
                  ${isCollapsed ? 'justify-center' : ''}
                  transition-colors duration-200
                `}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}