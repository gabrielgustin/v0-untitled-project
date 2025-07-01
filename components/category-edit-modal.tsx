"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload } from "lucide-react"

export interface Category {
  id: string
  name: string
  description: string
  image: string | null
  isAvailable: boolean
}

// Categorías predefinidas que otras partes de la app importan
export const predefinedCategories: Category[] = [
  {
    id: "entradas",
    name: "Entradas",
    description: "Aperitivos y entradas para comenzar la comida",
    image: null,
    isAvailable: true,
  },
  {
    id: "principales",
    name: "Platos & Principales",
    description: "Platos principales y especialidades de la casa",
    image: null,
    isAvailable: true,
  },
  {
    id: "postres",
    name: "Postres",
    description: "Dulces y postres para finalizar la comida",
    image: null,
    isAvailable: true,
  },
  {
    id: "bebidas",
    name: "Bebidas & Refrescos",
    description: "Bebidas sin alcohol, refrescos y jugos",
    image: null,
    isAvailable: true,
  },
  {
    id: "vinos",
    name: "Vinos & Espumantes",
    description: "Selección de vinos y espumantes",
    image: null,
    isAvailable: true,
  },
  {
    id: "cocktails",
    name: "Cocktails & Tragos",
    description: "Bebidas alcohólicas y cócteles",
    image: null,
    isAvailable: true,
  },
]

interface CategoryEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: Category) => void
  category?: Category // Optional, for editing existing category
}

export function CategoryEditModal({ isOpen, onClose, onSave, category }: CategoryEditModalProps) {
  const [formData, setFormData] = useState<Category>(
    category || {
      id: "",
      name: "",
      description: "",
      image: null,
      isAvailable: true,
    },
  )
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (category) {
      setFormData(category)
    } else {
      setFormData({
        id: "",
        name: "",
        description: "",
        image: null,
        isAvailable: true,
      })
    }
  }, [category, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: keyof Category, checked: boolean) => {
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
            {category ? "Editar Categoría" : "Nueva Categoría"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-800 font-medium">
              Nombre de la Categoría
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Entradas, Platos Principales"
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
              placeholder="Una breve descripción de los productos en esta categoría."
              className="bg-transparent border border-gray-200"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-gray-800 font-medium">Imagen de la Categoría</Label>
            <div className="flex flex-col items-center border rounded-lg p-4 bg-gray-50">
              <div className="w-32 h-32 flex items-center justify-center mb-4">
                {formData.image ? (
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Category Image"
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
                onClick={() => document.getElementById("category-image-upload")?.click()}
              >
                {formData.image ? "Cambiar Imagen" : "Agregar Imagen"}
              </Button>
              <input
                id="category-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
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
