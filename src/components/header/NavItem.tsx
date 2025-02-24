import { Link } from "react-router-dom";
import "../../styles/navItem.css";



const NavItem = ({path,text}: { text: string, path: string } )=>{ 
  return(
    <li>
      <Link to={path}>{text}</Link>
    </li>
  )
}
export default NavItem;