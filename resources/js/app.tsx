
//import Scss
import '../scss/themes.scss'

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

// Khôi phục Theme Customizer (các data-* trên <html>) từ localStorage
try {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const raw = window.localStorage.getItem('theme-settings');
        if (raw) {
            const settings = JSON.parse(raw) as Record<string, string>;
            Object.entries(settings).forEach(([attr, val]) => {
                if (val != null) {
                    document.documentElement.setAttribute(attr, String(val));
                }
            });
        }
    }
} catch {
    // Bỏ qua nếu localStorage không khả dụng
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const store = configureStore({ reducer: rootReducer, devTools: true });
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <App {...props} />
            </Provider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
