
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Método de Pagamento</Label>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card">Cartão de Crédito/Débito</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mbway" id="mbway" />
          <Label htmlFor="mbway">MB WAY</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
