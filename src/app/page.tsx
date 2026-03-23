'use client';

import { Button } from "@/components/UI";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
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

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-pill px-4 py-1.5 text-sm font-medium text-white/60 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-blue-400 shadow-lg shadow-blue-400/20" />
          <span>The future of career design is here</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tight text-gradient max-w-4xl"
        >
          Your Next Career <br /> Starts with a Masterpiece.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/50 max-w-2xl"
        >
          Build a cinematic, high-end resume that stands out from the crowd. 
          Apple-inspired simplicity meeting powerful features.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          {loading ? (
             <Button variant="secondary" className="flex items-center gap-2 opacity-50 cursor-not-allowed">
               <Loader2 className="w-4 h-4 animate-spin" /> Loading...
             </Button>
          ) : user ? (
            <Link href="/dashboard">
              <Button className="flex items-center gap-2">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/signup">
                <Button className="flex items-center gap-2">
                  Create My CV <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="secondary">Sign In</Button>
              </Link>
            </>
          )}
        </motion.div>
      </section>

      {/* Floating Cards (Demo) */}
      <section className="grid md:grid-cols-3 gap-8 py-20">
        {[
          { icon: Zap, title: "Instant Live Preview", desc: "See your changes in real-time with an award-winning layout." },
          { icon: Shield, title: "Secure & Private", desc: "Your data is encrypted and stored securely on our cloud." },
          { icon: Sparkles, title: "Export to PDF", desc: "Download high-fidelity PDFs ready for any application." },
          { icon: Save, title: "Save your work", desc: "Save your work and come back to continue later." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="glass p-8 space-y-4 hover:bg-white/10 transition-colors group cursor-default"
          >
            <div className="w-12 h-12 glass-pill flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-white/40 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass max-w-3xl mx-auto p-12 space-y-6"
        >
          <h2 className="text-4xl font-bold text-gradient">Ready to Craft Your Masterpiece?</h2>
          <p className="text-xl text-white/50">
            Join thousands of professionals who are already using our platform to land their dream jobs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {loading ? (
              <Button variant="secondary" className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading...
              </Button>
            ) : user ? (
              <Link href="/dashboard">
                <Button className="flex items-center gap-2">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button className="flex items-center gap-2">
                    Create My CV <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="secondary">Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} Resume Builder. All rights reserved. Design by Solomon Prince Billot
        </p>
      </footer>
    </div>
  );
}
