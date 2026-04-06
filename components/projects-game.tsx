"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
}

const portfolioProjects: Project[] = [
  { 
    id: 1, 
    name: "Task Manager CLI + Web Dashboard", 
    description: "Developed a Python-based command-line task manager with persistent storage using JSON / SQLite. Implemented core task operations including add, update, delete, and status tracking. Built a web dashboard using Flask/Django sharing the same backend dataset. Improved task organization and productivity through automation and centralized data management.", 
    technologies: ["Python", "JSON", "SQLite", "Flask", "Django"] 
  },
  { 
    id: 2, 
    name: "TrustCare AI – Multi-Model AI Agent", 
    description: "Developing a multi-model AI agent capable of symptom analysis, disease prediction, and intelligent health response generation. Designing an extensible architecture supporting integration of classification models, NLP engines, and future deep learning modules. Working toward ensemble learning techniques to improve reliability and reduce false diagnoses.", 
    technologies: ["Machine Learning", "NLP", "Ensemble Models", "Flask", "AI System Design"] 
  },
  { 
    id: 3, 
    name: "OmniMate – All-in-One Companion", 
    description: "(Concept & Design Phase) Designing a modular, service-oriented architecture for task, mood, notes, and habit modules. Planning a cross-platform architecture with reusable business logic. Defining data models and workflows to support AI-powered recommendations.", 
    technologies: ["Modular Design", "Service Architecture", "Concept & Design"] 
  },
  { 
    id: 4, 
    name: "My Journey – Personal Journaling", 
    description: "(Ongoing) Designed a modular application architecture separating UI, business logic, and data layers. Implementing local-first data storage to ensure privacy and offline access. Structuring journal entries using normalized schemas for future analytics.", 
    technologies: ["Modular Architecture", "Local-first Data", "Research & Design"] 
  },
]

interface Entity {
  id: number
  lane: number
  y: number
  projectIdx: number
}

export default function ProjectsGame() {
  const [lane, setLane] = useState(1) // 0 to 3
  const [entities, setEntities] = useState<Entity[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [roadOffset, setRoadOffset] = useState(0)
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["[ SYS_INIT ] READY_FOR_PURSUIT", "[ CMD ] COLLECT DATA_CORES ON GOTHAM HIGHWAY"])
  const gameRef = useRef<HTMLDivElement>(null)
  const entityIdCounter = useRef(0)

  // Game Settings
  const SPEED = 8
  const LANE_WIDTH = 120
  const ROAD_HEIGHT = 500

  // Handle Controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "KeyA" || e.code === "ArrowLeft") setLane(curr => Math.max(0, curr - 1))
      if (e.code === "KeyD" || e.code === "ArrowRight") setLane(curr => Math.min(3, curr + 1))
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  // Game Loop
  useEffect(() => {
    const loop = setInterval(() => {
      // 🏎️ Road Scrolling
      setRoadOffset(prev => (prev + SPEED) % 1024)

      // 📦 Spawn Entities (Data Cores)
      if (Math.random() < 0.02) {
        const newEntity: Entity = {
          id: entityIdCounter.current++,
          lane: Math.floor(Math.random() * 4),
          y: -100,
          projectIdx: Math.floor(Math.random() * portfolioProjects.length)
        }
        setEntities(prev => [...prev, newEntity])
      }

      // ☄️ Update and Move Entities
      setEntities(prev => {
        const next = prev.map(e => ({ ...e, y: e.y + SPEED }))
          .filter(e => e.y < ROAD_HEIGHT + 100)
        
        // Collision Check
        let hitProject: Project | null = null
        const surviving = next.filter(e => {
          // Check collision with Batmobile (Player is around y=380-450)
          const isPlayerLane = e.lane === lane
          const inPlayerZone = e.y > 350 && e.y < 450
          if (isPlayerLane && inPlayerZone) {
            hitProject = portfolioProjects[e.projectIdx]
            return false // Remove the hit entity
          }
          return true
        })

        if (hitProject) {
           handleDataCollection(hitProject)
        }

        return surviving
      })
    }, 16)

    return () => clearInterval(loop)
  }, [lane])

  const handleDataCollection = (project: Project) => {
    setActiveProject(project)
    setTerminalLogs(logs => [`[ ACQUIRED ] ${project.name.toUpperCase()}`, ...logs.slice(0, 3)])
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 p-4 bg-black overflow-hidden font-mono select-none relative">
      
      {/* 🚀 Game Title HUD */}
      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="absolute top-28 left-1/2 -translate-x-1/2 text-[10px] text-cyan-900 border border-cyan-900/10 px-8 py-2 rounded-full tracking-[1em] uppercase font-black bg-black/50 backdrop-blur-md z-50 pointer-events-none"
      >
         GOTHAM_PURSUIT_v2.0
      </motion.div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 h-[600px] animate-fade-in relative z-10 items-start">
        
        {/* 🏎️ GOTHAM PURSUIT - HIGHWAY INTERFACE */}
        <div className="relative w-full h-[500px] bg-[#020205] rounded-[3rem] border border-cyan-900/10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          
          {/* Infinite Scrolling Road */}
          <div 
             className="absolute inset-0 bg-repeat-y opacity-40 transition-none"
             style={{ 
               backgroundImage: "url('/game/road_bg.png')",
               backgroundPositionY: `${roadOffset}px`,
               backgroundSize: '100% auto'
             }}
          ></div>

          {/* Lane Dividers Overlay */}
          <div className="absolute inset-0 flex justify-around pointer-events-none opacity-5">
             {[...Array(3)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-cyan-400 dashed border-r border-cyan-500/20"></div>
             ))}
          </div>

          {/* Game Arena (Centered) */}
          <div className="absolute inset-0 flex justify-center items-center px-12">
             <div className="relative w-[480px] h-full">
                
                {/* Data Cores (Cores falling down) */}
                <AnimatePresence>
                  {entities.map(e => (
                    <motion.div 
                      key={e.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className="absolute z-20"
                      style={{ 
                        left: e.lane * LANE_WIDTH + (LANE_WIDTH / 2) - 30, 
                        top: e.y 
                      }}
                    >
                      <img 
                        src="/game/data_core.png" 
                        className="w-16 h-16 object-contain"
                        style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 10px #00d4ff)' }}
                        alt="Data Core" 
                      />
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] text-cyan-400 font-bold whitespace-nowrap tracking-widest opacity-40 uppercase">
                         Data_Entry.0{e.id % 9}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Batmobile (Player) */}
                <motion.div 
                  className="absolute z-40"
                  animate={{ left: lane * LANE_WIDTH + (LANE_WIDTH / 2) - 45 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  style={{ top: 375 }}
                >
                  <img 
                    src="/game/bat_car.png" 
                    className="w-24 h-24 object-contain drop-shadow-[0_0_35px_rgba(0,212,255,0.6)] brightness-[0.8] contrast-[1.3]" 
                    style={{ mixBlendMode: 'screen' }}
                    alt="Batmobile" 
                  />
                  {/* Pursuit Thrusters */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-12 bg-cyan-400/20 blur-2xl rounded-full animate-pulse shadow-[0_0_40px_#00d4ff]"></div>
                </motion.div>

             </div>
          </div>

          {/* HUD OVERLAY */}
          <div className="absolute top-0 inset-x-0 p-10 flex justify-between items-start pointer-events-none z-50">
             <div className="space-y-1">
                <div className="text-[10px] text-cyan-500 font-black tracking-[0.4em] uppercase italic drop-shadow-[0_0_5px_rgba(0,212,255,0.3)]">Protocols_Pursuit_Mode</div>
                <div className="text-[8px] text-zinc-600 font-bold tracking-widest uppercase">Mission: Highway Data Acquisition</div>
             </div>
             <div className="flex flex-col items-end gap-3">
                <div className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest bg-cyan-950/20 px-5 py-2 border border-cyan-900/20">
                   Intercept Data_Cores to extract dossiers
                </div>
                <div className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">
                   STEER: A / D | ARROW_KEYS
                </div>
             </div>
          </div>

          {/* Vignette & scanline */}
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-black opacity-40"></div>
        </div>

        {/* 💻 MISSION INTELLIGENCE DOSSIER (Side Panel) */}
        <div className="bg-[#020205] rounded-[3rem] border border-cyan-950/20 overflow-hidden flex flex-col shadow-2xl h-[500px] animate-slide-in relative">
           
           <div className="p-10 pb-6 border-b border-cyan-900/5">
              <div className="flex justify-between items-center mb-8">
                 <span className="text-[9px] text-cyan-800 tracking-[0.5em] uppercase font-black italic">Archive_Access</span>
                 <div className="flex gap-1.5">
                    {[...Array(4)].map((_, i) => (
                       <div key={i} className={`w-1.5 h-3 rounded-full ${activeProject ? "bg-cyan-500 shadow-[0_0_10px_cyan]" : "bg-zinc-900"}`}></div>
                    ))}
                 </div>
              </div>
              <div className="h-16 overflow-hidden text-[8px] text-zinc-600 space-y-1.5 font-mono italic">
                 {terminalLogs.map((log, i) => (
                    <div key={i} className={i === 0 ? "text-cyan-400/90 animate-pulse" : ""}>{log}</div>
                 ))}
              </div>
           </div>

           <div className="flex-1 p-10 pt-8 overflow-y-auto custom-scrollbar relative z-20">
              {activeProject ? (
                 <div className="space-y-10 animate-fade-up">
                    <div className="space-y-1">
                       <div className="text-[8px] text-cyan-900 tracking-widest uppercase font-black opacity-40 mb-3 italic">ENTRY_ID: OS_00{activeProject.id}</div>
                       <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{activeProject.name}</h3>
                    </div>

                    <p className="text-zinc-500 text-[11px] leading-relaxed italic border-l-2 border-cyan-400/20 pl-6 py-4 bg-cyan-950/5 rounded-r-2xl">
                       &quot;{activeProject.description}&quot;
                    </p>

                    <div className="space-y-4">
                       <div className="text-[9px] font-bold text-cyan-900 uppercase tracking-[0.4em]">Integrated_Stack</div>
                       <div className="flex flex-wrap gap-2.5">
                          {activeProject.technologies.map(t => (
                             <span key={t} className="px-3 py-1 bg-cyan-950/30 text-cyan-500/70 text-[8px] rounded-lg border border-cyan-900/20 uppercase tracking-widest font-black">
                                {t}
                             </span>
                          ))}
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center opacity-10">
                    <div className="w-24 h-24 border border-dashed border-cyan-900/30 rounded-full animate-spin-slow mb-8 flex items-center justify-center text-xl font-bold">
                       ?
                    </div>
                    <p className="text-[10px] text-cyan-900 uppercase tracking-[0.6em] font-black">Intercept_Required</p>
                 </div>
              )}
           </div>

           {/* Side Glow Effect */}
           <div className="absolute top-1/2 -right-4 w-1 h-32 bg-cyan-500/10 blur-xl rounded-full"></div>
        </div>

      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0c4a6e; }
        
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
