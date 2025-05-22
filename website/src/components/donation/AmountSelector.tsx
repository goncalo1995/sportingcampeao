
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface AmountSelectorProps {
  selectedAmount: number;
  onAmountChange: (amount: number) => void;
}

const AmountSelector = ({ selectedAmount, onAmountChange }: AmountSelectorProps) => {
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountChange = (value: string) => {
    if (value === 'custom') {
      onAmountChange(parseInt(customAmount) || 0);
    } else {
      onAmountChange(parseInt(value));
      setCustomAmount('');
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="amount">Valor da Doação</Label>
      <div className="grid grid-cols-4 gap-2">
        {[5, 10, 25, 50].map((value) => (
          <Button
            key={value}
            type="button"
            variant={selectedAmount === value ? "default" : "outline"}
            className={selectedAmount === value ? "bg-sporting hover:bg-sporting-light" : ""}
            onClick={() => handleAmountChange(value.toString())}
          >
            €{value}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center mt-2 space-x-2">
        <Label htmlFor="customAmount" className="whitespace-nowrap">Outro valor:</Label>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">€</span>
          <Input
            id="customAmount"
            type="number"
            className="pl-8"
            placeholder="Montante"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              if (e.target.value) {
                onAmountChange(parseInt(e.target.value));
              }
            }}
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default AmountSelector;
