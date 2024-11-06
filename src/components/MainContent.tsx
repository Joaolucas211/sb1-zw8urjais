import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Customers from '../pages/Customers';
import Calendar from '../pages/Calendar';
import Settings from '../pages/Settings';
import NewProduct from '../pages/NewProduct';
import Expenses from '../pages/Expenses';
import Income from '../pages/Income';
import Tasks from '../pages/Tasks';
import Employees from '../pages/Employees';

export function MainContent() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/income" element={<Income />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </div>
    </main>
  );
}