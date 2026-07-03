# Grupo Insamco S.A.S. — Sitio web

Repositorio del sitio web corporativo de **Grupo Insamco S.A.S.** (Cúcuta, Colombia).

Cada versión del sitio vive en su propia carpeta (`v1/`, `v2/`, ...). La versión que
Netlify publica se elige en el `netlify.toml` de la raíz (campo `publish`).

- **Versión activa:** `v1/`
- Documentación completa de la versión: [`v1/README.md`](v1/README.md)

## Estado (julio 2026)

- ✅ Publicado en Netlify: https://insamcov1.netlify.app (auto-deploy desde `main`)
- ✅ Imágenes locales en `v1/img/` (optimizadas, ~1.2 MB total)
- ✅ Chatbot Gemini funcionando (variable `GEMINI` en Netlify, modelo `gemini-flash-latest`)
- [ ] Conectar el dominio propio cuando esté comprado.

Nota técnica: en Netlify hay una extensión de Gemini que inyecta un `GEMINI_API_KEY`
inválido en el runtime; por eso `chat.mjs` lee primero `GEMINI`. Si se desinstala esa
extensión, se puede volver al nombre estándar.
