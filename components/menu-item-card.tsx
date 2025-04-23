"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { VegetarianBadge } from "@/components/vegetarian-badge"

interface MenuItemCardProps {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isVegetarian?: boolean
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
  isVegetarian = false,
  variants = [],
  size = "normal",
  isAdmin = false,
  onEdit,
}: MenuItemCardProps) {
  const formattedId = id.toLowerCase().replace(/\s+/g, "-")
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

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
      <div className="bg-montebello-navy/80 rounded-xl overflow-hidden shadow-sm flex flex-col relative border border-montebello-gold/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-[320px] sm:h-[360px] lg:h-[400px]">
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

        <div className="relative w-full aspect-square p-1 sm:p-2">
          {/* Indicador de carga */}
          {isImageLoading && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-montebello-navy/60 z-10 rounded-lg">
              <div className="animate-pulse text-montebello-gold text-xs">Cargando...</div>
            </div>
          )}

          <div className="relative h-full w-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src={imageError ? getDefaultImage() : imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoading(false)}
              onError={handleImageError}
              loading="lazy"
            />
          </div>
        </div>
        <div className="p-2 py-1.5 sm:p-3 sm:py-2 lg:p-4 flex flex-col flex-grow">
          {/* Título en la parte superior */}
          <h3 className="font-bold text-montebello-gold text-[11px] sm:text-sm lg:text-base font-open-sans mb-0.5">
            {name}
          </h3>

          {/* Descripción del producto */}
          <p className="text-montebello-light/80 text-[9px] sm:text-xs lg:text-xs line-clamp-2 mb-1">{description}</p>

          {/* Variantes (si existen) */}
          {variants.length > 0 && (
            <div className="space-y-0.5 sm:space-y-1 mt-1 sm:mt-1.5 lg:mt-2 lg:space-y-2">
              {variants.map((variant, index) => (
                <div key={index} className="flex items-center justify-between text-xs lg:text-sm">
                  <span className="text-montebello-light font-bold text-xs lg:text-sm">{variant.name}</span>
                  <div className="flex items-center">
                    <div className="border-b border-dotted border-montebello-gold/30 flex-grow mx-1 sm:mx-2 w-8 sm:w-12 lg:w-16"></div>
                    <span className="font-bold text-montebello-gold font-open-sans text-xs lg:text-sm">
                      $ {variant.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Logo y precio en la parte inferior */}
          <div className="mt-auto pt-1 sm:pt-2 flex justify-between items-center">
            {/* Ícono vegetariano en la parte inferior izquierda */}
            <div className="relative">{isVegetarian && <VegetarianBadge className="h-4 w-4 sm:h-5 sm:w-5" />}</div>

            {/* Precio en la parte inferior derecha */}
            {!variants.length && (
              <span className="font-bold text-montebello-gold text-xs sm:text-sm lg:text-base font-open-sans">
                $ {price}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
