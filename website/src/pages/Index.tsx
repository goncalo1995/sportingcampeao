import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, X, Eye, Share2, Clock, Users } from 'lucide-react'; // Ícone Eye adicionado
import { supabase } from '@/lib/supabaseClient'; // Importar o cliente Supabase
import AdThankYouSection from '@/components/AdThankYouSection'
import Header from '@/components/Header';
import HourlyViewsBarChart from "@/components/HourlyViewsBarChart"
import AnimatedScorePlacard from '@/components/AnimatedScorePlacard';
import HelpInteraction from "@/components/HelpInteraction"
import NumberFlow, { continuous } from '@number-flow/react'
import DonationComponent from '@/components/DonationComponent';
import Activity from '@/components/Activity';
// Identificador único para o seu vídeo na tabela do Supabase
const VIDEO_IDENTIFIER = 'boladobicampeao'; // Mude se necessário

interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

/**
 * Handles sharing the current page or provided content.
 * Attempts to use the Web Share API, then falls back to copying the URL to the clipboard.
 * Provides user feedback via alerts (in a real app, use a toast notification system).
 *
 * @param customShareData Optional custom data to share. If not provided, uses current page title and URL.
 */
function handleShare(customShareData?: ShareData): void {
  const pageTitle = document.title;
  const pageUrl = window.location.href;

  const shareData: Required<ShareData> = {
    title: customShareData?.title || pageTitle,
    text: customShareData?.text || `Check out this page: ${pageTitle}`,
    url: customShareData?.url || pageUrl,
  };

  // 1. Try Web Share API
  if (navigator.share) {
    navigator.share(shareData)
      .then(() => {
        console.log('Content shared successfully via Web Share API!');
        // alert('Shared successfully!'); // Optional: give feedback
      })
      .catch((error) => {
        // Common errors: AbortError if user cancels, NotAllowedError if not in secure context or feature policy blocks
        console.warn('Web Share API error or cancelled:', error);
        // Don't fall back immediately if user cancels, they might not want to copy either.
        // If error is not AbortError, you could consider a fallback.
        // For simplicity, we'll just log it. If navigator.share exists but fails for other reasons,
        // it won't automatically try the clipboard method below unless navigator.share was undefined.
      });
  }
  // 2. Try Clipboard API (if Web Share not available or not used)
  else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareData.url)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy URL with Clipboard API:', err);
        // Fallback to legacy method if Clipboard API fails
        legacyCopyToClipboard(shareData.url);
      });
  }
  // 3. Try legacy execCommand
  else {
    legacyCopyToClipboard(shareData.url);
  }
}

/**
 * Legacy method to copy text to clipboard using document.execCommand.
 * @param text The text to copy.
 */
function legacyCopyToClipboard(text: string): void {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Styling to make it invisible and out of flow
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  textArea.style.opacity = '0';
  textArea.style.pointerEvents = 'none';

  document.body.appendChild(textArea);
  textArea.focus(); // Focus on the element
  textArea.select(); // Select its content

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('Link copied to clipboard (legacy method)!');
    } else {
      console.error('Legacy execCommand("copy") failed.');
      alert('Could not copy link automatically. Please copy it manually.');
    }
  } catch (err) {
    console.error('Error during legacy execCommand("copy"):', err);
    alert('Could not copy link automatically. Please copy it manually.');
  }

  document.body.removeChild(textArea);
}

// --- Componentes SimpleHeader, SimpleFooter e AdThankYouSection permanecem os mesmos ---
const SimpleHeader = () => (
  <header className="p-4 text-center">
    <h1 className="text-2xl font-bold text-primary">Sporting Campeão</h1>
  </header>
);

const SimpleFooter = () => (
  <footer className="p-4 text-center text-sm text-muted-foreground">
    <div className="bg-gray-50 p-4 mb-2">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>34 sportinguistas já contribuíram</span>
        </div>
        <div className="text-center mt-2">
          <div className="flex justify-center -space-x-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-8 h-8 bg-green-100 rounded-full border-2 border-white flex items-center justify-center text-xs">
                🦁
              </div>
            ))}
          </div>
          {/* <p className="text-xs text-gray-500 mt-2">
            "Força Sporting! Todos juntos por este sonho!" - João M.
          </p> */}
        </div>
      </div>
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
  const [likeCount, setLikeCount] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [isLoadingCount, setIsLoadingCount] = useState(true);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const hasIncrementedViewThisSession = useRef(false);
  const [adContent, setAdContent] = useState(null); // ou useState(<p>Anúncio Simulado!</p>);
  const [simulatedHourlyData, setSimulatedHourlyData] = useState([]);

  const remainingDays = 85;
  const totalGoal = 2950;
  const currentAmount = 47; // Simulado
  const percentage = Math.round((currentAmount / totalGoal) * 100);

  useEffect(() => {
    // Simular dados horários para demonstração
    // Numa app real, isto viria do Supabase (tabela agregada)
    const now = new Date();
    const data = [];
    for (let i = 5; i >= 0; i--) { // Últimas 6 horas
      const hour = new Date(now);
      hour.setHours(now.getHours() - i, 0, 0, 0);
      data.push({
        hour: hour.toISOString(),
        viewsInHour: Math.floor(Math.random() * 50) + (i === 0 ? viewCount % 50 : 10), // Simular dados
      });
    }
    setSimulatedHourlyData(data);
  }, [viewCount]); // Recalcular simulação quando viewCount muda (apenas para demo)

  // Função para buscar a contagem inicial e configurar o real-time
  useEffect(() => {
    const fetchAndSubscribeToCounts = async () => {
      setIsLoadingCount(true);
      // Buscar contagem inicial
      const { data: viewData, error: viewError } = await supabase
        .from('video_views')
        .select('view_count')
        .eq('video_identifier', VIDEO_IDENTIFIER)
        .single(); // Usamos single() porque esperamos apenas um registo por video_identifier

      if (viewError && viewError.code !== 'PGRST116') { // PGRST116: "The result contains 0 rows"
        console.error('Erro ao buscar contagem inicial:', viewError);
      } else if (viewData) {
        setViewCount(viewData.view_count);
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

      // --- 2. Fetch initial like count ---
      const { data: likeData, error: likeError, count: initialLikeCount } = await supabase
        .from('video_likes')
        .select('*', { count: 'exact', head: true }) // Use count 'exact' for total
        .eq('video_identifier', VIDEO_IDENTIFIER);

      if (likeError) {
        console.error('Erro ao buscar contagem inicial de likes:', likeError);
        setLikeCount(0);
      } else {
        setLikeCount(initialLikeCount || 0);
      }
      setUserHasLiked(false)
      setIsLoadingCount(false);

      // Configurar subscrição real-time
      const viewChannel = supabase
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

        // For likes, we need to listen to INSERT and DELETE events on video_likes
      // and then re-fetch the total count, as individual events don't give the new total directly.
      const likeChannel = supabase
      .channel(`realtime-video-likes-${VIDEO_IDENTIFIER}`)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT and DELETE
          schema: 'public',
          table: 'video_likes',
          filter: `video_identifier=eq.${VIDEO_IDENTIFIER}`, // Only for this video
        },
        async (payload) => {
          console.log('Like event received:', payload);
          // Re-fetch the total like count
          const { count: newLikeCount, error: refetchError } = await supabase
            .from('video_likes')
            .select('*', { count: 'exact', head: true })
            .eq('video_identifier', VIDEO_IDENTIFIER);

          if (refetchError) {
            console.error('Erro ao re-buscar contagem de likes após evento:', refetchError);
          } else {
            setLikeCount(newLikeCount || 0);
          }

          // Check if the event affects the current user's like status
          // if (currentUserId) {
          //     if (payload.eventType === 'INSERT' && payload.new.user_id === currentUserId) {
          //         setUserHasLiked(true);
          //     } else if (payload.eventType === 'DELETE' && payload.old.user_id === currentUserId) {
          //         setUserHasLiked(false);
          //     }
          // }
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscrito ao canal de likes para ${VIDEO_IDENTIFIER}!`);
        }
        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.error(`Erro na subscrição Supabase (likes - ${status}):`, err);
        }
      });

      // Cleanup da subscrição quando o componente é desmontado
      return () => {
        supabase.removeChannel(viewChannel);
        supabase.removeChannel(likeChannel);
      };
    };

    fetchAndSubscribeToCounts();
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
    // incrementViewCountViaFunction();
    setAdContent(null);
    // hasIncrementedViewThisSession.current = false; // Permitir novo incremento
    // if (videoRef.current) {
    //   videoRef.current.currentTime = 0;
    //   videoRef.current.play().catch(error => console.error("Erro ao dar play:", error));
    // }
    handlePlayVideo()
  };

  const handleCloseAdSection = () => {
    setIsVideoFinished(false);
    setShowVideo(false);
    setAdContent(null);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      <Header />
      <div className="p-6 bg-gray-50 w-96">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-2xl">🦁</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">A Minha História</h3>
            <p className="text-sm text-gray-600">Sportinguista de coração</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          Sou sportinguista desde pequeno, socio desde 2003, e já tive o previlegio de acumular 10 anos de gamebox graças ao meu tio Luís e estou a ver se consigo angaria fundos para 10 de lugar de Leão junto do meu tio João. 
          {/* Um lugar de sócio custa <strong>€2.950 por 10 anos</strong>, mas sozinho não consigo.  */}
          {/* <span className="text-green-600 font-medium">Com a vossa ajuda,</span>, 
          longe da magia do estádio que tanto amo. */}
        </p>
      </div>

      
      {/* <ViewCounterJar viewCount={viewCount} isLoading={isLoadingCount} /> */}

      <main className="flex-grow flex flex-col items-center justify-center w-full">
        {!showVideo && !isVideoFinished && (
          <div className="text-center">
            {/* <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Tricampeão? 🦁
            </h2> */}
            {/* <p className="text-lg text-muted-foreground mb-2 max-w-xl mx-auto">
              Vamos ver...
            </p> */}

                  {/* Placar Sempre Visível no Topo */}
            {/* <div className="mt-24">
              <AnimatedScorePlacard viewCount={viewCount} isLoading={isLoadingCount} minDisplayDigits={5} />
            </div> */}

              {/* <DonationComponent /> */}

            <Button onClick={handlePlayVideo} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Play size={20} className="mr-2" />
              Vamos ver
            </Button>
            {/* Mostrar a contagem de visualizações */}
            {/* <div className="mt-8 flex items-center justify-center text-lg text-primary">
              <Eye size={24} className="mr-2" />
              {isLoadingCount ? 'A carregar visualizações...' : `${viewCount.toLocaleString('pt-PT')} visualizações`}
            </div> */}
          </div>
        )}

        {/* <div className="p-4 bg-card rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center text-foreground">Atividade por Hora (Demo)</h3>
          <HourlyViewsBarChart hourlyData={simulatedHourlyData} />
        </div> */}

        {/* {!isLoadingCount && viewCount > 0 && (
          <div className="mt-12 w-full max-w-3xl mx-auto">
            <RealtimeViewsLineChart
              initialViewCount={viewCount} // Passar o viewCount inicial para o primeiro render
              viewCountUpdates$={viewCount} // Passar o viewCount atual para atualizações
              // videoIdentifier={VIDEO_IDENTIFIER} // Se o componente precisar dele
            />
          </div>
        )} */}

        {showVideo && !isVideoFinished && (
          <div ref={videoContainerRef} className="w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden">
            <video
              ref={videoRef}
              src="https://pub-3a57e53548b04fb79ef081d08940016c.r2.dev/bola-cut.mov"
              controls
              onEnded={handleVideoEnded}
              className="w-full h-full"
            >
              O seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        )}

        {isVideoFinished ?
        <>
           <AdThankYouSection
              views={viewCount}
              onShare={handleShare}
              onWatchAgain={handleWatchAgain} // Passar a função correta
              onClose={handleCloseAdSection}
              onIncrementViewCount={incrementViewCountViaFunction} // Passar a função de incremento
              adSlotContent={adContent} // Passar o conteúdo do anúncio
              revolutLink="https://revolut.me/sportingcampeao" // **Atualize este link!**
              sportingTshirtLink="https://lojaverde.sporting.pt" // Exemplo de link mais específico
              onLike={undefined} onRepost={undefined}          />
          {/* <HelpInteraction /> */}

        </>
         : null}
      </main>

      <SimpleFooter />
    </div>
  );
}