export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 sm:py-24 px-5 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Students Trust Us</h2>
              <p className="mt-3 text-neutral-400 text-base sm:text-lg">A safer, faster way to reunite students with what they lost — built for campus life.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Feature 1 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover-lift hover:border-white/20">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/15 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Verified Student Reporting</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Every report is tied to a verified campus ID, keeping listings trustworthy and reducing fake claims.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover-lift hover:border-white/20">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/15 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Instant Campus Alerts</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Get notified the moment a matching item is reported found anywhere across campus, in real time.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover-lift hover:border-white/20">
                <div className="w-12 h-12 rounded-2xl bg-violet-400/15 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v8m-6-4h12M5 21h14a2 2 0 002-2V8.5L15.5 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Secure Pickup Locations</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Collect items at monitored, staffed campus pickup points — no risky off-campus meetups required.</p>
              </div>

            </div>
          </div>
        </section>
    );
}
