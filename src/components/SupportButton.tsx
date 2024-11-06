import React from 'react';
import { MessageCircle } from 'lucide-react';

export function SupportButton() {
  const handleSupportClick = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Preciso de ajuda com o Profit Line.', '_blank');
  };

  return (
    <button
      onClick={handleSupportClick}
      className="fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 z-50"
      aria-label="Suporte via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}