"use client";

import { useEffect, useRef, useState } from "react";

type ViewTransitionLike = {
  ready: Promise<void>;
};

type DocumentWithTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionLike;
};

const THEME_KEY = "nabil-theme";
const THEME_EVENT = "themechange";

const applyTheme = (isDark: boolean) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.setProperty("color-scheme", isDark ? "dark" : "light");

  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { isDark } }));
  }
};

export default function ThemeToggle() {
  const toggleRef = useRef<HTMLLabelElement>(null);

  const getInitialPreference = () => {
    if (typeof window === "undefined") return false;

    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored) return stored === "dark";

    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  };

  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const preference = getInitialPreference();
    // Necessary rehydration so the toggle reflects persisted preference
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(preference);
    applyTheme(preference);
  }, []);

  const handleToggle = () => {
    const next = !isDark;

    // ---- SAFER VIEW TRANSITION CALL ----
    const transitionApi = (document as DocumentWithTransition).startViewTransition;

    if (!transitionApi) {
      applyTheme(next);
      setIsDark(next);
      return;
    }

    const el = toggleRef.current;
    const rect = el?.getBoundingClientRect();

    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const runToggle = () => {
      applyTheme(next);
      setIsDark(next);
    };

    const transition = transitionApi.call(document, runToggle);

    transition.ready
      .then(() => {
        document.documentElement.style.setProperty("--x", `${x}px`);
        document.documentElement.style.setProperty("--y", `${y}px`);
      })
      .catch(() => null);
  };

  return (
    <label
      ref={toggleRef}
      className={`theme-toggle ${isDark ? "theme-toggle--dark" : "theme-toggle--light"}`}
      aria-label="Toggle dark mode"
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={handleToggle}
        aria-checked={isDark}
      />
      <span className="theme-toggle__indicator" aria-hidden="true">
        {isDark ? "🌙" : "☀️"}
      </span>
    </label>
  );
}
