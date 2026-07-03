# Sitio web — Grupo Insamco S.A.S.

Página web corporativa de **Grupo Insamco S.A.S.**, comercializador e importador de
materias primas e insumos industriales (pinturas, plásticos y recubrimientos).
Cúcuta, Norte de Santander, Colombia · desde 2015.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | La página principal (sitio de una sola página) |
| `assets/tailwind.css` | Hoja de estilos compilada de Tailwind CSS v4 |
| `netlify/functions/chat.mjs` | Función serverless que conecta el chatbot con Google Gemini |
| `netlify.toml` | Configuración de despliegue en Netlify |
| `prototipo1.html` | Prototipo original (referencia histórica) |

## Cómo funciona el formulario de cotización

No usa ningún servicio externo: al presionar **Enviar Solicitud de Cotización** se abre
la aplicación de correo del visitante con un mensaje ya redactado, dirigido a
`sergio@grupoinsamco.com` y `andreaosorio@grupoinsamco.com`, con todos los datos del
formulario en el cuerpo.

## Chatbot con Gemini

El botón flotante azul abre el "Asistente Insamco". El navegador llama a `/api/chat`,
que es la función `netlify/functions/chat.mjs`. Esa función guarda la clave de Gemini
como variable de entorno (nunca se expone al público) y conoce el contexto de la
empresa (productos, horarios, contacto).

**Para activarlo** (solo funciona desplegado en Netlify):
1. Crear una clave gratis en [Google AI Studio](https://aistudio.google.com/apikey).
2. En Netlify: *Site configuration → Environment variables* → agregar
   `GEMINI_API_KEY` con la clave.
3. Volver a desplegar. Si la clave no está configurada, el chat muestra un mensaje
   amable que redirige a WhatsApp — la página nunca se rompe.

## Publicación

- **Netlify (recomendado):** conectar este repositorio en Netlify; publica la raíz del
  proyecto y detecta las funciones automáticamente. Con esto funcionan la página **y**
  el chatbot.
- **GitHub Pages:** sirve para la página, pero el chatbot quedará en modo respaldo
  (WhatsApp) porque Pages no ejecuta funciones serverless.

## Pendientes

- [ ] **Imágenes:** todas las imágenes apuntan a `api.moda.app` (servidor temporal de la
  herramienta de prototipos). Hay que descargarlas, guardarlas en una carpeta `img/` y
  actualizar las rutas en `index.html` antes de que esos enlaces caduquen.
- [ ] Configurar `GEMINI_API_KEY` en Netlify para activar el chatbot.
- [ ] Conectar el dominio `grupoinsamco.com` cuando esté listo.

## Para regenerar el CSS de Tailwind

Si se agregan clases nuevas en `index.html`:

```bash
npm i -D tailwindcss@4 @tailwindcss/cli@4
echo '@import "tailwindcss";' > input.css
npx tailwindcss -i input.css -o assets/tailwind.css --minify
```
