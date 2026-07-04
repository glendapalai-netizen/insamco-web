import { Home, FlaskConical, Wrench, Building2, Mail } from 'lucide-react';

export type TabId = 'inicio' | 'productos' | 'servicios' | 'nosotros' | 'contacto';

const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
  { id: 'inicio', label: 'Inicio', icon: <Home size={22} /> },
  { id: 'productos', label: 'Productos', icon: <FlaskConical size={22} /> },
  { id: 'servicios', label: 'Servicios', icon: <Wrench size={22} /> },
  { id: 'nosotros', label: 'Nosotros', icon: <Building2 size={22} /> },
  { id: 'contacto', label: 'Contacto', icon: <Mail size={22} /> },
];

// Barra de navegación inferior estilo app móvil (solo visible en celular).
export function MobileTabBar({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <nav
      className="md:hidden fixed inset-x-0 bottom-0 z-[90] bg-insamco-blue border-t border-white/10 shadow-[0_-8px_30px_rgba(8,26,51,0.35)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Navegación principal"
    >
      <div className="grid grid-cols-5">
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold tracking-wide transition-colors ${
                isActive ? 'text-insamco-gold' : 'text-slate-400 active:text-slate-200'
              }`}
            >
              <span className={`transition-transform ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>{t.icon}</span>
              {t.label}
              <span className={`h-1 w-6 rounded-full transition-colors ${isActive ? 'bg-insamco-gold' : 'bg-transparent'}`}></span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
