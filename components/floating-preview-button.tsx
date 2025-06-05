"use client"

import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FloatingPreviewButtonProps {
  onClick: () => void
  className?: string
}

export function FloatingPreviewButton({ onClick, className }: FloatingPreviewButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed right-4 bottom-4 z-50 shadow-lg transition-all duration-300 flex items-center gap-2 hover:translate-y-[-2px] bg-montebello-navy text-white hidden sm:flex md:hidden",
        className,
      )}
      variant="default"
    >
      <Eye className="h-4 w-4" />
      <span className="hidden sm:inline">Ver tienda en modo cliente</span>
      <span className="inline sm:hidden">Ver tienda</span>
    </Button>
  )
}
