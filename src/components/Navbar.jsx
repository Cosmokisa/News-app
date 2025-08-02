import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-link">
                Home
            </NavLink>
            <NavLink to="/category/business" className="navbar-link">
                Business
            </NavLink>
            <NavLink to="/category/technology" className="navbar-link">
                Technology
            </NavLink>
            <NavLink to="/category/health" className="navbar-link">
                Health
            </NavLink>
            <NavLink to="/category/sport" className="navbar-link">
                Sport
            </NavLink>
            <NavLink to="/category/saved" className="navbar-link">
                Saved
            </NavLink>
        </nav>
    );
}

export default Navbar;
