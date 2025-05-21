
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { 
  HandCoins, 
  Trophy, 
  Users 
} from 'lucide-react';

interface Donor {
  id: string;
  username: string;
  displayName: string;
  amount: number;
  date: string;
  isMember?: boolean;
}

const HallOfFame = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would fetch from an API/database
    const fetchDonors = () => {
      // Simulating API call with mock data
      setTimeout(() => {
        const mockDonors: Donor[] = [
          {
            id: '1',
            username: 'leao-verde',
            displayName: 'Carlos Almeida',
            amount: 50,
            date: '2025-05-15',
            isMember: true
          },
          {
            id: '2',
            username: 'sporting-sempre',
            displayName: 'Maria Silva',
            amount: 25,
            date: '2025-05-14'
          },
          {
            id: '3',
            username: 'jubas1906',
            displayName: 'António Santos',
            amount: 100,
            date: '2025-05-10',
            isMember: true
          },
          {
            id: '4',
            username: 'alvaladense',
            displayName: 'Joana Costa',
            amount: 10,
            date: '2025-05-09'
          },
          {
            id: '5',
            username: 'leoes-unidos',
            displayName: 'Pedro Martins',
            amount: 75,
            date: '2025-05-07',
            isMember: true
          }
        ];
        
        setDonors(mockDonors);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchDonors();
  }, []);
  
  const calculateTotalDonations = () => {
    return donors.reduce((sum, donor) => sum + donor.amount, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 bg-sporting text-white">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">Hall of Fame</h1>
            <p className="text-xl text-center max-w-2xl mx-auto">
              Honrando os apoiantes que estão a tornar possível o Lugar de Leão.
            </p>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <Users className="h-10 w-10 text-sporting mb-3" />
              <h3 className="text-lg font-bold">{donors.length}</h3>
              <p className="text-gray-600">Apoiantes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <HandCoins className="h-10 w-10 text-sporting mb-3" />
              <h3 className="text-lg font-bold">€{calculateTotalDonations()}</h3>
              <p className="text-gray-600">Doações Totais</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <Trophy className="h-10 w-10 text-sporting mb-3" />
              <h3 className="text-lg font-bold">{Math.floor(calculateTotalDonations() / 2950)}</h3>
              <p className="text-gray-600">Lugares Conseguidos</p>
            </div>
          </div>
        </section>
        
        {/* Donors List */}
        <section className="container mx-auto px-4 py-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Os Nossos Heróis</h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sporting border-r-transparent"></div>
              <p className="mt-4">A carregar doadores...</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donors.map((donor) => (
                      <tr key={donor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{donor.displayName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">@{donor.username}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">€{donor.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(donor.date).toLocaleDateString('pt-PT')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {donor.isMember ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Sócio
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Apoiante
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HallOfFame;
