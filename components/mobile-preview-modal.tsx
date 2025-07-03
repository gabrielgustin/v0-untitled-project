"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MobilePreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MobilePreviewModal({ isOpen, onClose }: MobilePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] h-[90vh] p-0 overflow-hidden rounded-lg shadow-2xl border-4 border-gray-800 bg-gray-900 flex flex-col">
        <DialogHeader className="p-4 bg-[#0A2342] flex flex-row items-center justify-between border-b border-gray-700">
          <DialogTitle className="text-white text-lg">Vista Previa Móvil</DialogTitle>
          {/* Se elimina el botón 'X' manual para evitar duplicidad.
              DialogContent ya proporciona uno por defecto. */}
        </DialogHeader>
        <div className="relative flex-grow w-full bg-white flex items-center justify-center">
          <iframe
            src="/menu" // Asumimos que /menu es la página principal de la app
            className="w-full h-full border-none rounded-b-md"
            title="Mobile App Preview"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms" // Permite que la app de Next.js funcione dentro del iframe
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
