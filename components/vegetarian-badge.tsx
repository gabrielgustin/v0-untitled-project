interface VegetarianBadgeProps {
  className?: string
  size?: number
}

export function VegetarianBadge({ className, size = 16 }: VegetarianBadgeProps) {
  // Implementar un badge vegetariano simple con un ícono de hoja
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-green-500"
      >
        <path d="M6 3v12c0 2.5 2.5 4 5 4s5-1.5 5-4V3" />
        <path d="M11 3v8" />
        <path d="M11 15v4" />
      </svg>
    </div>
  )
}
