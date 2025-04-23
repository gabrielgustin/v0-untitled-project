"use client"

import { Sandwich, Wine, GlassWater } from "lucide-react"
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
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L18 12" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 16L18 16" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 8L18 8" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 4L18 4" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 4L19 8" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 4L5 8" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 12L19 16" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 12L5 16" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8L12 12" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "principales":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3L8 10" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 3L16 10" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 3L12 10" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 10L4 10" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 14L6 14" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 10L12 21" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M19 10C19 15.5228 15.9706 20 12 20C8.02944 20 5 15.5228 5 10"
              stroke="#D4B45A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "postres":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 8C12 5.79086 13.7909 4 16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12"
              stroke="#D4B45A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C12 10.2091 10.2091 12 8 12"
              stroke="#D4B45A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16C20 18.2091 18.2091 20 16 20"
              stroke="#D4B45A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 16C4 13.7909 5.79086 12 8 12C10.2091 12 12 13.7909 12 16C12 18.2091 10.2091 20 8 20"
              stroke="#D4B45A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 8L12 16" stroke="#D4B45A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "bebidas":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 8H19C20.1046 8 21 8.89543 21 10V13C21 14.1046 20.1046 15 19 15H17"
              stroke="#D4B45A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 15V8C17 5.79086 15.2091 4 13 4H8C5.79086 4 4 5.79086 4 8V15C4 17.2091 5.79086 19 8 19H13C15.2091 19 17 17.2091 17 15Z"
              stroke="#D4B45A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12C12 10.3431 10.6569 9 9 9C7.34315 9 6 10.3431 6 12C6 13.6569 7.34315 15 9 15C10.6569 15 12 13.6569 12 12Z"
              stroke="#D4B45A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "vinos":
        return <Wine className="h-4 w-4 text-montebello-gold" />
      case "cocktails":
        return <GlassWater className="h-4 w-4 text-montebello-gold" />
      default:
        return <Sandwich className="h-4 w-4 text-montebello-gold" />
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
        className={`w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center ${
          isActive
            ? "bg-transparent border-2 border-montebello-gold shadow-[0_0_15px_rgba(212,180,90,0.5)]"
            : "bg-transparent border border-montebello-gold/40"
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

      <div className="mt-1 text-center w-full">
        <motion.span
          className={`text-[10px] md:text-xs leading-tight block text-montebello-gold ${isActive ? "font-bold" : "font-medium"}`}
          animate={isActive ? { fontWeight: 700 } : { fontWeight: 500 }}
        >
          {formatTitle(title)}
        </motion.span>
      </div>
    </div>
  )
}
