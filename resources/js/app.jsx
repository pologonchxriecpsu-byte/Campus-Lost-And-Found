import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            // _sections/* are parts of a page (imported by it), not pages themselves.
            // Pages/Example is the old IT-help-desk demo; it contains unresolved git merge
            // conflict markers, so it is left out of the bundle until those are fixed.
            import.meta.glob([
                './Pages/**/*.jsx',
                '!./Pages/**/_sections/**',
                '!./Pages/Example/**',
            ]),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
