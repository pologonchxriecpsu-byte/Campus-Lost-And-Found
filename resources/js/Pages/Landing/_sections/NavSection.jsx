import { Link, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function NavSection({ query, setQuery }) {
    const user = usePage().props.auth?.user;
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-[#1C1C21]/90 backdrop-blur-md border-b border-white/10">
          <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">

            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 shrink-0">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 via-rose-400 to-violet-500 flex items-center justify-center text-base font-black text-neutral-900">C</span>
              <span className="font-extrabold text-base sm:text-lg tracking-tight">Campus <span className="text-neutral-400 font-semibold">Lost &amp; Found</span></span>
            </a>

            {/* Center nav links (desktop) */}
            <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#browse" className="hover:text-white transition-colors">Browse Items</a></li>
              <li><a href="#report" className="hover:text-white transition-colors">Report Found</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>

            {/* Search + CTA (desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <label htmlFor="nav-search" className="sr-only">Search items</label>
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input id="nav-search" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search items..." className="w-40 lg:w-56 pl-9 pr-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:bg-white/10 transition-all" />
              </div>

              {user ? (
                <Link href={route('dashboard')} className="text-sm font-bold bg-white text-neutral-900 px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">Dashboard</Link>
              ) : (
                <>
                  <Link href={route('login')} className="text-sm font-semibold text-neutral-200 hover:text-white px-3 py-2 transition-colors">Log In</Link>
              <Link href={route('register')} className="text-sm font-bold bg-white text-neutral-900 px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">Register</Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="mobile-menu" className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>

          {/* Mobile menu panel */}
          <div id="mobile-menu" ref={menuRef} className="mobile-menu md:hidden overflow-hidden border-t border-white/10 bg-[#1C1C21]" style={{ maxHeight: open ? menuRef.current?.scrollHeight : 0, opacity: open ? 1 : 0 }}>
            <div className="px-5 py-5 flex flex-col gap-4">
              <label htmlFor="mobile-search" className="sr-only">Search items</label>
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input id="mobile-search" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search items..." className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60" />
              </div>
              <a href="#home" className="text-neutral-300 hover:text-white font-medium">Home</a>
              <a href="#browse" className="text-neutral-300 hover:text-white font-medium">Browse Items</a>
              <a href="#report" className="text-neutral-300 hover:text-white font-medium">Report Found</a>
              <a href="#contact" className="text-neutral-300 hover:text-white font-medium">Contact</a>
              {user ? (
                <Link href={route('dashboard')} className="text-center text-sm font-bold bg-white text-neutral-900 rounded-full py-2.5">Dashboard</Link>
              ) : (
                <div className="flex gap-3 pt-2">
                <Link href={route('login')} className="flex-1 text-center text-sm font-semibold border border-white/15 rounded-full py-2.5">Log In</Link>
                <Link href={route('register')} className="flex-1 text-center text-sm font-bold bg-white text-neutral-900 rounded-full py-2.5">Register</Link>
              </div>
              )}
            </div>
          </div>
        </header>
    );
}
