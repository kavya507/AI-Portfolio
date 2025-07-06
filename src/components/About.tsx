import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
    <section id="about" className="section-padding bg-dark-800/50">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate AI Engineer with expertise in machine learning, natural language processing, and data science. 
            I love building intelligent solutions that solve real-world problems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-primary-400">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
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
              ))}
            </div>
          </motion.div>

          {/* Skills & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-primary-400">What I Do</h3>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">{highlight}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 p-6 glass-effect rounded-lg"
            >
              <h4 className="text-lg font-semibold text-white mb-3">Current Focus</h4>
              <p className="text-gray-300 mb-4">
                I'm currently focused on developing advanced NLP models and exploring the latest 
                developments in large language models and AI applications.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">NLP</span>
                <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">Deep Learning</span>
                <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">MLOps</span>
                <span className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">AI Ethics</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 