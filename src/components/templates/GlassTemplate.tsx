import React from 'react';
import { ResumeData } from '@/types/resume';

const GlassTemplate = ({ data }: { data: ResumeData }) => (
  <div className="relative overflow-hidden bg-[#0a0a0b] text-white p-16 min-h-[1056px] w-full max-w-[816px] mx-auto shadow-2xl rounded-sm">
    {/* Abstract Background Accents */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -ml-32 -mb-32" />

    <div className="relative z-10 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">
          Available for Hire
        </div>
        <h1 className="text-6xl font-black tracking-tighter leading-none">{data.name || 'Your Name'}</h1>
        <p className="text-xl font-medium text-white/40">{data.title || 'Professional Title'}</p>
        <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-white/20">
          <span>{data.email}</span>
          <span>•</span>
          <span>San Francisco</span>
          <span>•</span>
          <span>Portfolio</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-12">
          {/* Summary */}
          {data.summary && (
            <section className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/20">About</h2>
              <p className="text-lg leading-relaxed text-white/70 font-medium italic">&quot;{data.summary}&quot;</p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="space-y-10">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/20">Experience</h2>
              <div className="space-y-10">
                {data.experience.map((exp, i) => (
                  <div key={i} className="group space-y-3 relative pl-6 border-l border-white/5 hover:border-blue-500/50 transition-colors">
                    <div className="absolute -left-px top-0 w-px h-0 group-hover:h-full bg-blue-500 transition-all duration-500" />
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-bold">{exp.title}</h3>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{exp.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-blue-400/70">{exp.subtitle}</p>
                    <p className="text-[13px] leading-relaxed text-white/50">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-12">
          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/20">Expertise</h2>
              <div className="flex flex-col gap-3">
                {data.skills.map((skill: string, i: number) => (
                  <div key={i} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold tracking-wide hover:bg-white/10 transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/20">Education</h2>
              <div className="space-y-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <h3 className="text-sm font-bold">{edu.title}</h3>
                    <p className="text-[11px] font-bold text-white/30 uppercase">{edu.date}</p>
                    <p className="text-xs font-medium text-white/50">{edu.subtitle}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default GlassTemplate;
