import { useState } from 'react';
import { Send, CheckCircle2, Mail, MessageCircle, Loader2 } from 'lucide-react';

const CORREOS_COMERCIALES = 'sergio@grupoinsamco.com,andreaosorio@grupoinsamco.com';
const WHATSAPP = '573507174992';

const FORM_INICIAL = {
  empresa: '',
  nombre: '',
  correo: '',
  telefono: '',
  pais: 'Colombia',
  producto: '',
  requerimientos: ''
};

export function Contact() {
  const [formData, setFormData] = useState(FORM_INICIAL);
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const resumen = () =>
    `Empresa: ${formData.empresa}\n` +
    `Nombre: ${formData.nombre}\n` +
    `Correo: ${formData.correo}\n` +
    `Teléfono: ${formData.telefono}\n` +
    `País: ${formData.pais}\n` +
    `Producto de interés: ${formData.producto || 'No especificado'}\n` +
    `Requerimientos: ${formData.requerimientos || 'No especificados'}`;

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Solicitud de cotización — ${formData.empresa}`);
    const body = encodeURIComponent(
      `Buen día,\n\nSolicito una cotización con los siguientes datos:\n\n${resumen()}\n\nQuedo atento(a) a su respuesta.\n${formData.nombre}`
    );
    return `mailto:${CORREOS_COMERCIALES}?subject=${subject}&body=${body}`;
  };

  const whatsappHref = () => {
    const text = encodeURIComponent(`Buen día, solicito una cotización:\n\n${resumen()}`);
    return `https://wa.me/${WHATSAPP}?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrors({});
    setErrorGeneral('');
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot })
      });
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data?.detail?.errors || {});
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
      // Flujo V2: queda guardada en el panel y se abre el correo del usuario ya redactado
      window.location.href = mailtoHref();
    } catch {
      setErrorGeneral('No pudimos registrar la solicitud. Intenta de nuevo o escríbenos directo por WhatsApp.');
    } finally {
      setSending(false);
    }
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
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-insamco-gold mx-auto mb-6" />
                <h4 className="text-2xl font-bold text-white mb-3">¡Solicitud registrada!</h4>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Se abrió tu correo con la solicitud ya redactada para nuestro equipo comercial —
                  solo dale <strong className="text-white">enviar</strong>. Si no se abrió, usa el botón dorado.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={mailtoHref()}
                    className="w-full flex justify-center items-center gap-2 bg-insamco-gold hover:bg-yellow-500 text-insamco-blue font-bold px-8 py-4 rounded-sm transition-all uppercase tracking-wide"
                  >
                    <Mail size={18} />
                    Abrir el correo de nuevo
                  </a>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#1fbd59] text-white font-bold px-8 py-4 rounded-sm transition-all uppercase tracking-wide"
                  >
                    <MessageCircle size={18} />
                    Escribir por WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setFormData(FORM_INICIAL); }}
                    className="text-slate-400 hover:text-white text-sm mt-3 underline underline-offset-4"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              </div>
            ) : (
            <>
            <h4 className="text-2xl font-bold text-white mb-6">Solicitar Cotización</h4>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo trampa anti-spam: invisible para personas */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-slate-300 mb-1">Empresa</label>
                  <input required type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors"
                  />
                  {errors.empresa && <p className="text-red-300 text-xs mt-1">{errors.empresa}</p>}
                </div>
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-1">Nombre Completo</label>
                  <input required type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors"
                  />
                  {errors.nombre && <p className="text-red-300 text-xs mt-1">{errors.nombre}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-slate-300 mb-1">Correo Corporativo</label>
                  <input required type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold transition-colors"
                  />
                  {errors.correo && <p className="text-red-300 text-xs mt-1">{errors.correo}</p>}
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
                    <option value="Espesantes">Espesantes</option>
                    <option value="Aditivos">Aditivos</option>
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

              {errorGeneral && (
                <p className="text-red-300 text-sm bg-red-900/30 border border-red-400/30 rounded-sm px-4 py-3">{errorGeneral}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full flex justify-center items-center gap-2 bg-insamco-gold hover:bg-yellow-500 disabled:opacity-60 text-insamco-blue font-bold px-8 py-4 rounded-sm transition-all uppercase tracking-wide mt-4"
              >
                {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {sending ? 'Enviando...' : 'Enviar Solicitud de Cotización'}
              </button>
            </form>
            </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
