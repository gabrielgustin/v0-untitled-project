"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VegetarianBadge } from "@/components/vegetarian-badge"
import { motion } from "framer-motion"
import { cardAnimation } from "@/lib/animation-utils"
import { getDefaultImage } from "@/lib/products"

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
  const defaultImage = getDefaultImage(size === "large" ? "bebidas" : null, name)

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
      <motion.div
        className="bg-montebello-navy/80 rounded-xl overflow-hidden shadow-sm h-full flex flex-col relative border border-montebello-gold/20"
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={cardAnimation}
      >
        {/* Botón de edición para administradores */}
        {isAdmin && (
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 h-7 w-7 sm:h-8 sm:w-8 bg-montebello-gold/20 hover:bg-montebello-gold/30 text-montebello-light rounded-full shadow-sm"
              onClick={handleEditClick}
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </motion.div>
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

          <motion.div
            className="relative h-full w-full rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Usar img en lugar de Image para mayor compatibilidad */}
            <img
              src={image || defaultImage}
              alt={name}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
          </motion.div>
        </div>
        <div className="p-2 py-1.5 sm:p-3 sm:py-2 lg:p-4 flex flex-col flex-grow">
          {/* Título en la parte superior */}
          <motion.h3
            className="font-bold text-montebello-gold text-[11px] sm:text-sm lg:text-base font-open-sans mb-0.5"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {name}
          </motion.h3>

          {/* Descripción del producto */}
          <motion.p
            className="text-montebello-light/80 text-[9px] sm:text-xs lg:text-xs line-clamp-2 mb-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* Variantes (si existen) */}
          {variants.length > 0 && (
            <motion.div
              className="space-y-0.5 sm:space-y-1 mt-1 sm:mt-1.5 lg:mt-2 lg:space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {variants.map((variant, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between text-xs lg:text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-montebello-light font-bold text-xs lg:text-sm">{variant.name}</span>
                  <div className="flex items-center">
                    <div className="border-b border-dotted border-montebello-gold/30 flex-grow mx-1 sm:mx-2 w-8 sm:w-12 lg:w-16"></div>
                    <span className="font-bold text-montebello-gold font-open-sans text-xs lg:text-sm">
                      $ {variant.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Logo y precio en la parte inferior */}
          <motion.div
            className="mt-auto pt-1 sm:pt-2 flex justify-end items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Ícono vegetariano en la parte inferior izquierda */}
            <div className="relative">
              {isVegetarian && (
                <motion.div
                  initial={{ rotate: -10, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <VegetarianBadge className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
              )}
            </div>

            {/* Precio en la parte inferior derecha */}
            {!variants.length && (
              <motion.span
                className="font-bold text-montebello-gold text-xs sm:text-sm lg:text-base font-open-sans"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                $ {price}
              </motion.span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}
