import "../../styles/navbar.css";
import NavItem from "./NavItem";
function NavBar() {
  return (
    <header className="navbar">
      <ul className="nav-list">
        <NavItem text="Home" path="/" />
        <NavItem text="About" path="/about" />
        <NavItem text="Contact" path="/contact" />
      </ul>
    </header>
  );
}
export default NavBar;
