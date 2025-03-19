import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Suspense } from 'react';
import './i18n';
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('No se encontró el elemento root');

const root = createRoot(rootElement);
root.render(
    <Suspense fallback="Loading...">
        <App />
    </Suspense>
);