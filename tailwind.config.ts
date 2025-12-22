import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'draft-a': '#3b82f6',
        'draft-b': '#22c55e',
        'final': '#eab308',
      },
    },
  },
  plugins: [],
}
export default config
