"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirigir automáticamente a la página del menú con un pequeño retraso
    // para asegurar que la navegación funcione correctamente
    const redirectTimer = setTimeout(() => {
      router.push("/menu")
    }, 500)

    return () => clearTimeout(redirectTimer)
  }, [router])

  // Mostrar un mensaje de carga mientras se realiza la redirección
  return (
    <div className="flex items-center justify-center min-h-screen bg-montebello-navy">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 text-montebello-gold animate-spin mb-4" />
        <div className="text-montebello-light text-lg">Cargando menú...</div>
      </div>
    </div>
  )
}
