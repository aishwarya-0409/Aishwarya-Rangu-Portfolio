"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Simple SVG HUD Icons
const PlayIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
)

const VolumeIcon = () => (
   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M11 5 6 9 2 9 2 15 6 15 11 19 11 5"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
   </svg>
)

const MusicHUDIcon = () => (
   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
   </svg>
)

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Track Metadata
  const track = {
    title: "The Dark Knight - Main Theme",
    artist: "Hans Zimmer | Gotham Suite",
    src: "/dark_knight_theme.mp3"
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  // Auto-play trigger after interaction re-render
  useEffect(() => {
    if (hasInteracted && isPlaying && audioRef.current) {
      const audio = audioRef.current
      audio.volume = 1.0
      audio.muted = false
      
      // Force a re-load and then play to ensure the source is fresh
      audio.play().catch(err => console.error("Immediate Play Failed:", err))
    }
  }, [hasInteracted, isPlaying])

  const startMusic = () => {
    setHasInteracted(true)
    setIsPlaying(true)
    setIsExpanded(true)
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(console.error)
      setIsPlaying(true)
    }
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-10 left-10 z-50 font-mono">
      {/* Persisted Audio Tag (Always in DOM for ref stability) */}
      <audio ref={audioRef} src={track.src} loop />

      {!hasInteracted ? (
        /* WANNA LISTEN? PROMPT */
        <motion.button 
           initial={{ x: -50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           onClick={startMusic}
           className="relative group bg-[#020205] border border-cyan-500/30 px-8 py-4 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,212,255,0.1)] transition-all hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(0,212,255,0.2)]"
        >
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-cyan-800 flex items-center justify-center animate-pulse">
                 <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              </div>
              <div className="text-left">
                 <div className="text-[10px] text-cyan-800 tracking-[0.3em] font-black uppercase italic mb-1">Comm_Link_Active</div>
                 <div className="text-sm font-black text-white italic tracking-tighter uppercase whitespace-nowrap">Wanna Listen? <span className="text-cyan-500 ml-2">[ INITIALIZE ]</span></div>
              </div>
           </div>
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover:animate-scanline-fast"></div>
        </motion.button>
      ) : (
        /* ACTIVE HUD PLAYER */
        <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className={`relative group bg-[#020205] border border-cyan-900/30 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_10px_50px_rgba(0,0,0,1)] ${isExpanded ? "w-96" : "w-20 h-20"}`}
        >
           <div className="absolute inset-0 bg-cyan-950/5 animate-pulse"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>

           <div className="relative h-full flex items-center px-4">
              <button 
                 onClick={togglePlay}
                 className={`relative flex-shrink-0 w-12 h-12 rounded-full border-2 border-cyan-800/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${isPlaying ? "bg-cyan-600 text-white shadow-[0_0_30px_#00d4ff]" : "bg-black text-cyan-800"}`}
              >
                 <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 opacity-20 animate-spin"></div>
                 {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <AnimatePresence>
                 {isExpanded && (
                    <motion.div 
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -10 }}
                       className="ml-6 flex-1 overflow-hidden"
                    >
                       <div className="space-y-1">
                          <div className="text-[10px] text-cyan-500 font-bold tracking-[0.2em] uppercase truncate">Now_Playing</div>
                          <h4 className="text-sm font-black text-zinc-100 uppercase italic truncate tracking-tight">{track.title}</h4>
                          <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{track.artist}</p>
                       </div>
                       <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-[8px] text-cyan-950 font-bold uppercase tracking-widest">
                             <span>{formatTime(currentTime)}</span>
                             <span>{formatTime(duration)}</span>
                          </div>
                          <div className="h-[2px] bg-cyan-950/20 rounded-full overflow-hidden">
                             <motion.div 
                                className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]"
                                animate={{ width: `${progress}%` }}
                             />
                          </div>
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>

              <button 
                 onClick={() => setIsExpanded(!isExpanded)}
                 className="ml-4 p-2 text-cyan-900/50 hover:text-cyan-400 transition-colors"
              >
                 <MusicHUDIcon />
              </button>
           </div>
           
           <div className={`absolute top-0 bottom-0 left-0 w-[2px] bg-cyan-500/50 transition-opacity ${isPlaying ? "opacity-100 shadow-[0_0_15px_#0080ff]" : "opacity-0"}`}></div>
        </motion.div>
      )}

      {/* Mini Equalizer (Only when playing) */}
      <AnimatePresence>
         {isPlaying && (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               className="absolute -top-12 left-6 flex items-end gap-1 h-10 pointer-events-none"
            >
               {[...Array(8)].map((_, i) => (
                  <motion.div 
                     key={i}
                     animate={{ height: [4, 40, 8, 30, 4] }}
                     transition={{ duration: 0.4 + i * 0.1, repeat: Infinity }}
                     className="w-1.5 bg-cyan-500/60 rounded-full shadow-[0_0_15px_#0080ff]"
                  />
               ))}
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  )
}
