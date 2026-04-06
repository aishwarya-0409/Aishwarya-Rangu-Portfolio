"use client"

import { useEffect, useRef } from "react"

// Define a type for the particle properties for better type-safety and readability.
type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

// Define props for the component to make it configurable.
interface ParticleBackgroundProps {
  particleCount?: number
  particleColor?: string
  lineColor?: string
  particleSize?: number
  speed?: number
  connectionDistance?: number
  className?: string
  interactive?: boolean
}

export default function ParticleBackground({
  particleCount = 80,
  particleColor = "#ffffff",
  lineColor = "#06b6d4", // Cyan-400
  particleSize = 2.5,
  speed = 0.5,
  connectionDistance = 120,
  className = "fixed inset-0 pointer-events-none z-0",
  interactive = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: -9999, y: -9999 }) // Start mouse outside the canvas

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // This function initializes or re-initializes the particles.
    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.current = []

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * particleSize + 1,
          color: particleColor,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const particle of particles.current) {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      }

      // Draw connections - Optimized loop
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i]
          const p2 = particles.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            // Fade the line based on distance
            ctx.globalAlpha = 1 - distance / connectionDistance
            ctx.stroke()
            ctx.globalAlpha = 1 // Reset alpha
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Set up event listeners
    const handleResize = () => {
      init() // Re-create particles on resize
    }
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX
      mouse.current.y = event.clientY
    }

    // Add mousemove listener if interactive
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    window.addEventListener("resize", handleResize)
    
    // Initial setup
    init()
    animate()

    // Cleanup function to avoid memory leaks
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener("resize", handleResize)
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
    // Re-run the effect if any of the configuration props change.
  }, [particleCount, particleColor, lineColor, particleSize, speed, connectionDistance, interactive])

  return <canvas ref={canvasRef} className={className} />
}