"use client"

import type React from "react"

import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cardHoverAnimation } from "@/lib/animation-utils"
import { OptimizedImage } from "@/components/optimized-image"
import { useSmoothNavigation } from "@/hooks/use-smooth-navigation"

interface MenuItemCardProps {
  id: string
  name: string
  description?: string | React.ReactNode
  price: number
  image?: string
  isVegetarian?: boolean
  variants?: { name: string; price: number }[]
  size?: "small" | "medium" | "large"
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
  variants,
  size = "medium",
  isAdmin = false,
  onEdit,
}: MenuItemCardProps) {
  const { navigate } = useSmoothNavigation()

  const handleClick = () => {
    navigate(`/product/${id}`)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(id)
    }
  }

  // Formatear el precio para mostrar siempre dos decimales
  const formattedPrice = price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={handleClick}
      variants={cardHoverAnimation}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="bg-montebello-navy/80 rounded-lg overflow-hidden border border-montebello-gold/20 h-full flex flex-col">
        {/* Imagen del producto */}
        <div className="relative aspect-square w-full overflow-hidden">
          <OptimizedImage
            src={image || "/diverse-products-still-life.png"}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />

          {/* Botón de edición para administradores */}
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 bg-montebello-gold/20 hover:bg-montebello-gold/30 text-montebello-light rounded-full shadow-sm"
              onClick={handleEditClick}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Información del producto */}
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="font-medium text-montebello-light mb-1 line-clamp-2">{name}</h3>

          {description && (
            <p className="text-xs text-montebello-light/70 mb-2 line-clamp-2">
              {typeof description === "string" ? description.split("•")[0] : description}
            </p>
          )}

          <div className="mt-auto">
            {variants && variants.length > 0 ? (
              <div className="flex justify-between items-center">
                <span className="text-xs text-montebello-light/70">Desde</span>
                <span className="font-bold text-montebello-gold">${formattedPrice}</span>
              </div>
            ) : (
              <div className="flex justify-end">
                <span className="font-bold text-montebello-gold">${formattedPrice}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
