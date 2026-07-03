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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
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
