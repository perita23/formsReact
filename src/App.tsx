import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { SurveyPage } from "./pages/SurveyPage";
import "./styles/App.css";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/survey"
          element={
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <SurveyPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export const App = () => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Intro con "QUEST UP" */}
        <AnimatePresence mode="wait">
          {isIntroVisible ? (
            <motion.div
              key="intro"
              className="intro-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
                zIndex: 9999,
              }}
            >
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ color: "#fff", fontSize: "4rem" }}
              >
                QUEST UP
              </motion.h1>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="logo-cont">
                Quest
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32px"
                  viewBox="0 -1080 960 960"
                  width="32px"
                  fill="#ffffff"
                >
                  <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                </svg>
              </div>
              <AnimatedRoutes />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};