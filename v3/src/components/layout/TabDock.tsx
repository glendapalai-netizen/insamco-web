import { Home, FlaskConical, Wrench, Building2, Mail } from 'lucide-react';

export type TabId = 'inicio' | 'productos' | 'servicios' | 'nosotros' | 'contacto';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'inicio', label: 'Inicio', icon: <Home size={20} /> },
  { id: 'productos', label: 'Productos', icon: <FlaskConical size={20} /> },
  { id: 'servicios', label: 'Servicios', icon: <Wrench size={20} /> },
  { id: 'nosotros', label: 'Nosotros', icon: <Building2 size={20} /> },
  { id: 'contacto', label: 'Contacto', icon: <Mail size={20} /> },
];

// Dock flotante inferior estilo app: translúcido, centrado, para celular y computador.
export function TabDock({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <div
      className="fixed inset-x-0 bottom-3 md:bottom-5 z-[90] flex justify-center pointer-events-none px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav
        aria-label="Navegación principal"
        className="pointer-events-auto flex items-center gap-0.5 md:gap-1 rounded-full bg-insamco-blue/80 backdrop-blur-md border border-white/15 shadow-[0_10px_40px_rgba(8,26,51,0.45)] px-2 py-1.5"
      >
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-full px-3.5 md:px-6 py-1.5 text-[10px] md:text-[11px] font-semibold tracking-wide transition-all ${
                isActive
                  ? 'text-insamco-gold bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`transition-transform ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
