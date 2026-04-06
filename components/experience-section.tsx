"use client"

import { useState } from "react"

// --- SVG Icons (No changes needed here) ---
const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)
const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)
const BookOpenIcon = () => (
  <svg className="w-12 h-12 mx-auto text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

const experiences = [
  {
    company: "VIT Bhopal",
    role: "5-year Integrated M.Tech (CSE) - Computational and Data Science",
    period: "2024 - 2029 (Expected)",
    description:
      "Building strong foundations in computer science, data science, programming, and applied AI through academic coursework and projects.",
    technologies: ["C++", "Java", "Python", "Data Science"],
  },

]


// --- Main Component ---
export default function ExperienceSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isBookOpen, setIsBookOpen] = useState(false)

  const flipDuration = 400 // ms

  const handleNextPage = () => {
    if (currentPage < experiences.length - 1) {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(currentPage + 1)
        setIsFlipping(false)
      }, flipDuration)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(currentPage - 1)
        setIsFlipping(false)
      }, flipDuration)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-8">
      <h2 className="text-5xl md:text-6xl font-bold mb-12 text-red-600 animate-slide-down">
        EXPERIENCE
      </h2>

      {/* Book Container */}
      <div
        className="relative w-[300px] h-[450px] sm:w-[600px] sm:h-[450px] transition-transform duration-1000"
        style={{ perspective: "2000px" }}
      >
        {/* Left Page (Inside Cover) */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gray-200 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.4)] rounded-l-lg">
          <div className="flex flex-col items-center justify-center h-full p-6">
            <h3 className="text-2xl font-serif text-red-700 mb-2">The Unfolding</h3>
            <p className="text-sm text-gray-600">Some things are not meant to be known all at once.</p>
          </div>
        </div>

        {/* Right Page (Flippable) */}
        <div
          className={`absolute right-0 top-0 w-1/2 h-full transition-transform duration-1000 ${
            isBookOpen ? "rotate-y-[-180deg]" : ""
          }`}
          style={{ transformStyle: "preserve-3d", transformOrigin: "left" }}
          onClick={() => !isBookOpen && setIsBookOpen(true)}
        >


          {/* Page Content (Back of the Cover) */}
          <div
            className="absolute w-full h-full bg-gray-100 rounded-r-lg shadow-lg text-gray-800 p-6 flex flex-col justify-center rotate-y-180"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className={`text-center transition-opacity duration-300 ${
                isFlipping ? "opacity-0" : "opacity-100"
              }`}
            >
           
 
              <p className="text-base sm:text-lg text-gray-600 mb-1">
                {experiences[currentPage].role}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                {experiences[currentPage].period}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 mb-4 leading-relaxed">
                {experiences[currentPage].description}
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div
        className={`flex justify-center items-center w-full mt-8 space-x-4 transition-opacity duration-500 `}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0 || isFlipping}
          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex items-center space-x-2">
          {experiences.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentPage ? "bg-red-600" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === experiences.length - 1 || isFlipping}
          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}