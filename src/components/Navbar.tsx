'use client';

import Link from 'next/link';
import { Button } from './UI';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard, Sparkles, Layout as LayoutIcon } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide navbar only on the specialized builder page
  if (pathname.startsWith('/builder')) {
    return null;
  }

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Features', href: '/', icon: Sparkles },
    { name: 'Templates', href: '/', icon: LayoutIcon },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 md:px-0 flex justify-center">
      {/* Desktop & Mobile Header Wrapper */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-pill px-6 md:px-8 py-3 flex items-center justify-between md:justify-start gap-6 md:gap-12 w-full max-w-4xl"
      >
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap">
          Resume client
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-white transition-colors relative group">
              {link.name}
              {pathname === link.href && (
                <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/40 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center ml-auto gap-4">
          {!loading && !user && (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="px-4 py-2 text-sm">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary" className="px-5 py-2 text-sm">Get Started</Button>
              </Link>
            </>
          )}

          {!loading && user && (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="secondary" className="px-5 py-2 text-sm">Dashboard</Button>
              </Link>
              <button 
                onClick={logout}
                className="p-2.5 rounded-full glass hover:bg-white/10 transition-all text-white/60 hover:text-white group"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 md:hidden glass p-6 z-50 space-y-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              {!loading && !user && (
                <>
                  <Link href="/auth/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full justify-center py-4">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full justify-center py-4">Get Started</Button>
                  </Link>
                </>
              )}

              {!loading && user && (
                <>
                  <Link href="/dashboard" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full justify-center py-4">Go to Dashboard</Button>
                  </Link>
                  <Button 
                    variant="secondary" 
                    className="w-full justify-center py-4 gap-2"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5" /> Sign Out
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
