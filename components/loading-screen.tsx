"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {

  const [glitchStyles, setGlitchStyles] = useState<React.CSSProperties[]>([]);
  const [phase, setPhase] = useState<"hacking" | "chess" | "complete">("hacking")
  const [hackingProgress, setHackingProgress] = useState(0)
  const [hackingText, setHackingText] = useState("")
  const [chessProgress, setChessProgress] = useState(0)
  const [showPromotion, setShowPromotion] = useState(false)
  const [currentHackLine, setCurrentHackLine] = useState(0)
  const [pawnPosition, setPawnPosition] = useState(48) // Starting at row 6 (48-55)

  const hackingSequence = [
    "IGNITING THE BAT-SIGNAL...",
    "CONNECTING TO THE BATCAVE...",
    "BYPASSING CITY FIREWALL...",
    "ACCESSING CASE FILES...",
    "DECRYPTING SECURE CHANNEL...",
    "LOADING SKILL DOSSIER...",
    "COMPILING MISSION LOGS...",
    "ESTABLISHING GOTHAM LINK...",
    "AUTHENTICATION CONFIRMED...",
    "WELCOME, AISHWARYA SHIVAKUMAR RANGU...",
  ]

  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    // Phase 1: Hacking Animation (3 seconds)
    if (phase === "hacking") {
      const hackingTimer = setInterval(() => {
        setHackingProgress((prev) => {
          const newProgress = prev + 1.5

          // Update hacking text line
          if (newProgress % 15 === 0 && currentHackLine < hackingSequence.length - 1) {
            setCurrentHackLine((prev) => prev + 1)
          }

          if (newProgress >= 100) {
            clearInterval(hackingTimer)
            setTimeout(() => setPhase("chess"), 500)
            return 100
          }
          return newProgress
        })
      }, 30)

      // Matrix rain effect for hacking text
      const textTimer = setInterval(() => {
        if (currentHackLine < hackingSequence.length) {
          const originalText = hackingSequence[currentHackLine]
          let scrambledText = ""

          for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
              scrambledText += matrixChars[Math.floor(Math.random() * matrixChars.length)]
            } else {
              scrambledText += originalText[i]
            }
          }

          setHackingText(scrambledText)

          // Settle to original text after scrambling
          setTimeout(() => {
            setHackingText(originalText)
          }, 100)
        }
      }, 200)

      return () => {
        clearInterval(hackingTimer)
        clearInterval(textTimer)
      }
    }

    // Phase 2: Chess Animation (4 seconds) - Extended for full animation
    if (phase === "chess") {
      const chessTimer = setInterval(() => {
        setChessProgress((prev) => {
          const newProgress = prev + 1 // Slower progression for full animation

          // Move pawn every 12.5% progress (8 moves total)
          const newPawnPosition = 48 - Math.floor(newProgress / 12.5) * 8
          if (newPawnPosition !== pawnPosition && newPawnPosition >= 0) {
            setPawnPosition(newPawnPosition)
          }

          // Show promotion at 87.5% (when pawn reaches the end)
          if (newProgress >= 87.5 && !showPromotion) {
            setShowPromotion(true)
          }

          if (newProgress >= 100) {
            clearInterval(chessTimer)
            setTimeout(() => {
              setPhase("complete")
              setTimeout(onComplete, 1500)
            }, 2500) // Extended time to see promotion
            return 100
          }
          return newProgress
        })
      }, 60) // Slower interval for smoother animation

      return () => clearInterval(chessTimer)
    }
    setGlitchStyles(
    [...Array(5)].map(() => ({
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
    }))
  );
  }, [phase, currentHackLine, showPromotion, onComplete, pawnPosition])

  if (phase === "hacking") {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
        {/* Matrix background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-matrix-rain text-cyan-400 font-mono text-sm opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </div>
          ))}
        </div>

        {/* Terminal window */}
        <div className="relative z-10 w-full max-w-4xl mx-auto p-8">
          <div className="bg-black/90 border-2 border-cyan-500 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20">
            {/* Terminal header */}
            <div className="bg-cyan-900/50 px-4 py-2 flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div
                  className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <span className="text-green-400 font-mono text-sm">root@aishwarya-portfolio:~#</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 h-96 font-mono text-cyan-400">
              {/* Previous lines */}
              {hackingSequence.slice(0, currentHackLine).map((line, index) => (
                <div key={index} className="mb-2 animate-fade-in">
                  <span className="text-cyan-600">{">"}</span> {line}
                  <span className="text-cyan-500 ml-2">[OK]</span>
                </div>
              ))}

              {/* Current line */}
              {currentHackLine < hackingSequence.length && (
                <div className="mb-2 animate-type-in">
                  <span className="text-cyan-600">{">"}</span> {hackingText}
                  <span className="animate-blink text-cyan-400">|</span>
                </div>
              )}

              {/* Progress bar */}
              <div className="mt-8">
                <div className="flex justify-between text-xs mb-2">
                  <span>GOTHAM PROTOCOL</span>
                  <span>{Math.floor(hackingProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 rounded-full transition-all duration-100 animate-loading-glow"
                    style={{ width: `${hackingProgress}%` }}
                  />
                </div>
              </div>

              {/* Fake system info */}
              <div className="mt-6 text-xs opacity-60">
                <div>CPU: Intel i9-13900K @ 5.8GHz</div>
                <div>RAM: 32GB DDR5-6000</div>
                <div>GPU: RTX 4090 24GB</div>
                <div>NETWORK: 10Gbps Fiber</div>
              </div>
            </div>
          </div>
        </div>

      
        {/* Glitch effects */}
        <div className="absolute inset-0 pointer-events-none">
          {glitchStyles.map((style, i) => (
            <div
              key={i}
              className="absolute w-full h-1 bg-cyan-400 opacity-20 animate-glitch"
              style={style} // ✅ Apply the pre-generated style from state
            />
          ))}
        </div>
      </div>
    )
  }

  if (phase === "chess") {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center overflow-hidden">
        {/* Chess board background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 h-full">
            {[...Array(64)].map((_, i) => (
              <div
                key={i}
                className={`${(Math.floor(i / 8) + i) % 2 === 0 ? "bg-white" : "bg-gray-800"} animate-chess-glow`}
                style={{ animationDelay: `${i * 0.02}s` }}
              />
            ))}
          </div>
        </div>

        {/* Main chess scene */}
        <div className="relative z-10 flex flex-col items-center">
          

          {/* Chess board */}
          <div className="relative">
            <div className="w-96 h-96 grid grid-cols-8 grid-rows-8 border-4 border-cyan-600 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/30">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className={`${(Math.floor(i / 8) + i) % 2 === 0 ? "bg-gray-100" : "bg-gray-800"} relative flex items-center justify-center`}
                >
                  {/* Pawn moving up the board */}
                  {i === pawnPosition && !showPromotion && <div className="text-4xl animate-pawn-move">♟️</div>}

                  {/* Queen at promotion square (top row, center) */}
                  {i === 4 && showPromotion && <div className="text-5xl animate-queen-promotion">♛</div>}

                  {/* Path highlighting */}
                  {i % 8 === 4 && i <= 48 && (
                    <div
                      className={`absolute inset-0 ${i < pawnPosition ? "bg-yellow-400/20" : "bg-blue-400/10"} transition-all duration-500`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Promotion explosion effect */}
            {showPromotion && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-explosion"
                    style={{
                      left: "50%",
                      top: "12.5%",
                      animationDelay: `${i * 0.1}s`,
                      transform: `rotate(${i * 30}deg) translateY(-50px)`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Progress and status */}
          <div className="mt-12 text-center">
            <div className="text-2xl font-bold text-white mb-4">
              {chessProgress < 25
                ? "STARTING THE JOURNEY..."
                : chessProgress < 50
                  ? "ADVANCING FORWARD..."
                  : chessProgress < 75
                    ? "APPROACHING GREATNESS..."
                    : chessProgress < 87.5
                      ? "ALMOST THERE..."
                      : "FINALLY ACHIEVED! 👑"}
            </div>

            <div className="w-80 h-3 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-sky-400 rounded-full transition-all duration-300 animate-loading-glow"
                style={{ width: `${chessProgress}%` }}
              />
            </div>

            <div className="text-cyan-400 font-mono mt-2">{Math.floor(chessProgress)}% Complete</div>
          </div>

          {/* Motivational text */}
          <div className="mt-8 text-center max-w-2xl">
            <p className="text-gray-300 text-lg animate-fade-in" style={{ animationDelay: "1s" }}>
              {chessProgress < 25 && "Every expert was once a beginner..."}
              {chessProgress >= 25 && chessProgress < 50 && "Every journey starts with a single move..."}
              {chessProgress >= 50 && chessProgress < 75 && "Persistence transforms potential into power..."}
              {chessProgress >= 75 && chessProgress < 87.5 && "Victory is within reach..."}
              {chessProgress >= 87.5 && "Welcome to the realm of infinite possibilities!"}
            </p>
          </div>
        </div>

        {/* Floating chess pieces */}
        <div className="absolute inset-0 pointer-events-none">
          {["♔", "♕", "♖", "♗", "♘"].map((piece, i) => (
            <div
              key={i}
              className="absolute text-4xl text-white/20 animate-float-chess"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + Math.sin(i) * 30}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {piece}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Completion phase
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[100] p-12">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        
        {/* Glowing HUD Icon */}
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
           <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 animate-pulse"></div>
           <div className="w-12 h-12 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_#00d4ff]">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
           </div>
        </div>

        <div className="space-y-4">
           <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white uppercase tracking-[0.2em] italic">
             PORTFOLIO UNLOCKED
           </h1>
           
           <div className="h-px w-32 bg-cyan-900/30 mx-auto"></div>

           <p className="text-xl md:text-2xl text-cyan-400 font-mono tracking-[0.4em] uppercase font-bold animate-pulse">
             WELCOME TO THE ADVENTUROUS WORLD OF AISHWARYA RANGU
           </p>
        </div>

        <div className="flex justify-center gap-3">
           {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-cyan-950 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
           ))}
        </div>
      </div>
    </div>
  )
}
