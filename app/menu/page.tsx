"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, Home, ShoppingBag, LogOut, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FoodCategory } from "@/components/food-category"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MenuItemCard } from "@/components/menu-item-card"
import { LoginForm } from "@/components/login-form"
import { AdminPanel } from "@/components/admin-panel"
import { ProductEditModal } from "@/components/product-edit-modal"
import Link from "next/link"
import { getAuthState, logout, type User } from "@/lib/auth"
import {
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct,
  resetProducts,
  getDefaultCategory,
  getFeaturedProducts,
  type Product,
  type ProductCategory,
  initialProducts,
} from "@/lib/products"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { useSearchParams } from "next/navigation"
import { RefreshDataButton } from "@/components/refresh-data-button"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn, mobileMenuAnimation, menuItemAnimation } from "@/lib/animation-utils"

// Importar el componente
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { LogoContainer } from "@/components/logo-container"

// Definir el tipo para un item del carrito
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: string
}

// Reemplazar el componente HamburgerIcon actual con esta versión
// que mantiene el tamaño del SVG pero tiene líneas más gruesas y prominentes
const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 6C4 5.44772 4.44772 5 5 5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H5C4.44772 7 4 6.55228 4 6Z"
        fill="currentColor"
      />
      <path
        d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
        fill="currentColor"
      />
      <path
        d="M5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18C20 17.4477 19.5523 17 19 17H5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function MenuPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("entradas")
  const [cartItemCount, setCartItemCount] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  // Añadir después de la declaración de carouselRef
  const searchParams = useSearchParams()
  const editProductId = searchParams.get("edit")

  // Referencias para las secciones de categoría
  const entradasRef = useRef<HTMLDivElement>(null)
  const principalesRef = useRef<HTMLDivElement>(null)
  const postresRef = useRef<HTMLDivElement>(null)
  const bebidasRef = useRef<HTMLDivElement>(null)
  const vinosRef = useRef<HTMLDivElement>(null)
  const cocktailsRef = useRef<HTMLDivElement>(null)

  // Cargar el estado de autenticación y productos al iniciar
  useEffect(() => {
    const authUser = getAuthState()
    if (authUser) {
      setUser(authUser)
    }

    // Iniciar carga
    setIsLoading(true)

    try {
      // Intentar cargar productos
      let loadedProducts = getProducts()

      // Asegurarse de que siempre haya productos
      if (!loadedProducts || loadedProducts.length === 0) {
        console.log("No se encontraron productos, usando productos iniciales")
        loadedProducts = initialProducts
      }

      console.log(`Cargados ${loadedProducts.length} productos`)
      setProducts(loadedProducts)

      // Cargar productos destacados
      const featured = loadedProducts.filter((p) => p.featured === true)
      setFeaturedProducts(featured.length > 0 ? featured : initialProducts.filter((p) => p.featured === true))
    } catch (error) {
      console.error("Error al cargar productos:", error)
      // En caso de error, usar los productos iniciales
      setProducts(initialProducts)
      setFeaturedProducts(initialProducts.filter((p) => p.featured === true))
    } finally {
      // Finalizar carga
      setIsLoading(false)
    }
  }, [])

  // Función para verificar si el carrusel necesita scroll
  const checkCarouselOverflow = () => {
    if (carouselRef.current) {
      const isOverflowing = carouselRef.current.scrollWidth > carouselRef.current.clientWidth
      setShowScrollIndicator(isOverflowing)
    }
  }

  // Verificar el overflow del carrusel cuando cambia el tamaño de la ventana
  useEffect(() => {
    // Verificar inicialmente después de que el componente se monte
    setTimeout(checkCarouselOverflow, 500) // Pequeño retraso para asegurar que el carrusel esté renderizado

    // Verificar cuando cambie el tamaño de la ventana
    const handleResize = () => {
      checkCarouselOverflow()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Verificar si hay un producto para editar desde la URL
  useEffect(() => {
    if (editProductId && isAdmin) {
      const productToEdit = products.find((p) => p.id === editProductId)
      if (productToEdit) {
        setEditingProduct(productToEdit)
        setShowEditModal(true)
      }
    }
  }, [editProductId, products])

  // Cargar carrito y calcular cantidad de items
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[]
        const totalItems = parsedCart.reduce((sum, item) => sum + item.quantity, 0)
        setCartItemCount(totalItems)
      } catch (e) {
        console.error("Error parsing cart from localStorage", e)
      }
    }
  }, [])

  // Efecto para la animación inicial del carrusel
  useEffect(() => {
    // Mostrar una animación sutil después de cargar la página
    const carousel = document.getElementById("categories-carousel")
    if (carousel) {
      // Asegurarse de que el carrusel sea visible inicialmente
      setTimeout(() => {
        carousel.scrollLeft = 0
        checkCarouselOverflow() // Verificar si hay overflow después de inicializar
      }, 500)
    }
  }, [])

  // Función para desplazar el carrusel a la izquierda
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -150, behavior: "smooth" })
    }
  }

  // Función para desplazar el carrusel a la derecha
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 150, behavior: "smooth" })
    }
  }

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout()
    setUser(null)
    setIsMenuOpen(false)
  }

  // Modificar la función handleLoginSuccess para asegurar que el modal se cierre después de iniciar sesión
  const handleLoginSuccess = () => {
    const authUser = getAuthState()
    setUser(authUser)
    setShowLoginForm(false) // Asegurarse de que el modal se cierre
    setIsMenuOpen(false) // Cerrar el menú móvil si está abierto
  }

  // Función para editar un producto
  const handleEditProduct = (productId: string) => {
    const productToEdit = products.find((p) => p.id === productId)
    if (productToEdit) {
      setEditingProduct(productToEdit)
      setShowEditModal(true)
    } else {
      // Si no se encuentra en la lista de productos, crear uno nuevo con ese ID
      const productName = productId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      const newProduct: Product = {
        id: productId,
        name: productName,
        description: "",
        price: 0,
        category: getDefaultCategory(productId, productName),
      }
      setEditingProduct(newProduct)
      setShowEditModal(true)
    }
  }

  // Modificar la función handleSaveProduct para actualizar inmediatamente la UI
  const handleSaveProduct = (updatedProduct: Product) => {
    const updatedProducts = updateProduct(updatedProduct)
    setProducts(updatedProducts)
    setShowEditModal(false)
    setEditingProduct(null)

    // Actualizar la categoría si ha cambiado
    if (updatedProduct.category && updatedProduct.category !== activeCategory) {
      setActiveCategory(updatedProduct.category)
      scrollToCategory(updatedProduct.category)
    }

    // Actualizar productos destacados si es necesario
    if (updatedProduct.featured) {
      setFeaturedProducts(getFeaturedProducts())
    }

    // Mostrar notificación de éxito
    toast({
      title: "Cambios guardados",
      description: "Los cambios han sido guardados correctamente",
      duration: 3000,
    })
  }

  // Función para añadir un nuevo producto
  const handleAddProduct = (newProduct: Product) => {
    const updatedProducts = addProduct(newProduct)
    setProducts(updatedProducts)

    // Actualizar productos destacados si es necesario
    if (newProduct.featured) {
      setFeaturedProducts(getFeaturedProducts())
    }

    // Mostrar notificación de éxito
    toast({
      title: "Producto añadido",
      description: "El nuevo producto ha sido añadido correctamente",
      duration: 3000,
    })
  }

  // Función para eliminar un producto
  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = deleteProduct(productId)
    setProducts(updatedProducts)
    setShowEditModal(false)
    setEditingProduct(null)

    // Actualizar productos destacados
    setFeaturedProducts(getFeaturedProducts())

    // Mostrar notificación de éxito
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado correctamente",
      duration: 3000,
    })
  }

  // Función para restablecer los productos
  const handleResetProducts = () => {
    const originalProducts = resetProducts()
    setProducts(originalProducts)
    setFeaturedProducts(getFeaturedProducts())
  }

  // Función para hacer scroll a la categoría seleccionada
  const scrollToCategory = (category: ProductCategory) => {
    setActiveCategory(category)

    let ref = null
    switch (category) {
      case "entradas":
        ref = entradasRef
        break
      case "principales":
        ref = principalesRef
        break
      case "postres":
        ref = postresRef
        break
      case "bebidas":
        ref = bebidasRef
        break
      case "vinos":
        ref = vinosRef
        break
      case "cocktails":
        ref = cocktailsRef
        break
    }

    if (ref && ref.current) {
      // Scroll con animación suave
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Verificar si el usuario es administrador
  const isAdmin = user?.username === "Admin1"

  // Obtener títulos de categorías
  const getCategoryTitle = (category: ProductCategory): string => {
    switch (category) {
      case "entradas":
        return "ENTRADAS"
      case "principales":
        return "PLATOS PRINCIPALES"
      case "postres":
        return "POSTRES"
      case "bebidas":
        return "BEBIDAS"
      case "vinos":
        return "VINOS"
      case "cocktails":
        return "COCKTAILS"
      default:
        return "ENTRADAS"
    }
  }

  // Filtrar productos por categoría
  const entradasProducts = products.filter((product) => product.category === "entradas")
  const principalesProducts = products.filter((product) => product.category === "principales")
  const postresProducts = products.filter((product) => product.category === "postres")
  const bebidasProducts = products.filter((product) => product.category === "bebidas")
  const vinosProducts = products.filter((product) => product.category === "vinos")
  const cocktailsProducts = products.filter((product) => product.category === "cocktails")

  // Renderizar un estado de carga mientras se cargan los productos
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-montebello-navy">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-montebello-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-montebello-light text-lg">Cargando menú...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-montebello-navy min-h-screen">
      {/* Script externo eliminado para evitar conflictos con la implementación en React */}

      {/* Desktop Navigation con contador de carrito */}
      <DesktopNavigation user={user} onLoginSuccess={handleLoginSuccess} cartItemCount={cartItemCount} />

      {/* Mobile Header */}
      <header className="lg:hidden pt-6 pb-2">
        <div className="flex justify-between items-center mb-6 container mx-auto">
          <div
            className={`cursor-pointer z-50 pl-4 ${isMenuOpen ? "opacity-0" : "opacity-100"} transition-opacity`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-7 h-0.5 bg-montebello-gold mb-1.5"></div>
            <div className="w-7 h-0.5 bg-montebello-gold mb-1.5"></div>
            <div className="w-7 h-0.5 bg-montebello-gold"></div>
          </div>

          <div className="flex-1">
            <LogoContainer size="large" />
          </div>

          <div className="w-7"></div>
        </div>

        {/* Slide-out Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Modificar la sección del menú lateral para que se parezca al de LaCaphe
        Buscar la sección que comienza con <motion.div className="fixed top-0 left-0 bottom-0... */}

        {/* Reemplazar con este nuevo diseño */}
        <motion.div
          className="fixed top-0 left-0 bottom-0 w-80 bg-montebello-navy z-50 shadow-xl"
          variants={mobileMenuAnimation}
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
        >
          {/* Botón de cierre en la esquina superior derecha */}
          <div className="absolute right-4 top-4 z-10">
            <motion.button
              variants={menuItemAnimation}
              className="h-10 w-10 flex items-center justify-center text-montebello-light"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Logo centrado */}
          <div className="flex justify-center items-center pt-12 pb-6">
            <div className="w-24 h-24 rounded-full bg-montebello-navy flex items-center justify-center border border-montebello-gold/30">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/golden-leaf-restaurant-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png"
                alt="Club Montebello Logo"
                className="h-20 w-20 object-contain rounded-full"
              />
            </div>
          </div>

          {/* Botón de inicio de sesión */}
          <div className="px-6 mb-8">
            {!user ? (
              <Button
                className="w-full bg-montebello-gold hover:bg-montebello-gold/90 text-montebello-navy font-medium py-5 rounded-full"
                onClick={() => setShowLoginForm(true)}
              >
                Iniciar Sesión
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-montebello-gold font-medium text-lg">{user.username}</p>
                <Button variant="ghost" className="mt-2 text-red-400 hover:bg-red-900/20" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </div>
            )}
          </div>

          {/* Separador */}
          <div className="border-t border-montebello-gold/10 mb-6"></div>

          {/* Navegación simplificada */}
          <motion.nav className="px-6">
            <motion.ul className="space-y-6">
              <motion.li variants={menuItemAnimation}>
                <Link
                  href="/"
                  className="flex items-center text-montebello-light hover:text-montebello-gold transition-colors"
                >
                  <Home className="mr-4 h-6 w-6" />
                  <span className="text-lg">Home</span>
                </Link>
              </motion.li>
              <motion.li variants={menuItemAnimation}>
                <Link
                  href="/menu"
                  className="flex items-center text-montebello-light hover:text-montebello-gold transition-colors"
                >
                  <Utensils className="mr-4 h-6 w-6" />
                  <span className="text-lg">Menú</span>
                </Link>
              </motion.li>
              <motion.li variants={menuItemAnimation}>
                <Link
                  href="/cart"
                  className="flex items-center text-montebello-light hover:text-montebello-gold transition-colors"
                >
                  <div className="relative mr-4">
                    <ShoppingBag className="h-6 w-6" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-montebello-gold text-montebello-navy text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount > 9 ? "9+" : cartItemCount}
                      </span>
                    )}
                  </div>
                  <span className="text-lg">Mi Pedido</span>
                </Link>
              </motion.li>
            </motion.ul>
          </motion.nav>
        </motion.div>

        {/* Modal de inicio de sesión */}
        {showLoginForm && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 text-montebello-light z-20 bg-montebello-navy rounded-full"
                onClick={() => setShowLoginForm(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        )}

        {/* Modal de edición de producto */}
        {showEditModal && (
          <ProductEditModal
            product={editingProduct}
            onClose={() => {
              setShowEditModal(false)
              setEditingProduct(null)
            }}
            onSave={handleSaveProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      </header>

      {/* Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Input
              placeholder="Buscar.."
              className="bg-montebello-navy/50 border-montebello-gold/20 shadow-sm text-montebello-light rounded-full py-6"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-montebello-navy/50 shadow-sm border-montebello-gold/20 text-montebello-light rounded-full h-12 w-12"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20 lg:pb-10">
        {/* Panel de Administración (solo visible para administradores) */}
        {isAdmin && (
          <>
            <AdminPanel
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              onResetProducts={handleResetProducts}
            />
            <div className="flex justify-end mb-4">
              <RefreshDataButton onRefresh={(updatedProducts) => setProducts(updatedProducts)} />
            </div>
          </>
        )}

        {/* Categories Header - Similar al ejemplo */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-montebello-gold">Categorías</h2>
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                className="text-sm text-montebello-light/60 flex items-center relative"
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

        {/* Categories Carousel - Implementación con position: sticky */}
        <div className="sticky-carousel-wrapper">
          <div className="sticky-carousel">
            <div
              className="overflow-x-auto pb-4 hide-scrollbar sticky-carousel-container px-1 pt-4"
              id="categories-carousel"
              ref={carouselRef}
              onScroll={() => {
                // Verificar si el usuario ha llegado al final del carrusel
                if (carouselRef.current) {
                  const isAtEnd =
                    carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
                    carouselRef.current.scrollWidth - 10
                  if (isAtEnd) {
                    setShowScrollIndicator(false)
                  } else {
                    setShowScrollIndicator(true)
                  }
                }
              }}
            >
              <div className="flex space-x-8 min-w-max px-4 container mx-auto">
                <motion.button
                  onClick={() => scrollToCategory("entradas")}
                  className="focus:outline-none"
                  aria-label="Seleccionar categoría Entradas"
                  aria-pressed={activeCategory === "entradas"}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FoodCategory title="Entradas" iconType="entradas" isActive={activeCategory === "entradas"} />
                </motion.button>

                <motion.button
                  onClick={() => scrollToCategory("principales")}
                  className="focus:outline-none"
                  aria-label="Seleccionar categoría Platos Principales"
                  aria-pressed={activeCategory === "principales"}
                  variants={fadeIn}
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
                  onClick={() => scrollToCategory("postres")}
                  className="focus:outline-none"
                  aria-label="Seleccionar categoría Postres"
                  aria-pressed={activeCategory === "postres"}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FoodCategory title="Postres" iconType="postres" isActive={activeCategory === "postres"} />
                </motion.button>

                <motion.button
                  onClick={() => scrollToCategory("bebidas")}
                  className="focus:outline-none"
                  aria-label="Seleccionar categoría Bebidas"
                  aria-pressed={activeCategory === "bebidas"}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FoodCategory
                    title="Bebidas & Refrescos"
                    iconType="bebidas"
                    isActive={activeCategory === "bebidas"}
                  />
                </motion.button>

                <motion.button
                  onClick={() => scrollToCategory("vinos")}
                  className="focus:outline-none"
                  aria-label="Seleccionar categoría Vinos"
                  aria-pressed={activeCategory === "vinos"}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FoodCategory title="Vinos & Espumantes" iconType="vinos" isActive={activeCategory === "vinos"} />
                </motion.button>

                <motion.button
                  onClick={() => scrollToCategory("cocktails")}
                  className="focus:outline-none"
                  aria-label="Seleccionar categoría Cocktails"
                  aria-pressed={activeCategory === "cocktails"}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FoodCategory
                    title="Cocktails & Tragos"
                    iconType="cocktails"
                    isActive={activeCategory === "cocktails"}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Entradas */}
        <div ref={entradasRef} className="mb-16 scroll-mt-24">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-montebello-gold uppercase tracking-wide mb-2">
              {getCategoryTitle("entradas")}
            </h2>
            <div className="w-20 h-1 bg-montebello-gold/30 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {entradasProducts.length > 0 ? (
              entradasProducts.map((product) => (
                <MenuItemCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  isVegetarian={product.isVegetarian}
                  variants={product.variants}
                  size={product.size}
                  isAdmin={isAdmin}
                  onEdit={handleEditProduct}
                />
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-8">
                <p className="text-montebello-light/70">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección Platos Principales */}
        <div ref={principalesRef} className="mb-16 scroll-mt-24">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-montebello-gold uppercase tracking-wide mb-2">
              {getCategoryTitle("principales")}
            </h2>
            <div className="w-20 h-1 bg-montebello-gold/30 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {principalesProducts.length > 0 ? (
              principalesProducts.map((product) => (
                <MenuItemCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  isVegetarian={product.isVegetarian}
                  variants={product.variants}
                  size={product.size}
                  isAdmin={isAdmin}
                  onEdit={handleEditProduct}
                />
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-8">
                <p className="text-montebello-light/70">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección Postres */}
        <div ref={postresRef} className="mb-16 scroll-mt-24">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-montebello-gold uppercase tracking-wide mb-2">
              {getCategoryTitle("postres")}
            </h2>
            <div className="w-20 h-1 bg-montebello-gold/30 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {postresProducts.length > 0 ? (
              postresProducts.map((product) => (
                <MenuItemCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  isVegetarian={product.isVegetarian}
                  variants={product.variants}
                  size={product.size}
                  isAdmin={isAdmin}
                  onEdit={handleEditProduct}
                />
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-8">
                <p className="text-montebello-light/70">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección Bebidas */}
        <div ref={bebidasRef} className="mb-16 scroll-mt-24">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-montebello-gold uppercase tracking-wide mb-2">
              {getCategoryTitle("bebidas")}
            </h2>
            <div className="w-20 h-1 bg-montebello-gold/30 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {bebidasProducts.length > 0 ? (
              bebidasProducts.map((product) => (
                <MenuItemCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  isVegetarian={product.isVegetarian}
                  variants={product.variants}
                  size={product.size}
                  isAdmin={isAdmin}
                  onEdit={handleEditProduct}
                />
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-8">
                <p className="text-montebello-light/70">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección Vinos */}
        <div ref={vinosRef} className="mb-16 scroll-mt-24">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-montebello-gold uppercase tracking-wide mb-2">
              {getCategoryTitle("vinos")}
            </h2>
            <div className="w-20 h-1 bg-montebello-gold/30 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {vinosProducts.length > 0 ? (
              vinosProducts.map((product) => (
                <MenuItemCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  isVegetarian={product.isVegetarian}
                  variants={product.variants}
                  size={product.size}
                  isAdmin={isAdmin}
                  onEdit={handleEditProduct}
                />
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-8">
                <p className="text-montebello-light/70">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección Cocktails */}
        <div ref={cocktailsRef} className="mb-16 scroll-mt-24">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-montebello-gold uppercase tracking-wide mb-2">
              {getCategoryTitle("cocktails")}
            </h2>
            <div className="w-20 h-1 bg-montebello-gold/30 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {cocktailsProducts.length > 0 ? (
              cocktailsProducts.map((product) => (
                <MenuItemCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  isVegetarian={product.isVegetarian}
                  variants={product.variants}
                  size={product.size}
                  isAdmin={isAdmin}
                  onEdit={handleEditProduct}
                />
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-8">
                <p className="text-montebello-light/70">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Solo visible en móvil */}
      <div>
        <BottomNavigation cartItemCount={cartItemCount} />
      </div>

      {/* Modal de edición de producto */}
      {showEditModal && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => {
            setShowEditModal(false)
            setEditingProduct(null)
          }}
          onSave={handleSaveProduct}
          onDelete={handleDeleteProduct}
        />
      )}

      {/* Botón para volver arriba */}
      <ScrollToTopButton />

      {/* Toaster para notificaciones */}
      <Toaster />
    </div>
  )
}
