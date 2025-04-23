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

  // Variantes de animación para el carrusel
  const carouselVariants = {
    sticky: {
      position: "fixed",
      top: window.innerWidth >= 1024 ? 72 : 0,
      left: 0,
      right: 0,
      zIndex: 40,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    normal: {
      position: "relative",
      top: 0,
      boxShadow: "none",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  // Variantes para el título
  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      className={`categories-carousel ${isSticky ? "sticky" : ""}`}
      variants={carouselVariants}
      animate={isSticky ? "sticky" : "normal"}
      initial={false}
    >
      <div className="relative">
        {/* Título "Categorías" cuando está en modo sticky */}
        <AnimatePresence>
          {isSticky && (
            <motion.div
              className="text-center mb-2 pt-1"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-montebello-gold font-bold text-lg inline-flex items-center">
                Categorías
                {showScrollIndicator && (
                  <motion.span
                    className="text-montebello-gold/70 ml-2 text-xl"
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    »
                  </motion.span>
                )}
              </h2>
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
            <motion.button
              onClick={() => onCategoryChange("entradas")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Entradas"
              aria-pressed={activeCategory === "entradas"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FoodCategory title="Entradas" iconType="entradas" isActive={activeCategory === "entradas"} />
            </motion.button>

            <motion.button
              onClick={() => onCategoryChange("principales")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Platos Principales"
              aria-pressed={activeCategory === "principales"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FoodCategory
                title="Platos & Principales"
                iconType="principales"
                isActive={activeCategory === "principales"}
              />
            </motion.button>

            <motion.button
              onClick={() => onCategoryChange("postres")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Postres"
              aria-pressed={activeCategory === "postres"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FoodCategory title="Postres" iconType="postres" isActive={activeCategory === "postres"} />
            </motion.button>

            <motion.button
              onClick={() => onCategoryChange("bebidas")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Bebidas"
              aria-pressed={activeCategory === "bebidas"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FoodCategory title="Bebidas & Refrescos" iconType="bebidas" isActive={activeCategory === "bebidas"} />
            </motion.button>

            <motion.button
              onClick={() => onCategoryChange("vinos")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Vinos"
              aria-pressed={activeCategory === "vinos"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FoodCategory title="Vinos & Espumantes" iconType="vinos" isActive={activeCategory === "vinos"} />
            </motion.button>

            <motion.button
              onClick={() => onCategoryChange("cocktails")}
              className="focus:outline-none"
              aria-label="Seleccionar categoría Cocktails"
              aria-pressed={activeCategory === "cocktails"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FoodCategory title="Cocktails & Tragos" iconType="cocktails" isActive={activeCategory === "cocktails"} />
            </motion.button>
          </div>
        </div>

        {/* Indicador de scroll */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <path
                  d="M13 17L18 12L13 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 17L11 12L6 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
