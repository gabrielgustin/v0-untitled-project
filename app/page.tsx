"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya ha visitado la página antes
    const visitedBefore = localStorage.getItem("hasVisitedMontebello")

    if (visitedBefore) {
      // Si ya visitó, no mostrar la pantalla de carga y redirigir inmediatamente
      setIsLoading(false)
      setHasVisited(true) // Marcar como ya visitado para evitar renderizado de LoadingScreen
      router.replace("/menu") // Usar replace para no añadir al historial de navegación
    } else {
      // Si es la primera vez, mostrar la pantalla de carga
      setIsLoading(true)
      // Marcar como visitado después de que la pantalla de carga se complete
      // Esto se hará en handleLoadingComplete
    }
  }, [router])

  useEffect(() => {
    // Redirigir automáticamente a la página del menú después de la carga inicial
    if (!isLoading && !hasVisited) {
      // Solo redirigir si la carga ha terminado y no ha visitado antes
      const redirectTimer = setTimeout(() => {
        router.replace("/menu") // Usar replace para no añadir al historial de navegación
      }, 100) // Pequeño retraso para asegurar la navegación

      return () => clearTimeout(redirectTimer)
    }
  }, [isLoading, hasVisited, router])

  const handleLoadingComplete = () => {
    // Una vez que la animación de carga ha terminado, marcar como no cargando
    // y establecer la bandera en localStorage
    setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem("hasVisitedMontebello", "true")
    }, 0)
  }

  // Mostrar la pantalla de carga solo si isLoading es true y no ha visitado antes
  if (isLoading && !hasVisited) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  // Si ya ha visitado o la carga ha terminado, no renderizar nada aquí
  // La redirección ya se maneja en los useEffects
  return null
}
