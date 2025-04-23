// Definición de tipos para los productos
export type ProductCategory = "entradas" | "principales" | "postres" | "bebidas" | "vinos" | "cocktails" | null

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isVegetarian?: boolean
  variants?: Array<{
    name: string
    price: number
  }>
  size?: "normal" | "large"
  category?: ProductCategory
  optional?: string
  featured?: boolean
}

// Lista de productos iniciales
export const initialProducts: Product[] = [
  // ENTRADAS
  {
    id: "provoleta-clasica",
    name: "Provoleta Clásica",
    description: "Queso provolone fundido con orégano y aceite de oliva.",
    price: 4200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sizzling-provoleta-Hzjx05BaQNMt915YYUPUzrg5mUzi9z.png",
    category: "entradas",
    isVegetarian: true,
  },
  {
    id: "empanadas-montebello",
    name: "Empanadas Montebello",
    description: "Selección de empanadas caseras (carne cortada a cuchillo, pollo, jamón y queso).",
    price: 3600,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assorted-empanadas-hJ34ZLhUnYZ7kclKnF31jwe9np6Yiz.png",
    category: "entradas",
    variants: [
      { name: "Unidad", price: 900 },
      { name: "Media docena", price: 4800 },
      { name: "Docena", price: 8500 },
    ],
  },
  {
    id: "tabla-de-quesos",
    name: "Tabla de Quesos",
    description: "Selección de quesos argentinos con frutos secos y mermelada casera.",
    price: 6500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/artisanal-cheese-selection-RA7eOCiVm8O1M8JEqAo4XnOsrO8PTe.png",
    category: "entradas",
    isVegetarian: true,
    size: "large",
  },
  // NUEVAS ENTRADAS
  {
    id: "rabas",
    name: "Rabas",
    description: "Aros de calamar rebozados y fritos, servidos con salsa alioli y limón.",
    price: 5200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/golden-crispy-calamari-vWy46ohGOnjX28KVU7jetFZbbxnfvE.png",
    category: "entradas",
  },
  {
    id: "langostinos-empanados",
    name: "Langostinos Empanados",
    description: "Langostinos rebozados en panko, acompañados de salsa golf casera.",
    price: 5800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crispy-breaded-shrimp-2XsLRvo97dHFM8MOBNPiivIxpvuOtq.png",
    category: "entradas",
  },
  {
    id: "burrata",
    name: "Burrata",
    description: "Queso burrata fresco con tomates cherry, rúcula, aceite de oliva y reducción de aceto balsámico.",
    price: 4900,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creamy-burrata-tomato-W7ddgH3Ztvj9Ube9qbUWyx2cNjOJxz.png",
    category: "entradas",
    isVegetarian: true,
  },

  // PLATOS PRINCIPALES
  {
    id: "bife-de-chorizo",
    name: "Bife de Chorizo",
    description: "Corte premium de 400g con guarnición a elección.",
    price: 9800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grilled-chorizo-steak-E4VJ351Ax1AB8fBjKluLaX7rtb5Viu.png",
    category: "principales",
    featured: true,
  },
  {
    id: "lomo-al-malbec",
    name: "Lomo al Malbec",
    description: "Medallones de lomo con reducción de Malbec y hongos, acompañado de puré de papas.",
    price: 10500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pan-seared-tenderloin-wine-reduction-u4x1WFjobWGQ1FRKdoH0QxGs0pfsVm.png",
    category: "principales",
  },
  {
    id: "milanesa-napolitana",
    name: "Milanesa Napolitana",
    description: "Milanesa de ternera con jamón, salsa de tomate, mozzarella y papas fritas.",
    price: 8200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/milanesa-napolitana-close-up-FQt9BYc70rxZCPrgUKmdYGSSLhrlqm.png",
    category: "principales",
  },
  {
    id: "risotto-de-hongos",
    name: "Risotto de Hongos",
    description: "Arroz arborio con variedad de hongos y queso parmesano.",
    price: 7800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creamy-mushroom-risotto-cuMgbuYpVLaNUxq6Oh76zdAA8LziSF.png",
    category: "principales",
    isVegetarian: true,
  },
  {
    id: "salmon-grillado",
    name: "Salmón Grillado",
    description: "Filete de salmón con salsa de eneldo, acompañado de vegetales salteados.",
    price: 9500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfectly-grilled-salmon-FkRJEUHmYVIimv6mgNwVMZYa68lJGk.png",
    category: "principales",
  },
  // NUEVOS PLATOS PRINCIPALES
  {
    id: "ojo-de-bife",
    name: "Ojo de Bife",
    description: "Corte premium de 350g con guarnición a elección.",
    price: 9500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfectly-seared-ribeye-JtU4szrCqy283PA90ot5A0vQr9frlk.png",
    category: "principales",
  },
  {
    id: "tomahawk",
    name: "Tomahawk",
    description: "Impresionante corte de 800g con hueso, ideal para compartir. Con guarnición a elección.",
    price: 15800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfectly-seared-tomahawk-xjlcN3wvmESuvayWeBZCJEy5Fw9f70.png",
    category: "principales",
    size: "large",
  },
  {
    id: "pollo-a-la-parrilla",
    name: "Pollo a la Parrilla",
    description: "Pechuga de pollo marinada y grillada, acompañada de puré rústico y vegetales asados.",
    price: 7200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfectly-grilled-chicken-wFhWiVpkEmm2rpqYR1IalQO1hFT50D.png",
    category: "principales",
  },
  {
    id: "sorrentinos-de-jamon-y-queso",
    name: "Sorrentinos de Jamón y Queso",
    description: "Pasta rellena casera con salsa a elección: filetto, crema de hongos o bolognesa.",
    price: 7500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/colorful-stuffed-pasta-phB5vMnehUTLvhxPFmluAi8wjroeXE.png",
    category: "principales",
  },
  {
    id: "pescado-del-dia",
    name: "Pescado del Día",
    description: "Filete de pescado fresco a la plancha con limón, hierbas y vegetales de estación.",
    price: 8900,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfectly-grilled-tilapia-ZLKZDW7T95W3rIC0ipSA1R57UrVFn4.png",
    category: "principales",
  },

  // POSTRES
  {
    id: "flan-casero",
    name: "Flan Casero",
    description: "Flan con dulce de leche y crema.",
    price: 3200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dulce-de-leche-flan-yse9eBecLZ4gPicCSGHDSpbgdFdJib.png",
    category: "postres",
    isVegetarian: true,
  },
  {
    id: "tiramisu",
    name: "Tiramisú",
    description: "Clásico postre italiano con café, mascarpone y cacao.",
    price: 3600,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-tiramisu-SRmdNnRJSpCNQ3IPccaHIxzKSJ0Nfg.png",
    category: "postres",
    isVegetarian: true,
    featured: true,
  },
  {
    id: "cheesecake-frutos-rojos",
    name: "Cheesecake de Frutos Rojos",
    description: "Tarta de queso con coulis de frutos rojos.",
    price: 3800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/berry-indulgence-Us2JWO1Gey6i3lIiY0mqircNZASWrd.png",
    category: "postres",
    isVegetarian: true,
  },
  // NUEVOS POSTRES
  {
    id: "volcan-de-chocolate",
    name: "Volcán de Chocolate",
    description: "Bizcocho de chocolate con centro líquido, acompañado de helado de vainilla.",
    price: 3900,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/decadent-lava-cake-epJm2c4gstXGQv3llU3GWSnKoVKsEu.png",
    category: "postres",
    isVegetarian: true,
  },
  {
    id: "panqueque-con-dulce-de-leche",
    name: "Panqueque con Dulce de Leche",
    description: "Clásico panqueque relleno de dulce de leche, flambeado con coñac.",
    price: 3400,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dulce-de-leche-crepe-stack-7B7XabmLUvh3zWrijGZSPdqFNToWnQ.png",
    category: "postres",
    isVegetarian: true,
  },

  // BEBIDAS
  {
    id: "gaseosas",
    name: "Gaseosas",
    description: "Coca-Cola, Sprite, Fanta (500ml).",
    price: 1500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-21%20a%20la%28s%29%207.03.58%E2%80%AFp.%C2%A0m.-fH1uPECJMLEUl1KGdsPvYTDebDQ02H.png",
    category: "bebidas",
    isVegetarian: true,
  },
  {
    id: "limonada-casera",
    name: "Limonada Casera",
    description: "Con menta y jengibre.",
    price: 1800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-21%20a%20la%28s%29%207.04.15%E2%80%AFp.%C2%A0m.-fe4mQDHwmdo7kkh70OXNGlSMmV1AAD.png",
    category: "bebidas",
    isVegetarian: true,
  },
  {
    id: "jugo-de-naranja",
    name: "Jugo de Naranja",
    description: "Exprimido al momento (350ml).",
    price: 1900,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-21%20a%20la%28s%29%207.04.27%E2%80%AFp.%C2%A0m.-GOIJUtLh7qS5lLvvU9r3LfHQeqH3Mk.png",
    category: "bebidas",
    isVegetarian: true,
  },
  {
    id: "cafe-espresso",
    name: "Café Espresso",
    description: "Café italiano intenso.",
    price: 1400,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-21%20a%20la%28s%29%207.05.01%E2%80%AFp.%C2%A0m.-DLrn2kIQuLXC7l5TtWC73m1GTta3gk.png",
    category: "bebidas",
    isVegetarian: true,
  },
  {
    id: "cafe-con-leche",
    name: "Café con Leche",
    description: "Espresso con leche cremada.",
    price: 1600,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-21%20a%20la%28s%29%207.04.46%E2%80%AFp.%C2%A0m.-izOnJCOEirjoyr8qBWwwjIo2ORpSL9.png",
    category: "bebidas",
    isVegetarian: true,
  },
  {
    id: "frappe-de-cafe",
    name: "Frappé de Café",
    description: "Café helado con crema y caramelo.",
    price: 2200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-21%20a%20la%28s%29%207.06.14%E2%80%AFp.%C2%A0m.-GnhcXGQyAG1yRR7dbz46hqAvrxSqCW.png",
    category: "bebidas",
    isVegetarian: true,
  },

  // VINOS
  {
    id: "malbec-reserva",
    name: "Malbec Reserva",
    description: "Bodega Luigi Bosca, Mendoza.",
    price: 7500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rich-malbec-tasting-gpv7Z2Ei6sSpGMnbahR23yGS9ewTN0.png",
    category: "vinos",
    isVegetarian: true,
  },
  {
    id: "champagne-extra-brut",
    name: "Champagne Extra Brut",
    description: "Bodega Chandon, Mendoza.",
    price: 8200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/celebratory-toast-uOapKDDTLtBphVJjqQQ6JWSGajt640.png",
    category: "vinos",
    isVegetarian: true,
    featured: true,
  },
  {
    id: "cabernet-sauvignon",
    name: "Cabernet Sauvignon",
    description: "Bodega Rutini, Mendoza.",
    price: 7200,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rich-red-cabernet-ZNr3Y24NECu8D1WnrPHunypbcjTDrE.png",
    category: "vinos",
    isVegetarian: true,
  },
  {
    id: "pinot-noir",
    name: "Pinot Noir",
    description: "Bodega Salentein, Valle de Uco.",
    price: 6900,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elegant-pinot-noir-xOg1Zv3NTakuBHwCrGT632x2N5Tzds.png",
    category: "vinos",
    isVegetarian: true,
  },
  {
    id: "sauvignon-blanc",
    name: "Sauvignon Blanc",
    description: "Bodega Zuccardi, Mendoza.",
    price: 6500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chilled-sauvignon-blanc-VuamjVmGscIJiikVRBTFQeL0BeUncz.png",
    category: "vinos",
    isVegetarian: true,
  },

  // COCKTAILS
  {
    id: "negroni",
    name: "Negroni",
    description: "Gin, Campari, Vermouth Rosso.",
    price: 3200,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-negroni-rlLgUEJfrlu0WBf7jlZpYnhw4G8Iw9.png",
    category: "cocktails",
    isVegetarian: true,
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    description: "Bourbon, Angostura, Azúcar.",
    price: 3500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-old-fashioned-BUKXwvh30EP4LFYJAWJ5Fwtc9S9NPA.png",
    category: "cocktails",
    isVegetarian: true,
  },
  {
    id: "mojito",
    name: "Mojito",
    description: "Ron, Lima, Menta, Azúcar, Soda.",
    price: 2800,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/refreshing-mojito-UvtuDLxoejLOaOXNfrVeIkyekdgoaH.png",
    category: "cocktails",
    isVegetarian: true,
  },
  {
    id: "margarita",
    name: "Margarita",
    description: "Tequila, Triple Sec, Jugo de limón.",
    price: 3100,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-margarita-xkNPSAn3QE2Uvqfeh1jtz5gkD7VkPK.png",
    category: "cocktails",
    isVegetarian: true,
  },
  {
    id: "manhattan",
    name: "Manhattan",
    description: "Whisky, Vermouth Rosso, Angostura.",
    price: 3400,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-manhattan-kJKNHozpkhwzngCi6IP3CRl0X5MAJv.png",
    category: "cocktails",
    isVegetarian: true,
  },
]

// Productos a excluir
const excludedProductIds = ["crumble-de-manzana", "chardonnay", "carpaccio-de-lomo"]

// Función para obtener los productos (desde localStorage si existen, o los iniciales)
export function getProducts(): Product[] {
  // Si estamos en el servidor, devolver los productos iniciales filtrados
  if (typeof window === "undefined") {
    return initialProducts.filter((product) => !excludedProductIds.includes(product.id))
  }

  try {
    const savedProducts = localStorage.getItem("products")
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        // Verificar que parsedProducts sea un array
        if (!Array.isArray(parsedProducts) || parsedProducts.length === 0) {
          console.error("Saved products is not a valid array, using initial products")
          const filteredProducts = initialProducts.filter((product) => !excludedProductIds.includes(product.id))
          localStorage.setItem("products", JSON.stringify(filteredProducts))
          return filteredProducts
        }

        // Filtrar los productos excluidos
        const filteredProducts = parsedProducts.filter((product) => !excludedProductIds.includes(product.id))
        return filteredProducts
      } catch (e) {
        console.error("Error parsing products from localStorage, using initial products", e)
        const filteredProducts = initialProducts.filter((product) => !excludedProductIds.includes(product.id))
        localStorage.setItem("products", JSON.stringify(filteredProducts))
        return filteredProducts
      }
    } else {
      // Si no hay productos guardados, guardar los iniciales filtrados
      const filteredProducts = initialProducts.filter((product) => !excludedProductIds.includes(product.id))
      localStorage.setItem("products", JSON.stringify(filteredProducts))
      return filteredProducts
    }
  } catch (e) {
    console.error("Error accessing localStorage, using initial products", e)
    return initialProducts.filter((product) => !excludedProductIds.includes(product.id))
  }
}

// Función para guardar los productos
export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem("products", JSON.stringify(products))
    localStorage.setItem("products_last_updated", Date.now().toString())
  } catch (e) {
    console.error("Error saving products to localStorage", e)
  }
}

// Función para actualizar un producto
export function updateProduct(updatedProduct: Product): Product[] {
  const products = getProducts()
  const updatedProducts = products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
  saveProducts(updatedProducts)
  return updatedProducts
}

// Función para eliminar un producto
export function deleteProduct(productId: string): Product[] {
  const products = getProducts()
  const updatedProducts = products.filter((product) => product.id !== productId)
  saveProducts(updatedProducts)
  return updatedProducts
}

// Función para añadir un nuevo producto
export function addProduct(newProduct: Product): Product[] {
  const products = getProducts()
  const updatedProducts = [...products, newProduct]
  saveProducts(updatedProducts)
  return updatedProducts
}

// Función para resetear los productos a los valores iniciales
export function resetProducts(): Product[] {
  const filteredProducts = initialProducts.filter((product) => !excludedProductIds.includes(product.id))
  saveProducts(filteredProducts)
  return filteredProducts
}

// Función para obtener productos por categoría
export function getProductsByCategory(category: ProductCategory): Product[] {
  const products = getProducts()
  return products.filter((product) => product.category === category)
}

// Función para obtener productos destacados
export function getFeaturedProducts(): Product[] {
  const products = getProducts()
  return products.filter((product) => product.featured === true)
}

// Función para verificar si hay cambios pendientes
export function hasPendingChanges(): boolean {
  if (typeof window === "undefined") return false

  const lastUpdated = localStorage.getItem("products_last_updated")
  const sessionStart = localStorage.getItem("session_start_time")

  if (lastUpdated && sessionStart) {
    return Number.parseInt(lastUpdated) > Number.parseInt(sessionStart)
  }

  return false
}

// Función para determinar la categoría predeterminada de un producto basado en su ID o nombre
export function getDefaultCategory(productId: string, productName: string): ProductCategory {
  const id = productId.toLowerCase()
  const name = productName.toLowerCase()

  // Verificar por palabras clave en el ID
  if (
    id.includes("agua") ||
    id.includes("gaseosa") ||
    id.includes("limonada") ||
    id.includes("jugo") ||
    id.includes("cafe") ||
    id.includes("corona") ||
    id.includes("patagonia") ||
    id.includes("stella") ||
    id.includes("michelob") ||
    id.includes("cerveza") ||
    id.includes("lata")
  ) {
    return "bebidas"
  }

  if (
    id.includes("carpaccio") ||
    id.includes("provoleta") ||
    id.includes("empanada") ||
    id.includes("tabla") ||
    id.includes("rabas") ||
    id.includes("langostinos") ||
    id.includes("burrata")
  ) {
    return "entradas"
  }

  if (
    id.includes("bife") ||
    id.includes("lomo") ||
    id.includes("milanesa") ||
    id.includes("risotto") ||
    id.includes("salmon") ||
    id.includes("ojo") ||
    id.includes("tomahawk") ||
    id.includes("pollo") ||
    id.includes("sorrentinos") ||
    id.includes("pescado")
  ) {
    return "principales"
  }

  if (
    id.includes("flan") ||
    id.includes("tiramisu") ||
    id.includes("cheesecake") ||
    id.includes("volcan") ||
    id.includes("crumble") ||
    id.includes("panqueque")
  ) {
    return "postres"
  }

  if (
    id.includes("malbec") ||
    id.includes("chardonnay") ||
    id.includes("champagne") ||
    id.includes("cabernet") ||
    id.includes("pinot") ||
    id.includes("sauvignon")
  ) {
    return "vinos"
  }

  if (
    id.includes("negroni") ||
    id.includes("aperol") ||
    id.includes("mojito") ||
    id.includes("margarita") ||
    id.includes("manhattan") ||
    id.includes("daiquiri") ||
    id.includes("gin") ||
    id.includes("caipirinha")
  ) {
    return "cocktails"
  }

  // Verificar por palabras clave en el nombre
  if (
    name.includes("agua") ||
    name.includes("gaseosa") ||
    name.includes("limonada") ||
    name.includes("jugo") ||
    name.includes("cafe") ||
    name.includes("corona") ||
    name.includes("patagonia") ||
    name.includes("stella") ||
    name.includes("michelob") ||
    name.includes("cerveza") ||
    name.includes("lata")
  ) {
    return "bebidas"
  }

  if (
    name.includes("carpaccio") ||
    name.includes("provoleta") ||
    name.includes("empanada") ||
    name.includes("tabla") ||
    name.includes("rabas") ||
    name.includes("langostinos") ||
    name.includes("burrata")
  ) {
    return "entradas"
  }

  if (
    name.includes("bife") ||
    name.includes("lomo") ||
    name.includes("milanesa") ||
    name.includes("risotto") ||
    name.includes("salmon") ||
    name.includes("ojo") ||
    name.includes("tomahawk") ||
    name.includes("pollo") ||
    name.includes("sorrentinos") ||
    name.includes("pescado")
  ) {
    return "principales"
  }

  if (
    name.includes("flan") ||
    name.includes("tiramisu") ||
    name.includes("cheesecake") ||
    name.includes("volcan") ||
    name.includes("crumble") ||
    name.includes("panqueque")
  ) {
    return "postres"
  }

  if (
    name.includes("malbec") ||
    name.includes("chardonnay") ||
    name.includes("champagne") ||
    name.includes("cabernet") ||
    name.includes("pinot") ||
    name.includes("sauvignon")
  ) {
    return "vinos"
  }

  if (
    name.includes("negroni") ||
    name.includes("aperol") ||
    name.includes("mojito") ||
    name.includes("margarita") ||
    name.includes("manhattan") ||
    name.includes("daiquiri") ||
    name.includes("gin") ||
    name.includes("caipirinha")
  ) {
    return "cocktails"
  }

  // Por defecto, asignar a entradas
  return "entradas"
}

// Función para obtener la imagen predeterminada según la categoría
export function getDefaultImage(category: ProductCategory | null, productName: string): string {
  // Usar URLs de imágenes públicas para cada categoría
  const defaultImages = {
    entradas:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/artisanal-cheese-selection-RA7eOCiVm8O1M8JEqAo4XnOsrO8PTe.png",
    principales:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfectly-seared-ribeye-JtU4szrCqy283PA90ot5A0vQr9frlk.png",
    postres:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-tiramisu-SRmdNnRJSpCNQ3IPccaHIxzKSJ0Nfg.png",
    bebidas:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/refreshing-mojito-UvtuDLxoejLOaOXNfrVeIkyekdgoaH.png",
    vinos:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rich-malbec-tasting-gpv7Z2Ei6sSpGMnbahR23yGS9ewTN0.png",
    cocktails:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-negroni-rlLgUEJfrlu0WBf7jlZpYnhw4G8Iw9.png",
    default:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/golden-leaf-restaurant-Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9Yd9.png",
  }

  if (category && defaultImages[category]) {
    return defaultImages[category]
  }

  return defaultImages.default
}
