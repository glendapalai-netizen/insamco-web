// Botón flotante de WhatsApp: acceso directo al comercial de Grupo Insamco.
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573507174992?text=Buen%20d%C3%ADa%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20sus%20materias%20primas."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1fbd59] shadow-2xl flex items-center justify-center transition-all hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" aria-hidden="true">
        <path d="M16.04 5.33c-5.87 0-10.64 4.77-10.64 10.64 0 1.88.49 3.71 1.43 5.32L5.33 26.7l5.55-1.46a10.6 10.6 0 0 0 5.16 1.32c5.87 0 10.63-4.77 10.63-10.64S21.9 5.33 16.04 5.33zm0 19.43c-1.6 0-3.16-.43-4.53-1.24l-.32-.19-3.29.86.88-3.21-.21-.33a8.8 8.8 0 0 1-1.35-4.68c0-4.87 3.96-8.84 8.83-8.84s8.83 3.97 8.83 8.84-3.96 8.79-8.84 8.79zm4.85-6.6c-.27-.13-1.57-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.14-1.32-.79-.7-1.32-1.57-1.48-1.84-.15-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.44.09-.18.04-.33-.02-.47-.07-.13-.6-1.44-.82-1.97-.21-.52-.43-.45-.6-.46l-.51-.01c-.18 0-.47.07-.71.33-.24.27-.93.91-.93 2.22s.95 2.57 1.09 2.75c.13.18 1.87 2.86 4.54 4.01.63.27 1.13.44 1.52.56.64.2 1.22.17 1.68.11.51-.08 1.57-.64 1.79-1.26.22-.62.22-1.15.16-1.26-.07-.11-.24-.18-.51-.31z" />
      </svg>
    </a>
  );
}
