import { PaintBucket, Box, Car, PaintRoller } from 'lucide-react';

export function Applications() {
  const applications = [
    { name: "Pintura Arquitectónica", icon: <PaintRoller className="w-8 h-8" />, image: "/media/aplicacion-arquitectonica.jpg" },
    { name: "Plásticos y Masterbatch", icon: <Box className="w-8 h-8" />, image: "/media/aplicacion-plasticos.jpg" },
    { name: "Sector Automotriz", icon: <Car className="w-8 h-8" />, image: "/media/aplicacion-automotriz.jpg" },
    { name: "Recubrimientos Especiales", icon: <PaintBucket className="w-8 h-8" />, image: "/media/aplicacion-recubrimientos.jpg" }
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
              <div key={idx} className="relative aspect-square overflow-hidden border border-white/5 hover:border-insamco-gold/40 transition-all rounded-sm group">
                <img
                  src={app.image}
                  alt={app.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-insamco-blue/95 via-insamco-blue/30 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-center gap-3">
                  <div className="text-insamco-gold shrink-0">{app.icon}</div>
                  <h4 className="font-semibold text-white leading-snug">{app.name}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
