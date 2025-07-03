"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobilePreviewModal } from "./mobile-preview-modal"

interface FloatingPreviewButtonProps {
  // onClick: () => void // Esta prop ya no es necesaria
  className?: string
}

export function FloatingPreviewButton({ className }: FloatingPreviewButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar la visibilidad del modal

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleOpenModal} // Llama al manejador interno para abrir el modal
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

      <MobilePreviewModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
