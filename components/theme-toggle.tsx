"use client"

import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-xl hover:bg-accent transition-colors">
        🌙
      </button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-xl hover:bg-accent transition-colors shadow-lg"
      aria-label={`Alternar para modo ${theme === "dark" ? "claro" : "escuro"}`}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}
