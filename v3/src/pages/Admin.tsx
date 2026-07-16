import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, LogOut, RefreshCw, Loader2, ClipboardList, FileText, ArrowLeft, Check } from 'lucide-react';

// Panel comercial de Grupo Insamco (V3): cotizaciones y solicitudes de ficha técnica,
// con "chulito" para marcar cada lead como contactado.

type Lead = {
  id: string;
  tipo: 'cotizacion' | 'ficha';
  empresa: string;
  nombre: string;
  correo: string;
  telefono?: string;
  pais?: string;
  producto?: string;
  requerimientos?: string;
  contactado: boolean;
  nota?: string;
  createdAt: string;
};

const TOKEN_KEY = 'insamco_v3_admin_token';

const fechaBonita = (iso: string) => {
  try {
    return new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
};

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));

  if (!token) return <Login onToken={(t) => { sessionStorage.setItem(TOKEN_KEY, t); setToken(t); }} />;
  return <Dashboard token={token} onLogout={() => { sessionStorage.removeItem(TOKEN_KEY); setToken(null); }} />;
}

function Login({ onToken }: { onToken: (t: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.detail || 'Usuario o clave incorrectos.');
        return;
      }
      onToken(data.token);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-insamco-blue flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-sm bg-insamco-gold flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-insamco-blue" />
          </div>
          <h1 className="text-2xl font-bold text-white">Panel Comercial</h1>
          <p className="text-slate-400 text-sm mt-1">Grupo Insamco S.A.S.</p>
        </div>
        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Clave</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-insamco-gold focus:ring-1 focus:ring-insamco-gold"
            />
          </div>
          {error && <p className="text-red-300 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-insamco-gold hover:bg-yellow-500 disabled:opacity-60 text-insamco-blue font-bold px-6 py-3 rounded-sm uppercase tracking-wide text-sm transition-colors"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Entrar
          </button>
        </form>
        <Link to="/" className="mt-6 flex items-center justify-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <ArrowLeft size={14} /> Volver al sitio
        </Link>
      </div>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<'quotes' | 'datasheets'>('quotes');
  const [quotes, setQuotes] = useState<Lead[]>([]);
  const [datasheets, setDatasheets] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargar = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [rq, rd] = await Promise.all([
        fetch('/api/quotes', { headers }),
        fetch('/api/datasheet-requests', { headers }),
      ]);
      if (rq.status === 401 || rd.status === 401) {
        onLogout();
        return;
      }
      setQuotes(await rq.json());
      setDatasheets(await rd.json());
    } catch {
      setError('No se pudieron cargar los datos. Revisa tu conexión.');
    } finally {
      setLoading(false);
    }
  }, [token, onLogout]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const marcar = async (lead: Lead) => {
    const col = lead.tipo === 'cotizacion' ? 'quotes' : 'datasheet-requests';
    const setList = lead.tipo === 'cotizacion' ? setQuotes : setDatasheets;
    // Cambio optimista: el chulito responde al instante
    setList((prev) => prev.map((i) => (i.id === lead.id ? { ...i, contactado: !lead.contactado } : i)));
    try {
      const res = await fetch(`/api/${col}/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ contactado: !lead.contactado }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setList((prev) => prev.map((i) => (i.id === lead.id ? { ...i, contactado: lead.contactado } : i)));
    }
  };

  const lista = tab === 'quotes' ? quotes : datasheets;
  const pendientes = (l: Lead[]) => l.filter((i) => !i.contactado).length;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-insamco-blue text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Panel Comercial — Grupo Insamco</h1>
            <p className="text-slate-400 text-xs">Cotizaciones y fichas técnicas</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/book/"
              target="_blank"
              rel="noreferrer"
              title="EL BOOK de la marca"
              className="inline-flex items-center gap-2 bg-insamco-gold text-insamco-blue font-bold rounded-sm px-3 py-2 text-sm hover:brightness-110 transition"
            >
              📖 <span className="hidden sm:inline">EL BOOK</span>
            </a>
            <button
              onClick={cargar}
              title="Actualizar"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-insamco-gold rounded-sm px-3 py-2 text-sm transition-colors"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 border border-white/20 hover:border-red-400 hover:text-red-300 rounded-sm px-3 py-2 text-sm transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 mb-6">
          <TabButton
            active={tab === 'quotes'}
            onClick={() => setTab('quotes')}
            icon={<ClipboardList size={16} />}
            label="Cotizaciones"
            badge={pendientes(quotes)}
          />
          <TabButton
            active={tab === 'datasheets'}
            onClick={() => setTab('datasheets')}
            icon={<FileText size={16} />}
            label="Fichas técnicas"
            badge={pendientes(datasheets)}
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-sm px-4 py-3 mb-6">{error}</p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mr-2" /> Cargando...
          </div>
        ) : lista.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-sm py-16 text-center text-slate-400">
            Aún no hay {tab === 'quotes' ? 'cotizaciones' : 'solicitudes de ficha técnica'}.
          </div>
        ) : (
          <div className="space-y-3">
            {lista.map((lead) => (
              <div
                key={lead.id}
                className={`bg-white border rounded-sm p-5 flex flex-col sm:flex-row sm:items-start gap-4 transition-colors ${
                  lead.contactado ? 'border-slate-200 opacity-70' : 'border-insamco-gold/60 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => marcar(lead)}
                  title={lead.contactado ? 'Marcar como pendiente' : 'Marcar como contactado'}
                  className={`shrink-0 w-7 h-7 rounded-sm border-2 flex items-center justify-center transition-colors ${
                    lead.contactado
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-slate-300 hover:border-insamco-gold text-transparent'
                  }`}
                >
                  <Check size={16} strokeWidth={3} />
                </button>
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-bold text-slate-900">{lead.empresa || lead.nombre}</span>
                    <span className="text-slate-500 text-sm">{lead.nombre}</span>
                    <span className="text-xs text-slate-400">{fechaBonita(lead.createdAt)}</span>
                  </div>
                  <div className="mt-1.5 text-sm text-slate-600 space-y-0.5">
                    <p>
                      <a href={`mailto:${lead.correo}`} className="text-insamco-blue hover:underline">{lead.correo}</a>
                      {lead.telefono && (
                        <>
                          {' · '}
                          <a
                            href={`https://wa.me/${lead.telefono.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-insamco-blue hover:underline"
                          >
                            {lead.telefono}
                          </a>
                        </>
                      )}
                      {lead.pais && <span className="text-slate-400"> · {lead.pais}</span>}
                    </p>
                    {lead.producto && (
                      <p><span className="font-medium text-slate-700">Producto:</span> {lead.producto}</p>
                    )}
                    {lead.requerimientos && (
                      <p className="text-slate-500"><span className="font-medium text-slate-700">Requerimientos:</span> {lead.requerimientos}</p>
                    )}
                  </div>
                </div>
                <span
                  className={`shrink-0 self-start text-[11px] font-bold uppercase tracking-wide rounded-sm px-2 py-1 ${
                    lead.contactado ? 'bg-green-100 text-green-700' : 'bg-insamco-gold/20 text-insamco-blue'
                  }`}
                >
                  {lead.contactado ? 'Contactado' : 'Pendiente'}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, badge }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wide transition-colors ${
        active ? 'bg-insamco-blue text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-insamco-blue'
      }`}
    >
      {icon}
      {label}
      {badge > 0 && (
        <span className={`text-[11px] rounded-full px-2 py-0.5 ${active ? 'bg-insamco-gold text-insamco-blue' : 'bg-insamco-blue text-white'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}
