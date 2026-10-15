import { BrandMark, Icon, firstName, initials } from '@/Components/Campus/shared';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const linkBase = 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors';
const linkIdle = 'text-neutral-300 hover:bg-white/5 hover:text-white font-medium';
const linkActive = 'bg-white/10 text-white font-semibold';

function SectionLabel({ children, first }) {
    return (
        <p className={`px-3 ${first ? '' : 'mt-6'} mb-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500`}>
            {children}
        </p>
    );
}

function Badge({ tone, children }) {
    const tones = {
        violet: 'bg-violet-500/20 text-violet-300',
        rose: 'bg-rose-500/20 text-rose-300',
        amber: 'bg-amber-500/20 text-amber-300',
    };
    return (
        <span className={`ml-auto ${tones[tone]} text-[11px] font-bold px-2 py-0.5 rounded-full`}>{children}</span>
    );
}

/**
 * The dashboard shell (sidebar + top bar) shared by the Overview and Product Management views.
 *
 * props
 *  view / setView   which view is showing ('overview' | 'products')
 *  itemCount        number shown in the "Product Management" badge  (comes from the database)
 *  recentCount      number shown in the "My Reports" badge
 *  search/onSearch  top-bar search box (typing jumps to Product Management and filters the table)
 *  onReportItem     "Report Item" button -> opens the Add Item modal
 */
export default function CampusDashboardLayout({
    view,
    setView,
    itemCount,
    recentCount,
    search,
    onSearch,
    onReportItem,
    children,
}) {
    const { auth } = usePage().props;
    const user = auth?.user ?? { name: 'Guest', email: '' };
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // go to the overview view and scroll to one of its sections (My Reports, Alerts, ...)
    const goOverview = (anchorId) => (e) => {
        e.preventDefault();
        setView('overview');
        setSidebarOpen(false);
        if (anchorId) {
            setTimeout(() => document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' }), 50);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goProducts = (e) => {
        e?.preventDefault();
        setView('products');
        setSidebarOpen(false);
        window.scrollTo({ top: 0 });
    };

    return (
        <div className="bg-[#1C1C21] text-white antialiased min-h-screen">
            {/* ===== mobile overlay ===== */}
            {sidebarOpen && (
                <div id="sidebar-overlay" className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ===== SIDE NAVIGATION ===== */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 h-screen w-72 bg-[#17171b] border-r border-white/10 z-50 flex flex-col ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
            >
                {/* Brand */}
                <div className="h-16 sm:h-20 flex items-center gap-2 px-6 border-b border-white/10 shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <BrandMark />
                        <span className="font-extrabold text-base tracking-tight">
                            Campus <span className="text-neutral-400 font-semibold">L&amp;F</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close menu"
                        className="ml-auto lg:hidden w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
                    >
                        <Icon name="x" className="w-4 h-4" />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto campus-scroll px-4 py-6 space-y-1.5">
                    <SectionLabel first>Main</SectionLabel>

                    <a href="#overview" onClick={goOverview()} className={`${linkBase} ${view === 'overview' ? linkActive : linkIdle}`}>
                        <Icon name="overview" className="w-5 h-5 shrink-0" />
                        Overview
                    </a>
                    <Link href="/#browse" className={`${linkBase} ${linkIdle}`}>
                        <Icon name="search" className="w-5 h-5 shrink-0" />
                        Browse Items
                    </Link>
                    <a href="#my-reports" onClick={goOverview('my-reports')} className={`${linkBase} ${linkIdle}`}>
                        <Icon name="document" className="w-5 h-5 shrink-0" />
                        My Reports
                        <Badge tone="violet">{recentCount}</Badge>
                    </a>
                    <a href="#messages" onClick={goOverview()} className={`${linkBase} ${linkIdle}`}>
                        <Icon name="chat" className="w-5 h-5 shrink-0" />
                        Messages
                        <Badge tone="rose">2</Badge>
                    </a>
                    <a href="#alerts" onClick={goOverview('alerts')} className={`${linkBase} ${linkIdle}`}>
                        <Icon name="bell" className="w-5 h-5 shrink-0" />
                        Alerts
                    </a>

                    <SectionLabel>Management</SectionLabel>

                    <a href="#products" onClick={goProducts} className={`${linkBase} ${view === 'products' ? linkActive : linkIdle}`}>
                        <Icon name="cube" className="w-5 h-5 shrink-0" />
                        Product Management
                        <Badge tone="amber">{itemCount}</Badge>
                    </a>

                    <SectionLabel>Account</SectionLabel>

                    <Link href={route('profile.edit')} className={`${linkBase} ${linkIdle}`}>
                        <Icon name="cog" className="w-5 h-5 shrink-0" />
                        Settings
                    </Link>
                    <Link href="/#contact" className={`${linkBase} ${linkIdle}`}>
                        <Icon name="pin" className="w-5 h-5 shrink-0" />
                        Help &amp; Contact
                    </Link>
                </nav>

                {/* User card + logout */}
                <div className="p-4 border-t border-white/10 shrink-0">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-rose-400 to-violet-500 flex items-center justify-center font-bold text-neutral-900 shrink-0">
                            {initials(user.name)}
                        </span>
                        <div className="min-w-0">
                            <p className="text-sm font-bold truncate">{user.name}</p>
                            <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            aria-label="Log out"
                            className="ml-auto w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors shrink-0"
                        >
                            <Icon name="logout" className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* ===== MAIN CONTENT AREA ===== */}
            <div className="lg:ml-72">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-[#1C1C21]/90 backdrop-blur-md border-b border-white/10">
                    <div className="h-16 sm:h-20 px-5 sm:px-8 flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open menu"
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0"
                        >
                            <Icon name="menu" />
                        </button>

                        <div>
                            <p className="text-xs text-neutral-500 hidden sm:block">Dashboard</p>
                            <h1 className="text-base sm:text-lg font-extrabold">Welcome back, {firstName(user.name)} 👋</h1>
                        </div>

                        <div className="hidden md:flex items-center relative ml-6 flex-1 max-w-sm">
                            <Icon name="search" className="w-4 h-4 absolute left-3.5 text-neutral-500" />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => {
                                    onSearch(e.target.value);
                                    if (e.target.value && view !== 'products') setView('products');
                                }}
                                placeholder="Search reports, items, locations..."
                                className="w-full pl-9 pr-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:bg-white/10 transition-all"
                            />
                        </div>

                        <div className="ml-auto flex items-center gap-3 shrink-0">
                            <button
                                onClick={onReportItem}
                                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold bg-gradient-to-r from-amber-300 via-rose-400 to-violet-500 text-neutral-900 px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                            >
                                <Icon name="plus" className="w-4 h-4" />
                                Report Item
                            </button>
                            <button
                                aria-label="Notifications"
                                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <Icon name="bell" />
                                <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-rose-500" />
                            </button>
                            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 via-rose-400 to-violet-500 flex items-center justify-center font-bold text-sm text-neutral-900">
                                {initials(user.name)}
                            </span>
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </div>
    );
}
