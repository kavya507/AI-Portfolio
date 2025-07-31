/* --------------------------------------------------------------------------
   AIChat.tsx  –  profile card + corrected SKILLS card colors
-------------------------------------------------------------------------- */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ---------- message type ---------- */
interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  type?: 'profile' | 'skills'
}

interface AIChatProps {
  onClose?: () => void
  panel?: boolean
}

/* ---------- quick actions ---------- */
const quickActions = [
  { label: 'Me',       icon: '😀', question: 'Tell me about Kavya.' },
  { label: 'Projects', icon: '💼', question: 'Show me some of Kavya’s projects.' },
  { label: 'Skills',   icon: '🗂️', question: 'What are Kavya’s main skills?' },
  { label: 'Fun',      icon: '🎉', question: 'Share a fun fact about Kavya!' },
  { label: 'Contact',  icon: '🔍', question: 'How can I contact Kavya?' },
]

/* ---------- helper bubble ---------- */
const Bubble = ({
  isUser,
  children,
}: {
  isUser: boolean
  children: React.ReactNode
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
  >
    {children}
  </motion.div>
)

/* -------------------------------------------------------------------------- */
const AIChat = ({ onClose, panel = false }: AIChatProps) => {
  /* state */
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Kavya's AI assistant. Ask me anything about her work, projects, or AI.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputVal, setInputVal] = useState('')
  const [isLoading, setLoading] = useState(false)
  const msgEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* ------------------------------------------------------------------ */
  /*                             sendMessage                            */
  /* ------------------------------------------------------------------ */
  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    const user: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((p) => [...p, user])
    setInputVal('')
    setLoading(true)

    try {
      const res = await fetch(
        'https://kavyabaltha.netlify.app/.netlify/functions/chat',
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text.trim() }) },
      )
      if (!res.ok || !res.body) throw new Error('network error')

      const reader  = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let acc = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        decoder.decode(value, { stream: true })
          .split('\n')
          .filter((l) => l.startsWith('data:'))
          .forEach((line) => {
            const json = line.replace(/^data:\s*/, '')
            if (json === '[DONE]') return
            try {
              acc += JSON.parse(json).content ?? ''
              setMessages((p) => [
                ...p.slice(0, -1),
                { id: 'ai-' + Date.now(), text: acc, isUser: false, timestamp: new Date() },
              ])
            } catch {}
          })
      }
    } catch {
      setMessages((p) => [...p, { id: 'err', text: 'Oops, something went wrong.', isUser: false, timestamp: new Date() }])
    } finally {
      setLoading(false)
    }
  }

  /* quick actions */
  const onQuick = (q: string) => {
    if (q === 'Tell me about Kavya.') {
      setMessages((p) => [...p, { id: 'profile-' + Date.now(), text: '', isUser: false, timestamp: new Date(), type: 'profile' }])
      return
    }
    if (q === 'What are Kavya’s main skills?') {
      setMessages((p) => [...p, { id: 'skills-' + Date.now(), text: '', isUser: false, timestamp: new Date(), type: 'skills' }])
      return
    }
    sendMessage(q)
  }

  /* skills data */
  const skillsData = [
    {
      icon: '•',
      label: 'Languages & Frameworks',
      tags: ['Python', 'SQL', 'JavaScript', 'PyTorch', 'TensorFlow', 'Hugging Face', 'FastAPI'],
    },
    {
      icon: '•',
      label: 'Tools',
      tags: ['Docker', 'Kubernetes', 'MLflow', 'Weights & Biases', 'GitHub', 'Airflow'],
    },
    {
      icon: '•',
      label: 'GenAI & MLOps',
      tags: ['LLaMA 2', 'OpenAI', 'QLoRA', 'RAG', 'LangChain', 'Google ADK',
        'AI Agents',
        'Prompt engineering',
        'Vector databases (Chroma, Pinecone)',
        'Hugging Face Transformers'
      ],
    },
  ]

  /* renderer */
  const renderMessage = (m: Message) => {
    /* profile card */
    if (m.type === 'profile') {
      return (
        <Bubble isUser={false}>
          <div className="w-full flex items-center gap-6 bg-gray-50 p-4 rounded-lg text-gray-900">
            <img src="/kavya.png" alt="Kavya" className="w-50 h-40 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="text-2xl font-bold mb-1">Kavya Baltha</p>
              {/* <p className="text-base text-gray-500 mb-2">AI Engineer • Explorer • Math Enthusiast</p> */}
              <div className="flex flex-wrap gap-2 mb-2">
                {['AI Engineer', 'Traveler', 'Math Lover'].map((t) => (
                  <span key={t} className="bg-gray-200 rounded-full px-2 py-0.5 text-xs">{t}</span>
                ))}
              </div>
              <p className="text-sm mb-1">Hey 👋 I’m Kavya. I love building smart things, traveling, tasting new cuisines and teaching math in creative ways!</p>
              <p className="text-xs text-gray-500 italic">Currently building AI tools and exploring new tech. Let’s collaborate!</p>
            </div>
          </div>
        </Bubble>
      )
    }

    /* skills card */
    if (m.type === 'skills') {
      return (
        <Bubble isUser={false}>
          <div className="w-full bg-gray-50 p-5 rounded-lg space-y-6 text-gray-900">
            {skillsData.map((grp) => (
              <div key={grp.label}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{grp.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{grp.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {grp.tags.map((tag) => (
                    <span key={tag} className="bg-black text-white rounded-lg px-4 py-1 text-xs font-medium whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Bubble>
      )
    }

    /* plain text */
    const cls = m.isUser ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'
    return (
      <Bubble isUser={m.isUser}>
        <div className={`max-w-[80%] p-3 rounded-lg ${cls}`}>
          <p className="text-sm whitespace-pre-line">{m.text}</p>
          <p className="text-[10px] opacity-60 mt-1">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </Bubble>
    )
  }

  /* chat window  */
  const ChatUI = (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>{messages.map(renderMessage)}</AnimatePresence>
        {isLoading && (
          <Bubble isUser={false}>
            <div className="bg-gray-900 p-3 rounded-lg flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 bg-gray-50 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </Bubble>
        )}
        <div ref={msgEndRef} />
      </div>

      {/* quick actions */}
      <div className="flex justify-center gap-1 px-3 pb-2">
        {quickActions.map((a) => (
          <button
          key={a.label}
          onClick={() => onQuick(a.question)}
          className="flex items-center justify-center bg-white border border-black-200 rounded-md px-2 py-1 shadow-sm hover:bg-primary-50 min-w-[60px] h-[30px]"
        >
          <div className="flex items-center gap-1 text-xs font-medium text-black">
            <span>{a.icon}</span>
            <span>{a.label}</span>
          </div>
        </button>
        
        ))}
      </div>

      {/* input */}
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(inputVal) }} className="p-3 pt-1 flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="w-full pl-5 pr-12 py-3 rounded-full bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <motion.button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 hover:bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center disabled:bg-gray-300"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </form>
    </>
  )

  /* shells */
  if (panel) {
    return (
      <div className="bg-white/90 rounded-2xl shadow-xl w-full h-[600px] flex flex-col border border-gray-200">
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <div className="w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 21v-1M6.636 18.364l.707-.707" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">Kavya's AI Assistant</span>
        </div>
        {ChatUI}
      </div>
    )
  }

  /* modal */
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-dark-800 rounded-2xl shadow-2xl w-full max-w-xl h-[650px] flex flex-col text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 21v-1M6.636 18.364l.707-.707" />
              </svg>
            </div>
            <span className="font-semibold">AI Assistant</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        {ChatUI}
      </motion.div>
    </motion.div>
  )
}

export default AIChat
