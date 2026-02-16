import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-server.png';

const Navbar = ({ serverName }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Staff', path: '/staff' },
        { name: 'Regole', path: '/regole' },
        { name: 'Store', path: '/store' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
                   {/*  Header logo e pagine */}
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-ice-dark/60 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12">
         
            <div className="hidden lg:flex items-center justify-center gap-4 mr-30">
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
                </nav>
            </div>
        </header>
    );
};

export default Navbar;