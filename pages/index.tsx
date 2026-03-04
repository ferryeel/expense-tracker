import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>InsightPro | Intelligent Financial Management</title>
        <meta name="description" content="Experience the next generation of financial tracking with real-time horizontal analytics." />
      </Head>

      <div className="min-h-screen bg-[#f8fafc] flex flex-col selection:bg-indigo-100 selection:text-indigo-900">

        {/* Navigation */}
        <nav className="h-20 px-8 lg:px-20 flex items-center justify-between sticky top-0 bg-[#f8fafc]/80 backdrop-blur-xl z-50">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">i</div>
            <span className="text-xl font-extrabold tracking-tighter text-slate-800">Insight<span className="text-indigo-600">Pro</span></span>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/sign-in" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Sign In</Link>
            <Link href="/sign-up" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95">Get Started</Link>
          </div>
        </nav>

        <main className="flex-1 flex flex-col">
          {/* Hero Section */}
          <section className="px-8 lg:px-20 pt-16 lg:pt-24 pb-32">
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

              {/* Content Box */}
              <div className="flex-1 text-center lg:text-left space-y-8 animate-entrance">
                <div className="inline-flex items-center px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">v4.0 Horizontal Engine Live</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-slate-900">
                  Master Your Wealth <br />
                  <span className="text-indigo-600">Without the Scroll.</span>
                </h1>

                <p className="text-base lg:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  The world's first expense tracker optimized for horizontal intelligence.
                  View your snapshots, ledger, and insights side-by-side in high fidelity.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  {user ? (
                    <Link
                      href="/dashboard"
                      className="group px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] animate-pulse-indigo flex items-center"
                    >
                      Jump into Dashboard
                      <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/sign-up"
                        className="group px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] animate-pulse-indigo flex items-center"
                      >
                        Create Your Space
                        <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </Link>
                      <Link href="/dashboard" className="px-8 py-4 text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-slate-700 transition-colors">
                        View Demo →
                      </Link>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-6 pt-8 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100 justify-center lg:justify-start">
                  <div className="flex items-center space-x-2 text-[10px] font-black text-slate-800 uppercase tracking-widest">
                    <span>Verified Insight</span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-300"></div>
                  <div className="flex items-center space-x-2 text-[10px] font-black text-slate-800 uppercase tracking-widest">
                    <span>Low Verticality</span>
                  </div>
                </div>
              </div>

              {/* Visual Mockup */}
              <div className="flex-1 w-full lg:w-auto relative animate-float">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200 border-[12px] border-slate-900 scale-100 lg:scale-110">
                  <Image
                    src="/hero-mockup.png"
                    alt="InsightPro Dashboard Preview"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
                {/* Decorative background gradients */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

            </div>
          </section>

          {/* Feature Highlight Strip */}
          <section className="bg-slate-900 py-12">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Precision</h4>
                <p className="font-bold text-lg leading-tight uppercase tracking-tighter">Real-time Ledger <br /> Synchronization</p>
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Architecture</h4>
                <p className="font-bold text-lg leading-tight uppercase tracking-tighter">Wide-Screen Optimized <br /> UX Experience</p>
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Privacy</h4>
                <p className="font-bold text-lg leading-tight uppercase tracking-tighter">Secure Metadata <br /> Encryption</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="h-20 px-8 lg:px-20 flex items-center justify-between border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 InsightPro • Intelligent Systems</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">Documentation</Link>
            <Link href="#" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">Status: Operational</Link>
          </div>
        </footer>

      </div>
    </>
  );
}