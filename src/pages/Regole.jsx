import React, { useState } from 'react';

const Regole = () => {
    const [activeTab, setActiveTab] = useState('discord');

    const discordSections = [
        {
            icon: '🤝',
            title: 'Rispetto e Comportamento',
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
            borderColor: 'border-blue-400/20',
            rules: [
                'Rispetto Generale: Devi essere sempre rispettoso nei confronti dello Staff e degli altri giocatori. Non mancare di rispetto al Server; per reclami o raccomandazioni, utilizza esclusivamente i canali ufficiali.',
                'Insulti e Molestie: È vietato insultare, sminuire, molestare o maltrattare gli altri utenti, sia in chat testuale che vocale.',
                'No Discriminazioni: Non sono ammessi commenti, battute, immagini o avatar di carattere razzista, omofobo o estremista. Termini riconducibili all\'odio discriminatorio sono severamente puniti.',
                'Bestemmie e Volgarità: È vietato bestemmiare o utilizzare un linguaggio eccessivamente scurrile nelle chat pubbliche e vocali.'
            ]
        },
        {
            icon: '🔒',
            title: 'Sicurezza e Integrità',
            color: 'text-red-400',
            bgColor: 'bg-red-400/10',
            borderColor: 'border-red-400/20',
            rules: [
                'Doxxing e Privacy: È vietato divulgare dati personali o informazioni sensibili di altri (Dox). Non diffondere foto o video di terzi senza il loro consenso.',
                'Minacce e DDoS: È severamente proibito minacciare l\'utenza con attacchi informatici o effettuare attacchi DDoS/Dos al Network.',
                'Impersonificazione: Non fingere di essere qualcuno che non sei (Staff, YouTuber o altri utenti).'
            ]
        },
        {
            icon: '📸',
            title: 'Contenuti e Media',
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10',
            borderColor: 'border-purple-400/20',
            rules: [
                'Contenuti Inappropriati (NSFW): È vietata la condivisione di materiale esplicito, pornografico, pedopornografico, violento o gore.',
                'Estetica del Profilo: Non utilizzare nomi utente o avatar inappropriati o che violino le regole sopra citate.',
                'Droghe e Illegalità: Non promuovere sostanze illecite, gioco d\'azzardo o armi.'
            ]
        },
        {
            icon: '📢',
            title: 'Spam e Pubblicità',
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-400/10',
            borderColor: 'border-yellow-400/20',
            rules: [
                'Advertising: Non è consentito passare IP o link di invito di altri server, Discord o social network (neanche nei messaggi privati).',
                'Spam e Flood: Non intasare la chat con messaggi ripetitivi, eccessivo caps lock, testi troppo lunghi o troppe emoji.',
                'Richieste e Regali: Non elemosinare Discord Nitro, ruoli o altri prodotti digitali. Non pingare inutilmente lo Staff o i Content Creator.'
            ]
        },
        {
            icon: '🎙️',
            title: 'Regole Vocali e Streaming',
            color: 'text-green-400',
            bgColor: 'bg-green-400/10',
            borderColor: 'border-green-400/20',
            rules: [
                'Software Vocali: È proibito l\'uso di Voice Changer (es. Clownfish), Soundboard moleste o software che disturbano l\'utenza.',
                'Disturbo Vocale: È vietato uscire e rientrare continuamente dalle stanze vocali per infastidire.',
                'Streaming: È vietato trasmettere gameplay di server concorrenti (con modalità simili alle nostre) nei canali vocali del network.'
            ]
        },
        {
            icon: '⚖️',
            title: 'Sanzioni e Segnalazioni',
            color: 'text-orange-400',
            bgColor: 'bg-orange-400/10',
            borderColor: 'border-orange-400/20',
            rules: [
                'Elusioni: È vietato utilizzare account secondari per eludere sanzioni o restrizioni imposte sull\'account originale.',
                'Segnalazioni: Per segnalare abusi o violazioni (es. flame pesante), crea un ticket su ⁠🎫〡ticket',
                'Ultima Parola: Lo staff si riserva il diritto di allontanare chiunque sia ritenuto dannoso per la community. L\'ultima parola spetta ai membri dello Staff. In caso di controversie gravi con un membro dello Staff, apri un ticket Headstaff in caso il problema sia MOLTO grave, contatta privatamente @Owner • FrostByte, @Owner • criptato_ o @Owner • Dream3245.'
            ]
        }
    ];

    const minecraftSections = [
        {
            icon: '⚔️',
            title: 'Fair Play e Combattimento',
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            rules: [
                'TP-Kill: È severamente vietato utilizzare la funzione di teletrasporto (/tpa) per tendere imboscate o eliminare giocatori.',
                'Truffe e Scam: È proibito manipolare oggetti (rinominandoli o alterandoli) allo scopo di ingannare gli altri giocatori in fase di scambio.',
                'Client Modificati (Cheat): L\'utilizzo di hack, macro, ghost client o qualsiasi software che fornisca vantaggi sleali (es. X-Ray, Killaura, Fly) è punito con il ban immediato.'
            ]
        },
        {
            icon: '🏗️',
            title: 'Rispetto del Mondo e delle Costruzioni',
            color: 'text-amber-500',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20',
            rules: [
                'Griefing: Sono proibiti gli atti di distruzione parziale o totale delle strutture altrui, anche se non perfettamente protette. Rispetta il lavoro degli altri.',
                'Rispetto delle Protezioni: È vietato disturbare, molestare o interrompere le attività degli altri giocatori all\'interno delle loro aree private (Claims).',
                'Tossicità Ambientale: È vietato promuovere un ambiente tossico tramite il gioco, come ad esempio circondare di ossidiana o lava i confini delle aree riservate ad altre persone.'
            ]
        },
        {
            icon: '🎨',
            title: 'Etica e Contenuti',
            color: 'text-pink-400',
            bgColor: 'bg-pink-400/10',
            borderColor: 'border-pink-400/20',
            rules: [
                'Costruzioni Inappropriate: È severamente vietato creare costruzioni, mappe o pixel-art con contenuti NSFW, simboli d\'odio, o riferimenti non adatti a tutte le età.',
                'Linguaggio In-Game: Le regole sul rispetto, razzismo e bestemmie applicate su Discord sono valide anche nella chat di gioco.'
            ]
        },
        {
            icon: '⚙️',
            title: 'Stabilità Tecnica ed Economica',
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-400/10',
            borderColor: 'border-cyan-400/20',
            rules: [
                'Redstone Lag Macchine: È vietato l\'uso improprio di circuiti Redstone che generano un carico eccessivo (lag) sul server. Lo Staff si riserva il diritto di rimuovere macchinari che compromettono le prestazioni.',
                'Bug Abusing: Qualsiasi bug o glitch trovato deve essere segnalato tempestivamente allo Staff. Sfruttare errori del gioco per duplicare oggetti o ottenere vantaggi è una violazione grave.',
                'Farm e Mob: Non è consentito creare farm che superino il limite di Mob consentito, causando rallentamenti ai chunk circostanti.'
            ]
        },
        {
            icon: '🔍',
            title: 'Controlli Cheat',
            color: 'text-indigo-400',
            bgColor: 'bg-indigo-400/10',
            borderColor: 'border-indigo-400/20',
            rules: [
                'Procedura: L\'utente sospetto verrà portato in stato di "Controllo Hack". In questa fase, è obbligatorio rispondere allo Staff e fornire il codice AnyDesk per consentire l\'ispezione.',
                'Autorizzazioni Staff: Durante il controllo, lo Staff è autorizzato a scansionare il PC alla ricerca di Hack client e a scaricare tool verificati specifici per la ricerca.',
                'Tutela della Privacy: Lo Staff non ispezionerà mai chat private o file personali non inerenti al gioco. L\'eventuale apertura di Discord è finalizzata esclusivamente alla disconnessione dai canali vocali per evitare interferenze durante il controllo.',
                'Rifiuto/Ammissione: Il rifiuto del controllo, lo slog dal server durante la procedura o il tentativo di nascondere file comporterà il ban immediato. L\'ammissione prima dell\'inizio del controllo può comportare una riduzione del ban.'
            ]
        },
        {
            icon: '📋',
            title: 'Segnalazioni e Reclami',
            color: 'text-teal-400',
            bgColor: 'bg-teal-400/10',
            borderColor: 'border-teal-400/20',
            rules: [
                'Se subisci un furto o un atto di griefing, apri un Ticket fornendo le coordinate (X, Y, Z) del luogo interessato.',
                'Le prove video sono obbligatorie per segnalare Cheater o violazioni durante il combattimento.'
            ]
        }
    ];

    const banRules = [
        { rule: 'TPKILL', duration: '2 Giorni' },
        { rule: 'BUG ABBUSING', duration: 'Permanente' },
        { rule: 'UTILIZZO DI LAG MACCHINE', duration: 'Permanente' },
        { rule: 'TRUFFA', duration: '5 giorni' },
        { rule: 'CHEATING', duration: '30 giorni' },
        { rule: 'AMMISSIONE CHEATING', duration: '15 giorni' },
        { rule: 'BLATANT', duration: '30 giorni' },
        { rule: 'SLOG SOTTO CONTROLLO HACK', duration: '30 giorni' },
        { rule: 'EVASIONE BAN', duration: 'Permanente' },
        { rule: 'IMPERSONIFICAZIONE STAFF', duration: '4 giorni' },
        { rule: 'VENDITA DI ITEM CON SOLDI REALI', duration: '14 giorni' },
        { rule: 'UTILIZZO PROXY/VPN', duration: '3 giorni' },
        { rule: 'SKIN INAPPROPRIATA', duration: 'Avviso, in caso viene ignorato Ban 7 giorni' },
        { rule: 'NICK INAPPROPRIATO', duration: 'Perma ban' },
        { rule: 'CREAZIONE NSFW', duration: '5 giorni' },
        { rule: 'EVASIONE MUTE', duration: '3 giorni' },
        { rule: 'MINACCIE DI DDOS', duration: 'Blacklist' },
        { rule: 'ATTACCO DDOS AL NETWORK', duration: 'Blacklist' },
        { rule: 'MINACCIE DI DOX', duration: 'Blacklist' },
        { rule: 'DOX', duration: 'Blacklist' },
        { rule: 'AFK FARMING', duration: '9 giorni' },
        { rule: 'XRAY/CHEST-ESP', duration: '14 giorni' },
        { rule: 'GRIEFING', duration: 'A discrezione dello staff, può variare dai 7 ai 30 giorni' },
        { rule: 'BUILD INAPPROPRIATA', duration: '1 giorno' },
        { rule: 'NOME LAND INAPPROPRIATA', duration: '2 giorni' },
        { rule: 'LAND ABBUSING', duration: '10 giorni' },
        { rule: 'TRUFFA CON SOLDI REALI', duration: 'Perma ban' }
    ];

    const muteRules = [
        { rule: 'LINGUAGGIO SCURRILE', duration: '1 ora' },
        { rule: 'LINK ESTERNI AL SERVER', duration: '4 ore' },
        { rule: 'INSULTI ALLO STAFF', duration: '8 ore' },
        { rule: 'INSULTI AL SERVER', duration: '10 Ore' },
        { rule: 'TOSSICITÀ IN CHAT', duration: '3 Ore' },
        { rule: 'AUGURIO DI MORTE', duration: '4 giorni' },
        { rule: 'INSULTI AD ALTRE RELIGIONI', duration: '7 Ore' },
        { rule: 'DISCRIMINAZIONI', duration: '4 giorni' },
        { rule: 'SPAM', duration: '5 ore' },
        { rule: 'FLOOD', duration: '5 Ore' },
        { rule: 'FLAME', duration: '6 Ore' }
    ];

    const discordBanRules = [
        { rule: 'BUG ABUSING', duration: 'Permanente' },
        { rule: 'EVASIONE BAN', duration: 'Permanente' },
        { rule: 'IMPERSONIFICAZIONE STAFF', duration: '14 giorni' },
        { rule: 'NSFW', duration: '7 giorni' },
        { rule: 'EVASIONE MUTE', duration: '14 giorni' },
        { rule: 'MINACCIE DI DDOS', duration: 'Blacklist' },
        { rule: 'ATTACCO DDOS AL NETWORK', duration: 'Blacklist' },
        { rule: 'MINACCIE DI DOX', duration: 'Blacklist' },
        { rule: 'DOX', duration: 'Blacklist' },
        { rule: 'RAID', duration: 'Blacklist' },
        { rule: 'NUKE', duration: 'Blacklist' },
        { rule: 'IMMAGINE PROFILO INAPPROPRIATA', duration: 'Avviso, in caso viene ignorato Ban 6 giorni' },
        { rule: 'NOME UTENTE INAPPROPRIATO', duration: 'Avviso, in caso viene ignorato Ban 3 giorni' }
    ];

    const discordMuteRules = [
        { rule: 'LINGUAGGIO SCURRILE', duration: '1 ora' },
        { rule: 'LINK ESTERNI AL SERVER', duration: '4 ore' },
        { rule: 'INSULTI ALLO STAFF', duration: '8 ore' },
        { rule: 'INSULTI AL SERVER', duration: '10 Ore' },
        { rule: 'TOSSICITÀ IN CHAT', duration: '3 Ore' },
        { rule: 'AUGURIO DI MORTE', duration: '4 giorni' },
        { rule: 'INSULTI AD ALTRE RELIGIONI', duration: '7 Ore' },
        { rule: 'DISCRIMINAZIONI', duration: '4 giorni' },
        { rule: 'SPAM', duration: '5 ore' },
        { rule: 'FLOOD', duration: '5 Ore' },
        { rule: 'FLAME', duration: '6 Ore' }
    ];

    const activeSections = activeTab === 'discord' ? discordSections : minecraftSections;

    return (
        <div className="text-center py-20 px-4">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-glow mb-6">
                    Regolamento <span className="text-white">Ice</span><span className="text-ice-glow">MC</span>
                </h1>
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-ice-glow to-transparent rounded-full"></div>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-ice-glow to-transparent rounded-full"></div>
                </div>
            </div>

            {/* Tab Buttons */}
            <div className="flex justify-center gap-4 mb-12">
                <button
                    onClick={() => setActiveTab('discord')}
                    className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 ${
                        activeTab === 'discord'
                            ? 'bg-[#5865F2] text-white shadow-[0_0_30px_rgba(88,101,242,0.5)] scale-105'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 11.756 11.756 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.579.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                    </svg>
                    Discord
                </button>
                <button
                    onClick={() => setActiveTab('minecraft')}
                    className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 ${
                        activeTab === 'minecraft'
                            ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.5)] scale-105'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm2 4v12h12V6H6zm2 2h2v2H8V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8z"/>
                    </svg>
                    Minecraft
                </button>
            </div>

            {/* Intro */}
            <div className="max-w-4xl mx-auto mb-16">
                <div className="glass-card p-8 border-ice-glow/30 bg-gradient-to-br from-ice-glow/5 to-transparent">
                    <p className="text-ice-light/80 text-lg leading-relaxed">
                        {activeTab === 'discord' 
                            ? "Tutti i membri sono invitati a leggere attentamente queste linee guida per evitare sanzioni. Il regolamento è soggetto ad aggiornamenti: la mancata visione non è una scusa per contestare le sanzioni. L'ignoranza delle regole non giustifica alcuna infrazione."
                            : "L'accesso al server comporta l'accettazione implicita del presente regolamento. Ogni azione all'interno del gioco è tracciata dai nostri log, la violazione del regolamento comporterà sanzioni che variano dal richiamo (warn) al ban permanente dal Network."
                        }
                    </p>
                </div>
            </div>

            {/* Rule Sections */}
            <div className="max-w-5xl mx-auto space-y-8">
                {activeSections.map((section, index) => (
                    <div 
                        key={index} 
                        className={`glass-card p-8 text-left border-2 ${section.borderColor} hover:border-ice-glow/50 transition-all duration-500 group`}
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Icon */}
                            <div className={`${section.bgColor} ${section.color} w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,242,255,0.1)] text-3xl`}>
                                {section.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                                <h3 className={`text-2xl md:text-3xl font-bold ${section.color} mb-4 flex items-center gap-3`}>
                                    {section.title}
                                    <span className="text-lg opacity-50">»</span>
                                </h3>
                                <ul className="space-y-3">
                                    {section.rules.map((rule, ruleIndex) => (
                                        <li key={ruleIndex} className="flex items-start gap-3 text-ice-light/70 leading-relaxed">
                                            <span className={`${section.color} mt-1.5 text-xs`}>●</span>
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sanctions Tables */}
            {activeTab === 'discord' && (
                <div className="max-w-5xl mx-auto mt-16 space-y-8">
                    {/* Ban Table */}
                    <div className="glass-card p-8 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent border-l-4 border-l-red-500">
                        <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
                            🔨 BAN
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {discordBanRules.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-white font-bold">{item.rule}</span>
                                    <span className="text-red-400 text-sm font-bold">{item.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mute Table */}
                    <div className="glass-card p-8 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent border-l-4 border-l-yellow-500">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
                            🔇 MUTE
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {discordMuteRules.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-white font-bold">{item.rule}</span>
                                    <span className="text-yellow-400 text-sm font-bold">{item.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="glass-card p-8 border-[#5865F2]/20 bg-gradient-to-br from-[#5865F2]/5 to-transparent border-l-4 border-l-[#5865F2]">
                        <h3 className="text-xl font-bold text-[#5865F2] mb-4 flex items-center gap-3">
                            📝 NOTA
                        </h3>
                        <ul className="space-y-2 text-ice-light/70 text-left">
                            <li>• Queste regole/sanzioni sono soggette a modifiche in qualsiasi momento, se necessario.</li>
                            <li>• Ignorare le regole o non conoscerle non ti renderà immune da esse.</li>
                            <li>• Entrando nel discord e interagendo con la community accetti automaticamente le regole.</li>
                            <li>• La non lettura di esse non è una scusa valida per non ricevere la sanzione se necessaria.</li>
                            <li>• In caso stai commettendo una cosa grave che non è scritta nel regolamento è a discrezione dello staff decidere se sanzionarti o meno.</li>
                            <li>• In caso di rilevato abuso di questa nota lo staff sarà sanzionato e la sanzione dell'utente verrà rimossa.</li>
                        </ul>
                    </div>
                </div>
            )}

            {activeTab === 'minecraft' && (
                <div className="max-w-5xl mx-auto mt-16 space-y-8">
                    {/* Ban Table */}
                    <div className="glass-card p-8 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent border-l-4 border-l-red-500">
                        <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
                            🔨 BAN
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {banRules.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-white font-bold">{item.rule}</span>
                                    <span className="text-red-400 text-sm font-bold">{item.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mute Table */}
                    <div className="glass-card p-8 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent border-l-4 border-l-yellow-500">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
                            🔇 MUTE
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {muteRules.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-white font-bold">{item.rule}</span>
                                    <span className="text-yellow-400 text-sm font-bold">{item.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div className="glass-card p-8 border-ice-glow/20 bg-gradient-to-br from-blue-500/5 to-transparent border-l-4 border-l-blue-400">
                        <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                            📝 NOTA
                        </h3>
                        <ul className="space-y-2 text-ice-light/70 text-left">
                            <li>• Queste regole/sanzioni sono soggette a modifiche in qualsiasi momento, se necessario.</li>
                            <li>• Ignorare le regole o non conoscerle non ti renderà immune da esse.</li>
                            <li>• Entrando nel server minecraft accetti automaticamente le regole, la non lettura non è una scusa valida per non ricevere la sanzione se necessaria.</li>
                            <li>• In caso stai commettendo una cosa grave che non è scritta nel regolamento è a discrezione dello staff decidere se sanzionarti o meno.</li>
                            <li>• Lo Staff non è responsabile per la perdita di oggetti dovuta a morti accidentali o truffe in trade non protetti.</li>
                            <li>• In caso per colpa di crash improvvisi del server perdete il Loot aprite ticket per richiedere un Roll.</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Footer Note */}
            <div className="max-w-4xl mx-auto mt-16">
                <div className="glass-card p-8 border-ice-glow/20 bg-gradient-to-br from-red-500/5 to-transparent border-l-4 border-l-red-400">
                    <div className="flex items-start gap-4">
                        <div className="text-red-400 text-3xl"></div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2">Nota Importante</h4>
                            <p className="text-ice-light/60 leading-relaxed">
                                Lo staff si riserva il diritto di allontanare chiunque sia ritenuto dannoso per la community. 
                                L'ultima parola spetta ai membri dello Staff. In caso di controversie gravi con un membro dello Staff, 
                                apri un ticket Headstaff o contatta privatamente se il problema è MOLTO grave.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom decoration */}
            <div className="flex items-center justify-center gap-4 mt-16">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-ice-glow/50 to-transparent rounded-full"></div>
                <span className="text-ice-glow/50 text-2xl"></span>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-ice-glow/50 to-transparent rounded-full"></div>
            </div>
        </div>
    );
};

export default Regole;
