import { FILES } from '../data'
import { FILE_ICONS } from '../icons'

const downloadResume = () => {
  const a = document.createElement('a')
  a.href = '/Aahana_Bobade_Resume.pdf'
  a.download = 'Aahana_Bobade_Resume.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default function Sidebar({ activeFile, onFileClick, copilotOpen, onToggleCopilot }) {
  const handleClick = (file) => {
    if (file.download) { downloadResume(); return }
    onFileClick(file.id)
  }

  return (
    <div
      style={{ gridArea: 'side' }}
      className="bg-vscode-bg2 border-r border-vscode-border flex flex-col overflow-hidden select-none"
    >
      {/* Header */}
      <div className="px-4 pt-2.5 pb-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-vscode-text">
        Portfolio
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto thin-scroll pb-2">
        {FILES.map(file => {
          const Icon     = FILE_ICONS[file.id]
          const isActive = activeFile === file.id && !file.download
          const isResume = !!file.download

          return (
            <button
              key={file.id}
              onClick={() => handleClick(file)}
              title={isResume ? 'Download Resume PDF ↓' : file.name}
              className={`
                w-full flex items-center gap-2 px-4 py-[5px] text-xs cursor-pointer
                border-l-2 transition-all duration-100 group
                ${isActive
                  ? 'bg-white/[0.07] text-vscode-bright border-vscode-blue2'
                  : isResume
                    ? 'text-vscode-dim border-transparent hover:bg-white/[0.05] hover:text-[#f44336] hover:border-[#f44336]'
                    : 'text-vscode-dim border-transparent hover:bg-white/[0.05] hover:text-vscode-text'
                }
              `}
            >
              <span className="flex-shrink-0">{Icon && <Icon />}</span>
              <span className="truncate flex-1">{file.name}</span>
              {isResume && (
                <span className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  ↓
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/*  COPILOT BUTTON — pinned above footer */}
      <div className="px-3 py-2" style={{ borderTop: '1px solid var(--border)' }}>
        <button
          onClick={onToggleCopilot}
          title="Open Aahana's AI Copilot (Ctrl+Shift+C)"
          style={{
            width:         '100%',
            display:       'flex',
            alignItems:    'center',
            gap:           '8px',
            padding:       '7px 10px',
            borderRadius:  '6px',
            border:        copilotOpen
                             ? '1px solid rgba(110,64,201,0.6)'
                             : '1px solid rgba(110,64,201,0.25)',
            background:    copilotOpen
                             ? 'rgba(110,64,201,0.18)'
                             : 'rgba(110,64,201,0.07)',
            cursor:        'pointer',
            transition:    'all 0.15s',
            boxShadow:     copilotOpen
                             ? '0 0 12px rgba(110,64,201,0.25)'
                             : '0 0 8px rgba(110,64,201,0.1)',
          }}
          onMouseEnter={e => {
            if (!copilotOpen) {
              e.currentTarget.style.background = 'rgba(110,64,201,0.14)'
              e.currentTarget.style.borderColor = 'rgba(110,64,201,0.5)'
            }
          }}
          onMouseLeave={e => {
            if (!copilotOpen) {
              e.currentTarget.style.background = 'rgba(110,64,201,0.07)'
              e.currentTarget.style.borderColor = 'rgba(110,64,201,0.25)'
            }
          }}
        >
          {/* Copilot icon */}
          <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', position: 'relative' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                 stroke={copilotOpen ? '#b48eff' : '#9370db'}
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
            </svg>
            {/* Pulsing dot when closed */}
            {!copilotOpen && (
              <span style={{
                position: 'absolute', top: '-3px', right: '-3px',
                width: '5px', height: '5px', borderRadius: '50%',
                background: '#6E40C9',
                animation: 'sidebar-pulse 2s infinite',
              }} />
            )}
          </span>

          <span style={{
            flex:       1,
            fontSize:   '11.5px',
            fontWeight: 500,
            color:      copilotOpen ? '#b48eff' : '#9370db',
            textAlign:  'left',
          }}>
            Aahana's Copilot
          </span>

          <span style={{
            fontSize:  '9px',
            color:     copilotOpen ? '#b48eff' : 'var(--dim)',
            flexShrink: 0,
          }}>
            {copilotOpen ? 'open ✓' : 'AI '}
          </span>
        </button>
      </div>

      {/* Footer — git info */}
      <div className="border-t border-vscode-border px-3 py-1.5 flex items-center gap-1.5 text-[11px] text-vscode-dim">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="12" r="3"/>
          <path d="M6 9v6M9 12h6"/>
        </svg>
        <span className="text-vscode-text">main</span>
        <div className="ml-auto flex gap-2">
          <span className="text-vscode-gcm">↑1</span>
          <span className="text-vscode-orange">✦3</span>
        </div>
      </div>

      <style>{`
        @keyframes sidebar-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.3; transform: scale(1.6); }
        }
      `}</style>
    </div>
  )
}