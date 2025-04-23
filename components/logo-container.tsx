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
        return "text-xl sm:text-2xl"
      case "large":
        return "text-3xl sm:text-4xl"
      case "medium":
      default:
        return "text-2xl sm:text-3xl"
    }
  }

  const fontSize = getFontSize()

  return (
    <Link href="/" className={`flex items-center justify-center w-full ${className}`}>
      <div className="flex flex-col items-center">
        <h1 className={`font-serif ${fontSize} text-montebello-gold tracking-wider font-bold text-center`}>
          CLUB MONTEBELLO
        </h1>
      </div>
    </Link>
  )
}
