import { useState } from 'react';
import { FlaskConical, Layers, Mountain, Droplet, Download, X, ZoomIn } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const products = [
  {
    id: "titanio",
    category: "Dióxido de Titanio",
    icon: <FlaskConical className="w-6 h-6" />,
    items: ["Doguide SR-2377", "Lomon Billions R-996", "Billions BLR-895"],
    description: "Pigmentos blancos de altísima pureza y poder cubriente.",
    image: "/media/producto-1.jpg"
  },
  {
    id: "resinas",
    category: "Resinas",
    icon: <Layers className="w-6 h-6" />,
    items: ["Acrílica Estirenada", "Vinil Acrílica", "Elastomérica"],
    description: "Vehículos base esenciales para formulaciones duraderas.",
    image: "/media/producto-2.jpg"
  },
  {
    id: "minerales",
    category: "Cargas Minerales",
    icon: <Mountain className="w-6 h-6" />,
    items: ["Caolín", "Carbonato de Calcio"],
    description: "Optimizadores de propiedades mecánicas y de volumen.",
    image: "/media/producto-3.jpg"
  },
  {
    id: "aditivos",
    category: "Aditivos Especiales",
    icon: <Droplet className="w-6 h-6" />,
    items: ["Espesantes", "Dispersantes", "Antiespumantes"],
    description: "Ajuste fino para reología y estabilidad de aplicación.",
    image: "/media/producto-4.jpg"
  }
];

export function Products() {
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null);

  const handleDownloadCatalog = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(26, 54, 93); // insamco-blue
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('GRUPO INSAMCO S.A.S.', 20, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Catálogo de Materias Primas Industriales', 20, 30);
    
    // Body
    doc.setTextColor(0, 0, 0);
    let startY = 50;

    products.forEach((product) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 54, 93);
      doc.text(product.category, 20, startY);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(product.description, 20, startY + 6);
      
      // @ts-ignore
      doc.autoTable({
        startY: startY + 10,
        head: [['Producto', 'Disponibilidad']],
        body: product.items.map(item => [item, 'Stock Inmediato']),
        theme: 'striped',
        headStyles: { fillColor: [226, 193, 68], textColor: [26, 54, 93], fontStyle: 'bold' },
        styles: { font: 'helvetica' },
        margin: { left: 20, right: 20 }
      });
      
      // @ts-ignore
      startY = doc.lastAutoTable.finalY + 15;
      
      if (startY > 250) {
        doc.addPage();
        startY = 20;
      }
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generado automáticamente - Grupo Insamco S.A.S. - desde 2015', 20, 285);
    
    doc.save('Catalogo_Productos_Insamco.pdf');
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
            <button 
              onClick={handleDownloadCatalog}
              className="shrink-0 bg-insamco-gold hover:bg-yellow-500 text-insamco-blue font-bold px-6 py-3 rounded-sm transition-colors uppercase tracking-wide text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Download size={18} />
              Descargar Catálogo PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-slate-200 hover:border-insamco-blue transition-colors group rounded-sm overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md">
              <button
                type="button"
                onClick={() => setZoomed({ src: product.image, alt: product.category })}
                className="relative block w-full cursor-zoom-in group/img"
                aria-label={`Ampliar ficha de ${product.category}`}
              >
                {/* Las fichas son infografías con texto: se muestran completas, sin recorte */}
                <img
                  src={product.image}
                  alt={product.category}
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 rounded-sm bg-insamco-blue/80 px-2 py-1 text-[11px] font-semibold text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                  <ZoomIn size={12} /> Ampliar
                </span>
              </button>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-insamco-gold">
                    {product.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">{product.category}</h4>
                </div>
                <p className="text-sm text-slate-500 mb-6 flex-grow">{product.description}</p>
                <ul className="space-y-2 mt-auto">
                  {product.items.map((item, i) => (
                    <li key={i} className="flex items-center text-sm font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-insamco-gold mr-2 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
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
    </section>
  );
}
