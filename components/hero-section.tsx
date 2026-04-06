"use client"

import { useState, useEffect } from "react"
import DecryptingText from "@/components/decrypting-text"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-3d"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            <div className="w-4 h-4 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded transform rotate-45 animate-spin-slow opacity-20"></div>
          </div>
        ))}
      </div>

      {/* Interactive light effect */}
      <div
        className="absolute w-96 h-96 bg-gradient-radial from-cyan-500/20 via-cyan-600/10 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: "all 0.3s ease-out",
        }}
      />

      <div className="text-center z-10 relative mt-24 lg:mt-32">
        {/* Enhanced name with 3D effect */}
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <h1
            className={`text-7xl font-bold mb-6 transition-all duration-500 ${isHovered ? "animate-text-3d" : "animate-text-entrance"}`}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 animate-gradient-shift">
              AISHWARYA SHIVAKUMAR RANGU
            </span>
          </h1>

          {/* 3D shadow effect */}
          <h1 className="absolute top-2 left-2 text-7xl font-bold mb-6 text-black/20 -z-10">
            <span className="inline-block">AISHWARYA SHIVAKUMAR RANGU</span>
          </h1>
        </div>

        {/* Decrypting text component */}
        <div className="relative mb-8">
          <DecryptingText text="FULL STACK DEVELOPER" className="text-3xl text-gray-300" speed={80} />
        </div>

        {/* Enhanced description with glassmorphism */}
        <div className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 animate-glass-entrance shadow-2xl">
          I am a <span className="text-cyan-400 font-bold">CSE student</span> focused on <span className="text-cyan-400 font-bold">Computational and Data Science</span>.
          I believe <span className="text-cyan-400 font-semibold">logic is everything</span>—and coding is where I turn that belief into reality. 
          I love building things that feel alive, from Android apps to web experiences, shaping ideas into something meaningful that leaves a lasting impact. 
          What drives me most is the <span className="text-cyan-400 font-semibold">curiosity to go deeper</span> into AI and ML, 
          exploring how intelligence can be built, not just imagined.
          <div className="mt-8 text-xs italic text-cyan-500/60 font-mono text-right border-t border-cyan-500/10 pt-4">
            "It's not who I am underneath, but what I do that defines me."
          </div>
        </div>

      </div>

      {/* Floating code snippets - Repositioned to avoid collisions */}
      <div className="absolute top-28 left-12 animate-code-float hidden md:block">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-green-500/30 font-mono text-green-400 text-xs">
          <div>const developer = {`{`}</div>
          <div className="ml-4">name: "Aishwarya Shivakumar Rangu",</div>
          <div className="ml-4">focus: "AI + Full Stack"</div>
          <div>{`}`}</div>
        </div>
      </div>

      <div className="absolute bottom-28 right-12 animate-code-float hidden md:block" style={{ animationDelay: "2s" }}>
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30 font-mono text-blue-400 text-xs">
          <div>while(learning) {`{`}</div>
          <div className="ml-4">code();</div>
          <div className="ml-4">innovate();</div>
          <div>{`}`}</div>
        </div>
      </div>
    </div>
  )
}
