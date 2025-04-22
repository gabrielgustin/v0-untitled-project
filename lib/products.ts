// Definición de tipos para los productos
export type ProductCategory = "breakfast" | "brunch" | "lunch" | "desserts" | "bakery" | "coffee" | null

// Actualizar la interfaz Product para incluir la propiedad optional
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
}

// Actualizar los productos existentes para asegurar que tengan la información correcta
const initialProducts: Product[] = [
  {
    id: "querido-bowl",
    name: "Querido Bowl",
    description: "Yogurt y granola casera, variedad de frutas de estación y miel.",
    price: 7600,
    image: "/querido-bowl.png",
    isVegetarian: true,
    category: "breakfast",
  },
  {
    id: "pop-cake",
    name: "Pop-Cake",
    description:
      "Dos pancakes súper esponjosos, coulis de frutos rojos, helado de crema americana y frutas de estación.",
    price: 8100,
    image: "/pop-cake.png",
    isVegetarian: true,
    category: "breakfast",
  },
  {
    id: "palta-y-huevo",
    name: "Palta y Huevo",
    description:
      "Huevos en omelette o revueltos • Palta • Dip de queso crema • Tostadas de brioche (podés elegir pan keto o sin TACC)",
    price: 7900,
    image: "/palta-y-huevo.png",
    variants: [
      { name: "Panceta y champiñones", price: 7900 },
      { name: "Queso danbo y jamón natural en fetas", price: 7900 },
      { name: "Salmón ahumado", price: 8900 },
    ],
    category: "breakfast",
  },
  {
    id: "plato-de-tostadas",
    name: "Plato de tostadas",
    description: "(2 tostadas con 2 dips a elección) • Mermelada • Manteca • Dulce de leche clásico • Queso crema",
    price: 3200,
    isVegetarian: true,
    category: "breakfast",
  },
  {
    id: "plato-de-huevos-revueltos",
    name: "Plato de huevos revueltos",
    description: "Incluye una rodaja de pan de masa madre.",
    price: 4700,
    isVegetarian: true,
    category: "breakfast",
  },
  {
    id: "budin",
    name: "Budín",
    description: "Delicioso budín casero con crema de amapola y frutas frescas de estación.",
    price: 5300,
    isVegetarian: true,
    category: "breakfast",
  },
  {
    id: "me-lo-merezco",
    name: "Me lo merezco",
    description:
      "Torre de tres platos para compartir entre 2 personas: • 1 porción de torta a elección. • Mafalda prensada de jamón natural y queso danbo. • Muffin inglés con queso danbo, panceta, cheesecream y huevo frito.",
    price: 22000,
    image: "/me-lo-merezco.png",
    variants: [],
    size: "large",
    category: "brunch",
  },
  {
    id: "chipa-prensado",
    name: "Chipá Prensado",
    description: "Con jamón natural y queso danbo.",
    price: 5800,
    image: "/chipa-prensado.png",
    category: "breakfast",
  },
  {
    id: "mafalda-prensada",
    name: "Mafalda Prensada",
    description: "Con jamón natural y queso danbo.",
    price: 5200,
    category: "brunch",
  },
  {
    id: "fosforito-la-capke",
    name: "Fosforito La Capke",
    description: "Cuadradito de láminas de hojaldre relleno de queso pategrás, cheesecream, tomate asado y rúcula.",
    price: 4900,
    image: "/fosforito-la-capke.png",
    isVegetarian: true,
    category: "breakfast",
  },
  {
    id: "fosforito-clasico",
    name: "Fosforito Clásico",
    description: "Con jamón natural y queso pategrás.",
    price: 4800,
    image: "/fosforito-clasico.png",
    category: "breakfast",
  },
  // Productos para la categoría "brunch"
  {
    id: "sandwich-mediterraneo",
    name: "Sándwich Mediterráneo",
    description: "Ciabatta de pan de masa madre, cheesecream, queso pategrás, jamón crudo, tomates asados y rúcula.",
    price: 13300,
    image: "/sandwich-mediterraneo.jpg",
    category: "brunch",
  },
  {
    id: "club-sandwich",
    name: "Club Sándwich",
    description:
      "Pollo asado, rúcula, tomates asados, panceta, mostaneza, jamón natural, queso danbo y queso pategrás.",
    price: 13800,
    image: "/club-sandwich.jpg",
    category: "brunch",
  },
  {
    id: "tosti-madre",
    name: "Tosti Madre",
    description:
      "Sándwich en pan de masa madre relleno de jamón natural a la plancha, queso danbo y pategrás, con un toque de mostaza.",
    price: 8200,
    image: "/tosti-madre.jpg",
    category: "brunch",
  },
  {
    id: "toston-de-palta",
    name: "Tostón de Palta",
    description: "Tostada de pan de masa madre, hummus cremoso de garbanzo, champiñones salteados y palta.",
    price: 7900,
    image: "/toston-de-palta.jpg",
    isVegetarian: true,
    category: "brunch",
  },
  {
    id: "el-benedictino",
    name: "El Benedictino",
    description:
      "Dos esponjosos muffins inglés, cheesecream, espinaca salteada, salmón ahumado, huevo media cocción y salsa holandesa cítrica.",
    price: 8700,
    image: "/el-benedictino.jpg",
    category: "brunch",
  },
  // Nuevos productos para brunch
  {
    id: "croissant-con-helado",
    name: "Croissant con Helado",
    description: "Croissant relleno de helado de crema americana, coulis de arándanos, banana y frutillas.",
    price: 6900,
    image: "/croissant-con-helado-new.png",
    isVegetarian: true,
    category: "brunch",
  },
  {
    id: "tosti-espinaca-champis",
    name: "Tosti de Espinaca y Champis",
    description:
      "Sándwich en pan de masa madre, espinaca y champiñones salteados en aceite infusionado en ajo con queso muzzarella.",
    price: 8200,
    image: "/tosti-espinaca-champis-new.png",
    isVegetarian: true,
    category: "brunch",
  },
]

// Función para obtener los productos (desde localStorage si existen, o los iniciales)
export function getProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts

  try {
    const savedProducts = localStorage.getItem("products")
    if (savedProducts) {
      return JSON.parse(savedProducts)
    }
  } catch (e) {
    console.error("Error parsing products from localStorage", e)
  }

  // Si no hay productos guardados o hay un error, guardar los iniciales
  localStorage.setItem("products", JSON.stringify(initialProducts))
  return initialProducts
}

// Función para guardar los productos
export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem("products", JSON.stringify(products))
    // Añadir un timestamp para la sesión actual
    localStorage.setItem("products_last_updated", Date.now().toString())
  } catch (e) {
    console.error("Error saving products to localStorage", e)
  }
}

// Función para actualizar un producto
export function updateProduct(updatedProduct: Product): Product[] {
  const products = getProducts()

  // Actualizar el producto
  const updatedProducts = products.map((product) => {
    if (product.id === updatedProduct.id) {
      // Si la categoría ha cambiado, actualizar el orden
      if (product.category !== updatedProduct.category) {
        // Asignar el producto a la nueva categoría
        return {
          ...updatedProduct,
          // Mantener cualquier otra propiedad que pueda tener
        }
      }
      return updatedProduct
    }
    return product
  })

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
  saveProducts(initialProducts)
  return initialProducts
}

// Función para obtener productos por categoría
export function getProductsByCategory(category: ProductCategory): Product[] {
  const products = getProducts()
  return products.filter((product) => product.category === category)
}

// Añadir una nueva función para verificar si hay cambios pendientes
export function hasPendingChanges(): boolean {
  if (typeof window === "undefined") return false

  const lastUpdated = localStorage.getItem("products_last_updated")
  const sessionStart = localStorage.getItem("session_start_time")

  if (lastUpdated && sessionStart) {
    return Number.parseInt(lastUpdated) > Number.parseInt(sessionStart)
  }

  return false
}

// Añadir una nueva función para obtener el orden de visualización
export function getDisplayOrder(category: ProductCategory): string[] {
  // Definir el orden de visualización para cada categoría
  const displayOrder: Record<ProductCategory, string[]> = {
    breakfast: [
      "palta-y-huevo",
      "me-lo-merezco",
      "plato-de-tostadas",
      "plato-de-huevos-revueltos",
      "budin",
      "querido-bowl",
      "pop-cake",
      "chipa-prensado",
      "fosforito-la-capke",
      "fosforito-clasico",
    ],
    brunch: [
      "sandwich-mediterraneo",
      "club-sandwich",
      "tosti-madre",
      "toston-de-palta",
      "el-benedictino",
      "croissant-con-helado",
      "tosti-espinaca-champis",
      "mafalda-prensada",
    ],
    lunch: [],
    desserts: [],
    bakery: [],
    coffee: [],
  }

  return displayOrder[category] || []
}

// Función para determinar la categoría predeterminada de un producto basado en su ID o nombre
export function getDefaultCategory(productId: string, productName: string): ProductCategory {
  const id = productId.toLowerCase()
  const name = productName.toLowerCase()

  // Verificar por palabras clave en el ID
  if (id.includes("sandwich") || id.includes("tosti") || id.includes("benedictino")) {
    return "brunch"
  }

  if (id.includes("cafe") || id.includes("latte") || id.includes("cappuccino") || id.includes("espresso")) {
    return "coffee"
  }

  if (id.includes("torta") || id.includes("postre") || id.includes("helado") || id.includes("dulce")) {
    return "desserts"
  }

  if (id.includes("pan") || id.includes("croissant") || id.includes("medialunas")) {
    return "bakery"
  }

  if (id.includes("milanesa") || id.includes("ensalada") || id.includes("almuerzo") || id.includes("cena")) {
    return "lunch"
  }

  // Verificar por palabras clave en el nombre
  if (name.includes("sandwich") || name.includes("tostado") || name.includes("brunch")) {
    return "brunch"
  }

  if (name.includes("café") || name.includes("latte") || name.includes("cappuccino") || name.includes("espresso")) {
    return "coffee"
  }

  if (name.includes("torta") || name.includes("postre") || name.includes("helado") || name.includes("dulce")) {
    return "desserts"
  }

  if (name.includes("pan") || name.includes("croissant") || name.includes("medialunas")) {
    return "bakery"
  }

  if (name.includes("milanesa") || name.includes("ensalada") || name.includes("almuerzo") || name.includes("cena")) {
    return "lunch"
  }

  // Por defecto, asignar a desayuno y merienda
  return "breakfast"
}
