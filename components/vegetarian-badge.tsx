import Image from "next/image"

interface VegetarianBadgeProps {
  className?: string
  size?: number
}

export function VegetarianBadge({ className, size = 16 }: VegetarianBadgeProps) {
  return (
    <div className={className} style={{ width: size, height: size, position: "relative" }}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flor-1ErwggfslbRGHFBy1FaUMsFMRQeJjh.png"
        alt="Vegetariano"
        fill
        className="object-contain"
      />
    </div>
  )
}
