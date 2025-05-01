"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Trash2, Coffee, UtensilsCrossed, Sandwich, Cake, Wine, CoffeeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export interface Category {
  id: string
  name: string
  description?: string
  iconType?: "entradas" | "principales" | "postres" | "bebidas" | "vinos" | "cocktails"
  isActive?: boolean
  order?: number
}

interface CategoryEditModalProps {
  category: Category | null
  onClose: () => void
  onSave: (category: Category) => void
  onDelete?: (categoryId: string) => void
}

export function CategoryEditModal({ category, onClose, onSave, onDelete }: CategoryEditModalProps) {
  const [editedCategory, setEditedCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    iconType: "entradas",
    isActive: true,
    order: 0,
  })

  // Cargar los datos de la categoría cuando se abre el modal
  useEffect(() => {
    if (category) {
      setEditedCategory({
        ...category,
        description: category.description || "",
        iconType: category.iconType || "entradas",
        isActive: category.isActive !== false,
        order: category.order || 0,
      })
    }
  }, [category])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedCategory((prev) => ({
      ...prev,
      [name]: name === "order" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleActiveChange = (checked: boolean) => {
    setEditedCategory((prev) => ({
      ...prev,
      isActive: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que los campos requeridos estén completos
    if (!editedCategory.name) {
      alert("Por favor completa el nombre de la categoría")
      return
    }

    // Si no hay ID, generar uno basado en el nombre
    if (!editedCategory.id) {
      const newId = editedCategory.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")

      setEditedCategory((prev) => ({
        ...prev,
        id: newId,
      }))

      // Guardar la categoría con el nuevo ID
      onSave({
        ...editedCategory,
        id: newId,
      })
    } else {
      // Guardar la categoría
      onSave(editedCategory)
    }
  }

  const handleDelete = () => {
    if (onDelete && category && confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      onDelete(category.id)
    }
  }

  if (!category) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
        <Card className="bg-montebello-navy border border-montebello-gold/20">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-montebello-gold">
                {category.id ? "Editar Categoría" : "Nueva Categoría"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-montebello-light rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-montebello-light">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editedCategory.name}
                  onChange={handleChange}
                  className="border-montebello-gold/20 bg-montebello-navy/50 text-montebello-light"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-montebello-light">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedCategory.description || ""}
                  onChange={handleChange}
                  className="border-montebello-gold/20 bg-montebello-navy/50 text-montebello-light min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order" className="text-montebello-light">
                  Orden
                </Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={editedCategory.order}
                  onChange={handleChange}
                  className="border-montebello-gold/20 bg-montebello-navy/50 text-montebello-light"
                />
                <p className="text-xs text-montebello-light/70">Número menor = aparece primero en la lista</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="iconType" className="text-montebello-light">
                  Icono de la categoría
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className={`p-4 flex flex-col items-center gap-2 h-auto border-montebello-gold/20 ${
                      editedCategory.iconType === "entradas"
                        ? "bg-montebello-gold/20 border-montebello-gold/40"
                        : "bg-montebello-navy/50"
                    }`}
                    onClick={() => setEditedCategory((prev) => ({ ...prev, iconType: "entradas" }))}
                  >
                    <Sandwich className="h-6 w-6 text-montebello-gold" />
                    <span className="text-xs text-montebello-light">Entradas</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className={`p-4 flex flex-col items-center gap-2 h-auto border-montebello-gold/20 ${
                      editedCategory.iconType === "principales"
                        ? "bg-montebello-gold/20 border-montebello-gold/40"
                        : "bg-montebello-navy/50"
                    }`}
                    onClick={() => setEditedCategory((prev) => ({ ...prev, iconType: "principales" }))}
                  >
                    <UtensilsCrossed className="h-6 w-6 text-montebello-gold" />
                    <span className="text-xs text-montebello-light">Principales</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className={`p-4 flex flex-col items-center gap-2 h-auto border-montebello-gold/20 ${
                      editedCategory.iconType === "postres"
                        ? "bg-montebello-gold/20 border-montebello-gold/40"
                        : "bg-montebello-navy/50"
                    }`}
                    onClick={() => setEditedCategory((prev) => ({ ...prev, iconType: "postres" }))}
                  >
                    <Cake className="h-6 w-6 text-montebello-gold" />
                    <span className="text-xs text-montebello-light">Postres</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className={`p-4 flex flex-col items-center gap-2 h-auto border-montebello-gold/20 ${
                      editedCategory.iconType === "bebidas"
                        ? "bg-montebello-gold/20 border-montebello-gold/40"
                        : "bg-montebello-navy/50"
                    }`}
                    onClick={() => setEditedCategory((prev) => ({ ...prev, iconType: "bebidas" }))}
                  >
                    <Coffee className="h-6 w-6 text-montebello-gold" />
                    <span className="text-xs text-montebello-light">Bebidas</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className={`p-4 flex flex-col items-center gap-2 h-auto border-montebello-gold/20 ${
                      editedCategory.iconType === "vinos"
                        ? "bg-montebello-gold/20 border-montebello-gold/40"
                        : "bg-montebello-navy/50"
                    }`}
                    onClick={() => setEditedCategory((prev) => ({ ...prev, iconType: "vinos" }))}
                  >
                    <Wine className="h-6 w-6 text-montebello-gold" />
                    <span className="text-xs text-montebello-light">Vinos</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className={`p-4 flex flex-col items-center gap-2 h-auto border-montebello-gold/20 ${
                      editedCategory.iconType === "cocktails"
                        ? "bg-montebello-gold/20 border-montebello-gold/40"
                        : "bg-montebello-navy/50"
                    }`}
                    onClick={() => setEditedCategory((prev) => ({ ...prev, iconType: "cocktails" }))}
                  >
                    <CoffeeIcon className="h-6 w-6 text-montebello-gold" />
                    <span className="text-xs text-montebello-light">Cocktails</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isActive" checked={editedCategory.isActive || false} onCheckedChange={handleActiveChange} />
                <Label htmlFor="isActive" className="text-montebello-light">
                  Categoría activa
                </Label>
              </div>

              <div className="flex justify-between pt-4">
                {onDelete && category.id && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-red-800/30 text-red-400 hover:bg-red-900/20"
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
                    className="border-montebello-gold/20 text-montebello-light"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-montebello-gold hover:bg-montebello-gold/90 text-montebello-navy font-medium"
                  >
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
