import { useMemo } from 'react';
import { CATEGORIES, Icon, STATUS_BADGE, formatDate } from './shared';

/* ----- the numbers on this page are calculated from the items in the database ----- */

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CATEGORY_BAR = {
    Electronics: 'bg-violet-400',
    'Cards & Documents': 'bg-sky-400',
    'Personal Asset': 'bg-amber-400',
    Accessories: 'bg-rose-400',
};

const ICON_BG = ['bg-violet-200', 'bg-sky-200', 'bg-amber-200', 'bg-emerald-200'];

// no alerts table exists yet, so these stay as sample content
const ALERTS = [
    { icon: 'checkCircle', box: 'bg-emerald-400/15', color: 'text-emerald-300', title: 'Match found for "Student ID Card"', time: '2 hours ago' },
    { icon: 'warnCircle', box: 'bg-amber-400/15', color: 'text-amber-300', title: 'Pickup window closes tomorrow', time: '6 hours ago' },
    { icon: 'chat', box: 'bg-violet-400/15', color: 'text-violet-300', title: 'New message from Campus Security', time: '1 day ago' },
    { icon: 'warnTriangle', box: 'bg-rose-400/15', color: 'text-rose-300', title: '"Leather Wallet" report expiring soon', time: '1 day ago' },
];

const dayKey = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function getRecentReports(items) {
    return [...items]
        .sort((a, b) => String(b.date).localeCompare(String(a.date)) || b.id - a.id)
        .slice(0, 4);
}

export default function OverviewView({ items, onManage }) {
    const total = items.length;
    const lost = items.filter((i) => i.status === 'Lost').length;
    const claimed = items.filter((i) => i.status === 'Claimed').length;
    const rate = total ? ((claimed / total) * 100).toFixed(1) : '0.0';

    const metrics = [
        { bg: 'bg-violet-200', emoji: '📦', value: total, label: 'Total Reports Filed' },
        { bg: 'bg-emerald-200', emoji: '✅', value: claimed, label: 'Items Recovered' },
        { bg: 'bg-amber-200', emoji: '🔎', value: lost, label: 'Active Searches' },
        { bg: 'bg-rose-200', emoji: '⚡', value: `${rate}%`, label: 'Recovery Success Rate' },
    ];

    // last 7 days: Lost vs Found(+Claimed)
    const week = useMemo(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = dayKey(d);
            days.push({
                label: DAY_LABELS[d.getDay()],
                lost: items.filter((it) => String(it.date).slice(0, 10) === key && it.status === 'Lost').length,
                found: items.filter((it) => String(it.date).slice(0, 10) === key && it.status !== 'Lost').length,
            });
        }
        const max = Math.max(1, ...days.map((d) => Math.max(d.lost, d.found)));
        return days.map((d) => ({
            ...d,
            lostH: d.lost ? Math.max(12, Math.round((d.lost / max) * 100)) : 3,
            foundH: d.found ? Math.max(12, Math.round((d.found / max) * 100)) : 3,
        }));
    }, [items]);
    const weekHasData = week.some((d) => d.lost || d.found);

    const categories = CATEGORIES.map((c) => {
        const count = items.filter((i) => i.category === c).length;
        return { name: c, count, pct: total ? Math.round((count / total) * 100) : 0 };
    });

    const recent = getRecentReports(items);

    return (
        <main className="px-5 sm:px-8 py-8 max-w-7xl mx-auto">
            {/* Quick actions (mobile only) */}
            <div className="flex sm:hidden gap-3 mb-8">
                <button onClick={onManage} className="flex-1 text-center text-sm font-bold bg-gradient-to-r from-amber-300 via-rose-400 to-violet-500 text-neutral-900 px-4 py-2.5 rounded-full">
                    Manage Items
                </button>
                <a href="/#browse" className="flex-1 text-center text-sm font-semibold border border-white/15 px-4 py-2.5 rounded-full">
                    Browse Items
                </a>
            </div>

            {/* SYSTEM OVERVIEW METRICS */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">System Overview</h2>
                <span className="text-xs text-neutral-500">Updated just now</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
                {metrics.map((m) => (
                    <div key={m.label} className={`${m.bg} text-neutral-900 rounded-3xl p-5 sm:p-6 hover-lift`}>
                        <span className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center text-lg">{m.emoji}</span>
                        <p className="mt-5 text-3xl font-extrabold">{m.value}</p>
                        <p className="mt-1 text-xs font-semibold text-neutral-700">{m.label}</p>
                    </div>
                ))}
            </div>

            {/* ACTIVITY + CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-7 hover-lift hover:border-white/20">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-bold">Weekly Report Activity</h3>
                            <p className="text-xs text-neutral-500 mt-0.5">Lost vs. Found items, last 7 days</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400">
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400" />Lost</span>
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />Found</span>
                        </div>
                    </div>

                    <div className="flex items-end justify-between gap-3 sm:gap-5 h-48">
                        {week.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                                <div className="w-full flex items-end justify-center gap-1 h-full">
                                    <div className="w-2.5 sm:w-3 rounded-t-full bg-rose-400/80 bar-grow" style={{ height: `${d.lostH}%` }} title={`${d.lost} lost`} />
                                    <div className="w-2.5 sm:w-3 rounded-t-full bg-emerald-400/80 bar-grow" style={{ height: `${d.foundH}%` }} title={`${d.found} found`} />
                                </div>
                                <span className="text-[11px] text-neutral-500 font-medium">{d.label}</span>
                            </div>
                        ))}
                    </div>
                    {!weekHasData && <p className="mt-4 text-xs text-neutral-500 text-center">No items dated in the last 7 days.</p>}
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-7 hover-lift hover:border-white/20">
                    <h3 className="text-base sm:text-lg font-bold mb-1">Category Breakdown</h3>
                    <p className="text-xs text-neutral-500 mb-6">Share of total reports</p>

                    <div className="space-y-4">
                        {categories.map((c) => (
                            <div key={c.name}>
                                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                                    <span className="text-neutral-300">{c.name}</span>
                                    <span className="text-neutral-500">{c.pct}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                    <div className={`h-full rounded-full ${CATEGORY_BAR[c.name]}`} style={{ width: `${c.pct}%`, transition: 'width .6s ease' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MY REPORTS + ALERTS */}
            <div id="my-reports" className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-7">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base sm:text-lg font-bold">My Recent Reports</h3>
                        <button onClick={onManage} className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
                            View all
                        </button>
                    </div>

                    <div className="space-y-3">
                        {recent.map((item, i) => (
                            <div key={item.id} className="flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-2xl p-3.5 transition-colors">
                                <span className={`w-11 h-11 rounded-xl ${ICON_BG[i % ICON_BG.length]} flex items-center justify-center text-xl shrink-0`}>
                                    {item.icon || '📦'}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold truncate">{item.name}</p>
                                    <p className="text-xs text-neutral-500 truncate">{item.location} &bull; {formatDate(item.date)}</p>
                                </div>
                                <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shrink-0 ${STATUS_BADGE[item.status] || 'bg-white/10 text-neutral-300'}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                        {recent.length === 0 && (
                            <p className="text-sm text-neutral-500 py-6 text-center">No reports yet. Add your first item from Product Management.</p>
                        )}
                    </div>
                </div>

                <div id="alerts" className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-7">
                    <h3 className="text-base sm:text-lg font-bold mb-6">Recent Alerts</h3>

                    <div className="space-y-5">
                        {ALERTS.map((a) => (
                            <div key={a.title} className="flex gap-3">
                                <span className={`w-9 h-9 rounded-full ${a.box} flex items-center justify-center shrink-0`}>
                                    <Icon name={a.icon} className={`w-4 h-4 ${a.color}`} />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">{a.title}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <a href="#alerts" className="mt-6 block text-center text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
                        View all alerts
                    </a>
                </div>
            </div>

            <p className="mt-10 text-center text-xs text-neutral-600">&copy; 2026 Campus Lost &amp; Found. All rights reserved.</p>
        </main>
    );
}
