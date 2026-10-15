import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import DirectorySection from './_sections/DirectorySection';
import FeaturesSection from './_sections/FeaturesSection';
import FooterSection from './_sections/FooterSection';
import HeroSection from './_sections/HeroSection';
import NavSection from './_sections/NavSection';
import ReportSection from './_sections/ReportSection';

// landing.html -> React.  `items` is sent by routes/web.php (latest rows of the `products` table).
export default function Landing({ items = [] }) {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('All Locations');

    // the search boxes in the nav and hero filter the directory below
    const visible = useMemo(() => {
        const q = query.toLowerCase().trim();
        return items.filter((it) => {
            const text = `${it.name} ${it.category} ${it.color} ${it.location}`.toLowerCase();
            const matchesText = !q || text.includes(q);
            const matchesLocation = location === 'All Locations' || it.location.toLowerCase().includes(location.toLowerCase());
            return matchesText && matchesLocation;
        });
    }, [items, query, location]);

    const handleSearch = (e) => {
        e.preventDefault();
        document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-[#1C1C21] text-white antialiased min-h-screen">
            <Head title="Campus Lost & Found" />
            <NavSection query={query} setQuery={setQuery} />
            <HeroSection query={query} setQuery={setQuery} location={location} setLocation={setLocation} onSearch={handleSearch} />
            <FeaturesSection />
            <DirectorySection items={visible} />
            <ReportSection />
            <FooterSection />
        </div>
    );
}
