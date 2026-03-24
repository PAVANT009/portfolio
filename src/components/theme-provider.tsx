"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
type Attribute = "class" | `data-${string}`;

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme | ((prev: Theme) => Theme)) => void;
};

type ThemeProviderProps = React.PropsWithChildren<{
  attribute?: Attribute;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
}>;

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(attribute: Attribute, theme: ResolvedTheme, enableColorScheme: boolean) {
  const root = document.documentElement;
  if (attribute === "class") {
    root.classList.toggle("dark", theme === "dark");
  } else {
    root.setAttribute(attribute, theme);
  }
  if (enableColorScheme) {
    root.style.colorScheme = theme;
  }
}

function resolveTheme(theme: Theme, enableSystem: boolean, defaultTheme: Theme): ResolvedTheme {
  if (theme === "system") {
    if (enableSystem) {
      return getSystemTheme();
    }
    return defaultTheme === "dark" ? "dark" : "light";
  }
  return theme;
}

export function useTheme() {
  const value = React.useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}

export default function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(
    defaultTheme === "dark" ? "dark" : "light"
  );

  const setTheme = React.useCallback(
    (next: Theme | ((prev: Theme) => Theme)) => {
      setThemeState((prev) => {
        const value = typeof next === "function" ? next(prev) : next;
        try {
          localStorage.setItem(storageKey, value);
        } catch {}
        const resolved = resolveTheme(value, enableSystem, defaultTheme);
        setResolvedTheme(resolved);
        applyTheme(attribute, resolved, enableColorScheme);
        return value;
      });
    },
    [attribute, defaultTheme, enableColorScheme, enableSystem, storageKey]
  );

  React.useEffect(() => {
    let initial: Theme = defaultTheme;
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (stored) {
        initial = stored;
      }
    } catch {}
    const resolved = resolveTheme(initial, enableSystem, defaultTheme);
    setThemeState(initial);
    setResolvedTheme(resolved);
    applyTheme(attribute, resolved, enableColorScheme);
  }, [attribute, defaultTheme, enableColorScheme, enableSystem, storageKey]);

  React.useEffect(() => {
    if (!enableSystem) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      setResolvedTheme((prev) => {
        if (theme !== "system") return prev;
        const nextResolved = resolveTheme("system", true, defaultTheme);
        applyTheme(attribute, nextResolved, enableColorScheme);
        return nextResolved;
      });
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [attribute, defaultTheme, enableColorScheme, enableSystem, theme]);

  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const value = (event.newValue as Theme | null) ?? defaultTheme;
      setThemeState(value);
      const resolved = resolveTheme(value, enableSystem, defaultTheme);
      setResolvedTheme(resolved);
      applyTheme(attribute, resolved, enableColorScheme);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [attribute, defaultTheme, enableColorScheme, enableSystem, storageKey]);

  const contextValue = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
