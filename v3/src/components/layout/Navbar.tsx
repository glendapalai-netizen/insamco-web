import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Productos', href: '#productos' },
    { name: 'Aplicaciones', href: '#aplicaciones' },
    { name: 'Nosotros', href: '#nosotros' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="hover:opacity-90 transition-opacity">
            <Logo />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-insamco-blue transition-colors uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contacto"
              className="bg-insamco-gold hover:bg-yellow-500 text-insamco-blue font-bold px-6 py-2.5 rounded-sm transition-colors uppercase tracking-wide text-sm shadow-sm"
            >
              Solicitar Cotización
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute top-full left-0 w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-semibold text-slate-700 hover:text-insamco-blue hover:bg-slate-50 uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-3">
              <a 
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-insamco-gold text-insamco-blue font-bold px-6 py-3 rounded-sm uppercase tracking-wide"
              >
                Solicitar Cotización
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
