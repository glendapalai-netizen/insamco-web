import { Smartphone, RefreshCw, Leaf, QrCode } from 'lucide-react';

export function ExchangeCard() {
  return (
    <section className="py-20 bg-insamco-blue text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-insamco-gold blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-insamco-gold font-bold tracking-[0.2em] text-sm uppercase">Gratis para nuestros clientes</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">Insamco Exchange:<br />la tasa del día, siempre contigo</h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Nuestra tarjeta de presentación digital para la zona fronteriza: un conversor de divisas
              conectado con los cambios del día — incluidas las tasas de frontera — que vive en tu teléfono.
            </p>
            <ul className="space-y-4 text-slate-200">
              <li className="flex gap-3"><RefreshCw className="w-6 h-6 text-insamco-gold flex-none" /><span><b>Tasas actualizadas</b> del mercado y de la frontera, al día.</span></li>
              <li className="flex gap-3"><Smartphone className="w-6 h-6 text-insamco-gold flex-none" /><span><b>Se instala como una app</b>: ábrela y guárdala en tu pantalla de inicio — sin ocupar espacio ni descargas de tienda.</span></li>
              <li className="flex gap-3"><Leaf className="w-6 h-6 text-insamco-gold flex-none" /><span><b>Ecológica y permanente</b>: la tarjeta de presentación que nunca se bota ni se pierde.</span></li>
              <li className="flex gap-3"><QrCode className="w-6 h-6 text-insamco-gold flex-none" /><span><b>Compártela con un escaneo</b> — el QR la lleva a cualquier teléfono.</span></li>
            </ul>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="https://grupoinsamcoexchange.netlify.app" target="_blank" rel="noreferrer"
                 className="bg-insamco-gold text-insamco-blue font-bold px-8 py-4 rounded-sm hover:brightness-110 transition">
                Abrir el conversor →
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8">
            <img src="/media/exchange/tarjeta.jpg" alt="Insamco Exchange en el teléfono"
                 className="w-48 md:w-56 rounded-[2rem] border-[6px] border-slate-800 shadow-2xl shadow-black/40" />
            <div className="bg-white p-4 rounded-sm shadow-2xl shadow-black/40 hidden sm:block">
              <img src="/media/exchange/qr-exchange.png" alt="QR Insamco Exchange" className="w-44" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
