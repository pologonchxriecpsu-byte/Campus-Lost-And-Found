import { Icon, STATUS_SOLID, formatDate } from '@/Components/Campus/shared';
import { Link } from '@inertiajs/react';

// card colours, in the same order as the original landing.html (card 2, 3, 4 ...)
const CARD_BG = ['bg-amber-200', 'bg-sky-200', 'bg-pink-200', 'bg-emerald-200', 'bg-orange-200', 'bg-rose-200', 'bg-indigo-200'];

/**
 * "Global Item Directory". The cards are built from the items stored in the database
 * (the same rows managed in Dashboard > Product Management).
 * The first item is the big featured card, the next 7 are the small cards.
 */
export default function DirectorySection({ items }) {
    const [featured, ...rest] = items;
    const small = rest.slice(0, 7);

    return (
        <section id="browse" className="py-20 sm:py-24 px-5 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Global Item Directory</h2>
                        <p className="mt-3 text-neutral-400 text-base sm:text-lg max-w-xl">
                            Browse lost and found items reported by students across every building on campus.
                        </p>
                    </div>
                    <Link
                        href={route('products')}
                        className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-white border border-white/15 rounded-full px-5 py-2.5 hover:bg-white/10 transition-colors"
                    >
                        View All Items
                        <Icon name="arrowRight" className="w-4 h-4" />
                    </Link>
                </div>

                {items.length === 0 ? (
                    <div className="border border-white/10 bg-white/[0.03] rounded-3xl py-16 px-6 text-center">
                        <span className="w-14 h-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4">🔍</span>
                        <p className="font-bold">No items to show</p>
                        <p className="text-sm text-neutral-500 mt-1">Nothing matches your search yet, or no items have been reported.</p>
                    </div>
                ) : (
                    /* Bento grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Featured card (spans 2x2 on desktop) */}
                        <article className="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-violet-200 to-purple-300 text-neutral-900 rounded-3xl p-7 flex flex-col justify-between hover-lift-lg hover:shadow-2xl min-h-[320px]">
                            <div className="flex items-start justify-between">
                                <span className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center text-2xl">{featured.icon || '📦'}</span>
                                <span className={`text-xs font-bold uppercase tracking-wide ${STATUS_SOLID[featured.status]} text-white px-3 py-1.5 rounded-full`}>{featured.status}</span>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-2xl sm:text-3xl font-extrabold">{featured.name}</h3>
                                <p className="mt-1 text-sm font-medium text-neutral-700">{featured.category} &bull; {featured.color}</p>
                            </div>
                            <div className="mt-8 pt-5 border-t border-neutral-900/15 flex flex-wrap items-center gap-4 text-sm font-semibold text-neutral-700">
                                <span className="flex items-center gap-1.5">
                                    <Icon name="calendar" className="w-4 h-4" />
                                    {formatDate(featured.date)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Icon name="pin" className="w-4 h-4" />
                                    {featured.location}
                                </span>
                            </div>
                        </article>

                        {small.map((item, i) => (
                            <article key={item.id} className={`${CARD_BG[i % CARD_BG.length]} text-neutral-900 rounded-3xl p-6 flex flex-col justify-between hover-lift-lg hover:shadow-2xl min-h-[240px]`}>
                                <div className="flex items-start justify-between">
                                    <span className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center text-xl">{item.icon || '📦'}</span>
                                    <span className={`text-[11px] font-bold uppercase tracking-wide ${STATUS_SOLID[item.status]} text-white px-2.5 py-1 rounded-full`}>{item.status}</span>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-xl font-extrabold">{item.name}</h3>
                                    <p className="mt-1 text-xs font-medium text-neutral-700">{item.category} &bull; {item.color}</p>
                                </div>
                                <div className="mt-5 pt-4 border-t border-neutral-900/15 flex flex-col gap-1 text-xs font-semibold text-neutral-700">
                                    <span>📅 {formatDate(item.date)}</span>
                                    <span>📍 {item.location}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
