// src/pages/DangerousPage.jsx
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button'; // Assumindo que mantém o Shadcn UI
import { PlayCircle, AlertTriangle } from 'lucide-react'; // Ícones

// URL do seu vídeo de "susto" (2 segundos)
const DANGEROUS_VIDEO_URL = "https://pub-3a57e53548b04fb79ef081d08940016c.r2.dev/bolapequenov1.mp4";

export default function DangerousPage() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null); // Ref para o container que entrará em fullscreen

  const handlePlayScare = async () => {
    setShowVideo(true);

    // Pequeno delay para garantir que o elemento de vídeo está no DOM
    // e o container está pronto para o pedido de fullscreen.
    await new Promise(resolve => setTimeout(resolve, 100));

    const videoElement = videoRef.current;
    const containerElement = containerRef.current;

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

  // Opcional: Sair do fullscreen quando o vídeo termina
  const handleVideoEnded = () => {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
    setShowVideo(false); // Voltar ao botão inicial
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col min-h-screen items-center justify-center p-4 
                  ${showVideo ? 'bg-black' : 'bg-background'} transition-colors duration-300`}
    >
      {!showVideo && (
        <div className="text-center">
          <AlertTriangle size={64} className="mx-auto text-destructive mb-6 animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
           Conteúdo Intenso!
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Esta experiência contém um som súbito. Prossiga por sua conta e risco.
            (Recomendamos auscultadores para a experiência completa... ou não!) 😉
          </p>
          <Button
            onClick={handlePlayScare}
            size="lg"
            variant="destructive"
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xl px-8 py-6"
          >
            <PlayCircle size={28} className="mr-3" />
            Iniciar
          </Button>
          <p className="mt-12 text-sm text-muted-foreground">
            <a href="/" className="hover:underline">← Voltar à Página Segura</a>
          </p>
        </div>
      )}

      {showVideo && (
        // O vídeo ocupa o espaço do container que está em fullscreen
        <video
          ref={videoRef}
          src={DANGEROUS_VIDEO_URL} // ** Use o seu URL aqui **
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain" // object-contain para não cortar o vídeo
          playsInline // Importante para iOS
          // NÃO adicione 'controls' se quer o efeito surpresa total
          // 'autoPlay' aqui não é necessário porque damos play programaticamente
        >
          O seu navegador não suporta o elemento de vídeo.
        </video>
      )}
    </div>
  );
}