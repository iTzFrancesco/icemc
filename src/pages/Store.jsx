import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth.js';
import { apiClient } from '../lib/api-client.js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// Importa le immagini - verranno usate se esistono
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

const skygenProducts = {
    ranks: [
        { name: 'Yule', price: '€4.98', description: '', icon: rankVip },
        { name: 'Crystal', price: '€14.99', description: '', icon: rankVipPlus },
        { name: 'Frost', price: '€29.98', description: '', icon: rankMvp },
        { name: 'Blizzard', price: '€49.96', description: '', icon: rankMvpPlus },
        { name: 'Borea', price: '€74.99', description: '', icon: rankMvpPlus },
        { name: 'Yukio', price: '€99.50', description: '', icon: rankHero },
    ],
    crates: [
         //{ name: '1 Key', price: '€0.99', description: '', icon: key1 },
         //{ name: '5 Keys', price: '€3.99', description: '', icon: key5 },
         //{ name: '10 Keys', price: '€6.99', description: '', icon: key10 },
         //{ name: '25 Keys', price: '€14.99', description: '', icon: key25 },
    ],
};

const primeProducts = [
    { name: 'Join', price: '€9.99', description: '', icon: null, emoji: '🔓' },
    { name: 'Migrazione Account', price: '€4.99', description: '', icon: null, emoji: '🔁' },
    { name: 'Credito Utente', price: '€9.99', description: '', icon: null, emoji: '💳' },
];

const Store = () => {
    const navigate = useNavigate();
    const [selectedMode, setSelectedMode] = useState('skygen');
    const [selectedCategory, setSelectedCategory] = useState('ranks');
    const { isAuthenticated, user, login } = useAuth();
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Login Modal State
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');

    // Success Modal State
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [purchasedItem, setPurchasedItem] = useState(null);

    const handlePurchaseClick = (product) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        setSelectedProduct(product);
        setShowPurchaseModal(true);
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
        <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "EUR" }}>
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

                {/* Category Selector - Solo per SkyGen */}
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

                {/* prodotti */}
                <div className="max-w-4xl mx-auto">
                    {/* Header categoria */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-ice-glow drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">
                            {selectedMode === 'skygen'
                                ? (selectedCategory === 'ranks' ? 'Ranks' : 'Crates')
                                : 'Account'
                            }
                        </h2>
                    </div>

                    {/* Lista prodotti */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(selectedMode === 'skygen' ? skygenProducts[selectedCategory] : primeProducts).map((product, index) => (
                            <div
                                key={index}
                                className="group glass-card p-6 border-ice-glow/10 hover:border-ice-glow/50 transition-all duration-300 hover:scale-105 bg-white/5 text-center"
                            >
                                {/* Icona prodotto */}
                                <div className="w-24 h-24 mx-auto mb-4 bg-ice-glow/10 rounded-full flex items-center justify-center group-hover:bg-ice-glow/20 transition-colors overflow-hidden">
                                    {product.icon && product.icon !== null ? (
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
                                    <span className="text-4xl" style={{ display: product.icon && product.icon !== null ? 'none' : 'inline' }}>
                                        {product.emoji || (selectedMode === 'skygen' ? (selectedCategory === 'ranks' ? '👑' : '📦') : '🎁')}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-ice-glow transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-ice-light/50 text-sm mb-2">
                                    {product.description}
                                </p>
                                <p className="text-ice-glow font-black text-lg mb-4">
                                    {product.price}
                                </p>

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

                {/* Modal di conferma acquisto */}
                {showPurchaseModal && selectedProduct && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="glass-card p-8 border-ice-glow/30 bg-ice-dark max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,242,255,0.1)]">
                            <h2 className="text-2xl font-black text-white mb-6 text-center">Completa il pagamento</h2>
                            <div className="text-center mb-6">
                                <p className="text-ice-light mb-4">
                                    Scegli un metodo di pagamento sicuro.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg mb-4 border border-white/10">
                                    <p className="text-sm text-ice-light/60 mb-1">Stai acquistando:</p>
                                    <p className="text-xl font-bold text-ice-glow">{selectedProduct.name}</p>
                                    <p className="text-lg text-white mt-1">{selectedProduct.price}</p>
                                </div>
                            </div>

                            <div className="min-h-[150px] relative z-0">
                                <PayPalButtons
                                    style={{ layout: "vertical", shape: "rect" }}
                                    createOrder={async () => {
                                        try {
                                            const order = await apiClient.createPayPalOrder(selectedProduct.name);

                                            if (!order.id) {
                                                console.error("Invalid order response:", order);
                                                throw new Error("Risposta ordine non valida");
                                            }

                                            return order.id;
                                        } catch (err) {
                                            console.error("Create Order Error:", err);
                                            alert("Errore nella creazione dell'ordine: " + err.message);
                                            throw err;
                                        }
                                    }}
                                    onApprove={async (data, actions) => {
                                        try {
                                            const result = await apiClient.capturePayPalOrder(
                                                data.orderID,
                                                user?.mcUsername || 'Ospite',
                                                selectedProduct.name
                                            );

                                            if (result.success) {
                                                setShowPurchaseModal(false);
                                                setPurchasedItem(selectedProduct);
                                                setShowSuccessModal(true);
                                                setSelectedProduct(null);
                                            } else {
                                                alert("Pagamento non completato o errore nella registrazione.");
                                            }
                                        } catch (err) {
                                            console.error("Capture Order Error:", err);
                                            alert("Errore nella cattura del pagamento: " + err.message);
                                        }
                                    }}
                                    onError={(err) => {
                                        console.error("PayPal Error:", err);
                                        alert("Si è verificato un errore con PayPal. Riprova.");
                                    }}
                                />
                            </div>

                            <button
                                onClick={() => setShowPurchaseModal(false)}
                                className="w-full mt-4 py-3 px-4 rounded-lg font-bold bg-white/5 border border-white/20 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                            >
                                Annulla
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Note */}
                <div className="text-center mt-16">
                    <p className="text-ice-light/60 font-black tracking-[0.2em]">
                        Per qualsiasi problema contatta lo staff su Discord
                    </p>
                </div>

                {/* Login Modal */}
                {showLoginModal && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] backdrop-blur-sm">
                        <div className="glass-card p-8 border-ice-glow/30 bg-ice-dark max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,242,255,0.15)] animate-fade-in-up">
                            <h2 className="text-3xl font-black text-white mb-2 text-center">Accedi</h2>
                            <p className="text-center text-ice-light/70 mb-8">Inserisci il tuo nome utente Minecraft per continuare l'acquisto.</p>

                            <form onSubmit={handleLogin}>
                                <div className="mb-6">
                                    <label className="block text-ice-glow font-bold mb-2 uppercase tracking-wider text-xs">Username Minecraft</label>
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
                                        onClick={() => setShowLoginModal(false)}
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
                {showSuccessModal && purchasedItem && (
                    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[70] backdrop-blur-md">
                        <div className="glass-card p-10 border-ice-glow/50 bg-ice-dark max-w-lg w-full mx-4 text-center shadow-[0_0_100px_rgba(0,242,255,0.2)] animate-scale-in relative overflow-hidden">
                            {/* Confetti/Sparkle effect overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse pointer-events-none"></div>

                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full flex items-center justify-center border-2 border-green-400/50 shadow-[0_0_30px_rgba(74,222,128,0.3)]">
                                <span className="text-6xl">✅</span>
                            </div>

                            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Acquisto Completato!</h2>
                            <p className="text-xl text-ice-glow font-bold mb-8">Grazie per il supporto, {user?.mcUsername}!</p>

                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 backdrop-blur-sm">
                                <p className="text-ice-light/60 uppercase tracking-widest text-xs font-bold mb-2">Hai ricevuto</p>
                                <h3 className="text-3xl font-black text-white mb-1 drop-shadow-lg">{purchasedItem.name}</h3>
                                {purchasedItem.emoji && <span className="text-4xl block mt-2">{purchasedItem.emoji}</span>}
                            </div>

                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    navigate('/profilo');
                                }}
                                className="w-full py-4 px-8 rounded-xl font-black text-xl bg-gradient-to-r from-ice-glow to-blue-500 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all uppercase tracking-widest"
                            >
                                Fantastico!
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PayPalScriptProvider>
    );
};

export default Store;
