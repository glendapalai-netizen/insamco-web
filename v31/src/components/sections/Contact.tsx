import { useState } from 'react';
import { Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    empresa: '',
    nombre: '',
    correo: '',
    telefono: '',
    pais: 'Colombia',
    producto: '',
    requerimientos: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to an API
    console.log('Form submitted:', formData);
    alert('Solicitud enviada exitosamente. Un asesor se pondrá en contacto pronto.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-insamco-blue mb-3">Contacto Comercial</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Iniciemos una relación estratégica</h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Completa el formulario detallando tus necesidades de materias primas. Nuestro equipo técnico evaluará tus requerimientos para ofrecerte la solución más óptima y rentable para tu proceso.
            </p>
            
            <div className="p-8 bg-insamco-light border border-slate-200 rounded-sm">
              <h4 className="font-bold text-insamco-blue mb-4">Por qué elegir a Grupo Insamco</h4>
              <ul className="space-y-3">
                {[
                  "Garantía de suministro continuo",
                  "Acompañamiento en planta si es requerido",
                  "Precios competitivos de importación directa",
                  "Soluciones a medida para formulaciones específicas"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-insamco-gold mr-2 mt-1 font-bold">✓</span>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-insamco-blue p-8 md:p-10 rounded-sm shadow-2xl">
            <h4 className="text-2xl font-bold text-white mb-6">Solicitar Cotización</h4>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-slate-300 mb-1">Empresa</label>
                  <input required type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-1">Nombre Completo</label>
                  <input required type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-slate-300 mb-1">Correo Corporativo</label>
                  <input required type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-slate-300 mb-1">Teléfono / WhatsApp</label>
                  <input required type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="pais" className="block text-sm font-medium text-slate-300 mb-1">País de Operación</label>
                  <select id="pais" name="pais" value={formData.pais} onChange={handleChange}
                    className="w-full bg-[#1a3257] border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors appearance-none"
                  >
                    <option value="Colombia">Colombia</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="producto" className="block text-sm font-medium text-slate-300 mb-1">Producto de Interés</label>
                  <select id="producto" name="producto" value={formData.producto} onChange={handleChange}
                    className="w-full bg-[#1a3257] border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors appearance-none"
                  >
                    <option value="">Seleccione una opción...</option>
                    <option value="Dioxido de Titanio">Dióxido de Titanio</option>
                    <option value="Resinas">Resinas</option>
                    <option value="Cargas Minerales">Cargas Minerales</option>
                    <option value="Aditivos">Aditivos y Espesantes</option>
                    <option value="Varios">Varios / Otros</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="requerimientos" className="block text-sm font-medium text-slate-300 mb-1">Volumen y Requerimientos Adicionales</label>
                <textarea id="requerimientos" name="requerimientos" rows={4} value={formData.requerimientos} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-insamco-gold hover:bg-yellow-500 text-insamco-blue font-bold px-8 py-4 rounded-sm transition-all uppercase tracking-wide mt-4"
              >
                Enviar Solicitud de Cotización
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
