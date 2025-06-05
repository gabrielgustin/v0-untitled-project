"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Definición de tipos
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

interface ThemeContextType {
  colors: ThemeColors
  updateColor: (key: keyof ThemeColors, value: string) => void
  resetColors: () => void
}

// Colores predeterminados basados en los actuales de la aplicación
const defaultColors: ThemeColors = {
  primary: "#2a4287", // Azul marino oscuro
  secondary: "#d4b45a", // Dorado
  accent: "#f5f0e0", // Crema
  background: "#f8f8f8", // Blanco hueso
  text: "#2a2a2a", // Gris oscuro
}

// Crear el contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(defaultColors)

  // Cargar colores guardados al iniciar
  useEffect(() => {
    const savedColors = localStorage.getItem("montebello-theme-colors")
    if (savedColors) {
      try {
        setColors(JSON.parse(savedColors))
      } catch (e) {
        console.error("Error al cargar colores guardados:", e)
      }
    }

    // Aplicar colores al documento
    applyColorsToDocument(savedColors ? JSON.parse(savedColors) : defaultColors)
  }, [])

  // Función para aplicar colores al documento
  const applyColorsToDocument = (colors: ThemeColors) => {
    const root = document.documentElement

    // Aplicar variables CSS
    root.style.setProperty("--color-primary", colors.primary)
    root.style.setProperty("--color-secondary", colors.secondary)
    root.style.setProperty("--color-accent", colors.accent)
    root.style.setProperty("--color-background", colors.background)
    root.style.setProperty("--color-text", colors.text)
  }

  // Actualizar un color específico
  const updateColor = (key: keyof ThemeColors, value: string) => {
    const newColors = { ...colors, [key]: value }
    setColors(newColors)
    localStorage.setItem("montebello-theme-colors", JSON.stringify(newColors))
    applyColorsToDocument(newColors)
  }

  // Restablecer colores predeterminados
  const resetColors = () => {
    setColors(defaultColors)
    localStorage.setItem("montebello-theme-colors", JSON.stringify(defaultColors))
    applyColorsToDocument(defaultColors)
  }

  return <ThemeContext.Provider value={{ colors, updateColor, resetColors }}>{children}</ThemeContext.Provider>
}

// Hook personalizado para usar el contexto
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider")
  }
  return context
}
