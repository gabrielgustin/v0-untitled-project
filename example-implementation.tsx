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

        // Aplicar la clase sticky directamente al elemento
        const carousel = carouselWrapperRef.current.querySelector(".categories-carousel")
        if (carousel) {
          if (shouldBeSticky) {
            carousel.classList.add("sticky")
          } else {
            carousel.classList.remove("sticky")
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isCarouselSticky, carouselHeight])

  // Variantes para la animación del contenido
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  // Variantes para la animación del espaciador
  const spacerVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    expanded: {
      height: carouselHeight,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <div className="min-h-screen bg-montebello-navy">
      <div className="container mx-auto px-4 py-6">
        <motion.h1
          className="text-2xl font-bold text-montebello-gold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ejemplo de Carrusel de Categorías
        </motion.h1>

        {/* Contenedor del carrusel */}
        <div className="categories-wrapper" ref={carouselWrapperRef}>
          <CategoriesCarousel
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            isSticky={isCarouselSticky}
          />
        </div>

        {/* Contenido de ejemplo para hacer scroll */}
        <motion.div className="mt-8 space-y-16" variants={contentVariants} initial="hidden" animate="visible">
          {/* Sección Entradas */}
          <motion.div
            className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeCategory === "entradas" ? 1 : 0.7,
              scale: activeCategory === "entradas" ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-montebello-light text-xl">Sección de Entradas</p>
          </motion.div>

          {/* Sección Platos Principales */}
          <motion.div
            className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeCategory === "principales" ? 1 : 0.7,
              scale: activeCategory === "principales" ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-montebello-light text-xl">Sección de Platos Principales</p>
          </motion.div>

          {/* Sección Postres */}
          <motion.div
            className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeCategory === "postres" ? 1 : 0.7,
              scale: activeCategory === "postres" ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-montebello-light text-xl">Sección de Postres</p>
          </motion.div>

          {/* Sección Bebidas */}
          <motion.div
            className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeCategory === "bebidas" ? 1 : 0.7,
              scale: activeCategory === "bebidas" ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-montebello-light text-xl">Sección de Bebidas</p>
          </motion.div>

          {/* Sección Vinos */}
          <motion.div
            className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeCategory === "vinos" ? 1 : 0.7,
              scale: activeCategory === "vinos" ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-montebello-light text-xl">Sección de Vinos</p>
          </motion.div>

          {/* Sección Cocktails */}
          <motion.div
            className="h-96 bg-montebello-navy/50 rounded-lg border border-montebello-gold/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: activeCategory === "cocktails" ? 1 : 0.7,
              scale: activeCategory === "cocktails" ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-montebello-light text-xl">Sección de Cocktails</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
