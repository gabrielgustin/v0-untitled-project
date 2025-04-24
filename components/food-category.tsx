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

  // Variantes para el círculo del icono
  const circleVariants = {
    inactive: {
      scale: 1,
      borderColor: "rgba(212, 180, 90, 0.4)",
      borderWidth: "1px",
      backgroundColor: "#121628",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    active: {
      scale: 1.1,
      borderColor: "#d4b45a",
      borderWidth: "2px",
      backgroundColor: "#121628",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  // Variantes para el texto
  const textVariants = {
    inactive: {
      fontWeight: 500,
      color: "rgba(212, 180, 90, 0.8)",
      transition: {
        duration: 0.2,
      },
    },
    active: {
      fontWeight: 700,
      color: "#d4b45a",
      transition: {
        duration: 0.2,
      },
    },
  }

  // Variantes para el icono
  const iconVariants = {
    inactive: {
      scale: 1,
      opacity: 0.8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    active: {
      scale: 1.1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <div className="flex flex-col items-center w-16">
      <motion.div
        className="w-12 h-12 rounded-full flex items-center justify-center border border-montebello-gold/40"
        variants={circleVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        layout
      >
        <motion.div variants={iconVariants} initial="inactive" animate={isActive ? "active" : "inactive"} layout>
          {renderIcon()}
        </motion.div>
      </motion.div>

      <div className="mt-1 text-center w-full h-8 flex items-center justify-center">
        <motion.span
          className="text-[10px] leading-tight block"
          variants={textVariants}
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
          layout
        >
          {formatTitle(title)}
        </motion.span>
      </div>
    </div>
  )
}
