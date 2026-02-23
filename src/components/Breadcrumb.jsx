import { FILES } from '../data'

export default function Breadcrumb({ activeFile }) {
  const file = FILES.find(f => f.id === activeFile)
  if (!file) return null

  const parts =
    file.folder === 'root'
      ? ['aahana-bobade', file.name]
      : ['aahana-bobade', file.folder, file.name]

  return (
    <div className="flex items-center gap-0.5 px-4 py-1 text-xs text-vscode-dim border-b border-vscode-border bg-vscode-bg flex-shrink-0 min-h-[26px]">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-0.5">
          <span className={i === parts.length - 1 ? 'text-vscode-text' : 'hover:text-vscode-text cursor-pointer'}>
            {part}
          </span>
          {i < parts.length - 1 && (
            <span className="opacity-30 text-[10px] mx-0.5">›</span>
          )}
        </span>
      ))}
    </div>
  )
}
