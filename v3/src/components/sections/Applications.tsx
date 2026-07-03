import { PaintBucket, Box, Car, PaintRoller } from 'lucide-react';

export function Applications() {
  const applications = [
    { name: "Pintura Arquitectónica", icon: <PaintRoller className="w-8 h-8" /> },
    { name: "Plásticos y Masterbatch", icon: <Box className="w-8 h-8" /> },
    { name: "Sector Automotriz", icon: <Car className="w-8 h-8" /> },
    { name: "Recubrimientos Especiales", icon: <PaintBucket className="w-8 h-8" /> }
  ];

  return (
    <section id="aplicaciones" className="py-24 bg-insamco-blue text-white overflow-hidden relative">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-insamco-gold mb-3">Sectores y Alcance</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Soluciones para toda la industria</h3>
            <p className="text-slate-300 text-lg font-light mb-8 leading-relaxed">
              Adaptamos nuestro portafolio de materias primas a los estándares más exigentes de múltiples sectores. Atendemos tanto al <strong className="text-white font-semibold">Sector Privado</strong> (industria en general) como al <strong className="text-white font-semibold">Sector Público</strong> (alcaldías y gobernaciones, a través de aliados comerciales).
            </p>
            
            <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-sm">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-insamco-blue bg-insamco-gold flex items-center justify-center font-bold text-insamco-blue">CO</div>
                <div className="w-12 h-12 rounded-full border-2 border-insamco-blue bg-slate-200 flex items-center justify-center font-bold text-insamco-blue">VE</div>
              </div>
              <div>
                <p className="font-bold text-white">Cobertura Geográfica</p>
                <p className="text-sm text-slate-400">Operación consolidada en Colombia y en expansión activa hacia Venezuela.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {applications.map((app, idx) => (
              <div key={idx} className="aspect-square bg-[#152a4a] border border-white/5 p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-[#1a3257] hover:border-insamco-gold/30 transition-all rounded-sm group">
                <div className="text-insamco-gold group-hover:scale-110 transition-transform">
                  {app.icon}
                </div>
                <h4 className="font-semibold text-slate-200">{app.name}</h4>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
