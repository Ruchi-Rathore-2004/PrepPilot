import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { ThemeContext } from '../context/theme.context';
import { useAuth } from '../features/auth/hooks/useAuth';

export const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await handleLogout();
        navigate('/login');
    };

    return (
        <>
            {/* Subtle, elegant, non-interfering fixed watermark */}
            <div className="app-watermark" aria-hidden="true">
                Ruchi Rathore
            </div>

            <header className="app-navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        <span className="brand-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 7 0 4.4-3.6 8-8 8Z"/>
                                <path d="M11 20v-8"/>
                            </svg>
                        </span>
                        <span className="brand-text">Prep<span className="brand-accent">Pilot</span></span>
                    </Link>

                    <div className="navbar-actions">
                        <button 
                            type="button" 
                            onClick={toggleTheme} 
                            className="theme-toggle-btn"
                            aria-label="Toggle theme"
                            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                        >
                            {theme === 'light' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            )}
                            <span className="theme-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
                        </button>

                        {user ? (
                            <div className="user-profile-menu">
                                <span className="user-badge">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    {user.username}
                                </span>
                                <button type="button" onClick={onLogout} className="logout-btn">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="auth-nav-links">
                                <Link to="/login" className="nav-login-btn">Login</Link>
                                <Link to="/register" className="nav-register-btn">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};
export default Navbar;
