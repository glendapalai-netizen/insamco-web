import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SEEN_KEY = 'insamco_intro_vista';

// Intro a pantalla completa para móvil: video vertical limpio (sin velo ni
// textos) que se reproduce UNA sola vez (sin loop), con sonido si el
// navegador lo permite. Botón flotante "Entrar" para saltar en cualquier
// momento; al terminar el video, el botón da saltitos invitando a entrar.
export function MobileIntro() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const yaVista = sessionStorage.getItem(SEEN_KEY) === '1';
    return isMobile && !yaVista;
  });
  const [ended, setEnded] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intentar reproducir CON sonido; si el navegador lo bloquea (política de
  // autoplay de iOS/Android), reproducir en silencio y mostrar el botón 🔊.
  useEffect(() => {
    if (!visible) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => setEnded(true));
    });
  }, [visible]);

  // Bloquear el scroll de fondo mientras la intro está en pantalla
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  const entrar = () => {
    sessionStorage.setItem(SEEN_KEY, '1');
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 500);
  };

  const alternarSonido = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused && !ended) v.play().catch(() => {});
  };

  return (
    <div
      className={`fixed inset-0 z-[200] bg-insamco-blue transition-opacity duration-500 ${leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <video
        ref={videoRef}
        src="/media/intro-vertical.mp4"
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
        onClick={alternarSonido}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Indicador/activador de sonido */}
      <button
        type="button"
        onClick={alternarSonido}
        aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        className="absolute top-5 right-5 inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur px-4 py-2 text-xs font-semibold text-white"
        style={{ marginTop: 'env(safe-area-inset-top)' }}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-insamco-gold" />}
        {muted ? 'Activar sonido' : ''}
      </button>

      <div className="absolute inset-x-0 bottom-0 flex justify-center" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))' }}>
        <button
          type="button"
          onClick={entrar}
          className={`px-10 py-3.5 rounded-full bg-white/15 backdrop-blur-md border border-white/40 text-white font-bold uppercase tracking-[0.25em] text-sm shadow-[0_8px_30px_rgba(0,0,0,0.35)] active:scale-95 transition-transform ${ended ? 'animate-bounce bg-white/25 border-insamco-gold/70 text-insamco-gold' : ''}`}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
