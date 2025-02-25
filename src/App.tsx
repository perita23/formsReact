import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/header/navBar/NavBar";
import Home from "./pages/homePage/Home";
import "./styles/App.css";
function App() {
  return (
    <Router>
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
