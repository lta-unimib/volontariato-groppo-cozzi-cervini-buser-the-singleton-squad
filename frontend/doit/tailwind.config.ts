import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--neutral-color-neutral-1000)",
        foreground: "var(--neutral-color-neutral-100)",
        "green-color-green-200": "var(--green-color-green-200)",
        "green-color-green-100": "var(--green-color-green-100)",
        "green-alpha-color-green-alpha-10": "var(--green-alpha-color-green-alpha-10)",

        "yellow-color-yellow-200": "var(--yellow-color-yellow-200)",
        "yellow-color-yellow-100": "var(--yellow-color-yellow-100)",
        "yellow-alpha-color-yellow-alpha-10": "var(--yellow-alpha-color-yellow-alpha-10)",

        "red-color-red-200": "var(--red-color-red-200)",
        "red-color-red-100": "var(--red-color-red-100)",
        "red-alpha-color-red-alpha-10": "var(--red-alpha-color-red-alpha-10)",

        "neutral-color-neutral-1000": "var(--neutral-color-neutral-1000)",
        "neutral-color-neutral-900": "var(--neutral-color-neutral-900)",
        "neutral-color-neutral-800": "var(--neutral-color-neutral-800)",
        "neutral-color-neutral-700": "var(--neutral-color-neutral-700)",
        "neutral-color-neutral-600": "var(--neutral-color-neutral-600)",
        "neutral-color-neutral-500": "var(--neutral-color-neutral-500)",
        "neutral-color-neutral-400": "var(--neutral-color-neutral-400)",
        "neutral-color-neutral-300": "var(--neutral-color-neutral-300)",
        "neutral-color-neutral-200": "var(--neutral-color-neutral-200)",
        "neutral-color-neutral-100": "var(--neutral-color-neutral-100)",
        "neutral-alpha-color-neutral-alpha-10": "var(--neutral-alpha-color-neutral-alpha-10)",

        "secondary-color-secondary-500": "var(--secondary-color-secondary-500)",
        "secondary-color-secondary-400": "var(--secondary-color-secondary-400)",
        "secondary-color-secondary-300": "var(--secondary-color-secondary-300)",
        "secondary-color-secondary-200": "var(--secondary-color-secondary-200)",
        "secondary-color-secondary-100": "var(--secondary-color-secondary-100)",
        "secondary-alpha-color-secondary-alpha-10": "var(--secondary-alpha-color-secondary-alpha-10)",

        "primary-color-primary-500": "var(--primary-color-primary-500)",
        "primary-color-primary-400": "var(--primary-color-primary-400)",
        "primary-color-primary-300": "var(--primary-color-primary-300)",
        "primary-color-primary-200": "var(--primary-color-primary-200)",
        "primary-color-primary-100": "var(--primary-color-primary-100)",
        "primary-alpha-color-primary-alpha-10": "var(--primary-alpha-color-primary-alpha-10)"
      },
      spacing: {
        "radius-none": "0px",
        "radius-2xs": "var(--radius-2xs)",
        "radius-xs": "var(--radius-xs)",
        "radius-s": "var(--radius-s)",
        "radius-m": "var(--radius-m)",
        "radius-l": "var(--radius-l)",
        "radius-xl": "var(--radius-xl)",
        "radius-2xl": "var(--radius-2xl)",
        "radius-full": "var(--radius-full)"
      },
      fontSize: {
        '3xs': 'var(--font-size-3xs)',
        '2xs': 'var(--font-size-2xs)',
        'xs': 'var(--font-size-xs)',
        's': 'var(--font-size-s)',
        'm': 'var(--font-size-m)',
        'l': 'var(--font-size-l)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        black: 'var(--font-weight-black)',
      },
      lineHeight: {
        '3xs': 'var(--line-height-3xs)',
        '2xs': 'var(--line-height-2xs)',
        'xs': 'var(--line-height-xs)',
        's': 'var(--line-height-s)',
        'm': 'var(--line-height-m)',
        'l': 'var(--line-height-l)',
        'xl': 'var(--line-height-xl)',
        '2xl': 'var(--line-height-2xl)',
        '3xl': 'var(--line-height-3xl)',
        '4xl': 'var(--line-height-4xl)',
        '5xl': 'var(--line-height-5xl)',
        '6xl': 'var(--line-height-6xl)',
      },
      customProperties: {
        "font-family-roboto-condensed": "Roboto Condensed",
        "font-family-roboto": "Roboto"
      }
    },
  },
  plugins: [],
} satisfies Config;