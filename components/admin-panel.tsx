"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductEditModal } from "@/components/product-edit-modal"
// Importar el nuevo componente CategoryEditModal
import { CategoryEditModal, type Category } from "@/components/category-edit-modal"
import { FolderPlus } from "lucide-react"
import type { Product } from "@/lib/products"

// Actualizar la interfaz AdminPanelProps para incluir las funciones de categoría
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

// Actualizar el componente AdminPanel para incluir el estado y funciones para categorías
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
    const newCategory: Category = {
      id: "",
      name: "Nueva Categoría",
      description: "",
      isActive: true,
      order: 0,
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
    if (onAddCategory && !category.id) {
      onAddCategory(category)
    } else if (onUpdateCategory) {
      onUpdateCategory(category)
    }

    setShowCategoryModal(false)
    setSelectedCategory(null)
  }

  const handleResetProducts = () => {
    if (confirm("¿Estás seguro de que deseas restablecer todos los productos a sus valores originales?")) {
      onResetProducts()
    }
  }

  return (
    <div className="mb-8">
      <Card className="border-montebello-gold/20 bg-montebello-navy/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-montebello-gold">Panel de Administración</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-montebello-gold hover:bg-montebello-gold/90 text-montebello-navy font-medium"
              onClick={handleAddProduct}
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir Producto
            </Button>

            <Button
              className="bg-montebello-gold hover:bg-montebello-gold/90 text-montebello-navy font-medium"
              onClick={handleAddCategory}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Añadir Categoría
            </Button>
          </div>
          <p className="text-sm text-montebello-light/70 mt-3">
            Como administrador, puedes añadir, editar o eliminar productos y categorías. Los cambios se guardarán
            automáticamente durante tu sesión.
          </p>
        </CardContent>
      </Card>

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
          onSave={handleSaveCategory}
          onDelete={onDeleteCategory}
        />
      )}
    </div>
  )
}
