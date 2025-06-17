import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-montebello-navy">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-montebello-gold" />
        <p className="mt-4 text-montebello-light text-lg">Cargando producto...</p>
      </div>
    </div>
  )
}
