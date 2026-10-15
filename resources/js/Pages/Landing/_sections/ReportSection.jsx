import { Link } from '@inertiajs/react';

export default function ReportSection() {
    return (
        <section id="report" className="px-5 pb-20 sm:pb-24">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-amber-200 via-rose-200 to-violet-300 text-neutral-900 rounded-3xl p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Found something? Report it in under 60 seconds.</h2>
            <p className="mt-3 text-neutral-700 max-w-lg mx-auto text-sm sm:text-base">Help a fellow student get their belongings back — every report matters.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={route('products')} className="w-full sm:w-auto bg-neutral-900 text-white font-bold px-7 py-3 rounded-full hover:bg-black transition-colors">Report Found Item</Link>
              <a href="#browse" className="w-full sm:w-auto bg-white/70 text-neutral-900 font-bold px-7 py-3 rounded-full hover:bg-white transition-colors">Browse Lost Items</a>
            </div>
          </div>
        </section>
    );
}
