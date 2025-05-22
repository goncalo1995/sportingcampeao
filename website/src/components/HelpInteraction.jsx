// src/components/HelpInteraction.jsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { TrendingUp, Coffee, MonitorSmartphone, ShieldQuestion } from 'lucide-react'; // Adicionado ShieldQuestion

// Estes poderiam vir de uma chamada à tabela `interaction_options`
const HELP_BUTTON_TYPE = 'donation_amount_choice';
const INTERACTION_BUTTONS_CONFIG = [
  // option_name DEVE CORRESPONDER ao que está na sua tabela interaction_options
  { option_name: '3_euros', display_label: '3€ 🙏', icon: null },
  { option_name: '7_euros', display_label: '7€ 💪', icon: null },
  { option_name: '15_euros', display_label: '15€ 🚀', icon: null },
  { option_name: 'sorry_option', display_label: 'Não posso agora 😔', icon: <ShieldQuestion size={18}/> , variant: "ghost" },
];

const DONATION_LINK_TYPE = 'donation_final_step_choice';
const DONATION_LINKS_CONFIG = [
  { option_name: 'donate_revolut_link', display_label: 'Doar (Revolut/Outros)', url: 'https://LINK_REVOLUT_OU_PLATAFORMA_DOACAO', icon: <TrendingUp size={18} /> },
  { option_name: 'buy_beer_link', display_label: 'Paga-me um Fino!', url: 'https://revolut.me/SEU_USER_BEER', icon: <Coffee size={18} /> },
  { option_name: 'buy_screenprotector_link', display_label: 'Protetor de Ecrã Novo!', url: 'https://revolut.me/SEU_USER_SCREEN', icon: <MonitorSmartphone size={18} /> },
];

const HelpInteraction = () => {
  const [step, setStep] = useState(1);
  const [buttonStats, setButtonStats] = useState([]); // [{ option_name, display_label, percentage, click_count }]
  const [linkStats, setLinkStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHelpOptionName, setSelectedHelpOptionName] = useState('');

  const fetchStats = async (optionType, setter) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('record-and-get-interaction-stats', {
        body: { stats_for_option_type: optionType },
      });
      if (error) throw error;
      if (data && data.percentages) {
        setter(data.percentages);
      }
    } catch (err) {
      console.error(`Erro ao buscar estatísticas para ${optionType}:`, err);
      setter([]); // Limpar stats em caso de erro
    }
    setIsLoading(false);
  };

  // Buscar estatísticas iniciais para os botões de ajuda
  // Buscar estatísticas iniciais
  useEffect(() => {
    fetchStats(HELP_BUTTON_TYPE, setButtonStats);
    fetchStats(DONATION_LINK_TYPE, setLinkStats); // Opcional: carregar stats dos links também
  }, []);


  const handleInteractionClick = async (clickedOptionName, optionTypeForNextStats, nextStatSetter) => {
    setIsLoading(true);
    setSelectedHelpOptionName(clickedOptionName); // Guardar para mensagens personalizadas
    try {
      const { data, error } = await supabase.functions.invoke('record-and-get-interaction-stats', {
        body: {
          clicked_option_name: clickedOptionName,
          stats_for_option_type: optionTypeForNextStats, // Pedir stats para o próximo passo ou o mesmo tipo
        },
      });
      if (error) throw error;
      if (data && data.percentages) {
        nextStatSetter(data.percentages);
        if (optionTypeForNextStats === HELP_BUTTON_TYPE) setStep(2); // Avança se foi clique de ajuda
      }
    } catch (err) {
      console.error(`Erro ao registar/buscar clique para ${clickedOptionName}:`, err);
      if (optionTypeForNextStats === HELP_BUTTON_TYPE) setStep(2); // Avança mesmo com erro para não bloquear o user
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card text-card-foreground rounded-xl shadow-lg text-center">
      {step === 1 && (
        <>
          <h3 className="text-xl font-semibold mb-1 text-primary">Como podes ajudar o Leão?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Cada escolha ajuda-nos a perceber o apoio da nossa comunidade!
          </p>
          <div className="grid grid-cols-2 gap-3">
            {/* Renderizar botões diretamente a partir de buttonStats (que vêm ordenados da BD) */}
            {buttonStats.length > 0 && !isLoading && buttonStats.map((stat) => {
              // Encontrar a configuração original se precisar de ícones ou variantes específicas
              const btnConfig = INTERACTION_BUTTONS_CONFIG.find(b => b.option_name === stat.option_name);
              return (
                <Button
                  key={stat.option_name}
                  variant={btnConfig?.variant || (stat.option_name === 'sorry_option' ? "ghost" : "outline")}
                  className={`w-full py-3 text-base relative overflow-hidden group
                    ${stat.option_name !== 'sorry_option' ? 'border-primary hover:bg-primary/5' : 'text-muted-foreground hover:bg-muted/50'}`}
                  onClick={() => handleInteractionClick(stat.option_name, HELP_BUTTON_TYPE, setButtonStats)}
                  disabled={isLoading}
                >
                  <span className="relative z-10 flex items-center justify-center w-full">
                    {btnConfig?.icon && <span className="mr-2">{btnConfig.icon}</span>}
                    {stat.display_label} {/* Usar o display_label da BD */}
                    {stat.percentage !== null && <span className="ml-1.5 text-xs opacity-80">({stat.percentage}%)</span>}
                  </span>
                  <div
                    className="absolute bottom-0 left-0 h-full bg-primary/20 transition-all duration-500 ease-out"
                    style={{ width: `${stat.percentage || 0}%` }}
                  ></div>
                </Button>
              );
            })}
            {/* Mostrar placeholders ou mensagem de loading se buttonStats estiver vazio e isLoading */}
            {isLoading && buttonStats.length === 0 && Array(4).fill(0).map((_, i) => (
                <div key={i} className="w-full h-[52px] bg-muted/50 rounded-md animate-pulse"></div>
            ))}
          </div>
          {isLoading && <p className="text-sm mt-4 animate-pulse">A comunicar com o servidor...</p>}
        </>
      )}

      {step === 2 && (
        <>
          {/* ... (lógica para o passo 2, renderizando os links de doação de forma similar,
                     usando linkStats que também viriam ordenados da BD se você os buscar) ... */}
          <h3 className="text-xl font-semibold mb-2 text-primary">Obrigado pela tua escolha!</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {selectedHelpOptionName === 'sorry_option'
                ? "Sem problema! Se a maré virar, estas são as nossas sugestões:"
                : "Fantástico! Se quiseres dar o próximo passo, qual te agrada mais?"
            }
          </p>
          <div className="space-y-3">
            {linkStats.length > 0 && !isLoading && linkStats.map((stat) => {
                 const linkConfig = DONATION_LINKS_CONFIG.find(l => l.option_name === stat.option_name);
                 if (!linkConfig) return null; // Se não houver config para este link, não renderiza

                 return (
                    <Button
                        key={stat.option_name}
                        asChild
                        variant="ghost"
                        className="w-full justify-start text-left hover:bg-muted/50 group relative overflow-hidden py-3"
                        onClick={async () => {
                            window.open(linkConfig.url, '_blank', 'noopener,noreferrer');
                            await handleInteractionClick(stat.option_name, DONATION_LINK_TYPE, setLinkStats);
                        }}
                        disabled={isLoading}
                    >
                        <div className="flex items-center w-full relative z-10">
                            <span className="mr-3 text-primary group-hover:text-primary/80 transition-colors">{linkConfig.icon}</span>
                            <span className="text-foreground">{stat.display_label}</span>
                            {stat.percentage !== null && <span className="ml-auto text-xs opacity-80">({stat.percentage}%)</span>}
                        </div>
                        {stat.percentage !== null && (
                            <div
                            className="absolute bottom-0 left-0 h-full bg-green-500/10 transition-all duration-500 ease-out"
                            style={{ width: `${stat.percentage || 0}%` }}
                            ></div>
                        )}
                    </Button>
                 );
            })}
            {isLoading && linkStats.length === 0 && Array(3).fill(0).map((_, i) => (
                <div key={i} className="w-full h-[48px] bg-muted/50 rounded-md animate-pulse mb-3"></div>
            ))}
          </div>
          <Button onClick={() => { setStep(1); fetchStats(HELP_BUTTON_TYPE, setButtonStats); }} variant="link" className="mt-6 text-sm">
            ← Voltar às opções
          </Button>
        </>
      )}
    </div>
  );
};

export default HelpInteraction;