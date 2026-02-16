import React from 'react';

// Per Owner e Manager: "NomeVisualizzato | NomeMCReale | Descrizione, NomeVisualizzato | NomeMCReale | Descrizione"
const Owners = "𝕮𝖗𝖎𝖕𝖙𝖆𝖙𝖔𝖍 | criptato_ | Owner & Dev, ʟᴜɴᴀʀ | Dream3245 | Owner & Dev, FrostByte | NotFrostByte17 | Owner & SS Manager  ";
const Managers = "𝖎𝕿𝖟𝕱𝖗𝖆𝖓𝖈𝖊𝖘𝖈𝖔 | iTzFrancesco7 | Manager & FrontEnd Dev";

// Per gli altri ruoli: "NomeVisualizzato | NomeMCReale, NomeVisualizzato | NomeMCReale "
const SrAdmins = "";
const Admins = "";
const SrDevelopers = "";
const Developers = "";
const JrDevelopers = "𝖕𝖔𝖗𝖈𝖔𝖘𝖕𝖎𝖓𝖔𝖊𝖝𝖊 | porcospinoexe";
const Builders = "tt";
const SrMods = "";
const Mods = "";
const JrMods = "antiidolo | xqpr";
const Helpers = "";
const JrHelpers = "OᐯEᖇᗪEᗩTᕼ__ | overdeath__, Exploitareh | exploitareh, Phantom, Papero_104 | Papero_104";

const Staff = ({ serverName }) => {
    const parseStaffWithDesc = (names, role, color) => {
        if (!names) return [];
        return names.split(',').map(entry => {
            const parts = entry.split('|').map(s => s.trim());
            return {
                displayName: parts[0] || "",
                mcName: parts[1] || parts[0] || "",
                description: parts[2] || "",
                role: role,
                color: color
            };
        });
    };

    const parseStaff = (names, role, color) => {
        if (!names) return [];
        return names.split(',').map(entry => {
            const parts = entry.split('|').map(s => s.trim());
            return {
                displayName: parts[0] || "",
                mcName: parts[1] || parts[0] || "",
                description: "",
                role: role,
                color: color
            };
        });
    };

    const staffCategories = [
        { title: 'Owner', color: 'text-red-500', members: parseStaffWithDesc(Owners, 'Owner', 'text-red-500') },
        { title: 'Manager', color: 'text-amber-500', members: parseStaffWithDesc(Managers, 'Manager', 'text-amber-500') },
        { title: 'Sr. Admin', color: 'text-red-500', members: parseStaff(SrAdmins, 'Sr. Admin', 'text-red-500') },
        { title: 'Admin', color: 'text-red-500', members: parseStaff(Admins, 'Admin', 'text-red-500') },
        { title: 'Sr. Developer', color: 'text-cyan-500', members: parseStaff(SrDevelopers, 'Sr. Developer', 'text-cyan-500') },
        { title: 'Developer', color: 'text-cyan-500', members: parseStaff(Developers, 'Developer', 'text-cyan-500') },
        { title: 'Jr. Developer', color: 'text-cyan-500', members: parseStaff(JrDevelopers, 'Jr. Developer', 'text-cyan-500') },
        { title: 'Builder', color: 'text-yellow-500', members: parseStaff(Builders, 'Builder', 'text-yellow-500') },
        { title: 'Sr. Mod', color: 'text-cyan-500', members: parseStaff(SrMods, 'Sr. Mod', 'text-cyan-500') },
        { title: 'Mod', color: 'text-cyan-500', members: parseStaff(Mods, 'Mod', 'text-cyan-500') },
        { title: 'Jr. Mod', color: 'text-cyan-500', members: parseStaff(JrMods, 'Jr. Mod', 'text-cyan-500') },
        { title: 'Helper', color: 'text-green-500', members: parseStaff(Helpers, 'Helper', 'text-green-500') },
        { title: 'Jr. Helper', color: 'text-green-500', members: parseStaff(JrHelpers, 'Jr. Helper', 'text-green-500') },
    ].filter(cat => cat.members.length > 0);

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
