import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/header/navBar/NavBar";
import Bg from "./components/UI/bg/bg"; // Assuming bg is a background image or style
import Home from "./pages/homePage/Home";
import "./styles/App.css";
function App() {
  return (
    <Router>
      <Bg />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/formularios" element={} />
        <Route path="/contact" element={} /> */}
      </Routes>
    </Router>
  );
}
export default App;
