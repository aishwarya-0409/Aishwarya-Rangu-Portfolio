"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const archivePages = [
  {
    type: "cover",
    title: "The Archives",
    slug: "BIO_01",
    content: "I'm Aishwarya Shivakumar Rangu, passionate about writing to inspire and motivate. Through my words, I explore love, connection, and the strength within us to keep moving forward, seeking to capture the emotions and experiences that resonate deeply with us all. Writing is my way of reflecting on life's journey.",
    metadata: { date: "12-04", level: "OMEGA" }
  },
  {
    type: "work",
    title: "Golden Glow",
    slug: "VOL_01",
    poem: "Beauty of Love",
    content: "This work reflects my perspective on love as something pure, deep, and quietly powerful, captured through expressive and heartfelt words.",
    metadata: { date: "01-15", level: "EPSILON" }
  },
  {
    type: "work",
    title: "Waves and Words",
    slug: "VOL_02",
    poem: "Eternal Bonds",
    content: "Through this piece, I explored connections that go beyond time and distance, expressing emotions that remain constant and unbreakable.",
    metadata: { date: "02-14", level: "SIGMA" }
  },
  {
    type: "work",
    title: "Tender Tides",
    slug: "VOL_03",
    poem: "Whispers of Hope",
    content: "This piece conveys resilience, inner strength, and the quiet voice that keeps us moving forward even in difficult times.",
    metadata: { date: "03-24", level: "ALPHA" }
  },
  {
    type: "outro",
    title: "Final Note",
    slug: "END_01",
    content: "For me, writing is not just creativity - it is emotion translated into words, a space where feelings find their voice and stories find their soul.",
    metadata: { date: "PRESENT", level: "VOID" }
  }
]

export default function WritingsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex < archivePages.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      setCurrentIndex(0) // Loop back
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 p-8 relative overflow-hidden bg-black select-none">
      
      {/* 🌌 Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none opacity-40"></div>

      {/* 📂 ARCHIVE HEAD HUD */}
      <div className="absolute top-12 left-12 flex items-center space-x-4 opacity-30 group cursor-default">
         <div className="w-1 h-8 bg-cyan-500 rounded-full animate-pulse"></div>
         <div>
            <div className="font-mono text-[9px] font-black text-cyan-500 uppercase tracking-[0.4em]">Section.Archives</div>
            <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest font-medium">B_UNIT_0442</div>
         </div>
      </div>

      {/* 📚 MANUSCRIPT STACK */}
      <div className="relative w-full max-w-[450px] h-[550px] flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {archivePages.slice(currentIndex).map((page, idx) => {
            const isTop = idx === 0
            return (
              <motion.div
                key={page.slug}
                layout
                initial={{ scale: 0.9 + idx * 0.05, y: -idx * 8, opacity: 0 }}
                animate={{ 
                  scale: 1 - idx * 0.02, 
                  y: -idx * 15, 
                  opacity: 1 - idx * 0.3,
                  zIndex: archivePages.length - idx
                }}
                exit={{ x: 300, rotate: 15, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                className={`absolute w-full h-full rounded-[2rem] border border-cyan-500/10 backdrop-blur-3xl bg-white/5 shadow-2xl flex flex-col overflow-hidden
                  ${isTop ? "cursor-pointer pointer-events-auto" : "pointer-events-none"}
                `}
                onClick={isTop ? handleNext : undefined}
              >
                {/* Tactical Top Bar */}
                <div className="p-8 pb-4 flex justify-between items-start">
                   <div className="space-y-1">
                      <div className="font-mono text-[7px] text-cyan-500/40 uppercase tracking-widest">Entry_{page.slug}</div>
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Aish.Rangu</h4>
                   </div>
                   <div className="w-8 h-8 rounded-full border border-cyan-500/10 flex items-center justify-center font-mono text-[8px] text-cyan-500/60">
                      /{page.metadata.date}
                   </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 px-10 flex flex-col justify-center space-y-8 pb-16">
                   <div className="space-y-3">
                      {page.type === "work" && (
                         <div className="font-mono text-[10px] text-cyan-500 uppercase tracking-[0.6em] animate-pulse"># {page.poem}</div>
                      )}
                      <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-[0.9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        {page.title}
                      </h3>
                   </div>

                   <p className="text-base text-zinc-400 leading-relaxed font-medium italic border-l-2 border-cyan-500/20 pl-6 py-3 bg-cyan-950/5">
                     &ldquo;{page.content}&rdquo;
                   </p>
                </div>

                {/* Decrypt Line */}
                <div className="absolute bottom-8 left-10 right-10 flex items-center space-x-6">
                   <div className="h-0.5 flex-1 bg-cyan-900/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "20%" }}
                        animate={{ width: isTop ? "100%" : "20%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
                      />
                   </div>
                   <div className="font-mono text-[6px] text-cyan-900 uppercase tracking-widest">ENCRYPT: {page.metadata.level}</div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* 🧭 NAVIGATION HUD */}
      <div className="mt-12 flex items-center space-x-10 z-50">
        <button 
          onClick={handlePrev}
          className="group p-3 rounded-full border border-white/5 hover:border-cyan-500/30 transition-all active:scale-95 disabled:opacity-20"
          disabled={currentIndex === 0}
        >
          <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">←</span>
        </button>

        <div className="flex space-x-2">
          {archivePages.map((_, i) => (
             <div 
               key={i} 
               className={`h-1 rounded-full transition-all duration-500 ${currentIndex === i ? "w-8 bg-cyan-500 shadow-[0_0_10px_#00d4ff]" : "w-3 bg-zinc-800"}`}
             />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="group p-3 rounded-full border border-white/5 hover:border-cyan-500/30 transition-all active:scale-95"
        >
          <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">→</span>
        </button>
      </div>

      {/* Footer Instructions */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
          <div className="font-mono text-[9px] text-cyan-500/60 uppercase tracking-[0.8em] animate-pulse text-center">
             [ TAP CARD TO DECRYPT ARCHIVE ]
          </div>
      </div>
    </div>
  )
}
