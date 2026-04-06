"use client"

import React from "react"

export default function DesktopOnlyMessage() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black p-8 text-center text-white md:hidden">
      <div className="text-6xl mb-8">🖥️</div>
      <h1 className="text-3xl font-bold mb-4">Desktop Experience Recommended</h1>
      <p className="max-w-md text-gray-300">
        This portfolio is heavily animated and best experienced on a desktop.
      </p>
    </div>
  )
}