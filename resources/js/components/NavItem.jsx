import { Link } from "react-router-dom";

function NavItem(props) {
  const { href, displayText } = props;
  return (
    <li className="nav-item">
      <Link className="nav-link" to={href}>
        {displayText}
      </Link>
    </li>
  );
}

export default NavItem;
