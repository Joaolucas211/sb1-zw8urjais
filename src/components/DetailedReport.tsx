import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export function DetailedReport() {
  const { expenses, incomes, products, customers } = useData();

  // Cálculos para o relatório detalhado
  const totalRevenue = incomes.reduce((sum, income) => 
    income.status === 'received' ? sum + income.amount : sum, 0);
  
  const totalExpenses = expenses.reduce((sum, expense) => 
    expense.status === 'paid' ? sum + expense.amount : sum, 0);

  const profit = totalRevenue - totalExpenses;
  const profitMargin = (profit / totalRevenue) * 100;

  const pendingRevenue = incomes.reduce((sum, income) => 
    income.status === 'pending' ? sum + income.amount : sum, 0);

  const pendingExpenses = expenses.reduce((sum, expense) => 
    expense.status === 'pending' ? sum + expense.amount : sum, 0);

  const metrics = [
    {
      title: 'Lucro Líquido',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(profit),
      change: `${profitMargin.toFixed(1)}%`,
      trend: profit > 0 ? 'up' : 'down',
      icon: profit > 0 ? TrendingUp : TrendingDown,
      color: profit > 0 ? 'emerald' : 'red',
    },
    {
      title: 'Receitas Pendentes',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(pendingRevenue),
      change: `${((pendingRevenue / totalRevenue) * 100).toFixed(1)}%`,
      trend: 'up',
      icon: DollarSign,
      color: 'yellow',
    },
    {
      title: 'Despesas Pendentes',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(pendingExpenses),
      change: `${((pendingExpenses / totalExpenses) * 100).toFixed(1)}%`,
      trend: 'down',
      icon: DollarSign,
      color: 'red',
    },
    {
      title: 'Produtos em Baixa',
      value: products.filter(p => p.quantity <= p.minStock).length.toString(),
      change: 'do estoque',
      trend: 'down',
      icon: Package,
      color: 'orange',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-${metric.color}-100 dark:border-${metric.color}-900 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-${metric.color}-600 dark:text-${metric.color}-400 text-sm font-medium`}>
                {metric.title}
              </p>
              <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {metric.value}
              </h3>
              <p className={`text-sm mt-1 ${
                metric.trend === 'up' 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.change} {metric.trend === 'up' ? '↑' : '↓'}
              </p>
            </div>
            <div className={`bg-${metric.color}-100 dark:bg-${metric.color}-900/30 p-3 rounded-lg`}>
              <metric.icon className={`h-6 w-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}