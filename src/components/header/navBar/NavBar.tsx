import "./navbar.css";
import NavItem from "../navItem/NavItem";
function NavBar() {
  return (
    <header className="navbar">
      <ul className="nav-list">
        <NavItem text="Home" path="/" />
        <NavItem text="About" path="/about" />
        <NavItem text="Contact" path="/contact" />
      </ul>
      <div className="nav-item-active-indicator"></div> {/* Indicador flotante */}
    </header>
  );
}
export default NavBar;
