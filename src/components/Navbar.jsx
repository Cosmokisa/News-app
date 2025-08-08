import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';
import '../styles/navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => setIsOpen((prev) => !prev);
    const closeNavbar = () => setIsOpen(false);
    return (
        <>
            <button className="navbar-toggle" onClick={toggleNavbar}>
                <img src={isOpen ? close : menu} alt="Toggle Menu" />
            </button>
            <nav className={`navbar ${isOpen ? 'open' : ''}`}>
                <NavLink to="/" className="navbar-link" onClick={closeNavbar}>
                    Home
                </NavLink>
                <NavLink
                    to="/category/business"
                    className="navbar-link"
                    onClick={closeNavbar}
                >
                    Business
                </NavLink>
                <NavLink
                    to="/category/technology"
                    className="navbar-link"
                    onClick={closeNavbar}
                >
                    Technology
                </NavLink>
                <NavLink
                    to="/category/health"
                    className="navbar-link"
                    onClick={closeNavbar}
                >
                    Health
                </NavLink>
                <NavLink
                    to="/category/sport"
                    className="navbar-link"
                    onClick={closeNavbar}
                >
                    Sport
                </NavLink>
                <NavLink
                    to="/saved"
                    className="navbar-link"
                    onClick={closeNavbar}
                >
                    Saved
                </NavLink>
            </nav>
        </>
    );
}

export default Navbar;
