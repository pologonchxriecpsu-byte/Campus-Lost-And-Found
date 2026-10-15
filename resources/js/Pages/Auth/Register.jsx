import AuthField, { PasswordToggle } from '@/Components/Campus/AuthField';
import CampusAuthLayout, { FloatingBadges, SocialButtons } from '@/Layouts/CampusAuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

// password strength levels (same rules as signup.html)
const LEVELS = [
    { width: '0%', color: 'bg-rose-500', label: 'Weak' },
    { width: '25%', color: 'bg-rose-500', label: 'Weak' },
    { width: '50%', color: 'bg-amber-400', label: 'Fair' },
    { width: '75%', color: 'bg-amber-400', label: 'Good' },
    { width: '100%', color: 'bg-emerald-500', label: 'Strong' },
];

function strength(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return LEVELS[score];
}

// signup.html -> React. Posts to Laravel's real register route (Auth/RegisteredUserController).
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        student_id: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const level = strength(data.password);
    const matchState = data.password_confirmation.length === 0 ? null : data.password_confirmation === data.password;

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    const panel = (
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-violet-300 via-rose-200 to-amber-200 text-neutral-900 p-14 flex-col justify-between">
            <FloatingBadges badges={['🧴 Water Bottles', '🎧 Electronics', '🔑 Keys']} />

            <div className="relative z-20">
                <span className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-xl font-black text-white">C</span>
                <h2 className="mt-10 text-3xl xl:text-4xl font-extrabold leading-tight max-w-sm">Join your campus community in seconds.</h2>
                <p className="mt-4 text-neutral-700 max-w-sm text-sm xl:text-base leading-relaxed">
                    Create a free verified account to report lost items, claim found belongings, and get instant alerts the moment there's a match.
                </p>
            </div>

            <div className="relative z-20 space-y-4 max-w-sm">
                {['Verify with your campus email', 'Report or browse items instantly', 'Get matched and pick up safely'].map((step, i) => (
                    <div key={step} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-sm font-semibold text-neutral-800">{step}</p>
                    </div>
                ))}
            </div>

            <div className="relative z-20 bg-white/50 backdrop-blur-sm rounded-2xl p-5 max-w-sm">
                <p className="text-sm font-medium text-neutral-800 leading-relaxed">"Signing up took two minutes. I got my AirPods back the same week."</p>
                <p className="text-xs font-bold text-neutral-600 mt-3">— Jordan P., Junior</p>
            </div>
        </section>
    );

    return (
        <CampusAuthLayout cta={{ text: 'Already a member?', label: 'Log In', href: route('login') }} panel={panel}>
            <Head title="Register" />

            <div className="mb-8 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 px-3.5 py-1.5 rounded-full mb-5">
                    🎓 Free for Verified Students
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Create your account</h1>
                <p className="mt-3 text-neutral-400 text-sm sm:text-base">
                    Already have an account?{' '}
                    <Link href={route('login')} className="font-semibold text-white underline underline-offset-2 hover:text-amber-300 transition-colors">
                        Log in instead
                    </Link>
                </p>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8 hover-lift-sm">
                <SocialButtons dividerText="or sign up with email" />

                <form onSubmit={submit} className="space-y-5" noValidate>
                    <AuthField
                        id="name"
                        label="Full Name"
                        icon="user"
                        type="text"
                        autoComplete="name"
                        placeholder="Alex Johnson"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        required
                    />

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
                        id="student_id"
                        label="Student ID"
                        hint="(for verification)"
                        icon="idcard"
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g. 20245678"
                        value={data.student_id}
                        onChange={(e) => setData('student_id', e.target.value)}
                        error={errors.student_id}
                        required
                    />

                    <div>
                        <AuthField
                            id="password"
                            label="Password"
                            icon="lock"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            minLength={8}
                            placeholder="Create a password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            required
                            right={<PasswordToggle shown={showPassword} onToggle={() => setShowPassword((s) => !s)} />}
                        />

                        {/* Password strength meter */}
                        <div className="mt-2.5 flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                                <div className={`strength-bar h-full rounded-full ${level.color}`} style={{ width: level.width }} />
                            </div>
                            <span className="text-[11px] font-semibold text-neutral-500 w-16 text-right">{data.password ? level.label : 'Weak'}</span>
                        </div>
                    </div>

                    <div>
                        <AuthField
                            id="password_confirmation"
                            label="Confirm Password"
                            icon="checkCircle"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            required
                        />
                        {matchState !== null && (
                            <p className={`mt-1.5 text-xs font-medium ${matchState ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {matchState ? 'Passwords match' : 'Passwords do not match'}
                            </p>
                        )}
                    </div>

                    {/* Terms checkbox */}
                    <div className="pt-1">
                        <label htmlFor="terms" className="flex items-start gap-2.5 text-sm text-neutral-400 cursor-pointer">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={data.terms}
                                onChange={(e) => setData('terms', e.target.checked)}
                                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-400/60 focus:ring-offset-0"
                            />
                            <span>
                                I agree to the <a href="#" className="font-semibold text-white underline hover:text-amber-300">Terms of Service</a> and{' '}
                                <a href="#" className="font-semibold text-white underline hover:text-amber-300">Privacy Policy</a>
                            </span>
                        </label>
                        {errors.terms && <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.terms}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-amber-300 via-rose-400 to-violet-500 text-neutral-900 font-bold text-sm sm:text-base rounded-2xl py-3.5 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
                    >
                        {processing ? 'Creating account…' : 'Create My Account'}
                    </button>
                </form>
            </div>

            <p className="mt-6 text-center text-xs text-neutral-500 leading-relaxed">
                We'll send a verification link to your campus email before activating your account.
            </p>
        </CampusAuthLayout>
    );
}
