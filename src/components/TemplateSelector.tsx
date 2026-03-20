import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const templates = [
  { id: 'classic', name: 'Classic Professional', color: 'bg-gray-500' },
  { id: 'minimal', name: 'Minimal Modern', color: 'bg-black' },
  { id: 'glass', name: 'Creative Glass', color: 'bg-blue-600' },
  { id: 'corporate', name: 'Corporate Serif', color: 'bg-[#1e3a8a]' },
];

export const TemplateSelector = ({ selected, onSelect }: { selected: string, onSelect: (id: string) => void }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 ml-1">Select Template</h3>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((tpl) => (
          <motion.button
            key={tpl.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(tpl.id)}
            className={`relative group h-24 rounded-2xl overflow-hidden border-2 transition-all ${
              selected === tpl.id ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-white/5 hover:border-white/20'
            }`}
          >
            <div className={`absolute inset-0 opacity-20 ${tpl.color}`} />
            <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
               <span className="text-[10px] font-black uppercase tracking-tighter text-white opacity-90">{tpl.name}</span>
            </div>
            {selected === tpl.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
