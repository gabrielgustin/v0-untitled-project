"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirigir automáticamente a la página del menú con un pequeño retraso
    // para asegurar que la navegación funcione correctamente
    if (!isLoading) {
      const redirectTimer = setTimeout(() => {
        router.push("/menu")
      }, 100)

      return () => clearTimeout(redirectTimer)
    }
  }, [isLoading, router])

  const handleLoadingComplete = () => {
    // Usar setTimeout para evitar actualizar el estado durante el renderizado
    setTimeout(() => {
      setIsLoading(false)
    }, 0)
  }

  // Mostrar la pantalla de carga mientras se realiza la redirección
  return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
}
