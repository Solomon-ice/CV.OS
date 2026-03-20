'use client';

import Link from 'next/link';
import { Button } from './UI';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Hide navbar only on the specialized builder page
  if (pathname.startsWith('/builder')) {
    return null;
  }

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-pill px-8 py-3 flex items-center gap-12"
      >
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          CV.OS
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/" className="hover:text-white transition-colors">Features</Link>
          <Link href="/" className="hover:text-white transition-colors">Templates</Link>
        </div>

        {!loading && !user && (
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="px-4 py-2">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary" className="px-5 py-2 text-sm">Get Started</Button>
            </Link>
          </div>
        )}

        {!loading && user && (
          <Link href="/dashboard">
            <Button variant="secondary" className="px-5 py-2 text-sm">Go to Dashboard</Button>
          </Link>
        )}
      </motion.div>
    </nav>
  );
}
