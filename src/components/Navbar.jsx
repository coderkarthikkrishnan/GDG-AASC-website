import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../authContext';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
    const { user, signIn, signOut, loading } = useAuth();
    const [open, setOpen] = useState(false); // avatar menu
    const [mobileOpen, setMobileOpen] = useState(false); // hamburger menu
    const menuRef = useRef(null);
    const navRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (!open) return;
        const onDocClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [open]);
    // Close menus when route changes
    useEffect(() => {
        setMobileOpen(false);
        setOpen(false);
    }, [location.pathname]);

    // Close mobile menu on outside click
    useEffect(() => {
        if (!mobileOpen) return;
        const onDocClick = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setMobileOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [mobileOpen]);

    return (
        <nav className="nav" ref={navRef}>
            {/* Brand: logo + text on the left */}
            <NavLink to="/" className="brandLink" title="GDG AASC">
                <img src={logo} alt="GDG AASC" className="brandLogo" />
                <span className="brandText">GDG AASC</span>
            </NavLink>

            {/* Right side: hamburger + links + profile (profile stays visible) */}
            <div className="navRight">
                {/* Hamburger button (visible on small screens) */}
                <button
                    className="hamburger"
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                    aria-controls="primary-navigation"
                    onClick={() => setMobileOpen((v) => !v)}
                >
                    <span aria-hidden="true"></span>
                </button>

                {/* Links */}
                <div id="nav-main" className={`navMain ${mobileOpen ? 'open' : ''}`}>
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/events">Events</NavLink>
                    {user && <NavLink to="/resources">Resources</NavLink>}
                    <NavLink to="/gallery">Gallery</NavLink>
                </div>

                {/* Profile / Auth (always outside hamburger) */}
                {loading ? (
                    <span className="user">Loading…</span>
                ) : user ? (
                    <div className="avatarWrap" ref={menuRef}>
                        <button
                            className="avatarBtn"
                            aria-haspopup="menu"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            title="Account"
                        >
                            {user.photoURL ? (
                                <img
                                    className="avatar"
                                    src={user.photoURL}
                                    alt="Profile"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="avatar fallback" aria-label="Profile" />
                            )}
                        </button>
                        {open && (
                            <div className="menu" role="menu">
                                <button className="menuItem" role="menuitem" onClick={signOut}>Sign out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="btn link" onClick={signIn}>Sign in</button>
                )}
            </div>
        </nav>
    );
}
