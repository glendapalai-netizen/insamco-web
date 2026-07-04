import { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileTabBar, TabId } from './components/layout/MobileTabBar';
import { Hero } from './components/sections/Hero';
import { Benefits } from './components/sections/Benefits';
import { Services } from './components/sections/Services';
import { Products } from './components/sections/Products';
import { Applications } from './components/sections/Applications';
import { About } from './components/sections/About';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Chatbot } from './components/ui/Chatbot';
import { MobileIntro } from './components/ui/MobileIntro';

// A qué pestaña pertenece cada ancla (#...) para que los botones internos
// («Solicitar Cotización», enlaces del footer, etc.) sigan funcionando en móvil.
const anclaAPestana: Record<string, TabId> = {
  inicio: 'inicio',
  beneficios: 'inicio',
  productos: 'productos',
  aplicaciones: 'productos',
  servicios: 'servicios',
  testimonios: 'servicios',
  nosotros: 'nosotros',
  contacto: 'contacto',
};

export default function App() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  const [tab, setTab] = useState<TabId>('inicio');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // En móvil, los enlaces de ancla cambian de pestaña en lugar de hacer scroll
  useEffect(() => {
    if (!isMobile) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const destino = anclaAPestana[a.getAttribute('href')!.slice(1)];
      if (!destino) return;
      e.preventDefault();
      setTab(destino);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isMobile]);

  // Al cambiar de pestaña, subir al inicio (como una app)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);

  const mostrar = (ids: TabId[]) => !isMobile || ids.includes(tab);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <MobileIntro />
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        {mostrar(['inicio']) && (
          <>
            <Hero />
            <Benefits />
          </>
        )}
        {mostrar(['productos']) && (
          <>
            <Products />
            <Applications />
          </>
        )}
        {mostrar(['servicios']) && (
          <>
            <Services />
            <Testimonials />
          </>
        )}
        {mostrar(['nosotros']) && <About />}
        {mostrar(['contacto']) && <Contact />}
      </main>
      <Footer />
      <Chatbot />
      <MobileTabBar active={tab} onChange={setTab} />
    </div>
  );
}
