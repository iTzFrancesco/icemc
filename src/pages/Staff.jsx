import React from 'react';
import staffData from '../data/staff-list.json';

const CATEGORY_COLORS = {
    'Owner': 'text-red-500',
    'Manager': 'text-amber-500',
    'Sr. Admin': 'text-red-500',
    'Admin': 'text-red-500',
    'Sr. Developer': 'text-cyan-500',
    'Developer': 'text-cyan-500',
    'Jr. Developer': 'text-cyan-500',
    'Builder': 'text-yellow-500',
    'Sr. Mod': 'text-cyan-500',
    'Mod': 'text-cyan-500',
    'Jr. Mod': 'text-cyan-500',
    'Helper': 'text-green-500',
    'Jr. Helper': 'text-green-500',
};

const ORDER = [
    'Owner', 'Manager', 'Sr. Admin', 'Admin',
    'Sr. Developer', 'Developer', 'Jr. Developer',
    'Builder', 'Sr. Mod', 'Mod', 'Jr. Mod',
    'Helper', 'Jr. Helper'
];

const Staff = ({ serverName }) => {
    const staffCategories = ORDER
        .filter(title => staffData[title]?.length > 0)
        .map(title => ({
            title,
            color: CATEGORY_COLORS[title],
            members: staffData[title]
        }));

    return (
        <div className="text-center py-20 px-4">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-glow mb-8">
                Staff <span className="text-white">Ice</span><span className="text-ice-glow">MC</span>
            </h1>
            <p className="text-xl text-ice-light/70 max-w-2xl mx-auto mb-16">
                Il team che rende possibile l'esperienza su {serverName}. Gentili, professionali e sempre pronti ad aiutarti.
            </p>

            <div className="flex flex-col gap-20">
                {staffCategories.map((cat) => (
                    <div key={cat.title} className="w-full">
                        <h2 className={`text-4xl font-black uppercase tracking-[0.4em] mb-12 flex items-center justify-center gap-6 ${cat.color}`}>
                            <span className="h-px bg-white/10 flex-1 hidden md:block"></span>
                            <span className="drop-shadow-[0_0_15px_currentColor]">{cat.title}</span>
                            <span className="h-px bg-white/10 flex-1 hidden md:block"></span>
                        </h2>

                        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                            {cat.members.map((member) => (
                                <div key={member.displayName} className="flex flex-col items-center group min-w-[200px] glass-card p-8 border-ice-glow/10 hover:border-ice-glow/30 transition-all duration-500 hover:translate-y-[-5px]">
                                    <div className="w-20 h-20 rounded-full mb-6 border border-white/10 group-hover:border-ice-glow/50 transition-all flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                        <img 
                                            src={`https://mc-heads.net/avatar/${member.mcName}/50`}
                                            alt={member.mcName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-2xl font-black text-white italic tracking-tight mb-1">{member.displayName}</span>
                                    <span className="text-sm text-ice-light/60 italic mb-3">{member.mcName}</span>
                                    {member.description && (
                                        <p className="text-base text-ice-light/40 italic max-w-[180px] leading-relaxed">{member.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Staff;
