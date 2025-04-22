"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Coffee, UtensilsCrossed, Sandwich, Cake, Croissant } from "lucide-react"
import { motion } from "framer-motion"

interface FoodCategoryProps {
  title: string
  iconType: "breakfast" | "brunch" | "lunch" | "desserts" | "bakery" | "coffee"
  isActive?: boolean
}

export function FoodCategory({ title, iconType, isActive = false }: FoodCategoryProps) {
  const renderIcon = () => {
    switch (iconType) {
      case "breakfast":
        return <Coffee className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-lacapke-charcoal" />
      case "brunch":
        return <Sandwich className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-lacapke-charcoal" />
      case "lunch":
        return <UtensilsCrossed className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-lacapke-charcoal" />
      case "desserts":
        return <Cake className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-lacapke-charcoal" />
      case "bakery":
        return <Croissant className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-lacapke-charcoal" />
      case "coffee":
        return <Coffee className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-lacapke-charcoal" />
      default:
        return <Coffee className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-lacapke-charcoal" />
    }
  }

  return (
    <Card
      className={`border-none shadow-sm ${isActive ? "bg-white" : "bg-lacapke-cream"} h-[90px] sm:h-[100px] md:h-[110px] lg:h-[120px] w-[120px] sm:w-[140px] md:w-[150px] rounded-xl`}
    >
      <CardContent className="py-2 px-3 flex flex-col items-center justify-center gap-2 h-full">
        <motion.div
          className="p-1 bg-white/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
          animate={isActive ? { scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.8)" } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {renderIcon()}
        </motion.div>
        <motion.span
          className="text-xs font-medium text-lacapke-charcoal text-center line-clamp-2"
          animate={isActive ? { fontWeight: 700 } : { fontWeight: 500 }}
        >
          {title}
        </motion.span>
      </CardContent>
    </Card>
  )
}
