// Función serverless que conecta el chatbot del sitio con Google Gemini.
// La clave GEMINI_API_KEY vive como variable de entorno en Netlify:
// nunca se expone en el navegador del visitante.

const SYSTEM_PROMPT = `Eres el asistente virtual de Grupo Insamco S.A.S., un comercializador e
importador de materias primas e insumos industriales con sede en Cúcuta, Norte de Santander,
Colombia, fundado en 2015 (más de 10 años en el mercado). Atiende en español, con tono cordial
y profesional, y responde en máximo 3-4 frases.

Información de la empresa que puedes usar:
- Productos: dióxido de titanio (Doguide SR-2377, Lomon Billions R-996, Billions BLR-895),
  resinas (acrílica estirenada, vinil acrílica, elastomérica), cargas minerales (caolín,
  carbonato de calcio), espesantes y aditivos. 28 referencias: 22 base agua y 6 base solvente.
- Aplicaciones: pintura arquitectónica, plásticos y masterbatch, recubrimientos automotrices
  e industriales.
- Servicios: asesoría técnica especializada, soporte técnico y comercial, coordinación
  logística integral, suministro nacional e importado.
- Cobertura: Colombia (consolidado) y Venezuela (en expansión). Sectores privado y público.
- Dirección: Avenida 7A # 19 N-50, Parque Industrial del Oriente, Bloque 2, Bodegas 1-3, Cúcuta.
- WhatsApp: +57 350 717 4992. Correos: sergio@grupoinsamco.com y andreaosorio@grupoinsamco.com.
- Horario: lunes a viernes, 8:00-12:00 y 14:00-17:00.

Si te preguntan precios exactos o disponibilidad, invita a solicitar cotización por el
formulario del sitio o por WhatsApp. Si te preguntan algo ajeno a la empresa, redirige
amablemente la conversación hacia los productos y servicios de Grupo Insamco.`;

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Método no permitido' }, { status: 405 });
  }
  const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI;
  if (!apiKey) {
    return Response.json({ error: 'GEMINI_API_KEY no configurada' }, { status: 500 });
  }

  let history;
  try {
    ({ history } = await req.json());
  } catch {
    return Response.json({ error: 'JSON inválido' }, { status: 400 });
  }
  if (!Array.isArray(history) || history.length === 0) {
    return Response.json({ error: 'Historial vacío' }, { status: 400 });
  }

  const contents = history.slice(-10).map((m) => ({
    role: m.role === 'model' ? 'model' : 'user',
    parts: [{ text: String(m.text || '').slice(0, 2000) }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    console.error('Gemini error', res.status, detail);
    return Response.json({ error: 'Error del modelo', debug_status: res.status, debug_detail: detail.slice(0, 120), debug_key: { usada: apiKey.slice(0,6)+'...'+String(apiKey.length)+'chars', hay_GEMINI_API_KEY: !!process.env.GEMINI_API_KEY, hay_GEMINI: !!process.env.GEMINI } }, { status: 502 });
  }

  const data = await res.json();
  const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
  if (!reply) {
    return Response.json({ error: 'Respuesta vacía del modelo' }, { status: 502 });
  }
  return Response.json({ reply });
};

export const config = { path: '/api/chat' };
