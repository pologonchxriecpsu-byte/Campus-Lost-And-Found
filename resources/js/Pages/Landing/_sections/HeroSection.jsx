export default function HeroSection({ query, setQuery, location, setLocation, onSearch }) {
    return (
        <section id="home" className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 px-5 overflow-hidden">

          {/* Background glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_60%)]"></div>

          {/* Floating category pills (hidden on small screens) */}
          <div className="hidden md:block absolute top-28 left-[6%] float-badge-1 z-10">
            <span className="flex items-center gap-2 bg-white text-neutral-900 text-sm font-bold px-4 py-2.5 rounded-full shadow-2xl">🔑 Keys Found</span>
          </div>
          <div className="hidden md:block absolute top-40 right-[7%] float-badge-2 z-10">
            <span className="flex items-center gap-2 bg-white text-neutral-900 text-sm font-bold px-4 py-2.5 rounded-full shadow-2xl">💳 ID Cards</span>
          </div>
          <div className="hidden lg:block absolute bottom-16 left-[14%] float-badge-3 z-10">
            <span className="flex items-center gap-2 bg-white text-neutral-900 text-sm font-bold px-4 py-2.5 rounded-full shadow-2xl">🎧 Electronics</span>
          </div>
          <div className="hidden lg:block absolute bottom-10 right-[13%] float-badge-4 z-10">
            <span className="flex items-center gap-2 bg-white text-neutral-900 text-sm font-bold px-4 py-2.5 rounded-full shadow-2xl">🧴 Water Bottles</span>
          </div>

          <div className="relative max-w-3xl mx-auto text-center z-20">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-neutral-300 px-4 py-1.5 rounded-full mb-6">
              🎓 Trusted by 50+ Campuses Nationwide
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Lost Something on Campus?
              <span className="block bg-gradient-to-r from-amber-300 via-rose-400 to-violet-400 bg-clip-text text-transparent">Find It Fast.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-400 max-w-xl mx-auto">
              Report, search, and recover lost belongings across your campus in minutes. Verified by students, monitored by your campus community.
            </p>

            {/* Hero search bar */}
            <form onSubmit={onSearch} className="mt-10 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white rounded-2xl sm:rounded-full p-2 shadow-2xl">
                <label htmlFor="hero-item" className="sr-only">What did you lose or find?</label>
                <div className="flex items-center flex-1 px-4">
                  <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  <input id="hero-item" value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="e.g. MacBook, Student ID, Water Bottle..." className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 px-3 py-2.5 focus:outline-none text-sm sm:text-base" />
                </div>
                <label htmlFor="hero-location" className="sr-only">Campus location</label>
                <select id="hero-location" value={location} onChange={(e) => setLocation(e.target.value)} className="hidden sm:block bg-neutral-100 text-neutral-700 text-sm rounded-full px-4 py-2.5 border border-transparent focus:outline-none focus:ring-2 focus:ring-violet-300">
                  <option>All Locations</option>
                  <option>Library</option>
                  <option>Student Union</option>
                  <option>Engineering Building</option>
                  <option>Gym</option>
                </select>
                <button type="submit" className="bg-neutral-900 hover:bg-black text-white font-semibold rounded-full px-6 py-3 text-sm sm:text-base transition-colors">
                  Search
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-500">
              <span>2,400+ items recovered</span>
              <span className="hidden sm:inline">•</span>
              <span>350+ active reports</span>
              <span className="hidden sm:inline">•</span>
              <span>Avg. return time: 36 hrs</span>
            </div>
          </div>
        </section>
    );
}
