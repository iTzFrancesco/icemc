import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth.js';
import { tebexClient } from '../lib/tebexClient.js';


// Importa le immagini
import rankVip from '../assets/rank-vip.png';
import rankVipPlus from '../assets/rank-vip-plus.png';
import rankMvp from '../assets/rank-mvp.png';
import rankMvpPlus from '../assets/rank-mvp-plus.png';
import rankHero from '../assets/rank-hero.png';
import key1 from '../assets/key-1.png';
import key5 from '../assets/key-5.png';
import key10 from '../assets/key-10.png';
import key25 from '../assets/key-25.png';

const modes = [
    { id: 'skygen', name: 'SkyGen' },
    { id: 'global', name: 'Globale' },
];

const skygenCategories = [
    { id: 'ranks', name: 'Ranks' },
    { id: 'crates', name: 'Crates' },
];


const TEBEX_PACKAGE_IDS = {
    'Yule': 7288403,
    'Crystal': 7288484,
    'Frost': 7288485,
    'Blizzard': 7288489,
    'Borea': 7288495,
    'Yukio': 7288500,
    'Join': 7288511,
    'Migrazione Account': 7288513,
    'Credito Utente': 7288516,
    //'test': 7288521,
};

const skygenProducts = {
    ranks: [
        { name: 'Yule', price: '€4.98', description: '', icon: rankVip },
        { name: 'Crystal', price: '€14.99', description: '', icon: rankVipPlus },
        { name: 'Frost', price: '€29.98', description: '', icon: rankMvp },
        { name: 'Blizzard', price: '€49.96', description: '', icon: rankMvpPlus },
        { name: 'Borea', price: '€74.99', description: '', icon: rankMvpPlus },
        { name: 'Yukio', price: '€99.50', description: '', icon: rankHero },
    ],
    crates: [],
};

const primeProducts = [
    { name: 'Join', price: '€9.99', description: '', icon: null, emoji: '🔓' },
    { name: 'Migrazione Account', price: '€4.99', description: '', icon: null, emoji: '🔁' },
    { name: 'Credito Utente', price: '€9.99', description: '', icon: null, emoji: '💳' },
    //{ name: 'test', price: '€0', description: '', icon: null, emoji: '💳' },
];

const Store = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedMode, setSelectedMode] = useState('skygen');
    const [selectedCategory, setSelectedCategory] = useState('ranks');
    const { isAuthenticated, user, login } = useAuth();

    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);

    // Login Modal
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');
    const [pendingProduct, setPendingProduct] = useState(null);

    // Success / Cancel Modal
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    // Gestisci redirect da Tebex dopo acquisto
    useEffect(() => {
        const purchaseStatus = searchParams.get('purchase');
        if (purchaseStatus === 'success') {
            setShowSuccessModal(true);
            // Rimuovi il query param dall'URL
            window.history.replaceState({}, '', '/store');
        } else if (purchaseStatus === 'cancelled') {
            setShowCancelModal(true);
            window.history.replaceState({}, '', '/store');
        }
    }, [searchParams]);

    const handlePurchaseClick = (product) => {
        if (!isAuthenticated) {
            setPendingProduct(product);
            setShowLoginModal(true);
            return;
        }
        setSelectedProduct(product);
        setCheckoutError(null);
        setShowPurchaseModal(true);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loginUsername.trim()) {
            await login(loginUsername.trim());
            setShowLoginModal(false);
            setLoginUsername('');
            if (pendingProduct) {
                setSelectedProduct(pendingProduct);
                setCheckoutError(null);
                setShowPurchaseModal(true);
                setPendingProduct(null);
            }
        }
    };

    const handleCheckout = async () => {
        if (!selectedProduct || !user?.mcUsername) return;

        const packageId = TEBEX_PACKAGE_IDS[selectedProduct.name];

        if (!packageId) {
            setCheckoutError('Pacchetto non ancora configurato su Tebex. Contatta lo staff.');
            return;
        }

        setIsLoadingCheckout(true);
        setCheckoutError(null);

        try {
            const checkoutUrl = await tebexClient.createCheckout(
                user.mcUsername,
                packageId
            );

            // Reindirizza al checkout Tebex
            window.location.href = checkoutUrl;
        } catch (err) {
            console.error('Tebex checkout error:', err);
            setCheckoutError('Errore durante la creazione del checkout. Riprova.');
            setIsLoadingCheckout(false);
        }
    };

    return (
        <div className="py-20 px-4">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-glow mb-4">
                    Store <span className="text-white">Ice</span><span className="text-ice-glow">MC</span>
                </h1>
                <p className="text-xl text-ice-light/70 max-w-2xl mx-auto">
                    Supporta il server e ottieni fantastici vantaggi in-game!
                </p>
            </div>

            {/* Mode Selector */}
            <div className="flex justify-center gap-4 mb-8">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`
                            px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300
                            border-2 uppercase tracking-wider min-w-[200px]
                            ${selectedMode === mode.id
                                ? 'bg-ice-glow/20 border-ice-glow text-ice-glow shadow-[0_0_30px_rgba(0,242,255,0.3)] scale-105'
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-ice-glow/30 hover:text-white'
                            }
                        `}
                    >
                        {mode.name}
                    </button>
                ))}
            </div>

            {/* Category Selector */}
            {selectedMode === 'skygen' && (
                <div className="flex justify-center gap-4 mb-12">
                    {skygenCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`
                                px-6 py-3 rounded-lg font-bold transition-all duration-300
                                border-2
                                ${selectedCategory === cat.id
                                    ? 'bg-ice-glow/20 border-ice-glow text-ice-glow'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-ice-glow/30'
                                }
                            `}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Prodotti */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-ice-glow drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">
                        {selectedMode === 'skygen'
                            ? (selectedCategory === 'ranks' ? 'Ranks' : 'Crates')
                            : 'Account'
                        }
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(selectedMode === 'skygen' ? skygenProducts[selectedCategory] : primeProducts).map((product, index) => (
                        <div
                            key={index}
                            className="group glass-card p-6 border-ice-glow/10 hover:border-ice-glow/50 transition-all duration-300 hover:scale-105 bg-white/5 text-center"
                        >
                            <div className="w-24 h-24 mx-auto mb-4 bg-ice-glow/10 rounded-full flex items-center justify-center group-hover:bg-ice-glow/20 transition-colors overflow-hidden">
                                {product.icon ? (
                                    <img
                                        src={product.icon}
                                        alt={product.name}
                                        className="w-20 h-20 object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'inline';
                                        }}
                                    />
                                ) : null}
                                <span className="text-4xl" style={{ display: product.icon ? 'none' : 'inline' }}>
                                    {product.emoji || (selectedMode === 'skygen' ? (selectedCategory === 'ranks' ? '👑' : '📦') : '🎁')}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-ice-glow transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-ice-light/50 text-sm mb-2">{product.description}</p>
                            <p className="text-ice-glow font-black text-lg mb-4">{product.price}</p>

                            <button
                                onClick={() => handlePurchaseClick(product)}
                                className="w-full py-3 px-6 rounded-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                            >
                                🛒 Acquista
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Conferma Acquisto */}
            {showPurchaseModal && selectedProduct && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="glass-card p-8 border-ice-glow/30 bg-ice-dark max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,242,255,0.1)]">
                        <h2 className="text-2xl font-black text-white mb-6 text-center">Completa il pagamento</h2>

                        <div className="bg-white/5 p-4 rounded-lg mb-6 border border-white/10 text-center">
                            <p className="text-sm text-ice-light/60 mb-1">Stai acquistando:</p>
                            <p className="text-xl font-bold text-ice-glow">{selectedProduct.name}</p>
                            <p className="text-lg text-white mt-1">{selectedProduct.price}</p>
                        </div>

                        <div className="bg-white/5 p-4 rounded-lg mb-6 border border-white/10 text-center">
                            <p className="text-sm text-ice-light/60 mb-1">Account Minecraft:</p>
                            <p className="text-lg font-bold text-white">{user?.mcUsername}</p>
                        </div>

                        <p className="text-center text-ice-light/60 text-sm mb-6">
                            Verrai reindirizzato al checkout sicuro di Tebex per completare il pagamento.
                        </p>

                        {checkoutError && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-center">
                                <p className="text-red-400 text-sm">{checkoutError}</p>
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={isLoadingCheckout}
                            className="w-full py-4 px-6 rounded-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoadingCheckout ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Caricamento...
                                </>
                            ) : (
                                '🛒 Vai al Checkout'
                            )}
                        </button>

                        <button
                            onClick={() => { setShowPurchaseModal(false); setCheckoutError(null); }}
                            className="w-full mt-3 py-3 px-4 rounded-lg font-bold bg-white/5 border border-white/20 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                            Annulla
                        </button>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] backdrop-blur-sm">
                    <div className="glass-card p-8 border-ice-glow/30 bg-ice-dark max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,242,255,0.15)] animate-fade-in-up">
                        <h2 className="text-3xl font-black text-white mb-2 text-center">Accedi</h2>
                        <p className="text-center text-ice-light/70 mb-8">
                            Inserisci il tuo nome utente Minecraft per continuare l'acquisto.
                        </p>
                        <form onSubmit={handleLogin}>
                            <div className="mb-6">
                                <label className="block text-ice-glow font-bold mb-2 uppercase tracking-wider text-xs">
                                    Username Minecraft
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={loginUsername}
                                        onChange={(e) => setLoginUsername(e.target.value)}
                                        placeholder="es. Steve"
                                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-ice-glow/30 text-white focus:border-ice-glow focus:outline-none focus:ring-2 focus:ring-ice-glow/20 transition-all font-bold text-lg"
                                        required
                                        autoFocus
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-2xl">
                                        👾
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => { setShowLoginModal(false); setPendingProduct(null); }}
                                    className="flex-1 py-4 px-6 rounded-xl font-bold bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all uppercase tracking-wider"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 px-6 rounded-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 border border-ice-glow/30 text-white hover:from-cyan-500 hover:to-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all uppercase tracking-wider"
                                >
                                    Accedi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[70] backdrop-blur-md">
                    <div className="glass-card p-10 border-ice-glow/50 bg-ice-dark max-w-lg w-full mx-4 text-center shadow-[0_0_100px_rgba(0,242,255,0.2)] relative overflow-hidden">
                        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full flex items-center justify-center border-2 border-green-400/50 shadow-[0_0_30px_rgba(74,222,128,0.3)]">
                            <span className="text-6xl">✅</span>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Acquisto Completato!</h2>
                        <p className="text-xl text-ice-glow font-bold mb-8">
                            Grazie per il supporto{user?.mcUsername ? `, ${user.mcUsername}` : ''}!
                        </p>
                        <p className="text-ice-light/60 mb-8">
                            Il tuo acquisto verrà consegnato automaticamente sul server entro pochi minuti.
                        </p>
                        <button
                            onClick={() => { setShowSuccessModal(false); }}
                            className="w-full py-4 px-8 rounded-xl font-black text-xl bg-gradient-to-r from-ice-glow to-blue-500 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all uppercase tracking-widest"
                        >
                            Fantastico!
                        </button>
                    </div>
                </div>
            )}

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] backdrop-blur-md">
                    <div className="glass-card p-10 border-white/10 bg-ice-dark max-w-lg w-full mx-4 text-center">
                        <span className="text-6xl block mb-6">❌</span>
                        <h2 className="text-3xl font-black text-white mb-2">Acquisto Annullato</h2>
                        <p className="text-ice-light/60 mb-8">Hai annullato il pagamento. Puoi riprovare quando vuoi.</p>
                        <button
                            onClick={() => setShowCancelModal(false)}
                            className="w-full py-4 px-8 rounded-xl font-black text-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all uppercase tracking-widest"
                        >
                            Torna allo Store
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="text-center mt-16">
                <p className="text-ice-light/60 font-black tracking-[0.2em]">
                    Per qualsiasi problema contatta lo staff su Discord
                </p>
            </div>
        </div>
    );
};

export default Store;
