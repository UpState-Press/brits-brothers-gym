// Vite resolves `figma:asset/<hash>.png` to `src/assets/` (vite.config.ts). Ambient `*.png` types those URL imports.
declare module '*.png' {
  const src: string;
  export default src;
}
