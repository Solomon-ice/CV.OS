'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, GlassCard } from '@/components/UI';
import { 
  Plus, 
  Trash2, 
  ChevronLeft, 
  Download, 
  Save, 
  Loader2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Layout,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import GlassTemplate from '@/components/templates/GlassTemplate';
import CorporateTemplate from '@/components/templates/CorporateTemplate';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ResumeData, SectionItem } from '@/types/resume';

// --- Sub-components ---

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-2 mb-6 pt-4 border-t border-white/5 first:pt-0 first:border-0">
    <Icon className="w-5 h-5 text-blue-400" />
    <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
  </div>
);

const PreviewPanel = ({ data }: { data: ResumeData }) => {
  const Template = {
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    glass: GlassTemplate,
    corporate: CorporateTemplate,
  }[data.theme as string || 'classic'] || ClassicTemplate;

  return (
    <div className="w-full max-w-[816px] mx-auto origin-top transition-all duration-700 ease-in-out scale-[0.85] lg:scale-100">
      <AnimatePresence mode="wait">
        <motion.div
           key={data.theme || 'classic'}
           initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
           animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
           exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
           transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Template data={data} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Main Page ---

export default function BuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resume/${id}`);
        if (res.ok) {
          setData(await res.json());
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, router]);

  const saveResume = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    try {
      await fetch(`/api/resume/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setLastSaved(new Date());
    } catch (err) {
      console.error('Save failed', err);
    } finally {
      setSaving(false);
    }
  }, [data, id]);

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (data) saveResume();
    }, 2000);
    return () => clearTimeout(timer);
  }, [data, saveResume]);

  const updateField = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Define a type for keys of ResumeData that point to SectionItem[]
  type ResumeArrayFields = 'experience' | 'education' | 'projects';

  const addArrayItem = (field: ResumeArrayFields) => {
    if (!data) return;
    const newItem = { title: '', subtitle: '', date: '', description: '' };
    setData((prev: any) => ({ ...prev, [field]: [...prev[field], newItem] }));
  };

  const updateArrayItem = (field: ResumeArrayFields, index: number, value: Partial<SectionItem>) => {
    if (!data) return;
    const newArray = [...data[field]];
    newArray[index] = { ...newArray[index], ...value };
    setData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const removeArrayItem = (field: ResumeArrayFields, index: number) => {
    if (!data) return;
    const newArray = data[field].filter((_: any, i: number) => i !== index);
    setData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const addSkill = (skill: string) => {
    if (!skill.trim()) return;
    setData((prev: any) => ({ ...prev, skills: [...prev.skills, skill.trim()] }));
  };

  const removeSkill = (index: number) => {
    setData((prev: any) => ({ ...prev, skills: prev.skills.filter((_: any, i: number) => i !== index) }));
  };

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
        <p className="text-white/20 font-medium">Booting Resume Editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Editor Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-white/50" />
          </Link>
          <div className="flex flex-col">
            <input 
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-lg font-bold p-0 w-64"
            />
            <div className="flex items-center gap-2 text-xs">
              {saving ? (
                <span className="text-white/30 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> Saving...</span>
              ) : lastSaved ? (
                <span className="text-green-500/50 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Saved at {lastSaved.toLocaleTimeString()}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="flex items-center gap-2 text-sm" onClick={() => window.open(`/api/resume/${id}/pdf`, '_blank')}>
            <Download className="w-4 h-4" /> Download PDF
          </Button>
          <Button className="flex items-center gap-2 text-sm" onClick={saveResume}>
            <Save className="w-4 h-4" /> Save Now
          </Button>
        </div>
      </header>

      <div className="flex pt-24 min-h-screen">
        {/* Left Panel: Inputs */}
        <div className="w-full lg:w-[45%] p-8 overflow-y-auto max-h-[calc(100vh-6rem)] custom-scrollbar">
          <div className="space-y-12 pb-20">
            {/* Basics */}
            <section>
              <SectionHeader icon={User} title="Personal Info" />
              <div className="space-y-8">
                <TemplateSelector 
                  selected={data.theme || 'classic'} 
                  onSelect={(theme) => updateField('theme', theme)} 
                />
                
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <Input 
                    label="Professional Title" 
                    value={data.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g. Senior Software Architect"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 ml-1">Professional Summary</label>
                    <textarea 
                      value={data.summary}
                      onChange={(e) => updateField('summary', e.target.value)}
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none font-medium"
                      placeholder="Briefly describe your career highlights..."
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold tracking-tight">Experience</h2>
                </div>
                <Button variant="ghost" className="p-2 h-auto text-blue-400" onClick={() => addArrayItem('experience')}>
                  <Plus className="w-4 h-4 mr-1"/> Add
                </Button>
              </div>
              <div className="space-y-6">
                {data.experience.map((exp: any, i: number) => (
                  <GlassCard key={i} className="relative group p-6 border-white/5">
                    <button 
                      onClick={() => removeArrayItem('experience', i)}
                      className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <Input 
                        label="Job Title" 
                        value={exp.title}
                        onChange={(e) => updateArrayItem('experience', i, { title: e.target.value })}
                      />
                      <Input 
                        label="Company / Subtitle" 
                        value={exp.subtitle}
                        onChange={(e) => updateArrayItem('experience', i, { subtitle: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <Input 
                        label="Date / Duration" 
                        value={exp.date}
                        onChange={(e) => updateArrayItem('experience', i, { date: e.target.value })}
                        placeholder="e.g. Jan 2020 - Present"
                      />
                    </div>
                    <textarea 
                      value={exp.description}
                      onChange={(e) => updateArrayItem('experience', i, { description: e.target.value })}
                      className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none text-sm"
                      placeholder="Bullet points of your achievements..."
                    />
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold tracking-tight">Education</h2>
                </div>
                <Button variant="ghost" className="p-2 h-auto text-blue-400" onClick={() => addArrayItem('education')}>
                  <Plus className="w-4 h-4 mr-1"/> Add
                </Button>
              </div>
              <div className="space-y-6">
                {data.education.map((edu: any, i: number) => (
                  <GlassCard key={i} className="relative group p-6 border-white/5">
                    <button 
                      onClick={() => removeArrayItem('education', i)}
                      className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input 
                        label="Degree / Course" 
                        value={edu.title}
                        onChange={(e) => updateArrayItem('education', i, { title: e.target.value })}
                      />
                      <Input 
                        label="School / University" 
                        value={edu.subtitle}
                        onChange={(e) => updateArrayItem('education', i, { subtitle: e.target.value })}
                      />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <SectionHeader icon={Code2} title="Skills" />
              <div className="glass p-6 space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add a skill (e.g. React, Python)" 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addSkill((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {data.skills.map((skill: string, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="glass-pill px-4 py-1.5 text-sm flex items-center gap-2 group"
                      >
                        {skill}
                        <button onClick={() => removeSkill(i)} className="hover:text-red-400 text-white/30 transition-colors">
                          <Plus className="w-3 h-3 rotate-45" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="hidden lg:block w-[55%] bg-[#111] p-12 overflow-y-auto max-h-[calc(100vh-6rem)] relative">
          <div className="sticky top-0 z-10 mb-8 flex items-center gap-2 text-white/30 text-xs font-semibold uppercase tracking-widest">
            <Layout className="w-3 h-3" /> Live Preview
          </div>
          <PreviewPanel data={data} />
        </div>
      </div>
    </div>
  );
}
