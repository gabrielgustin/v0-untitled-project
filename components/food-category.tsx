"use client"

import { Coffee, UtensilsCrossed, Sandwich, Cake, Wine, CoffeeIcon as Cocktail } from "lucide-react"
import { motion } from "framer-motion"

interface FoodCategoryProps {
  title: string
  iconType: "entradas" | "principales" | "postres" | "bebidas" | "vinos" | "cocktails"
  isActive?: boolean
}

export function FoodCategory({ title, iconType, isActive = false }: FoodCategoryProps) {
  const renderIcon = () => {
    switch (iconType) {
      case "entradas":
        return <Sandwich className="h-6 w-6 text-montebello-gold" />
      case "principales":
        return <UtensilsCrossed className="h-6 w-6 text-montebello-gold" />
      case "postres":
        return <Cake className="h-6 w-6 text-montebello-gold" />
      case "bebidas":
        return <Coffee className="h-6 w-6 text-montebello-gold" />
      case "vinos":
        return <Wine className="h-6 w-6 text-montebello-gold" />
      case "cocktails":
        return <Cocktail className="h-6 w-6 text-montebello-gold" />
      default:
        return <Sandwich className="h-6 w-6 text-montebello-gold" />
    }
  }

  // Formatear el título para manejar textos con "&" o "y"
  const formatTitle = (text: string) => {
    // Reemplazar "y" con "&" para mantener consistencia
    const formattedText = text.replace(" y ", " & ")

    // Dividir el texto en dos partes si contiene "&"
    if (formattedText.includes(" & ")) {
      const parts = formattedText.split(" & ")
      return (
        <>
          {parts[0]} &<br />
          {parts[1]}
        </>
      )
    }

    return formattedText
  }

  return (
    <div className="flex flex-col items-center w-16">
      <motion.div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isActive
            ? "bg-montebello-navy border-2 border-montebello-gold" // Eliminado el efecto de sombra
            : "bg-montebello-navy border border-montebello-gold/40"
        }`}
        animate={
          isActive
            ? {
                scale: 1.1,
                // Eliminado el boxShadow para quitar el efecto iluminado
              }
            : {
                scale: 1,
                boxShadow: "none",
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {renderIcon()}
      </motion.div>

      <div className="mt-1 text-center w-full h-8 flex items-center justify-center">
        <motion.span
          className={`text-[10px] leading-tight block text-montebello-gold ${isActive ? "font-bold" : "font-medium"}`}
          animate={isActive ? { fontWeight: 700 } : { fontWeight: 500 }}
        >
          {formatTitle(title)}
        </motion.span>
      </div>
    </div>
  )
}
