import React, { useState, useEffect } from 'react'
import logo from './assets/logo-server.png'
import mascot from './assets/mascott-discord.png'
import skyGenIcon from './assets/logo-infinityskygen.png'
import smpIcon from './assets/logo-lifestealsmp.png'
import ffaIcon from './assets/logo-server.png'
import mcLogo from './assets/logo-minecraft.svg'
import ScrollToTop from "./components/ScrollToTop";


function App() {
  const [copied, setCopied] = useState(false)
  const [mcPlayers, setMcPlayers] = useState(0)
  const [discordOnline, setDiscordOnline] = useState(0)
  const serverIP = "play.icemc.it"
  const serverName = "IceMC"
  const discordInvite = "https://discord.gg/cU6x8t49B3"
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const mcResponse = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIP}`)
        const mcData = await mcResponse.json()
        if (mcData.online) {
          setMcPlayers(mcData.players.online)
        } else {
          setMcPlayers(0)
        }
      } catch (err) {
        console.error("Error fetching stats:", err)
      }

      try {
        const discordResponse = await fetch('https://discord.com/api/v9/invites/cU6x8t49B3?with_counts=true')
        const discordData = await discordResponse.json()
        if (discordData.approximate_presence_count) setDiscordOnline(discordData.approximate_presence_count)
      } catch (err) {
        console.error("Error fetching stats:", err)
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
         <ScrollToTop />
      {/* Header/Logo */}
      <div className="mb-12 animate-pulse-slow">
        <img src={logo} alt={`${serverName} Logo`} className="w-64 md:w-80 drop-shadow-[0_0_30px_rgba(0,242,255,0.4)]" />
      </div>

      {/* Header / pages */}
      <div className="text-center mb-16 space-y-6 w-full">
        <h1 className="text-4xl md:text-6xl font-black text-white  tracking-tighter text-glow">
          Benvenuto su Ice<span className="text-ice-glow">MC</span>
        </h1>
        <p className="text-lg md:text-xl text-ice-light/80 max-w-2xl mx-auto">
          L'esperienza definitiva di Minecraft a tema ghiaccio. Unisciti alla nostra community gelida ma accogliente!
        </p>

        <div className="flex justify-center pt-4">

          <div className="glass-card !bg-ice-dark/40 backdrop-blur-xl border-ice-glow/30 p-1 md:p-1.5 rounded-2xl flex flex-col md:flex-row items-stretch gap-2 shadow-[0_0_40px_rgba(0,184,255,0.1)]">

            {/* Server IP */}
            <div
              className="flex items-center justify-center gap-4 bg-ice-dark/60 hover:bg-ice-dark/80 transition-all duration-300 px-6 py-3 rounded-xl cursor-pointer border border-dashed border-white/10 group"
              onClick={copyToClipboard}
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-ice-light/40 uppercase font-black tracking-widest mb-1 text-left">Server IP</span>
                <span className="text-white font-mono text-xl">{serverIP}</span>
              </div>
              <div className="ml-2">
                {copied ? (
                  <span className="text-green-400 font-bold animate-bounce text-sm">COPIATO!</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ice-glow/60 group-hover:text-ice-glow group-hover:rotate-12 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </div>
            </div>

            {/* Minecraft Stats */}
            <div className="flex items-center justify-center gap-4 bg-green-500/5 px-6 py-3 rounded-xl border border-green-500/10 min-w-[160px]">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <img src={mcLogo} alt="Minecraft" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-green-400/60 uppercase font-black tracking-widest mb-1">Minecraft</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-black text-2xl">{mcPlayers}</span>
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
              </div>
            </div>

            {/* Discord Stats */}
            <div className="flex items-center justify-center gap-4 bg-[#5865F2]/5 px-6 py-3 rounded-xl border border-[#5865F2]/10 min-w-[160px]">
              <div className="p-2 bg-[#5865F2]/10 rounded-lg">
                <svg className="w-6 h-6 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 11.756 11.756 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.579.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                </svg>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-[#5865F2]/60 uppercase font-black tracking-widest mb-1">Community</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-black text-2xl">{discordOnline}</span>
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#5865F2] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5865F2]"></span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modalità */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-32">
        <div className="mode-card group">
          <div className="w-24 h-24 bg-white/5 backdrop-blur-md border border-ice-glow/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-ice-glow/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <img src={skyGenIcon} alt="SkyGen Icon" className="w-20 h-20 object-contain drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">SkyGen</h3>
          <p className="text-ice-light/60 text-sm leading-relaxed">Non la solita SkyBlock! Crea la tua isola, potenzia i generatori e scala la classifica economica. Un gameplay veloce e addicting!</p>
        </div>

        <div className="mode-card group">
          <div className="w-24 h-24 bg-white/5 backdrop-blur-md border border-ice-glow/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-ice-glow/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <img src={smpIcon} alt="SMP Icon" className="w-20 h-20 object-contain drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">SMP</h3>
          <p className="text-ice-light/60 text-sm leading-relaxed">L'esperienza di sopravvivenza definitiva. Costruisci la tua base, fonda città con i tuoi amici e commercia in un'economia bilanciata.</p>
        </div>

        <div className="mode-card group">
          <div className="w-24 h-24 bg-white/5 backdrop-blur-md border border-ice-glow/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-ice-glow/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <img src={ffaIcon} alt="FFA Icon" className="w-20 h-20 object-contain drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">FFA</h3>
          <p className="text-ice-light/60 text-sm leading-relaxed">Vuoi riscaldarti un po'? Scendi nell'arena e dimostra la tua skill nel PvP. Niente squadre, solo tu contro tutti.</p>
        </div>
      </div>

      {/* Discord  */}
      <div className="w-full relative group mb-32">
        <div className="wavy-container border border-ice-glow/20 overflow-hidden transition-all duration-500 rounded-[2.5rem] shadow-[0_0_60px_rgba(0,184,255,0.1)] bg-ice-dark/40 backdrop-blur-md">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 px-8 md:px-20 py-16">

            <div className="relative w-48 h-48 md:w-64 md:h-64 hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-ice-glow/20 blur-[50px] rounded-full animate-pulse-slow"></div>
              <img
                src={mascot}
                alt="Discord Mascot"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,184,255,0.4)]"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="bg-[#5865F2] rounded-xl p-2.5 shadow-[0_0_20px_rgba(88,101,242,0.4)]">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 11.756 11.756 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.579.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white italic">Community</h2>
              </div>
              <p className="text-white/70 text-lg leading-relaxed max-w-lg">
                Unisciti a <span className="text-ice-glow font-bold">{discordOnline}</span> giocatori su Discord. Ricevi supporto, partecipa a eventi e ottieni supporto dal nostro staff!
              </p>
              <div className="pt-2">
                <a href={discordInvite} target="_blank" rel="noopener noreferrer" className="discord-button px-10 py-4 text-xl shadow-[0_0_30px_rgba(88,101,242,0.3)]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 11.756 11.756 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.579.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                  </svg>
                  Unisciti al Discord
                </a>
              </div>
            </div>
          </div>

          <div className="wavy-overlay top-[-5px] rotate-180 opacity-30 scale-y-110"></div>
          <div className="wavy-overlay bottom-[-5px] opacity-30 scale-y-110"></div>
        </div>
      </div>
    </>
  )
}

export default App
