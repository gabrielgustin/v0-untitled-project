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
    <div className="flex flex-col items-center">
      <motion.div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
          isActive
            ? "bg-montebello-navy border-2 border-montebello-gold shadow-[0_0_15px_rgba(212,180,90,0.5)]"
            : "bg-montebello-navy border border-montebello-gold/40"
        }`}
        animate={
          isActive
            ? {
                scale: 1.05,
                boxShadow: "0 0 15px rgba(212, 180, 90, 0.5)",
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

      <div className="mt-2 text-center w-full">
        <motion.span
          className={`text-xs md:text-sm leading-tight block text-montebello-gold ${isActive ? "font-bold" : "font-medium"}`}
          animate={isActive ? { fontWeight: 700 } : { fontWeight: 500 }}
        >
          {formatTitle(title)}
        </motion.span>
      </div>
    </div>
  )
}
