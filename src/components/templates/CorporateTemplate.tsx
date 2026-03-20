import React from 'react';
import { ResumeData } from '@/types/resume';

const CorporateTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white text-[#2a2d34] p-16 min-h-[1056px] w-full max-w-[816px] mx-auto shadow-md font-serif">
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-4 border-[#1e3a8a] pb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-[#1e3a8a] serif uppercase tracking-tight">{data.name || 'Your Name'}</h1>
            <p className="text-lg font-bold text-gray-600 mt-1">{data.title || 'Professional Title'}</p>
          </div>
          <div className="text-right text-xs space-y-1 font-sans font-bold text-gray-500 uppercase tracking-widest">
            <p>{data.email}</p>
            <p>San Francisco, California</p>
            <p>555.0123.4567</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="space-y-2">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#1e3a8a] border-b border-gray-200 pb-1 font-sans">Professional Summary</h2>
          <p className="text-[13px] leading-relaxed text-gray-700 font-medium">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#1e3a8a] border-b border-gray-200 pb-1 font-sans">Professional Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between font-bold text-gray-800">
                  <span className="text-sm uppercase tracking-tight">{exp.title}</span>
                  <span className="text-xs font-sans">{exp.date}</span>
                </div>
                <div className="text-xs text-[#1e3a8a] font-black uppercase tracking-wider font-sans">{exp.subtitle}</div>
                <p className="text-[12px] leading-relaxed text-gray-600 italic font-medium whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#1e3a8a] border-b border-gray-200 pb-1 font-sans">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-bold text-gray-800">
                  <span className="text-sm">{edu.title}</span>
                  <span className="text-xs font-sans">{edu.date}</span>
                </div>
                <p className="text-xs text-gray-600 font-bold uppercase font-sans tracking-wide">{edu.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#1e3a8a] border-b border-gray-200 pb-1 font-sans">Core Competencies</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] font-bold text-gray-600 font-sans">
            {data.skills.map((skill: string, i: number) => (
              <span key={i} className="uppercase tracking-widest">• {skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

export default CorporateTemplate;
