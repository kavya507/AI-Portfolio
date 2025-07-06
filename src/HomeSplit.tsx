import AIChat from './components/AIChat'
import { useState } from 'react'
import { motion } from 'framer-motion'

const funFacts = [
  '🌍 Traveled to 12+ countries and counting!',
  '🍣 Food explorer & cuisine lover',
  '📚 Loves teaching math in creative ways',
  '🤖 Building smart things with AI',
]

const HomeSplit = () => {
  const [chatOpen, setChatOpen] = useState(true)
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Left: Intro */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 text-center relative z-10">
        <motion.img
          src="/IMG_5240-modified.png"
          alt="Kavya's AI Avatar"
          className="w-40 h-40 rounded-full border-4 border-primary-400 shadow-xl mb-6 animate-float"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">Hey, I'm Kavya 👋</h1>
        <p className="text-xl text-primary-200 mb-4">AI Engineer, explorer, foodie, and math enthusiast.</p>
        <div className="flex flex-col items-center gap-2 mb-6">
          {funFacts.map((fact, i) => (
            <div key={i} className="text-base text-primary-300 flex items-center gap-2">
              <span>{fact.split(' ')[0]}</span>
              <span>{fact.slice(2)}</span>
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-300 max-w-md mx-auto">
          I love building smart things, traveling the world, tasting new cuisines, and teaching mathematics in fun ways. Let’s explore the world of AI together!
        </p>
      </div>
      {/* Right: AI Chat Assistant */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-0 md:p-8 min-h-[500px]">
        <div className="w-full max-w-xl">
          <AIChat panel={true} />
        </div>
      </div>
    </div>
  )
}

export default HomeSplit 