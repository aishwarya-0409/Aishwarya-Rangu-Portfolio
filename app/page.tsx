"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from 'next/dynamic'
import HeroSection from "@/components/hero-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import SocialTerminal from "@/components/social-terminal"
import ProjectsGame from "@/components/projects-game"
import ContactSection from "@/components/contact-section"
import WritingsSection from "@/components/writings-section"
import SecretChessSection from "@/components/secret-chess-section"
import ParticleBackground from "@/components/particle-background"
import MusicPlayer from "@/components/music-player"

const LoadingScreen = dynamic(
  () => import('@/components/loading-screen'), 
  { ssr: false } // This disables Server-Side Rendering for the component
)

export default function Portfolio() {
  const [inputValue, setInputValue] = useState('');
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const keySequence = useRef('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showSecretSection, setShowSecretSection] = useState(false)
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 13000) // Extended for full chess animation
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if the input value matches the secret code (case-insensitive)
    if (value.toUpperCase() === 'CHECKMATE') {
        setSecretUnlocked(true);
        setShowSecretSection(true);
        setInputValue(''); // Clear input after unlocking
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        console.log('Secret Unlocked! 🔓');
    }
};

  const sections = [
    { id: "hero", component: <HeroSection />, name: "About Me", icon: "🏠" },
    { id: "skills", component: <SkillsSection />, name: "Skills", icon: "⚡" },
    { id: "experience", component: <ExperienceSection />, name: "Experience", icon: "📚" },
    { id: "writings", component: <WritingsSection />, name: "Writings", icon: "🖋️" },
    { id: "social", component: <SocialTerminal />, name: "Social", icon: "💻" },
    { id: "projects", component: <ProjectsGame />, name: "Projects", icon: "🎮" },
    { id: "contact", component: <ContactSection />, name: "Contact", icon: "📞" },
    ...(secretUnlocked ? [{ id: "secret", component: <SecretChessSection />, name: "Secret", icon: "♟️" }] : []),
  ]

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />
  }

  if (showSecretSection) {
    return (
      <div className="min-h-screen bg-black text-white relative">
        <div
          className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
        >
          <div className="w-full h-full bg-cyan-500 rounded-full animate-pulse-cursor"></div>
        </div>

        <button
          onClick={() => setShowSecretSection(false)}
          className="fixed top-8 left-8 z-50 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-all duration-300"
        >
          ← Back to Portfolio
        </button>

        <SecretChessSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Custom cursor with instant response */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      >
        <div className="w-full h-full bg-cyan-500 rounded-full animate-pulse-cursor"></div>
      </div>

      <ParticleBackground />
      <MusicPlayer />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex justify-center">
          <div className="bg-black/20 backdrop-blur-lg rounded-full px-8 py-4 border border-cyan-500/30">
            <div className="flex space-x-6">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`group relative px-4 py-2 rounded-full transition-all duration-500 ${
                    currentSection === index
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/50"
                      : "text-gray-300 hover:text-white hover:bg-cyan-600/20"
                  } ${section.id === "secret" ? "animate-pulse border border-yellow-500" : ""}`}
                >
                  <span className="text-lg mr-2">{section.icon}</span>
                  <span className="font-medium">{section.name}</span>
                  {currentSection === index && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Tabbed View */}
      <main className="relative z-10 w-full h-screen overflow-y-auto">
        <div 
          key={currentSection} 
          className="h-full w-full animate-fade-in"
        >
          {sections[currentSection]?.component}
        </div>
      </main>

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-3">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? "bg-cyan-500 scale-150 shadow-lg shadow-cyan-500/50"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
