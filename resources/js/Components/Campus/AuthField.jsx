import { Icon } from './shared';

const inputCls =
    'w-full py-3 rounded-2xl bg-white/5 border text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:bg-white/10 transition-all';

/**
 * Dark input with a left icon (used by login + signup).
 *  right   -> optional node placed at the right edge (the show/hide password button)
 *  action  -> optional node placed next to the label ("Forgot password?")
 */
export default function AuthField({ id, label, hint, icon, error, right, action, className = '', ...inputProps }) {
    return (
        <div>
            <div className={action ? 'flex items-center justify-between mb-2' : ''}>
                <label htmlFor={id} className={`block text-sm font-semibold text-neutral-200 ${action ? '' : 'mb-2'}`}>
                    {label} {hint && <span className="text-neutral-500 font-normal">{hint}</span>}
                </label>
                {action}
            </div>
            <div className="relative">
                <Icon name={icon} className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                    id={id}
                    name={id}
                    {...inputProps}
                    className={`${inputCls} pl-11 ${right ? 'pr-11' : 'pr-4'} ${error ? 'border-rose-400/60' : 'border-white/10'} ${className}`}
                />
                {right}
            </div>
            {error && <p className="mt-1.5 text-xs font-medium text-rose-400">{error}</p>}
        </div>
    );
}

export function PasswordToggle({ shown, onToggle }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={shown ? 'Hide password' : 'Show password'}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
        >
            <Icon name={shown ? 'eyeOff' : 'eye'} className="w-4 h-4" />
        </button>
    );
}
