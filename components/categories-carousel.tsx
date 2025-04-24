"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FoodCategory } from "@/components/food-category"
import type { ProductCategory } from "@/lib/products"

interface CategoriesCarouselProps {
  activeCategory: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
  isSticky?: boolean
}

export function CategoriesCarousel({ activeCategory, onCategoryChange, isSticky = false }: CategoriesCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

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
    <div className={`categories-carousel ${isSticky ? "sticky" : ""}`}>
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
          className="overflow-x-auto pb-2 hide-scrollbar px-1 pt-2"
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
            <button
              onClick={() => onCategoryChange("entradas")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Entradas"
              aria-pressed={activeCategory === "entradas"}
            >
              <FoodCategory title="Entradas" iconType="entradas" isActive={activeCategory === "entradas"} />
            </button>

            <button
              onClick={() => onCategoryChange("principales")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Platos Principales"
              aria-pressed={activeCategory === "principales"}
            >
              <FoodCategory
                title="Platos & Principales"
                iconType="principales"
                isActive={activeCategory === "principales"}
              />
            </button>

            <button
              onClick={() => onCategoryChange("postres")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Postres"
              aria-pressed={activeCategory === "postres"}
            >
              <FoodCategory title="Postres" iconType="postres" isActive={activeCategory === "postres"} />
            </button>

            <button
              onClick={() => onCategoryChange("bebidas")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Bebidas"
              aria-pressed={activeCategory === "bebidas"}
            >
              <FoodCategory title="Bebidas & Refrescos" iconType="bebidas" isActive={activeCategory === "bebidas"} />
            </button>

            <button
              onClick={() => onCategoryChange("vinos")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Vinos"
              aria-pressed={activeCategory === "vinos"}
            >
              <FoodCategory title="Vinos & Espumantes" iconType="vinos" isActive={activeCategory === "vinos"} />
            </button>

            <button
              onClick={() => onCategoryChange("cocktails")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Cocktails"
              aria-pressed={activeCategory === "cocktails"}
            >
              <FoodCategory title="Cocktails & Tragos" iconType="cocktails" isActive={activeCategory === "cocktails"} />
            </button>
          </div>
        </div>

        {/* Eliminado el indicador de scroll con flechas animadas */}
      </div>
    </div>
  )
}
