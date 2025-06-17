"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FoodCategory } from "@/components/food-category"
import type { ProductCategory } from "@/lib/products"
import { cn } from "@/lib/utils"

interface CategoriesCarouselProps {
  activeCategory: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
  isSticky: boolean
  stickyTopOffset: number // Prop para el offset superior
}

export function CategoriesCarousel({
  activeCategory,
  onCategoryChange,
  isSticky,
  stickyTopOffset, // Recibir la nueva prop
}: CategoriesCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  // Definición de las categorías con sus tipos de icono
  const categories: {
    id: ProductCategory
    title: string
    iconType: "entradas" | "principales" | "postres" | "bebidas" | "vinos" | "cocktails"
  }[] = [
    { id: "entradas", title: "Entradas", iconType: "entradas" },
    { id: "principales", title: "Platos & Principales", iconType: "principales" },
    { id: "postres", title: "Postres", iconType: "postres" },
    { id: "bebidas", title: "Bebidas & Refrescos", iconType: "bebidas" },
    { id: "vinos", title: "Vinos & Espumantes", iconType: "vinos" },
    { id: "cocktails", title: "Cocktails & Tragos", iconType: "cocktails" },
  ]

  // Verificar si el carrusel necesita scroll
  const checkCarouselOverflow = () => {
    if (carouselRef.current) {
      const isOverflowing = carouselRef.current.scrollWidth > carouselRef.current.clientWidth
      setShowScrollIndicator(isOverflowing)
    }
  }

  // Verificar el overflow del carrusel cuando cambia el tamaño de la ventana
  useEffect(() => {
    // Verificar inicialmente después de que el componente se monte
    setTimeout(checkCarouselOverflow, 500)

    // Verificar cuando cambie el tamaño de la ventana
    const handleResize = () => {
      checkCarouselOverflow()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Función para hacer scroll al botón de categoría activa
  useEffect(() => {
    if (carouselRef.current) {
      const activeButton = carouselRef.current.querySelector(`button[aria-pressed="true"]`) as HTMLElement
      if (activeButton) {
        const containerWidth = carouselRef.current.clientWidth
        const buttonLeft = activeButton.offsetLeft
        const buttonWidth = activeButton.offsetWidth
        const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2

        carouselRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [activeCategory])

  return (
    <motion.div
      className={cn(
        "categories-carousel w-full bg-montebello-navy transition-all duration-300 ease-in-out",
        isSticky && "sticky",
      )}
      style={isSticky ? { top: stickyTopOffset, zIndex: 50 } : {}} // Aplicar el offset dinámico y zIndex alto
      initial={false} // Deshabilitar animaciones iniciales para evitar parpadeos
      animate={{
        paddingTop: isSticky ? "0.5rem" : "0",
        paddingBottom: isSticky ? "0.5rem" : "0",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Título "Categorías" cuando está en modo sticky */}
        <AnimatePresence>
          {isSticky && (
            <motion.div
              className="text-center mb-2 pt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-montebello-gold font-bold text-lg inline-flex items-center">Categorías</h2>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="overflow-x-auto pb-2 hide-scrollbar px-1 pt-2 bg-[#121628]"
          ref={carouselRef}
          onScroll={() => {
            // Verificar si el usuario ha llegado al final del carrusel
            if (carouselRef.current) {
              const isAtEnd =
                carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth - 10
              if (isAtEnd) {
                setShowScrollIndicator(false)
              } else {
                setShowScrollIndicator(true)
              }
            }
          }}
        >
          <div className="flex space-x-3 min-w-max px-2 container mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className="focus:outline-none"
                aria-label={`Seleccionar categoría ${category.title}`}
                aria-pressed={activeCategory === category.id}
              >
                <FoodCategory
                  title={category.title}
                  iconType={category.iconType}
                  isActive={activeCategory === category.id}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
