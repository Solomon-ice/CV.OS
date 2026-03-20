'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GlassCard, Button, Input } from '@/components/UI';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <GlassCard className="space-y-8 p-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-white/40">Enter your credentials to access your CVs.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            
            <Input 
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input 
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-white/40">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-white hover:underline">Sign up</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
