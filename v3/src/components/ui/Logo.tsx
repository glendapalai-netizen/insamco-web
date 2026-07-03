import React from 'react';

export function Logo({ className = '', full = true }: { className?: string, full?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0 flex items-center justify-center w-12 h-12 bg-insamco-blue rounded-full overflow-hidden shadow-sm">
        {/* Abstract geometric representation of the G and I logo based on brand guidelines */}
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          <g fill="none" stroke="#E2C144" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter">
            {/* Outer diamond representing G */}
            <path d="M 50 15 L 15 50 L 45 80" />
            <path d="M 45 80 L 65 60 L 45 40 L 75 10" />
            
            {/* I structure */}
            <path d="M 65 50 L 65 85" />
            {/* I serif */}
            <path d="M 55 85 L 75 85" strokeWidth="8" />
            <path d="M 55 50 L 75 50" strokeWidth="8" />
          </g>
        </svg>
      </div>
      {full && (
        <div className="flex flex-col justify-center">
          <span className="font-display font-semibold tracking-wide text-lg leading-tight uppercase">
            Grupo Insamco S.A.S.
          </span>
          <span className="text-[10px] tracking-widest text-slate-500 font-sans uppercase">
            — desde 2015 —
          </span>
        </div>
      )}
    </div>
  );
}
