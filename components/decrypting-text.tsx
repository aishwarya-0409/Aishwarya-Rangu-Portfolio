"use client"

import { useState, useEffect } from "react"

interface DecryptingTextProps {
  text: string
  className?: string
  speed?: number
}

export default function DecryptingText({ text, className = "", speed = 50 }: DecryptingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(true)

  const characters = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  useEffect(() => {
    let currentIndex = 0
    let iterations = 0
    const maxIterations = 3

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((char, index) => {
            if (index < currentIndex) {
              return text[index]
            }

            if (index === currentIndex && iterations >= maxIterations) {
              return text[index]
            }

            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      })

      if (iterations >= maxIterations) {
        currentIndex++
        iterations = 0
      } else {
        iterations++
      }

      if (currentIndex >= text.length) {
        setIsDecrypting(false)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, characters])

  return (
    <span className={`font-serif ${className} ${isDecrypting ? "animate-decrypt-glow" : ""}`}>
      {displayText}
      {isDecrypting && <span className="animate-blink text-red-500">|</span>}
    </span>
  )
}
