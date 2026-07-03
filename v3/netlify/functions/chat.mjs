// Chat "Tyti" de la V3 adaptado a Netlify Functions.
// Replica el protocolo del server.ts original de AI Studio:
//   entrada  POST /api/chat { messages: [{role, content}], useThinking }
//   salida   SSE "data: {\"text\": ...}" ... "data: [DONE]"

const SYSTEM_PROMPT =
  "Eres Tyti, un asistente virtual experto y amigable de 'Grupo Insamco S.A.S.', una empresa colombiana que comercializa e importa materias primas e insumos industriales (dióxido de titanio, resinas, cargas minerales, aditivos) para sectores de plásticos, pinturas y recubrimientos. Responde preguntas sobre nuestros productos, servicios, asesoría técnica y logística. Mantén un tono profesional, confiable e industrial, pero conversacional. Responde siempre en español. Si preguntan precios o cotizaciones, invita a usar el formulario de la página o WhatsApp +57 350 717 4992. Datos: fundada en 2015 (más de 10 años), sede en Cúcuta (Av. 7A # 19N-50, Parque Industrial del Oriente), horario lunes a viernes 8:00-12:00 y 14:00-17:00, correos sergio@grupoinsamco.com y andreaosorio@grupoinsamco.com.";

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Método no permitido' }, { status: 405 });
  }
  const apiKey = process.env.GEMINI || process.env.GEMINI_API_KEY_SITE || '';
  if (!apiKey) return Response.json({ error: 'El asistente no está configurado.' }, { status: 500 });

  let messages, useThinking;
  try {
    ({ messages, useThinking } = await req.json());
  } catch {
    return Response.json({ error: 'JSON inválido' }, { status: 400 });
  }
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'Messages array is required' }, { status: 400 });
  }

  const contents = messages.slice(-20).map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: String(m.content || '').slice(0, 4000) }],
  }));

  const generationConfig = { maxOutputTokens: 1024, temperature: 0.7 };
  if (!useThinking) generationConfig.thinkingConfig = { thinkingBudget: 0 };

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig,
      }),
    }
  );

  if (!upstream.ok || !upstream.body) {
    console.error('Gemini error', upstream.status, await upstream.text().catch(() => ''));
    return Response.json({ error: 'El asistente no está disponible en este momento.' }, { status: 502 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      const reader = upstream.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      const emit = (frame) => {
        const line = frame.trim();
        if (!line.startsWith('data:')) return;
        try {
          const chunk = JSON.parse(line.slice(5).trim());
          const text = (chunk.candidates?.[0]?.content?.parts || []).map((x) => x.text || '').join('');
          if (text) controller.enqueue(enc.encode(`data: ${JSON.stringify({ text })}\n\n`));
        } catch {
          /* trozo malformado: ignorar */
        }
      };
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const parts = buf.split(/\r?\n\r?\n/);
          buf = parts.pop() || '';
          parts.forEach(emit);
        }
        emit(buf);
      } catch (err) {
        console.error('Error en chat LLM:', err);
      }
      controller.enqueue(enc.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  });
};

export const config = { path: '/api/chat' };
