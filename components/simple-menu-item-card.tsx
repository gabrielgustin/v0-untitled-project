"use client"

import type React from "react"

import Link from "next/link"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
// Importar el nuevo componente VegetarianBadge
import { VegetarianBadge } from "@/components/vegetarian-badge"

// Modificar la interfaz SimpleMenuItemCardProps para incluir description
interface SimpleMenuItemCardProps {
  id: string
  name: string
  price: number
  description: string
  isAdmin?: boolean
  onEdit?: (id: string) => void
  isVegetarian?: boolean
}

export function SimpleMenuItemCard({
  id,
  name,
  price,
  description,
  isAdmin = false,
  onEdit,
  isVegetarian = false,
}: SimpleMenuItemCardProps) {
  const formattedId = id.toLowerCase().replace(/\s+/g, "-")

  // Función para manejar el clic en el botón de edición
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onEdit) {
      onEdit(id)
    }
  }

  // Actualizar el return para incluir estilos condicionales para móvil
  return (
    <Link href={`/product/${formattedId}`} className="block h-full">
      <div className="bg-[#f8f5d7] rounded-xl overflow-hidden shadow-sm h-full flex flex-col p-2 sm:p-3 relative">
        {/* Botón de edición para administradores */}
        {isAdmin && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 z-10 h-6 w-6 bg-white/80 hover:bg-white text-lacapke-charcoal rounded-full shadow-sm"
            onClick={handleEditClick}
          >
            <Edit className="h-3 w-3" />
          </Button>
        )}

        {/* Título en la parte superior izquierda */}
        {/* Dentro del componente, modificar la sección del contenido para incluir la descripción
        Buscar la sección donde está el título y añadir la descripción justo después */}
        <div className="mb-auto">
          <h3 className="font-bold text-lacapke-charcoal text-xs sm:text-sm font-['Open_Sans']">{name}</h3>
          <p className="text-lacapke-charcoal/80 text-[9px] sm:text-[10px] line-clamp-2 mt-0.5">{description}</p>
        </div>

        {/* Contenedor para el logo/ícono vegetariano y el precio en la parte inferior */}
        <div className="flex justify-between items-center w-full mt-1 sm:mt-2">
          {/* Ícono vegetariano en la parte inferior izquierda */}
          <div className="relative">{isVegetarian && <VegetarianBadge className="h-4 w-4 sm:h-5 sm:w-5" />}</div>

          {/* Precio en la parte inferior derecha */}
          <span className="font-bold text-lacapke-charcoal text-xs sm:text-sm font-['Open_Sans']">$ {price}</span>
        </div>
      </div>
    </Link>
  )
}
