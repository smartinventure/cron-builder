/** Tailwind config used to compile dist/style.css for non-Tailwind consumers. */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};
