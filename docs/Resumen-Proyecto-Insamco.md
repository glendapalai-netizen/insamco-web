# Resumen del Proyecto — Web Grupo Insamco S.A.S.

**Cliente:** Grupo Insamco S.A.S. (Sergio Mondragón) — Cúcuta, Colombia
**Agencia:** BHG · Glenda Palai, con Fábula (Claude)
**Periodo:** Julio 2026
**Resultado:** https://grupoinsamco.com ✅ en vivo con dominio propio y HTTPS

---

## Qué se construyó (cronología)

1. **V1 — Prototipo estático** (insamcov1.netlify.app): primera versión HTML para validar contenido y estilo. Imágenes localizadas y optimizadas (23MB → 1.2MB).
2. **V2 — Versión React con backend** (insamcov2.netlify.app): formularios reales, panel administrativo con login, y el chatbot con IA. De aquí salió la "Guía del Panel Administrativo" en PDF.
3. **V3 — Versión final elegida por Sergio** (insamcov3.netlify.app → **grupoinsamco.com**): diseño premium estilo app, videos de introducción, láminas infográficas de productos.
4. **V3.1 — Experimento de navegación móvil** por pestañas, cuyo estilo le gustó a Sergio y se integró a la V3 definitiva (dock flotante en todas las pantallas). La V3.1 quedó archivada.

## Funcionalidades de la versión final

- Navegación tipo app: 5 pestañas en dock flotante translúcido (celular y computador)
- Catálogo oficial completo: Línea Base Agua (22 referencias) + Línea Base Solvente (6 referencias), fiel al PDF de Sergio
- Solicitud de ficha técnica por producto: captura el lead + abre el correo del cliente ya redactado
- Formulario de cotización con el mismo flujo (guarda + correo + opción WhatsApp)
- Panel administrativo en /admin con "chulito" de seguimiento (Pendiente/Contactado)
- Chat "Tyti" con IA (Gemini) entrenado sobre la empresa
- Botón flotante de WhatsApp (+57 350 717 4992)
- Video institucional y videos de introducción (horizontal/vertical)
- Descarga del catálogo oficial en PDF
- Lámina 01 (Dióxido de Titanio) corregida con referencias reales

## Infraestructura

| Componente | Servicio | Detalle |
|---|---|---|
| Código fuente | GitHub | glendapalai-netizen/insamco-web (v1, v3, v31, brand) |
| Hosting + funciones | Netlify | Sitio insamcov3; builds automáticos al cambiar la carpeta v3 |
| Base de datos | Netlify Blobs | Cotizaciones y fichas técnicas |
| Dominio | Squarespace | grupoinsamco.com — vence mayo 2027 — DNS: A @ → 75.2.60.5, CNAME www → insamcov3.netlify.app |
| Correo empresa | Google Workspace | Intacto (MX/TXT sin tocar) |
| IA del chat | Google Gemini | Proyecto prepago "Glenda 66" |

## Pendientes / Próximos pasos

- [ ] Sección de **marcas/referencias** entre las secciones 1 y 2 del Inicio (esperando logos de Sergio)
- [ ] **Testimonios reales** de clientes (esperando textos de Sergio)
- [ ] **Correo automático de confirmación** al cliente que llena un formulario (con Resend, usando el dominio ya verificado)
- [ ] **Catálogo PDF embellecido** en Canva (Glenda) — se reemplaza el archivo y listo
- [ ] **Contenido para Instagram** (2 meses de posts) + Linktree
- [ ] Futuro: integración de WhatsApp con IA, app conversora de divisas

---

## Ecosistema BHG (contexto)

Este proyecto es el caso piloto del **Método ADN Digital** de BHG: manual del método y la app de entrevistas (entrevista-adn.netlify.app) forman parte del mismo paquete de trabajo y están incluidos en esta carpeta.

*BHG · Julio 2026* 💛
