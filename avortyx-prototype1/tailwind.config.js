export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ground: '#080f25', cyan: '#57c3ff', indigo: '#6c72ff',
        emerald: '#00ca72', muted: '#aeb9e1', panel: '#101935',
      },
      fontFamily: { 
        sans: ['Geist', 'system-ui', 'sans-serif'], 
        display: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'] 
      },
    },
  },
};
