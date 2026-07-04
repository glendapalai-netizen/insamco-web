export function Logo({ className = '', full = true }: { className?: string, full?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblema real de la marca (isotipo dorado sobre azul) */}
      <img
        src="/media/logo-badge.png"
        alt="Grupo Insamco S.A.S."
        className="shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-full object-cover shadow-sm ring-1 ring-insamco-gold/40"
      />
      {full && (
        <div className="flex flex-col justify-center">
          <span className="font-display font-bold tracking-wide text-xl lg:text-2xl leading-tight uppercase">
            Grupo Insamco <span className="text-insamco-gold">S.A.S.</span>
          </span>
          <span className="text-[11px] tracking-widest text-slate-500 font-sans uppercase">
            — desde 2015 —
          </span>
        </div>
      )}
    </div>
  );
}
