import { useEffect, useState } from 'react';

const SEEN_KEY = 'insamco_intro_vista';

// Intro a pantalla completa para móvil: video vertical limpio (sin velo ni
// textos) con botón flotante "Entrar". Al terminar el video, el botón da
// saltitos invitando a tocar. Se muestra una vez por sesión del navegador.
export function MobileIntro() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const yaVista = sessionStorage.getItem(SEEN_KEY) === '1';
    return isMobile && !yaVista;
  });
  const [ended, setEnded] = useState(false);
  const [leaving, setLeaving] = useState(false);

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

  return (
    <div
      className={`fixed inset-0 z-[200] bg-insamco-blue transition-opacity duration-500 ${leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <video
        src="/media/intro-vertical.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 pb-10 flex justify-center" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))' }}>
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
