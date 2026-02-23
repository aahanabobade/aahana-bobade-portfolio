import { useEffect, useRef } from 'react'
import { FILES } from '../data'
import { FILE_ICONS } from '../icons'

export default function CommandPalette({ query, onQueryChange, onSelect, onClose }) {
  const inputRef = useRef()

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const filtered = FILES.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div
      className="fixed inset-0 bg-black/55 z-50 flex items-start justify-center pt-20
                 backdrop-blur-sm animate-fade-in"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#2d2d30] border border-white/15 rounded-md w-[540px] overflow-hidden
                      shadow-[0_24px_70px_rgba(0,0,0,0.7)]">
        {/* Input */}
        <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/[0.07]">
          <span className="text-vscode-dim text-sm">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Go to file..."
            className="flex-1 bg-transparent border-none outline-none text-vscode-bright
                       font-mono text-[14px] placeholder:text-vscode-dim"
          />
        </div>

        {/* Results */}
        <div className="max-h-[280px] overflow-y-auto thin-scroll">
          {filtered.map(file => {
            const Icon = FILE_ICONS[file.id]
            return (
              <button
                key={file.id}
                onClick={() => onSelect(file.id)}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-vscode-text
                           hover:bg-white/[0.08] transition-colors text-left"
              >
                <Icon />
                <span className="flex-1">{file.name}</span>
                <span className="text-vscode-dim text-[11px]">
                  {file.folder === 'root' ? './' : file.folder + '/'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
