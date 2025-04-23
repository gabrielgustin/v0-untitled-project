import Link from "next/link"

interface LogoContainerProps {
  className?: string
  size?: "small" | "medium" | "large"
}

export function LogoContainer({ className = "", size = "medium" }: LogoContainerProps) {
  // Determinar tamaños basados en el parámetro size
  const getFontSize = () => {
    switch (size) {
      case "small":
        return "text-sm sm:text-base"
      case "large":
        return "text-lg sm:text-xl"
      case "medium":
      default:
        return "text-base sm:text-lg"
    }
  }

  const fontSize = getFontSize()

  return (
    <Link href="/" className={`flex items-center justify-center w-full ${className}`}>
      <div className="flex flex-col items-center py-0">
        <h1 className={`font-serif ${fontSize} text-montebello-gold tracking-wider font-bold text-center leading-none`}>
          <span className="block">CLUB</span>
          <span className="block">MONTEBELLO</span>
        </h1>
      </div>
    </Link>
  )
}
