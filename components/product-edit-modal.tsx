"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus, Trash2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product, ProductCategory } from "@/lib/products"

interface ProductEditModalProps {
  product: Product | null
  onClose: () => void
  onSave: (product: Product) => void
  onDelete?: (productId: string) => void
}

export function ProductEditModal({ product, onClose, onSave, onDelete }: ProductEditModalProps) {
  const [editedProduct, setEditedProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    isVegetarian: false,
    variants: [],
    category: null,
    featured: false,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Cargar los datos del producto cuando se abre el modal
  useEffect(() => {
    if (product) {
      // Asegurarse de que la categoría esté definida
      const category = product.category || "entradas"

      // Asegurarse de que la descripción sea una cadena de texto
      const description = typeof product.description === "string" ? product.description : ""

      setEditedProduct({
        ...product,
        description,
        variants: product.variants || [],
        category: category as ProductCategory,
      })

      // Establecer la vista previa de la imagen
      if (product.image) {
        setImagePreview(product.image)
      }
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setEditedProduct((prev) => ({
      ...prev,
      category: value as ProductCategory,
    }))
  }

  const handleSizeChange = (value: string) => {
    setEditedProduct((prev) => ({
      ...prev,
      size: value as "normal" | "large",
    }))
  }

  const handleVariantChange = (index: number, field: "name" | "price", value: string) => {
    setEditedProduct((prev) => {
      const updatedVariants = [...(prev.variants || [])]
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: field === "price" ? Number.parseFloat(value) || 0 : value,
      }
      return {
        ...prev,
        variants: updatedVariants,
      }
    })
  }

  const addVariant = () => {
    setEditedProduct((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), { name: "", price: 0 }],
    }))
  }

  const removeVariant = (index: number) => {
    setEditedProduct((prev) => {
      const updatedVariants = [...(prev.variants || [])]
      updatedVariants.splice(index, 1)
      return {
        ...prev,
        variants: updatedVariants,
      }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEditedProduct((prev) => ({
      ...prev,
      image: value,
    }))

    // Actualizar la vista previa de la imagen
    if (value) {
      setImagePreview(value)
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que los campos requeridos estén completos
    if (!editedProduct.name || editedProduct.price <= 0) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    // Asegurarse de que la descripción sea una cadena de texto
    const sanitizedProduct = {
      ...editedProduct,
      description: String(editedProduct.description || ""),
    }

    // Guardar el producto
    onSave(sanitizedProduct)
  }

  const handleDelete = () => {
    if (onDelete && product && confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      onDelete(product.id)
    }
  }

  if (!product) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader className="pb-3 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-gray-800">Editar Producto</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 rounded-full hover:bg-gray-100"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleChange}
                  className="border-gray-200 bg-white text-gray-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700">
                  Categoría
                </Label>
                <Select
                  value={editedProduct.category || ""}
                  onValueChange={handleCategoryChange}
                  defaultValue={editedProduct.category || ""}
                >
                  <SelectTrigger className="border-gray-200 bg-white text-gray-700">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-gray-700">
                    <SelectItem value="entradas">Entradas</SelectItem>
                    <SelectItem value="principales">Platos Principales</SelectItem>
                    <SelectItem value="postres">Postres</SelectItem>
                    <SelectItem value="bebidas">Bebidas</SelectItem>
                    <SelectItem value="vinos">Vinos</SelectItem>
                    <SelectItem value="cocktails">Cocktails</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={typeof editedProduct.description === "string" ? editedProduct.description : ""}
                  onChange={handleChange}
                  className="border-gray-200 bg-white text-gray-700 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700">
                  Precio
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={editedProduct.price}
                  onChange={handleChange}
                  className="border-gray-200 bg-white text-gray-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-gray-700">
                  URL de la imagen
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    name="image"
                    value={editedProduct.image || ""}
                    onChange={handleImageChange}
                    className="border-gray-200 bg-white text-gray-700 flex-1"
                    placeholder="/placeholder.svg"
                  />
                </div>

                {/* Vista previa de la imagen */}
                {imagePreview && (
                  <div className="mt-2 relative w-full aspect-square bg-montebello-navy/30 rounded-md overflow-hidden border border-montebello-gold/20">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  </div>
                )}

                {!imagePreview && (
                  <div className="mt-2 flex items-center justify-center w-full aspect-square bg-montebello-navy/30 rounded-md border border-montebello-gold/20">
                    <div className="text-center text-montebello-light/50">
                      <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                      <p>Sin imagen</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-gray-700">
                  Tamaño
                </Label>
                <Select
                  value={editedProduct.size || "normal"}
                  onValueChange={handleSizeChange}
                  defaultValue={editedProduct.size || "normal"}
                >
                  <SelectTrigger className="border-gray-200 bg-white text-gray-700">
                    <SelectValue placeholder="Selecciona un tamaño" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-gray-700">
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Variantes */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-gray-700 font-medium">Variantes</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-montebello-gold/20 text-montebello-light"
                    onClick={addVariant}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Añadir variante
                  </Button>
                </div>

                {editedProduct.variants && editedProduct.variants.length > 0 ? (
                  <div className="space-y-3">
                    {editedProduct.variants.map((variant, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 border p-2 rounded-md border-gray-200 bg-gray-50"
                      >
                        <div className="flex-1">
                          <Input
                            value={variant.name}
                            onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                            className="border-gray-200 bg-white text-gray-700 mb-1"
                            placeholder="Nombre de la variante"
                          />
                          <Input
                            type="number"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                            className="border-gray-200 bg-white text-gray-700"
                            placeholder="Precio"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeVariant(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-montebello-light/70 italic">No hay variantes</p>
                )}
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Switch
                  id="isFeatured"
                  checked={editedProduct.featured || false}
                  onCheckedChange={(checked) => {
                    setEditedProduct((prev) => ({
                      ...prev,
                      featured: checked,
                    }))
                  }}
                />
                <Label htmlFor="isFeatured" className="text-gray-700">
                  Producto destacado
                </Label>
              </div>

              <div className="flex justify-between pt-4">
                {onDelete && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-red-200 text-red-500 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                )}
                <div className="flex gap-2 ml-auto">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#2a4287] hover:bg-[#1e3370] text-white font-medium">
                    Guardar cambios
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
