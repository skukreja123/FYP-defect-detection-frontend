import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">FDD</div>

      <div
        className={`nav-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/About" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/upload" onClick={() => setMenuOpen(false)}>Upload</Link></li>
          <li><Link to="/Video" onClick={() => setMenuOpen(false)}>RealTime</Link></li>
        </ul>

        <div className="auth-buttons">
          <button className="signup-btn" onClick={() => setMenuOpen(false)}><Link to="/signup">Sign Up</Link></button>
          <button className="login-btn" onClick={() => setMenuOpen(false)}><Link to="/login">Login</Link></button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
