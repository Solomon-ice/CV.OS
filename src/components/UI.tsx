import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("glass p-6", className)}>
      {children}
    </div>
  );
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) => {
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200',
    secondary: 'glass text-white hover:bg-white/10',
    ghost: 'text-white/70 hover:text-white',
  };

  return (
    <button 
      className={cn(
        "px-6 py-3 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-sm font-medium text-white/60 ml-1">{label}</label>}
      <input 
        className={cn(
          "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all",
          className
        )}
        {...props}
      />
    </div>
  );
};
