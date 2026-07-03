import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="relative bg-insamco-blue pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.apache.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#ffffff" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-insamco-gold animate-pulse"></span>
            Distribución B2B · Cúcuta, Colombia
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Tu aliado estratégico en <span className="text-transparent bg-clip-text bg-gradient-to-r from-insamco-gold to-yellow-200">materias primas</span> para la industria
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
            Más de <strong className="text-white font-semibold">9 años</strong> suministrando dióxido de titanio, resinas, cargas minerales y aditivos a fabricantes de pinturas, plásticos y recubrimientos en Colombia y Venezuela.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contacto"
              className="inline-flex justify-center items-center gap-2 bg-insamco-gold hover:bg-yellow-500 text-insamco-blue font-bold px-8 py-4 rounded-sm transition-all shadow-lg hover:shadow-xl uppercase tracking-wide"
            >
              Solicitar Cotización
              <ArrowRight size={20} />
            </a>
            <a 
              href="#productos"
              className="inline-flex justify-center items-center gap-2 bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-sm transition-all uppercase tracking-wide"
            >
              Ver Productos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
