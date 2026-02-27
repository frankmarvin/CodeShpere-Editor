import { FileNode } from '@/types/editor';

export const sampleProject: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'index.ts',
        type: 'file',
        language: 'typescript',
        content: `import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

interface Client {
  id: string;
  username: string;
  ws: WebSocket;
}

const clients: Map<string, Client> = new Map();

wss.on('connection', (ws) => {
  const clientId = crypto.randomUUID();
  console.log(\`Client connected: \${clientId}\`);

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());
    // Broadcast to all other clients
    clients.forEach((client) => {
      if (client.id !== clientId) {
        client.ws.send(JSON.stringify(message));
      }
    });
  });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log(\`Client disconnected: \${clientId}\`);
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', clients: clients.size });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`🚀 CodeSphere server running on port \${PORT}\`);
});`,
      },
      {
        id: '3',
        name: 'utils.py',
        type: 'file',
        language: 'python',
        content: `"""CodeSphere utility functions for code analysis."""
from typing import List, Dict, Optional
import ast
import re


class CodeAnalyzer:
    """Analyze code structure and complexity."""

    def __init__(self, source: str, language: str = "python"):
        self.source = source
        self.language = language
        self._tree: Optional[ast.AST] = None

    @property
    def tree(self) -> ast.AST:
        if self._tree is None:
            self._tree = ast.parse(self.source)
        return self._tree

    def get_functions(self) -> List[Dict[str, any]]:
        """Extract all function definitions."""
        functions = []
        for node in ast.walk(self.tree):
            if isinstance(node, ast.FunctionDef):
                functions.append({
                    "name": node.name,
                    "args": [arg.arg for arg in node.args.args],
                    "line": node.lineno,
                    "docstring": ast.get_docstring(node),
                })
        return functions

    def count_lines(self) -> Dict[str, int]:
        """Count lines of code, comments, and blanks."""
        lines = self.source.split("\\n")
        return {
            "total": len(lines),
            "code": sum(1 for l in lines if l.strip() and not l.strip().startswith("#")),
            "comments": sum(1 for l in lines if l.strip().startswith("#")),
            "blank": sum(1 for l in lines if not l.strip()),
        }


def format_error(error: Exception, context: str = "") -> str:
    """Format an error message with context."""
    msg = f"Error: {type(error).__name__}: {error}"
    if context:
        msg = f"[{context}] {msg}"
    return msg


if __name__ == "__main__":
    sample = '''
def hello(name: str) -> str:
    """Greet someone."""
    return f"Hello, {name}!"
    '''
    analyzer = CodeAnalyzer(sample)
    print(analyzer.get_functions())
    print(analyzer.count_lines())`,
      },
      {
        id: '4',
        name: 'App.tsx',
        type: 'file',
        language: 'typescript',
        content: `import React, { useState, useEffect } from 'react';

interface AppState {
  theme: 'dark' | 'light';
  fontSize: number;
  language: string;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    theme: 'dark',
    fontSize: 14,
    language: 'typescript',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CodeSphere</h1>
        <nav>
          <button onClick={() => setState(s => ({ 
            ...s, 
            theme: s.theme === 'dark' ? 'light' : 'dark' 
          }))}>
            Toggle Theme
          </button>
        </nav>
      </header>
      <main className="editor-container">
        {/* Editor components */}
      </main>
    </div>
  );
};

export default App;`,
      },
      {
        id: '10',
        name: 'styles.css',
        type: 'file',
        language: 'css',
        content: `/* CodeSphere Design System */
:root {
  --cs-bg-primary: #1a1d23;
  --cs-bg-secondary: #21252b;
  --cs-accent: #00d4ff;
  --cs-text: #abb2bf;
  --cs-text-bright: #e6e6e6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: var(--cs-bg-primary);
  color: var(--cs-text);
  overflow: hidden;
}

.editor-container {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 40px 1fr 200px 24px;
  height: 100vh;
  gap: 1px;
  background: var(--cs-bg-primary);
}

.code-area {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  tab-size: 2;
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}`,
      },
    ],
  },
  {
    id: '5',
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: `{
  "name": "codesphere",
  "version": "1.0.0",
  "description": "Next-generation web-based code editor",
  "main": "src/index.ts",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc && node dist/index.js",
    "lint": "eslint src/**/*.ts",
    "test": "vitest run"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ws": "^8.16.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "@types/express": "^4.17.21",
    "@types/ws": "^8.5.10"
  }
}`,
  },
  {
    id: '6',
    name: 'README.md',
    type: 'file',
    language: 'markdown',
    content: `# 🌐 CodeSphere

> Next-generation web-based code editor supporting all programming languages.

## Features

- **Universal Language Support** — Syntax highlighting for 50+ languages
- **Real-time Collaboration** — Edit code together with WebSocket sync
- **Smart Autocomplete** — AI-powered code suggestions
- **Integrated Terminal** — Run code directly in the browser
- **Git Integration** — Commits, branches, and merges built-in

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## Architecture

\`\`\`
src/
├── index.ts          # Server entry point
├── utils.py          # Code analysis utilities
├── App.tsx           # React frontend
└── styles.css        # Design system
\`\`\`

## License

MIT © CodeSphere Team`,
  },
  {
    id: '7',
    name: '.gitignore',
    type: 'file',
    language: 'plaintext',
    content: `node_modules/
dist/
.env
*.log
.DS_Store
coverage/`,
  },
  {
    id: '8',
    name: 'tsconfig.json',
    type: 'file',
    language: 'json',
    content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
  },
  {
    id: '9',
    name: 'Dockerfile',
    type: 'file',
    language: 'dockerfile',
    content: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]`,
  },
];

