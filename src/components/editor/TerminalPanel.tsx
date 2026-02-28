import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Terminal as TerminalIcon, X } from 'lucide-react';
import { TerminalLine } from '@/types/editor';

interface TerminalPanelProps {
  lines: TerminalLine[];
  isOpen: boolean;
  onToggle: () => void;
  onCommand: (cmd: string) => void;
}

const TerminalPanel = ({ lines, isOpen, onToggle, onCommand }: TerminalPanelProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setHistory(prev => [input, ...prev]);
    setHistoryIdx(-1);
    onCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < history.length - 1) {
        const idx = historyIdx + 1;
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const idx = historyIdx - 1;
        setHistoryIdx(idx);
        setInput(history[idx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  const lineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'error': return 'text-destructive';
      case 'info': return 'text-info';
      case 'input': return 'text-editor-fg';
      default: return 'text-terminal-fg';
    }
  };

  return (
    <div className={`flex flex-col bg-terminal-bg border-t border-editor-line transition-all ${isOpen ? 'h-52' : 'h-8'}`}>
      <div
        className="flex items-center h-8 px-3 gap-2 cursor-pointer select-none hover:bg-sidebar-hover transition-colors shrink-0"
        onClick={onToggle}
      >
        <TerminalIcon size={13} className="text-icon-muted" />
        <span className="text-[11px] font-medium text-tab-fg uppercase tracking-wide">Terminal</span>
        <div className="flex-1" />
        {isOpen ? <ChevronDown size={14} className="text-icon-muted" /> : <ChevronUp size={14} className="text-icon-muted" />}
      </div>
      {isOpen && (
        <div
          className="flex-1 overflow-y-auto px-4 py-2 font-mono text-xs scrollbar-thin cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map(line => (
            <div key={line.id} className={`${lineColor(line.type)} leading-5 whitespace-pre-wrap`}>
              {line.content}
            </div>
          ))}
          <div className="flex items-center text-terminal-fg">
            <span className="text-icon-active mr-1">❯</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none caret-icon-active"
              spellCheck={false}
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default TerminalPanel;
