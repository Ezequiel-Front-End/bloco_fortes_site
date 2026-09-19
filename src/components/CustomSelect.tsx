import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string | React.ReactNode;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione...',
  error,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-[#080E18] border ${
          error ? 'border-rose-500 focus:ring-rose-400' : 'border-slate-700/80 focus:border-orange-500 hover:border-orange-500/50'
        } text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-left shadow-sm`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? 'text-white font-medium' : 'text-slate-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-orange-500' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute z-[100] w-full mt-2 bg-[#0E1A2E] border border-slate-700/80 rounded-xl shadow-2xl py-1.5 max-h-60 overflow-y-auto overflow-x-hidden animate-in fade-in slide-in-from-top-1"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left ${
                value === option.value
                  ? 'bg-orange-500/10 text-orange-400 font-bold border-l-2 border-orange-500 pl-[14px]'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-2 border-transparent pl-[14px]'
              }`}
            >
              <span className="truncate">{option.label}</span>
              {value === option.value && <Check className="w-4 h-4 text-orange-500 shrink-0 ml-2" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
