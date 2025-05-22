import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, X, Gift, ShieldCheck, TriangleAlert } from 'lucide-react'; // Adicionei Gift e Shirt
import { Link } from "react-router-dom";
import Activity from "@/components/Activity"
import DonationComponent from "@/components/DonationComponent"

const AdThankYouSection = ({
  likes = 0,
  views = 0,
  onWatchAgain,
  onShare,
  onLike,
  onRepost,
  onClose,
  onIncrementViewCount, // Função para chamar o incremento
  adSlotContent, // O conteúdo JSX do seu bloco de anúncio (ou null se não houver)
  revolutLink = "https://revolut.me/sportingcampeao", // Placeholder
  paypalLink = "https://www.paypal.com/qrcodes/p2pqrc/9AHJMRJZVYQG2",
  sportingTshirtLink = "https://lojaverde.sporting.pt/", // Placeholder
}) => {
  const hasIncremented = useRef(false);

  // useEffect(() => {
  //   // Incrementar a visualização quando esta secção é mostrada
  //   // (assumindo que "mostrar anúncio" conta como parte da visualização completa)
  //   if (onIncrementViewCount && !hasIncremented.current) {
  //     onIncrementViewCount();
  //     hasIncremented.current = true;
  //   }
  // }, [onIncrementViewCount]);

  const AdPlaceholder = () => (
    <div className="my-6 p-4 bg-muted/50 border border-dashed border-border rounded-md min-h-[200px] sm:min-h-[250px] flex flex-col items-center justify-center text-center">
      {adSlotContent || (
        <>
          <ShieldCheck size={48} className="text-primary mb-4 opacity-50" />
          <p className="text-muted-foreground font-semibold">Ups! O anúncio fez-se à vida...</p>
          <p className="text-sm text-muted-foreground mt-1">
            Mas não te preocupes, o Leão agradece na mesma!
          </p>
        </>
      )}
    </div>
  );

  return (
    <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-card text-card-foreground rounded-xl shadow-xl text-center w-full max-w-2xl mx-auto">
      {/* <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
        Ajuda um campeão a comprar o seu lugar de Leão!
      </h2> */}
      {/* <p className="text-muted-foreground mb-5 px-2">
        A tua visualização é mais um passo para o nosso grande objetivo! Obrigado do fundo do coração verde e branco.
      </p> */}

      {/* <AdPlaceholder /> */}

      {!adSlotContent ? <DonationComponent /> : null }

      <div className="flex flex-row gap-8 sm:gap-4 justify-center mt-6">
        <Button onClick={onWatchAgain} variant="secondary" className="w-full sm:w-auto px-4">
          <RotateCcw size={18} className="mr-2" />
          Bisualizar
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-4">
          <a href={revolutLink} target="_blank" rel="noopener noreferrer">
            <Gift size={18} className="mr-2 transition-colors" />
            Revolut do Leão
          </a>
        </Button>
        <Button asChild variant="secondary" className="w-full sm:w-auto hover:bg-primary/90 px-4">
          <a href={paypalLink} target="_blank" rel="noopener noreferrer">
            <Gift color='black' size={18} className="mr-2 transition-colors" />
            Paypal
          </a>
        </Button>
      </div>

      <Activity
        likes={likes}
        reposts={0}
        views={views}
        liked={false}
        reposted={false}
        onShare={onShare}
        onLike={onLike}
        onRepost={onRepost}
      />

      {!adSlotContent && false && ( // Mostrar estas opções apenas se NÃO houver anúncio carregado
        <div className="my-6 space-y-4">
          <p className="text-lg font-semibold text-foreground">
            Sabias que basta 
          </p>
          {/* <Button onClick={onClose} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          <X size={16} className="mr-2" />
          Saudações Leoninas
        </Button> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Button asChild variant="outline" className="w-full group border-primary hover:bg-primary/10">
              <a href={sportingTshirtLink} target="_blank" rel="noopener noreferrer">
                <Shirt size={18} className="mr-2 text-primary group-hover:text-primary-foreground transition-colors" />
                Nova Camisola SCP
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full group border-amber-500 hover:bg-amber-500/10">
              <a href={revolutLink} target="_blank" rel="noopener noreferrer">
                <Gift size={18} className="mr-2 text-amber-600 group-hover:text-amber-500 transition-colors" />
                Ajuda para o Projeto!
              </a>
            </Button>
          </div> */}
          <p className="text-xs text-muted-foreground px-4">
           Basta mil almas caridosas contribuirem e consigo comprar o lugar ao pé do meu tio! 
          </p>
        </div>
      )}

      {adSlotContent && (
         <p className="text-sm text-muted-foreground my-4 italic">
            Este pequeno anúncio ajuda a manter o sonho vivo! Obrigado pelo teu tempo.
         </p>
      )}
    </div>
  );
};

export default AdThankYouSection;