import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
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
import Admin from './pages/Admin';

function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <MobileIntro />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Benefits />
        <Services />
        <Products />
        <Applications />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
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
