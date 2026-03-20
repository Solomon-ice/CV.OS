import React from 'react';
import { ResumeData } from '@/types/resume';

const ClassicTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white text-black p-12 min-h-[1056px] shadow-2xl w-full max-w-[816px] mx-auto origin-top transition-all duration-500">
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-black pb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{data.name || 'Your Name'}</h1>
        <p className="text-xl text-gray-600 font-medium">{data.title || 'Professional Title'}</p>
        <div className="mt-4 text-sm text-gray-500 flex gap-4">
          <span>{data.email}</span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="space-y-2">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-200 pb-1">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-200 pb-1">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between font-bold">
                <span>{exp.title}</span>
                <span className="text-gray-500">{exp.date}</span>
              </div>
              <div className="text-gray-600 italic font-medium">{exp.subtitle}</div>
              <p className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-200 pb-1">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between font-bold">
                <span>{edu.title}</span>
                <span className="text-gray-500">{edu.date}</span>
              </div>
              <div className="text-gray-600 italic font-medium">{edu.subtitle}</div>
              <p className="text-gray-700 text-sm">{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-200 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
            {data.skills.map((skill: string, i: number) => (
              <span key={i} className="font-medium">• {skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

export default ClassicTemplate;
