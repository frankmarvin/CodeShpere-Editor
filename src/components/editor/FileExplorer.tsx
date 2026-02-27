import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { FileNode, getFileIcon } from '@/types/editor';

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  activeFileId: string | null;
}

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  onFileSelect: (file: FileNode) => void;
  activeFileId: string | null;
}

const TreeNode = ({ node, depth, onFileSelect, activeFileId }: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(depth === 0);
  const isActive = node.id === activeFileId;
  const isFolder = node.type === 'folder';
  const icon = getFileIcon(node.name, node.type);

  const handleClick = () => {
    if (isFolder) {
      setExpanded(!expanded);
    } else {
      onFileSelect(node);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`flex items-center w-full text-left text-xs py-1 px-2 transition-colors group ${
          isActive
            ? 'bg-sidebar-hover text-sidebar-active'
            : 'text-sidebar-fg hover:bg-sidebar-hover'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder ? (
          <span className="mr-1 text-icon-muted">
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        ) : (
          <span className="w-[14px] mr-1" />
        )}
        <span className="mr-1.5 text-sm">{icon}</span>
        <span className="truncate">{node.name}</span>
      </button>
      {isFolder && expanded && node.children && (
        <div className="animate-fade-in">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              activeFileId={activeFileId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer = ({ files, onFileSelect, activeFileId }: FileExplorerProps) => {
  return (
    <div className="h-full bg-sidebar-bg flex flex-col border-r border-editor-line">
      <div className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-icon-muted">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {files.map(file => (
          <TreeNode
            key={file.id}
            node={file}
            depth={0}
            onFileSelect={onFileSelect}
            activeFileId={activeFileId}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
