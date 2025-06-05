"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { LoadingIndicator } from "@/components/loading-indicator"
import { motion } from "framer-motion"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  objectFit = "cover",
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  // Resetear el estado cuando cambia la fuente
  useEffect(() => {
    setIsLoading(true)
    setError(false)
    setImageSrc(src)
  }, [src])

  // Generar un placeholder si no se proporciona uno
  const defaultBlurDataURL =
    blurDataURL ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjAyMDIwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=="

  // Manejar errores de carga
  const handleError = () => {
    setError(true)
    setIsLoading(false)
    // Usar una imagen de respaldo
    setImageSrc("/diverse-products-still-life.png")
  }

  // Manejar la carga exitosa
  const handleLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }

  return (
    <div className={`relative ${className}`} style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-montebello-navy/20 z-10">
          <LoadingIndicator size="md" color="gold" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          onError={handleError}
          onLoad={handleLoad}
          className={`${objectFit === "cover" ? "object-cover" : ""} 
                     ${objectFit === "contain" ? "object-contain" : ""} 
                     ${objectFit === "fill" ? "object-fill" : ""} 
                     ${objectFit === "none" ? "object-none" : ""} 
                     ${objectFit === "scale-down" ? "object-scale-down" : ""} 
                     w-full h-full`}
        />
      </motion.div>

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-montebello-navy/80 text-montebello-light text-sm p-2 text-center">
          <span>Error al cargar la imagen</span>
        </div>
      )}
    </div>
  )
}
