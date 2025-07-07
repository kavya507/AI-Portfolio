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
      
      {/* Left: Intro (25%) */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-8 md:p-10 text-center relative z-10">
        <motion.img
          src="/IMG_5240-modified.png"
          alt="Kavya's AI Avatar"
          className="w-36 h-36 mb-6 animate-float"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <h1 className="text-3xl md:text-4xl font-extrabold gradient-text mb-2">Hey, I'm Kavya 👋</h1>
        <p className="text-lg text-primary-200 mb-4">AI Engineer, explorer, foodie, and math enthusiast.</p>

        <div className="flex flex-col items-start gap-2 mb-6 text-left">
          {funFacts.map((fact, i) => (
            <div key={i} className="text-sm md:text-base text-primary-300 flex gap-2">
              <span>{fact.split(' ')[0]}</span>
              <span>{fact.slice(2)}</span>
            </div>
          ))}
        </div>

        <p className="text-sm md:text-base text-gray-300 max-w-sm">
          I love building smart things, traveling the world, tasting new cuisines, and teaching mathematics in fun ways. Let’s explore the world of AI together!
        </p>
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
