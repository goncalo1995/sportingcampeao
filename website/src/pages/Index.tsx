import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, X, Eye } from 'lucide-react'; // Ícone Eye adicionado
import { supabase } from '@/lib/supabaseClient'; // Importar o cliente Supabase
import AdThankYouSection from '@/components/AdThankYouSection'
import Header from '@/components/Header';
import ViewCounterJar from '@/components/ViewCounterJar'; // Importar o novo componente

// Identificador único para o seu vídeo na tabela do Supabase
const VIDEO_IDENTIFIER = 'boladobicampeao'; // Mude se necessário

// --- Componentes SimpleHeader, SimpleFooter e AdThankYouSection permanecem os mesmos ---
const SimpleHeader = () => (
  <header className="p-4 text-center">
    <h1 className="text-2xl font-bold text-primary">Sporting Campeão</h1>
  </header>
);

const SimpleFooter = () => (
  <footer className="p-4 text-center text-sm text-muted-foreground">
    <p>© {new Date().getFullYear()} Sporting Campeão. Todos os direitos reservados.</p>
    <a href="/politica-de-privacidade" className="hover:underline">Política de Privacidade</a>
  </footer>
);

const OLDAdThankYouSection = ({ onWatchAgain, onClose }) => {
  return (
    <div className="mt-8 p-6 bg-card rounded-lg shadow-lg text-center w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Obrigado por Assistir!</h2>
      <p className="text-muted-foreground mb-6">
        [PLACEHOLDER: Mensagem de agradecimento personalizada...]
      </p>
      <div className="my-6 p-4 bg-muted/50 border border-dashed border-muted-foreground rounded-md min-h-[250px] flex items-center justify-center">
        <p className="text-muted-foreground">[PLACEHOLDER PARA O SEU CÓDIGO DE ANÚNCIO]</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onWatchAgain} variant="outline">
          <RotateCcw size={16} className="mr-2" />
          Ver novamente
        </Button>
        <Button onClick={onClose} variant="ghost">
          <X size={16} className="mr-2" />
          Obrigado 👋
        </Button>
      </div>
    </div>
  );
};
// --- Fim dos componentes inalterados ---

export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [viewCount, setViewCount] = useState(0); // Estado para a contagem de visualizações
  const [isLoadingCount, setIsLoadingCount] = useState(true);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const hasIncrementedViewThisSession = useRef(false);
  const [adContent, setAdContent] = useState(null); // ou useState(<p>Anúncio Simulado!</p>);

  // Função para buscar a contagem inicial e configurar o real-time
  useEffect(() => {
    const fetchAndSubscribeToViewCount = async () => {
      setIsLoadingCount(true);
      // Buscar contagem inicial
      const { data, error } = await supabase
        .from('video_views')
        .select('view_count')
        .eq('video_identifier', VIDEO_IDENTIFIER)
        .single(); // Usamos single() porque esperamos apenas um registo por video_identifier

      if (error && error.code !== 'PGRST116') { // PGRST116: "The result contains 0 rows"
        console.error('Erro ao buscar contagem inicial:', error);
      } else if (data) {
        setViewCount(data.view_count);
      } else {
        // Se não houver registo, pode querer criar um com 0 visualizações
        // Por agora, vamos assumir que começa em 0 se não existir
        setViewCount(0);
         // Opcional: Criar o registo se não existir (mais robusto com uma Edge Function)
        /*
        const { error: insertError } = await supabase
          .from('video_views')
          .insert([{ video_identifier: VIDEO_IDENTIFIER, view_count: 0 }]);
        if (insertError) console.error("Erro ao criar registo inicial:", insertError);
        */
      }
      setIsLoadingCount(false);

      // Configurar subscrição real-time
      const channel = supabase
        .channel(`realtime-video-views-${VIDEO_IDENTIFIER}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'video_views',
            filter: `video_identifier=eq.${VIDEO_IDENTIFIER}`,
          },
          (payload) => {
            if (payload.new && typeof payload.new.view_count === 'number') {
              setViewCount(payload.new.view_count);
            }
          }
        )
        .subscribe((status, err) => {
          if (status === 'SUBSCRIBED') {
            console.log(`Subscrito ao canal de visualizações para ${VIDEO_IDENTIFIER}!`);
          }
          if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            console.error(`Erro na subscrição Supabase (${status}):`, err);
          }
        });

      // Cleanup da subscrição quando o componente é desmontado
      return () => {
        supabase.removeChannel(channel);
      };
    };

    fetchAndSubscribeToViewCount();
  }, []); // Executa apenas uma vez

  const incrementViewCountViaFunction = async () => {
    // if (hasIncrementedView.current) return;
  
    try {
      const { data, error } = await supabase.functions.invoke('increment-view-count', {
        body: { video_identifier: VIDEO_IDENTIFIER },
      });
  
      if (error) {
        console.error('Erro ao invocar Edge Function:', error);
        // Poderia tentar uma contagem local como fallback ou mostrar um erro
      } else {
        console.log('Edge Function invocada com sucesso:', data);
        hasIncrementedViewThisSession.current = true;
        // O real-time deve atualizar o viewCount,
        // mas se a função RPC retornar a nova contagem, pode usá-la:
        // if (data && typeof data.new_view_count === 'number') {
        //   setViewCount(data.new_view_count);
        // }
      }
    } catch (catchError) {
      console.error('Erro inesperado ao invocar Edge Function:', catchError);
    }
  };

  // Função para incrementar a contagem de visualizações
  const incrementViewCount = async () => {
    if (hasIncrementedViewThisSession.current) return; // Já incrementou nesta "sessão"

    // Melhor usar uma função RPC no Supabase para um incremento atómico e seguro
    // Ex: await supabase.rpc('increment_view_count', { p_video_identifier: VIDEO_IDENTIFIER })
    // Por agora, faremos um select e update (menos ideal para concorrência, mas mais simples para demonstração)

    const { data: currentData, error: selectError } = await supabase
      .from('video_views')
      .select('view_count')
      .eq('video_identifier', VIDEO_IDENTIFIER)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('Erro ao buscar contagem para incrementar:', selectError);
      return;
    }

    const currentCount = currentData ? currentData.view_count : 0;
    const newCount = currentCount + 1;

    const { error: updateError } = await supabase
      .from('video_views')
      .update({ view_count: newCount, updated_at: new Date().toISOString() }) // Atualizar updated_at
      .eq('video_identifier', VIDEO_IDENTIFIER)
      .select() // Para que a subscrição real-time capture a mudança se for o mesmo cliente a atualizar

    if (updateError) {
      console.error('Erro ao incrementar contagem:', updateError);
    } else {
      console.log('Contagem incrementada para:', newCount);
      hasIncrementedViewThisSession.current = true; // Marcar como incrementado
      // setViewCount(newCount); // O real-time deve tratar disto, mas pode atualizar localmente para resposta imediata
    }
  };

  const handlePlayVideo = async () => {
    setShowVideo(true);
    incrementViewCountViaFunction();
    hasIncrementedViewThisSession.current = false; // Resetar para permitir novo incremento se o vídeo for reaberto
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const videoElement = videoRef.current;
    const containerElement = videoContainerRef.current;

    if (videoElement && containerElement) {
      try {
        // Tentar entrar em fullscreen com o container
        if (containerElement.requestFullscreen) {
          await containerElement.requestFullscreen();
        } else if (containerElement.mozRequestFullScreen) { /* Firefox */
          await containerElement.mozRequestFullScreen();
        } else if (containerElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
          await containerElement.webkitRequestFullscreen();
        } else if (containerElement.msRequestFullscreen) { /* IE/Edge */
          await containerElement.msRequestFullscreen();
        }

        // Após tentar o fullscreen (ou se não for suportado/falhar), dar play no vídeo
        // O browser pode exigir que o play seja também resultado direto da interação
        await videoElement.play();

      } catch (err) {
        console.error("Erro ao tentar fullscreen ou play:", err);
        // Se o fullscreen falhar, o vídeo ainda pode tentar dar play
        // se o browser permitir após o clique inicial.
        if (!videoElement.playing) {
            try {
                await videoElement.play();
            } catch (playErr) {
                console.error("Erro ao tentar dar play após falha no fullscreen:", playErr);
                alert("Não foi possível reproduzir o vídeo. O seu browser pode estar a bloquear.")
            }
        }
      }
    }
  };

  const handleVideoEnded = () => {
    setIsVideoFinished(true);
  };

  const handleWatchAgain = () => {
    setIsVideoFinished(false);
    incrementViewCountViaFunction();
    setAdContent(null);
    hasIncrementedViewThisSession.current = false; // Permitir novo incremento
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(error => console.error("Erro ao dar play:", error));
    }
  };

  const handleCloseAdSection = () => {
    setIsVideoFinished(false);
    setShowVideo(false);
    setAdContent(null);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      <Header />

      {/* <ViewCounterJar viewCount={viewCount} isLoading={isLoadingCount} /> */}

      <main className="flex-grow flex flex-col items-center justify-center w-full">
        {!showVideo && !isVideoFinished && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
               🦁
            </h2>
            {/* <p className="text-lg text-muted-foreground mb-2 max-w-xl mx-auto">
              Vamos ver...
            </p> */}
            {/* Mostrar a contagem de visualizações */}
            <div className="mb-8 flex items-center justify-center text-lg text-primary">
              <Eye size={24} className="mr-2" />
              {isLoadingCount ? 'A carregar visualizações...' : `${viewCount.toLocaleString('pt-PT')} visualizações`}
            </div>
            <Button onClick={handlePlayVideo} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Play size={20} className="mr-2" />
              Vamos ver...
            </Button>
          </div>
        )}

        {showVideo && !isVideoFinished && (
          <div ref={videoContainerRef} className="w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden">
            <video
              ref={videoRef}
              src="https://pub-3a57e53548b04fb79ef081d08940016c.r2.dev/bola-cut.mov"
              controls
              onEnded={handleVideoEnded}
              className="w-full h-full"
              playsInline
              
            >
              O seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        )}

        {isVideoFinished && (
          <AdThankYouSection
            onWatchAgain={handleWatchAgain} // Passar a função correta
            onClose={handleCloseAdSection}
            onIncrementViewCount={incrementViewCountViaFunction} // Passar a função de incremento
            adSlotContent={adContent} // Passar o conteúdo do anúncio
            revolutLink="https://revolut.me/sportingcampeao" // **Atualize este link!**
            sportingTshirtLink="https://lojaverde.sporting.pt" // Exemplo de link mais específico
          />
        )}
      </main>

      <SimpleFooter />
    </div>
  );
}