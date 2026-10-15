import { Link } from '@inertiajs/react';

/* ---------- constants shared by every page ---------- */
export const CATEGORIES = ['Electronics', 'Personal Asset', 'Cards & Documents', 'Accessories'];
export const STATUSES = ['Lost', 'Found', 'Claimed'];

// badge colours used in the dark dashboard
export const STATUS_BADGE = {
    Lost: 'bg-rose-500/20 text-rose-300',
    Found: 'bg-emerald-500/20 text-emerald-300',
    Claimed: 'bg-violet-500/20 text-violet-300',
};

// solid badge colours used on the light landing cards
export const STATUS_SOLID = {
    Lost: 'bg-rose-500',
    Found: 'bg-emerald-500',
    Claimed: 'bg-violet-500',
};

/* ---------- helpers ---------- */
export function formatDate(iso) {
    if (!iso) return '—';
    const d = new Date(String(iso).slice(0, 10) + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function initials(name = '') {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

export function firstName(name = '') {
    return name.trim().split(/\s+/)[0] || 'there';
}

/* ---------- tiny SVG icon set (stroke icons, 24x24) ---------- */
const ICONS = {
    overview: 'M3 13h4v7H3v-7zm7-9h4v16h-4V4zm7 5h4v11h-4V9z',
    search: 'M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z',
    document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    chat: 'M8 10h8m-8 4h5M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    bell: 'M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    plus: 'M12 4v16m8-8H4',
    cube: 'M20.25 7.5l-8.25-4.5L3.75 7.5m16.5 0l-8.25 4.5m8.25-4.5v9l-8.25 4.5m-8.25-13.5v9l8.25 4.5M3.75 7.5l8.25 4.5',
    cog: [
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
        'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    ],
    pin: [
        'M18 10c0 7-6 11-6 11s-6-4-6-11a6 6 0 1112 0z',
        'M12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
    ],
    logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 5v1a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h4a3 3 0 013 3v1',
    x: 'M6 18L18 6M6 6l12 12',
    menu: 'M4 6h16M4 12h16M4 18h16',
    pencil: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z',
    trash: 'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0',
    checkCircle: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warnCircle: 'M12 9v3.75m0 3.75h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warnTriangle: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
    check: 'M4.5 12.75l6 6 9-13.5',
    mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    lock: 'M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-2v2m-12 9h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
    user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    idcard: 'M12.75 3.75h3.75a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5H7.5a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5h3.75m1.5 0v1.5h-1.5v-1.5m1.5 0h-1.5m-3 6h6m-6 3h6',
    eye: [
        'M2.5 12S5.5 5 12 5s9.5 7 9.5 7-3 7-9.5 7S2.5 12 2.5 12z',
        'M12 15a3 3 0 100-6 3 3 0 000 6z',
    ],
    eyeOff: 'M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.9 5.1A9.5 9.5 0 0112 5c6.5 0 9.5 7 9.5 7a13.4 13.4 0 01-3.1 4.2M6.3 6.3C4 7.9 2.5 10 2.5 12c0 0 3 7 9.5 7 1 0 1.9-.1 2.8-.4',
    arrowRight: 'M17 8l4 4m0 0l-4 4m4-4H3',
    calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
};

export function Icon({ name, className = 'w-5 h-5', strokeWidth = 2 }) {
    const paths = [].concat(ICONS[name] ?? []);
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth}>
            {paths.map((d, i) => (
                <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />
            ))}
        </svg>
    );
}

/* ---------- brand logo ("C" gradient square + name) ---------- */
export function BrandMark({ className = 'w-9 h-9 text-base' }) {
    return (
        <span className={`${className} rounded-xl bg-gradient-to-br from-amber-300 via-rose-400 to-violet-500 flex items-center justify-center font-black text-neutral-900`}>
            C
        </span>
    );
}

export function BrandLink({ href = '/', long = true, className = '' }) {
    return (
        <Link href={href} className={`flex items-center gap-2 shrink-0 ${className}`}>
            <BrandMark />
            <span className="font-extrabold text-base sm:text-lg tracking-tight">
                Campus <span className="text-neutral-400 font-semibold">{long ? 'Lost & Found' : 'L&F'}</span>
            </span>
        </Link>
    );
}
