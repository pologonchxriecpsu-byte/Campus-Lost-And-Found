import { useEffect, useState } from 'react';

export default function DeleteModal({ item, onClose, onConfirm }) {
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (!item) return;
        setBusy(false);
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [item, onClose]);

    if (!item) return null;

    const confirm = async () => {
        setBusy(true);
        try {
            await onConfirm();
        } finally {
            setBusy(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-[#17171b] border border-white/10 rounded-3xl max-w-sm w-full p-6 sm:p-7 text-center text-white">
                <span className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/15 flex items-center justify-center text-2xl mb-4">🗑️</span>
                <h3 className="text-lg font-extrabold">Delete this item?</h3>
                <p className="mt-2 text-sm text-neutral-400">
                    You're about to permanently remove{' '}
                    <span className="font-semibold text-neutral-200">"{item.name}"</span> from the directory. This can't be undone.
                </p>
                <div className="flex gap-3 mt-6">
                    <button onClick={onClose} className="flex-1 text-sm font-semibold border border-white/15 rounded-full py-2.5 hover:bg-white/5 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={confirm}
                        disabled={busy}
                        className="flex-1 text-sm font-bold bg-rose-500 text-white rounded-full py-2.5 hover:bg-rose-600 transition-colors disabled:opacity-60"
                    >
                        {busy ? 'Deleting…' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
