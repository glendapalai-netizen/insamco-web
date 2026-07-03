import { Target, Leaf, Award } from 'lucide-react';

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-insamco-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-insamco-blue mb-3">Quiénes Somos</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Filosofía de Éxito Compartido</h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            Desde 2015, basamos nuestra operación en la <strong>confianza, el compromiso y la transparencia</strong>. No somos solo un proveedor; acompañamos a las empresas desde sus etapas iniciales hasta su consolidación, entendiendo que su crecimiento es también el nuestro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 shadow-sm border border-slate-100 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-insamco-blue">
              <Target size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-insamco-blue/10 flex items-center justify-center rounded-sm mb-6">
                <Award className="text-insamco-blue" size={24} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Misión</h4>
              <p className="text-slate-600 leading-relaxed">
                Brindar soluciones integrales en materias primas, asegurando continuidad y calidad a través de un servicio de acompañamiento técnico inigualable, siendo el soporte invisible detrás de los productos de nuestros clientes.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 shadow-sm border border-slate-100 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-insamco-blue">
              <Leaf size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-insamco-blue/10 flex items-center justify-center rounded-sm mb-6">
                <Leaf className="text-insamco-blue" size={24} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">Visión Sostenible</h4>
              <p className="text-slate-600 leading-relaxed">
                Consolidarnos como el referente latinoamericano en suministro de materias primas industriales, priorizando siempre la <strong>innovación sostenible</strong> y promoviendo el uso de soluciones amigables con el medio ambiente en el sector.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
