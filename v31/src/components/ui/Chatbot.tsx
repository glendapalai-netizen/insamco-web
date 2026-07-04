import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, HardHat, BrainCircuit, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: '¡Hola! Soy **Tyti**, tu asesor industrial. ¿En qué puedo ayudarte hoy con nuestras materias primas?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const newMessages = [...messages, userMessage];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          useThinking
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let aiMessageContent = '';
      const aiMessageId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, { id: aiMessageId, role: 'model', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.text) {
                  aiMessageContent += data.text;
                  setMessages(prev => 
                    prev.map(msg => 
                      msg.id === aiMessageId ? { ...msg, content: aiMessageContent } : msg
                    )
                  );
                }
              } catch (e) {
                console.error("Error parsing stream chunk", e);
              }
            }
          }
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), role: 'model', content: 'Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 md:bottom-6 right-6 w-14 h-14 bg-insamco-blue rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-[#1a3257] transition-all hover:scale-110 z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Abrir chat Tyti"
      >
        <div className="relative w-full h-full flex items-center justify-center">
           <HardHat className="text-insamco-gold" size={28} />
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-insamco-gold opacity-75"></span>
             <span className="relative inline-flex rounded-full h-4 w-4 bg-insamco-gold"></span>
           </span>
        </div>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 md:bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-lg shadow-2xl flex flex-col z-50 transition-all origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-insamco-blue p-4 rounded-t-lg flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-insamco-gold flex items-center justify-center shrink-0">
              <HardHat className="text-insamco-blue" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-none mb-1">Tyti</h3>
              <p className="text-insamco-gold text-xs font-semibold">Asistente Virtual Insamco</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-3 ${
                  message.role === 'user' 
                    ? 'bg-insamco-blue text-white rounded-tr-sm' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                }`}
              >
                {message.role === 'model' ? (
                   <div className="markdown-body prose prose-sm prose-slate max-w-none">
                      <Markdown>{message.content}</Markdown>
                   </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-insamco-gold" />
                <span className="text-sm text-slate-500">Tyti está escribiendo...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 rounded-b-lg shrink-0">
          
          <div className="flex justify-between items-center mb-3">
             <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-500 hover:text-insamco-blue transition-colors">
                <input 
                  type="checkbox" 
                  checked={useThinking} 
                  onChange={(e) => setUseThinking(e.target.checked)}
                  className="rounded text-insamco-blue focus:ring-insamco-blue border-slate-300"
                />
                <BrainCircuit size={14} className={useThinking ? "text-insamco-gold" : "text-slate-400"} />
                Razonamiento Profundo (Preguntas complejas)
             </label>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-insamco-blue focus:ring-1 focus:ring-insamco-blue transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-insamco-gold text-insamco-blue rounded-full w-11 h-11 flex items-center justify-center shrink-0 hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
          <div className="text-center mt-2">
             <span className="text-[10px] text-slate-400">Tyti puede cometer errores. Verifica la información.</span>
          </div>
        </div>
      </div>
    </>
  );
}
