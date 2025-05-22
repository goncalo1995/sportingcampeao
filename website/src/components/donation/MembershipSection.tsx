
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface MembershipSectionProps {
  hasMemberNumber: boolean;
  setHasMemberNumber: (value: boolean) => void;
  memberNumber: string;
  setMemberNumber: (value: string) => void;
  acceptEligibility: boolean;
  setAcceptEligibility: (value: boolean) => void;
}

const MembershipSection = ({ 
  hasMemberNumber, 
  setHasMemberNumber, 
  memberNumber, 
  setMemberNumber, 
  acceptEligibility, 
  setAcceptEligibility 
}: MembershipSectionProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="hasMemberNumber" 
          checked={hasMemberNumber} 
          onCheckedChange={(checked) => setHasMemberNumber(checked === true)}
        />
        <Label 
          htmlFor="hasMemberNumber"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Sou sócio do Sporting CP
        </Label>
      </div>
      
      {hasMemberNumber && (
        <div className="mt-2">
          <Label htmlFor="memberNumber">Número de Sócio</Label>
          <Input
            id="memberNumber"
            value={memberNumber}
            onChange={(e) => setMemberNumber(e.target.value)}
            placeholder="Introduz o teu número de sócio"
          />
        </div>
      )}
      
      {!hasMemberNumber && (
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox 
            id="acceptEligibility" 
            checked={acceptEligibility} 
            onCheckedChange={(checked) => setAcceptEligibility(checked === true)}
            required 
          />
          <Label 
            htmlFor="acceptEligibility"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Compreendo que preciso de um número de sócio do Sporting CP para receber o lugar, caso seja sorteado
          </Label>
        </div>
      )}
    </div>
  );
};

export default MembershipSection;
