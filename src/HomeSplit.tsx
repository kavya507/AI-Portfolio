import AIChat from './components/AIChat'
import { useState } from 'react'
import { motion } from 'framer-motion'

const funFacts = [
  '⚙️ Turning ideas into intelligent products with code, data, and curiosity',
  '📚 Making math click through creative teaching',
  '🛠️ Learning, tinkering, sharing — repeat',
  '🍣 Exploring the world one bite at a time '
  
  
]

const HomeSplit = () => {
  const [chatOpen, setChatOpen] = useState(true)

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      
      {/* Left: Intro (25%) */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-8 md:p-10 text-center relative z-10">
        <motion.img
          src="/IMG_5240-modified.png"
          alt="Kavya's AI Avatar"
          className="w-36 h-36 rounded-full mb-6 animate-float"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
       
        <h1 className="text-3xl md:text-4xl font-extrabold gradient-text mb-6">Hey, I'm Kavya 👋</h1>
        <p className="text-lg text-primary-50 mb-4">  AI Engineer • Data Storyteller @ Cigna Group  🎓 George Mason CS Alum • Sr. Math Tutor</p>

        <div className="flex flex-col items-start gap-2 mb-6 text-left">
          {funFacts.map((fact, i) => (
            <div key={i} className="text-sm md:text-base text-primary-300 flex gap-2">
              <span>{fact.split(' ')[0]}</span>
              <span>{fact.slice(2)}</span>
            </div>
          ))}
        </div>
        <p className="text-sm md:text-base text-gray-300 max-w-sm mb-6">
        Ready to create the next game-changing solution together?
        </p>
        
        <div className="flex gap-4 mb-4">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow transition-all duration-200 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
            Download Resume
          </a>
          <a
            href="mailto:kdlskavya@gmail.com"
            className="inline-flex items-center justify-center px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow transition-all duration-200 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0-4V8" /></svg>
            Contact Me
          </a>
        </div>
        
      </div>
      
      {/* Right: AI Chat Assistant (75%) */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-4 md:p-12 min-h-[500px]">
        <div className="w-full max-w-4xl">
          <AIChat panel={true} />
        </div>
      </div>
    </div>
  )
}

export default HomeSplit
