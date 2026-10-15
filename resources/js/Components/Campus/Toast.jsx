import { Icon } from './shared';

export default function Toast({ toast }) {
    const error = toast.tone === 'error';
    return (
        <div
            id="toast"
            className={`fixed bottom-6 right-6 z-[70] pointer-events-none ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            <div className="flex items-center gap-2.5 bg-white text-neutral-900 rounded-2xl pl-4 pr-5 py-3 shadow-2xl">
                <span className={`w-6 h-6 rounded-full ${error ? 'bg-rose-500' : 'bg-emerald-500'} flex items-center justify-center shrink-0`}>
                    <Icon name={error ? 'x' : 'check'} className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </span>
                <span className="text-sm font-semibold">{toast.message}</span>
            </div>
        </div>
    );
}
