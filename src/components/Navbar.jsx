import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-link">
                Home
            </NavLink>
            <NavLink to="/business" className="navbar-link">
                Business
            </NavLink>
            <NavLink to="/technology" className="navbar-link">
                Technology
            </NavLink>
            <NavLink to="/health" className="navbar-link">
                Health
            </NavLink>
            <NavLink to="/sport" className="navbar-link">
                Sport
            </NavLink>
            <NavLink to="/saved" className="navbar-link">
                Saved
            </NavLink>
        </nav>
    );
}

export default Navbar;
