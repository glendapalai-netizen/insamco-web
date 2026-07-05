import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { TabDock, TabId } from './components/layout/TabDock';
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
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import Admin from './pages/Admin';

// A qué pestaña pertenece cada ancla (#...) para que los botones internos
// («Solicitar Cotización», enlaces del navbar y del footer) cambien de pestaña.
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

function Home() {
  const [tab, setTab] = useState<TabId>('inicio');

  // Navegación tipo app: los enlaces de ancla cambian de pestaña en lugar de hacer scroll.
  // Si el ancla apunta a una sección secundaria (ej. Aplicaciones dentro de Productos),
  // después del cambio se desplaza hasta esa sección.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const ancla = a.getAttribute('href')!.slice(1);
      const destino = anclaAPestana[ancla];
      if (!destino) return;
      e.preventDefault();
      setTab(destino);
      setTimeout(() => {
        const el = document.getElementById(ancla);
        if (el && ancla !== destino) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0 });
      }, 80);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Al cambiar de pestaña desde el dock, subir al inicio (como una app)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);

  const mostrar = (ids: TabId[]) => ids.includes(tab);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <MobileIntro />
      <Navbar />
      <main className={`flex-grow pb-24 md:pb-28 ${tab !== 'inicio' ? 'pt-16 md:pt-20' : ''}`}>
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
      <WhatsAppButton />
      <TabDock active={tab} onChange={setTab} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
