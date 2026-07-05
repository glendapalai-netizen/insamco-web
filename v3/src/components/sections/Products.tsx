import { useState } from 'react';
import { FlaskConical, Layers, Mountain, Droplet, Gauge, Beaker, Download, X, ZoomIn, FileText, Mail, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';

const CORREOS_COMERCIALES = 'sergio@grupoinsamco.com,andreaosorio@grupoinsamco.com';
const WHATSAPP = '573507174992';
// Catálogo oficial en PDF (enviado por Sergio); para actualizarlo basta reemplazar este archivo
const CATALOGO_PDF = '/media/Catalogo-Materias-Primas-Insamco.pdf';

// Fichas infográficas (láminas) que se muestran completas y ampliables
const laminas = [
  { id: 'titanio', titulo: 'Dióxido de Titanio', image: '/media/producto-1.jpg' },
  { id: 'resinas', titulo: 'Resinas', image: '/media/producto-2.jpg' },
  { id: 'minerales', titulo: 'Cargas Minerales', image: '/media/producto-3.jpg' },
  { id: 'aditivos', titulo: 'Aditivos Especiales', image: '/media/producto-4.jpg' },
];

// Catálogo oficial por líneas y categorías (PDF "Catálogo Portafolio de Materias Primas")
const lineas = [
  {
    id: 'agua',
    titulo: 'Línea Base Agua',
    categorias: [
      {
        id: 'pigmentos',
        category: 'Pigmentos',
        icon: <FlaskConical className="w-6 h-6" />,
        description: 'Dióxidos de titanio de altísima pureza y poder cubriente.',
        items: [
          'Dióxido de Titanio Doguide SR-2377',
          'Dióxido de Titanio Lomon Billions R-996',
          'Dióxido de Titanio Billions BLR-895 (Grado Cloruro)',
        ],
      },
      {
        id: 'resinas-agua',
        category: 'Resinas',
        icon: <Layers className="w-6 h-6" />,
        description: 'Vehículos base esenciales para formulaciones duraderas.',
        items: ['Resina Acrílica Estirenada 554', 'Resina Vinil Acrílica 6503', 'Resina Elastomérica 553'],
      },
      {
        id: 'minerales',
        category: 'Cargas Minerales',
        icon: <Mountain className="w-6 h-6" />,
        description: 'Optimizadores de propiedades mecánicas y de volumen.',
        items: [
          'Caolín Calcinado Atlas C98',
          'Caomín C-085-20 (Caolín Tiza)',
          'Carbonato de Calcio OMYA 1',
          'Carbonato de Calcio OMYA 4',
        ],
      },
      {
        id: 'espesantes',
        category: 'Espesantes',
        icon: <Gauge className="w-6 h-6" />,
        description: 'Control preciso de la reología y viscosidad de tus formulaciones.',
        items: [
          'Espesante Acrílico Texilan 538',
          'Espesante Uretánico U300E',
          'Espesante Celulósico Tylose 100.000',
          'Espesante Celulósico Tylose 60.000',
        ],
      },
      {
        id: 'aditivos-agua',
        category: 'Aditivos',
        icon: <Droplet className="w-6 h-6" />,
        description: 'Ajuste fino para estabilidad, aplicación y desempeño.',
        items: [
          'Bactericida APS 7601',
          'Texanol Coalescente',
          'Dispersante Texilan 1560',
          'Antiespumante INDOL NDW',
          'Nivelador de pH Date P',
          'Nonil Fenol Tergitol 10 moles',
          'Hidrofugante Indol EP',
        ],
      },
      {
        id: 'solventes-aux',
        category: 'Solventes y Auxiliares',
        icon: <Beaker className="w-6 h-6" />,
        description: 'Complementos esenciales para el proceso productivo.',
        items: ['Monoetilenglicol'],
      },
    ],
  },
  {
    id: 'solvente',
    titulo: 'Línea Base Solvente',
    categorias: [
      {
        id: 'resinas-solvente',
        category: 'Resinas',
        icon: <Layers className="w-6 h-6" />,
        description: 'Bases para esmaltes y acabados de alto desempeño.',
        items: ['Resina Media en Soya 025P al 50% para Esmaltes'],
      },
      {
        id: 'aditivos-solvente',
        category: 'Aditivos',
        icon: <Droplet className="w-6 h-6" />,
        description: 'Secado, dispersión y estabilidad para sistemas base solvente.',
        items: [
          'Secante Trimetálico',
          'Dispersante Troysperce CD1',
          'Antinata Antipiel',
          'Antisedimentante (Bentona 34)',
          'Emulsificante Diasstab GAT',
        ],
      },
    ],
  },
];

type FichaForm = { nombre: string; empresa: string; correo: string };
const FICHA_INICIAL: FichaForm = { nombre: '', empresa: '', correo: '' };

export function Products() {
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null);
  const [fichaProducto, setFichaProducto] = useState<string | null>(null);
  const [fichaForm, setFichaForm] = useState<FichaForm>(FICHA_INICIAL);
  const [fichaEnviando, setFichaEnviando] = useState(false);
  const [fichaEnviada, setFichaEnviada] = useState(false);
  const [fichaErrores, setFichaErrores] = useState<Record<string, string>>({});
  const [fichaErrorGeneral, setFichaErrorGeneral] = useState('');

  const abrirFicha = (producto: string) => {
    setFichaProducto(producto);
    setFichaForm(FICHA_INICIAL);
    setFichaEnviada(false);
    setFichaErrores({});
    setFichaErrorGeneral('');
  };

  const cerrarFicha = () => setFichaProducto(null);

  const mailtoFicha = () => {
    const subject = encodeURIComponent(`Solicitud de ficha técnica — ${fichaProducto}`);
    const body = encodeURIComponent(
      `Buen día,\n\nSolicito la ficha técnica del producto: ${fichaProducto}\n\n` +
      `Nombre: ${fichaForm.nombre}\nEmpresa: ${fichaForm.empresa}\nCorreo: ${fichaForm.correo}\n\n` +
      `Gracias.\n${fichaForm.nombre}`
    );
    return `mailto:${CORREOS_COMERCIALES}?subject=${subject}&body=${body}`;
  };

  const enviarFicha = async (e: React.FormEvent) => {
    e.preventDefault();
    setFichaEnviando(true);
    setFichaErrores({});
    setFichaErrorGeneral('');
    try {
      const res = await fetch('/api/datasheet-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto: fichaProducto, ...fichaForm }),
      });
      if (res.status === 422) {
        const data = await res.json();
        setFichaErrores(data?.detail?.errors || {});
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFichaEnviada(true);
      // Flujo V2: queda guardada en el panel y se abre el correo del usuario ya redactado
      window.location.href = mailtoFicha();
    } catch {
      setFichaErrorGeneral('No pudimos registrar la solicitud. Intenta de nuevo en unos segundos.');
    } finally {
      setFichaEnviando(false);
    }
  };

  return (
    <section id="productos" className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest uppercase text-insamco-blue mb-3">Catálogo Especializado</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Portafolio de Insumos</h3>
            <p className="text-slate-600 text-lg">
              Contamos con un amplio inventario que incluye <strong className="text-insamco-blue">22 referencias base agua</strong> y <strong className="text-insamco-blue">6 referencias base solvente</strong> para cubrir todas las necesidades del mercado.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contacto"
              className="shrink-0 bg-transparent border-2 border-insamco-blue hover:bg-slate-100 text-insamco-blue font-bold px-6 py-3 rounded-sm transition-colors uppercase tracking-wide text-sm flex justify-center"
            >
              Consultar Disponibilidad
            </a>
            <a
              href={CATALOGO_PDF}
              download="Catalogo-Materias-Primas-Insamco.pdf"
              className="shrink-0 bg-insamco-gold hover:bg-yellow-500 text-insamco-blue font-bold px-6 py-3 rounded-sm transition-colors uppercase tracking-wide text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Download size={18} />
              Descargar Catálogo PDF
            </a>
          </div>
        </div>

        {/* Láminas infográficas: completas, sin recorte, ampliables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {laminas.map((lamina) => (
            <button
              key={lamina.id}
              type="button"
              onClick={() => setZoomed({ src: lamina.image, alt: lamina.titulo })}
              className="relative block w-full cursor-zoom-in group/img bg-white border border-slate-200 hover:border-insamco-blue transition-colors rounded-sm overflow-hidden shadow-sm hover:shadow-md"
              aria-label={`Ampliar ficha de ${lamina.titulo}`}
            >
              <img
                src={lamina.image}
                alt={lamina.titulo}
                className="w-full h-auto block"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 rounded-sm bg-insamco-blue/80 px-2 py-1 text-[11px] font-semibold text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                <ZoomIn size={12} /> Ampliar
              </span>
            </button>
          ))}
        </div>

        {/* Catálogo oficial por líneas, con solicitud de ficha técnica */}
        {lineas.map((linea) => (
        <div key={linea.id} className="mb-12 last:mb-0">
          <div className="flex items-center gap-4 mb-6">
            <h4 className="text-xl font-bold text-insamco-blue uppercase tracking-wide">{linea.titulo}</h4>
            <div className="flex-grow h-px bg-insamco-gold/50"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linea.categorias.map((product) => (
            <div key={product.id} className="bg-white border border-slate-200 hover:border-insamco-blue transition-colors rounded-sm flex flex-col h-full shadow-sm hover:shadow-md">
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-insamco-gold">
                    {product.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight">{product.category}</h4>
                </div>
                <p className="text-sm text-slate-500 mb-5">{product.description}</p>
                <ul className="space-y-2.5 mt-auto">
                  {product.items.map((item, i) => (
                    <li key={i} className="flex items-center justify-between gap-2 text-sm font-medium text-slate-700">
                      <span className="flex items-center min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-insamco-gold mr-2 shrink-0"></span>
                        <span className="truncate">{item}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => abrirFicha(item)}
                        className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-insamco-blue border border-insamco-blue/30 hover:border-insamco-blue hover:bg-insamco-blue hover:text-white rounded-sm px-2 py-1 transition-colors"
                        title={`Solicitar ficha técnica de ${item}`}
                      >
                        <FileText size={12} />
                        Ficha técnica
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          </div>
        </div>
        ))}
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          onClick={() => setZoomed(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            aria-label="Cerrar imagen ampliada"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>
          <img src={zoomed.src} alt={zoomed.alt} className="max-h-full max-w-full object-contain" />
        </div>
      )}

      {fichaProducto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={cerrarFicha}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md bg-white rounded-sm shadow-2xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={cerrarFicha}
              aria-label="Cerrar"
              className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            {fichaEnviada ? (
              <div className="text-center py-4">
                <CheckCircle2 className="w-14 h-14 text-insamco-gold mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">¡Solicitud registrada!</h4>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Se abrió tu correo con la solicitud de <strong>{fichaProducto}</strong> ya redactada —
                  solo dale <strong>enviar</strong>. Si no se abrió, usa el botón dorado.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={mailtoFicha()}
                    className="w-full flex justify-center items-center gap-2 bg-insamco-gold hover:bg-yellow-500 text-insamco-blue font-bold px-6 py-3.5 rounded-sm transition-all uppercase tracking-wide text-sm"
                  >
                    <Mail size={16} />
                    Abrir el correo de nuevo
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Buen día, solicito la ficha técnica de: ${fichaProducto}. Soy ${fichaForm.nombre} de ${fichaForm.empresa}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#1fbd59] text-white font-bold px-6 py-3.5 rounded-sm transition-all uppercase tracking-wide text-sm"
                  >
                    <MessageCircle size={16} />
                    Prefiero por WhatsApp
                  </a>
                </div>
                <button
                  type="button"
                  onClick={cerrarFicha}
                  className="text-slate-400 hover:text-slate-700 text-sm mt-4 underline underline-offset-4"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <FileText className="text-insamco-gold" size={22} />
                  <h4 className="text-xl font-bold text-slate-900">Solicitar ficha técnica</h4>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Producto: <strong className="text-insamco-blue">{fichaProducto}</strong>
                </p>
                <form onSubmit={enviarFicha} className="space-y-4">
                  <div>
                    <label htmlFor="ficha-nombre" className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                    <input
                      required
                      id="ficha-nombre"
                      type="text"
                      value={fichaForm.nombre}
                      onChange={(e) => setFichaForm({ ...fichaForm, nombre: e.target.value })}
                      className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-slate-900 focus:outline-none focus:border-insamco-blue focus:ring-1 focus:ring-insamco-blue"
                    />
                    {fichaErrores.nombre && <p className="text-red-500 text-xs mt-1">{fichaErrores.nombre}</p>}
                  </div>
                  <div>
                    <label htmlFor="ficha-empresa" className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                    <input
                      required
                      id="ficha-empresa"
                      type="text"
                      value={fichaForm.empresa}
                      onChange={(e) => setFichaForm({ ...fichaForm, empresa: e.target.value })}
                      className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-slate-900 focus:outline-none focus:border-insamco-blue focus:ring-1 focus:ring-insamco-blue"
                    />
                    {fichaErrores.empresa && <p className="text-red-500 text-xs mt-1">{fichaErrores.empresa}</p>}
                  </div>
                  <div>
                    <label htmlFor="ficha-correo" className="block text-sm font-medium text-slate-700 mb-1">Correo</label>
                    <input
                      required
                      id="ficha-correo"
                      type="email"
                      value={fichaForm.correo}
                      onChange={(e) => setFichaForm({ ...fichaForm, correo: e.target.value })}
                      className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-slate-900 focus:outline-none focus:border-insamco-blue focus:ring-1 focus:ring-insamco-blue"
                    />
                    {fichaErrores.correo && <p className="text-red-500 text-xs mt-1">{fichaErrores.correo}</p>}
                  </div>

                  {fichaErrorGeneral && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-sm px-4 py-3">{fichaErrorGeneral}</p>
                  )}

                  <button
                    type="submit"
                    disabled={fichaEnviando}
                    className="w-full flex justify-center items-center gap-2 bg-insamco-blue hover:bg-[#122a4d] disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-sm transition-all uppercase tracking-wide text-sm"
                  >
                    {fichaEnviando ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                    {fichaEnviando ? 'Enviando...' : 'Solicitar ficha técnica'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
