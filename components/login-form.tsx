"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { verifyCredentials, saveAuthState } from "@/lib/auth"
import { AlertCircle } from "lucide-react"

interface LoginFormProps {
  onLoginSuccess: () => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simular un pequeño retraso para dar sensación de procesamiento
    setTimeout(() => {
      if (verifyCredentials(username, password)) {
        // Guardar estado de autenticación
        saveAuthState({
          // Si los campos están vacíos, usar "Admin" como nombre de usuario predeterminado
          username: username === "" ? "Admin" : username,
          isLoggedIn: true,
        })

        // Registrar el tiempo de inicio de sesión para seguimiento de cambios
        localStorage.setItem("session_start_time", Date.now().toString())

        // IMPORTANTE: Establecer la bandera para mostrar el panel de administración
        localStorage.setItem("show_admin_panel", "true")

        // Llamar a onLoginSuccess para actualizar el estado
        onLoginSuccess()

        // Añadir un pequeño retraso antes de la redirección para asegurar que localStorage se actualice
        setTimeout(() => {
          // Forzar la redirección directamente a la página de menú
          window.location.href = "/menu"
        }, 100)
      } else {
        setError("Usuario o contraseña incorrectos")
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-montebello-light">
          Usuario
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-montebello-gold/20 bg-montebello-navy/50 text-montebello-light"
          autoComplete="username"
          // Ya no es required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-montebello-light">
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-montebello-gold/20 bg-montebello-navy/50 text-montebello-light"
          autoComplete="current-password"
          // Ya no es required
        />
      </div>

      {error && (
        <div className="bg-red-900/20 p-3 rounded-md flex items-center gap-2 text-red-400 border border-red-800/30">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-montebello-gold hover:bg-montebello-gold/90 text-montebello-navy"
        disabled={isLoading}
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </form>
  )
}
