"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

// Simple terminal icon (unchanged)
const TerminalIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="4,17 10,11 4,5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
)

type ShellType = "bash" | "cmd" | "powershell"

const shellConfigs: Record<ShellType, { prompt: string; header: string; promptColor: string }> = {
  bash: {
    prompt: "$",
    header: "aishwarya@portfolio:~",
    promptColor: "text-green-400",
  },
  cmd: {
    prompt: "C:\\Users\\Aishwarya>",
    header: "Command Prompt",
    promptColor: "text-gray-300",
  },
  powershell: {
    prompt: "PS C:\\Users\\Aishwarya>",
    header: "Windows PowerShell",
    promptColor: "text-blue-400",
  },
}

const getWelcomeMessages = (shell: ShellType): string[] => {
  const baseMessages = ['Type "help" to see available commands', ""]
  switch (shell) {
    case "cmd":
      return ["Microsoft Windows [Version 10.0.22621.1]", "(c) Microsoft Corporation. All rights reserved.", "", ...baseMessages]
    case "powershell":
      return ["Windows PowerShell", "Copyright (C) Microsoft Corporation. All rights reserved.", "", "Try the new cross-platform PowerShell https://aka.ms/pscore6", "", ...baseMessages]
    case "bash":
    default:
      return ["Welcome to Aishwarya's Social Terminal", ...baseMessages]
  }
}

// LinkedIn and GitHub are handled separately for the "hacking" animation.d
const commands = {
  help: "Commands: linkedin, github, skills, projects, about, email, phone, date, clear, sudo",
  about: "Focused on AI, system design, and practical full-stack problem solving.",
  email: "Email: aishwaryaaishurangu@gmail.com",
  phone: "Phone: +91 9346248901",
  skills: "Check the Skills section for my technical stack and strengths.",
  projects: "PROJECTS:\n- you are viewing it right now!\n- check my GitHub profile for more updates.",
  sudo: "[ERROR] User 'aishwarya@portfolio' is not in the sudoers file. This incident will be reported.",
  clear: "clear",
}

export default function SocialTerminal() {
  const [input, setInput] = useState("")
  const [currentShell, setCurrentShell] = useState<ShellType>("bash")
  const [isProcessing, setIsProcessing] = useState(false)
  const [history, setHistory] = useState<string[]>(getWelcomeMessages(currentShell))
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  // --- AUTO-FOCUS & AUTO-SCROLL ---
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [history])

  // Clear history when shell changes
  useEffect(() => {
    setHistory(getWelcomeMessages(currentShell))
  }, [currentShell])

  // --- HELPER TO ADD HISTORY ---
  // A simple helper to make adding lines to history cleaner
  const addHistoryLine = (line: string) => {
    setHistory((prev) => [...prev, line])
  }

  // --- "HACKING" ANIMATION FOR LINKS ---
  const handleLinkCommand = async (platform: "linkedin" | "github") => {
    setIsProcessing(true)
    const url =
      platform === "linkedin"
        ? "https://www.linkedin.com/in/aishwarya-rangu-579787286/"
        : "https://github.com/aishwarya-0409"

    const messages =
      platform === "linkedin"
        ? [
            "[INFO] Initializing connection to LinkedIn servers...",
            "[AUTH] Bypassing security protocols...",
            "[ACCESS] Granting access to Aishwarya Shivakumar Rangu's profile...",
            "[SUCCESS] Profile located. Opening in a new tab.",
          ]
        : [
            "[INFO] Accessing GitHub mainframe...",
            "[CLONE] Cloning user repositories... just kidding.",
            "[ACCESS] Compiling source code for 'aishwarya-0409'...",
            "[SUCCESS] GitHub profile found. Opening now...",
          ]

    for (const msg of messages) {
      addHistoryLine(msg)
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 200))
    }

    setTimeout(() => {
      window.open(url, "_blank")
      addHistoryLine("")
      setIsProcessing(false)
      inputRef.current?.focus()
    }, 800)
  }

  // --- CORE COMMAND HANDLER ---
  const handleCommand = (cmd: string) => {
    if (isProcessing) return
    const command = cmd.toLowerCase().trim()
    const prompt = shellConfigs[currentShell].prompt
    if (!command) {
      addHistoryLine(`${prompt} ${cmd}`)
      addHistoryLine("")
      setInput("")
      return
    }

    addHistoryLine(`${prompt} ${command}`)

    switch (command) {
      case "clear":
        setHistory(getWelcomeMessages(currentShell))
        break
      case "linkedin":
      case "github":
        handleLinkCommand(command)
        break
      case "date":
        addHistoryLine(new Date().toLocaleString())
        addHistoryLine("")
        break
      default:
        if (commands[command as keyof typeof commands]) {
          const response = commands[command as keyof typeof commands]
          response.split("\n").forEach((line) => addHistoryLine(line))
          addHistoryLine("")
        } else {
          addHistoryLine(
            `Command not found: ${command}. Type "help" for available commands.`
          )
          addHistoryLine("")
        }
    }
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
    }
  }

  const shellConfig = shellConfigs[currentShell]

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="mb-12 text-5xl font-bold text-center text-cyan-500 sm:text-6xl animate-slide-down">
          TAPPING INTO GOTHAM
        </h2>

        <div className="overflow-hidden bg-gray-900 border border-gray-700 rounded-lg shadow-2xl animate-fade-in">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center ml-4 space-x-2">
                <TerminalIcon />
                <span className="text-sm text-gray-400">{shellConfig.header}</span>
              </div>
            </div>
            <div>
              <select
                value={currentShell}
                onChange={(e) => setCurrentShell(e.target.value as ShellType)}
                className="bg-gray-900 text-gray-300 text-sm rounded border border-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="bash">Bash</option>
                <option value="cmd">CMD</option>
                <option value="powershell">PowerShell</option>
              </select>
            </div>
          </div>

          {/* Terminal content */}
          <div
            ref={terminalBodyRef}
            className="p-6 text-sm font-mono h-96 overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, index) => {
              const promptConfig = Object.values(shellConfigs).find((config) =>
                line.startsWith(config.prompt)
              )
              return (
                <div
                  key={index}
                  className={`mb-1 whitespace-pre-wrap ${
                    promptConfig
                      ? promptConfig.promptColor
                      : line.includes("[SUCCESS]")
                      ? "text-green-400"
                      : line.includes("[INFO]") || line.includes("[ACCESS]")
                      ? "text-yellow-400"
                      : line.includes("[ERROR]")
                      ? "text-red-500"
                      : "text-gray-300"
                  }`}
                >
                  {line}
                </div>
              )
            })}

            {/* Input line */}
            {!isProcessing && (
              <div className={`flex items-center ${shellConfig.promptColor}`}>
                <span className="mr-2">{shellConfig.prompt}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 text-white bg-transparent outline-none"
                  placeholder="Type a command..."
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>

        {/* Quick commands */}
        <div
          className="flex flex-wrap justify-center gap-2 mt-8 sm:gap-4 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            "linkedin",
            "github",
            "skills",
            "projects",
            "email",
          ].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-mono text-gray-300 bg-gray-800 rounded hover:bg-gray-700 hover:text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
