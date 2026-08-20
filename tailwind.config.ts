import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom 4-Color Palette Configuration
        brand: {
          plum: {
            DEFAULT: "#450C3F", // Deep Plum
            dark: "#2A0727",   // Dark Plum Container
            darker: "#1C051A", // Deep Dark BG
          },
          olive: {
            DEFAULT: "#B9D175", // Olive Sage Accent / Primary Buttons
            hover: "#A6BF60",
          },
          sage: {
            DEFAULT: "#D9EFBD", // Soft Sage / Light Borders
            light: "#EAF7D5",
          },
          cream: {
            DEFAULT: "#F5FBDA", // Cream Light Background / Text Light
            light: "#FAFDEB",
          },
        },

        // Theme Functional Mappings
        border: "hsl(var(--border, 85 53% 84%))",
        input: "hsl(var(--input, 85 53% 84%))",
        ring: "#B9D175",
        background: "#F5FBDA",
        foreground: "#450C3F",

        primary: {
          DEFAULT: "#450C3F",       // Deep Plum Primary
          light: "#B9D175",         // Olive Highlight
          dark: "#2A0727",          // Dark Container
          darker: "#1C051A",        // Dark Mode Deep Background
          contrast: "#F5FBDA",
        
          pagebgfrom: "#F5FBDA",
          pagebgvia: "#EAF7D5",
          pagebgto: "#D9EFBD",
          pagebgdark: "#120311",
        },
        
        secondary: {
          DEFAULT: "#B9D175",      // Olive Sage Secondary Accent
          light: "#D9EFBD",
          dark: "#9EB658",
          darker: "#7A8F3D",
          contrast: "#450C3F",
        },

        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#D9EFBD",
          foreground: "#450C3F",
        },
        accent: {
          DEFAULT: "#B9D175",
          foreground: "#450C3F",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#450C3F",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#450C3F",
        },
        sidebar: {
          DEFAULT: "#450C3F",
          foreground: "#F5FBDA",
          primary: "#B9D175",
          "primary-foreground": "#450C3F",
          accent: "#2A0727",
          "accent-foreground": "#D9EFBD",
          border: "#D9EFBD",
          ring: "#B9D175",
        },
      },
      borderRadius: {
        lg: "var(--radius, 1rem)",
        md: "calc(var(--radius, 1rem) - 2px)",
        sm: "calc(var(--radius, 1rem) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
} satisfies Config;