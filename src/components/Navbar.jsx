import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth.js';
import logo from '../assets/logo-server.png';

const Navbar = ({ serverName }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');
    const { user, isAuthenticated, login, logout } = useAuth();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Staff', path: '/staff' },
        { name: 'Regole', path: '/regole' },
        { name: 'Store', path: '/store' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loginUsername.trim()) {
            await login(loginUsername.trim());
            setShowLoginModal(false);
            setLoginUsername('');
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-ice-dark/60 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12">
                {/* Desktop - Original layout with auth button on right */}
                <div className="hidden lg:flex items-center justify-center gap-4 mr-30 relative">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                        <img src={logo} alt={`${serverName} Small Logo`} className="h-10 md:h-11 w-auto drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]" />
                        <span className="text-white font-black text-2xl italic tracking-tighter">
                            Ice<span className="text-ice-glow">MC</span>
                        </span>
                    </Link>
                    
                    {/* Separator */}
                    <div className="w-px h-8 bg-white/20 mx-2"></div>
                    
                    {/* Links */}
                    <nav className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`transition-all font-bold uppercase tracking-[0.15em] text-lg ${location.pathname === link.path
                                        ? 'text-ice-glow scale-105'
                                        : 'text-white/80 hover:text-ice-glow'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Button - Positioned absolutely on the right */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 glass-card px-3 py-2 border-ice-glow/30">
                                    <span className="text-ice-glow font-bold hidden sm:block">{user?.mcUsername}</span>
                                    <img 
                                        src={`https://mc-heads.net/avatar/${user?.mcUsername}/32`}
                                        alt={`${user?.mcUsername} Avatar`}
                                        className="w-8 h-8 rounded"
                                    />
                                </div>
                                <button
                                    onClick={logout}
                                    className="text-white/60 hover:text-red-400 transition-colors hidden sm:block"
                                    title="Disconnetti"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="glass-card px-4 py-2 rounded-lg border-ice-glow/30 hover:border-ice-glow/60 text-ice-glow font-bold transition-all duration-300 hover:bg-ice-glow/10"
                            >
                                Accedi
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                        <img src={logo} alt={`${serverName} Small Logo`} className="h-10 w-auto drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]" />
                        <span className="text-white font-black text-xl italic tracking-tighter">
                            Ice<span className="text-ice-glow">MC</span>
                        </span>
                    </Link>

                    {/* Mobile Right Side */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Auth Button */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <img 
                                    src={`https://mc-heads.net/avatar/${user?.mcUsername}/32`}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded"
                                />
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="text-ice-glow font-bold text-sm"
                            >
                                Accedi
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={toggleMenu}
                            className="text-white p-2 hover:text-ice-glow transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg 
                                className="w-8 h-8" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div 
                    className={`lg:hidden absolute top-full left-0 right-0 bg-ice-dark/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                >
                    <nav className="flex flex-col items-center py-6 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`transition-all font-bold uppercase tracking-[0.15em] text-lg py-2 ${location.pathname === link.path
                                        ? 'text-ice-glow scale-105'
                                        : 'text-white/80 hover:text-ice-glow'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <>
                                <div className="flex items-center gap-2 text-ice-glow font-bold py-2">
                                    <img 
                                        src={`https://mc-heads.net/avatar/${user?.mcUsername}/24`}
                                        alt="Avatar"
                                        className="w-6 h-6 rounded"
                                    />
                                    {user?.mcUsername}
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-red-400 font-bold py-2"
                                >
                                    Disconnetti
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
                    <div className="glass-card p-8 border-ice-glow/30 bg-ice-dark max-w-md w-full mx-4">
                        <h2 className="text-2xl font-black text-white mb-6 text-center">Accedi con Minecraft</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-ice-light/60 mb-2">Username Minecraft</label>
                                <input
                                    type="text"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                    placeholder="es. Steve"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-ice-glow/30 text-white focus:border-ice-glow focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowLoginModal(false)}
                                    className="flex-1 py-3 px-4 rounded-lg font-bold bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-all"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 rounded-lg font-bold bg-ice-glow/20 border border-ice-glow/50 text-ice-glow hover:bg-ice-glow hover:text-ice-dark transition-all"
                                >
                                    Accedi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
