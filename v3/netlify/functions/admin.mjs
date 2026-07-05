// Panel comercial de la V3 (trasplante del sistema de la V2, mejorado):
//  - Cotizaciones y solicitudes de ficha técnica guardadas en Netlify Blobs
//  - Login de administradores (Sergio y Andrea) con JWT
//  - "Chulito" de seguimiento: marcar cada lead como contactado

import { getStore } from '@netlify/blobs';
import crypto from 'node:crypto';

const EMAIL_RE = /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/;
const TOKEN_HOURS = 24;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const b64url = (buf) => Buffer.from(buf).toString('base64url');

function signToken(username, secret) {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const payload = b64url(JSON.stringify({ sub: username, role: 'admin', iat: now, exp: now + TOKEN_HOURS * 3600 }));
  const sig = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${sig}`;
}

function verifyToken(token, secret) {
  const parts = (token || '').split('.');
  if (parts.length !== 3) return null;
  const expected = crypto.createHmac('sha256', secret).update(`${parts[0]}.${parts[1]}`).digest();
  const given = Buffer.from(parts[2], 'base64url');
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    if (payload.exp && payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

function requireAdmin(req, secret) {
  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) return null;
  const p = verifyToken(auth.slice(7).trim(), secret);
  return p && p.role === 'admin' ? p : null;
}

export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, '') || '/';
  const method = req.method;
  const store = getStore({ name: 'insamco-v3', consistency: 'strong' });

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || '';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
  const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'insamco-secret';

  const body = async () => {
    try {
      return await req.json();
    } catch {
      return {};
    }
  };

  const readCol = async (key) => (await store.get(key, { type: 'json' })) || [];
  const saveCol = (key, items) => store.setJSON(key, items);

  // ---------- Login ----------
  if (path === '/api/auth/login' && method === 'POST') {
    const p = await body();
    const okUser = ADMIN_USERNAME && (p.username || '').trim().toLowerCase() === ADMIN_USERNAME.toLowerCase();
    const okPass = ADMIN_PASSWORD && p.password === ADMIN_PASSWORD;
    if (!okUser || !okPass) return json({ detail: 'Usuario o clave incorrectos.' }, 401);
    return json({ token: signToken(ADMIN_USERNAME.toLowerCase(), JWT_SECRET), username: ADMIN_USERNAME.toLowerCase() });
  }

  // ---------- Cotizaciones ----------
  if (path === '/api/quotes' && method === 'POST') {
    const p = await body();
    const empresa = (p.empresa || '').trim();
    const nombre = (p.nombre || '').trim();
    const correo = (p.correo || '').trim().toLowerCase();
    const item = {
      id: crypto.randomUUID(),
      tipo: 'cotizacion',
      empresa, nombre, correo,
      telefono: (p.telefono || '').trim(),
      pais: (p.pais || '').trim(),
      producto: (p.producto || '').trim(),
      requerimientos: (p.requerimientos || '').trim().slice(0, 2000),
      contactado: false,
      createdAt: new Date().toISOString(),
    };
    if ((p.website || '').trim()) return json(item); // honeypot anti-spam
    const errors = {};
    if (empresa.length < 2) errors.empresa = 'El nombre de la empresa es obligatorio.';
    if (nombre.length < 2) errors.nombre = 'El nombre es obligatorio.';
    if (!EMAIL_RE.test(correo)) errors.correo = 'Ingresa un correo válido.';
    if (Object.keys(errors).length) return json({ detail: { errors } }, 422);
    const items = await readCol('quotes');
    items.push(item);
    await saveCol('quotes', items);
    return json(item);
  }

  if (path === '/api/quotes' && method === 'GET') {
    if (!requireAdmin(req, JWT_SECRET)) return json({ detail: 'No autorizado.' }, 401);
    const items = await readCol('quotes');
    items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return json(items);
  }

  // ---------- Fichas técnicas ----------
  if (path === '/api/datasheet-requests' && method === 'POST') {
    const p = await body();
    const producto = (p.producto || '').trim().slice(0, 200);
    const nombre = (p.nombre || '').trim();
    const empresa = (p.empresa || '').trim();
    const correo = (p.correo || '').trim().toLowerCase();
    const item = {
      id: crypto.randomUUID(),
      tipo: 'ficha',
      producto, nombre, empresa, correo,
      contactado: false,
      createdAt: new Date().toISOString(),
    };
    if ((p.website || '').trim()) return json(item);
    const errors = {};
    if (producto.length < 2) errors.producto = 'El producto es obligatorio.';
    if (nombre.length < 2) errors.nombre = 'Ingresa tu nombre.';
    if (empresa.length < 2) errors.empresa = 'Ingresa tu empresa.';
    if (!EMAIL_RE.test(correo)) errors.correo = 'Ingresa un correo válido.';
    if (Object.keys(errors).length) return json({ detail: { errors } }, 422);
    const items = await readCol('datasheets');
    items.push(item);
    await saveCol('datasheets', items);
    return json(item);
  }

  if (path === '/api/datasheet-requests' && method === 'GET') {
    if (!requireAdmin(req, JWT_SECRET)) return json({ detail: 'No autorizado.' }, 401);
    const items = await readCol('datasheets');
    items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return json(items);
  }

  // ---------- El "chulito": marcar lead como contactado ----------
  const patchMatch = path.match(/^\/api\/(quotes|datasheet-requests)\/([^/]+)$/);
  if (patchMatch && method === 'PATCH') {
    if (!requireAdmin(req, JWT_SECRET)) return json({ detail: 'No autorizado.' }, 401);
    const col = patchMatch[1] === 'quotes' ? 'quotes' : 'datasheets';
    const p = await body();
    const items = await readCol(col);
    const idx = items.findIndex((i) => i.id === patchMatch[2]);
    if (idx === -1) return json({ detail: 'No encontrado.' }, 404);
    items[idx] = { ...items[idx], contactado: Boolean(p.contactado), nota: typeof p.nota === 'string' ? p.nota.slice(0, 500) : items[idx].nota };
    await saveCol(col, items);
    return json(items[idx]);
  }

  return json({ detail: 'No encontrado' }, 404);
};

export const config = {
  path: ['/api/auth/login', '/api/quotes', '/api/quotes/*', '/api/datasheet-requests', '/api/datasheet-requests/*'],
};
