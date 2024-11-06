import React, { useState } from 'react';
import { DollarSign, TrendingUp, Package, Users, Calendar, AlertTriangle, CheckSquare2, Filter, Download } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { CashFlowChart } from '../components/CashFlowChart';
import { DetailedReport } from '../components/DetailedReport';
import { FinancialSummary } from '../components/FinancialSummary';
import { useData } from '../contexts/DataContext';

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState('month');
  const { expenses, incomes, products, tasks } = useData();

  // Cálculos para os cards principais
  const totalRevenue = incomes.reduce((sum, income) => 
    income.status === 'received' ? sum + income.amount : sum, 0);
  
  const totalExpenses = expenses.reduce((sum, expense) => 
    expense.status === 'paid' ? sum + expense.amount : sum, 0);

  const lowStockProducts = products.filter(p => p.quantity <= p.minStock).length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Receita Total"
          value={new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalRevenue)}
          change="+15.3%"
          trend="up"
          icon={TrendingUp}
        />
        <StatsCard
          title="Despesas Totais"
          value={new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalExpenses)}
          change="-8.4%"
          trend="down"
          icon={DollarSign}
        />
        <StatsCard
          title="Produtos em Baixa"
          value={lowStockProducts.toString()}
          change={`${((lowStockProducts / products.length) * 100).toFixed(1)}%`}
          trend="down"
          icon={Package}
        />
        <StatsCard
          title="Tarefas Concluídas"
          value={completedTasks.toString()}
          change={`${((completedTasks / tasks.length) * 100).toFixed(1)}%`}
          trend="up"
          icon={CheckSquare2}
        />
      </div>

      {/* Relatório Detalhado */}
      <DetailedReport />

      {/* Gráfico de Fluxo de Caixa */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Relatório Geral</h2>
          
          <div className="flex items-center gap-4">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Ano</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        <div className="h-[400px]">
          <CashFlowChart dateFilter={dateFilter} />
        </div>
      </div>

      {/* Resumo Financeiro */}
      <FinancialSummary />
    </div>
  );
}