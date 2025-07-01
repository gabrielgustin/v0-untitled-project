"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, X, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string | null
  isAvailable: boolean
  isFeatured: boolean
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  tags: string[]
}

interface ProductEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
  product?: Product // Optional, for editing existing product
}

export function ProductEditModal({ isOpen, onClose, onSave, product }: ProductEditModalProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: "",
      name: "",
      description: "",
      price: 0,
      category: "",
      image: null,
      isAvailable: true,
      isFeatured: false,
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      tags: [],
    },
  )
  const [newTag, setNewTag] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        price: 0,
        category: "",
        image: null,
        isAvailable: true,
        isFeatured: false,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        tags: [],
      })
    }
  }, [product, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: keyof Product, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData((prev) => ({ ...prev, image: event.target.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-bold text-gray-800">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-800 font-medium">
              Nombre del Producto
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Hamburguesa Clásica"
              required
              className="bg-transparent border border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-800 font-medium">
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Una deliciosa hamburguesa con queso, lechuga y tomate."
              className="bg-transparent border border-gray-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-800 font-medium">
                Precio
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleNumberChange}
                placeholder="0.00"
                step="0.01"
                required
                className="bg-transparent border border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-800 font-medium">
                Categoría
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger className="bg-transparent border border-gray-200">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entradas">Entradas</SelectItem>
                  <SelectItem value="platos-principales">Platos Principales</SelectItem>
                  <SelectItem value="postres">Postres</SelectItem>
                  <SelectItem value="bebidas">Bebidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-gray-800 font-medium">Imagen del Producto</Label>
            <div className="flex flex-col items-center border rounded-lg p-4 bg-gray-50">
              <div className="w-32 h-32 flex items-center justify-center mb-4">
                {formData.image ? (
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Product Image"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-600">
                    <Upload className="h-10 w-10 mx-auto mb-2" />
                    <p>Sin imagen</p>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                className="w-full text-[#2a4287] font-medium border-[#2a4287] hover:bg-[#2a4287] hover:text-white bg-transparent"
                type="button"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {formData.image ? "Cambiar Imagen" : "Agregar Imagen"}
              </Button>
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Opciones de Visibilidad</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="isAvailable" className="text-gray-700">
                Disponible
              </Label>
              <Switch
                id="isAvailable"
                checked={formData.isAvailable}
                onCheckedChange={(checked) => handleSwitchChange("isAvailable", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isFeatured" className="text-gray-700">
                Destacado
              </Label>
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Características Especiales</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="isVegetarian" className="text-gray-700">
                Vegetariano
              </Label>
              <Switch
                id="isVegetarian"
                checked={formData.isVegetarian}
                onCheckedChange={(checked) => handleSwitchChange("isVegetarian", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isVegan" className="text-gray-700">
                Vegano
              </Label>
              <Switch
                id="isVegan"
                checked={formData.isVegan}
                onCheckedChange={(checked) => handleSwitchChange("isVegan", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isGlutenFree" className="text-gray-700">
                Sin Gluten
              </Label>
              <Switch
                id="isGlutenFree"
                checked={formData.isGlutenFree}
                onCheckedChange={(checked) => handleSwitchChange("isGlutenFree", checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newTag" className="text-gray-800 font-medium">
              Etiquetas
            </Label>
            <div className="flex gap-2">
              <Input
                id="newTag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Añadir etiqueta (ej: picante, nuevo)"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                className="bg-transparent border border-gray-200"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                variant="outline"
                className="text-[#2a4287] border-[#2a4287] hover:bg-[#2a4287] hover:text-white bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1 bg-gray-200 text-gray-800">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-gray-600 hover:text-gray-900"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </form>
        <DialogFooter className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="text-gray-700 font-medium bg-transparent">
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#2a4287] hover:bg-[#1e3370] text-white font-medium"
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
