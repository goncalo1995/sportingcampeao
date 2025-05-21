
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsAgreementProps {
  acceptTerms: boolean;
  setAcceptTerms: (accepted: boolean) => void;
}

const TermsAgreement = ({ acceptTerms, setAcceptTerms }: TermsAgreementProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="terms" 
        checked={acceptTerms}
        onCheckedChange={(checked) => setAcceptTerms(checked === true)}
        required 
      />
      <Label 
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Li e aceito os <a href="/terms" className="text-sporting underline">termos e condições</a>
      </Label>
    </div>
  );
};

export default TermsAgreement;
