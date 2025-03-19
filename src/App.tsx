import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SurveyPage } from "./pages/SurveyPage";
import "./styles/App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<SurveyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
