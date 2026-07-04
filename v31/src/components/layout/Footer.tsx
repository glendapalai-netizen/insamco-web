import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0f213a] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12 items-center">
          
          <div className="lg:col-span-2 space-y-6">
            <img
              src="/media/logo-3d.jpg"
              alt="Grupo Insamco S.A.S. — desde 2015"
              className="w-full max-w-md rounded-sm shadow-2xl ring-1 ring-insamco-gold/20"
            />
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              Aliado estratégico en materias primas e insumos industriales para los sectores de plásticos, pinturas y recubrimientos en Colombia y Venezuela.
            </p>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-display font-semibold uppercase tracking-wider mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {['Servicios', 'Productos', 'Aplicaciones', 'Nosotros'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm hover:text-insamco-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-display font-semibold uppercase tracking-wider mb-6">Contacto Directo</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <MapPin className="text-insamco-gold shrink-0" size={20} />
                <div className="text-sm">
                  <p className="font-semibold text-white">Sede Principal</p>
                  <p>Avenida 7A # 19 N-50</p>
                  <p>Parque Industrial del Oriente</p>
                  <p>Bloque 2, Bodegas 1-3</p>
                  <p>Cúcuta, Norte de Santander, Colombia</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <Phone className="text-insamco-gold shrink-0" size={20} />
                  <span className="text-sm">WhatsApp: +57 350 717 4992</span>
                </div>
                <div className="flex gap-3 items-start">
                  <Mail className="text-insamco-gold shrink-0" size={20} />
                  <div className="text-sm flex flex-col">
                    <a href="mailto:sergio@grupoinsamco.com" className="hover:text-insamco-gold">sergio@grupoinsamco.com</a>
                    <a href="mailto:andreaosorio@grupoinsamco.com" className="hover:text-insamco-gold">andreaosorio@grupoinsamco.com</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Clock className="text-insamco-gold shrink-0" size={20} />
                  <div className="text-sm">
                    <p>Lunes a Viernes</p>
                    <p>8:00 a 12:00 - 14:00 a 17:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Grupo Insamco S.A.S. Todos los derechos reservados.
          </p>
          <p className="text-xs font-display tracking-widest text-slate-500 uppercase">
            — desde 2015 —
          </p>
        </div>
      </div>
    </footer>
  );
}
