"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  X,
  Trash2,
  Coffee,
  UtensilsCrossed,
  Sandwich,
  Cake,
  Wine,
  CoffeeIcon as Cocktail,
  Pizza,
  BeefIcon as Meat,
  Fish,
  Salad,
  IceCream,
  BananaIcon as Fruit,
  Soup,
  ChefHatIcon as Chef,
  BirdIcon as Chicken,
  CroissantIcon as Bread,
  Beer,
  GlassWaterIcon as Water,
  Martini,
  WineIcon as Whisky,
  SparklesIcon as Champagne,
  DownloadIcon as Delivery,
  Menu,
  Utensils,
} from "lucide-react"
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
  iconType?:
    | "entradas"
    | "principales"
    | "postres"
    | "bebidas"
    | "vinos"
    | "cocktails"
    | "pizza"
    | "carne"
    | "pescado"
    | "ensalada"
    | "helado"
    | "postre"
    | "fruta"
    | "sopa"
    | "pollo"
    | "panaderia"
    | "cerveza"
    | "martini"
    | "whisky"
    | "champagne"
    | "refresco"
    | "agua"
    | "citricos"
    | "menu"
    | "delivery"
  isActive?: boolean
  order?: number
}

interface CategoryEditModalProps {
  category: Category | null
  onClose: () => void
  onSave: (category: Category) => void
  onDelete?: (categoryId: string) => void
}

// Categorías predefinidas
export const predefinedCategories = [
  {
    id: "entradas",
    name: "Entradas",
    description: "Aperitivos y entradas para comenzar la comida",
    iconType: "entradas",
    isActive: true,
    order: 1,
  },
  {
    id: "principales",
    name: "Platos & Principales",
    description: "Platos principales y especialidades de la casa",
    iconType: "principales",
    isActive: true,
    order: 2,
  },
  {
    id: "postres",
    name: "Postres",
    description: "Dulces y postres para finalizar la comida",
    iconType: "postres",
    isActive: true,
    order: 3,
  },
  {
    id: "bebidas",
    name: "Bebidas & Refrescos",
    description: "Bebidas sin alcohol, refrescos y jugos",
    iconType: "bebidas",
    isActive: true,
    order: 4,
  },
  {
    id: "vinos",
    name: "Vinos & Espumantes",
    description: "Selección de vinos y espumantes",
    iconType: "vinos",
    isActive: true,
    order: 5,
  },
  {
    id: "cocktails",
    name: "Cocktails & Tragos",
    description: "Bebidas alcohólicas y cócteles",
    iconType: "cocktails",
    isActive: true,
    order: 6,
  },
]

// Definir los iconos disponibles
const categoryIcons = [
  { type: "entradas", icon: <Sandwich />, label: "Entradas" },
  { type: "principales", icon: <UtensilsCrossed />, label: "Principales" },
  { type: "postres", icon: <Cake />, label: "Postres" },
  { type: "bebidas", icon: <Coffee />, label: "Bebidas" },
  { type: "vinos", icon: <Wine />, label: "Vinos" },
  { type: "cocktails", icon: <Cocktail />, label: "Cocktails" },
  { type: "pizza", icon: <Pizza />, label: "Pizza" },
  { type: "carne", icon: <Meat />, label: "Carne" },
  { type: "pescado", icon: <Fish />, label: "Pescado" },
  { type: "ensalada", icon: <Salad />, label: "Ensalada" },
  { type: "helado", icon: <IceCream />, label: "Helado" },
  { type: "fruta", icon: <Fruit />, label: "Fruta" },
  { type: "sopa", icon: <Soup />, label: "Sopa" },
  { type: "pollo", icon: <Chicken />, label: "Pollo" },
  { type: "panaderia", icon: <Bread />, label: "Panadería" },
  { type: "cerveza", icon: <Beer />, label: "Cerveza" },
  { type: "martini", icon: <Martini />, label: "Martini" },
  { type: "whisky", icon: <Whisky />, label: "Whisky" },
  { type: "champagne", icon: <Champagne />, label: "Champagne" },
  { type: "agua", icon: <Water />, label: "Agua" },
  { type: "menu", icon: <Menu />, label: "Menú" },
  { type: "delivery", icon: <Delivery />, label: "Delivery" },
  { type: "chef", icon: <Chef />, label: "Chef" },
  { type: "utensils", icon: <Utensils />, label: "Utensilios" },
]

export function CategoryEditModal({ category, onClose, onSave, onDelete }: CategoryEditModalProps) {
  const [editedCategory, setEditedCategory] = useState<Category>({
    id: "",
    name: "",
    description: "",
    iconType: "entradas",
    isActive: true,
    order: 0,
  })
  const [showPredefinedOptions, setShowPredefinedOptions] = useState(false)

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
      // Si es una nueva categoría (sin ID), mostrar las opciones predefinidas
      // Ahora solo mostramos las opciones predefinidas si el ID es exactamente una cadena vacía
      setShowPredefinedOptions(category.id === "")
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

    // Si no hay ID o es un ID temporal, generar uno basado en el nombre
    if (!editedCategory.id || editedCategory.id.startsWith("temp-")) {
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

  const handleSelectPredefined = (predefCategory: Category) => {
    setEditedCategory(predefCategory)
    setShowPredefinedOptions(false)
  }

  const handleSelectIcon = (iconType: string) => {
    setEditedCategory((prev) => ({
      ...prev,
      iconType: iconType as any,
    }))
  }

  if (!category) return null

  // Renderizar las opciones predefinidas si es una nueva categoría
  if (showPredefinedOptions) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-gray-800">Seleccionar Categoría Predefinida</CardTitle>
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
              <div className="space-y-4">
                {predefinedCategories.map((predefCategory) => (
                  <Card
                    key={predefCategory.id}
                    className="border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectPredefined(predefCategory)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {predefCategory.iconType === "entradas" && <Sandwich className="h-6 w-6 text-[#2a4287]" />}
                        {predefCategory.iconType === "principales" && (
                          <UtensilsCrossed className="h-6 w-6 text-[#2a4287]" />
                        )}
                        {predefCategory.iconType === "postres" && <Cake className="h-6 w-6 text-[#2a4287]" />}
                        {predefCategory.iconType === "bebidas" && <Coffee className="h-6 w-6 text-[#2a4287]" />}
                        {predefCategory.iconType === "vinos" && <Wine className="h-6 w-6 text-[#2a4287]" />}
                        {predefCategory.iconType === "cocktails" && <Cocktail className="h-6 w-6 text-[#2a4287]" />}
                        <div>
                          <h3 className="font-medium text-gray-800">{predefCategory.name}</h3>
                          <p className="text-sm text-gray-500">{predefCategory.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700"
                  onClick={() => setShowPredefinedOptions(false)}
                >
                  Crear categoría personalizada
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader className="pb-3 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-gray-800">
                {!editedCategory.id || editedCategory.id.startsWith("temp-") ? "Nueva Categoría" : "Editar Categoría"}
              </CardTitle>
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
                  value={editedCategory.name}
                  onChange={handleChange}
                  className="border-gray-200 bg-white text-gray-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedCategory.description || ""}
                  onChange={handleChange}
                  className="border-gray-200 bg-white text-gray-700 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order" className="text-gray-700">
                  Orden
                </Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={editedCategory.order}
                  onChange={handleChange}
                  className="border-gray-200 bg-white text-gray-700"
                />
                <p className="text-xs text-gray-500">Número menor = aparece primero en la lista</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="iconType" className="text-gray-700">
                  Icono de la categoría
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {categoryIcons.map((iconItem) => (
                    <Button
                      key={iconItem.type}
                      type="button"
                      variant="outline"
                      className={`p-3 flex flex-col items-center gap-1 h-auto border-gray-200 ${
                        editedCategory.iconType === iconItem.type ? "bg-[#2a4287]/10 border-[#2a4287]/30" : "bg-gray-50"
                      }`}
                      onClick={() => handleSelectIcon(iconItem.type)}
                      title={iconItem.label}
                    >
                      <div className="text-[#2a4287]">
                        {React.cloneElement(iconItem.icon, { className: "h-6 w-6" })}
                      </div>
                      <span className="text-xs text-gray-700 truncate w-full text-center">{iconItem.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isActive" checked={editedCategory.isActive || false} onCheckedChange={handleActiveChange} />
                <Label htmlFor="isActive" className="text-gray-700">
                  Categoría activa
                </Label>
              </div>

              <div className="flex justify-between pt-4">
                {onDelete && category.id && !category.id.startsWith("temp-") && (
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
                <div
                  className={`flex gap-2 ${!onDelete || !category.id || category.id.startsWith("temp-") ? "w-full justify-end" : "ml-auto"}`}
                >
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
