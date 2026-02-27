import { useEditorState } from '@/hooks/useEditorState';
import TitleBar from './TitleBar';
import FileExplorer from './FileExplorer';
import TabBar from './TabBar';
import CodeEditor from './CodeEditor';
import TerminalPanel from './TerminalPanel';
import StatusBar from './StatusBar';

const EditorLayout = () => {
  const {
    files, tabs, activeTab, activeTabId,
    terminalLines, terminalOpen, sidebarOpen,
    openFile, closeTab, setActiveTabId, updateTabContent,
    executeCommand, setTerminalOpen, setSidebarOpen,
  } = useEditorState();

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <TitleBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div className="w-60 shrink-0 animate-slide-in">
            <FileExplorer
              files={files}
              onFileSelect={openFile}
              activeFileId={activeTabId}
            />
          </div>
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onTabSelect={setActiveTabId}
            onTabClose={closeTab}
          />
          <CodeEditor tab={activeTab} onChange={updateTabContent} />
          <TerminalPanel
            lines={terminalLines}
            isOpen={terminalOpen}
            onToggle={() => setTerminalOpen(!terminalOpen)}
            onCommand={executeCommand}
          />
        </div>
      </div>
      <StatusBar activeTab={activeTab} />
    </div>
  );
};

export default EditorLayout;

