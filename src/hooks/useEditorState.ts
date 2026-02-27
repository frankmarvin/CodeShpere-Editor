import { useState, useCallback } from 'react';
import { EditorTab, FileNode, TerminalLine, getLanguageFromFilename } from '@/types/editor';
import { sampleProject } from '@/data/sampleProject';

function findFileContent(nodes: FileNode[], id: string): FileNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findFileContent(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function useEditorState() {
  const [files] = useState<FileNode[]>(sampleProject);
  const [tabs, setTabs] = useState<EditorTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { id: '1', type: 'info', content: '🌐 CodeSphere Terminal v1.0.0', timestamp: new Date() },
    { id: '2', type: 'info', content: 'Type "help" for available commands.', timestamp: new Date() },
    { id: '3', type: 'output', content: '$ ', timestamp: new Date() },
  ]);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openFile = useCallback((fileNode: FileNode) => {
    if (fileNode.type === 'folder') return;
    const existing = tabs.find(t => t.id === fileNode.id);
    if (existing) {
      setActiveTabId(existing.id);
      return;
    }
    const newTab: EditorTab = {
      id: fileNode.id,
      name: fileNode.name,
      language: fileNode.language || getLanguageFromFilename(fileNode.name),
      content: fileNode.content || '',
      isDirty: false,
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, [tabs]);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(t => t.id !== tabId);
      if (activeTabId === tabId) {
        const idx = prev.findIndex(t => t.id === tabId);
        const newActive = newTabs[Math.min(idx, newTabs.length - 1)];
        setActiveTabId(newActive?.id || null);
      }
      return newTabs;
    });
  }, [activeTabId]);

  const updateTabContent = useCallback((tabId: string, content: string) => {
    setTabs(prev => prev.map(t =>
      t.id === tabId ? { ...t, content, isDirty: true } : t
    ));
  }, []);

  const addTerminalLine = useCallback((type: TerminalLine['type'], content: string) => {
    setTerminalLines(prev => [...prev, {
      id: crypto.randomUUID(),
      type,
      content,
      timestamp: new Date(),
    }]);
  }, []);

  const executeCommand = useCallback((command: string) => {
    addTerminalLine('input', `$ ${command}`);
    const cmd = command.trim().toLowerCase();
    if (cmd === 'help') {
      addTerminalLine('info', 'Available commands: help, clear, ls, echo, date, whoami, version');
    } else if (cmd === 'clear') {
      setTerminalLines([]);
    } else if (cmd === 'ls') {
      const names = files.map(f => f.name).join('  ');
      addTerminalLine('output', names);
    } else if (cmd.startsWith('echo ')) {
      addTerminalLine('output', command.slice(5));
    } else if (cmd === 'date') {
      addTerminalLine('output', new Date().toString());
    } else if (cmd === 'whoami') {
      addTerminalLine('output', 'developer@codesphere');
    } else if (cmd === 'version') {
      addTerminalLine('info', 'CodeSphere v1.0.0 • Monaco Editor');
    } else if (cmd) {
      addTerminalLine('error', `command not found: ${command.trim()}`);
    }
  }, [files, addTerminalLine]);

  const activeTab = tabs.find(t => t.id === activeTabId) || null;

  return {
    files, tabs, activeTab, activeTabId,
    terminalLines, terminalOpen, sidebarOpen,
    openFile, closeTab, setActiveTabId, updateTabContent,
    executeCommand, setTerminalOpen, setSidebarOpen,
  };
}

