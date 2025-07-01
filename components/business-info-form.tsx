"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { FloatingPreviewButton } from "./floating-preview-button"

interface BusinessInfoFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function BusinessInfoForm({ onBack, onSave }: BusinessInfoFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    storeName: "Club Montebello",
    storeLink: "https://autogestiva.app/",
    subdomain: "cartamontebello",
    logo: null as string | null,
    logoFile: null as File | null,
    currentLogo: "/montebello-icon.png", // Añadir esta línea para el logo actual
    whatsappNumber: "",
    currency: "ARS",
    location: "",
    website: "",
    instagram: "",
    facebook: "",
    twitter: "",
    enableCoupons: false,
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem("businessInfo")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData((prev) => ({
          ...prev,
          ...parsedData,
          currentLogo: parsedData.logo || "/montebello-icon.png", // Usar el logo guardado o el predeterminado
        }))
      } catch (error) {
        console.error("Error parsing saved data:", error)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Si no es el campo storeName, actualizar normalmente
    if (name !== "storeName") {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir solo caracteres alfanuméricos y guiones
    const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()
    setFormData((prev) => ({ ...prev, subdomain: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData((prev) => ({
            ...prev,
            logo: event.target?.result as string,
            logoFile: file,
          }))
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Guardar en localStorage
    const dataToSave = {
      ...formData,
      logoFile: null, // No guardar el archivo en localStorage, solo la URL
    }
    localStorage.setItem("businessInfo", JSON.stringify(dataToSave))

    // Guardar el nombre de la tienda por separado para fácil acceso
    localStorage.setItem("storeName", formData.storeName)

    // Disparar evento para actualizar el título en toda la aplicación
    const event = new CustomEvent("storeNameChanged", { detail: formData.storeName })
    document.dispatchEvent(event)

    // Notificar al componente padre sin mostrar alertas
    onSave(formData)

    // Mostrar mensaje de éxito dentro del formulario
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000) // Ocultar después de 3 segundos
  }

  const handlePreview = () => {
    // Abrir la vista previa en una nueva pestaña
    window.open("/menu", "_blank")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-3xl mx-auto">
      <div className="p-4 border-b flex items-center bg-gray-50">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 text-gray-800 hover:bg-gray-200">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Información del negocio</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 pb-36 md:pb-6"
        autoComplete="off"
        noValidate
        onReset={(e) => {
          e.preventDefault()
          onBack()
        }}
      >
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-4">
            Configuración guardada correctamente
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="storeName" className="text-gray-800 font-medium">
            Nombre de tu tienda
          </Label>
          <Input
            id="storeName"
            name="storeName"
            value={formData.storeName}
            onChange={(e) => {
              const newName = e.target.value

              // Actualizar el estado del formulario
              setFormData((prev) => ({ ...prev, storeName: newName }))

              // Actualizar el título del documento inmediatamente
              document.title = newName || "Club Montebello"

              // Actualizar en localStorage para persistencia
              localStorage.setItem("storeName", newName)

              // Disparar evento para notificar a otros componentes
              const event = new CustomEvent("storeNameChanged", { detail: newName })
              document.dispatchEvent(event)

              // Mostrar feedback visual temporal (opcional)
              const favicon = document.querySelector('link[rel="icon"]')
              if (favicon) {
                favicon.setAttribute("href", favicon.getAttribute("href") + "?updated=" + Date.now())
              }
            }}
            placeholder="Ingresa el nombre de tu tienda"
            className="border-blue-200 focus:border-blue-400 transition-colors text-gray-900 font-medium text-base bg-transparent border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeLink" className="text-gray-800 font-medium">
            Link de tu Tienda Autogestiva
          </Label>
          <div className="flex items-center">
            <span className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 text-gray-900 font-medium">
              {formData.storeLink}
            </span>
            <Input
              id="subdomain"
              name="subdomain"
              value={formData.subdomain}
              onChange={handleSubdomainChange}
              className="rounded-l-none text-gray-900 font-medium text-base bg-transparent border border-gray-300"
            />
          </div>
          <p className="text-sm text-gray-700">
            Este será el link que usarán tus compradores para acceder a tu Tienda Autogestiva
          </p>
        </div>

        <div className="space-y-4">
          <Label className="text-gray-800 font-medium">Logo</Label>
          <p className="text-sm text-gray-700">
            Te recomendamos que el logo tenga formato PNG con fondo transparente (si no cargas ninguno mostraremos el
            nombre de tu tienda).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contenedor del logo con vista previa */}
            <div className="flex flex-col items-center border rounded-lg p-4 bg-gray-50">
              <div className="w-32 h-32 flex items-center justify-center mb-4">
                {formData.logo || formData.currentLogo ? (
                  <img
                    src={formData.logo || formData.currentLogo || "/placeholder.svg"}
                    alt="Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-600">
                    <Upload className="h-10 w-10 mx-auto mb-2" />
                    <p>Sin logo</p>
                  </div>
                )}
              </div>

              {/* Botones claramente separados */}
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1 text-[#2a4287] font-medium border-[#2a4287] hover:bg-[#2a4287] hover:text-white bg-transparent"
                  type="button"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                >
                  {formData.logo || formData.currentLogo ? "Cambiar" : "Agregar"}
                </Button>

                {formData.logo && (
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 font-medium border-red-300 hover:bg-red-600 hover:text-white bg-transparent"
                    onClick={() => setFormData((prev) => ({ ...prev, logo: null, logoFile: null }))}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>

            {/* Información del logo */}
            <div className="flex flex-col justify-center">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Estado del logo:</h4>
              {formData.logo ? (
                <p className="text-sm text-green-700 font-medium mb-2">✓ Nuevo logo seleccionado (no guardado)</p>
              ) : formData.currentLogo ? (
                <p className="text-sm text-blue-700 font-medium mb-2">✓ Usando logo actual</p>
              ) : (
                <p className="text-sm text-amber-700 font-medium mb-2">
                  ⚠ Sin logo (se mostrará el nombre de la tienda)
                </p>
              )}

              <p className="text-sm text-gray-700">
                El logo se mostrará en la barra de navegación, menú lateral y otros lugares de tu tienda.
              </p>

              <ul className="text-sm text-gray-700 mt-2 list-disc pl-5">
                <li>Tamaño recomendado: 512x512 píxeles</li>
                <li>Formatos aceptados: PNG, JPG, SVG</li>
                <li>Máximo 2MB</li>
              </ul>
            </div>
          </div>

          <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsappNumber" className="text-gray-800 font-medium">
            Número WhatsApp
          </Label>
          <Input
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            placeholder="Ej: +54 9 11 1234 5678"
            className="bg-transparent border border-gray-200"
          />
          <p className="text-sm text-gray-700">Número de WhatsApp que utilizas para recibir los pedidos.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency" className="text-gray-800 font-medium">
            Moneda
          </Label>
          <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
            <SelectTrigger className="text-gray-800 bg-transparent border border-gray-200">
              <SelectValue placeholder="Selecciona una moneda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ARS">Peso Argentino (ARS)</SelectItem>
              <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
              <SelectItem value="EUR">Euro (EUR)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-700">
            Los precios de tus productos se mostrarán junto con el símbolo de la moneda seleccionada.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-800 font-medium">
            Ubicación de tu tienda
          </Label>
          <Textarea
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Dirección completa de tu tienda"
            className="text-gray-800 bg-transparent border border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-800 font-medium">Links</Label>
          <p className="text-sm text-gray-700 mb-2">
            Opcional. Configura los links de tu página web y/o redes sociales como Instagram, Facebook o Twitter. Los
            usuarios podrán visualizarlos en el menú lateral de tu Tienda Autogestiva.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-gray-800">
                Sitio Web
              </Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://www.tusitio.com"
                className="text-gray-800 bg-transparent border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-gray-800">
                Instagram
              </Label>
              <Input
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://www.instagram.com/tuusuario"
                className="text-gray-800 bg-transparent border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-gray-800">
                Facebook
              </Label>
              <Input
                id="facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="https://www.facebook.com/tuusuario"
                className="text-gray-800 bg-transparent border border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-gray-800">
                Twitter
              </Label>
              <Input
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/tuusuario"
                className="text-gray-800 bg-transparent border border-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="mb-24 sm:mb-28">
          <div className="flex items-center space-x-2">
            <Switch
              id="enableCoupons"
              checked={formData.enableCoupons}
              onCheckedChange={(checked) => handleSwitchChange("enableCoupons", checked)}
            />
            <Label htmlFor="enableCoupons" className="text-gray-800 font-medium">
              Habilitar cupones de descuento
            </Label>
          </div>
          <p className="text-sm text-gray-700">
            Si activas esta opción, tus clientes verán el apartado "Cupón de descuento" cuando estén finalizando su
            compra.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-6 fixed-bottom-element">
          <Button
            variant="outline"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              onBack()
            }}
            className="text-gray-700 font-medium"
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-[#2a4287] hover:bg-[#1e3370] text-white font-medium">
            Guardar
          </Button>
        </div>
      </form>

      {/* Botón flotante para vista previa en móvil - usando el componente inteligente */}
      <FloatingPreviewButton onClick={handlePreview} />
    </div>
  )
}
