/// <reference types="vite/client" />

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;

  export default ReactComponent;
}

declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.svg' {
  const value: string;
  export default value;
}

// Extend ImportMeta to include your custom environment variables
interface ImportMeta {
  env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_TOKEN_KEY: string;
  readonly VITE_BASE_URL: string; // Base API URL
  readonly VITE_NODE_ENV: 'development' | 'production'; // Environment type
}
