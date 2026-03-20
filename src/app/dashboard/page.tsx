'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard, Button } from '@/components/UI';
import { motion } from 'framer-motion';
import { Plus, FileText, Trash2, Edit3, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await fetch('/api/resume');
      if (res.ok) {
        const data = await res.json();
        setResumes(data);
      } else if (res.status === 401) {
        router.push('/auth/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: 'Untitled Resume', 
          title: 'Software Engineer',
          summary: 'Write a brief summary about yourself...',
          experience: [],
          education: [],
          skills: [],
          projects: []
        }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/builder/${data._id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteResume = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      const res = await fetch(`/api/resume/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setResumes(resumes.filter(r => r._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Your Resumes</h1>
          <p className="text-white/40 text-lg">Manage and build your professional CVs.</p>
        </div>
        <Button onClick={createResume} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Resume
        </Button>
      </header>

      {resumes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 glass rounded-3xl border-dashed border-2 border-white/10"
        >
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white/20" />
          </div>
          <h2 className="text-xl font-medium text-white/60">No resumes yet</h2>
          <p className="text-white/30 text-center max-w-xs mt-2 mb-8">
            Start by creating your first cinematic resume.
          </p>
          <Button onClick={createResume} variant="secondary">Create Now</Button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumes.map((resume, i) => (
            <motion.div
              key={resume._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/builder/${resume._id}`}>
                <GlassCard className="group hover-lift h-full flex flex-col justify-between cursor-pointer border-white/5 hover:border-white/20">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 glass-pill flex items-center justify-center bg-white/5">
                        <FileText className="w-6 h-6 text-white/40" />
                      </div>
                      <button 
                        onClick={(e) => deleteResume(resume._id, e)}
                        className="p-2 rounded-full hover:bg-red-500/20 text-white/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 truncate">{resume.name}</h3>
                      <p className="text-white/40 text-sm">{resume.title}</p>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-white/20">
                      Edited {new Date(resume.updatedAt).toLocaleDateString()}
                    </span>
                    <Edit3 className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
