import { useEffect, useState } from 'react';
import { CATEGORIES, STATUSES, Icon } from './shared';

const EMPTY = {
    name: '',
    icon: '',
    category: CATEGORIES[0],
    color: '',
    status: STATUSES[0],
    date: '',
    location: '',
};

const inputCls =
    'w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:bg-white/10 transition-all';
const selectCls =
    'w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-violet-400/60';

function Err({ msg }) {
    return msg ? <p className="mt-1 text-xs font-medium text-rose-400">{msg}</p> : null;
}

/**
 * Create / Edit modal.
 *  - item === null  -> "Add New Item"
 *  - item = {...}   -> "Edit Item" (form is pre-filled)
 * onSave(payload) must return a promise (it calls the API).
 */
export default function ItemModal({ open, item, onClose, onSave }) {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const isEdit = Boolean(item);

    // (re)fill the form every time the modal opens
    useEffect(() => {
        if (!open) return;
        setErrors({});
        setSaving(false);
        setForm(
            item
                ? {
                      name: item.name ?? '',
                      icon: item.icon ?? '',
                      category: item.category ?? CATEGORIES[0],
                      color: item.color ?? '',
                      status: item.status ?? STATUSES[0],
                      date: String(item.date ?? '').slice(0, 10),
                      location: item.location ?? '',
                  }
                : EMPTY,
        );
    }, [open, item]);

    // close with the Escape key
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();

        // quick client-side check (the server validates again)
        const local = {};
        ['name', 'color', 'date', 'location'].forEach((f) => {
            if (!String(form[f]).trim()) local[f] = 'This field is required.';
        });
        if (Object.keys(local).length) {
            setErrors(local);
            return;
        }

        setSaving(true);
        setErrors({});
        try {
            await onSave({
                ...form,
                name: form.name.trim(),
                icon: form.icon.trim() || '📦',
                color: form.color.trim(),
                location: form.location.trim(),
            });
        } catch (err) {
            const apiErrors = err?.response?.data?.errors;
            if (apiErrors) {
                setErrors(Object.fromEntries(Object.entries(apiErrors).map(([k, v]) => [k, v[0]])));
            } else {
                setErrors({ form: 'Something went wrong. Please try again.' });
            }
            setSaving(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-[#17171b] border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-extrabold">{isEdit ? 'Edit Item' : 'Add New Item'}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <Icon name="x" className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="field-name" className="block text-xs font-semibold text-neutral-300 mb-1.5">Item Name</label>
                            <input id="field-name" type="text" value={form.name} onChange={set('name')} placeholder='e.g. MacBook Pro 13"' className={inputCls} />
                            <Err msg={errors.name} />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="field-icon" className="block text-xs font-semibold text-neutral-300 mb-1.5">Icon (emoji)</label>
                            <input id="field-icon" type="text" maxLength={4} value={form.icon} onChange={set('icon')} placeholder="📦" className={inputCls} />
                            <Err msg={errors.icon} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="field-category" className="block text-xs font-semibold text-neutral-300 mb-1.5">Category</label>
                            <select id="field-category" value={form.category} onChange={set('category')} className={selectCls}>
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <Err msg={errors.category} />
                        </div>
                        <div>
                            <label htmlFor="field-color" className="block text-xs font-semibold text-neutral-300 mb-1.5">Color</label>
                            <input id="field-color" type="text" value={form.color} onChange={set('color')} placeholder="e.g. Space Gray" className={inputCls} />
                            <Err msg={errors.color} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="field-status" className="block text-xs font-semibold text-neutral-300 mb-1.5">Status</label>
                            <select id="field-status" value={form.status} onChange={set('status')} className={selectCls}>
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            <Err msg={errors.status} />
                        </div>
                        <div>
                            <label htmlFor="field-date" className="block text-xs font-semibold text-neutral-300 mb-1.5">Date</label>
                            <input id="field-date" type="date" value={form.date} onChange={set('date')} className={`${selectCls} [color-scheme:dark]`} />
                            <Err msg={errors.date} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="field-location" className="block text-xs font-semibold text-neutral-300 mb-1.5">Campus Location</label>
                        <input id="field-location" type="text" value={form.location} onChange={set('location')} placeholder="e.g. Central Library" className={inputCls} />
                        <Err msg={errors.location} />
                    </div>

                    <Err msg={errors.form} />

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 text-sm font-semibold border border-white/15 rounded-full py-2.5 hover:bg-white/5 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 text-sm font-bold bg-gradient-to-r from-amber-300 via-rose-400 to-violet-500 text-neutral-900 rounded-full py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60"
                        >
                            {saving ? 'Saving…' : isEdit ? 'Update Item' : 'Save Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
