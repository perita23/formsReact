import { Link, useLocation } from "react-router-dom";
import "../../styles/navItem.css";



const NavItem = ({path,text}: { text: string, path: string } )=>{ 

  const location = useLocation()
  const isActive = window.location.pathname === path;

  return(
    <li className="nav-item">
      <Link className={`nav-item-link ${isActive ? "nav-item-active": ""}`} to={path}>{text}</Link>
    </li>
  )
}
export default NavItem;