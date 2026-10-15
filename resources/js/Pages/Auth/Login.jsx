import AuthField, { PasswordToggle } from '@/Components/Campus/AuthField';
import CampusAuthLayout, { FloatingBadges, SocialButtons } from '@/Layouts/CampusAuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

// login.html -> React. Posts to Laravel's real login route (Auth/AuthenticatedSessionController).
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    const panel = (
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-amber-200 via-rose-200 to-violet-300 text-neutral-900 p-14 flex-col justify-between">
            <FloatingBadges badges={['🔑 Keys Found', '💻 Electronics', '🪪 ID Cards']} />

            <div className="relative z-20">
                <span className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-xl font-black text-white">C</span>
                <h2 className="mt-10 text-3xl xl:text-4xl font-extrabold leading-tight max-w-sm">Welcome back to your campus community.</h2>
                <p className="mt-4 text-neutral-700 max-w-sm text-sm xl:text-base leading-relaxed">
                    Log in to track your reports, get instant match alerts, and reconnect with your belongings faster than ever.
                </p>
            </div>

            <div className="relative z-20 grid grid-cols-3 gap-6 max-w-sm">
                {[['2,400+', 'Items Recovered'], ['50+', 'Campuses'], ['36 hrs', 'Avg. Return']].map(([value, label]) => (
                    <div key={label}>
                        <p className="text-2xl font-extrabold">{value}</p>
                        <p className="text-xs font-semibold text-neutral-700 mt-1">{label}</p>
                    </div>
                ))}
            </div>

            <div className="relative z-20 bg-white/50 backdrop-blur-sm rounded-2xl p-5 max-w-sm">
                <p className="text-sm font-medium text-neutral-800 leading-relaxed">"I left my wallet at the library and had it back within a day. This platform actually works."</p>
                <p className="text-xs font-bold text-neutral-600 mt-3">— Maya R., Sophomore</p>
            </div>
        </section>
    );

    return (
        <CampusAuthLayout cta={{ text: 'New here?', label: 'Register', href: route('register') }} panel={panel}>
            <Head title="Log in" />

            <div className="mb-9 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 px-3.5 py-1.5 rounded-full mb-5">
                    🔒 Secure Campus Login
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Log in to your account</h1>
                <p className="mt-3 text-neutral-400 text-sm sm:text-base">
                    Don't have an account yet?{' '}
                    <Link href={route('register')} className="font-semibold text-white underline underline-offset-2 hover:text-amber-300 transition-colors">
                        Register for free
                    </Link>
                </p>
            </div>

            {status && <div className="mb-4 text-sm font-medium text-emerald-400">{status}</div>}

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8 hover-lift-sm">
                <SocialButtons dividerText="or log in with email" />

                <form onSubmit={submit} className="space-y-5" noValidate>
                    <AuthField
                        id="email"
                        label="Campus Email"
                        icon="mail"
                        type="email"
                        autoComplete="username"
                        placeholder="you@campus.edu"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        required
                    />

                    <AuthField
                        id="password"
                        label="Password"
                        icon="lock"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        required
                        right={<PasswordToggle shown={showPassword} onToggle={() => setShowPassword((s) => !s)} />}
                        action={
                            canResetPassword && (
                                <Link href={route('password.request')} className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
                                    Forgot password?
                                </Link>
                            )
                        }
                    />

                    <div className="flex items-center justify-between pt-1">
                        <label htmlFor="remember" className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-400/60 focus:ring-offset-0"
                            />
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-amber-300 via-rose-400 to-violet-500 text-neutral-900 font-bold text-sm sm:text-base rounded-2xl py-3.5 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
                    >
                        {processing ? 'Logging in…' : 'Log In to Dashboard'}
                    </button>
                </form>
            </div>

            <p className="mt-6 text-center text-xs text-neutral-500 leading-relaxed">
                By logging in, you agree to our <a href="#" className="underline hover:text-neutral-300">Terms of Service</a> and{' '}
                <a href="#" className="underline hover:text-neutral-300">Privacy Policy</a>.
            </p>
        </CampusAuthLayout>
    );
}
