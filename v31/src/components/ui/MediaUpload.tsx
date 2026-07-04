import { useState, useRef } from 'react';
import { Upload, Loader2, Play } from 'lucide-react';

interface MediaUploadProps {
  type: 'image' | 'video';
  currentMedia?: string;
  onUploadSuccess: (url: string) => void;
  className?: string;
}

export function MediaUpload({ type, currentMedia, onUploadSuccess, className = '' }: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadSuccess(data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Hubo un error al subir el archivo. Inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {currentMedia ? (
        type === 'image' ? (
          <img src={currentMedia} alt="Media" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
        ) : (
          <video src={currentMedia} autoPlay loop muted playsInline className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
        )
      ) : (
        <div className="w-full h-full bg-slate-200/20 flex items-center justify-center text-slate-400">
          {type === 'image' ? 'Sin imagen' : 'Sin video'}
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-insamco-gold text-insamco-blue font-bold px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-lg"
        >
          {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          {isUploading ? 'Subiendo...' : `Cambiar ${type === 'image' ? 'Imagen' : 'Video'}`}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={type === 'image' ? 'image/*' : 'video/*'}
        onChange={handleFileChange}
      />
    </div>
  );
}
