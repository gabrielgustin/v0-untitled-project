interface VegetarianBadgeProps {
  className?: string
  size?: number
}

export function VegetarianBadge({ className, size = 16 }: VegetarianBadgeProps) {
  // Devolver un div vacío con las mismas propiedades pero sin contenido visible
  return (
    <div className={className} style={{ width: size, height: size, position: "relative" }}>
      {/* Se ha eliminado la imagen del badge vegetariano */}
    </div>
  )
}
