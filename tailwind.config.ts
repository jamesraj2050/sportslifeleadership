import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B32025",
        secondary: "#1D1D1D",
        background: "#FAFAFA",
        dark: "#111111",
        accent: "#F5C242",
        text: "#333333",
        border: "rgba(17,17,17,0.12)"
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        premium: "0 30px 90px rgba(17, 17, 17, 0.16)",
        glow: "0 0 48px rgba(179, 32, 37, 0.35)"
      },
      backgroundImage: {
        "radial-dark": "radial-gradient(circle at 30% 20%, rgba(179,32,37,0.25), transparent 30%), linear-gradient(135deg, #111 0%, #1d1d1d 100%)"
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.65" },
          "100%": { transform: "scale(2.4)", opacity: "0" }
        }
      },
      animation: {
        pulseRing: "pulseRing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite"
      }
    }
  },
  plugins: []
};

export default config;
