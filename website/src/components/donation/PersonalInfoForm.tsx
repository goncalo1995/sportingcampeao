
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

const PersonalInfoForm = ({ name, setName, email, setEmail }: PersonalInfoFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="O teu nome"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="O teu email"
          required
        />
      </div>
    </>
  );
};

export default PersonalInfoForm;
