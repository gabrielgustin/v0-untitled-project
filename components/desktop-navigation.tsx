"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ShoppingBag, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout, type User as UserType, getAuthState } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"
import { useRouter } from "next/navigation" // Importar useRouter
import { AnimatePresence, motion } from "framer-motion" // Importar motion y AnimatePresence

interface DesktopNavigationProps {
  user: UserType | null
  onLoginSuccess: () => void
  cartItemCount?: number // Esta es la prop que usaremos
  cartAnimation?: boolean // Esta es la prop que usaremos
}

export function DesktopNavigation({
  user,
  onLoginSuccess,
  cartItemCount = 0,
  cartAnimation = false,
}: DesktopNavigationProps) {
  const [storeName, setStoreName] = useState("CLUB MONTEBELLO")
  const [showLoginForm, setShowLoginForm] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter() // Inicializar useRouter

  // Estado local para la animación del badge del carrito
  const [animateCartBadge, setAnimateCartBadge] = useState(false)

  useEffect(() => {
    // Cargar el nombre de la tienda desde localStorage al iniciar
    const savedName = localStorage.getItem("storeName")
    if (savedName) {
      setStoreName(savedName.toUpperCase())
    }

    // Función para manejar cambios en el nombre de la tienda
    const handleStoreNameChange = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail) {
        setStoreName(customEvent.detail.toUpperCase())
        // También actualizar el título del documento
        document.title = customEvent.detail
      }
    }

    // Añadir event listener
    document.addEventListener("storeNameChanged", handleStoreNameChange)

    // Limpiar event listener al desmontar
    return () => {
      document.removeEventListener("storeNameChanged", handleStoreNameChange)
    }
  }, [])

  // Efecto para la animación cuando se agrega un producto (usando la prop cartAnimation)
  useEffect(() => {
    if (cartAnimation) {
      setAnimateCartBadge(true)
      const timer = setTimeout(() => {
        setAnimateCartBadge(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [cartAnimation])

  // Efecto para bloquear el scroll cuando el modal está abierto
  useEffect(() => {
    if (showLoginForm) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showLoginForm])

  const handleLogout = () => {
    logout()
    // Usar router.push para una navegación suave sin recarga completa
    router.push("/menu")
  }

  const handleLoginSuccess = () => {
    // Cerrar el modal
    setShowLoginForm(false)

    // Obtener el estado de autenticación actualizado
    const authUser = getAuthState()

    // Actualizar el estado local del usuario
    if (authUser) {
      // No actualizamos el user aquí, ya que se pasa como prop desde MenuPage
      // y se espera que MenuPage maneje la autenticación.
      // setUser(authUser); // Esto ya no es necesario aquí

      // Establecer la bandera para mostrar el panel de administración
      localStorage.setItem("show_admin_panel", "true")

      // Usar router.push para una navegación suave sin recarga completa
      router.push("/menu")
    }
    // Llamar a la función onLoginSuccess pasada por prop
    onLoginSuccess()
  }

  const handleCloseModal = () => {
    setShowLoginForm(false)
  }

  // Cerrar el modal si se hace clic fuera de él
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowLoginForm(false)
    }
  }

  // Verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    // Este useEffect es para el estado inicial del usuario en DesktopNavigation
    // Si el user prop ya viene, no es necesario cargarlo de nuevo.
    if (!user) {
      const authUser = getAuthState()
      if (authUser) {
        // Solo actualizamos el estado local si no se pasó un user por prop
        // Esto es para el caso de que DesktopNavigation se use de forma independiente
        // o en una ruta donde el user no se pasa directamente.
        // En el contexto de MenuPage, el user ya se pasa como prop.
        // setUser(authUser);
      }
    }
  }, [user]) // Depende de la prop user

  return (
    <div className="hidden md:flex items-center justify-between px-8 py-4 bg-montebello-navy text-white">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-lg font-medium hover:text-montebello-gold transition-colors">
          Inicio
        </Link>
        <Link href="/menu" className="text-lg font-medium hover:text-montebello-gold transition-colors">
          Menú
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-montebello-gold">{storeName}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/cart" className="relative">
          <div className={`relative ${animateCartBadge ? "animate-bounce" : ""}`}>
            <ShoppingBag className="h-6 w-6 text-white hover:text-montebello-gold transition-colors" />
            <AnimatePresence>
              {cartItemCount > 0 && (
                <motion.span
                  className={`absolute -top-2 -right-2 bg-montebello-gold text-montebello-navy rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ${
                    animateCartBadge ? "scale-125" : ""
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
        </Link>
        {!user ? (
          <Button
            variant="outline"
            className="bg-montebello-navy border-montebello-gold text-white hover:bg-montebello-gold hover:text-montebello-navy transition-colors"
            onClick={() => setShowLoginForm(true)}
          >
            Iniciar sesión
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-montebello-gold">{user.username}</span>
            {user.username === "Admin" || user.username === "Admin1" ? (
              <Button
                variant="outline"
                size="sm"
                className="border-montebello-gold/20 text-montebello-gold hover:bg-montebello-gold/10"
                onClick={() => {
                  localStorage.setItem("show_admin_panel", "true")
                  router.push("/menu") // Usar router.push aquí también
                }}
              >
                Panel Admin
              </Button>
            ) : null}
            <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-900/20" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Modal de inicio de sesión - Nuevo diseño solo para desktop */}
      {showLoginForm && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]" onClick={handleOutsideClick}>
          <div className="fixed inset-0 bg-black opacity-80"></div>
          <div
            ref={modalRef}
            className="bg-montebello-navy w-full max-w-md mx-auto rounded-lg border-2 border-montebello-gold shadow-2xl relative z-[10000]"
          >
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseModal}
                className="h-8 w-8 rounded-full bg-montebello-navy hover:bg-montebello-gold/20 text-montebello-gold"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-montebello-gold text-center mb-6">Iniciar Sesión</h2>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
