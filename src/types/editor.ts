export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  language?: string;
  content?: string;
}

export interface EditorTab {
  id: string;
  name: string;
  language: string;
  content: string;
  isDirty: boolean;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'info';
  content: string;
  timestamp: Date;
}

export const LANGUAGE_MAP: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
  rb: 'ruby',
  rs: 'rust',
  go: 'go',
  java: 'java',
  kt: 'kotlin',
  swift: 'swift',
  cs: 'csharp',
  cpp: 'cpp',
  c: 'c',
  h: 'c',
  hpp: 'cpp',
  html: 'html',
  css: 'css',
  scss: 'scss',
  less: 'less',
  json: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  xml: 'xml',
  md: 'markdown',
  sql: 'sql',
  sh: 'shell',
  bash: 'shell',
  ps1: 'powershell',
  php: 'php',
  lua: 'lua',
  r: 'r',
  dart: 'dart',
  sol: 'sol',
  toml: 'ini',
  graphql: 'graphql',
  dockerfile: 'dockerfile',
  makefile: 'makefile',
};

export function getLanguageFromFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return LANGUAGE_MAP[ext] || 'plaintext';
}

export function getFileIcon(filename: string, type: 'file' | 'folder'): string {
  if (type === 'folder') return '📁';
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const icons: Record<string, string> = {
    js: '🟨', jsx: '⚛️', ts: '🔷', tsx: '⚛️',
    py: '🐍', rb: '💎', rs: '🦀', go: '🐹',
    java: '☕', html: '🌐', css: '🎨', json: '📋',
    md: '📝', sql: '🗃️', sh: '🐚', yml: '⚙️', yaml: '⚙️',
    toml: '⚙️', xml: '📄', php: '🐘', dart: '🎯',
  };
  return icons[ext] || '📄';
}
