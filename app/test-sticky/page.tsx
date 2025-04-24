"use client"

import { useState, useRef, useEffect } from "react"
import { CategoriesCarousel } from "@/components/categories-carousel"
import type { ProductCategory } from "@/lib/products"

export default function TestStickyPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("entradas")
  const [isCarouselSticky, setIsCarouselSticky] = useState(false)
  const carouselWrapperRef = useRef<HTMLDivElement>(null)

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category)
  }

  // Configurar el comportamiento sticky del carrusel
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselWrapperRef.current) return

      const rect = carouselWrapperRef.current.getBoundingClientRect()
      const isDesktop = window.innerWidth >= 1024
      const desktopOffset = isDesktop ? 72 : 0 // 72px es la altura de la barra de navegación de escritorio

      // Determinar si el carrusel debe ser sticky
      const shouldBeSticky = rect.top <= desktopOffset

      if (shouldBeSticky !== isCarouselSticky) {
        setIsCarouselSticky(shouldBeSticky)

        // Actualizar el espaciador
        const spacer = document.querySelector(".categories-spacer")
        if (spacer) {
          if (shouldBeSticky) {
            spacer.classList.add("active")
          } else {
            spacer.classList.remove("active")
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isCarouselSticky])

  return (
    <div className="min-h-screen bg-montebello-navy">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-montebello-gold mb-6">Prueba de Carrusel Sticky</h1>

        {/* Contenedor del carrusel */}
        <div className="categories-wrapper" ref={carouselWrapperRef}>
          <CategoriesCarousel
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            isSticky={isCarouselSticky}
          />
          <div className={`categories-spacer ${isCarouselSticky ? "active" : ""}`}></div>
        </div>

        {/* Contenido de ejemplo para hacer scroll */}
        <div className="mt-8 space-y-16">
          {/* Generar 10 secciones para poder hacer scroll */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center"
            >
              <p className="text-montebello-light text-xl">Sección {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
