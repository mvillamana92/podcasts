/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  DEV: boolean;
  PROD: boolean;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
