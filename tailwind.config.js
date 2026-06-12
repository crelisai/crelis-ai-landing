/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Crelis brand (unchanged) ──────────────────────────────────
        ink: '#05070D',
        panel: '#0B1120',
        panel2: '#0F1830',
        hairline: 'rgba(255,255,255,0.08)',
        electric: '#3D7BFF',
        cyan: '#22D3EE',
        slatemute: '#93A3BC',
        // ── Trust-state semantics (new) ───────────────────────────────
        // blue/cyan = AI · amber = human review · green = verified · rose = blocked
        verify: '#34D399',
        review: '#FBBF24',
        block: '#FB7185',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(61,123,255,0.25), 0 18px 60px -20px rgba(61,123,255,0.55)',
        'glow-green': '0 0 0 1px rgba(52,211,153,0.25), 0 18px 60px -24px rgba(52,211,153,0.5)',
        'glow-amber': '0 0 0 1px rgba(251,191,36,0.25), 0 18px 60px -24px rgba(251,191,36,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -40px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        dash: {
          to: { strokeDashoffset: '-24' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        drift: {
          '0%': { transform: 'translateY(14px)', opacity: '0' },
          '20%': { opacity: '0.7' },
          '80%': { opacity: '0.2' },
          '100%': { transform: 'translateY(-110px)', opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        dash: 'dash 1.2s linear infinite',
        scan: 'scan 5s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
