import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './i18n';

// Busca el elemento con id 'root' en el DOM donde se montará la aplicación
const rootElement = document.getElementById('root');

// Si no se encuentra el elemento root, lanza un error
if (!rootElement) throw new Error('No se encontró el elemento root');

// Crea un root para renderizar la aplicación usando la API de React 18
const root = createRoot(rootElement);

// Renderiza la aplicación dentro del elemento root
root.render(
  <Suspense fallback="Loading..."> {/* Muestra "Loading..." mientras carga contenido asíncrono */}
    <App /> {/* Componente principal de la aplicación */}
  </Suspense>
);