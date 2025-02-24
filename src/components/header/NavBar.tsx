import NavItem from "./NavItem";
import"../../styles/navItem.css";
function NavBar(){

    return(
        <header>
            <ul>
                <NavItem text="Home" path="/" />
                <NavItem text="About" path="/about" />
                <NavItem text="Contact" path="/contact" />
            </ul>
        </header>
    )
}export default NavBar;