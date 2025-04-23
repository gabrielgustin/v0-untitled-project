"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { CategoriesCarousel } from "@/components/categories-carousel"
import type { ProductCategory } from "@/lib/products"

export default function ExamplePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("entradas")
  const [isCarouselSticky, setIsCarouselSticky] = useState(false)
  const [carouselHeight, setCarouselHeight] = useState(0)
  const carouselWrapperRef = useRef<HTMLDivElement>(null)

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category)
    // Aquí puedes agregar lógica para desplazarse a la sección correspondiente
  }

  // Configurar el comportamiento sticky del carrusel
  useEffect(() => {
    // Guardar la altura original del carrusel
    if (carouselWrapperRef.current) {
      const carousel = carouselWrapperRef.current.querySelector(".categories-carousel")
      if (carousel) {
        setCarouselHeight(carousel.clientHeight)
      }
    }

    const handleScroll = () => {
      if (!carouselWrapperRef.current) return

      const rect = carouselWrapperRef.current.getBoundingClientRect()
      const isDesktop = window.innerWidth >= 1024
      const desktopOffset = isDesktop ? 72 : 0 // 72px es la altura de la barra de navegación de escritorio

      // Determinar si el carrusel debe ser sticky
      const shouldBeSticky = rect.top <= desktopOffset

      if (shouldBeSticky !== isCarouselSticky) {
        setIsCarouselSticky(shouldBeSticky)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isCarouselSticky, carouselHeight])

  return (
    <div className="min-h-screen bg-montebello-navy">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-montebello-gold mb-6">Ejemplo de Carrusel de Categorías</h1>

        {/* Contenedor del carrusel */}
        <div className="categories-wrapper" ref={carouselWrapperRef}>
          {/* Espaciador animado para mantener el flujo del documento */}
          <motion.div
            className="categories-spacer"
            animate={{
              height: isCarouselSticky ? carouselHeight : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />

          {/* Carrusel de categorías */}
          <CategoriesCarousel
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            isSticky={isCarouselSticky}
          />
        </div>

        {/* Contenido de ejemplo para hacer scroll */}
        <div className="mt-8 space-y-16">
          {/* Aquí irían las secciones de categorías */}
          <div className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center">
            <p className="text-montebello-light">Sección de Entradas</p>
          </div>
          <div className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center">
            <p className="text-montebello-light">Sección de Platos Principales</p>
          </div>
          {/* Más secciones... */}
        </div>
      </div>
    </div>
  )
}
