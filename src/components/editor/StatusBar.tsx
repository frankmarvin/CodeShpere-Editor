import { GitBranch, AlertCircle, CheckCircle } from 'lucide-react';
import { EditorTab } from '@/types/editor';

interface StatusBarProps {
  activeTab: EditorTab | null;
}

const StatusBar = ({ activeTab }: StatusBarProps) => {
  const lines = activeTab?.content.split('\n').length || 0;

  return (
    <div className="flex items-center h-6 bg-statusbar-bg text-statusbar-fg text-[11px] px-3 select-none">
      <div className="flex items-center gap-1.5 mr-4">
        <GitBranch size={12} />
        <span>main</span>
      </div>
      <div className="flex items-center gap-1">
        <CheckCircle size={11} />
        <span>0 errors</span>
      </div>
      <span className="mx-2">•</span>
      <div className="flex items-center gap-1">
        <AlertCircle size={11} />
        <span>0 warnings</span>
      </div>
      <div className="flex-1" />
      {activeTab && (
        <div className="flex items-center gap-4">
          <span>Ln {lines}, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span className="uppercase font-medium">{activeTab.language}</span>
        </div>
      )}
      <span className="ml-4 opacity-70">CodeSphere v1.0</span>
    </div>
  );
};

export default StatusBar;
