"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MobilePreviewModal } from "./mobile-preview-modal"

interface FloatingPreviewButtonProps {
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
          "fixed right-4 bottom-4 z-50 shadow-lg transition-all duration-300 hover:translate-y-[-2px]",
          "bg-montebello-navy text-white rounded-full w-14 h-14 flex items-center justify-center", // Estilos para hacerlo circular y de tamaño fijo
          "md:hidden", // Ocultar en pantallas medianas (desktop) y superiores
          className,
        )}
        variant="default"
      >
        <Eye className="h-6 w-6" /> {/* Icono más grande para el botón circular */}
        <span className="sr-only">Ver tienda en modo cliente</span> {/* Texto solo para lectores de pantalla */}
      </Button>

      <MobilePreviewModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
