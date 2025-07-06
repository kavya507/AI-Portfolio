import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ParallaxCard from './ParallaxCard'

const funFacts = [
  '🌍 Traveled to 12+ countries and counting!',
  '🍣 Always on the hunt for the next amazing cuisine.',
  '📚 Love teaching math in creative, fun ways.',
  '🤖 Building smart things with AI is my jam!'
]

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const education = [
    {
      degree: "M.S., Computer Science",
      school: "George Mason University",
      year: "May 2023",
      description: "Specialized in Machine Learning and Artificial Intelligence"
    },
    {
      degree: "B.S., Computer Science", 
      school: "JNTUH, India",
      year: "May 2019",
      description: "Foundation in Computer Science and Software Engineering"
    }
  ]

  const highlights = [
    "Deep expertise in Natural Language Processing and Sentiment Analysis",
    "Experience with PyTorch, TensorFlow, and modern ML frameworks",
    "Proficient in Python, SQL, and data analysis tools",
    "Strong background in statistical modeling and predictive analytics",
    "Experience with cloud platforms and MLOps practices"
  ]

  return (
    <section id="about" className="section-padding bg-dark-800/50 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute -top-10 left-1/3 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-10 w-24 h-24 bg-primary-400/20 rounded-full blur-2xl z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="container-max relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">About Me</h2>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            Hi, I’m Kavya! I’m passionate about <span className="font-semibold text-primary-400">AI, travel, food, and teaching</span>.<br/>
            When I’m not building smart solutions, you’ll find me exploring new places, tasting unique cuisines, or making math fun for everyone!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-primary-400 flex items-center gap-2">
              <span role="img" aria-label="books">🎓</span> Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <ParallaxCard key={index} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="glass-effect p-6 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                      <span className="text-primary-400 text-sm font-medium">{edu.year}</span>
                    </div>
                    <p className="text-primary-300 font-medium mb-2">{edu.school}</p>
                    <p className="text-gray-400">{edu.description}</p>
                  </motion.div>
                </ParallaxCard>
              ))}
            </div>
          </motion.div>

          {/* Fun Facts & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-primary-400 flex items-center gap-2">
              <span role="img" aria-label="sparkles">✨</span> Fun Facts & What I Do
            </h3>
            <div className="space-y-4 mb-8">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">{fact.split(' ')[0]}</span>
                  <span className="text-gray-300">{fact.slice(2)}</span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">{highlight}</p>
                </motion.div>
              ))}
            </div>
            <ParallaxCard className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="mt-8 p-6 glass-effect rounded-lg"
              >
                <h4 className="text-lg font-semibold text-white mb-3">Current Focus</h4>
                <p className="text-gray-300 mb-4">
                  Currently, I’m diving deep into advanced NLP models, exploring the latest in large language models, and always looking for the next adventure—whether it’s a new AI project, a new country, or a new recipe!
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">NLP</span>
                  <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">Deep Learning</span>
                  <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">MLOps</span>
                  <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">AI Ethics</span>
                  <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">Travel</span>
                  <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">Foodie</span>
                  <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">Math Teaching</span>
                </div>
              </motion.div>
            </ParallaxCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 