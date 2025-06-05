"use client"

import { motion } from "framer-motion"
import { loadingIndicatorAnimation } from "@/lib/animation-utils"

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg"
  color?: "gold" | "light" | "navy"
}

export function LoadingIndicator({ size = "md", color = "gold" }: LoadingIndicatorProps) {
  // Mapear tamaños a valores de píxeles
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  }

  // Mapear colores a clases de Tailwind
  const colorMap = {
    gold: "border-montebello-gold",
    light: "border-montebello-light",
    navy: "border-montebello-navy",
  }

  const pixelSize = sizeMap[size]
  const borderColorClass = colorMap[color]

  return (
    <motion.div
      className={`rounded-full border-2 border-t-transparent ${borderColorClass}`}
      style={{
        width: pixelSize,
        height: pixelSize,
      }}
      variants={loadingIndicatorAnimation}
      animate="animate"
    />
  )
}
