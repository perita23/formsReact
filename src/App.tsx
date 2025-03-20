import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Result } from "./pages/Result";
import { SurveyPage } from "./pages/SurveyPage";
import "./styles/App.css";

/**
 * Componente funcional que maneja las rutas animadas de la aplicación.
 * Utiliza el hook useLocation para obtener la ubicación actual y animar transiciones entre rutas.
 * @returns {JSX.Element} Rutas animadas envueltas en AnimatePresence.
 */
const AnimatedRoutes = () => {
  const location = useLocation(); // Obtiene la ruta actual del navegador

  return (
    <AnimatePresence mode="wait"> {/* Asegura que las animaciones esperen a completarse */}
      <Routes location={location} key={location.pathname}> {/* Define las rutas con una clave única */}
        <Route
          path="/" // Ruta principal
          element={
            <motion.div
              initial={{ opacity: 0, y: 0 }} // Estado inicial: invisible
              animate={{ opacity: 1, y: 0 }} // Estado animado: visible
              exit={{ opacity: 0, y: 0 }} // Estado al salir: invisible
              transition={{ duration: 0.3, ease: "easeOut" }} // Transición de 0.3 segundos
            >
              <Home /> {/* Componente de la página principal */}
            </motion.div>
          }
        />
        <Route
          path="/survey" // Ruta de la encuesta
          element={
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <SurveyPage /> {/* Componente de la página de encuesta */}
            </motion.div>
          }
        />
        <Route
          path="/result" // Ruta de resultados
          element={
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Result /> {/* Componente de la página de resultados */}
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * Componente principal de la aplicación.
 * Maneja la intro animada y el enrutamiento global.
 * @returns {JSX.Element} Estructura principal con intro y rutas animadas.
 */
export const App = () => {
  const [isIntroVisible, setIsIntroVisible] = useState(true); // Estado para controlar la visibilidad de la intro

  useEffect(() => { // Efecto para ocultar la intro tras 2 segundos
    const timer = setTimeout(() => {
      setIsIntroVisible(false); // Cambia el estado para ocultar la intro
    }, 2000); // Espera 2000ms (2 segundos)
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, []); // Dependencias vacías: solo se ejecuta al montar

  return (
    <BrowserRouter> {/* Habilita el enrutamiento en la aplicación */}
      <div className="App"> {/* Contenedor principal con estilos */}
        <AnimatePresence mode="wait"> {/* Controla la transición entre intro y contenido */}
          {isIntroVisible ? ( // Si la intro está visible
            <motion.div
              key="intro" // Clave única para AnimatePresence
              className="intro-overlay" // Clase para estilos adicionales
              initial={{ opacity: 0 }} // Comienza invisible
              animate={{ opacity: 1 }} // Se hace visible
              exit={{ opacity: 0 }} // Desaparece al salir
              transition={{ duration: 0.5, ease: "easeInOut" }} // Transición de 0.5 segundos
              style={{
                position: "fixed", // Fijo para cubrir la pantalla
                top: 0, // Alineado arriba
                left: 0, // Alineado a la izquierda
                width: "100vw", // Ancho completo
                height: "100vh", // Alto completo
                display: "flex", // Flexbox para centrar
                justifyContent: "center", // Centrado horizontal
                alignItems: "center", // Centrado vertical
                backgroundColor: "#000", // Fondo negro
                zIndex: 9999, // Encima de todo
              }}
            >
              <motion.h1
                initial={{ y: 50, opacity: 0 }} // Comienza desplazado abajo e invisible
                animate={{ y: 0, opacity: 1 }} // Sube y aparece
                transition={{ duration: 0.7, ease: "easeOut" }} // Transición de 0.7 segundos
                style={{ color: "#fff", fontSize: "4rem" }} // Texto blanco y grande
              >
                QUEST UP {/* Título de la intro */}
              </motion.h1>
            </motion.div>
          ) : ( // Si la intro no está visible
            <motion.div
              key="content" // Clave única para AnimatePresence
              initial={{ opacity: 0 }} // Comienza invisible
              animate={{ opacity: 1 }} // Se hace visible
              transition={{ duration: 0.5, ease: "easeInOut" }} // Transición de 0.5 segundos
            >
              <div className="logo-cont"> {/* Contenedor del logo */}
                Quest {/* Texto del logo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg" // Namespace del SVG
                  height="32px" // Altura del ícono
                  viewBox="0 -1080 960 960" // Área visible del SVG
                  width="32px" // Ancho del ícono
                  fill="#ffffff" // Relleno blanco
                >
                  <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" /> {/* Forma de flecha */}
                </svg>
              </div>
              <AnimatedRoutes /> {/* Renderiza las rutas animadas */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};