import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

const tutorialSteps = [
  {
    title: 'Bem-vindo ao Profit Line!',
    description: 'Vamos te mostrar como aproveitar ao máximo nossa plataforma.',
    icon: '👋',
  },
  {
    title: 'Dashboard',
    description: 'Acompanhe seus principais indicadores e métricas em tempo real no painel principal.',
    icon: '📊',
  },
  {
    title: 'Gestão Financeira',
    description: 'Registre e acompanhe receitas, despesas e fluxo de caixa de forma simples e organizada.',
    icon: '💰',
  },
  {
    title: 'Gestão de Equipe',
    description: 'Gerencie funcionários, tarefas e acompanhe o desempenho da sua equipe.',
    icon: '👥',
  },
];

export function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setIsOpen(true);
      localStorage.setItem('hasSeenTutorial', 'true');
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen || !showTutorial) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 relative animate-fadeIn">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{tutorialSteps[currentStep].icon}</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {tutorialSteps[currentStep].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {tutorialSteps[currentStep].description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Anterior
          </button>

          <div className="flex gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-emerald-600 dark:bg-emerald-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
          >
            {currentStep === tutorialSteps.length - 1 ? 'Começar' : 'Próximo'}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}