"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Registrar el error en la consola para depuración
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-montebello-navy">
      <div className="bg-montebello-navy/80 border border-montebello-gold/20 rounded-lg p-6 max-w-md w-full text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-montebello-gold mb-2">Algo salió mal</h2>
        <p className="text-montebello-light mb-6">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => (window.location.href = "/menu")}
            className="bg-montebello-gold hover:bg-montebello-gold/90 text-montebello-navy"
          >
            Volver al menú
          </Button>
          <Button onClick={() => reset()} variant="outline" className="border-montebello-gold/20 text-montebello-light">
            Intentar nuevamente
          </Button>
        </div>
      </div>
    </div>
  )
}
