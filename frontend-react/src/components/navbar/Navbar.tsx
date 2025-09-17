import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <i className="fas fa-sticky-note"></i> NotesApp
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Create Note</Link>
        </li>
        <li className={location.pathname === "/all-notes" ? "active" : ""}>
          <Link to="/all-notes">All Notes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
