"use client"

import { useState } from "react"

// Simple SVG icons to replace lucide-react
const CrownIcon = () => (
  <img className="w-32 h-32 object-contain" src="/skills/rock.png" alt="" />
)

const CastleIcon = () => (
  <img className="w-32 h-32 object-contain" src="/skills/queen.png" alt="" />
)

const ShieldIcon = () => (
  <img className="w-32 h-32 object-contain" src="/skills/rock.png" alt="" />
)

const ZapIcon = () => (
  <img className="w-32 h-32 object-contain" src="/skills/pawn.png" alt="" />
)

const SwordIcon = () => (
   <img className="w-32 h-32 object-contain" src="/skills/king.png" alt="" />
)

const StarIcon = () => (
 <img className="w-32 h-32 object-contain" src="/skills/camal.png" alt="" />
)

const CpuIcon = () => (
   <img className="w-32 h-32 object-contain" src="/skills/knight.png" alt="" />
)

const DatabaseIcon = () => (
   <img className="w-32 h-32 object-contain" src="/skills/knight.png" alt="" />
)

const CodeIcon = () => (
  <img className="w-32 h-32 object-contain" src="/skills/camal.png" alt="" />
)

const skills = [
  { name: "C++", icon: CrownIcon, level: 85, color: "from-cyan-400 to-cyan-600", description: "System Programming & DSA" },
  { name: "Python", icon: ShieldIcon, level: 90, color: "from-cyan-400 to-cyan-600", description: "AI, ML & Automation" },
  { name: "Java", icon: CastleIcon, level: 80, color: "from-cyan-400 to-cyan-600", description: "Enterprise Applications" },
  { name: "JavaScript", icon: DatabaseIcon, level: 85, color: "from-cyan-400 to-cyan-600", description: "Web & Mobile Logic" },
  { name: "Go", icon: ZapIcon, level: 75, color: "from-cyan-400 to-cyan-600", description: "Cloud Native Services" },
  { name: "HTML", icon: CodeIcon, level: 90, color: "from-cyan-400 to-cyan-600", description: "Semantic Web Structure" },
  { name: "CSS", icon: StarIcon, level: 85, color: "from-cyan-400 to-cyan-600", description: "Modern Layouts & Design" },
  { name: "React.js", icon: CpuIcon, level: 88, color: "from-cyan-400 to-cyan-600", description: "Component Architecture" },
  { name: "Next.js", icon: CodeIcon, level: 85, color: "from-cyan-400 to-cyan-600", description: "Full-Stack Frameworks" },
  { name: "Node.js", icon: DatabaseIcon, level: 80, color: "from-cyan-400 to-cyan-600", description: "Runtime Environments" },
  { name: "Android Development", icon: ZapIcon, level: 82, color: "from-cyan-400 to-cyan-600", description: "Mobile Ecosystems" },
  { name: "Game Development", icon: SwordIcon, level: 85, color: "from-cyan-400 to-cyan-600", description: "Interactive Experiences" },
  { name: "Full-Stack Development", icon: ShieldIcon, level: 88, color: "from-cyan-400 to-cyan-600", description: "End-to-End Solutions" },
  { name: "PostgreSQL", icon: DatabaseIcon, level: 80, color: "from-cyan-400 to-cyan-600", description: "Relational Data Management" },
  { name: "SQLite", icon: DatabaseIcon, level: 85, color: "from-cyan-400 to-cyan-600", description: "Embedded Storage" },
  { name: "Firebase", icon: StarIcon, level: 80, color: "from-cyan-400 to-cyan-600", description: "Real-time BaaS" },
  { name: "REST APIs", icon: CpuIcon, level: 85, color: "from-cyan-400 to-cyan-600", description: "Communication Protocols" },
  { name: "Docker", icon: ShieldIcon, level: 78, color: "from-cyan-400 to-cyan-600", description: "Container Orchestration" },
  { name: "Git", icon: ZapIcon, level: 90, color: "from-cyan-400 to-cyan-600", description: "Version Control Systems" },
  { name: "Flask", icon: CodeIcon, level: 82, color: "from-cyan-400 to-cyan-600", description: "Micro-framework Backend" },
  { name: "Django", icon: CpuIcon, level: 80, color: "from-cyan-400 to-cyan-600", description: "Rapid Web Prototyping" },
  { name: "Unity", icon: SwordIcon, level: 75, color: "from-cyan-400 to-cyan-600", description: "3D/2D Engine Logic" },
]

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Chess board background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 h-full">
          {[...Array(64)].map((_, i) => (
            <div
              key={i}
              className={`${(Math.floor(i / 8) + i) % 2 === 0 ? "bg-white" : "bg-black"} animate-chess-glow`}
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-7xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 animate-title-glow">
          ⚡ SKILLS & EXPERTISE ⚡
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative flex flex-col items-center cursor-pointer animate-skill-entrance"
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill card with 3D effect */}
              <div className="relative mb-8 transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4">
                {/* Glowing background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-110`}
                ></div>

                {/* Chess piece container */}
                <div className="relative w-32 h-32  rounded-2xl flex items-center justify-center shadow-2xl  transition-all duration-500">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0  group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Chess piece icon */}
                  <div className="text-cyan-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 drop-shadow-lg">
                    <skill.icon />
                  </div>

                
                </div>

                {/* Chess board base with enhanced 3D effect */}
                <div className="absolute -bottom-4 -left-4 w-40 h-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-lg transform rotate-3 -z-10 shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg"></div>
                </div>
              </div>

              {/* Skill information */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {skill.name}
                </h3>

                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-xs">
                  {skill.description}
                </p>

               

                {/* Skill level text */}
                <div className="text-xs text-gray-500 font-mono">
                  {skill.level >= 85 ? "EXPERT" : skill.level >= 75 ? "ADVANCED" : "INTERMEDIATE"}
                </div>
              </div>

            
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-6 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-500">22</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Tech Nodes</div>
            </div>
            <div className="w-px h-12 bg-cyan-900/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-500">84%</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Avg Sync</div>
            </div>
            <div className="w-px h-12 bg-cyan-900/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-500">3+</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">Exp Cycles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
