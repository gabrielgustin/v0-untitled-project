import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-montebello-navy">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 text-montebello-gold animate-spin mb-4" />
        <p className="text-montebello-light text-lg">Cargando menú...</p>
      </div>
    </div>
  )
}
