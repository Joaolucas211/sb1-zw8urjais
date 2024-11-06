import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Tutorial } from './components/Tutorial';
import { SupportButton } from './components/SupportButton';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './pages/Login';

// Mudando para export default
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/*"
                  element={
                    <PrivateRoute>
                      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
                        <Sidebar />
                        <MainContent />
                      </div>
                      <Tutorial />
                      <SupportButton />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}