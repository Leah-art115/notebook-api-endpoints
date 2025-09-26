import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <i className="fas fa-sticky-note"></i> NotesApp
      </div>

      {/* Hamburger Menu Button */}
      <button 
        className="hamburger" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isMenuOpen ? 'navbar-links-open' : ''}`}>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/" onClick={closeMenu}>Create Note</Link>
        </li>
        <li className={location.pathname === "/all-notes" ? "active" : ""}>
          <Link to="/all-notes" onClick={closeMenu}>All Notes</Link>
        </li>
      </ul>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
    </nav>
  );
}

export default Navbar;