import Editor from '@monaco-editor/react';
import { EditorTab } from '@/types/editor';

interface CodeEditorProps {
  tab: EditorTab | null;
  onChange: (tabId: string, content: string) => void;
}

const CodeEditor = ({ tab, onChange }: CodeEditorProps) => {
  if (!tab) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-editor-bg text-editor-gutter select-none">
        <div className="text-6xl mb-6 opacity-30">{'</>'}</div>
        <h2 className="text-xl font-semibold mb-2 text-editor-fg opacity-50">CodeSphere</h2>
        <p className="text-sm opacity-40">Open a file from the explorer to start editing</p>
        <div className="mt-8 text-xs space-y-1 opacity-30">
          <p>Ctrl+P — Quick Open</p>
          <p>Ctrl+Shift+F — Search Files</p>
          <p>Ctrl+` — Toggle Terminal</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        key={tab.id}
        height="100%"
        language={tab.language}
        value={tab.content}
        onChange={(value) => onChange(tab.id, value || '')}
        theme="codesphere-dark"
        beforeMount={(monaco) => {
          monaco.editor.defineTheme('codesphere-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
              { token: 'keyword', foreground: '00d4ff' },
              { token: 'string', foreground: '98c379' },
              { token: 'number', foreground: 'd19a66' },
              { token: 'type', foreground: 'e5c07b' },
              { token: 'function', foreground: '61afef' },
              { token: 'variable', foreground: 'e06c75' },
              { token: 'operator', foreground: '56b6c2' },
              { token: 'regexp', foreground: 'e06c75' },
            ],
            colors: {
              'editor.background': '#1a1d23',
              'editor.foreground': '#abb2bf',
              'editor.lineHighlightBackground': '#21252b',
              'editor.selectionBackground': '#264f78',
              'editorCursor.foreground': '#00d4ff',
              'editorLineNumber.foreground': '#495162',
              'editorLineNumber.activeForeground': '#abb2bf',
              'editor.selectionHighlightBackground': '#264f7840',
              'editorIndentGuide.background': '#2c313a',
              'editorIndentGuide.activeBackground': '#3b4048',
              'editorBracketMatch.background': '#264f7850',
              'editorBracketMatch.border': '#00d4ff50',
            },
          });
        }}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontLigatures: true,
          minimap: { enabled: true, scale: 1 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          renderLineHighlight: 'all',
          bracketPairColorization: { enabled: true },
          guides: { bracketPairs: true, indentation: true },
          padding: { top: 12 },
          lineHeight: 22,
          wordWrap: 'on',
          automaticLayout: true,
          suggest: { showMethods: true, showFunctions: true, showSnippets: true },
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
