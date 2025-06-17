"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingBag, ArrowLeft, Check, Info, Coffee, Utensils, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getAuthState, type User } from "@/lib/auth"
import { getProducts, type Product, getDefaultImage, initialProducts } from "@/lib/products"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { toast } from "@/components/ui/use-toast"

import { motion, AnimatePresence } from "framer-motion"
import { addToCartAnimation } from "@/lib/animation-utils"

// Definir el tipo para un item del carrito
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: string
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [quantity, setQuantity] = useState(1)
  const [isChanging, setIsChanging] = useState(false)
  const [changeDirection, setChangeDirection] = useState<"up" | "down" | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [selectedVariantPrice, setSelectedVariantPrice] = useState<number | null>(null)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [cartAnimation, setCartAnimation] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  // Cargar el producto por ID
  useEffect(() => {
    try {
      // Intentar obtener productos del localStorage
      const products = getProducts()
      const foundProduct = products.find((p) => p.id === params.id)

      if (foundProduct) {
        console.log(`ProductPage: Producto encontrado: ${foundProduct.name}`)
        setProduct(foundProduct)

        // Si el producto tiene variantes, seleccionar la primera por defecto
        if (foundProduct.variants && foundProduct.variants.length > 0) {
          setSelectedVariant(foundProduct.variants[0].name)
          setSelectedVariantPrice(foundProduct.variants[0].price)
        }
      } else {
        console.log(
          `ProductPage: Producto no encontrado en localStorage, buscando en productos iniciales: ${params.id}`,
        )
        // Si no se encuentra en localStorage, buscar en los productos iniciales
        const initialProduct = initialProducts.find((p) => p.id === params.id)

        if (initialProduct) {
          console.log(`ProductPage: Producto encontrado en productos iniciales: ${initialProduct.name}`)
          setProduct(initialProduct)

          // Si el producto tiene variantes, seleccionar la primera por defecto
          if (initialProduct.variants && initialProduct.variants.length > 0) {
            setSelectedVariant(initialProduct.variants[0].name)
            setSelectedVariantPrice(initialProduct.variants[0].price)
          }
        } else {
          // Producto no encontrado, crear uno genérico y mostrar toast
          const genericProduct = {
            id: params.id,
            name: params.id
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            image: getDefaultImage(null, params.id),
            price: 0, // Precio 0 para indicar que no es un producto válido para comprar
            description: "Lo sentimos, no pudimos encontrar este producto.",
          }
          setProduct(genericProduct)
          toast({
            title: "Producto no encontrado",
            description: "El producto que buscas no está disponible.",
            duration: 3000,
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("ProductPage: Error al cargar el producto:", error)
      // En caso de error, crear un producto genérico y mostrar toast
      const genericProduct = {
        id: params.id,
        name: params.id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        image: getDefaultImage(null, params.id),
        price: 0,
        description: "Error al cargar el producto.",
      }
      setProduct(genericProduct)
      toast({
        title: "Error al cargar producto",
        description: "Hubo un problema al cargar la información del producto.",
        duration: 3000,
        variant: "destructive",
      })
    }
  }, [params.id])

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCart(parsedCart)

        // Calcular la cantidad total de items en el carrito
        const totalItems = parsedCart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
        setCartItemCount(totalItems)
        console.log("ProductPage: Cart loaded from localStorage on mount. Total items:", totalItems) // Log para depuración
      } catch (e) {
        console.error("ProductPage: Error parsing cart from localStorage on mount", e)
      }
    } else {
      console.log("ProductPage: No cart found in localStorage on mount. Total items: 0") // Log para depuración
    }

    // Cargar usuario
    const authUser = getAuthState()
    if (authUser) {
      setUser(authUser)
      setIsAdmin(authUser.username === "Admin1")
    }
  }, [params.id])

  // Actualizar el precio total cuando cambia la cantidad o la variante
  useEffect(() => {
    if (product) {
      const basePrice = selectedVariantPrice !== null ? selectedVariantPrice : product.price
      setTotalPrice(quantity * basePrice)
    }
  }, [quantity, product, selectedVariantPrice])

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
    setIsChanging(true)
    setChangeDirection("up")
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
      setIsChanging(true)
      setChangeDirection("down")
    }
  }

  // Efecto para resetear la animación
  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => {
        setIsChanging(false)
        setChangeDirection(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isChanging])

  // Función para seleccionar una variante
  const handleVariantSelect = (variantName: string) => {
    if (product && product.variants) {
      const variant = product.variants.find((v) => v.name === variantName)
      if (variant) {
        setSelectedVariant(variant.name)
        setSelectedVariantPrice(variant.price)
      }
    }
  }

  // Función para agregar al carrito
  const addToCart = () => {
    // Deshabilitar la adición si el producto no es válido
    if (
      !product ||
      (product.price === 0 && product.description === "Lo sentimos, no pudimos encontrar este producto.")
    ) {
      toast({
        title: "Error al agregar",
        description: "No se puede agregar un producto no válido al carrito.",
        duration: 3000,
        variant: "destructive",
      })
      return
    }

    // Crear el nuevo item
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: selectedVariantPrice !== null ? selectedVariantPrice : product.price,
      quantity: quantity,
      image: product.image || getDefaultImage(product.category, product.name),
      variant: selectedVariant || undefined,
    }

    // Verificar si el producto ya está en el carrito con la misma variante
    const existingItemIndex = cart.findIndex((item) => item.id === product.id && item.variant === newItem.variant)

    let updatedCart: CartItem[]

    if (existingItemIndex >= 0) {
      // Si ya existe, actualizar la cantidad
      updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += quantity
    } else {
      // Si no existe, añadir el nuevo item
      updatedCart = [...cart, newItem]
    }

    // Actualizar el estado y localStorage
    setCart(updatedCart)
    console.log("ProductPage: Carrito actualizado en estado:", updatedCart) // Depuración
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    console.log("ProductPage: Carrito guardado en localStorage:", localStorage.getItem("cart")) // Depuración

    // Calcular la nueva cantidad total de items
    const newTotalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0)
    setCartItemCount(newTotalItems)
    console.log("ProductPage: Cart item count updated to:", newTotalItems) // Log para depuración

    // Activar la animación del carrito
    setCartAnimation(true)

    // Mostrar feedback visual
    setIsAddingToCart(true)

    // Eliminar el toast de confirmación
    // toast({
    //   title: "Producto agregado",
    //   description: "El producto ha sido añadido a tu pedido.",
    //   duration: 2000,
    //   variant: "success",
    // })

    // Redirigir al menú inmediatamente después de añadir
    router.replace("/menu") // Usar replace para evitar añadir a la historia de navegación
  }

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    const authUser = getAuthState()
    setUser(authUser)
  }

  // Función para manejar errores de carga de imagen
  const handleImageError = () => {
    console.warn(`Error loading image for product: ${product?.id}`)
    setImageError(true)
    setIsImageLoading(false)
  }

  // Determinar si el producto es el genérico "no encontrado"
  const isProductNotFound =
    product && product.price === 0 && product.description === "Lo sentimos, no pudimos encontrar este producto."

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-montebello-navy">
        <div className="animate-pulse text-montebello-light">Cargando producto...</div>
      </div>
    )
  }

  // Función para obtener el texto de la categoría
  const getCategoryText = (category: string | null) => {
    if (category === "brunch") {
      // Si el producto es "me-lo-merezco", mostrar "PARA DESAYUNAR Y MERENDAR" en lugar de "Brunchear"
      if (product.id === "me-lo-merezco") {
        return "PARA DESAYUNAR Y MERENDAR"
      }
      return "Brunchear"
    }
    if (category === "breakfast") return "Desayuno & Merienda"
    if (category === "lunch") return "Almuerzo & Cena"
    return null
  }

  // Determinar si el producto tiene imagen
  const hasImage = !!product.image

  // Actualizar la función para obtener la URL de la imagen
  const imageUrl = imageError
    ? getDefaultImage(product.category, product.name)
    : product.image || getDefaultImage(product.category, product.name)

  // Asegurarse de que la imagen de fallback sea una URL pública
  const getProductIcon = () => {
    if (product.category === "breakfast") {
      return <Coffee className="h-12 w-12 text-montebello-light/60" />
    } else if (product.category === "brunch") {
      return <Utensils className="h-12 w-12 text-montebello-light/60" />
    } else {
      return <Coffee className="h-12 w-12 text-montebello-light/60" />
    }
  }

  // Reemplazar el div principal por motion.div
  return (
    <motion.div
      className="bg-montebello-navy min-h-screen flex flex-col pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop Navigation con contador de carrito */}
      <DesktopNavigation
        user={user}
        onLoginSuccess={handleLoginSuccess}
        cartItemCount={cartItemCount}
        cartAnimation={cartAnimation}
      />
      <div className="container-app flex-1 flex flex-col lg:flex-row lg:gap-8 lg:py-8">
        {/* Contenedor para la imagen y el botón con el mismo margen superior */}
        <div className="pt-16 relative lg:w-1/2 lg:pt-0">
          {/* Botón de retroceso - Solo visible en móvil */}
          <div className="fixed left-4 top-4 z-10 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 bg-montebello-navy/80 border border-montebello-gold/20 shadow-sm hover:bg-montebello-navy/90"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-6 w-6 text-montebello-light" />
            </Button>
          </div>

          {/* Botón de retroceso - Solo visible en desktop */}
          <div className="hidden lg:block mb-4 mt-4">
            <Button
              variant="ghost" // Cambiado a ghost para un look más sutil
              className="text-montebello-gold hover:bg-montebello-gold/10" // Colores ajustados
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver al menú
            </Button>
          </div>

          {/* Sección de la imagen - Enfoque simplificado */}
          <div className="w-full flex justify-center px-4 lg:px-0">
            <div className="w-full max-w-xs lg:max-w-md aspect-square bg-montebello-navy/60 rounded-lg overflow-hidden shadow-sm relative border border-montebello-gold/20">
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 h-8 w-8 bg-montebello-gold/20 hover:bg-montebello-gold/30 text-montebello-light rounded-full shadow-sm"
                  onClick={() => router.push(`/menu?edit=${product.id}`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}

              {/* Indicador de carga */}
              {isImageLoading && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-montebello-navy/60">
                  <div className="animate-pulse text-montebello-gold">Cargando imagen...</div>
                </div>
              )}

              {/* Imagen del producto - Enfoque simplificado */}
              {hasImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    onLoad={() => setIsImageLoading(false)}
                    onError={handleImageError}
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6">
                  <div className="bg-montebello-navy/50 rounded-full p-8 mb-4 border border-montebello-gold/20">
                    {getProductIcon()}
                  </div>
                  <h2 className="text-xl font-bold text-montebello-gold text-center">{product.name}</h2>
                  <p className="text-sm text-montebello-light/70 text-center mt-2 max-w-xs">
                    {typeof product.description === "string" && product.description.split("•")[0]}
                  </p>
                </div>
              )}

              {/* Eliminado el ícono vegetariano */}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 p-4 lg:p-0 flex flex-col">
          {/* Modificar el título del producto */}
          <motion.h1
            className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 text-montebello-gold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.name}
          </motion.h1>

          {/* Tabs para información del producto */}
          <Tabs defaultValue="description" className="w-full mb-4">
            <TabsList className="mb-2 bg-montebello-navy/60 border border-montebello-gold/20">
              <TabsTrigger
                value="description"
                className="text-montebello-light data-[state=active]:bg-montebello-gold/20 data-[state=active]:text-montebello-gold"
              >
                Descripción
              </TabsTrigger>
              <TabsTrigger
                value="ingredients"
                className="text-montebello-light data-[state=active]:bg-montebello-gold/20 data-[state=active]:text-montebello-gold"
              >
                Ingredientes
              </TabsTrigger>
              <TabsTrigger
                value="info"
                className="text-montebello-light data-[state=active]:bg-montebello-gold/20 data-[state=active]:text-montebello-gold"
              >
                Información
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-sm lg:text-base text-montebello-light">
              <p className="bg-montebello-navy/60 p-3 rounded-lg shadow-sm border border-montebello-gold/20 leading-relaxed tracking-wide">
                {product.id === "me-lo-merezco" ? (
                  <>
                    • 1 porción de torta a elección.
                    <br />• Mafalda prensada de jamón natural y<br />
                    queso danbo.
                    <br />• Muffin inglés con queso danbo,
                    <br />
                    panceta, cheesecream y huevo frito.
                  </>
                ) : (
                  <>
                    {product.description && typeof product.description === "string"
                      ? product.description.split("•").map((item, index) =>
                          index === 0 ? (
                            item
                          ) : (
                            <React.Fragment key={index}>
                              <br />• {item.trim()}
                            </React.Fragment>
                          ),
                        )
                      : "Sin descripción disponible"}
                  </>
                )}
              </p>
            </TabsContent>
            <TabsContent value="ingredients" className="text-sm lg:text-base text-montebello-light">
              <div className="bg-montebello-navy/60 p-3 rounded-lg shadow-sm border border-montebello-gold/20">
                <p>Ingredientes principales:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {product.id === "querido-bowl" && (
                    <>
                      <li>Yogurt natural</li>
                      <li>Granola casera</li>
                      <li>Frutas de estación</li>
                      <li>Miel</li>
                    </>
                  )}
                  {product.id === "palta-y-huevo" && (
                    <>
                      <li>Huevos frescos</li>
                      <li>Palta</li>
                      <li>Queso crema</li>
                      <li>Pan brioche</li>
                    </>
                  )}
                  {product.id === "croissant-con-helado" && (
                    <>
                      <li>Croissant de manteca</li>
                      <li>Helado de crema americana</li>
                      <li>Coulis de arándanos</li>
                      <li>Banana</li>
                      <li>Frutillas</li>
                    </>
                  )}
                  {product.id === "tosti-espinaca-champis" && (
                    <>
                      <li>Pan de masa madre</li>
                      <li>Espinaca fresca</li>
                      <li>Champiñones</li>
                      <li>Aceite de oliva infusionado con ajo</li>
                      <li>Queso muzzarella</li>
                    </>
                  )}
                  {product.id === "plato-de-tostadas" && (
                    <>
                      <li>Pan de masa madre</li>
                      <li>Mermelada</li>
                      <li>Manteca</li>
                      <li>Dulce de leche clásico</li>
                      <li>Queso crema</li>
                    </>
                  )}
                  {product.id === "plato-de-huevos-revueltos" && (
                    <>
                      <li>Huevos frescos</li>
                      <li>Manteca</li>
                      <li>Sal y pimienta</li>
                      <li>Pan de masa madre</li>
                    </>
                  )}
                  {product.id === "budin" && (
                    <>
                      <li>Harina</li>
                      <li>Huevos</li>
                      <li>Manteca</li>
                      <li>Semillas de amapola</li>
                      <li>Frutas frescas de estación</li>
                    </>
                  )}
                  {product.id === "mafalda-prensada" && (
                    <>
                      <li>Pan mafalda</li>
                      <li>Jamón natural</li>
                      <li>Queso danbo</li>
                    </>
                  )}
                  {![
                    "querido-bowl",
                    "palta-y-huevo",
                    "croissant-con-helado",
                    "tosti-espinaca-champis",
                    "plato-de-tostadas",
                    "plato-de-huevos-revueltos",
                    "budin",
                    "mafalda-prensada",
                  ].includes(product.id) && <li>Consultar con el personal por ingredientes específicos</li>}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="info" className="text-sm lg:text-base text-montebello-light">
              <div className="bg-montebello-navy/60 p-3 rounded-lg shadow-sm border border-montebello-gold/20 space-y-2">
                <p className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-montebello-light/70" />
                  <span>Tiempo de preparación: 10-15 minutos</span>
                </p>
                <p className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-montebello-light/70" />
                  <span>Apto para compartir: {product.size === "large" ? "Sí" : "No"}</span>
                </p>
                <p className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-montebello-light/70" />
                  <span>Disponible para llevar: Sí</span>
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Variantes si existen */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-montebello-gold mb-2 lg:text-lg">Variantes:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((variant, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn(
                      "justify-between border-montebello-gold/20 hover:bg-montebello-gold/10 text-montebello-light",
                      selectedVariant === variant.name && "bg-montebello-gold/20 border-montebello-gold/40",
                    )}
                    onClick={() => handleVariantSelect(variant.name)}
                  >
                    <span className="text-sm">{variant.name}</span>
                    <span className="font-semibold text-montebello-gold ml-2">$ {variant.price.toLocaleString()}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector y Botón de Agregar al Carrito - Solo visible en desktop */}
          <div className="hidden lg:flex flex-col gap-6 mt-auto">
            {" "}
            {/* Ajustado para mejor posicionamiento */}
            <div className="flex items-center justify-between">
              <div className="text-base sm:text-lg lg:text-xl font-medium text-montebello-gold">
                ${(selectedVariantPrice !== null ? selectedVariantPrice : product.price).toFixed(2)}
                <span className="text-xs sm:text-sm text-montebello-light/70">/ unidad</span>
              </div>

              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg border-montebello-gold/20 bg-montebello-gold/20 text-montebello-navy hover:bg-montebello-gold/30"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>

                <span
                  className={cn(
                    "mx-3 sm:mx-4 font-medium text-base sm:text-xl w-5 sm:w-6 text-center text-montebello-light transition-transform duration-300",
                  )}
                >
                  {quantity}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg border-montebello-gold/20 bg-montebello-gold/20 text-montebello-navy hover:bg-montebello-gold/30"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
            {/* Modificar el botón de agregar al carrito */}
            <motion.button
              className={cn(
                "bg-montebello-gold text-montebello-navy font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-lg", // Colores y tamaño ajustados
                isAddingToCart && "bg-green-900/20 text-green-400 border-green-800/30",
              )}
              onClick={addToCart}
              disabled={isAddingToCart || isProductNotFound} // Deshabilitar si el producto no es válido
              variants={addToCartAnimation}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.8,
              }}
            >
              {isAddingToCart ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <Check className="h-5 w-5 mr-2" />
                  Agregado
                </motion.div>
              ) : (
                <>
                  Agregar al pedido
                  <ShoppingBag className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      {/* Barra inferior con animación */}
      <AnimatePresence>
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-montebello-navy border-t border-montebello-gold/20 p-4 flex items-center justify-between lg:hidden z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="flex-1 max-w-[140px]">
            {/* Selector de cantidad con el nuevo estilo */}
            <div className="bg-montebello-navy/80 rounded-full flex items-center justify-between p-1 shadow-sm border border-montebello-gold/20">
              <button
                className="w-10 h-10 flex items-center justify-center bg-montebello-gold/20 rounded-full"
                onClick={decrementQuantity}
              >
                <Minus className="h-5 w-5 text-montebello-navy" />
              </button>
              <span className="font-bold text-xl text-montebello-light">{quantity}</span>
              <button
                className="w-10 h-10 flex items-center justify-center bg-montebello-gold/20 rounded-full"
                onClick={incrementQuantity}
              >
                <Plus className="h-5 w-5 text-montebello-navy" />
              </button>
            </div>
          </div>

          {/* Botón de agregar con el nuevo estilo */}
          <button
            className={cn(
              "flex-1 ml-4 bg-montebello-gold/20 text-montebello-navy font-bold py-3 px-4 rounded-lg text-center transition-all border border-montebello-gold/20",
              isAddingToCart && "bg-green-900/20 text-green-400 border-green-800/30",
            )}
            onClick={addToCart}
            disabled={isAddingToCart || isProductNotFound} // Deshabilitar si el producto no es válido
          >
            {isAddingToCart ? (
              <span className="flex items-center justify-center">
                <Check className="h-5 w-5 mr-2" />
                Agregado
              </span>
            ) : (
              <span>Agregar $ {totalPrice.toLocaleString()}</span>
            )}
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
