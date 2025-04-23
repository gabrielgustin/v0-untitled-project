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

  // Actualizar la función getDefaultProductImage para eliminar las referencias a los productos eliminados
  const getDefaultProductImage = () => {
    // Imágenes disponibles en el proyecto
    const defaultImages = {
      entradas: "/artisanal-cheese-selection.png",
      principales: "/perfectly-seared-ribeye.png",
      postres: "/classic-tiramisu.png",
      bebidas: "/refreshing-mojito.png",
      vinos: "/rich-malbec-glass.png",
      cocktails: "/classic-negroni.png",
      default: "/golden-leaf-restaurant.png",
    }

    // Intentar determinar la categoría por el ID o nombre
    const id = formattedId.toLowerCase()

    if (id.includes("entrada") || id.includes("provoleta") || id.includes("empanada")) {
      return defaultImages.entradas
    } else if (id.includes("bife") || id.includes("lomo") || id.includes("milanesa") || id.includes("salmon")) {
      return defaultImages.principales
    } else if (id.includes("postre") || id.includes("flan") || id.includes("tiramisu") || id.includes("cheesecake")) {
      return defaultImages.postres
    } else if (id.includes("bebida") || id.includes("cafe") || id.includes("jugo") || id.includes("limonada")) {
      return defaultImages.bebidas
    } else if (id.includes("vino") || id.includes("malbec") || id.includes("champagne")) {
      return defaultImages.vinos
    } else if (id.includes("cocktail") || id.includes("negroni") || id.includes("mojito")) {
      return defaultImages.cocktails
    }

    // Si no se puede determinar la categoría, usar la imagen por defecto
    return defaultImages.default
  }

  const defaultImage = image || getDefaultProductImage()

  // Función para manejar el clic en el botón de edición
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onEdit) {
      onEdit(id)
    }
  }

  // Estilo original para tarjetas con imagen
  return (
    <Link href={`/product/${formattedId}`} className="block h-full">
      <div className="bg-montebello-navy/80 rounded-xl overflow-hidden shadow-sm h-full flex flex-col relative border border-montebello-gold/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        {/* Botón de edición para administradores */}
        {isAdmin && (
          <div className="animate-fade-in">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 h-7 w-7 sm:h-8 sm:w-8 bg-montebello-gold/20 hover:bg-montebello-gold/30 text-montebello-light rounded-full shadow-sm"
              onClick={handleEditClick}
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        )}

        <div
          className={`relative ${size === "large" ? "h-32 sm:h-40 lg:h-40" : "h-20 sm:h-24 lg:h-40"} w-full p-1 sm:p-2`}
        >
          {/* Indicador de carga */}
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-montebello-navy/60 z-10 rounded-lg">
              <div className="animate-pulse text-montebello-gold text-xs">Cargando...</div>
            </div>
          )}

          <div className="relative h-full w-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            {/* Usar img en lugar de Image para mayor compatibilidad */}
            <img
              src={defaultImage || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoading(false)}
              onError={(e) => {
                // Si la imagen falla, usar la imagen por defecto del restaurante
                ;(e.target as HTMLImageElement).src = "/golden-leaf-restaurant.png"
                setIsImageLoading(false)
              }}
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
          <div className="mt-auto pt-1 sm:pt-2 flex justify-end items-center">
            {/* Ícono vegetariano en la parte inferior izquierda */}
            <div className="relative">
              {isVegetarian && (
                <div>
                  <VegetarianBadge className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              )}
            </div>

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
