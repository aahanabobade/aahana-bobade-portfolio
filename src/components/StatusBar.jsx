import { FILES } from '../data'
import { useClock } from '../hooks/useClock'
import ThemePicker from './ThemePicker'

export default function StatusBar({ activeFile, onToggleTerm, themeId, onThemeChange }) {
  const clock = useClock()
  const file = FILES.find(f => f.id === activeFile)

  return (
    <div
      style={{ gridArea: 'status', background: 'var(--blue2)' }}
      className="flex items-center px-2 sm:px-3 text-[10px] sm:text-[11px] text-white/85 gap-1 sm:gap-3 select-none overflow-hidden"
    >
      {/* ── Left side ───────────────────────────── */}
      <StatusItem onClick={onToggleTerm} className="flex-shrink-0">
        ⚠ 0 <span className="hidden xs:inline">&nbsp; ⊗ 0</span>
      </StatusItem>

      <StatusItem className="flex-shrink-0 hidden sm:flex">⎇ main</StatusItem>

      <StatusItem className="flex-shrink-1 hidden md:flex truncate max-w-[120px]">
        🔄 AB
      </StatusItem>

      {/* ── Right side ──────────────────────────── */}
      <div className="ml-auto flex items-center gap-0.5 sm:gap-2 flex-shrink-0">

        {/* Language — hidden on xs */}
        {file && (
          <StatusItem className="hidden sm:flex">
            {file.lang}
          </StatusItem>
        )}

        {/* UTF-8 + Prettier — only on lg */}
        <StatusItem className="hidden lg:flex">UTF-8</StatusItem>
        <StatusItem className="hidden lg:flex">Prettier</StatusItem>

        {/* Theme picker — always visible */}
        <ThemePicker themeId={themeId} onSelect={onThemeChange} />

        {/* Clock — always visible */}
        <StatusItem className="text-white/70 flex-shrink-0">{clock}</StatusItem>
      </div>
    </div>
  )
}

function StatusItem({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-1 sm:px-1.5 py-0.5 rounded-sm
                  hover:bg-white/15 active:bg-white/20
                  transition-colors whitespace-nowrap leading-none ${className}`}
    >
      {children}
    </button>
  )
}