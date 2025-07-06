import { motion } from 'framer-motion'

interface HeroProps {
  onAskAI?: () => void;
}

const floatingShapes = [
  { className: 'absolute top-10 left-10 w-16 h-16 bg-primary-500/30 rounded-full blur-2xl', delay: 0 },
  { className: 'absolute bottom-20 right-20 w-24 h-24 bg-primary-400/20 rounded-full blur-3xl', delay: 0.2 },
  { className: 'absolute top-1/2 left-1/3 w-10 h-10 bg-primary-600/20 rounded-full blur-xl', delay: 0.4 },
]

const Hero = ({ onAskAI }: HeroProps) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Animated floating shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={shape.className}
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: shape.delay }}
        />
      ))}

      {/* AI-generated memoji/avatar */}
      <motion.img
        src="/IMG_5240-modified.png"
        alt="Kavya's AI Avatar"
        className="w-40 h-40 rounded-full border-4 border-primary-400 shadow-xl mb-6 animate-float"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 2 }}
      />

      {/* Conversational intro */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold gradient-text mb-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ zIndex: 2 }}
      >
        Hey, I'm Kavya <span role="img" aria-label="wave">👋</span>
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-primary-200 mb-8 text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ zIndex: 2 }}
      >
        AI Engineer, explorer, foodie, and math enthusiast. I love building smart things, traveling the world, tasting new cuisines, and teaching mathematics in fun ways!
      </motion.p>

      {/* Playful Ask Me Anything button */}
      <motion.button
        onClick={onAskAI}
        className="ai-chat-btn px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-primary-500/40 transition-all duration-300 text-lg flex items-center gap-2 animate-glow"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
        style={{ zIndex: 2 }}
      >
        <span role="img" aria-label="robot">🤖</span> Ask Me Anything
      </motion.button>

      {/* Fun floating AI icons */}
      <motion.div
        className="absolute bottom-10 left-1/4 text-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ zIndex: 1 }}
      >
        <span role="img" aria-label="rocket">🚀</span>
      </motion.div>
      <motion.div
        className="absolute top-20 right-1/4 text-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ zIndex: 1 }}
      >
        <span role="img" aria-label="bulb">💡</span>
      </motion.div>
    </section>
  )
}

export default Hero 