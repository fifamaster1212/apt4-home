import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CreateAccountButtonProps {
  source?: string;
  className?: string;
  children?: React.ReactNode;
  hideArrow?: boolean;
}

// No-op button: renders styled CTA without triggering auth flows
export function CreateAccountButton({ className = '', children, hideArrow = false }: CreateAccountButtonProps) {
  return (
    <button
      type="button"
      onClick={() => { /* intentionally does nothing */ }}
      className={`flex items-center justify-center gap-2 font-medium transition-all duration-300 ${className}`}
    >
      {children || 'Create Free Account'}
      {!hideArrow && <ArrowRight className="w-5 h-5" />}
    </button>
  );
}