export default function FooterSection() {
    return (
        <footer id="contact" className="border-t border-white/10 bg-black/30 px-5 pt-16 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

              {/* Brand + social */}
              <div className="col-span-2">
                <a href="#home" className="flex items-center gap-2 mb-4">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 via-rose-400 to-violet-500 flex items-center justify-center text-base font-black text-neutral-900">C</span>
                  <span className="font-extrabold text-lg">Campus Lost &amp; Found</span>
                </a>
                <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
                  The trusted way for students to report, search, and recover lost belongings across campus — fast, verified, and secure.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0022 12z" /></svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 3.3.15 4.7 1.6 4.9 4.9.06 1.3.07 1.6.07 4.9s0 3.6-.07 4.9c-.15 3.3-1.6 4.7-4.9 4.9-1.3.06-1.6.07-4.9.07s-3.6 0-4.9-.07c-3.3-.15-4.7-1.6-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.15-3.3 1.6-4.75 4.9-4.9C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.07-2.4.1-3.5 1.2-3.6 3.6C3.6 8.5 3.6 8.9 3.6 12s0 3.5.07 4.7c.1 2.4 1.2 3.5 3.6 3.6 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c2.4-.1 3.5-1.2 3.6-3.6.07-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.1-2.4-1.2-3.5-3.6-3.6-1.2-.07-1.6-.07-4.7-.07zm0 3a5 5 0 110 10 5 5 0 010-10zm0 1.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4zm5.2-2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                  </a>
                  <a href="#" aria-label="X" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.9 2H22l-7.3 8.3L23 22h-6.7l-5.2-6.8L5 22H1.9l7.8-8.9L1 2h6.9l4.7 6.2L18.9 2zm-1.2 18h1.9L7.4 4H5.3l12.4 16z" /></svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Quick Links</h4>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#browse" className="hover:text-white transition-colors">Browse Items</a></li>
                  <li><a href="#report" className="hover:text-white transition-colors">Report Found</a></li>
                  <li><a href="#features" className="hover:text-white transition-colors">How It Works</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Resources</h4>
                <ul className="space-y-3 text-sm text-neutral-400">
                  <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Campus Directory</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-sm font-bold text-white mb-4">Get Instant Alerts</h4>
                <p className="text-sm text-neutral-400 mb-4">Subscribe for real-time alerts when matching items are found.</p>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input id="newsletter-email" type="email" required placeholder="you@campus.edu" className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60" />
                  <button type="submit" className="w-full bg-white text-neutral-900 font-bold text-sm rounded-full py-2.5 hover:bg-neutral-200 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
              <p>&copy; 2026 Campus Lost &amp; Found. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-neutral-300 transition-colors">Cookie Settings</a>
              </div>
            </div>
          </div>
        </footer>
    );
}
