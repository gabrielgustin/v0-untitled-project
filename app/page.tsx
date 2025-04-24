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
    const redirectTimer = setTimeout(() => {
      router.push("/menu")
    }, 2000)

    return () => clearTimeout(redirectTimer)
  }, [router])

  // Mostrar la pantalla de carga mientras se realiza la redirección
  return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
}
