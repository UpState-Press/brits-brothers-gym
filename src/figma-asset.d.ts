// Vite resolves `figma:asset/<hash>.(png|webp)` to `src/assets/` (vite.config.ts).
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
