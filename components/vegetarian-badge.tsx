"use client"

import { cn } from "@/lib/utils"

interface VegetarianBadgeProps {
  className?: string
  size?: number
}

export function VegetarianBadge({ className, size = 24 }: VegetarianBadgeProps) {
  return (
    <span
      className={cn("flex items-center justify-center rounded-full bg-green-600/20 p-1", className)}
      style={{ width: size, height: size }}
    >
      <span className="sr-only">Vegetariano</span>
    </span>
  )
}
