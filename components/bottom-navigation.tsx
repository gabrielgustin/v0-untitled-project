"use client"

import { Home, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useSmoothNavigation } from "@/hooks/use-smooth-navigation"

interface BottomNavigationProps {
  cartItemCount?: number
  cartAnimation?: boolean
}

export function BottomNavigation({ cartItemCount = 0, cartAnimation = false }: BottomNavigationProps) {
  const [screenWidth, setScreenWidth] = useState(0)
  const pathname = usePathname()
  const [isProductDetailPage, setIsProductDetailPage] = useState(false)
  const [showCartBadge, setShowCartBadge] = useState(false)
  const [animateCart, setAnimateCart] = useState(false)
  const { navigate } = useSmoothNavigation()

  // Efecto para determinar si estamos en una página de detalle de producto
  useEffect(() => {
    setIsProductDetailPage(pathname?.startsWith("/product/") || false)
  }, [pathname])

  // Efecto para actualizar el ancho de pantalla
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    // Establecer el ancho inicial
    updateScreenWidth()

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", updateScreenWidth)

    // Limpiar listener
    return () => window.removeEventListener("resize", updateScreenWidth)
  }, [])

  // Efecto para mostrar el badge del carrito si hay items
  useEffect(() => {
    setShowCartBadge(cartItemCount > 0)
  }, [cartItemCount])

  // Efecto para la animación cuando se agrega un producto
  useEffect(() => {
    if (cartAnimation) {
      setAnimateCart(true)
      const timer = setTimeout(() => {
        setAnimateCart(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [cartAnimation])

  // Función para determinar la visibilidad basada en el ancho de pantalla
  const getNavStyles = () => {
    // Si es pantalla grande (>=1024px), ocultar completamente
    if (screenWidth >= 1024) {
      return { display: "none" }
    }

    // Si es pantalla mediana (entre 768px y 1024px), reducir gradualmente la opacidad
    if (screenWidth >= 768) {
      const opacity = 1 - ((screenWidth - 768) / (1024 - 768)) * 0.7 // Reducir opacidad gradualmente
      return { opacity: opacity }
    }

    // Pantalla pequeña, visibilidad completa
    return { opacity: 1 }
  }

  // Si estamos en una página de detalle de producto, no mostrar la navegación
  if (isProductDetailPage) {
    return null
  }

  // Actualizar la aplicación de estilos en el div del navbar
  const navStyles = getNavStyles()

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 w-full bg-[#121628] border-t border-montebello-gold/20 flex justify-around items-center py-3 z-20"
      style={{
        ...navStyles,
      }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="text-montebello-gold hover:bg-montebello-gold/10"
        onClick={() => navigate("/menu")}
      >
        <Home className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-montebello-gold hover:bg-montebello-gold/10 relative"
        onClick={() => navigate("/cart")}
      >
        <div className={`relative ${animateCart ? "animate-bounce" : ""}`}>
          <ShoppingBag className="h-5 w-5" />
          <AnimatePresence>
            {showCartBadge && (
              <motion.span
                className={`absolute -top-2 -right-2 bg-montebello-gold text-montebello-navy text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center ${
                  animateCart ? "scale-125" : ""
                } transition-transform`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </Button>
    </motion.div>
  )
}
