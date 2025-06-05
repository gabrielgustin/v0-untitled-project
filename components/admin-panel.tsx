"use client"

import { useState, useEffect } from "react"
import {
  ExternalLink,
  Clock,
  CreditCard,
  Tag,
  QrCode,
  Package,
  Info,
  Grid,
  LogOut,
  Home,
  Plus,
  Sandwich,
  UtensilsCrossed,
  Cake,
  Coffee,
  Wine,
  CoffeeIcon as Cocktail,
  MenuIcon,
  X,
  ChevronLeft,
  Settings,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductEditModal } from "@/components/product-edit-modal"
import { CategoryEditModal, type Category, predefinedCategories } from "@/components/category-edit-modal"
import { Badge } from "@/components/ui/badge"
import { logout } from "@/lib/auth"
import type { Product } from "@/lib/products"
import { BusinessInfoForm } from "@/components/business-info-form"
import { BusinessHoursForm } from "@/components/business-hours-form"
import { PaymentMethodsForm } from "@/components/payment-methods-form"
import { DiscountCouponsForm } from "@/components/discount-coupons-form"
import { QRCodeForm } from "@/components/qr-code-form"
import { DeliveryMethodsForm } from "@/components/delivery-methods-form"
import { ThemeColorForm } from "@/components/theme-color-form"
import { FloatingPreviewButton } from "@/components/floating-preview-button"
import React from "react"

interface AdminPanelProps {
  products: Product[]
  onAddProduct: (product: Product) => void
  onUpdateProduct: (product: Product) => void
  onDeleteProduct: (productId: string) => void
  onResetProducts: () => void
  onAddCategory?: (category: Category) => void
  onUpdateCategory?: (category: Category) => void
  onDeleteCategory?: (categoryId: string) => void
}

export function AdminPanel({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: AdminPanelProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [activeConfigSection, setActiveConfigSection] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showTitle, setShowTitle] = useState(true)

  // Cargar categorías predefinidas al iniciar
  useEffect(() => {
    // Verificar si ya hay categorías cargadas
    if (categories.length === 0) {
      // Si no hay categorías, cargar las predefinidas
      setCategories(predefinedCategories)
    }
  }, [categories])

  // Cerrar el menú móvil cuando se cambia de sección
  useEffect(() => {
    setMobileMenuOpen(false)

    // Hacer scroll al inicio de la página cuando se cambia de sección
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [activeSection, activeConfigSection])

  // Efecto para controlar la visibilidad del título según la sección y el scroll
  useEffect(() => {
    // Solo mostrar el título en la página de inicio (dashboard) y cuando no hay sección de configuración activa
    const shouldShowTitle = activeSection === "dashboard" && activeConfigSection === null
    setShowTitle(shouldShowTitle)

    // Si no estamos en la página de inicio, no necesitamos el listener de scroll
    if (!shouldShowTitle) return

    // Función para manejar el evento de scroll
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowTitle(false)
      } else {
        // Solo mostrar el título si estamos en la página de inicio y no hay sección de configuración activa
        setShowTitle(activeSection === "dashboard" && activeConfigSection === null)
      }
    }

    // Añadir el evento de scroll
    window.addEventListener("scroll", handleScroll)

    // Limpiar el evento al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection, activeConfigSection])

  const handleAddProduct = () => {
    // Crear un nuevo producto con valores predeterminados
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: "Nuevo Producto",
      description: "",
      price: 0,
      isVegetarian: false,
      variants: [],
    }
    setSelectedProduct(newProduct)
    setShowModal(true)
  }

  const handleAddCategory = () => {
    // Crear una nueva categoría con valores predeterminados
    // Generamos un ID temporal para evitar que se muestren las opciones predefinidas
    const newCategory: Category = {
      id: `temp-${Date.now()}`, // ID temporal para evitar mostrar opciones predefinidas
      name: "Nueva Categoría",
      description: "",
      isActive: true,
      order: categories.length + 1, // Asignar el siguiente orden disponible
      iconType: "entradas", // Icono predeterminado
    }
    setSelectedCategory(newCategory)
    setShowCategoryModal(true)
  }

  const handleSaveProduct = (product: Product) => {
    // Verificar si es un producto nuevo o existente
    const isNewProduct = !products.some((p) => p.id === product.id)

    if (isNewProduct) {
      onAddProduct(product)
    } else {
      onUpdateProduct(product)
    }

    setShowModal(false)
    setSelectedProduct(null)
  }

  const handleSaveCategory = (category: Category) => {
    if (onAddCategory && !categories.some((c) => c.id === category.id)) {
      onAddCategory(category)
    } else if (onUpdateCategory) {
      onUpdateCategory(category)
    }

    setShowCategoryModal(false)
    setSelectedCategory(null)
  }

  const handleResetProducts = () => {
    onResetProducts()
  }

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  const handleExitAdminMode = () => {
    // Guardar el estado actual en localStorage para asegurar que los cambios sean visibles
    localStorage.setItem("lastUpdate", Date.now().toString())

    // Añadir un timestamp a la URL para forzar una recarga fresca
    const timestamp = Date.now()
    window.open(`/menu?t=${timestamp}`, "_blank")
  }

  const handleSaveConfig = (data: any) => {
    console.log("Guardando configuración:", data)

    // Si los datos incluyen el nombre de la tienda, actualizar en localStorage
    if (data.storeName) {
      localStorage.setItem("storeName", data.storeName)
      // Actualizar el título del documento
      document.title = data.storeName

      // Disparar un evento personalizado para notificar a otros componentes
      const event = new CustomEvent("storeNameChanged", { detail: data.storeName })
      document.dispatchEvent(event)
    }

    // Aquí se implementaría la lógica para guardar la configuración
    setActiveConfigSection(null)
  }

  // Función para obtener el icono según el tipo
  const getCategoryIcon = (iconType: string | undefined) => {
    switch (iconType) {
      case "entradas":
        return <Sandwich className="h-5 w-5 text-gray-500" />
      case "principales":
        return <UtensilsCrossed className="h-5 w-5 text-gray-500" />
      case "postres":
        return <Cake className="h-5 w-5 text-gray-500" />
      case "bebidas":
        return <Coffee className="h-5 w-5 text-gray-500" />
      case "vinos":
        return <Wine className="h-5 w-5 text-gray-500" />
      case "cocktails":
        return <Cocktail className="h-5 w-5 text-gray-500" />
      default:
        return <Grid className="h-5 w-5 text-gray-500" />
    }
  }

  // Obtener el título de la sección actual
  const getSectionTitle = () => {
    if (activeConfigSection) {
      switch (activeConfigSection) {
        case "business-info":
          return "Información del negocio"
        case "business-hours":
          return "Horarios de atención"
        case "payment-methods":
          return "Métodos de pago"
        case "discount-coupons":
          return "Cupones de descuento"
        case "qr-code":
          return "Código QR"
        case "delivery-methods":
          return "Formas de entrega"
        case "theme-colors":
          return "Personalización de colores"
        default:
          return "Configuración"
      }
    }

    switch (activeSection) {
      case "categories":
        return "Categorías"
      case "products":
        return "Productos"
      default:
        return "Panel de administración"
    }
  }

  // Renderizar el menú móvil
  const renderMobileMenu = () => {
    return (
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between admin-header text-white">
              <h2 className="text-xl font-bold">Menú</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto py-2">
              <div className="px-2">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 px-3 py-2">Navegación</h3>
                  <ul className="space-y-1">
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeSection === "dashboard" ? "admin-button" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveSection("dashboard")}
                      >
                        <Home className="h-5 w-5 mr-3" />
                        <span>Inicio</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeSection === "categories" ? "admin-button" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveSection("categories")}
                      >
                        <Grid className="h-5 w-5 mr-3" />
                        <span>Categorías</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeSection === "products" ? "admin-button" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveSection("products")}
                      >
                        <Package className="h-5 w-5 mr-3" />
                        <span>Productos</span>
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 px-3 py-2">Configuración</h3>
                  <ul className="space-y-1">
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeConfigSection === "business-info" ? "admin-button" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveConfigSection("business-info")}
                      >
                        <Info className="h-5 w-5 mr-3" />
                        <span>Información del negocio</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeConfigSection === "business-hours" ? "admin-button" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveConfigSection("business-hours")}
                      >
                        <Clock className="h-5 w-5 mr-3" />
                        <span>Horarios de atención</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeConfigSection === "payment-methods" ? "admin-button" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveConfigSection("payment-methods")}
                      >
                        <CreditCard className="h-5 w-5 mr-3" />
                        <span>Métodos de pago</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeConfigSection === "discount-coupons"
                            ? "admin-button"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveConfigSection("discount-coupons")}
                      >
                        <Tag className="h-5 w-5 mr-3" />
                        <span>Cupones de descuento</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeConfigSection === "qr-code" ? "admin-button" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveConfigSection("qr-code")}
                      >
                        <QrCode className="h-5 w-5 mr-3" />
                        <span>Código QR</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeConfigSection === "delivery-methods"
                            ? "admin-button"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveConfigSection("delivery-methods")}
                      >
                        <Package className="h-5 w-5 mr-3" />
                        <span>Formas de entrega</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`flex items-center w-full px-3 py-2 rounded-md ${
                          activeConfigSection === "theme-colors" ? "admin-button" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveConfigSection("theme-colors")}
                      >
                        <Palette className="h-5 w-5 mr-3" />
                        <span>Personalización de colores</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t p-4">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Cerrar sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Renderizar la sección correspondiente según activeSection
  const renderSection = () => {
    // Si hay una sección de configuración activa, mostrarla
    if (activeConfigSection) {
      switch (activeConfigSection) {
        case "business-info":
          return <BusinessInfoForm onBack={() => setActiveConfigSection(null)} onSave={handleSaveConfig} />
        case "business-hours":
          return <BusinessHoursForm onBack={() => setActiveConfigSection(null)} onSave={handleSaveConfig} />
        case "payment-methods":
          return <PaymentMethodsForm onBack={() => setActiveConfigSection(null)} onSave={handleSaveConfig} />
        case "discount-coupons":
          return <DiscountCouponsForm onBack={() => setActiveConfigSection(null)} onSave={handleSaveConfig} />
        case "qr-code":
          return <QRCodeForm onBack={() => setActiveConfigSection(null)} />
        case "delivery-methods":
          return <DeliveryMethodsForm onBack={() => setActiveConfigSection(null)} onSave={handleSaveConfig} />
        case "theme-colors":
          return <ThemeColorForm onBack={() => setActiveConfigSection(null)} onSave={handleSaveConfig} />
        default:
          return null
      }
    }

    switch (activeSection) {
      case "categories":
        return (
          <div className="flex flex-col md:flex-row md:flex-1">
            {/* Sidebar de navegación - solo visible en desktop */}
            <div className="hidden md:block w-[350px] admin-header text-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-8">Navegación</h2>
              <nav>
                <ul className="space-y-6">
                  <li>
                    <button
                      className="flex items-center text-white hover:text-gray-200 transition-colors w-full text-left"
                      onClick={() => setActiveSection("dashboard")}
                    >
                      <Home className="mr-3 h-5 w-5" />
                      <span className="text-lg">Inicio</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center text-white hover:text-gray-200 transition-colors w-full text-left font-bold"
                      onClick={() => setActiveSection("categories")}
                    >
                      <Grid className="mr-3 h-5 w-5" />
                      <span className="text-lg">Categorías</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center text-white hover:text-gray-200 transition-colors w-full text-left"
                      onClick={() => setActiveSection("products")}
                    >
                      <Package className="mr-3 h-5 w-5" />
                      <span className="text-lg">Productos</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center text-white hover:text-gray-200 transition-colors w-full text-left"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      <span className="text-lg">Sesión cerrada</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 md:ml-6">
              {/* Botón de retroceso para móvil */}
              <div className="flex md:hidden items-center mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setActiveSection("dashboard")}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  <span>Volver</span>
                </Button>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold">Categorías</h1>
                <Button onClick={handleAddCategory} className="admin-button rounded-md" size="sm">
                  <Plus className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                  <span className="hidden md:inline">Agregar categoría</span>
                </Button>
              </div>

              {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] md:h-[400px] bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg md:text-xl font-medium text-gray-700 mb-2">Sin categorías</h3>
                  <p className="text-gray-500 mb-6">Haz clic en "Agregar categoría" para comenzar</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className="border border-gray-200 hover:shadow-md transition-shadow admin-card"
                    >
                      <CardContent className="p-4 relative">
                        {/* Badge siempre en la esquina superior derecha */}
                        <div className="absolute top-2 right-2">
                          <Badge
                            className={category.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {category.isActive ? "Activa" : "Inactiva"}
                          </Badge>
                        </div>

                        {/* Espacio para que el badge no se superponga con el contenido */}
                        <div className="pt-6">
                          {/* Contenido centrado (icono, título y botón) */}
                          <div className="flex flex-col items-center gap-4 mt-2">
                            <div className="h-16 w-16 rounded-full border-2 border-primary flex items-center justify-center shadow-sm">
                              {React.cloneElement(getCategoryIcon(category.iconType), {
                                className: "h-8 w-8 admin-icon",
                              })}
                            </div>
                            <div className="text-center">
                              <h3 className="font-medium text-lg">{category.name}</h3>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="admin-button-outline"
                              onClick={() => {
                                setSelectedCategory(category)
                                setShowCategoryModal(true)
                              }}
                            >
                              Editar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      case "products":
        return (
          <div className="flex flex-col md:flex-row md:flex-1">
            {/* Sidebar de navegación - solo visible en desktop */}
            <div className="hidden md:block w-[350px] admin-header text-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-8">Navegación</h2>
              <nav>
                <ul className="space-y-6">
                  <li>
                    <button
                      className="flex items-center text-white hover:text-gray-200 transition-colors w-full text-left"
                      onClick={() => setActiveSection("dashboard")}
                    >
                      <Home className="mr-3 h-5 w-5" />
                      <span className="text-lg">Inicio</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center text-white hover:text-gray-200 transition-colors w-full text-left"
                      onClick={() => setActiveSection("categories")}
                    >
                      <Grid className="mr-3 h-5 w-5" />
                      <span className="text-lg">Categorías</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center text-white hover:text-gray-200 transition-colors w-full text-left font-bold"
                      onClick={() => setActiveSection("products")}
                    >
                      <Package className="mr-3 h-5 w-5" />
                      <span className="text-lg">Productos</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center text-white hover:text-gray-200 transition-colors w-full text-left"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      <span className="text-lg">Sesión cerrada</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 md:ml-6">
              {/* Botón de retroceso para móvil */}
              <div className="flex md:hidden items-center mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setActiveSection("dashboard")}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  <span>Volver</span>
                </Button>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold">Productos</h1>
                <Button onClick={handleAddProduct} className="admin-button rounded-md" size="sm">
                  <Plus className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                  <span className="hidden md:inline">Agregar producto</span>
                </Button>
              </div>

              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] md:h-[400px] bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg md:text-xl font-medium text-gray-700 mb-2">Sin productos</h3>
                  <p className="text-gray-500 mb-6">Haz clic en "Agregar producto" para comenzar</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="border border-gray-200 hover:shadow-md transition-shadow admin-card"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{product.name}</h3>
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                              {typeof product.description === "string" ? product.description : "Sin descripción"}
                            </p>
                            <p className="text-primary font-bold mt-2">${product.price.toFixed(2)}</p>
                          </div>
                          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden ml-3 flex-shrink-0">
                            {product.image ? (
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).src = "/diverse-products-still-life.png"
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <Package className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Badge
                            className={product.category ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                          >
                            {product.category ? product.category : "Sin categoría"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="admin-button-outline"
                            onClick={() => {
                              setSelectedProduct(product)
                              setShowModal(true)
                            }}
                          >
                            Editar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      default:
        return (
          <>
            {/* Navigation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card
                className={`border rounded-lg cursor-pointer hover:shadow-md transition-shadow admin-card ${
                  activeSection === "categories" ? "border-primary shadow-md" : "border-gray-200"
                }`}
                onClick={() => setActiveSection("categories")}
              >
                <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
                  <Grid className="h-8 w-8 admin-icon mb-2" />
                  <h2 className="text-lg font-medium text-gray-800">Categorías</h2>
                </CardContent>
              </Card>

              <Card
                className={`border rounded-lg cursor-pointer hover:shadow-md transition-shadow admin-card ${
                  activeSection === "products" ? "border-primary shadow-md" : "border-gray-200"
                }`}
                onClick={() => setActiveSection("products")}
              >
                <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
                  <Package className="h-8 w-8 admin-icon mb-2" />
                  <h2 className="text-lg font-medium text-gray-800">Productos</h2>
                </CardContent>
              </Card>

              <Card
                className={`border rounded-lg cursor-pointer hover:shadow-md transition-shadow admin-card ${
                  activeSection === "settings" ? "border-primary shadow-md" : "border-gray-200"
                }`}
                onClick={() => setActiveConfigSection("business-info")}
              >
                <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
                  <Settings className="h-8 w-8 admin-icon mb-2" />
                  <h2 className="text-lg font-medium text-gray-800">Configuración</h2>
                </CardContent>
              </Card>

              <Card
                className="border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow hover:border-red-500"
                onClick={handleLogout}
              >
                <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
                  <LogOut className="h-8 w-8 text-red-500 mb-2" />
                  <h2 className="text-lg font-medium text-gray-800">Cerrar Sesión</h2>
                </CardContent>
              </Card>
            </div>

            {/* Personalize Store Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-6">Personaliza tu tienda</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {/* Business Information */}
                <Card
                  className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer admin-card"
                  onClick={() => setActiveConfigSection("business-info")}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <Info className="h-5 w-5 text-gray-500" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-gray-800">Información del negocio</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Hours of Attention */}
                <Card
                  className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer admin-card"
                  onClick={() => setActiveConfigSection("business-hours")}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <Clock className="h-5 w-5 text-gray-500" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-gray-800">Horarios de atención</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card
                  className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer admin-card"
                  onClick={() => setActiveConfigSection("payment-methods")}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <CreditCard className="h-5 w-5 text-gray-500" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-gray-800">Métodos de pago</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Discount Coupons */}
                <Card
                  className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer admin-card"
                  onClick={() => setActiveConfigSection("discount-coupons")}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <Tag className="h-5 w-5 text-gray-500" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-gray-800">Cupones de descuento</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* QR Code */}
                <Card
                  className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer admin-card"
                  onClick={() => setActiveConfigSection("qr-code")}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <QrCode className="h-5 w-5 text-gray-500" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-gray-800">Código QR</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Methods */}
                <Card
                  className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer admin-card"
                  onClick={() => setActiveConfigSection("delivery-methods")}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <Package className="h-5 w-5 text-gray-500" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-gray-800">Formas de entrega</h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Theme Colors */}
                <Card
                  className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer admin-card"
                  onClick={() => setActiveConfigSection("theme-colors")}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <Palette className="h-5 w-5 text-gray-500" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-gray-800">Personalización de colores</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Mi suscripción</h2>
                <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm font-medium rounded">ACTIVA</Badge>
              </div>
              <div className="mt-4 flex items-center text-gray-600">
                <Info className="h-5 w-5 mr-2" />
                <span>Ver información de mi suscripción</span>
              </div>
            </div>

            {/* About Section */}
            <div className="admin-header text-white p-4 md:p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 md:mb-6">Conozca más sobre Autogestiva</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-3" />
                  <span>Visita nuestro sitio web</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-3" />
                  <span>Visita nuestro Instagram</span>
                </div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="admin-header text-white py-3 px-4 md:py-4 md:px-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Botón de menú hamburguesa para móvil */}
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden text-white hover:bg-white/20"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>

            <img src="/autogestiva-logo-new.png" alt="Autogestiva" className="h-16 md:h-24" />
          </div>

          {/* Botón de vista previa - solo en desktop */}
          <div className="hidden md:flex md:items-center">
            <Button
              onClick={handleExitAdminMode}
              className="bg-white text-primary hover:bg-gray-100 rounded-full px-6 py-2"
            >
              Ver tienda en modo cliente
            </Button>
          </div>
        </div>

        {/* Título de la sección actual - solo en móvil (visible solo en la página de inicio) */}
        <div
          className={`md:hidden text-sm font-medium text-center py-2 mt-4 transition-all duration-300 ${
            showTitle ? "opacity-100 max-h-10" : "opacity-0 max-h-0 overflow-hidden mt-0 py-0"
          }`}
        >
          {getSectionTitle()}
        </div>
      </header>

      {/* Menú móvil */}
      {renderMobileMenu()}

      {/* Main Content */}
      <div className="container mx-auto py-4 px-4 md:py-8 md:px-4 pb-32 md:pb-8">{renderSection()}</div>

      {/* Botón flotante para vista previa en móvil - solo visible cuando no estamos en una sección de configuración */}
      {!activeConfigSection && <FloatingPreviewButton onClick={handleExitAdminMode} />}

      {/* Modals */}
      {showModal && (
        <ProductEditModal
          product={selectedProduct}
          onClose={() => {
            setShowModal(false)
            setSelectedProduct(null)
          }}
          onSave={handleSaveProduct}
          onDelete={onDeleteProduct}
        />
      )}

      {showCategoryModal && (
        <CategoryEditModal
          category={selectedCategory}
          onClose={() => {
            setShowCategoryModal(false)
            setSelectedCategory(null)
          }}
          onSave={(category) => {
            handleSaveCategory(category)
            // Actualizar la lista de categorías local
            if (!categories.some((c) => c.id === category.id)) {
              // Es una nueva categoría
              setCategories([...categories, category])
            } else {
              // Es una categoría existente, actualizarla
              setCategories(categories.map((c) => (c.id === category.id ? category : c)))
            }
          }}
          onDelete={onDeleteCategory}
          categories={categories}
        />
      )}
    </div>
  )
}
