"use client"

import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X, Home, ShoppingBag, LogOut, RefreshCw, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MenuItemCard } from "@/components/menu-item-card"
import { LoginForm } from "@/components/login-form"
import { AdminPanel } from "@/components/admin-panel"
import { ProductEditModal } from "@/components/product-edit-modal"
import Link from "next/link"
import { getAuthState, logout, type User, saveAuthState } from "@/lib/auth"
import {
  initialProducts,
  updateProduct,
  deleteProduct,
  addProduct,
  resetProducts,
  type Product,
  type ProductCategory,
  getProducts,
  getFeaturedProducts,
} from "@/lib/products"
import { DesktopNavigation } from "@/components/desktop-navigation"

import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { mobileMenuAnimation, menuItemAnimation, staggerContainer } from "@/lib/animation-utils"

// Importar el componente
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { CategoriesCarousel } from "@/components/categories-carousel"
import { CategoryEditModal, type Category } from "@/components/category-edit-modal"
import { FloatingPreviewButton } from "@/components/floating-preview-button"
import { useSmoothNavigation } from "@/hooks/use-smooth-navigation"

// Definir el tipo para un item del carrito
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: string
}

// Reemplazar el componente HamburgerIcon actual con esta versión minimalista
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

// Modificar la lista de productos excluidos para añadir "gaseosas" y "flan-casero"
// Productos a excluir
const excludedProductIds = ["crumble-de-manzana", "chardonnay", "carpaccio-de-lomo", "gaseosas", "flan-casero"]

// Función para filtrar productos excluidos
const filterExcludedProducts = (products: Product[]): Product[] => {
  return products.filter((product) => !excludedProductIds.includes(product.id))
}

// Productos iniciales filtrados
const filteredInitialProducts = filterExcludedProducts(initialProducts)

export default function MenuPage() {
  // Eliminado: const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { navigate } = useSmoothNavigation()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [products, setProducts] = useState<Product[]>(getProducts()) // Inicializar con productos filtrados
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("entradas")
  const [cartItemCount, setCartItemCount] = useState(0)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [storeName, setStoreName] = useState("CLUB MONTEBELLO")
  const [isAdmin, setIsAdmin] = useState(false)
  // const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "destacados" | null>(null) // Eliminado
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [cartAnimation, setCartAnimation] = useState(false)
  const [stickyTopOffset, setStickyTopOffset] = useState(0) // Nuevo estado para el offset

  // Reemplazar las referencias y estados relacionados con el carrusel
  const carouselWrapperRef = useRef<HTMLDivElement>(null)
  const [isCarouselSticky, setIsCarouselSticky] = useState(false)
  const [carouselHeight, setCarouselHeight] = useState(0)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  // Añadir después de la declaración de carouselRef
  const editProductId = searchParams.get("edit")

  // Referencias para las secciones de categoría
  const entradasRef = useRef<HTMLDivElement>(null)
  const principalesRef = useRef<HTMLDivElement>(null)
  const postresRef = useRef<HTMLDivElement>(null)
  const bebidasRef = useRef<HTMLDivElement>(null)
  const vinosRef = useRef<HTMLDivElement>(null)
  const cocktailsRef = useRef<HTMLDivElement>(null)

  // Función para entrar directamente al panel de administración
  const enterAdminPanel = () => {
    // Guardar estado de autenticación como Admin
    saveAuthState({
      username: "Admin",
      isLoggedIn: true,
    })

    // Establecer la bandera para mostrar el panel
    localStorage.setItem("show_admin_panel", "true")

    // Actualizar el estado local
    setUser({ username: "Admin", isLoggedIn: true })
    setShowAdminPanel(true)

    // Eliminado: Mostrar notificación
    // toast({
    //   title: "Modo administrador activado",
    //   description: "Has ingresado al panel de administración",
    //   duration: 3000,
    // })
  }

  // Añadir esta función después de la declaración de las referencias de categorías
  const updateActiveCategory = useCallback(() => {
    // Obtener las posiciones de cada sección
    const sections = [
      { ref: entradasRef, category: "entradas" },
      { ref: principalesRef, category: "principales" },
      { ref: postresRef, category: "postres" },
      { ref: bebidasRef, category: "bebidas" },
      { ref: vinosRef, category: "vinos" },
      { ref: cocktailsRef, category: "cocktails" },
    ]

    // Encontrar la sección más cercana a la parte superior de la ventana
    let closestSection = sections[0]
    let minDistance = Number.POSITIVE_INFINITY

    sections.forEach((section) => {
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect()
        // Calcular la distancia desde la parte superior de la ventana
        // Añadimos un offset para mejorar la detección
        const distance = Math.abs(rect.top - 150)

        if (distance < minDistance) {
          minDistance = distance
          closestSection = section
        }
      }
    })

    // Actualizar la categoría activa
    setActiveCategory(closestSection.category as ProductCategory)
  }, [entradasRef, principalesRef, postresRef, bebidasRef, vinosRef, cocktailsRef])

  // Añadir estado para categorías y modal de categoría
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)

  // Añadir funciones para manejar categorías
  const handleAddCategory = (category: Category) => {
    const updatedCategories = [...categories, category]
    setCategories(updatedCategories)
    try {
      localStorage.setItem("categories", JSON.stringify(updatedCategories))
    } catch (e) {
      console.error("Error saving categories to localStorage", e)
    }
  }

  const handleUpdateCategory = (updatedCategory: Category) => {
    const updatedCategories = categories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    setCategories(updatedCategories)
    try {
      localStorage.setItem("categories", JSON.stringify(updatedCategories))
    } catch (e) {
      console.error("Error saving categories to localStorage", e)
    }
  }

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter((cat) => cat.id !== categoryId)
    setCategories(updatedCategories)
    try {
      localStorage.setItem("categories", JSON.stringify(updatedCategories))
    } catch (e) {
      console.error("Error saving categories to localStorage", e)
    }
  }

  // Cargar el estado de autenticación y productos al iniciar
  useEffect(() => {
    const authUser = getAuthState()
    if (authUser) {
      setUser(authUser)
      setIsAdmin(authUser.username === "Admin1")
      // Verificar si debe mostrar el panel de administración
      const shouldShowAdmin = localStorage.getItem("show_admin_panel") === "true"
      // Permitir que cualquier usuario autenticado acceda al panel si la bandera está establecida
      if (shouldShowAdmin) {
        setShowAdminPanel(true)
        console.log("Panel de administración activado para:", authUser.username)
      }
    }

    // Iniciar carga
    setIsLoading(true)
    setLoadError(null)

    try {
      console.log("Cargando productos iniciales...")
      // Usar directamente los productos iniciales filtrados
      setProducts(getProducts())
      setFeaturedProducts(getFeaturedProducts())

      // Intentar guardar en localStorage para futuras visitas
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
          localStorage.setItem("products", JSON.stringify(filteredInitialProducts))
          console.log("Productos guardados en localStorage")
        } catch (e) {
          console.error("Error al guardar productos en localStorage:", e)
        }
      }
    } catch (error) {
      console.error("Error al cargar productos:", error)
      setLoadError("Error al cargar productos. Por favor, intenta recargar la página.")
    } finally {
      // Finalizar carga
      setIsLoading(false)
    }
  }, [])

  // Cargar el nombre de la tienda desde localStorage
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
      }
    }

    // Añadir event listener
    document.addEventListener("storeNameChanged", handleStoreNameChange)

    // Limpiar event listener al desmontar
    return () => {
      document.removeEventListener("storeNameChanged", handleStoreNameChange)
    }
  }, [])

  // Cargar categorías al iniciar
  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem("categories")
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories))
      }
    } catch (e) {
      console.error("Error loading categories from localStorage", e)
    }
  }, [])

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
      // El offset superior siempre será 0 para que se pegue a la parte superior de la ventana
      const currentTopOffset = 0

      // Determinar si el carrusel debe ser sticky
      const shouldBeSticky = rect.top <= currentTopOffset

      if (shouldBeSticky !== isCarouselSticky) {
        setIsCarouselSticky(shouldBeSticky)
      }
      // Actualizar el offset para el estilo en línea
      setStickyTopOffset(currentTopOffset)

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

    window.addEventListener("scroll", handleScroll)
    // Ejecutar una vez al montar para establecer el estado inicial
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isCarouselSticky]) // Dependency array includes isCarouselSticky

  // Añadir este useEffect después del useEffect del carrusel sticky
  useEffect(() => {
    // Función para manejar el evento de scroll
    const handleScroll = () => {
      // Usar requestAnimationFrame para optimizar el rendimiento
      window.requestAnimationFrame(updateActiveCategory)
    }

    // Agregar el event listener
    window.addEventListener("scroll", handleScroll)

    // Llamar una vez para establecer la categoría inicial
    updateActiveCategory()

    // Limpiar el event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [updateActiveCategory])

  // Verificar si hay un producto para editar desde la URL
  useEffect(() => {
    if (editProductId && isAdmin) {
      const productToEdit = products.find((p) => p.id === editProductId)
      if (productToEdit) {
        setEditingProduct(productToEdit)
        setShowEditModal(true)
      }
    }
  }, [editProductId, products, isAdmin])

  // Cargar carrito y calcular cantidad de items
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart) as CartItem[]
          const totalItems = parsedCart.reduce((sum, item) => sum + item.quantity, 0)
          setCartItemCount(totalItems)
          console.log("MenuPage: Cart loaded from localStorage. Total items:", totalItems) // Log para depuración
        } catch (e) {
          console.error("Error parsing cart from localStorage", e)
        }
      } else {
        setCartItemCount(0)
        console.log("MenuPage: No cart found in localStorage. Total items: 0") // Log para depuración
      }
    }

    loadCart() // Cargar el carrito al montar

    // Opcional: Añadir un listener para el evento 'storage' si quieres que el carrito se actualice
    // en tiempo real si se modifica en otra pestaña/ventana del mismo origen.
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cart") {
        loadCart()
      }
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout()
    setUser(null)
    setShowAdminPanel(false)
    setIsMenuOpen(false)
  }

  // Modificar la función handleLoginSuccess para asegurar que el modal se cierre después de iniciar sesión
  const handleLoginSuccess = () => {
    const authUser = getAuthState()
    setUser(authUser)
    setIsAdmin(authUser.username === "Admin1")
    if (authUser && authUser.username === "Admin1") {
      setShowAdminPanel(true)
    }
    setShowLoginForm(false) // Asegurarse de que el modal se cierre
    setIsMenuOpen(false) // Cerrar el menú móvil si está abierto
  }

  // Función para editar un producto
  const handleEditProduct = (id: string) => {
    setEditingProductId(id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProductId(null)
    // Recargar productos después de cerrar el modal para reflejar cambios
    setProducts(getProducts())
  }

  const handleProductUpdated = () => {
    // Recargar productos después de una actualización exitosa
    setProducts(getProducts())
    handleCloseModal()
  }

  const handleProductAdded = () => {
    // Recargar productos después de añadir uno nuevo
    setProducts(getProducts())
    handleCloseModal()
  }

  const handleProductDeleted = () => {
    // Recargar productos después de eliminar uno
    setProducts(getProducts())
    handleCloseModal()
  }

  // const handleCategorySelect = (category: ProductCategory | "destacados" | null) => { // Eliminado
  //   setSelectedCategory(category)
  // }

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

  // const filteredProducts = selectedCategory // Eliminado
  //   ? selectedCategory === "destacados"
  //     ? getFeaturedProducts()
  //     : products.filter((product) => product.category === selectedCategory)
  //   : products

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

  // Si hay un error de carga, mostrar mensaje de error con opción para recargar
  if (loadError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-montebello-navy">
        <div className="bg-montebello-navy/80 border border-montebello-gold/20 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-montebello-gold mb-2">Error al cargar productos</h2>
          <p className="text-montebello-light mb-6">{loadError}</p>
          <Button
            className="bg-montebello-gold hover:bg-montebello-gold/90 text-montebello-navy"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Recargar productos
          </Button>
        </div>
      </div>
    )
  }

  // Si el usuario es administrador y showAdminPanel es true, mostrar el panel de administración
  if (showAdminPanel) {
    return (
      <AdminPanel
        products={products}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onResetProducts={resetProducts}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    )
  }

  return (
    <div className="bg-montebello-navy min-h-screen flex flex-col">
      {/* Desktop Navigation con contador de carrito - Solo visible en pantallas grandes */}
      <DesktopNavigation
        user={user}
        onLoginSuccess={handleLoginSuccess}
        cartItemCount={cartItemCount}
        cartAnimation={cartAnimation}
      />

      {/* Mobile Header - Solo visible en pantallas pequeñas y medianas */}
      <header className="block lg:hidden pt-6 pb-2">
        <div className="flex justify-between items-center mb-6 container mx-auto">
          <div
            className={`cursor-pointer z-50 pl-4 ${isMenuOpen ? "opacity-0" : "opacity-100"} transition-opacity`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HamburgerIcon className="text-montebello-gold" />
          </div>

          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-montebello-gold">{storeName}</h1>
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
            <div className="w-24 h-24 rounded-full bg-montebello-navy flex items-center justify-center border-2 border-montebello-gold/40 shadow-md overflow-hidden">
              <img src="/montebello-icon.png" alt="Club Montebello Logo" className="h-28 w-28 object-cover" />
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
                {isAdmin && (
                  <Button
                    variant="outline"
                    className="mt-2 w-full border-montebello-gold/20 text-montebello-gold bg-transparent"
                    onClick={() => setShowAdminPanel(true)}
                  >
                    Panel de Administración
                  </Button>
                )}
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
              <motion.li variants={menuItemAnimation}>
                <button
                  onClick={enterAdminPanel}
                  className="flex items-center text-montebello-light hover:text-montebello-gold transition-colors w-full text-left"
                >
                  <Settings className="mr-4 h-6 w-6" />
                  <span className="text-lg">Panel Admin</span>
                </button>
              </motion.li>
            </motion.ul>
          </motion.nav>
        </motion.div>
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
      <div className="container-app flex-1 pb-20 lg:pb-10">
        <header className="px-4 pt-6 pb-4 lg:pt-8 lg:pb-6">
          <h1 className="text-3xl font-bold text-montebello-gold mb-4 lg:text-4xl">Nuestro Menú</h1>
          <div className="categories-wrapper" ref={carouselWrapperRef}>
            <CategoriesCarousel
              activeCategory={activeCategory} // Mantener esta prop para el scroll automático
              onCategoryChange={scrollToCategory} // Mantener esta prop para el scroll automático
              isSticky={isCarouselSticky}
              stickyTopOffset={stickyTopOffset} // Pasar el offset dinámico (ahora 0)
            />
            <div className={`categories-spacer ${isCarouselSticky ? "active" : ""}`}></div>
          </div>
        </header>

        <main className="px-4 lg:px-0 py-4">
          {/* Entradas Section */}
          <div ref={entradasRef} className="mb-8">
            <h2 className="text-2xl font-bold text-montebello-gold mb-4">{getCategoryTitle("entradas")}</h2>
            {entradasProducts.length === 0 ? (
              <motion.div
                className="text-center text-montebello-light/70 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p>No hay productos en esta categoría.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {entradasProducts.map((product) => (
                  <MenuItemCard key={product.id} {...product} isAdmin={isAdmin} onEdit={handleEditProduct} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Principales Section */}
          <div ref={principalesRef} className="mb-8">
            <h2 className="text-2xl font-bold text-montebello-gold mb-4">{getCategoryTitle("principales")}</h2>
            {principalesProducts.length === 0 ? (
              <motion.div
                className="text-center text-montebello-light/70 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p>No hay productos en esta categoría.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {principalesProducts.map((product) => (
                  <MenuItemCard key={product.id} {...product} isAdmin={isAdmin} onEdit={handleEditProduct} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Postres Section */}
          <div ref={postresRef} className="mb-8">
            <h2 className="text-2xl font-bold text-montebello-gold mb-4">{getCategoryTitle("postres")}</h2>
            {postresProducts.length === 0 ? (
              <motion.div
                className="text-center text-montebello-light/70 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p>No hay productos en esta categoría.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {postresProducts.map((product) => (
                  <MenuItemCard key={product.id} {...product} isAdmin={isAdmin} onEdit={handleEditProduct} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Bebidas Section */}
          <div ref={bebidasRef} className="mb-8">
            <h2 className="text-2xl font-bold text-montebello-gold mb-4">{getCategoryTitle("bebidas")}</h2>
            {bebidasProducts.length === 0 ? (
              <motion.div
                className="text-center text-montebello-light/70 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p>No hay productos en esta categoría.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {bebidasProducts.map((product) => (
                  <MenuItemCard key={product.id} {...product} isAdmin={isAdmin} onEdit={handleEditProduct} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Vinos Section */}
          <div ref={vinosRef} className="mb-8">
            <h2 className="text-2xl font-bold text-montebello-gold mb-4">{getCategoryTitle("vinos")}</h2>
            {vinosProducts.length === 0 ? (
              <motion.div
                className="text-center text-montebello-light/70 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p>No hay productos en esta categoría.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {vinosProducts.map((product) => (
                  <MenuItemCard key={product.id} {...product} isAdmin={isAdmin} onEdit={handleEditProduct} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Cocktails Section */}
          <div ref={cocktailsRef} className="mb-8">
            <h2 className="text-2xl font-bold text-montebello-gold mb-4">{getCategoryTitle("cocktails")}</h2>
            {cocktailsProducts.length === 0 ? (
              <motion.div
                className="text-center text-montebello-light/70 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p>No hay productos en esta categoría.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {cocktailsProducts.map((product) => (
                  <MenuItemCard key={product.id} {...product} isAdmin={isAdmin} onEdit={handleEditProduct} />
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {isAdmin && (
        <FloatingPreviewButton
          onAddProduct={() => {
            setEditingProductId(null) // Para asegurar que es un nuevo producto
            setIsModalOpen(true)
          }}
          onResetProducts={() => {
            // Lógica para resetear productos
            // Esto podría ser un modal de confirmación o un toast
            if (confirm("¿Estás seguro de que quieres resetear todos los productos a los valores iniciales?")) {
              resetProducts() // Descomentar y usar la función si existe
              setProducts(getProducts()) // Recargar los productos iniciales
              alert("Productos reseteados.")
            }
          }}
        />
      )}

      <ProductEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productId={editingProductId}
        onProductUpdated={handleProductUpdated}
        onProductAdded={handleProductAdded}
        onProductDeleted={handleProductDeleted}
      />

      {/* Bottom Navigation - Solo visible en móvil */}
      <div>
        <BottomNavigation cartItemCount={cartItemCount} cartAnimation={cartAnimation} />
      </div>

      {/* Modal de inicio de sesión - Mantener el diseño original para mobile */}
      {showLoginForm && (
        <div
          className="fixed inset-0 bg-black/70 z-[99999] flex items-center justify-center p-4"
          style={{ position: "fixed", zIndex: 99999 }}
        >
          <div className="relative w-full max-w-md" style={{ zIndex: 99999 }}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 text-montebello-light z-[99999] bg-montebello-navy rounded-full"
              onClick={() => setShowLoginForm(false)}
              style={{ zIndex: 100000 }}
            >
              <X className="h-5 w-5" />
            </Button>
            <Card className="w-full max-w-md mx-auto bg-montebello-navy border border-montebello-gold/30 shadow-xl relative z-[99999]">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-montebello-gold text-center mb-6">Iniciar Sesión</h2>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              </CardContent>
            </Card>
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
          onSave={updateProduct}
          onDelete={deleteProduct}
        />
      )}

      {showCategoryModal && (
        <CategoryEditModal
          category={editingCategory}
          onClose={() => {
            setShowCategoryModal(false)
            setEditingCategory(null)
          }}
          onSave={handleUpdateCategory}
          onDelete={handleDeleteCategory}
        />
      )}

      {/* Botón para volver arriba */}
      <ScrollToTopButton />

      {/* Eliminado: Toaster para notificaciones */}
      {/* <Toaster /> */}
    </div>
  )
}
