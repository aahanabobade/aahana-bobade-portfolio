import { useState, useEffect, useRef, useCallback } from 'react'

// SYSTEM PROMPT

const SYSTEM_PROMPT = `You are Aahana Bobade's AI assistant in her VS Code-themed portfolio. Speak in a **friendly, natural, and professional tone**. Keep things concise, helpful, and slightly witty, like 1% humor sprinkled in. Avoid bragging or exaggeration. Only answer what the visitor asks. 

Add 1–3 punchlines in Gen-Z style occasionally when appropriate, without making it overwhelming. Avoid using dashes, keep sentences flowing naturally.

ABOUT:
Name: Aahana Bobade | Role: Junior Software Developer @ EduVanceAI | Location: India 🇮🇳
Email: aahanabobade@gmail.com
Bio: Developer at the crossroads of backend engineering, AI/ML, and data science. Builds intelligent, scalable systems. Makes data stories non-data people actually get.
Personal: Loves painting, photography, designing, editing, and playing keyboard. Big on integrity and authenticity.

EDUCATION:
- B.E. Computer Engineering — SIES GST, University of Mumbai (2021–2025), Minor: AI/ML, GPA: 9.28
- HSC — New Horizon Public School, Airoli | Class 12: 89.6% | Class 10: 91.8%

EXPERIENCE:
1. Junior Software Developer @ EduVanceAI, Mumbai (Aug 2025–Present): Led end-to-end development of an AI-powered Sales Copilot, transforming manual field visit planning into an autonomous system generating optimized 30-day visit schedules using route optimization (TSP), dealer intelligence, and contextual product recommendations. Prototyped and evaluated multiple GenAI experimentation frameworks covering prompt engineering, RAG optimization, agent workflows, and reasoning evaluation for enterprise LLM readiness. Built multilingual AI simulation chatbots for a GenAI LMS, enabling role-play based corporate training with contextual memory, adaptive conversations, and dynamic scenario progression across languages. Stack: FastAPI, Python, LangChain, RAG, GenAI, React, PostgreSQL, Docker, AWS
2. UX Designer @ Zepto Digital Labs, Thane (Jun–Aug 2023): Designed UI for a simulation platform using design thinking. Delivered research-backed improvements. Stack: Figma, UX Research, Prototyping
3. Back End Intern @ Laser Technologies Pvt Ltd, Navi Mumbai (Jun–Jul 2023): Managed backend systems and databases for enterprise web apps. Stack: Backend, SQL, Web Applications

PROJECTS:
1. Safe Yatra – Women's Safety App (2024–2025): Mobile app with 100% route tracking, voice-triggered emergency alerts, TensorFlow.js voice emotion recognition (70% distress detection). Won 1st Prize SIES GST Innovations 2025 + 1st Prize TechXter 2025. Tech: TensorFlow.js, Python, React Native, NLP. GitHub: https://github.com/aahanabobade/Women-safety-app
2. Gita-GPT (2023–2024): Web app suggesting Bhagavad Gita verses by emotion, Hume AI empathetic chatbot, 60% engagement boost. Won 1st Prize Cognition Fest 2023. Tech: TypeScript, Hume AI, LangChain, Next.js. GitHub: https://github.com/aahanabobade/gita-gpt
3. Smart Resource Tracker (2025): LRU Cache with TTL, FastAPI backend, React frontend. Tech: FastAPI, React, Python. GitHub: https://github.com/aahanabobade/smart-resource-tracker
4. Dockerized ML Prediction API (2025): Containerized ML with FastAPI + Docker. Tech: Docker, FastAPI, scikit-learn. GitHub: https://github.com/aahanabobade/Dockerized-ML-Prediction-API
5. AI Code Review Bot (2025): TypeScript bot for intelligent code feedback. GitHub: https://github.com/aahanabobade/ai-code-review-bot
6. API Health Monitor (2025): Dashboard tracking endpoint availability and response times. GitHub: https://github.com/aahanabobade/api-health-monitor

SKILLS: Python 92%, SQL 88%, FastAPI 90%, RAG Pipelines 85%, Prompt Engineering 90%, PyTorch 85%, scikit-learn 90%, React 80%, Docker 80%, TailwindCSS 85%, LangChain 82%, FAISS 82%

ACHIEVEMENTS:
- 🥇 1st Prize – Innovations Project Presentation, SIES GST 2025 (Safe Yatra)
- 🥇 1st Prize – TechXter Research Paper, SIES GST 2025 (Safe Yatra)
- 🥈 2nd Prize – CSI TechNext Research Paper, VIT 2024
- 🥇 1st Prize – Cognition Technical Fest, SIES GST 2023 (GitaGPT)

LINKS & CONTACT:
- 📧 Email: aahanabobade@gmail.com
- 💼 LinkedIn: https://linkedin.com/in/aahana-bobade (best for professional inquiries & collabs)
- 🐙 GitHub: https://github.com/aahanabobade (all open source projects live here)
- 📄 Resume: downloadable from the portfolio sidebar or at /Aahana_Bobade_Resume.pdf
- ☕ Support her work (international): https://buymeacoffee.com/aahanabobade
- 🇮🇳 Support via UPI (India, ₹1 onwards): UPI ID 9833588502@kotak811 — works on GPay, PhonePe, Paytm, any UPI app. No credit card needed!

RULES:
- When asked how to contact Aahana, ALWAYS share ALL options: email + LinkedIn + GitHub + resume. Never give just one.
- For professional opportunities or collabs → recommend LinkedIn first.
- For code/projects → recommend GitHub first.
- If someone asks how to support Aahana, mention BOTH: Buy Me a Coffee (international cards) AND UPI at 9833588502@kotak811 (India, from just ₹1 — perfect for students!).
- For resume: say download from sidebar or /Aahana_Bobade_Resume.pdf
- For unknown info: suggest aahanabobade@gmail.com
- Be proud of her achievements!
- Keep responses under 200 words unless detailed breakdown is requested
- Use markdown: **bold** for emphasis, numbered lists (1. 2. 3.) only for clear step-by-step sequences, and inline code for tech terms. Avoid bullet points and dashes entirely. Instead, write in short punchy paragraphs — 2 to 3 sentences max per paragraph. Let the response breathe naturally like a conversation, not a resume.`

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const FREE_LIMIT   = 5
const BONUS_LIMIT  = 2
const HARD_LIMIT   = FREE_LIMIT + BONUS_LIMIT
const COFFEE_URL   = 'https://www.buymeacoffee.com/aahanabobade'
const UPI_PA   = '9833588502@kotak811'
const UPI_NAME = 'Aahana%20Bobade'

const STORAGE_KEY  = 'aahana_copilot_count'

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const IconCopilot = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#6E40C9" opacity="0.18"/>
    <path d="M8 2.5C5.5 2.5 3.5 4.5 3.5 7c0 1.2.45 2.3 1.18 3.13.1.12.18.3.18.5V12a.5.5 0 00.5.5h5.28a.5.5 0 00.5-.5v-1.37c0-.2.07-.38.18-.5A4.48 4.48 0 0012.5 7c0-2.5-2-4.5-4.5-4.5z" fill="#6E40C9"/>
    <circle cx="6.2" cy="7" r=".95" fill="white"/>
    <circle cx="9.8" cy="7" r=".95" fill="white"/>
    <path d="M6.3 9.5c.45.35 1.05.55 1.7.55s1.25-.2 1.7-.55" stroke="white" strokeWidth=".8" strokeLinecap="round"/>
  </svg>
)
const IconClose   = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.749.749 0 011.275.326.749.749 0 01-.215.734L9.06 8l3.22 3.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8 9.06l-3.22 3.22a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/></svg>
const IconNewChat = () => <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"/></svg>
const IconSend    = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M1.724 1.053a.5.5 0 00-.714.545l1.403 4.85a.5.5 0 00.397.354l5.69.953c.268.053.268.437 0 .49l-5.69.953a.5.5 0 00-.397.354l-1.403 4.85a.5.5 0 00.714.545l13-6.5a.5.5 0 000-.894l-13-6.5z"/></svg>
const IconCopy    = () => <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/></svg>
const IconUp      = () => <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8.834.066C7.494-.087 6.5.86 6.5 1.75v1.77c0 .544-.153 1.077-.44 1.527L3.104 8.415A2.75 2.75 0 001.5 11v1.25C1.5 13.216 2.284 14 3.25 14h8.5c.966 0 1.75-.784 1.75-1.75v-1.25a2.75 2.75 0 00-1.603-2.584L9.5 8.418V6.248l1.803-.677A.75.75 0 0012 4.87V3.5a.75.75 0 00-.75-.75h-.5c-.966 0-1.75-.784-1.75-1.75 0-.207-.012-.41-.037-.61a.753.753 0 00-.129-.324z"/></svg>
const IconDown    = () => <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M7.166 15.934C8.506 16.087 9.5 15.14 9.5 14.25v-1.77c0-.544.153-1.077.44-1.527l2.956-4.372A2.75 2.75 0 0014.5 5v-1.25c0-.966-.784-1.75-1.75-1.75h-8.5C3.284 2 2.5 2.784 2.5 3.75V5a2.75 2.75 0 001.603 2.584L6.5 7.582v2.17l-1.803.677A.75.75 0 004 11.13V12.5c0 .414.336.75.75.75h.5c.966 0 1.75.784 1.75 1.75 0 .207.012.41.037.61a.752.752 0 00.129.324z"/></svg>
const IconSparkle = () => <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M7.5 1.5C7.5.672 8.172 0 9 0s1.5.672 1.5 1.5v.75h.75c.828 0 1.5.672 1.5 1.5S12.078 5.25 11.25 5.25H10.5V6c0 .828-.672 1.5-1.5 1.5S7.5 6.828 7.5 6v-.75h-.75C5.922 5.25 5.25 4.578 5.25 3.75S5.922 2.25 6.75 2.25H7.5V1.5z"/></svg>

// ─────────────────────────────────────────────────────────────────────────────
// DINO GAME
// ─────────────────────────────────────────────────────────────────────────────
function DinoGame({ onScoreUpdate }) {
  const canvasRef = useRef()
  const stateRef  = useRef({
    running: false, started: false,
    dino: { x: 40, y: 0, vy: 0, onGround: true, w: 20, h: 24 },
    cacti: [], score: 0, speed: 3.5, frame: 0, raf: null,
    groundY: 80,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    const S = stateRef.current

    S.dino.y = H - S.groundY - S.dino.h
    S.running = true

    const spawnCactus = () => {
      const h = 16 + Math.random() * 18
      const w = 10 + Math.random() * 8
      S.cacti.push({ x: W, y: H - S.groundY - h, w, h })
    }

    const jump = () => {
      if (!S.started) { S.started = true }
      if (S.dino.onGround) { S.dino.vy = -10; S.dino.onGround = false }
    }

    const onKey = (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump() } }
    const onTap = () => jump()

    canvas.addEventListener('click', onTap)
    window.addEventListener('keydown', onKey)

    const PIXEL = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(x, y, w, h) }

    const drawDino = (x, y, frame) => {
      const c = '#e8e8e8', lf = frame % 2
      PIXEL(x+4, y, 12, 4, c); PIXEL(x+2, y+4, 16, 4, c); PIXEL(x, y+8, 18, 4, c)
      PIXEL(x+2, y+12, 14, 4, c); PIXEL(x+4, y+16, 10, 4, c)
      PIXEL(x+14, y+2, 3, 3, '#1a1a2e')
      PIXEL(x-4, y+8, 6, 3, c); PIXEL(x-6, y+11, 4, 3, c)
      if (lf === 0) {
        PIXEL(x+4, y+20, 4, 4, c); PIXEL(x+10, y+20, 4, 4, c)
        PIXEL(x+4, y+24, 4, 2, c); PIXEL(x+12, y+20, 4, 2, c)
      } else {
        PIXEL(x+4, y+20, 4, 2, c); PIXEL(x+10, y+20, 4, 4, c)
        PIXEL(x+6, y+20, 4, 4, c); PIXEL(x+10, y+24, 4, 2, c)
      }
    }

    const drawCactus = (x, y, w, h) => {
      const c = '#4ec9b0'
      PIXEL(x+w/2-3, y, 6, h, c); PIXEL(x, y+h*0.3, w, 6, c)
      PIXEL(x, y+h*0.3, 4, h*0.3, c); PIXEL(x+w-4, y+h*0.4, 4, h*0.25, c)
    }

    const loop = () => {
      if (!S.running) return
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(0, H - S.groundY, W, 1)
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ;[[20,15],[60,8],[110,20],[150,5],[200,18],[250,10],[290,22],[320,7]].forEach(([sx,sy]) => ctx.fillRect(sx, sy, 2, 2))

      if (S.started) {
        S.frame++; S.score += 0.05; S.speed = 3.5 + S.score * 0.008
        onScoreUpdate && onScoreUpdate(Math.floor(S.score))
        S.dino.vy += 0.55; S.dino.y += S.dino.vy
        const groundLevel = H - S.groundY - S.dino.h
        if (S.dino.y >= groundLevel) { S.dino.y = groundLevel; S.dino.vy = 0; S.dino.onGround = true }
        if (S.frame % Math.max(60, 110 - Math.floor(S.score * 0.5)) === 0) spawnCactus()
        S.cacti = S.cacti.filter(c => c.x + c.w > 0)
        S.cacti.forEach(c => { c.x -= S.speed })
        const d = S.dino
        for (const c of S.cacti) {
          if (d.x+d.w-4 > c.x+2 && d.x+4 < c.x+c.w-2 && d.y+d.h-2 > c.y+2 && d.y+2 < c.y+c.h) {
            ctx.fillStyle = 'rgba(244,71,71,0.15)'; ctx.fillRect(0, 0, W, H)
            ctx.fillStyle = '#f44747'; ctx.font = '8px "Press Start 2P", monospace'; ctx.textAlign = 'center'
            ctx.fillText('GAME OVER', W/2, H/2 - 8)
            ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillText(`SCORE: ${Math.floor(S.score)}`, W/2, H/2 + 8)
            S.started = false; S.score = 0; S.speed = 3.5; S.cacti = []
            S.dino.y = groundLevel; S.dino.vy = 0; S.dino.onGround = true
            onScoreUpdate && onScoreUpdate(0)
            S.raf = requestAnimationFrame(loop); return
          }
        }
        S.cacti.forEach(c => drawCactus(c.x, c.y, c.w, c.h))
        drawDino(S.dino.x, S.dino.y, S.dino.onGround ? Math.floor(S.frame / 8) : 0)
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '7px "Press Start 2P", monospace'; ctx.textAlign = 'right'
        ctx.fillText(String(Math.floor(S.score)).padStart(5,'0'), W - 8, 16)
      } else {
        drawDino(S.dino.x, H - S.groundY - S.dino.h, 0)
        if (!S.cacti.length) {
          ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '7px "Press Start 2P", monospace'; ctx.textAlign = 'center'
          ctx.fillText('CLICK / SPACE TO JUMP', W/2, H/2 + 4)
        }
      }
      S.raf = requestAnimationFrame(loop)
    }

    S.raf = requestAnimationFrame(loop)
    return () => {
      S.running = false; cancelAnimationFrame(S.raf)
      canvas.removeEventListener('click', onTap); window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <canvas ref={canvasRef} width={340} height={110} style={{
      display: 'block', width: '100%', height: 'auto', background: '#0d0d1a',
      borderRadius: '6px', border: '2px solid rgba(110,64,201,0.4)',
      cursor: 'pointer', imageRendering: 'pixelated',
    }} />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COFFEE MODAL
// ─────────────────────────────────────────────────────────────────────────────
function CoffeeModal({ onUnlock }) {
  const [score, setScore] = useState(0)
  const unlocked = score >= 50

  return (
    <div className="cp-modal-overlay">
      <div className="cp-modal">
        <div className="cp-modal-header">
          <span className="cp-pixel-title">OUT OF TOKENS!</span>
          <div className="cp-pixel-lives">
            <span>♥</span><span>♥</span><span style={{opacity:.3}}>♥</span>
          </div>
        </div>
        <p className="cp-modal-sub">
          You've used your <span className="cp-pixel-highlight">{FREE_LIMIT} FREE MESSAGES</span>.<br/>
          Beat the dino game for +{BONUS_LIMIT} more, or support Aahana! ☕
        </p>
        <DinoGame onScoreUpdate={setScore} />
        <div className="cp-modal-score-row">
          <span className="cp-pixel-score">SCORE: {String(score).padStart(5,'0')}</span>
          {unlocked
            ? <span className="cp-pixel-unlocked">🎉 +{BONUS_LIMIT} MSGS UNLOCKED!</span>
            : <span className="cp-pixel-target">TARGET: 00050</span>
          }
        </div>
        {unlocked && (
          <button className="cp-modal-unlock-btn" onClick={onUnlock}>
            ▶ CONTINUE ({BONUS_LIMIT} msgs left)
          </button>
        )}
        <a href={COFFEE_URL} target="_blank" rel="noreferrer" className="cp-modal-coffee-btn">
          ☕ BUY AAHANA A COFFEE
        </a>
        {/* UPI QR + Copy

<div style={{width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'12px', display:'flex', flexDirection:'column', alignItems:'center', gap:8}}>
  <span style={{fontFamily:"'Press Start 2P',monospace", fontSize:7, color:'rgba(255,255,255,0.5)'}}>🇮🇳 PAY VIA ANY UPI APP</span>
  <img src="/upi-qr.png" alt="UPI QR Code" style={{width:140, height:140, borderRadius:6, background:'white', padding:4}} />
  <span style={{fontFamily:"'Press Start 2P',monospace", fontSize:7, color:'rgba(255,255,255,0.4)'}}>scan with GPay · PhonePe · Paytm · any app</span>
  <button onClick={() => navigator.clipboard.writeText('9833588502@kotak811')}
    style={{fontFamily:"'Press Start 2P',monospace", fontSize:7, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:5, color:'#75beff', cursor:'pointer', padding:'7px 14px'}}>
    📋 COPY UPI ID
  </button>
</div> */}
        <button className="cp-modal-skip" onClick={onUnlock}>
          skip &gt;&gt; (maybe later)
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKDOWN RENDERER
// ─────────────────────────────────────────────────────────────────────────────
function MD({ text }) {
  const codeRe = /```(\w*)\n?([\s\S]*?)```/g
  const parts  = []
  let last = 0, m
  while ((m = codeRe.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: 'txt', v: text.slice(last, m.index) })
    parts.push({ t: 'code', lang: m[1] || 'text', v: m[2] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ t: 'txt', v: text.slice(last) })

  const inline = (s) =>
    s.split(/(\*\*[^*]+\*\*|`[^`\n]+`)/g).map((seg, i) => {
      if (seg.startsWith('**') && seg.endsWith('**'))
        return <strong key={i} style={{ color: 'var(--bright,#fff)', fontWeight: 600 }}>{seg.slice(2,-2)}</strong>
      if (seg.startsWith('`') && seg.endsWith('`'))
        return <code key={i} className="cp-icode">{seg.slice(1,-1)}</code>
      return <span key={i}>{seg}</span>
    })

  const renderBlock = (raw, bi) => {
    const lines = raw.split('\n').filter(l => l.trim())
    const out   = []
    let bullets = [], numbered = []

    const flushBullets = () => {
      if (!bullets.length) return
      out.push(<ul key={`b${bi}-${out.length}`} className="cp-ul">
        {bullets.map((li, i) => (
          <li key={i} className="cp-li"><span className="cp-li-dot">▸</span><span>{inline(li)}</span></li>
        ))}
      </ul>)
      bullets = []
    }
    const flushNumbered = () => {
      if (!numbered.length) return
      out.push(<ol key={`n${bi}-${out.length}`} className="cp-ol">
        {numbered.map((li, i) => (
          <li key={i} className="cp-oli"><span className="cp-oli-num">{i+1}.</span><span>{inline(li)}</span></li>
        ))}
      </ol>)
      numbered = []
    }

    lines.forEach((line, i) => {
      const t = line.trim()
      if (/^[-•*]\s+/.test(t)) { flushNumbered(); bullets.push(t.replace(/^[-•*]\s+/, '')) }
      else if (/^\d+\.\s+/.test(t)) { flushBullets(); numbered.push(t.replace(/^\d+\.\s+/, '')) }
      else { flushBullets(); flushNumbered(); out.push(<p key={i} className="cp-p">{inline(t)}</p>) }
    })
    flushBullets(); flushNumbered()
    return out
  }

  return (
    <div className="cp-md">
      {parts.map((p, i) =>
        p.t === 'code' ? (
          <div key={i} className="cp-code">
            <div className="cp-code-head">
              <span className="cp-code-lang">{p.lang}</span>
              <button className="cp-code-copy" onClick={() => navigator.clipboard.writeText(p.v.trim())}>
                <IconCopy /> Copy
              </button>
            </div>
            <pre className="cp-code-pre">{p.v.trim()}</pre>
          </div>
        ) : renderBlock(p.v, i)
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AVATARS & TYPING
// ─────────────────────────────────────────────────────────────────────────────
const UserAvatar = () => (
  <div className="cp-user-av" title="You">
    <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/>
    </svg>
  </div>
)
const AahanaAvatar = () => <div className="cp-asst-av" title="Aahana's Copilot"><IconCopilot size={11} /></div>
const TypingDots   = () => (
  <div className="cp-typing">
    <AahanaAvatar />
    <div className="cp-dots"><span/><span/><span/></div>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// WELCOME SCREEN
// ─────────────────────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Tell me about Aahana?",
  "What projects has Aahana built?",
  "Tell me about her work experience",
  "What's her tech stack?",
  "What is she working on now?",
  "How can I contact Aahana?",
]

const WelcomeScreen = ({ onSuggest }) => (
  <div className="cp-welcome">
    <div className="cp-welcome-av"><IconCopilot size={28} /></div>
    <p className="cp-welcome-title">Hi! I'm Aahana's Copilot 👋</p>
    <p className="cp-welcome-sub">Ask me anything about her projects, skills, experience, or achievements.</p>
    <div className="cp-sug-grid">
      {SUGGESTIONS.map(s => (
        <button key={s} className="cp-sug-card" onClick={() => onSuggest(s)}>
          <IconSparkle /><span>{s}</span>
        </button>
      ))}
    </div>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// ASSISTANT MESSAGE
// ─────────────────────────────────────────────────────────────────────────────
function AsstMsg({ text, streaming }) {
  const [liked,    setLiked]    = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [copied,   setCopied]   = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="cp-asst-row">
      <AahanaAvatar />
      <div className="cp-asst-body">
        <div className="cp-asst-label">
          Aahana's Copilot <span className="cp-badge"></span>
        </div>
        <div className="cp-bubble-asst">
          <MD text={text} />
          {streaming && <span className="cp-cursor"/>}
        </div>
        {!streaming && (
          <div className="cp-acts">
            <button className={`cp-act ${liked ? 'cp-act--up' : ''}`} onClick={() => { setLiked(v=>!v); setDisliked(false) }} title="Good"><IconUp /></button>
            <button className={`cp-act ${disliked ? 'cp-act--dn' : ''}`} onClick={() => { setDisliked(v=>!v); setLiked(false) }} title="Bad"><IconDown /></button>
            <button className="cp-act" onClick={copy} title="Copy">
              <IconCopy /> {copied && <span style={{fontSize:10,marginLeft:2}}>Copied!</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function CopilotChat({ onClose }) {
  const [messages,    setMessages]    = useState([])
  const [input,       setInput]       = useState('')
  const [loading,     setLoading]     = useState(false)
  const [streamingId, setStreamingId] = useState(null)
  const [streamText,  setStreamText]  = useState({})
  const [msgCount,    setMsgCount]    = useState(() => {
    try { return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10) } catch { return 0 }
  })
  const [showModal,   setShowModal]   = useState(false)
  const [unlocked,    setUnlocked]    = useState(false)
  const [error,       setError]       = useState(null)

  const bottomRef   = useRef()
  const textareaRef = useRef()
  const abortRef    = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamText, loading])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(msgCount)) } catch {}
  }, [msgCount])

  const clearChat = () => {
    abortRef.current?.abort()
    setMessages([]); setStreamText({})
    setStreamingId(null); setLoading(false)
    setError(null); setShowModal(false)
  }

  const send = useCallback(async (text) => {
    const t = text.trim()
    if (!t || loading) return

    const newCount = msgCount + 1
    setMsgCount(newCount)

    if (newCount > FREE_LIMIT && !unlocked) { setShowModal(true); return }
    if (newCount > HARD_LIMIT) { setShowModal(true); return }

    const userMsg = { id: Date.now(), role: 'user', content: t }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setLoading(true); setError(null)

    const asstId = Date.now() + 1
    setMessages(prev => [...prev, { id: asstId, role: 'assistant', content: '' }])
    setStreamText(s => ({ ...s, [asstId]: '' }))
    setStreamingId(asstId)
    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        signal: abortRef.current.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          stream: false,
          max_tokens: 1024,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      })

      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        throw new Error(e?.error || `Error ${res.status}`)
      }

      const data = await res.json()
      const full = data.choices?.[0]?.message?.content || ''

      setMessages(prev => prev.map(m => m.id === asstId ? { ...m, content: full } : m))
      setStreamText(s => ({ ...s, [asstId]: full }))
      setStreamingId(null)

    } catch (err) {
      if (err.name === 'AbortError') return
      setError('Something went wrong — please try again.')
      setMessages(prev => prev.filter(m => m.id !== asstId))
      setStreamingId(null)
    } finally {
      setLoading(false)
    }
  }, [loading, messages, msgCount, unlocked])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  const cap       = unlocked ? HARD_LIMIT : FREE_LIMIT
  const remaining = Math.max(0, cap - msgCount)
  const showCountdown = remaining <= 2 && remaining > 0 && messages.length > 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .cp-root {
          display: flex; flex-direction: column;
          height: 100%; max-height: 100%;
          background: var(--bg,#1e1e1e);
          font-family: -apple-system,"Segoe UI",system-ui,sans-serif;
          font-size: 13px; color: var(--text,#ccc);
          overflow: hidden; position: relative;
        }
        .cp-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 10px; height: 36px; flex-shrink: 0;
          background: var(--bg2,#252526); border-bottom: 1px solid var(--border,#2d2d2d);
        }
        .cp-header-l { display: flex; align-items: center; gap: 7px; }
        .cp-header-title { font-size: 11.5px; font-weight: 600; color: var(--text,#ccc); }
        .cp-header-r { display: flex; gap: 1px; }
        .cp-hbtn {
          background: transparent; border: none; color: var(--dim,#858585);
          cursor: pointer; width: 26px; height: 26px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center; transition: all .12s;
        }
        .cp-hbtn:hover { background: rgba(255,255,255,.08); color: var(--text,#ccc); }
        .cp-ctx {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 10px; flex-shrink: 0;
          border-bottom: 1px solid var(--border,#2d2d2d);
          background: rgba(255,255,255,.015);
        }
        .cp-ctx-lbl { font-size: 10px; color: var(--dim,#666); text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }
        .cp-ctx-pill {
          display: inline-flex; align-items: center; gap: 4px;
          background: rgba(0,122,204,.1); border: 1px solid rgba(0,122,204,.25);
          border-radius: 4px; padding: 2px 8px; font-size: 11px; color: #75beff;
        }
        .cp-ctx-dot { width: 5px; height: 5px; border-radius: 50%; background: #75beff; opacity: .7; }
        .cp-msgs {
          flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden;
          padding: 8px 0 4px;
          scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.08) transparent;
        }
        .cp-msgs::-webkit-scrollbar { width: 4px; }
        .cp-msgs::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 3px; }
        .cp-welcome {
          display: flex; flex-direction: column; align-items: center;
          padding: 20px 14px 8px; gap: 5px; animation: cp-in .22s ease;
        }
        .cp-welcome-av {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(110,64,201,.15); border: 1.5px solid rgba(110,64,201,.35);
          display: flex; align-items: center; justify-content: center; margin-bottom: 4px;
        }
        .cp-welcome-title { font-size: 14px; font-weight: 700; color: var(--bright,#fff); margin: 0; }
        .cp-welcome-sub { font-size: 11.5px; color: var(--dim,#858585); margin: 0 0 8px; text-align: center; line-height: 1.55; max-width: 240px; }
        .cp-sug-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; width: 100%; }
        .cp-sug-card {
          display: flex; align-items: flex-start; gap: 5px;
          background: rgba(255,255,255,.025); border: 1px solid var(--border,#2d2d2d);
          border-radius: 7px; padding: 8px 9px; font-size: 11.5px; color: var(--dim,#858585);
          cursor: pointer; text-align: left; font-family: inherit; line-height: 1.35; transition: all .12s;
        }
        .cp-sug-card:hover { background: rgba(110,64,201,.12); border-color: rgba(110,64,201,.35); color: var(--text,#ccc); }
        .cp-sug-card svg { flex-shrink: 0; margin-top: 2px; color: #6E40C9; }
        .cp-user-av {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg,#007acc,#0050a0);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: white; margin-top: 1px;
        }
        .cp-asst-av {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          background: rgba(110,64,201,.2); border: 1px solid rgba(110,64,201,.4);
          display: flex; align-items: center; justify-content: center; margin-top: 1px;
        }
        .cp-user-row {
          display: flex; justify-content: flex-end; align-items: flex-start;
          gap: 7px; padding: 3px 10px; animation: cp-in .18s ease;
        }
        .cp-bubble-user {
          max-width: 82%; background: rgba(0,122,204,.14);
          border: 1px solid rgba(0,122,204,.22); border-radius: 10px 10px 2px 10px;
          padding: 7px 11px; font-size: 13px; color: var(--text,#ccc);
          line-height: 1.5; word-break: break-word;
        }
        .cp-asst-row { display: flex; align-items: flex-start; gap: 8px; padding: 4px 10px; animation: cp-in .18s ease; }
        .cp-asst-body { flex: 1; min-width: 0; }
        .cp-asst-label {
          font-size: 10.5px; font-weight: 600; color: var(--dim,#858585);
          margin-bottom: 4px; display: flex; align-items: center; gap: 5px;
        }
        .cp-badge { font-size: 9px; background: rgba(110,64,201,.2); color: #b48eff; border-radius: 3px; padding: 0 4px; }
        .cp-bubble-asst {
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
          border-radius: 2px 10px 10px 10px; padding: 9px 11px;
        }
        .cp-md { line-height: 1.6; }
        .cp-p { margin: 0 0 5px; color: var(--text,#ccc); font-size: 13px; }
        .cp-p:last-child { margin-bottom: 0; }
        .cp-ul { margin: 4px 0 7px; padding: 0; list-style: none; }
        .cp-li { display: flex; gap: 7px; margin: 3px 0; font-size: 13px; color: var(--text,#ccc); align-items: flex-start; }
        .cp-li-dot { color: #6E40C9; flex-shrink: 0; font-size: 9px; margin-top: 4px; }
        .cp-ol { margin: 4px 0 7px; padding: 0; list-style: none; }
        .cp-oli { display: flex; gap: 7px; margin: 4px 0; font-size: 13px; color: var(--text,#ccc); align-items: flex-start; }
        .cp-oli-num { color: #6E40C9; font-weight: 700; flex-shrink: 0; min-width: 16px; font-size: 12px; }
        .cp-icode { font-family:"Cascadia Code",Consolas,monospace; font-size:11.5px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); border-radius:3px; padding:0 4px; color:#ce9178; }
        .cp-cursor { display:inline-block; width:2px; height:13px; background:#6E40C9; vertical-align:text-bottom; margin-left:1px; border-radius:1px; animation:cp-blink .7s infinite; }
        .cp-code { background:#0d0d0d; border:1px solid rgba(255,255,255,.09); border-radius:6px; overflow:hidden; margin:6px 0; }
        .cp-code-head { display:flex; align-items:center; justify-content:space-between; padding:4px 10px; background:rgba(255,255,255,.04); border-bottom:1px solid rgba(255,255,255,.06); }
        .cp-code-lang { font-family:Consolas,monospace; font-size:10px; color:var(--dim,#858585); text-transform:uppercase; letter-spacing:.06em; }
        .cp-code-copy { display:flex; align-items:center; gap:3px; background:transparent; border:none; color:var(--dim,#858585); font-size:11px; font-family:inherit; cursor:pointer; padding:2px 6px; border-radius:3px; transition:all .1s; }
        .cp-code-copy:hover { background:rgba(255,255,255,.08); color:var(--text,#ccc); }
        .cp-code-pre { margin:0; padding:10px 14px; font-family:"Cascadia Code",Consolas,monospace; font-size:12px; line-height:1.65; color:#d4d4d4; overflow-x:auto; white-space:pre; }
        .cp-acts { display:flex; gap:2px; margin-top:5px; }
        .cp-act { background:transparent; border:none; color:#4a4a4a; cursor:pointer; padding:3px 5px; border-radius:3px; display:flex; align-items:center; gap:3px; font-size:11px; font-family:inherit; transition:all .1s; }
        .cp-act:hover { background:rgba(255,255,255,.07); color:var(--text,#ccc); }
        .cp-act--up { color:#4ec9b0!important; }
        .cp-act--dn { color:#f44747!important; }
        .cp-typing { display:flex; align-items:center; gap:8px; padding:5px 10px; animation:cp-in .15s ease; }
        .cp-dots { display:flex; gap:4px; }
        .cp-dots span { width:6px; height:6px; border-radius:50%; background:#6E40C9; animation:cp-bounce 1.1s infinite; }
        .cp-dots span:nth-child(2) { animation-delay:.18s; }
        .cp-dots span:nth-child(3) { animation-delay:.36s; }
        .cp-err { margin:4px 10px; padding:8px 11px; background:rgba(244,71,71,.08); border:1px solid rgba(244,71,71,.2); border-radius:6px; font-size:12px; color:#f88; }
        .cp-countdown { text-align:center; padding:3px 10px; font-size:10.5px; color:#fbbf24; border-top:1px solid var(--border,#2d2d2d); flex-shrink:0; }
        .cp-chips { padding:5px 8px; display:flex; flex-wrap:wrap; gap:4px; border-top:1px solid var(--border,#2d2d2d); flex-shrink:0; }
        .cp-chip { display:inline-flex; align-items:center; gap:4px; background:transparent; border:1px solid var(--border,#333); border-radius:10px; padding:2px 9px; font-size:11px; color:var(--dim,#858585); cursor:pointer; font-family:inherit; transition:all .1s; }
        .cp-chip:hover { background:rgba(110,64,201,.1); color:var(--text,#ccc); border-color:rgba(110,64,201,.4); }
        .cp-input-area { padding:6px 8px 6px; border-top:1px solid var(--border,#2d2d2d); flex-shrink:0; }
        .cp-input-box { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); border-radius:9px; overflow:hidden; transition:border-color .15s; }
        .cp-input-box:focus-within { border-color:rgba(110,64,201,.55); box-shadow:0 0 0 3px rgba(110,64,201,.08); }
        .cp-textarea { width:100%; background:transparent; border:none; outline:none; color:var(--text,#ccc); font-family:inherit; font-size:13px; padding:9px 11px 3px; resize:none; min-height:34px; max-height:100px; line-height:1.5; caret-color:#6E40C9; }
        .cp-textarea::placeholder { color:var(--dim,#444); }
        .cp-textarea:disabled { opacity:.4; cursor:not-allowed; }
        .cp-toolbar { display:flex; align-items:center; padding:3px 7px 5px; gap:4px; }
        .cp-toolbar-info { font-size:10px; color:var(--dim,#444); }
        .cp-send { margin-left:auto; width:28px; height:28px; border-radius:6px; background:linear-gradient(135deg,#6E40C9,#4a2d8e); border:none; color:white; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .12s; flex-shrink:0; box-shadow:0 2px 8px rgba(110,64,201,.3); }
        .cp-send:hover:not(:disabled) { background:linear-gradient(135deg,#7c52d4,#5a3d9e); transform:translateY(-1px); box-shadow:0 4px 12px rgba(110,64,201,.4); }
        .cp-send:disabled { opacity:.3; cursor:not-allowed; transform:none; box-shadow:none; }
        .cp-disclaimer { text-align:center; font-size:10px; color:var(--dim,#3a3a3a); margin:3px 0 0; }
        .cp-modal-overlay {
          position: absolute; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center;
          padding: 12px; animation: cp-in .2s ease; backdrop-filter: blur(4px);
        }
        .cp-modal {
          background: #0d0d1a; border: 2px solid rgba(110,64,201,.6); border-radius: 10px;
          padding: 18px 16px; width: 100%; max-width: 360px;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          box-shadow: 0 0 40px rgba(110,64,201,.25), 0 0 80px rgba(110,64,201,.1);
        }
        .cp-modal-header { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .cp-pixel-title { font-family: 'Press Start 2P', monospace; font-size: 11px; color: #ff4444; text-shadow: 2px 2px 0 #800, 0 0 10px rgba(255,68,68,.4); letter-spacing: .05em; }
        .cp-pixel-lives { font-family: 'Press Start 2P', monospace; font-size: 12px; color: #ff4444; display: flex; gap: 3px; }
        .cp-modal-sub { font-family: 'Press Start 2P', monospace; font-size: 7px; color: rgba(255,255,255,.55); text-align: center; line-height: 1.9; margin: 0; }
        .cp-pixel-highlight { color: #fbbf24; }
        .cp-modal-score-row { display: flex; align-items: center; justify-content: space-between; width: 100%; font-family: 'Press Start 2P', monospace; font-size: 8px; }
        .cp-pixel-score { color: rgba(255,255,255,.5); }
        .cp-pixel-target { color: #f44747; }
        .cp-pixel-unlocked { color: #4ec9b0; animation: cp-blink .8s infinite; }
        .cp-modal-unlock-btn { font-family: 'Press Start 2P', monospace; font-size: 9px; background: linear-gradient(135deg,#4ec9b0,#22a891); color: #0d0d1a; border: none; border-radius: 5px; padding: 10px 20px; cursor: pointer; width: 100%; letter-spacing: .05em; transition: opacity .12s; text-shadow: none; box-shadow: 0 0 12px rgba(78,201,176,.4); }
        .cp-modal-unlock-btn:hover { opacity: .88; }
        .cp-modal-coffee-btn { display: block; width: 100%; text-align: center; font-family: 'Press Start 2P', monospace; font-size: 8px; background: linear-gradient(135deg,#f59e0b,#e07b0a); color: #0d0d1a; border: none; border-radius: 5px; padding: 10px 16px; cursor: pointer; text-decoration: none; letter-spacing: .04em; box-shadow: 0 0 12px rgba(245,158,11,.35); transition: opacity .12s; }
        .cp-modal-coffee-btn:hover { opacity: .88; }
        .cp-modal-upi-btn { display: block; width: 100%; text-align: center; font-family: 'Press Start 2P', monospace; font-size: 8px; background: linear-gradient(135deg,#1a73e8,#0d47a1); color: white; border: none; border-radius: 5px; padding: 10px 16px; cursor: pointer; text-decoration: none; letter-spacing: .04em; box-shadow: 0 0 12px rgba(26,115,232,.35); transition: opacity .12s; }
        .cp-modal-upi-btn:hover { opacity: .88; }
        .cp-modal-skip { font-family: 'Press Start 2P', monospace; font-size: 7px; background: transparent; border: none; color: rgba(255,255,255,.25); cursor: pointer; text-decoration: underline; letter-spacing: .03em; padding: 0; }
        .cp-modal-skip:hover { color: rgba(255,255,255,.5); }

        @keyframes cp-in { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cp-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes cp-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
      `}</style>

      <div className="cp-root">
        {showModal && (
          <CoffeeModal onUnlock={() => { setShowModal(false); setUnlocked(true) }} />
        )}

        <div className="cp-header">
          <div className="cp-header-l">
            <IconCopilot size={15} />
            <span className="cp-header-title">Aahana's AI Assistant</span>
          </div>
          <div className="cp-header-r">
            <button className="cp-hbtn" title="New chat" onClick={clearChat}><IconNewChat /></button>
            <button className="cp-hbtn" title="Close" onClick={onClose}><IconClose /></button>
          </div>
        </div>

        <div className="cp-ctx">
          <span className="cp-ctx-lbl">Workspace</span>
          <div className="cp-ctx-pill">
            <span className="cp-ctx-dot"/>
            portfolio · aahana-bobade
          </div>
        </div>

        <div className="cp-msgs">
          {messages.length === 0
            ? <WelcomeScreen onSuggest={send} />
            : messages.map(msg =>
                msg.role === 'user' ? (
                  <div key={msg.id} className="cp-user-row">
                    <div className="cp-bubble-user">{msg.content}</div>
                    <UserAvatar />
                  </div>
                ) : (
                  <AsstMsg
                    key={msg.id}
                    text={streamText[msg.id] !== undefined ? streamText[msg.id] : msg.content}
                    streaming={streamingId === msg.id}
                  />
                )
              )
          }
          {loading && streamingId === null && <TypingDots />}
          {error && <div className="cp-err">⚠️ {error}</div>}
          <div ref={bottomRef} />
        </div>

        {showCountdown && (
          <div className="cp-countdown">
            ⚡ {remaining} message{remaining !== 1 ? 's' : ''} left —{' '}
            <a href={COFFEE_URL} target="_blank" rel="noreferrer" style={{color:'#f59e0b',textDecoration:'underline'}}>
              support Aahana
            </a>!
          </div>
        )}

        {messages.length > 0 && messages.length <= 2 && !loading && (
          <div className="cp-chips">
            {SUGGESTIONS.slice(0,4).map(s => (
              <button key={s} className="cp-chip" onClick={() => send(s)}>
                <IconSparkle/>{s.length > 26 ? s.slice(0,25)+'…' : s}
              </button>
            ))}
          </div>
        )}

        <div className="cp-input-area">
          <div className="cp-input-box">
            <textarea
              ref={textareaRef}
              className="cp-textarea"
              rows={1}
              placeholder="Ask about Aahana's projects, experience, skills…"
              value={input}
              disabled={loading}
              onChange={e => {
                setInput(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
              }}
              onKeyDown={handleKey}
            />
            <div className="cp-toolbar">
              <span className="cp-toolbar-info">
                {remaining} msg{remaining !== 1 ? 's' : ''} left
              </span>
              <button
                className="cp-send"
                disabled={!input.trim() || loading}
                onClick={() => send(input)}
                title="Send (Enter)"
              >
                <IconSend/>
              </button>
            </div>
          </div>
          <p className="cp-disclaimer">AI can make mistakes · Contact Aahana directly for important info</p>
        </div>
      </div>
    </>
  )
}