import type React from "react"
export function TicketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}

// Asegurarse de que el LeafIcon esté correctamente definido
// Si es necesario, podemos ajustar su apariencia para que coincida con la imagen proporcionada

export function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Reemplazamos el path del SVG con una imagen */}
      <image
        href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-19%20a%20la%28s%29%205.38.15%E2%80%AFp.%C2%A0m.-NRjjRyeyl3g5kceKpcZrqunQ1XMJAU.png"
        width="24"
        height="24"
      />
    </svg>
  )
}
