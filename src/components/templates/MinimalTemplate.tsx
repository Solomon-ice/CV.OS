import React from 'react';
import { ResumeData } from '@/types/resume';

const MinimalTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white text-[#1a1a1b] p-12 min-h-[1056px] w-full max-w-[816px] mx-auto shadow-sm">
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 pb-8 border-b-2 border-black/5">
        <h1 className="text-4xl font-extrabold tracking-tighter uppercase">{data.name || 'Your Name'}</h1>
        <p className="text-sm font-semibold tracking-[0.2em] text-black/40 uppercase">{data.title || 'Professional Title'}</p>
        <div className="pt-2 text-[11px] font-medium tracking-wide text-black/30 flex justify-center gap-6 uppercase">
          <span>{data.email}</span>
          {/* Mock additional info */}
          <span>San Francisco, CA</span>
          <span>linkedin.com/in/designer</span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30">Profile</h2>
          </div>
          <div className="col-span-9">
            <p className="text-[13px] leading-relaxed text-black/70 font-medium">{data.summary}</p>
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30">Experience</h2>
          </div>
          <div className="col-span-9 space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[14px] font-bold tracking-tight">{exp.title}</h3>
                  <span className="text-[10px] font-black tracking-widest text-black/20 uppercase">{exp.date}</span>
                </div>
                <p className="text-[12px] font-semibold text-black/40 italic">{exp.subtitle}</p>
                <p className="text-[12px] leading-relaxed text-black/60 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30">Education</h2>
          </div>
          <div className="col-span-9 space-y-6">
            {data.education.map((edu, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[13px] font-bold">{edu.title}</h3>
                  <span className="text-[10px] font-black tracking-widest text-black/20 uppercase">{edu.date}</span>
                </div>
                <p className="text-[12px] font-medium text-black/50">{edu.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-black/30">Expertise</h2>
          </div>
          <div className="col-span-9">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-semibold text-black/60">
              {data.skills.map((skill: string, i: number) => (
                <span key={i} className="flex items-center gap-2">
                   {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  </div>
);

export default MinimalTemplate;
