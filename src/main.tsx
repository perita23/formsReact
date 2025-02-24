import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import cuestionario from '../public/cuestionario.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App cuestionario={cuestionario} />
  </StrictMode>,
)
