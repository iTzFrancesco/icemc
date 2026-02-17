import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth.js';
import { Link } from 'react-router-dom';

const Profile = ({ serverName }) => {
    const { user, isAuthenticated, logout, getUserPurchases } = useAuth();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPurchases = async () => {
            if (isAuthenticated) {
                const userPurchases = await getUserPurchases();
                setPurchases(userPurchases);
            }
            setLoading(false);
        };
        loadPurchases();
    }, [isAuthenticated, getUserPurchases]);

    const getProductEmoji = (name) => {
        if (!name) return '🎁';
        const lower = name.toLowerCase();
        if (lower.includes('key')) return '🗝️';
        if (lower.includes('rank') || lower === 'yule' || lower === 'crystal' || lower === 'frost' || lower === 'blizzard' || lower === 'borea' || lower === 'yukio') return '👑';
        if (lower.includes('join')) return '🔓';
        if (lower.includes('migrazione')) return '🔁';
        if (lower.includes('credito')) return '💳';
        return '🎁';
    };

    if (!isAuthenticated) {
        return (
            <div className="py-20 px-4">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-glow mb-4">
                        Profilo <span className="text-white">{serverName || 'Utente'}</span>
                    </h1>
                    <p className="text-xl text-ice-light/70 max-w-2xl mx-auto mb-8">
                        Devi effettuare l'accesso per visualizzare il tuo profilo
                    </p>
                    <Link
                        to="/store"
                        className="inline-block px-8 py-4 rounded-lg font-bold bg-ice-glow/20 border border-ice-glow/50 text-ice-glow hover:bg-ice-glow hover:text-ice-dark transition-all duration-300"
                    >
                        Vai allo Store per accedere →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20 px-4">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-glow mb-4">
                    Profilo <span className="text-ice-glow">{user.mcUsername}</span>
                </h1>
                <p className="text-xl text-ice-light/70 max-w-2xl mx-auto">
                    Visualizza i tuoi acquisti recenti
                </p>
            </div>

            {/* User Profile Bar */}
            <div className="mb-12 max-w-4xl mx-auto">
                <div className="relative bg-gradient-to-r from-ice-glow/20 to-cyan-500/20 rounded-xl overflow-hidden shadow-lg border border-ice-glow/30">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] bg-repeat"></div>
                    </div>

                    <div className="relative flex items-center justify-between px-8 py-6">
                        <div className="flex flex-col">
                            <span className="text-ice-glow font-bold text-2xl tracking-wide">
                                {user.mcUsername}
                            </span>
                            <span className="text-ice-light/60 text-sm mt-1">
                                Account creato il {user.createdAt ? new Date(user.createdAt).toLocaleDateString('it-IT') : 'Data non disponibile'}
                            </span>
                        </div>

                        <div className="relative">
                            <img
                                src={`https://mc-heads.net/body/${user.mcUsername}/100`}
                                alt={`${user.mcUsername} Skin`}
                                className="w-20 h-40 object-contain -mb-16 -mt-10 drop-shadow-[0_0_20px_rgba(0,242,255,0.5)]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sezione Acquisti */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-ice-glow mb-6 flex items-center gap-4">
                    <span className="h-px bg-white/10 flex-1"></span>
                    I tuoi acquisti ({purchases.length})
                    <span className="h-px bg-white/10 flex-1"></span>
                </h2>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-ice-light/60">Caricamento acquisti...</p>
                    </div>
                ) : purchases.length === 0 ? (
                    <div className="glass-card p-8 border-ice-glow/10 bg-white/5 text-center">
                        <p className="text-ice-light/60 mb-4">Non hai ancora effettuato acquisti</p>
                        <Link to="/store" className="text-ice-glow hover:underline font-bold">
                            Vai allo Store →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {purchases.map((purchase) => (
                            <div
                                key={purchase.id}
                                className="glass-card p-4 border-ice-glow/10 bg-white/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl">{getProductEmoji(purchase.product_name)}</span>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{purchase.product_name}</h3>
                                        <p className="text-ice-light/60 text-sm">
                                            {purchase.product_category && <span className="text-ice-glow font-bold mr-2 uppercase text-xs tracking-wider border border-ice-glow/30 px-1 rounded">{purchase.product_category}</span>}
                                            Acquistato il {new Date(purchase.purchase_date).toLocaleDateString('it-IT')}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-ice-glow font-black text-xl">€{purchase.product_price}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Logout button */}
            <div className="max-w-4xl mx-auto mt-12 text-center">
                <button
                    onClick={logout}
                    className="px-8 py-3 rounded-lg font-bold bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                    Disconnetti
                </button>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-16">
                <p className="text-ice-light/60 font-black tracking-[0.2em]">
                    Per qualsiasi problema contatta lo staff su Discord
                </p>
            </div>
        </div>
    );
};

export default Profile;