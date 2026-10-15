import { BrandLink, Icon } from '@/Components/Campus/shared';
import { Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

const NAV = [
    ['Home', '/#home'],
    ['Browse Items', '/#browse'],
    ['Report Found', '/#report'],
    ['Contact', '/#contact'],
];

/**
 * Shared frame of login.html + signup.html:
 * top nav bar, split screen (brand panel on the left, form on the right) and footer.
 *
 * props: cta = { text, label, href }  (top-right "New here? Register" / "Already a member? Log In")
 *        panel = the coloured left-hand JSX      children = the right-hand form
 */
export default function CampusAuthLayout({ cta, panel, children }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    return (
        <div className="bg-[#1C1C21] text-white antialiased min-h-screen">
            {/* ===== TOP NAVIGATION BAR ===== */}
            <header className="fixed top-0 inset-x-0 z-50 bg-[#1C1C21]/90 backdrop-blur-md border-b border-white/10">
                <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
                    <BrandLink href="/" />

                    <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
                        {NAV.map(([label, href]) => (
                            <li key={label}>
                                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-sm text-neutral-400">{cta.text}</span>
                        <Link href={cta.href} className="text-sm font-bold bg-white text-neutral-900 px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">
                            {cta.label}
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
                    >
                        <Icon name="menu" />
                    </button>
                </nav>

                {/* Mobile menu panel */}
                <div
                    id="mobile-menu"
                    ref={menuRef}
                    className="mobile-menu md:hidden overflow-hidden border-t border-white/10 bg-[#1C1C21]"
                    style={{ maxHeight: open ? menuRef.current?.scrollHeight : 0, opacity: open ? 1 : 0 }}
                >
                    <div className="px-5 py-5 flex flex-col gap-4">
                        {NAV.map(([label, href]) => (
                            <Link key={label} href={href} className="text-neutral-300 hover:text-white font-medium">{label}</Link>
                        ))}
                        <Link href={cta.href} className="text-center text-sm font-bold bg-white text-neutral-900 rounded-full py-2.5 mt-1">
                            {cta.label}
                        </Link>
                    </div>
                </div>
            </header>

            {/* ===== SPLIT SCREEN ===== */}
            <main className="min-h-screen flex flex-col lg:flex-row pt-16 sm:pt-20">
                {panel}

                {/* Right form panel */}
                <section className="w-full lg:w-1/2 flex items-center justify-center px-5 sm:px-10 py-14 relative">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.12),_transparent_60%)]" />
                    <div className="w-full max-w-md">{children}</div>
                </section>
            </main>

            <footer className="border-t border-white/10 px-5 py-6 text-center text-xs text-neutral-500">
                &copy; 2026 Campus Lost &amp; Found. All rights reserved.
            </footer>
        </div>
    );
}

/* ----- small pieces both pages use ----- */

export function FloatingBadges({ badges }) {
    const pos = ['absolute top-16 right-10 auth-float-1 z-10', 'absolute top-44 right-28 auth-float-2 z-10', 'absolute bottom-40 right-6 auth-float-3 z-10'];
    return badges.map((text, i) => (
        <div key={text} className={pos[i]}>
            <span className="flex items-center gap-2 bg-white text-neutral-900 text-xs font-bold px-3.5 py-2 rounded-full shadow-xl">{text}</span>
        </div>
    ));
}

export function SocialButtons({ dividerText }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-3 mb-6">
                <button type="button" className="flex items-center justify-center gap-2 bg-white text-neutral-900 text-sm font-semibold rounded-full py-2.5 hover:bg-neutral-200 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.2 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
                        <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z" />
                        <path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4l4-3.1z" />
                        <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
                    </svg>
                    Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-full py-2.5 hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#f35325" d="M1 1h10v10H1z" />
                        <path fill="#81bc06" d="M13 1h10v10H13z" />
                        <path fill="#05a6f0" d="M1 13h10v10H1z" />
                        <path fill="#ffba08" d="M13 13h10v10H13z" />
                    </svg>
                    Campus SSO
                </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-neutral-500 font-medium">{dividerText}</span>
                <span className="h-px flex-1 bg-white/10" />
            </div>
        </>
    );
}
