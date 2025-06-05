"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Paintbrush, RefreshCw, Check, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Definición de tipos
interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

interface ThemeColorFormProps {
  onBack?: () => void
  onSave?: (data: any) => void
}

// Colores predeterminados basados en los actuales de la aplicación
const defaultColors: ThemeColors = {
  primary: "#2a4287", // Azul marino oscuro
  secondary: "#d4b45a", // Dorado
  accent: "#f5f0e0", // Crema
  background: "#f8f8f8", // Blanco hueso
  text: "#2a2a2a", // Gris oscuro
}

export function ThemeColorForm({ onBack, onSave }: ThemeColorFormProps) {
  const [colors, setColors] = useState<ThemeColors>(defaultColors)
  const [activeTab, setActiveTab] = useState("primary")
  const [showSavedMessage, setShowSavedMessage] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

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
  }, [])

  // Función para aplicar colores al documento
  const applyColorsToDocument = (colors: ThemeColors) => {
    // Crear un elemento de estilo para aplicar los colores solo a la vista previa
    let styleElement = document.getElementById("preview-theme-styles")

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = "preview-theme-styles"
      document.head.appendChild(styleElement)
    }

    // Definir las reglas CSS que afectarán solo a la aplicación principal, no al backoffice
    styleElement.textContent = `
      /* Estas reglas solo afectan a la aplicación principal, no al backoffice */
      :root {
        --app-color-primary: ${colors.primary};
        --app-color-secondary: ${colors.secondary};
        --app-color-accent: ${colors.accent};
        --app-color-background: ${colors.background};
        --app-color-text: ${colors.text};
      }
      
      /* Vista previa de colores */
      .preview-container {
        background-color: var(--app-color-background);
        color: var(--app-color-text);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
      }
      
      .preview-primary {
        background-color: var(--app-color-primary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
      }
      
      .preview-secondary {
        background-color: var(--app-color-secondary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
      }
      
      .preview-accent {
        background-color: var(--app-color-accent);
        color: var(--app-color-text);
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
      }
    `
  }

  // Aplicar colores cuando cambian
  useEffect(() => {
    if (previewMode) {
      applyColorsToDocument(colors)
    }
  }, [colors, previewMode])

  // Función para mostrar el mensaje de guardado temporalmente
  const showSavedConfirmation = () => {
    setShowSavedMessage(true)
    setTimeout(() => setShowSavedMessage(false), 2000)
  }

  // Función para manejar cambios en los inputs de color
  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }))
  }

  // Función para guardar los colores
  const handleSave = () => {
    localStorage.setItem("montebello-theme-colors", JSON.stringify(colors))

    // Guardar los colores para la aplicación principal, no para el backoffice
    localStorage.setItem("app-theme-colors", JSON.stringify(colors))

    showSavedConfirmation()

    if (onSave) {
      onSave({ themeColors: colors })
    }

    // Notificar que los colores han cambiado
    const event = new CustomEvent("appThemeChanged", { detail: colors })
    document.dispatchEvent(event)
  }

  // Función para restablecer colores
  const handleReset = () => {
    setColors(defaultColors)
    localStorage.setItem("montebello-theme-colors", JSON.stringify(defaultColors))
    localStorage.setItem("app-theme-colors", JSON.stringify(defaultColors))

    if (previewMode) {
      applyColorsToDocument(defaultColors)
    }

    showSavedConfirmation()

    // Notificar que los colores han cambiado
    const event = new CustomEvent("appThemeChanged", { detail: defaultColors })
    document.dispatchEvent(event)
  }

  // Función para alternar el modo de vista previa
  const togglePreviewMode = () => {
    if (!previewMode) {
      // Si activamos la vista previa, aplicamos los colores
      applyColorsToDocument(colors)
    } else {
      // Si desactivamos la vista previa, eliminamos el estilo de vista previa
      const styleElement = document.getElementById("preview-theme-styles")
      if (styleElement) {
        styleElement.textContent = ""
      }
    }
    setPreviewMode(!previewMode)
  }

  // Estructura de datos para los colores y sus descripciones
  const colorOptions = [
    {
      key: "primary" as keyof ThemeColors,
      label: "Color Primario",
      description: "Color principal de la aplicación, usado en botones y elementos destacados.",
    },
    {
      key: "secondary" as keyof ThemeColors,
      label: "Color Secundario",
      description: "Color complementario, usado en acentos y elementos secundarios.",
    },
    {
      key: "accent" as keyof ThemeColors,
      label: "Color de Acento",
      description: "Usado para destacar elementos específicos y crear contraste.",
    },
    {
      key: "background" as keyof ThemeColors,
      label: "Color de Fondo",
      description: "Color de fondo principal de la aplicación.",
    },
    {
      key: "text" as keyof ThemeColors,
      label: "Color de Texto",
      description: "Color principal para el texto en la aplicación.",
    },
  ]

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between bg-gray-50">
        <div className="flex items-center">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 text-gray-800 hover:bg-gray-200">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Paintbrush className="h-5 w-5 text-gray-800 mr-2" />
          <h2 className="text-xl font-medium text-gray-800">Personalización de Colores</h2>
        </div>
        <Button
          variant={previewMode ? "default" : "outline"}
          size="sm"
          onClick={togglePreviewMode}
          className={previewMode ? "bg-green-600 hover:bg-green-700" : ""}
        >
          <Eye className="h-4 w-4 mr-2" />
          {previewMode ? "Vista previa activa" : "Activar vista previa"}
        </Button>
      </div>

      <div className="p-6">
        <p className="text-gray-700 mb-6">
          Personaliza los colores de la <strong>Vista de cliente</strong> o <strong>Frontend público</strong>. Los
          cambios no afectarán al panel de administración.
        </p>

        {/* Muestra de colores actuales */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {colorOptions.map((option) => (
            <div key={option.key} className="text-center">
              <div
                className="w-full h-16 rounded-md border shadow-sm mb-2 mx-auto"
                style={{ backgroundColor: colors[option.key] }}
              />
              <span className="text-xs font-medium text-gray-700">{option.label}</span>
            </div>
          ))}
        </div>

        {/* Vista previa de la aplicación */}
        {previewMode && (
          <div className="preview-container mb-8 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Vista previa de la aplicación</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="preview-primary">Botón primario</div>
              <div className="preview-secondary">Botón secundario</div>
              <div className="preview-accent">Elemento de acento</div>
            </div>
            <div className="mt-4 text-sm">
              <p>Este es un ejemplo de cómo se verán los colores en la aplicación principal.</p>
              <p className="mt-2">Los cambios solo afectarán a la vista de cliente, no al panel de administración.</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            {colorOptions.map((option) => (
              <TabsTrigger key={option.key} value={option.key} className="relative">
                {option.label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-t-sm"
                  style={{ backgroundColor: colors[option.key] }}
                />
              </TabsTrigger>
            ))}
          </TabsList>

          {colorOptions.map((option) => (
            <TabsContent key={option.key} value={option.key} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">{option.label}</label>
                  <p className="text-gray-700 text-sm mb-3">{option.description}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 rounded-md border shadow-sm"
                    style={{ backgroundColor: colors[option.key] }}
                  />
                  <div className="flex-1">
                    <input
                      type="color"
                      value={colors[option.key]}
                      onChange={(e) => handleColorChange(option.key, e.target.value)}
                      className="w-full h-10 cursor-pointer rounded border p-1"
                    />
                    <div className="flex items-center mt-2">
                      <span className="text-gray-700 text-sm mr-2">Valor:</span>
                      <input
                        type="text"
                        value={colors[option.key]}
                        onChange={(e) => handleColorChange(option.key, e.target.value)}
                        className="flex-1 px-3 py-1 border rounded text-sm font-mono text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-2">Vista previa:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: colors[option.key] }}
                    >
                      <span className="text-white font-medium">Texto en {option.label}</span>
                    </div>
                    <div className="p-4 rounded-md border flex items-center justify-center">
                      <span style={{ color: colors[option.key] }} className="font-medium">
                        Texto con {option.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={handleReset} className="flex items-center text-gray-800 hover:bg-gray-100">
            <RefreshCw className="h-4 w-4 mr-2" />
            Restablecer colores
          </Button>

          <div className="flex items-center space-x-4">
            {showSavedMessage && (
              <div className="flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" />
                <span>Cambios guardados</span>
              </div>
            )}

            <Button onClick={handleSave} className="bg-[#2a4287] hover:bg-[#1e3370] text-white">
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
