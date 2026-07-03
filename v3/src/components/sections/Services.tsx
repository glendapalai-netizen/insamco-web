import { Lightbulb, Wrench, PackageSearch, Globe } from 'lucide-react';

const services = [
  {
    id: "asesoria",
    icon: <Lightbulb className="w-8 h-8 text-insamco-gold" />,
    title: "Asesoría para Nuevos Productos",
    description: "Orientación técnica especializada desde la conceptualización hasta el desarrollo de nuevas líneas en tu portafolio.",
    image: "/uploads/CEO_talking_to_client_office_202607030023%20(1).jpeg",
    imageAlt: "Laboratorio de investigación industrial moderno"
  },
  {
    id: "soporte",
    icon: <Wrench className="w-8 h-8 text-insamco-gold" />,
    title: "Soporte Técnico y Comercial",
    description: "Acompañamiento en la selección precisa de las materias primas más adecuadas para tus formulaciones actuales, asegurando calidad y rendimiento.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Ingeniera supervisando procesos industriales"
  },
  {
    id: "logistica",
    icon: <PackageSearch className="w-8 h-8 text-insamco-gold" />,
    title: "Coordinación Logística Integral",
    description: "Gestión completa de despachos oportunos, minimizando tiempos de espera y asegurando la integridad del material en toda la cadena de suministro.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Almacén logístico de gran escala con montacargas"
  },
  {
    id: "suministro",
    icon: <Globe className="w-8 h-8 text-insamco-gold" />,
    title: "Suministro Global y Nacional",
    description: "Acceso a insumos importados de alta calidad desde los principales centros de manufactura y materias primas de producción nacional según tus requerimientos.",
    image: "https://images.unsplash.com/photo-1494412519320-aa3da60ed812?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Buque de carga y contenedores en puerto comercial"
  }
];

export function Services() {

  return (
    <section id="servicios" className="py-24 bg-insamco-blue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-insamco-gold mb-3">Nuestros Pilares</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">Más que un proveedor, un departamento anexo a tu empresa</h3>
          
          <div className="mt-10 mb-10 w-full aspect-video rounded-sm overflow-hidden shadow-2xl ring-1 ring-white/10 relative">
             <video 
                src="/uploads/Men_closing_business_deal_4K_202607030114.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
             />
          </div>

          <p className="text-slate-300 text-lg md:text-xl font-light">
            Nuestro mayor diferenciador radica en el profundo conocimiento técnico que aportamos a cada interacción, garantizando que cada insumo maximice el rendimiento de tus procesos.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={service.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-8 lg:gap-16`}>
                
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-sm overflow-hidden group">
                  <div className="absolute inset-0 bg-insamco-blue/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                  <img 
                    src={service.image} 
                    alt={service.imageAlt} 
                    className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Decorative border accent */}
                  <div className={`absolute top-0 bottom-0 ${isEven ? 'left-0' : 'right-0'} w-2 bg-insamco-gold z-20 pointer-events-none`}></div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center py-8 lg:py-12">
                  <div className="mb-8 inline-flex p-5 bg-white/5 rounded-sm ring-1 ring-white/10 shadow-xl">
                    {service.icon}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">{service.title}</h4>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-insamco-gold shrink-0"></span>
                      <span>Excelencia corporativa B2B garantizada.</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-insamco-gold shrink-0"></span>
                      <span>Aliados estratégicos de la industria.</span>
                    </li>
                  </ul>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
