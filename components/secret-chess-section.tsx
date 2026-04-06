"use client"

import React, { useState, useEffect } from "react"

// Define the structure for a chess piece
interface ChessPiece {
  type: string
  color: "white" | "black"
}

// --- One-Move Checkmate Puzzle Setup ---
// The goal is for White to deliver checkmate in a single move.
// The solution is moving the Queen from e6 to g6 (Qe6 -> Qg6#).
const createPuzzleBoard = (): (ChessPiece | null)[] => {
  const board = Array(64).fill(null)
  board[6] = { type: "♚", color: "black" } // Black King at g8
  board[13] = { type: "♘", color: "black" } // Black Rook at c4
  board[23] = { type: "♖", color: "white" } // Black Rook at d4
  board[20] = { type: "♕", color: "white" } // White Queen at e6
  board[26] = { type: "♗", color: "white" } // White Bishop at c4 (supports the queen's attack)
  board[56] = { type: "♔", color: "white" } // White King at a1
  return board
}

export default function SecretChessSection() {
  const [board, setBoard] = useState<(ChessPiece | null)[]>(createPuzzleBoard())
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<number[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<"white" | "black">("white")
  const [gameStatus, setGameStatus] = useState<"playing" | "checkmate" | "unlocked">("playing")
  const [moves, setMoves] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // Secret links shown after solving the puzzle
  const gamingProfiles = [
    { name: "GitHub", url: "https://github.com/aishwarya-0409", icon: "💻" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aishwarya-rangu-579787286/", icon: "🔗" },
    { name: "Email", url: "mailto:aishwaryaaishurangu@gmail.com", icon: "✉️" },
  ]

  // --- Core Game Logic ---

  /**
   * Validates if a move from 'from' to 'to' is legal for the current piece.
   * This is a simplified validation focusing on the queen for this puzzle.
   */
  const isValidMove = (from: number, to: number, currentBoard: (ChessPiece | null)[]): boolean => {
    const piece = currentBoard[from]
    if (!piece || piece.color !== currentPlayer) return false
    if (currentBoard[to]?.color === piece.color) return false

    const fromRow = Math.floor(from / 8)
    const fromCol = from % 8
    const toRow = Math.floor(to / 8)
    const toCol = to % 8

    // For this puzzle, only the Queen can move.
    if (piece.type === "♕") {
      const rowDiff = Math.abs(toRow - fromRow)
      const colDiff = Math.abs(toCol - fromCol)

      // Check if it's a valid queen path (straight or diagonal)
      if (rowDiff !== colDiff && rowDiff !== 0 && colDiff !== 0) {
        return false
      }

      // Check for obstructions along the path
      const stepRow = Math.sign(toRow - fromRow)
      const stepCol = Math.sign(toCol - fromCol)
      let currentRow = fromRow + stepRow
      let currentCol = fromCol + stepCol

      while (currentRow !== toRow || currentCol !== toCol) {
        if (currentBoard[currentRow * 8 + currentCol] !== null) {
          return false // Path is blocked
        }
        currentRow += stepRow
        currentCol += stepCol
      }
      return true
    }
    return false // Other pieces cannot move in this puzzle
  }

  /**
   * Checks if the current board state is checkmate.
   * For this puzzle, checkmate occurs when the White Queen is on g6.
   */
  const isCheckmate = (currentBoard: (ChessPiece | null)[]): boolean => {
    const queenOnG6 = currentBoard[22]?.type === "♕" && currentBoard[22]?.color === "white"
    return queenOnG6
  }

  /**
   * Executes a move, updates the board, and checks for game-ending conditions.
   */
  const makeMove = (from: number, to: number) => {
    if (!isValidMove(from, to, board)) {
      // If the move is invalid, reset selection
      setSelectedSquare(null)
      setPossibleMoves([])
      return
    }

    const newBoard = [...board]
    newBoard[to] = newBoard[from]
    newBoard[from] = null
    
    setBoard(newBoard)
    setMoves(moves + 1)
    
    // Check for checkmate after the move
    if (isCheckmate(newBoard)) {
      setGameStatus("checkmate")
      setTimeout(() => setGameStatus("unlocked"), 2000) // Unlock after a delay
    } else {
      setCurrentPlayer(currentPlayer === "white" ? "black" : "white")
    }
    
    setSelectedSquare(null)
    setPossibleMoves([])
  }

  /**
   * Handles user clicks on the chessboard squares.
   */
  const handleSquareClick = (index: number) => {
    if (gameStatus !== "playing") return

    // If a piece is already selected, try to move it
    if (selectedSquare !== null) {
      if (selectedSquare === index) {
        // Deselect if clicking the same square
        setSelectedSquare(null)
        setPossibleMoves([])
      } else {
        makeMove(selectedSquare, index)
      }
    } else {
      // If no piece is selected, try to select one
      if (board[index]?.color === currentPlayer) {
        setSelectedSquare(index)
        // Calculate and show possible moves for the selected piece
        const validMoves = []
        for (let i = 0; i < 64; i++) {
          if (isValidMove(index, i, board)) {
            validMoves.push(i)
          }
        }
        setPossibleMoves(validMoves)
      }
    }
  }

  /**
   * Resets the puzzle to its initial state.
   */
  const resetPuzzle = () => {
    setBoard(createPuzzleBoard())
    setSelectedSquare(null)
    setPossibleMoves([])
    setCurrentPlayer("white")
    setGameStatus("playing")
    setMoves(0)
    setShowHint(false)
  }

  return (
    <>
      {/* Custom CSS Animations */}
      <style>{`
        @keyframes title-glow {
          0%, 100% { text-shadow: 0 0 10px #fef08a, 0 0 20px #fca5a5, 0 0 30px #ef4444; }
          50% { text-shadow: 0 0 20px #fef9c3, 0 0 30px #fca5a5, 0 0 40px #ef4444; }
        }
        .animate-title-glow {
          animation: title-glow 3s ease-in-out infinite;
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        .animate-fade-in {
            animation: fade-in-up 0.3s ease-out;
        }
        .piece-white {
            color: #f8fafc;
            text-shadow: 0 2px 4px rgba(0,0,0,0.7);
        }
        .piece-black {
            color: #1e293b;
            text-shadow: 0 2px 4px rgba(255,255,255,0.3);
        }
      `}</style>

      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-black to-red-900 font-sans">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-300 ">
              🔒 Secret Chess Challenge
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-4">Achieve checkmate in 1 move to unlock my secret links!</p>
            <div className="text-lg text-red-400 font-semibold">
              Moves: {moves} | Turn: {currentPlayer === "white" ? "⚪ White" : "⚫ Black"}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center">
            {/* Chess Board */}
            <div className="relative">
              <div className="w-[320px] h-[320px] sm:w-96 sm:h-96 grid grid-cols-8 grid-rows-8 border-4 border-red-600 rounded-lg overflow-hidden shadow-2xl shadow-red-500/30">
                {board.map((piece, index) => {
                  const isLightSquare = (Math.floor(index / 8) + index) % 2 === 0
                  return (
                    <div
                      key={index}
                      onClick={() => handleSquareClick(index)}
                      className={`
                        relative flex items-center justify-center cursor-pointer transition-colors duration-200 text-4xl sm:text-5xl
                        ${isLightSquare ? "bg-amber-200" : "bg-amber-700"}
                        ${selectedSquare === index ? "bg-blue-400" : ""}
                        ${gameStatus === "playing" && possibleMoves.includes(index) ? (isLightSquare ? "hover:bg-green-300" : "hover:bg-green-600") : ""}
                        ${gameStatus === "playing" && selectedSquare !== index ? (isLightSquare ? "hover:bg-amber-300" : "hover:bg-amber-800") : ""}
                      `}
                    >
                      {/* Possible Move Indicator */}
                      {possibleMoves.includes(index) && (
                        <div className="absolute w-1/3 h-1/3 rounded-full bg-green-500 opacity-50"></div>
                      )}
                      
                      {piece && (
                        <span className={`
                          ${piece.color === "white" ? "piece-white" : "piece-black"}
                          transition-transform duration-300
                          ${selectedSquare === index ? "transform scale-125 -translate-y-1" : ""}
                        `}>
                          {piece.type}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Game Status Overlay */}
              {gameStatus === "checkmate" && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
                  <div className="text-center animate-bounce">
                    <div className="text-6xl mb-4">🎉</div>
                    <div className="text-3xl font-bold text-yellow-400">CHECKMATE!</div>
                    <div className="text-lg text-white mt-2">Unlocking profiles...</div>
                  </div>
                </div>
              )}
            </div>

            {/* Side Panel (Profiles or Locked State) */}
            <div className="flex-1 max-w-md w-full">
              {gameStatus === "unlocked" ? (
                <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 sm:p-8 border-2 border-yellow-500 shadow-2xl shadow-yellow-500/20 animate-slide-in-right">
                  <div className="text-center mb-6">
        
                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">Secret Links Unlocked</h3>
                    <p className="text-gray-300">Thanks for solving the puzzle.</p>
                  </div>
                  <div className="space-y-4">
                    {gamingProfiles.map((profile, index) => (
                      <a
                        key={profile.name}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105 group animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                      >
                        <div className="text-3xl group-hover:animate-pulse">{profile.icon}</div>
                        <div>
                          <div className="text-white font-semibold group-hover:text-yellow-400 transition-colors">{profile.name}</div>
                          <div className="text-gray-400 text-sm">Click to visit profile</div>
                        </div>
                        <div className="ml-auto text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                      </a>
                    ))}
                  </div>
                  <button onClick={resetPuzzle} className="w-full mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-all duration-300 hover:scale-105">
                    🔄 Play Again
                  </button>
                </div>
              ) : (
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🔐</div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-2">LOCKED</h3>
                    <p className="text-gray-500">Solve the puzzle to reveal my secret links.</p>
                  </div>
                  <div className="space-y-4">
                    <button onClick={() => setShowHint(!showHint)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300">
                      💡 {showHint ? "Hide Hint" : "Show Hint"}
                    </button>
                    {showHint && (
                      <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30 animate-fade-in">
                        <p className="text-blue-300 text-sm">
                          <strong>Hint:</strong> The Queen can deliver a powerful checkmate, supported by her Bishop. Look for the winning move!
                        </p>
                      </div>
                    )}
                    <button onClick={resetPuzzle} className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300">
                      🔄 Reset Puzzle
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
