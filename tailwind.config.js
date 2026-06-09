/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Crelis palette ─────────────────────────────────────────────
        ink: '#05070D',        // page base (near-black navy)
        panel: '#0B1120',      // card / surface
        panel2: '#0F1830',     // raised surface
        hairline: 'rgba(255,255,255,0.08)',
        electric: '#3D7BFF',   // primary accent (electric blue)
        cyan: '#22D3EE',       // secondary accent (gradient partner)
        slatemute: '#93A3BC',  // muted body text
      },
      fontFamily: {
        // Display = Space Grotesk, Body = Inter, Mono = JetBrains Mono
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(61,123,255,0.25), 0 18px 60px -20px rgba(61,123,255,0.55)',
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
        pulseline: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        risein: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        pulseline: 'pulseline 1.4s linear infinite',
        risein: 'risein 0.7s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
