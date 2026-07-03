import { Clock, Truck, ShieldCheck } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: <Clock className="w-10 h-10 text-insamco-blue" />,
      title: "Disponibilidad Inmediata",
      description: "Mantenemos un stock recurrente y estratégico para garantizar que tu línea de producción nunca se detenga."
    },
    {
      icon: <Truck className="w-10 h-10 text-insamco-blue" />,
      title: "Excelencia Logística",
      description: "Procesos eficientes y entregas oportunas a nivel nacional y transfronterizo, optimizando tu cadena de suministro."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-insamco-blue" />,
      title: "Acompañamiento Técnico",
      description: "Asesoría especializada para la correcta selección y aplicación de insumos, asegurando la calidad de tus formulaciones."
    }
  ];

  return (
    <section className="py-20 bg-insamco-light relative z-10 -mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-sm shadow-xl shadow-slate-200/50 border-t-4 border-insamco-gold transition-transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-full mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-insamco-blue mb-4">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
