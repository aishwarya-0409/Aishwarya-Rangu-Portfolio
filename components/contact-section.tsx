"use client"

// Simple SVG icons
const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)


const MapPinIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GithubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)



export default function ContactSection() {
  const contactInfo = [
    {
      icon: MailIcon,
      label: "Email",
      value: "aishwaryaaishurangu@gmail.com",
      link: "mailto:aishwaryaaishurangu@gmail.com",
    },
    

    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "linkedin.com/in/aishwarya-rangu-579787286",
      link: "https://www.linkedin.com/in/aishwarya-rangu-579787286/",
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "github.com/aishwarya-0409",
      link: "https://github.com/aishwarya-0409",
    },
  ]

  const hobbies = [
    "Building Productivity Apps and Tools",
    "System Design and Architecture",
    " Writing Poetries And Stories",
    "Tech Learning and Hack Projects",
    "Machine Learning and AI Research",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-6xl font-bold text-center mb-16 text-red-600 animate-slide-down">CONTACT</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6 animate-slide-in-left">
            <h3 className="text-3xl font-bold text-white mb-8">Get In Touch</h3>

            {contactInfo.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center space-x-4 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-all duration-300 group-hover:scale-110">
                  <item.icon />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{item.label}</p>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-red-400 transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Hobbies & Interests */}
          <div className="space-y-6 animate-slide-in-right">
            <h3 className="text-3xl font-bold text-white mb-8">Hobbies & Interests</h3>

            <div className="grid grid-cols-1 gap-4">
              {hobbies.map((hobby, index) => (
                <div
                  key={hobby}
                  className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-red-600 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-white text-center font-medium">{hobby}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div
              className="mt-8 bg-gray-900 p-6 rounded-lg border border-gray-700 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <h4 className="text-xl font-bold text-red-600 mb-2">Education</h4>
              <p className="text-white font-medium">Integrated M.Tech (CSE) - Computational and Data Science</p>
              <p className="text-gray-400 text-sm">Vellore Institute of Technology, Bhopal (Expected 2029)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "1s" }}>
          <p className="text-gray-400">© {new Date().getFullYear()} Aishwarya Shivakumar Rangu. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
