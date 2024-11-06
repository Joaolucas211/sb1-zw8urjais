import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useTheme } from '../contexts/ThemeContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface ChartData {
  labels: string[];
  values: number[];
  type: 'expense' | 'income';
}

interface RevenueExpenseChartProps {
  data: ChartData;
  chartType?: 'doughnut' | 'bar';
}

export function RevenueExpenseChart({ data, chartType = 'doughnut' }: RevenueExpenseChartProps) {
  const { isDark } = useTheme();

  const colors = {
    income: [
      'rgba(5, 150, 105, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(52, 211, 153, 0.8)',
      'rgba(110, 231, 183, 0.8)',
      'rgba(167, 243, 208, 0.8)',
    ],
    expense: [
      'rgba(220, 38, 38, 0.8)',
      'rgba(239, 68, 68, 0.8)',
      'rgba(248, 113, 113, 0.8)',
      'rgba(252, 165, 165, 0.8)',
      'rgba(254, 202, 202, 0.8)',
    ],
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: colors[data.type],
        borderColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
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
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%',
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const barOptions = {
    ...options,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          callback: function(value: any) {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      {chartType === 'doughnut' ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={barOptions} />
      )}
    </div>
  );
}