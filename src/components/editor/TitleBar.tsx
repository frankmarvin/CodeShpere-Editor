import { Menu, Play, Settings, Search, GitBranch } from 'lucide-react';
import logo from '@/assets/codesphere-logo.png';

interface TitleBarProps {
  onToggleSidebar: () => void;
}

const TitleBar = ({ onToggleSidebar }: TitleBarProps) => {
  return (
    <div className="flex items-center h-10 bg-titlebar-bg text-titlebar-fg select-none border-b border-editor-line">
      <button
        onClick={onToggleSidebar}
        className="flex items-center justify-center w-10 h-full hover:bg-sidebar-hover transition-colors"
      >
        <Menu size={16} />
      </button>
      <div className="flex items-center gap-1.5 px-2">
        <img src={logo} alt="CodeSphere" className="h-6 w-6 object-contain rounded-sm" />
        <span className="font-semibold text-sm tracking-wide text-tab-active-fg">
          CodeSphere
        </span>
      </div>
      <div className="flex items-center gap-1 ml-4 text-xs">
        {['File', 'Edit', 'View', 'Run', 'Terminal', 'Help'].map(item => (
          <button
            key={item}
            className="px-2.5 py-1 rounded hover:bg-sidebar-hover transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-1 px-2">
        <button className="p-1.5 rounded hover:bg-sidebar-hover transition-colors" title="Search (Ctrl+Shift+F)">
          <Search size={14} />
        </button>
        <button className="p-1.5 rounded hover:bg-sidebar-hover transition-colors" title="Run (F5)">
          <Play size={14} className="text-success" />
        </button>
        <button className="p-1.5 rounded hover:bg-sidebar-hover transition-colors" title="Git">
          <GitBranch size={14} />
        </button>
        <button className="p-1.5 rounded hover:bg-sidebar-hover transition-colors" title="Settings">
          <Settings size={14} />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
