import { useMemo, useState } from 'react';
import { CATEGORIES, Icon, STATUSES, STATUS_BADGE, formatDate } from './shared';

const filterCls =
    'px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-neutral-300 focus:outline-none focus:ring-2 focus:ring-violet-400/60';

/**
 * "Product Management" view (the full CRUD table from products.html).
 * It does not own any data: `items` come from useItems() in <CampusApp>, which loads them
 * from the database. Add / Edit / Delete are handed up through onAdd / onEdit / onDelete.
 */
export default function ProductsView({ items, loading, error, search, onSearch, onAdd, onEdit, onDelete }) {
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const stats = useMemo(
        () => ({
            total: items.length,
            lost: items.filter((i) => i.status === 'Lost').length,
            found: items.filter((i) => i.status === 'Found').length,
            claimed: items.filter((i) => i.status === 'Claimed').length,
        }),
        [items],
    );

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return items.filter((item) => {
            const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [items, search, statusFilter, categoryFilter]);

    return (
        <main className="px-5 sm:px-8 py-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Product Management</h2>
                    <p className="mt-2 text-sm text-neutral-400 max-w-lg">
                        Create, review, update, and remove lost &amp; found item records across the entire campus directory.
                    </p>
                </div>
                <button
                    onClick={onAdd}
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 text-sm font-bold bg-gradient-to-r from-amber-300 via-rose-400 to-violet-500 text-neutral-900 px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                    <Icon name="plus" className="w-4 h-4" />
                    Add New Item
                </button>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-200 text-sm px-4 py-3">{error}</div>
            )}

            {/* Stat tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">
                    <p className="text-xs font-semibold text-neutral-500">Total Items</p>
                    <p className="mt-2 text-2xl font-extrabold">{stats.total}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">
                    <p className="text-xs font-semibold text-rose-300">Lost</p>
                    <p className="mt-2 text-2xl font-extrabold">{stats.lost}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">
                    <p className="text-xs font-semibold text-emerald-300">Found</p>
                    <p className="mt-2 text-2xl font-extrabold">{stats.found}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">
                    <p className="text-xs font-semibold text-violet-300">Claimed</p>
                    <p className="mt-2 text-2xl font-extrabold">{stats.claimed}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Search by item name or location..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:bg-white/10 transition-all"
                    />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={filterCls}>
                    <option value="all">All Statuses</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={filterCls}>
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <p className="text-xs text-neutral-500 mb-3">
                {loading ? 'Loading items…' : `Showing ${filtered.length} of ${items.length} items`}
            </p>

            {/* Table */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto campus-scroll">
                    <table className="w-full text-sm min-w-[720px]">
                        <thead>
                            <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-neutral-500 border-b border-white/10">
                                <th className="px-5 py-4">Item</th>
                                <th className="px-5 py-4">Category</th>
                                <th className="px-5 py-4">Color</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Date</th>
                                <th className="px-5 py-4">Location</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((item) => (
                                <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-base shrink-0">
                                                {item.icon || '📦'}
                                            </span>
                                            <span className="font-semibold">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-neutral-400">{item.category}</td>
                                    <td className="px-5 py-4 text-neutral-400">{item.color}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${STATUS_BADGE[item.status] || 'bg-white/10 text-neutral-300'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-neutral-400 whitespace-nowrap">{formatDate(item.date)}</td>
                                    <td className="px-5 py-4 text-neutral-400">{item.location}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(item)}
                                                aria-label="Edit item"
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                            >
                                                <Icon name="pencil" className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(item)}
                                                aria-label="Delete item"
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 transition-colors"
                                            >
                                                <Icon name="trash" className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state */}
                {!loading && filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                        <span className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4">🔍</span>
                        <p className="font-bold">{items.length === 0 ? 'No items yet' : 'No items match your filters'}</p>
                        <p className="text-sm text-neutral-500 mt-1">
                            {items.length === 0 ? 'Click "Add New Item" to create the first record.' : 'Try adjusting your search or filter criteria.'}
                        </p>
                    </div>
                )}
            </div>

            <p className="mt-10 text-center text-xs text-neutral-600">&copy; 2026 Campus Lost &amp; Found. All rights reserved.</p>
        </main>
    );
}
