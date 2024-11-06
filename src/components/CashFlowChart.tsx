import React from 'react';
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
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';

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

interface CashFlowChartProps {
  dateFilter: string;
}

export function CashFlowChart({ dateFilter }: CashFlowChartProps) {
  const { incomes, expenses } = useData();
  const { isDark } = useTheme();

  const getFilteredData = () => {
    const now = new Date();
    let startDate = new Date();
    
    switch (dateFilter) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    return {
      incomes: incomes.filter(i => new Date(i.date) >= startDate),
      expenses: expenses.filter(e => new Date(e.date) >= startDate)
    };
  };

  const getChartData = () => {
    const { incomes: filteredIncomes, expenses: filteredExpenses } = getFilteredData();
    const dataPoints: { [key: string]: { income: number; expense: number } } = {};

    // Inicializa os pontos de dados
    const numberOfPoints = dateFilter === 'week' ? 7 : 
                         dateFilter === 'month' ? 30 :
                         dateFilter === 'quarter' ? 12 : 12;

    for (let i = 0; i < numberOfPoints; i++) {
      const date = new Date();
      if (dateFilter === 'week') {
        date.setDate(date.getDate() - i);
      } else if (dateFilter === 'month') {
        date.setDate(date.getDate() - i);
      } else if (dateFilter === 'quarter') {
        date.setDate(1);
        date.setMonth(date.getMonth() - i);
      } else {
        date.setDate(1);
        date.setMonth(date.getMonth() - i);
      }
      
      const key = date.toLocaleDateString('pt-BR', {
        day: dateFilter === 'week' || dateFilter === 'month' ? 'numeric' : undefined,
        month: 'short',
        year: dateFilter === 'year' ? '2-digit' : undefined
      });
      
      dataPoints[key] = { income: 0, expense: 0 };
    }

    // Preenche os dados
    filteredIncomes.forEach(income => {
      const date = new Date(income.date);
      const key = date.toLocaleDateString('pt-BR', {
        day: dateFilter === 'week' || dateFilter === 'month' ? 'numeric' : undefined,
        month: 'short',
        year: dateFilter === 'year' ? '2-digit' : undefined
      });
      if (dataPoints[key]) {
        dataPoints[key].income += income.amount;
      }
    });

    filteredExpenses.forEach(expense => {
      const date = new Date(expense.date);
      const key = date.toLocaleDateString('pt-BR', {
        day: dateFilter === 'week' || dateFilter === 'month' ? 'numeric' : undefined,
        month: 'short',
        year: dateFilter === 'year' ? '2-digit' : undefined
      });
      if (dataPoints[key]) {
        dataPoints[key].expense += expense.amount;
      }
    });

    const sortedKeys = Object.keys(dataPoints).reverse();

    return {
      labels: sortedKeys,
      datasets: [
        {
          label: 'Receitas',
          data: sortedKeys.map(key => dataPoints[key].income),
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Despesas',
          data: sortedKeys.map(key => dataPoints[key].expense),
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Lucro',
          data: sortedKeys.map(key => dataPoints[key].income - dataPoints[key].expense),
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 12,
            weight: '500' as const,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#111827',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderColor: isDark ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
  };

  return <Line options={options} data={getChartData()} />;
}