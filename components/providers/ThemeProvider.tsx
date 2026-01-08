"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage or system preference
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    } else {
      setThemeState("light"); // Default to light if no pref
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update CSS variables/classes
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Apply CSS variables
    const THEMES = {
      dark: {
        "--bg": "#050505",
        "--fg": "#E1E1E1",
        "--acc": "#FF3300",
        "--surface": "#000000",
        "--border": "rgba(255,255,255,0.15)",
        "--inverse": "#ffffff",
      },
      light: {
        "--bg": "#E6E6E6",
        "--fg": "#050505",
        "--acc": "#FF3300",
        "--surface": "#F5F5F5",
        "--border": "rgba(0,0,0,0.1)",
        "--inverse": "#000000",
      },
    };
    const currentTheme = THEMES[theme];
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Persist
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (t: Theme) => setThemeState(t);

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  // or simply execute effect. For global theme provider, we render children always,
  // effects handle the visual switch.

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
