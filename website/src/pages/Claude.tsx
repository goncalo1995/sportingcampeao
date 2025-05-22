import React, { useState } from 'react';
import { Heart, Users, Clock, Euro, Target, Share2, Gift } from 'lucide-react';

const SportingFundraisingComponent = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  
  const totalGoal = 2950;
  const currentAmount = 847; // Simulado
  const percentage = Math.round((currentAmount / totalGoal) * 100);
  const remainingDays = 85;
  
  const donationOptions = [
    { amount: 10, description: "Um pequeno leão 🦁", impact: "Cada euro conta!" },
    { amount: 25, description: "Meio cachecol verde", impact: "Obrigado sportinguista!" },
    { amount: 50, description: "Uma camisola do coração", impact: "És um verdadeiro leão!" },
    { amount: 100, description: "Um lugar nas bancadas", impact: "Sporting no coração!" },
    { amount: 250, description: "Meio lugar de sócio", impact: "Leão de ouro!" }
  ];

  const handleDonation = (amount) => {
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  if (showThankYou) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-green-600 p-8 text-center">
          <Heart className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Obrigado, Leão! 🦁</h2>
          <p className="text-green-100">A tua generosidade aproxima-me do meu sonho sportinguista!</p>
        </div>
        <div className="p-6 text-center">
          <button 
            onClick={() => setShowThankYou(false)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-center relative">
        <div className="absolute top-4 right-4">
          <Share2 className="w-5 h-5 text-white opacity-80 cursor-pointer hover:opacity-100" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">SPORTING CAMPEÃO</h1>
        <p className="text-green-100 text-sm">Ajuda-me a garantir o meu lugar de Leão!</p>
      </div>

      {/* Story Section */}
      <div className="p-6 bg-gray-50">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-2xl">🦁</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">A Minha História</h3>
            <p className="text-sm text-gray-600">Sportinguista de coração</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sou sportinguista desde pequeno e sonho em ter o meu lugar cativo em Alvalade. 
          Um lugar de sócio custa <strong>€2.950 por 10 anos</strong>, mas sozinho não consigo. 
          <span className="text-green-600 font-medium"> Sem a vossa ajuda, vou continuar a ver os jogos pela TV</span>, 
          longe da magia do estádio que tanto amo.
        </p>
      </div>

      {/* Progress Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progresso</span>
          <span className="text-sm text-gray-600">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm mb-4">
          <div className="text-center">
            <div className="font-bold text-green-600">€{currentAmount}</div>
            <div className="text-gray-500 text-xs">arrecadados</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-800">€{totalGoal}</div>
            <div className="text-gray-500 text-xs">objetivo</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-orange-600">{remainingDays}</div>
            <div className="text-gray-500 text-xs">dias restantes</div>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-6">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-red-400 mr-2" />
            <p className="text-sm text-red-700">
              <strong>Urgente:</strong> Sem atingir o objetivo, perderei esta oportunidade única!
            </p>
          </div>
        </div>
      </div>

      {/* Donation Options */}
      <div className="p-6 pt-0">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Gift className="w-5 h-5 mr-2 text-green-600" />
          Escolhe o teu contributo
        </h3>
        
        <div className="space-y-3 mb-4">
          {donationOptions.map((option) => (
            <button
              key={option.amount}
              onClick={() => setSelectedAmount(option.amount)}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                selectedAmount === option.amount
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-green-600">€{option.amount}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {option.impact}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Outro valor (€)
          </label>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            placeholder="Introduz um valor"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Donation Button */}
        <button
          onClick={() => handleDonation(selectedAmount || customAmount)}
          disabled={!selectedAmount && !customAmount}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="flex items-center justify-center">
            <Euro className="w-5 h-5 mr-2" />
            {selectedAmount || customAmount ? 
              `Contribuir €${selectedAmount || customAmount}` : 
              'Seleciona um valor'
            }
          </div>
        </button>

        {/* Trust Elements */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 mb-2">
            🔒 Pagamento 100% seguro • 📱 Partilha com os teus amigos
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-400">
            <span>💳 Multibanco</span>
            <span>📱 MB Way</span>
            <span>💰 PayPal</span>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 p-4">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>34 sportinguistas já contribuíram</span>
        </div>
        <div className="text-center mt-2">
          <div className="flex justify-center -space-x-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-8 h-8 bg-green-100 rounded-full border-2 border-white flex items-center justify-center text-xs">
                🦁
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            "Força Sporting! Todos juntos por este sonho!" - João M.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SportingFundraisingComponent;