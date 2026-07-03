import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Building2, Factory, Component } from 'lucide-react';

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      // Calculate scroll amount based on visible cards
      const containerWidth = scrollRef.current.clientWidth;
      let scrollAmount = containerWidth; // mobile: full width
      if (containerWidth >= 1024) scrollAmount = containerWidth / 3; // desktop: 1/3 width
      else if (containerWidth >= 768) scrollAmount = containerWidth / 2; // tablet: 1/2 width
      
      scrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const testimonials = [
    {
      quote: "El abastecimiento constante de resinas y dióxido de titanio ha sido vital. Su stock recurrente y excelente logística nos garantizó una continuidad operativa impecable, sin un solo día de paro en nuestra planta de producción.",
      author: "Ing. Carlos Mendoza",
      role: "Director de Operaciones",
      company: "PlastAndina S.A.",
      icon: <Factory className="w-8 h-8 text-insamco-blue" />
    },
    {
      quote: "Más que un proveedor, encontramos un verdadero aliado estratégico en Grupo Insamco. El acompañamiento técnico nos permitió optimizar el uso de cargas minerales, mejorando la calidad final de nuestras pinturas y reduciendo costos.",
      author: "Ana Lucía Reyes",
      role: "Gerente de I+D",
      company: "ColorTech Industrias",
      icon: <Building2 className="w-8 h-8 text-insamco-blue" />
    },
    {
      quote: "Su capacidad logística y eficiencia en importación nos resolvió un problema crítico de desabastecimiento. Trabajar con Grupo Insamco significa transparencia, solidez y la tranquilidad de tener la materia prima siempre a tiempo.",
      author: "Roberto Salazar",
      role: "Gerente General",
      company: "Recubrimientos Especiales CA",
      icon: <Component className="w-8 h-8 text-insamco-blue" />
    },
    {
      quote: "La asesoría especializada para el desarrollo de nuevos productos nos ha dado una ventaja competitiva enorme en el mercado de plásticos. Contar con un aliado que entiende nuestra formulación es invaluable.",
      author: "Diana Castellanos",
      role: "Jefa de Compras",
      company: "Polímeros Avanzados",
      icon: <Factory className="w-8 h-8 text-insamco-blue" />
    }
  ];

  return (
    <section id="testimonios" className="py-24 bg-insamco-blue text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full bg-insamco-gold blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest uppercase text-insamco-gold mb-3">Casos de Éxito</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h3>
            <p className="text-slate-300 text-lg font-light">
              Resultados reales de empresas que han asegurado su <strong className="text-white font-semibold">continuidad operativa</strong> gracias a nuestra gestión estratégica e inventario garantizado.
            </p>
          </div>
          
          <div className="flex gap-3 shrink-0">
            {/* Botones de navegación (No usamos dorado porque la regla lo reserva para CTAs de conversión) */}
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carrusel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide"
        >
          {testimonials.map((test, i) => (
            <div
              key={i}
              className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start bg-white rounded-sm p-8 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <Quote className="w-10 h-10 text-insamco-blue/20 mb-6" />
                <p className="text-slate-700 text-lg leading-relaxed mb-8 font-sans">
                  "{test.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                <div className="w-14 h-14 bg-insamco-light border border-slate-100 rounded-sm flex items-center justify-center shrink-0 shadow-sm">
                  {test.icon}
                </div>
                <div>
                  <p className="font-bold text-insamco-blue text-sm uppercase tracking-wide">{test.company}</p>
                  <p className="font-semibold text-slate-800">{test.author}</p>
                  <p className="text-sm text-slate-500">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
