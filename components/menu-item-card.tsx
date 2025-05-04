"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItemCardProps {
  id: string
  name: string
  description: string
  price: number
  image?: string
  variants?: Array<{
    name: string
    price: number
  }>
  size?: "normal" | "large"
  isAdmin?: boolean
  onEdit?: (id: string) => void
}

export function MenuItemCard({
  id,
  name,
  description,
  price,
  image,
  variants = [],
  size = "normal",
  isAdmin = false,
  onEdit,
}: MenuItemCardProps) {
  const formattedId = id.toLowerCase().replace(/\s+/g, "-")
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  // Determinar el tamaño de fuente basado en la longitud del nombre
  const titleFontSize = useMemo(() => {
    if (name.length <= 15) {
      return "text-sm sm:text-base"
    } else if (name.length <= 25) {
      return "text-xs sm:text-sm"
    } else {
      return "text-[10px] sm:text-xs"
    }
  }, [name])

  // Función para obtener una imagen por defecto
  const getDefaultImage = () => {
    return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/golden-leaf-restaurant-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png"
  }

  // Asegurar que siempre tengamos una imagen válida
  const imageUrl = image || getDefaultImage()

  // Función para manejar el clic en el botón de edición
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onEdit) {
      onEdit(id)
    }
  }

  // Función para manejar errores de carga de imagen
  const handleImageError = () => {
    console.warn(`Error loading image for product: ${id}`)
    setImageError(true)
    setIsImageLoading(false)
  }

  return (
    <Link href={`/product/${formattedId}`} className="block h-full">
      <div className="bg-montebello-navy/80 rounded-xl overflow-hidden shadow-sm flex flex-col relative border border-montebello-gold/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-[280px] sm:h-[320px] lg:h-[360px]">
        {/* Botón de edición para administradores */}
        {isAdmin && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 h-7 w-7 sm:h-8 sm:w-8 bg-montebello-gold/20 hover:bg-montebello-gold/30 text-montebello-light rounded-full shadow-sm"
            onClick={handleEditClick}
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}

        {/* Contenedor de imagen */}
        <div className="relative w-full aspect-square">
          {/* Indicador de carga */}
          {isImageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-montebello-navy/60 z-10">
              <div className="animate-pulse text-montebello-gold text-xs">Cargando...</div>
            </div>
          )}

          <img
            src={imageError ? getDefaultImage() : imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onLoad={() => setIsImageLoading(false)}
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        {/* Información del producto */}
        <div className="p-3 flex flex-col flex-grow bg-gradient-to-t from-montebello-navy/95 to-montebello-navy/80 absolute bottom-0 w-full">
          <div className="flex flex-col h-full">
            <div>
              <h3 className={cn("font-bold text-montebello-gold leading-tight break-words", titleFontSize)}>{name}</h3>

              {variants.length > 0 && (
                <span className="text-montebello-light/70 text-[10px] sm:text-xs italic mt-0.5 block">
                  {variants.length} {variants.length === 1 ? "opción" : "opciones"}
                </span>
              )}

              <p className="text-montebello-light/80 text-[10px] sm:text-xs line-clamp-2 mt-1">{description}</p>
            </div>

            <div className="mt-auto pt-2 flex justify-end">
              {!variants.length && (
                <span className="font-bold text-montebello-gold text-xs sm:text-sm bg-montebello-navy/40 px-1.5 py-0.5 rounded">
                  ${price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
