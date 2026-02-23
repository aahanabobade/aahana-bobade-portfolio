import { useState, useEffect, useCallback } from 'react'
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

export default function App() {
  const [openTabs,   setOpenTabs]   = useState(['home'])
  const [active,     setActive]     = useState('home')
  const [showTerm,   setShowTerm]   = useState(false)
  const [showCmd,    setShowCmd]    = useState(false)
  const [cmdQuery,   setCmdQuery]   = useState('')
  const [toasts,     setToasts]     = useState([])
  const [sideOpen,   setSideOpen]   = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const isNonDesktop = useIsNonDesktop()

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

  useEffect(() => {
    const h = (e) => {
      const mod = e.ctrlKey || e.metaKey
      if (mod && e.key === 'p') { e.preventDefault(); setShowCmd(true) }
      if (mod && e.key === 'b') { e.preventDefault(); setSideOpen(o => !o) }
      if (mod && e.key === '`') { e.preventDefault(); setShowTerm(o => !o) }
      if (e.key === 'Escape')   { setShowCmd(false); setCmdQuery('') }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const renderPage = () => {
    switch (active) {
      case 'home':       return <HomePage       onNavigate={navigate} />
      case 'about':      return <AboutPage />
      case 'projects':   return <ProjectsPage />
      case 'skills':     return <SkillsPage />
      case 'experience': return <ExperiencePage />
      case 'contact':    return <ContactPage    onToast={toast} />
      case 'readme':     return <ReadmePage />
      default:           return <div className="p-6 text-vscode-dim text-sm">File not found</div>
    }
  }

  /* ── DESKTOP ── */
  if (!isNonDesktop) {
    return (
      <>
        <div className="app-grid">
          <TitleBar onOpenCmd={() => setShowCmd(true)} />
          <MenuBar onToggleTerm={() => setShowTerm(t => !t)} />

          {/* ✅ themeId + onThemeChange now passed to ActivityBar */}
          <ActivityBar
            sidebarOpen={sideOpen}
            onToggleSidebar={() => setSideOpen(o => !o)}
            onOpenCmd={() => setShowCmd(true)}
            onToggleTerm={() => setShowTerm(t => !t)}
            themeId={themeId}
            onThemeChange={handleThemeChange}
          />

          {sideOpen && <Sidebar activeFile={active} onFileClick={navigate} />}

          <div style={{ gridArea: 'editor' }} className="flex flex-col overflow-hidden bg-vscode-bg">
            <TabBar openTabs={openTabs} activeFile={active} onTabClick={navigate} onTabClose={closeTab} />
            <Breadcrumb activeFile={active} />
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
              <div key={active} className="pane-enter">
                {renderPage()}
              </div>
            </div>
            {showTerm && <Terminal onClose={() => setShowTerm(false)} onOpenFile={navigate} />}
          </div>

          <StatusBar
            activeFile={active}
            onToggleTerm={() => setShowTerm(t => !t)}
            themeId={themeId}
            onThemeChange={handleThemeChange}
          />
        </div>

        {showCmd && (
          <CommandPalette
            query={cmdQuery}
            onQueryChange={setCmdQuery}
            onSelect={(id) => { navigate(id); setShowCmd(false); setCmdQuery('') }}
            onClose={() => { setShowCmd(false); setCmdQuery('') }}
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

        {/* Top bar */}
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
              {active}
            </span>
          </div>

          <button
            onClick={() => setShowCmd(true)}
            style={{ marginLeft:'auto', flexShrink:0, fontSize:'12px',
                     padding:'4px 8px', borderRadius:'4px',
                     background:'rgba(255,255,255,0.06)',
                     color:'var(--dim)', border:'none', cursor:'pointer' }}
          >
            🔍
          </button>
        </div>

        {/* Scrollable content */}
        <div className="compact-content">
          <div key={active} className="pane-enter">
            {renderPage()}
          </div>
        </div>

        {/* Status bar */}
        <div className="compact-status">
          <StatusBar
            activeFile={active}
            onToggleTerm={() => {}}
            themeId={themeId}
            onThemeChange={handleThemeChange}
          />
        </div>
      </div>

      {/* ✅ themeId + onThemeChange now passed to MobileSidebar */}
      {drawerOpen && (
        <MobileSidebar
          activeFile={active}
          onNavigate={navigate}
          onClose={() => setDrawerOpen(false)}
          themeId={themeId}
          onThemeChange={handleThemeChange}
        />
      )}

      {showCmd && (
        <CommandPalette
          query={cmdQuery}
          onQueryChange={setCmdQuery}
          onSelect={(id) => { navigate(id); setShowCmd(false); setCmdQuery('') }}
          onClose={() => { setShowCmd(false); setCmdQuery('') }}
        />
      )}

      <ToastContainer toasts={toasts} />
    </>
  )
}