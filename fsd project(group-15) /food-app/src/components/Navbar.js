import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const location = useLocation(); // Get current location to highlight active link

  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: faList,
    },
  ];

  return (
    <div className="navbar container">
      {/* Logo */}
      <Link to="/" className="logo">
        F<span>oo</span>dH<span>oo</span>d
      </Link>

      {/* Navbar Links */}
      <div className="nav-links">
        {links.map((link) => (
          <Link
            className={location.pathname === link.path ? "active" : ""}
            to={link.path}
            key={link.name}
          >
            {/* Adding FontAwesome icons */}
            <FontAwesomeIcon icon={link.icon} /> {link.name}
          </Link>
        ))}

        {/* Login and Sign Up Links */}
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
