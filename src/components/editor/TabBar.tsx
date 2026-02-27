import { X } from 'lucide-react';
import { EditorTab, getFileIcon } from '@/types/editor';

interface TabBarProps {
  tabs: EditorTab[];
  activeTabId: string | null;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
}

const TabBar = ({ tabs, activeTabId, onTabSelect, onTabClose }: TabBarProps) => {
  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center bg-tab-bg overflow-x-auto scrollbar-thin h-9 border-b border-editor-line">
      {tabs.map(tab => {
        const isActive = tab.id === activeTabId;
        const icon = getFileIcon(tab.name, 'file');
        return (
          <button
            key={tab.id}
            onClick={() => onTabSelect(tab.id)}
            className={`group flex items-center gap-1.5 px-3 h-full text-xs whitespace-nowrap transition-colors border-r border-editor-line relative ${
              isActive
                ? 'bg-tab-active-bg text-tab-active-fg'
                : 'text-tab-fg hover:text-tab-active-fg'
            }`}
          >
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-tab-active-border" />
            )}
            <span className="text-sm">{icon}</span>
            <span>{tab.name}</span>
            {tab.isDirty && (
              <span className="w-2 h-2 rounded-full bg-icon-active" />
            )}
            <span
              onClick={(e) => { e.stopPropagation(); onTabClose(tab.id); }}
              className="ml-1 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-sidebar-hover transition-all"
            >
              <X size={12} />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;
