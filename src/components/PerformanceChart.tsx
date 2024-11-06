import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Calendar as CalendarIcon } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const generateMonthlyData = (months: number) => {
  const labels = [];
  const revenue = [];
  const expenses = [];
  const profit = [];

  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    labels.unshift(date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }));
    
    const monthRevenue = Math.floor(Math.random() * 50000) + 50000;
    const monthExpenses = Math.floor(Math.random() * 30000) + 20000;
    
    revenue.unshift(monthRevenue);
    expenses.unshift(monthExpenses);
    profit.unshift(monthRevenue - monthExpenses);
  }

  return { labels, revenue, expenses, profit };
};

export function PerformanceChart() {
  const [period, setPeriod] = useState('6');
  const { labels, revenue, expenses, profit } = generateMonthlyData(Number(period));

  const data = {
    labels,
    datasets: [
      {
        label: 'Receita',
        data: revenue,
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: expenses,
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Lucro',
        data: profit,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Desempenho da Empresa</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="3">Últimos 3 meses</option>
              <option value="6">Últimos 6 meses</option>
              <option value="12">Último ano</option>
            </select>
          </div>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}