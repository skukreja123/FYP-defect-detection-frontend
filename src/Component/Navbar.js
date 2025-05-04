import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const location = useLocation(); // to detect route change
  const navigate = useNavigate(); // to redirect after logout

  useEffect(() => {
    // Check token on mount and route change
    setIsLoggedIn(!!localStorage.getItem("token"));

    // Optionally, listen to storage changes from other tabs
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location]); // triggers on navigation

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

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

      {/* Desktop Menu */}
      <div className="nav-desktop">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
          <li><Link to="/upload">Image</Link></li>
          <li><Link to="/Video">Video</Link></li>
          <li><Link to="/All_frame">Report</Link></li>
        </ul>
        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
              <button className="signup-btn"><Link to="/signup">Register</Link></button>
              <button className="login-btn"><Link to="/login">Login</Link></button>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/About" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/upload" onClick={() => setMenuOpen(false)}>Image</Link></li>
          <li><Link to="/Video" onClick={() => setMenuOpen(false)}>Video</Link></li>
          <li><Link to="/All_frame" onClick={() => setMenuOpen(false)}>Report</Link></li>
        </ul>
        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
              <button className="signup-btn" onClick={() => setMenuOpen(false)}><Link to="/signup">Register</Link></button>
              <button className="login-btn" onClick={() => setMenuOpen(false)}><Link to="/login">Login</Link></button>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
