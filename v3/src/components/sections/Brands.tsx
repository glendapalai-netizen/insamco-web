export function Brands() {
  const brands = [
    { src: "/media/aliadas/doguide.png", name: "Doguide Group", alt: "Doguide Group — pigmentos de dióxido de titanio" },
    { src: "/media/aliadas/lomon.png", name: "LB Group · Lomon Billions", alt: "LB Group (Lomon Billions) — dióxido de titanio" },
    { src: "/media/aliadas/andercol.png", name: "Andercol", alt: "Andercol — soluciones químicas" },
    { src: "/media/aliadas/pangang.png", name: "Pangang · Ansteel", alt: "Pangang Vanadium and Titanium (Ansteel Group)" },
    { src: "/media/aliadas/atlas.png", name: "Atlas C-98", alt: "Caolín Calcinado Atlas C-98" }
  ];

  return (
    <section className="py-16 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-insamco-gold font-bold tracking-[0.2em] text-sm uppercase">Respaldo internacional</span>
          <h2 className="text-2xl md:text-3xl font-bold text-insamco-blue mt-3">Marcas que representamos</h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
            Importación directa de fabricantes líderes — la misma calidad que usan los grandes de la industria, con stock en Cúcuta.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {brands.map((b, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-white border border-slate-100 rounded-sm p-6 h-28 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/60"
              title={b.name}
            >
              <img src={b.src} alt={b.alt} loading="lazy" className="max-h-16 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
