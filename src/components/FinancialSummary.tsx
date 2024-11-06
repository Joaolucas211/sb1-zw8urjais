import React from 'react';
import { RevenueExpenseChart } from './RevenueExpenseChart';
import { useData } from '../contexts/DataContext';

export function FinancialSummary() {
  const { expenses, incomes } = useData();

  // Agrupa despesas por categoria
  const expensesByCategory = expenses.reduce((acc: { [key: string]: number }, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Agrupa receitas por categoria
  const incomesByCategory = incomes.reduce((acc: { [key: string]: number }, income) => {
    acc[income.category] = (acc[income.category] || 0) + income.amount;
    return acc;
  }, {});

  const expenseData = {
    labels: Object.keys(expensesByCategory),
    values: Object.values(expensesByCategory),
    type: 'expense' as const,
  };

  const incomeData = {
    labels: Object.keys(incomesByCategory),
    values: Object.values(incomesByCategory),
    type: 'income' as const,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Distribuição de Receitas
        </h3>
        <div className="h-[300px]">
          <RevenueExpenseChart data={incomeData} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Distribuição de Despesas
        </h3>
        <div className="h-[300px]">
          <RevenueExpenseChart data={expenseData} />
        </div>
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Comparativo Mensal
        </h3>
        <div className="h-[300px]">
          <RevenueExpenseChart 
            data={{
              labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
              values: [65000, 59000, 80000, 81000, 56000, 75000],
              type: 'income',
            }}
            chartType="bar"
          />
        </div>
      </div>
    </div>
  );
}