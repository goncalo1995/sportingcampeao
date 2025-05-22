
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { HandCoins, Trophy } from 'lucide-react';

interface ProgressBarProps {
  currentAmount: number;
  targetAmount: number;
  donorsCount: number;
  maxSeats?: number;
  deadline?: string;
}

const ProgressBar = ({ 
  currentAmount, 
  targetAmount, 
  donorsCount, 
  maxSeats = 5, 
  deadline = "30 de junho de 2025" 
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const seatPrice = targetAmount; // Price per seat
  const totalTargetAmount = seatPrice * maxSeats; // Maximum fundraising goal
  
  const currentDate = new Date();
  const deadlineDate = new Date(2025, 5, 30); // June 30, 2025
  const isBeforeDeadline = currentDate < deadlineDate;
  
  const increasedPrice = seatPrice * 1.2; // 20% increase after deadline
  const effectiveSeatPrice = isBeforeDeadline ? seatPrice : increasedPrice;
  
  // Calculate how many full seats we can purchase
  const seatsAchieved = Math.floor(currentAmount / seatPrice);
  const percentageToNextSeat = ((currentAmount % seatPrice) / seatPrice) * 100;
  
  useEffect(() => {
    // Animate progress on component mount or when amount changes
    const percentage = Math.min(Math.round((currentAmount / (seatPrice * (seatsAchieved + 1))) * 100), 100);
    
    // Delay to allow for animation
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentAmount, seatPrice, seatsAchieved]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between mb-4 items-start md:items-center">
        <div className="text-2xl font-bold text-sporting mb-2 md:mb-0 flex items-center">
          <Trophy className="h-6 w-6 mr-2" /> 
          <span>{seatsAchieved} {seatsAchieved === 1 ? 'Lugar' : 'Lugares'} de Leão</span>
        </div>
        <div className="flex items-center text-gray-600">
          <HandCoins size={18} className="text-sporting mr-1" />
          <span>{donorsCount} apoiantes</span>
        </div>
      </div>
      
      {/* Visual progress to next seat */}
      <div className="mb-2">
        <div className="bg-gray-100 h-8 rounded-full relative overflow-hidden border border-gray-200">
          <div 
            className="bg-sporting h-full transition-all duration-1000 ease-out"
            style={{ width: `${percentageToNextSeat}%` }}
          >
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {seatsAchieved === maxSeats 
                ? "Meta máxima atingida!" 
                : `€${currentAmount.toLocaleString('pt-PT')} de €${((seatsAchieved + 1) * seatPrice).toLocaleString('pt-PT')} para o próximo lugar`
              }
            </span>
          </div>
        </div>
      </div>
      
      {/* Finishing line visual */}
      <div className="relative h-3 mb-4">
        {Array.from({ length: maxSeats }).map((_, index) => (
          <div 
            key={index}
            className={`absolute top-0 bottom-0 w-1 ${index < seatsAchieved ? 'bg-sporting' : 'bg-gray-300'}`}
            style={{ 
              left: `${((index + 1) / maxSeats) * 100}%`, 
              transform: 'translateX(-50%)'
            }}
          ></div>
        ))}
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        {seatsAchieved === 0 ? (
          <span>Ainda faltam <strong>€{(seatPrice - (currentAmount % seatPrice)).toLocaleString('pt-PT')}</strong> para atingir o 1º lugar!</span>
        ) : seatsAchieved < maxSeats ? (
          <span>Já conseguimos <strong>{seatsAchieved} {seatsAchieved === 1 ? 'lugar' : 'lugares'}</strong>! Faltam <strong>€{(seatPrice - (currentAmount % seatPrice)).toLocaleString('pt-PT')}</strong> para o próximo!</span>
        ) : (
          <span className="text-sporting font-medium">Meta máxima atingida! Conseguimos todos os {maxSeats} lugares!</span>
        )}
      </div>
      
      <div className="mt-3 bg-gray-50 p-3 rounded-md text-xs">
        <p>Para ser elegível para o sorteio precisa de ter um número de sócio do Sporting CP válido.</p>
        <p>O sorteio do 2º lugar e seguintes só será realizado se arrecadarmos fundos suficientes.</p>
        {isBeforeDeadline && (
          <p className="mt-2 text-sporting font-semibold">
            Preço promocional de €{seatPrice.toLocaleString('pt-PT')} válido até {deadline}! Depois deste prazo, o preço aumenta para €{increasedPrice.toLocaleString('pt-PT')}.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
