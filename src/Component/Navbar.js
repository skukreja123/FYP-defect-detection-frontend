import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">FDD</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/Video">RealTime</Link></li>
      </ul>
      <div className="auth-buttons">
        <button className="signup-btn"><Link to="/signup">Sign Up</Link></button>
        <button className="login-btn"><Link to="/login">Login</Link></button>
      </div>
    </nav>

    
  );
}

export default Navbar;
