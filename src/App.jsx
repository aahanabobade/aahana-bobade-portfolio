import { useState, useEffect, useCallback, useRef } from 'react'
import { useTheme, THEMES } from './hooks/useTheme'

import TitleBar       from './components/TitleBar'
import MenuBar        from './components/MenuBar'
import ActivityBar    from './components/ActivityBar'
import Sidebar        from './components/Sidebar'
import TabBar         from './components/TabBar'
import Breadcrumb     from './components/Breadcrumb'
import Terminal       from './components/Terminal'
import StatusBar      from './components/StatusBar'
import CommandPalette from './components/CommandPalette'
import ToastContainer from './components/Toast'
import MobileSidebar  from './components/MobileSidebar'
import CopilotChat    from './components/CopilotChat'

import HomePage       from './pages/HomePage'
import AboutPage      from './pages/AboutPage'
import ProjectsPage   from './pages/ProjectsPage'
import SkillsPage     from './pages/SkillsPage'
import ExperiencePage from './pages/ExperiencePage'
import ContactPage    from './pages/ContactPage'
import ReadmePage     from './pages/ReadmePage'

function useIsNonDesktop() {
  const [val, setVal] = useState(() => window.innerWidth < 1024)
  useEffect(() => {
    const h = () => setVal(window.innerWidth < 1024)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return val
}

const COPILOT_MIN     = 260
const COPILOT_MAX     = 520
const COPILOT_DEFAULT = 320

export default function App() {
  const [openTabs,     setOpenTabs]     = useState(['home'])
  const [active,       setActive]       = useState('home')
  const [showTerm,     setShowTerm]     = useState(false)
  const [showCmd,      setShowCmd]      = useState(false)
  const [cmdQuery,     setCmdQuery]     = useState('')
  const [toasts,       setToasts]       = useState([])
  const [sideOpen,     setSideOpen]     = useState(true)
  const [drawerOpen,   setDrawerOpen]   = useState(false)
  const [copilotOpen,  setCopilotOpen]  = useState(false)
  const [copilotWidth, setCopilotWidth] = useState(COPILOT_DEFAULT)

  const isNonDesktop = useIsNonDesktop()
  const isDragging   = useRef(false)
  const dragStartX   = useRef(0)
  const dragStartW   = useRef(0)

  useEffect(() => {
    setSideOpen(!isNonDesktop)
    setDrawerOpen(false)
  }, [isNonDesktop])

  const { themeId, setThemeId } = useTheme()

  const toast = useCallback((icon, msg) => {
    const id = Date.now()
    setToasts(t => [...t, { id, icon, msg }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }, [])

  const handleThemeChange = useCallback((id) => {
    setThemeId(id)
    const t = THEMES.find(x => x.id === id)
    if (t) toast(t.icon, `Theme switched to ${t.name}`)
  }, [setThemeId, toast])

  const navigate = useCallback((id) => {
    if (id === 'resume') {
      window.open('/Aahana_Bobade_Resume.pdf', '_blank')
      return
    }
    setOpenTabs(tabs => tabs.includes(id) ? tabs : [...tabs, id])
    setActive(id)
  }, [])

  const closeTab = useCallback((id) => {
    setOpenTabs(tabs => {
      const next = tabs.filter(t => t !== id)
      const safe = next.length ? next : ['home']
      setActive(curr => curr === id ? safe[safe.length - 1] : curr)
      return safe
    })
  }, [])

  const toggleCopilot = useCallback(() => {
    setCopilotOpen(o => !o)
  }, [])

  useEffect(() => {
    const h = (e) => {
      const mod = e.ctrlKey || e.metaKey
      if (mod && e.key === 'p')              { e.preventDefault(); setShowCmd(true) }
      if (mod && e.key === 'b')              { e.preventDefault(); setSideOpen(o => !o) }
      if (mod && e.key === '`')              { e.preventDefault(); setShowTerm(o => !o) }
      if (mod && e.shiftKey && e.key === 'C') { e.preventDefault(); toggleCopilot() }
      if (e.key === 'Escape')               { setShowCmd(false); setCmdQuery('') }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [toggleCopilot])

  // ── Drag-to-resize ───────────────────────────────────────────────────────
  const onDragStart = useCallback((e) => {
    e.preventDefault()
    isDragging.current = true
    dragStartX.current = e.clientX
    dragStartW.current = copilotWidth

    const onMove = (e) => {
      if (!isDragging.current) return
      const delta = dragStartX.current - e.clientX
      const newW  = Math.min(COPILOT_MAX, Math.max(COPILOT_MIN, dragStartW.current + delta))
      setCopilotWidth(newW)
    }
    const onUp = () => {
      isDragging.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
      document.body.style.cursor     = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
    document.body.style.cursor     = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [copilotWidth])

  // ── Build grid template dynamically based on sideOpen + copilotOpen ──────
  const gridStyle = (() => {
    const sideCol = sideOpen ? '220px' : '0px'
    if (copilotOpen) {
      return {
        gridTemplateColumns: `48px ${sideCol} 1fr ${copilotWidth}px`,
        gridTemplateAreas:
          `'title  title  title  title'
           'menu   menu   menu   menu'
           'act    side   editor copilot'
           'status status status status'`,
      }
    }
    return {
      gridTemplateColumns: `48px ${sideCol} 1fr`,
      gridTemplateAreas:
        `'title  title  title'
         'menu   menu   menu'
         'act    side   editor'
         'status status status'`,
    }
  })()

  const renderPage = () => {
    switch (active) {
      case 'home':       return <HomePage       onNavigate={navigate} />
      case 'about':      return <AboutPage />
      case 'projects':   return <ProjectsPage />
      case 'skills':     return <SkillsPage />
      case 'experience': return <ExperiencePage />
      case 'contact':    return <ContactPage onToast={toast} />
      case 'readme':     return <ReadmePage />
      default:           return <div className="p-6 text-vscode-dim text-sm">File not found</div>
    }
  }

  /* ── DESKTOP ── */
  if (!isNonDesktop) {
    return (
      <>
        <div className="app-grid" style={gridStyle}>
          <TitleBar onOpenCmd={() => setShowCmd(true)} />

          <MenuBar
            onToggleTerm={() => setShowTerm(t => !t)}
            onOpenCmd={() => setShowCmd(true)}
            onNavigate={navigate}
            onToggleSidebar={() => setSideOpen(o => !o)}
            onToggleCopilot={toggleCopilot}
            copilotOpen={copilotOpen}
            activeFile={active}
            openTabs={openTabs}
            onCloseTab={closeTab}
          />

          <ActivityBar
            sidebarOpen={sideOpen}
            onToggleSidebar={() => setSideOpen(o => !o)}
            onOpenCmd={() => setShowCmd(true)}
            onToggleTerm={() => setShowTerm(t => !t)}
            themeId={themeId}
            onThemeChange={handleThemeChange}
            copilotOpen={copilotOpen}
            onToggleCopilot={toggleCopilot}
          />

          {sideOpen && (
            <Sidebar
              activeFile={active}
              onFileClick={navigate}
              copilotOpen={copilotOpen}
              onToggleCopilot={toggleCopilot}
            />
          )}

          {/* ── EDITOR ── */}
          <div
            style={{ gridArea: 'editor' }}
            className="flex flex-col overflow-hidden bg-vscode-bg"
          >
            <TabBar openTabs={openTabs} activeFile={active} onTabClick={navigate} onTabClose={closeTab} />
            <Breadcrumb activeFile={active} />
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
              <div key={active} className="pane-enter">
                {renderPage()}
              </div>
            </div>
            {showTerm && <Terminal onClose={() => setShowTerm(false)} onOpenFile={navigate} />}
          </div>

          {/* ── COPILOT PANEL ── */}
          {copilotOpen && (
            <div
              style={{
                gridArea:      'copilot',
                borderLeft:    '1px solid var(--border)',
                display:       'flex',
                flexDirection: 'column',
                overflow:      'hidden',
                position:      'relative',
                height:        '100%',
              }}
            >
              <div
                onMouseDown={onDragStart}
                style={{
                  position:   'absolute',
                  left: 0, top: 0, bottom: 0,
                  width:      '5px',
                  cursor:     'col-resize',
                  zIndex:     10,
                  background: 'transparent',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(110,64,201,0.35)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                title="Drag to resize"
              />
              <CopilotChat onClose={() => setCopilotOpen(false)} />
            </div>
          )}

          <StatusBar
            activeFile={active}
            onToggleTerm={() => setShowTerm(t => !t)}
            themeId={themeId}
            onThemeChange={handleThemeChange}
            copilotOpen={copilotOpen}
            onToggleCopilot={toggleCopilot}
          />
        </div>

        {showCmd && (
          <CommandPalette
            query={cmdQuery}
            onQueryChange={setCmdQuery}
            onSelect={(id) => {
              if (id === 'copilot') { toggleCopilot(); setShowCmd(false); setCmdQuery(''); return }
              navigate(id); setShowCmd(false); setCmdQuery('')
            }}
            onClose={() => { setShowCmd(false); setCmdQuery('') }}
            onToggleCopilot={toggleCopilot}
          />
        )}
        <ToastContainer toasts={toasts} />
      </>
    )
  }

  /* ── MOBILE + TABLET ── */
  return (
    <>
      <div className="app-grid app-compact">
        <div className="compact-topbar">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open explorer"
            style={{ display:'flex', flexDirection:'column', gap:'5px',
                     padding:'6px', borderRadius:'4px', background:'transparent',
                     border:'none', cursor:'pointer' }}
          >
            <span style={{ display:'block', height:'1.5px', width:'18px', borderRadius:'2px', background:'var(--text)' }} />
            <span style={{ display:'block', height:'1.5px', width:'18px', borderRadius:'2px', background:'var(--text)' }} />
            <span style={{ display:'block', height:'1.5px', width:'18px', borderRadius:'2px', background:'var(--text)' }} />
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:'4px',
                        fontSize:'12px', overflow:'hidden', flex:1, minWidth:0 }}>
            <span style={{ color:'var(--dim)', flexShrink:0 }}>~/</span>
            <span style={{ color:'var(--text)', overflow:'hidden',
                           textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
              {copilotOpen ? 'copilot' : active}
            </span>
          </div>

          <button
            onClick={toggleCopilot}
            title="Aahana's Copilot (Ctrl+Shift+C)"
            style={{
              flexShrink:0, width:'28px', height:'28px', borderRadius:'4px',
              display:'flex', alignItems:'center', justifyContent:'center',
              background: copilotOpen ? 'rgba(110,64,201,0.4)' : 'rgba(255,255,255,0.06)',
              border: copilotOpen ? '1px solid rgba(110,64,201,0.6)' : '1px solid transparent',
              cursor:'pointer', position:'relative',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke={copilotOpen ? '#b48eff' : 'white'} strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
            </svg>
            {!copilotOpen && (
              <span style={{
                position:'absolute', top:'3px', right:'3px',
                width:'5px', height:'5px', borderRadius:'50%',
                background:'#6E40C9',
                animation:'pulse-dot 2s infinite',
              }} />
            )}
          </button>

          <button
            onClick={() => setShowCmd(true)}
            style={{ marginLeft:'4px', flexShrink:0, fontSize:'12px',
                     padding:'4px 8px', borderRadius:'4px',
                     background:'rgba(255,255,255,0.06)',
                     color:'var(--dim)', border:'none', cursor:'pointer' }}
          >
            🔍
          </button>
        </div>

        <div className="compact-content">
          {copilotOpen
            ? <CopilotChat onClose={() => setCopilotOpen(false)} />
            : <div key={active} className="pane-enter">{renderPage()}</div>
          }
        </div>

        <div className="compact-status">
          <StatusBar
            activeFile={active}
            onToggleTerm={() => {}}
            themeId={themeId}
            onThemeChange={handleThemeChange}
            copilotOpen={copilotOpen}
            onToggleCopilot={toggleCopilot}
          />
        </div>
      </div>

      {drawerOpen && (
        <MobileSidebar
          activeFile={active}
          onNavigate={navigate}
          onClose={() => setDrawerOpen(false)}
          themeId={themeId}
          onThemeChange={handleThemeChange}
          onToggleCopilot={toggleCopilot}
        />
      )}

      {showCmd && (
        <CommandPalette
          query={cmdQuery}
          onQueryChange={setCmdQuery}
          onSelect={(id) => {
            if (id === 'copilot') { toggleCopilot(); setShowCmd(false); setCmdQuery(''); return }
            navigate(id); setShowCmd(false); setCmdQuery('')
          }}
          onClose={() => { setShowCmd(false); setCmdQuery('') }}
          onToggleCopilot={toggleCopilot}
        />
      )}

      <ToastContainer toasts={toasts} />

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
      `}</style>
    </>
  )
}