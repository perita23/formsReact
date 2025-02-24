import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/header/NavBar";
import Home from "./pages/home";
import "./styles/App.css";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>{
        <Route path="/" element={<Home />} />}
      </Routes>
    </Router>
  );
}
export default App;
